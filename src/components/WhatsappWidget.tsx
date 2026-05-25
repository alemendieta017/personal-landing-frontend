"use client";

import React, { useState, useEffect } from 'react';
import { X, Send, ArrowRight } from 'lucide-react';
import WhatsappIcon from './WhatsappIcon';
import { AgentData } from '../lib/strapi';

interface WhatsappWidgetProps {
  onOpenLeadModal: (plan: { name: string; category: string; price: string } | null) => void;
  buildingName?: string;
  agentData: AgentData;
}

export default function WhatsappWidget({ onOpenLeadModal, buildingName, agentData }: WhatsappWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [inputMessage, setInputMessage] = useState('');

  // Show tooltip after 3 seconds, then hide it after 8 seconds
  useEffect(() => {
    const timerShow = setTimeout(() => {
      setShowTooltip(true);
    }, 4000);

    const timerHide = setTimeout(() => {
      setShowTooltip(false);
    }, 12000);

    return () => {
      clearTimeout(timerShow);
      clearTimeout(timerHide);
    };
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Direct redirection to agent's WhatsApp with user message
    const buildingText = buildingName ? `del Edificio *${buildingName}*` : 'del edificio';
    const message = `¡Hola ${agentData.nombre}! 👋 Soy ${buildingText}. Tengo la siguiente consulta: "${inputMessage.trim()}"`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${agentData.telefono.replace(/\D/g, '')}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    setInputMessage('');
    setIsOpen(false);
  };

  const handleStartLead = () => {
    onOpenLeadModal({
      name: 'Consulta de Cobertura',
      category: 'Asesoramiento Personalizado',
      price: 'Sin costo'
    });
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 font-sans flex flex-col items-end">
      
      {/* Tooltip Notification */}
      {showTooltip && !isOpen && (
        <div className="mb-3 mr-1 max-w-xs bg-white rounded-2xl p-4 shadow-xl border border-slate-100 relative animate-in fade-in slide-in-from-bottom-2 duration-300">
          {/* Close button for tooltip */}
          <button 
            onClick={() => setShowTooltip(false)}
            className="absolute top-2 right-2 text-slate-400 hover:text-slate-600 p-0.5 rounded-full"
          >
            <X className="h-3 w-3" />
          </button>
          
          <div className="flex gap-3">
            {/* Avatar small */}
            <div className="relative h-10 w-10 flex-shrink-0">
              {agentData.profilePictureUrl ? (
                <div className="h-10 w-10 rounded-full overflow-hidden border border-slate-200 flex items-center justify-center flex-shrink-0">
                  <img 
                    src={agentData.profilePictureUrl} 
                    alt={`${agentData.nombre} ${agentData.apellido}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : (
                <div className="h-10 w-10 rounded-full bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center font-bold text-sky-800 flex-shrink-0">
                  {agentData.nombre[0]}{agentData.apellido[0]}
                </div>
              )}
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">{agentData.nombre} {agentData.apellido}</p>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                {buildingName 
                  ? `¡Hola! 👋 ¿Querés habilitar Internet Fibra o Flow TV en ${buildingName}? Escribime.`
                  : '¡Hola! 👋 ¿Querés habilitar Internet Fibra o Flow TV en tu depto? Escribime.'
                }
              </p>
            </div>
          </div>
          
          {/* Triangle pointing to widget */}
          <div className="absolute right-6 -bottom-2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.02)]" />
        </div>
      )}

      {/* Expanded Chat Box */}
      {isOpen && (
        <div className="mb-4 w-[340px] bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-100 animate-in fade-in slide-in-from-bottom-5 duration-300">
          
          {/* Chat Header */}
          <div className="bg-personal-blue p-4 flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <div className="relative h-11 w-11 flex-shrink-0">
                {agentData.profilePictureUrl ? (
                  <div className="h-11 w-11 rounded-full overflow-hidden border border-white/20 flex items-center justify-center flex-shrink-0">
                    <img 
                      src={agentData.profilePictureUrl} 
                      alt={`${agentData.nombre} ${agentData.apellido}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="h-11 w-11 rounded-full bg-white/20 backdrop-blur-md overflow-hidden flex items-center justify-center font-bold text-white border border-white/10 flex-shrink-0">
                    {agentData.nombre[0]}{agentData.apellido[0]}
                  </div>
                )}
                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-personal-blue" />
              </div>
              <div>
                <h4 className="text-sm font-bold leading-tight">{agentData.nombre} {agentData.apellido}</h4>
                <p className="text-xs text-sky-100 font-medium">{agentData.genero === 'masculino' ? 'Ejecutivo' : 'Ejecutiva'} Oficial de Personal</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Chat Messages Body */}
          <div className="p-4 bg-slate-50 max-h-[250px] overflow-y-auto space-y-3">
            <div className="bg-white rounded-2xl rounded-tl-none p-3 text-xs text-slate-700 shadow-sm border border-slate-100/50 max-w-[85%]">
              <p className="font-bold text-slate-800 mb-1">{agentData.nombre} {agentData.apellido}</p>
              ¡Hola! Qué gusto saludarte. Soy {agentData.genero === 'masculino' ? 'el ejecutivo designado' : 'la ejecutiva designada'} para {buildingName ? buildingName : 'tu edificio'}. ¿En qué puedo ayudarte?
            </div>

            {/* Quick Actions */}
            <div className="pt-2 flex flex-col gap-2">
              <button 
                onClick={handleStartLead}
                className="w-full flex items-center justify-between bg-sky-50 hover:bg-sky-100 text-sky-900 border border-sky-100 py-2.5 px-3 rounded-xl text-xs font-bold transition-all text-left"
              >
                <span>Solicitar instalación en mi depto</span>
                <ArrowRight className="h-4 w-4 text-sky-700" />
              </button>
            </div>
          </div>

          {/* Chat Form Footer */}
          <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-100 flex gap-2 items-center bg-white">
            <input 
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Escribí tu consulta..."
              className="flex-1 rounded-full border border-slate-200 px-4 py-2 text-xs outline-none focus:border-personal-blue bg-slate-50 focus:bg-white transition-all"
            />
            <button 
              type="submit"
              className="h-8 w-8 rounded-full bg-personal-blue text-white flex items-center justify-center hover:bg-sky-500 transition-colors shadow-md shadow-sky-400/20"
            >
              <Send className="h-3.5 w-3.5 fill-current" />
            </button>
          </form>

        </div>
      )}

      {/* Floating Main Button */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          setShowTooltip(false);
        }}
        className="h-14 w-14 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xl hover:bg-emerald-600 hover:scale-105 active:scale-95 transition-all relative z-40 cursor-pointer"
        aria-label={`Contactar a ${agentData.genero === 'masculino' ? 'ejecutivo' : 'ejecutiva'} por WhatsApp`}
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <WhatsappIcon className="h-7 w-7" />
        )}
        
        {/* Floating badge if tooltip closed but unseen */}
        {!isOpen && !showTooltip && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white animate-pulse">
            1
          </span>
        )}
      </button>

    </div>
  );
}
