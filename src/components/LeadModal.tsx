"use client";

import React, { useState, useEffect } from "react";
import { X, Home, Phone, User } from "lucide-react";
import WhatsappIcon from "./WhatsappIcon";

import { AgentData } from "../lib/strapi";

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan: {
    name: string;
    category: string;
    price: string;
  } | null;
  buildingName?: string;
  buildingType?: "building" | "commercial";
  agentData: AgentData;
}

export default function LeadModal({
  isOpen,
  onClose,
  selectedPlan,
  buildingName,
  buildingType,
  agentData,
}: LeadModalProps) {
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [depto, setDepto] = useState("");
  const [servicioInteres, setServicioInteres] = useState("");
  const [error, setError] = useState("");

  // A plan is selected if selectedPlan exists and price is not 'Sin costo' (which represents a generic inquiry)
  const hasPlan = selectedPlan && selectedPlan.price !== "Sin costo";

  const isCommercial = buildingType === "commercial";
  const deptoLabel = isCommercial ? "Dirección" : "Departamento / Nivel";
  const deptoPlaceholder = isCommercial
    ? "Ej. Avda. España 123 c/ Curupayty o Local 15"
    : "Ej. Torre B - Piso 4 (Depto 402)";
  const headerBannerText = hasPlan
    ? isCommercial
      ? "Instalación en tu Hogar"
      : "Instalación en Edificio"
    : "Consulta de Servicios";
  const installTargetText = isCommercial ? "tu hogar" : "tu departamento";

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEscape);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !nombre.trim() ||
      !telefono.trim() ||
      !depto.trim() ||
      (!hasPlan && !servicioInteres)
    ) {
      setError("Por favor completá todos los campos.");
      return;
    }

    setError("");

    // Format WhatsApp message
    const planText = hasPlan
      ? `el plan de *${selectedPlan.category}*: *${selectedPlan.name}* (${selectedPlan.price === "Prioritario" ? "Prioritario" : `por Gs. ${selectedPlan.price}`})`
      : `servicios de *${servicioInteres}*`;

    const buildingText = buildingName
      ? isCommercial
        ? `ubicado en *${buildingName}*`
        : `de *${buildingName}*`
      : "del edificio";
    
    const locationText = isCommercial
      ? `mi dirección de instalación es *${depto.trim()}*`
      : `vivo en el departamento *${depto.trim()}*`;

    const message = `¡Hola ${agentData.nombre}! 👋 Acabo de escanear el QR ${buildingText}. Mi nombre es *${nombre.trim()}*, ${locationText} (Tel: ${telefono.trim()}) y estoy interesado en contratar ${planText}.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://api.whatsapp.com/send/?phone=${agentData.telefono.replace(/\D/g, "")}&text=${encodedMessage}`;

    // Redirect to WhatsApp
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    // Close modal
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-md transform overflow-hidden rounded-3xl bg-white p-6 text-left align-middle shadow-2xl transition-all duration-300 border border-slate-100 z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Brand Banner */}
        <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-personal-blue bg-sky-50 px-2.5 py-1 rounded-full">
              {headerBannerText}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-slate-950 mb-1">
          {hasPlan ? "¡Excelente elección! 🚀" : "Realizar Consulta 💬"}
        </h3>
        <p className="text-sm text-slate-500 mb-6 font-medium">
          {hasPlan ? (
            <>
              Completá tus datos para que {agentData.genero === "masculino" ? "el ejecutivo" : "la ejecutiva"}{" "}
              <strong>{agentData.nombre} {agentData.apellido}</strong> gestione la instalación inmediata en {installTargetText}.
            </>
          ) : (
            <>
              Completá tus datos para realizar tu consulta y que {agentData.genero === "masculino" ? "el ejecutivo" : "la ejecutiva"}{" "}
              <strong>{agentData.nombre} {agentData.apellido}</strong> te brinde asesoramiento personalizado.
            </>
          )}
        </p>

        {/* Selected Plan Summary Box */}
        {hasPlan && selectedPlan && (
          <div className="mb-5 rounded-2xl bg-sky-50/70 p-4 border border-sky-100/50 flex flex-col gap-1.5">
            <span className="text-xs font-bold text-sky-800 uppercase tracking-wide">
              Plan Seleccionado:
            </span>
            <div className="flex items-baseline justify-between">
              <span className="text-base font-bold text-slate-900">
                {selectedPlan.name}
              </span>
              <span className="text-sm font-semibold text-personal-blue">
                {selectedPlan.price === "Prioritario"
                  ? "Prioritario"
                  : `Gs. ${selectedPlan.price}`}
              </span>
            </div>
            <span className="text-xs text-slate-500 font-medium">
              Categoría: {selectedPlan.category}
            </span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5"
              htmlFor="name"
            >
              Nombre y Apellido
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
                <User className="h-4.5 w-4.5" />
              </div>
              <input
                type="text"
                id="name"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ej. Juan Pérez"
                className="block w-full rounded-2xl border border-slate-200 bg-slate-50/50 py-3 pl-10 pr-4 text-sm text-slate-900 placeholder-slate-400 focus:border-personal-blue focus:bg-white focus:ring-2 focus:ring-sky-100 outline-none transition-all"
                required
              />
            </div>
          </div>

          <div>
            <label
              className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5"
              htmlFor="phone"
            >
              Número de Celular
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
                <Phone className="h-4.5 w-4.5" />
              </div>
              <input
                type="tel"
                id="phone"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                placeholder="Ej. 0994925946"
                className="block w-full rounded-2xl border border-slate-200 bg-slate-50/50 py-3 pl-10 pr-4 text-sm text-slate-900 placeholder-slate-400 focus:border-personal-blue focus:bg-white focus:ring-2 focus:ring-sky-100 outline-none transition-all"
                required
              />
            </div>
          </div>

          <div>
            <label
              className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5"
              htmlFor="depto"
            >
              {deptoLabel}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
                <Home className="h-4.5 w-4.5" />
              </div>
              <input
                type="text"
                id="depto"
                value={depto}
                onChange={(e) => setDepto(e.target.value)}
                placeholder={deptoPlaceholder}
                className="block w-full rounded-2xl border border-slate-200 bg-slate-50/50 py-3 pl-10 pr-4 text-sm text-slate-900 placeholder-slate-400 focus:border-personal-blue focus:bg-white focus:ring-2 focus:ring-sky-100 outline-none transition-all"
                required
              />
            </div>
          </div>

          {/* Conditional Dropdown when no specific plan is selected */}
          {!hasPlan && (
            <div>
              <label
                className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5"
                htmlFor="service"
              >
                ¿Qué servicio necesitas?
              </label>
              <select
                id="service"
                value={servicioInteres}
                onChange={(e) => setServicioInteres(e.target.value)}
                className="block w-full rounded-2xl border border-slate-200 bg-slate-50/50 py-3 px-4 text-sm text-slate-900 focus:border-personal-blue focus:bg-white focus:ring-2 focus:ring-sky-100 outline-none transition-all"
                required
              >
                <option value="" disabled hidden>
                  Seleccioná una opción
                </option>
                <option value="Internet Fibra Óptica">
                  Internet Fibra Óptica
                </option>
                <option value="Flow TV">Flow TV (Televisión)</option>
                <option value="Telefonía Móvil">
                  Telefonía Móvil (Celular)
                </option>
                <option value="Combo de Servicios">
                  Combo (Internet + TV + Móvil)
                </option>
                <option value="Otro / Consulta General">
                  Otro / Consulta General
                </option>
              </select>
            </div>
          )}

          {error && (
            <p className="text-xs font-semibold text-rose-500 bg-rose-50 px-3 py-2 rounded-xl">
              {error}
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-2 flex items-center justify-center gap-2 rounded-2xl bg-personal-blue py-3.5 px-4 text-sm font-bold text-white shadow-lg shadow-sky-400/20 hover:bg-sky-500 hover:shadow-sky-400/30 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
          >
            <WhatsappIcon className="h-5 w-5" />
            {hasPlan ? "Enviar Solicitud" : "Enviar Consulta"}
          </button>
        </form>
      </div>
    </div>
  );
}
