'use client'

import React, { useState, useEffect } from 'react'
import {
  Globe,
  Tv,
  Phone,
  Box,
  Check,
  MessageCircle,
  Info,
  Sparkles,
  Smartphone,
  Monitor,
  Cloud,
  Play,
  ArrowRight,
  Star,
  Heart,
} from 'lucide-react'
import WhatsappIcon from './WhatsappIcon'
import Header, { PersonalLogo, FlowLogo } from './Header'
import Footer from './Footer'
import LeadModal from './LeadModal'
import WhatsappWidget from './WhatsappWidget'
import {
  InternetBlockData,
  FlowBlockData,
  MobileBlockData,
  ComboBlockData,
  BuildingData,
  AgentData,
} from '../lib/strapi'

interface LandingPageClientProps {
  internetBlock: InternetBlockData
  flowBlock: FlowBlockData
  mobileBlock: MobileBlockData
  comboBlock: ComboBlockData
  agentData: AgentData
  buildingData?: BuildingData | null
}

// Helper to format Guaraníes currency
function formatGs(value: number): string {
  if (value === undefined || value === null) return '0'
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

function renderTextWithLogos(
  text: string,
  logoColorClass: string = 'text-personal-blue',
  logoHeightClass: string = 'h-[1.35em]'
) {
  if (!text) return null
  const parts = text.split(/(personal)/i)
  return (
    <>
      {parts.map((part, index) => {
        const lower = part.toLowerCase()
        if (lower === 'personal') {
          return (
            <span key={index} className="inline-flex items-center align-middle mx-1.5 -translate-y-[0.05em]">
              <PersonalLogo className={`${logoHeightClass} ${logoColorClass} fill-current`} />
            </span>
          )
        }
        return <React.Fragment key={index}>{part}</React.Fragment>
      })}
    </>
  )
}

export default function LandingPageClient({
  internetBlock,
  flowBlock,
  mobileBlock,
  comboBlock,
  agentData,
  buildingData,
}: LandingPageClientProps) {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<{
    name: string
    category: string
    price: string
  } | null>(null)

  // Log the visit to the proxy Route Handler on mount with refresh protection
  useEffect(() => {
    if (buildingData?.documentId) {
      const storageKey = `visited_building_${buildingData.documentId}`
      const alreadyVisited = sessionStorage.getItem(storageKey)

      if (!alreadyVisited) {
        fetch('/api/visit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ buildingId: buildingData.documentId }),
        })
          .then((res) => {
            if (res.ok) {
              sessionStorage.setItem(storageKey, 'true')
            }
          })
          .catch((err) => {
            console.error('Error logging visit from landing page:', err)
          })
      }
    }
  }, [buildingData])

  const handleOpenModal = (
    plan: { name: string; category: string; price: string } | null,
  ) => {
    setSelectedPlan(plan)
    setModalOpen(true)
  }

  const [selectedComboType, setSelectedComboType] = useState<'dos_productos' | 'tres_productos'>('tres_productos')
  const combosData = comboBlock?.ComboItem || []

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800 antialiased selection:bg-personal-blue selection:text-white">
      {/* Sticky Header */}
      <Header onOpenLeadModal={handleOpenModal} agentData={agentData} />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0A1C36] via-[#0C2346] to-[#0A1C36] text-white pt-32 sm:pt-40 pb-20 px-4 sm:px-6 lg:px-8 border-b border-sky-950">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/4 h-72 w-72 rounded-full bg-personal-blue/20 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-5xl text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-sky-500/10 px-4 py-1.5 text-xs font-semibold text-personal-blue border border-sky-500/20 mb-6 animate-pulse">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Propuesta Comercial para tu Departamento</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight max-w-4xl">
            ¡Habilitá los Servicios de{' '}
            <span className="inline-flex items-center align-middle mx-2 sm:mx-3 translate-y-[0.05em]">
              <PersonalLogo className="h-[1.8em] sm:h-[2em] text-personal-blue fill-current" />
            </span>{' '}
            en{' '}
            {buildingData ? buildingData.name : 'tu Departamento'}!
          </h1>

          <p className="mt-6 text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl font-medium leading-relaxed">
            Descubrí los mejores planes de Internet Fibra, Flow TV y Telefonía Móvil disponibles para tu departamento.
            Elegí la opción ideal para vos y activá tu conexión hoy mismo.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
            <a
              href="#combos"
              className="rounded-2xl bg-personal-blue hover:bg-sky-500 text-white font-bold px-8 py-4 text-sm sm:text-base transition-all shadow-lg shadow-sky-400/20 hover:shadow-sky-400/30 hover:scale-[1.02] active:scale-[0.98] cursor-pointer text-center"
            >
              Ver Combos de Personal
            </a>
            <button
              onClick={() =>
                handleOpenModal({
                  name: 'Consulta de Cobertura Edificio',
                  category: 'Instalación Express',
                  price: 'Prioritario',
                })
              }
              className="rounded-2xl bg-white/10 hover:bg-white/15 text-white font-bold px-8 py-4 text-sm sm:text-base transition-all border border-white/15 hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
            >
              <WhatsappIcon className="h-5 w-5 text-emerald-400" />
              Hablar con Jessica Ciancio
            </button>
          </div>

          {/* Quick Menu Tabs */}
          <div className="mt-16 w-full max-w-3xl grid grid-cols-2 md:grid-cols-4 bg-white/5 backdrop-blur-md rounded-3xl p-3 md:p-2 border border-white/10 shadow-2xl gap-2 md:gap-0">
            <a
              href="#combos"
              className="flex flex-col items-center gap-2 py-3 rounded-2xl hover:bg-white/5 transition-all text-slate-200 hover:text-white group"
            >
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform p-2.5">
                <img src="/img/shortcuts/combos.svg" alt="Combos" className="h-full w-full object-contain" />
              </div>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                Combos
              </span>
            </a>
            <a
              href="#internet"
              className="flex flex-col items-center gap-2 py-3 rounded-2xl hover:bg-white/5 transition-all text-slate-200 hover:text-white group"
            >
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform p-2.5">
                <img src="/img/shortcuts/fibra.svg" alt="Fibra" className="h-full w-full object-contain" />
              </div>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                Fibra
              </span>
            </a>
            <a
              href="#flow"
              className="flex flex-col items-center gap-2 py-3 rounded-2xl hover:bg-white/5 transition-all text-slate-200 hover:text-white group"
            >
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform p-2.5">
                <img src="/img/shortcuts/flow.svg" alt="Flow" className="h-full w-full object-contain" />
              </div>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                Flow
              </span>
            </a>
            <a
              href="#movil"
              className="flex flex-col items-center gap-2 py-3 rounded-2xl hover:bg-white/5 transition-all text-slate-200 hover:text-white group"
            >
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform p-2.5">
                <img src="/img/shortcuts/movil.svg" alt="Móvil" className="h-full w-full object-contain" />
              </div>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                Móvil
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Combos Section (From flyer details) */}
      <section
        id="combos"
        className="bg-slate-100 py-20 px-4 sm:px-6 lg:px-8 relative scroll-mt-20 border-t border-slate-200"
      >
        <div className="mx-auto max-w-5xl">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-personal-blue bg-sky-500/10 px-3.5 py-1.5 rounded-full border border-sky-500/20">
              Combos de Personal
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mt-5 text-slate-950">
              {renderTextWithLogos(comboBlock?.title || "¡Los Combos de Personal te convienen mucho más! 💥", 'text-personal-blue', 'h-[1.5em] sm:h-[1.7em]')}
            </h2>
            <p className="mt-4 text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
              {renderTextWithLogos(comboBlock?.subtitle || "Combinando tus productos de Internet Fibra, Flow TV y Telefonía móvil, accedés a beneficios exclusivos y duplicás tus velocidades de forma automática.", 'text-personal-blue', 'h-[1.35em]')}
            </p>
          </div>

          {/* Interactive Tab Switcher */}
          <div className="flex justify-center mt-10 mb-8">
            <div className="inline-flex p-1 bg-slate-200 rounded-2xl border border-slate-300/40 shadow-inner">
              <button
                onClick={() => setSelectedComboType('tres_productos')}
                className={`px-6 py-3 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-300 cursor-pointer ${
                  selectedComboType === 'tres_productos'
                    ? 'bg-[#0A1C36] text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                🔥 Combo Triple
              </button>
              <button
                onClick={() => setSelectedComboType('dos_productos')}
                className={`px-6 py-3 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-300 cursor-pointer ${
                  selectedComboType === 'dos_productos'
                    ? 'bg-[#0A1C36] text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Combo Doble
              </button>
            </div>
          </div>

          {/* Combo list */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {combosData
              .filter((combo) => combo.type === selectedComboType)
              .map((combo) => {
                const hasTv = combo.includesFlow;
                const hasMobile = combo.mobileData && combo.mobileData !== "";

                return (
                  <div
                    key={combo.id}
                    onClick={() =>
                      handleOpenModal({
                        name: combo.name,
                        category: 'Combo',
                        price: formatGs(combo.price),
                      })
                    }
                    className={`rounded-[2.5rem] p-8 shadow-xl border flex flex-col justify-between relative overflow-hidden cursor-pointer hover:scale-[1.02] hover:shadow-2xl transition-all duration-300 ${
                      combo.isPopular
                        ? 'bg-gradient-to-br from-[#0c2346] to-[#122e5c] text-white border-sky-900 shadow-sky-500/10 ring-2 ring-personal-blue/30'
                        : 'bg-white text-slate-800 border-slate-200 hover:shadow-slate-300/40'
                    }`}
                  >
                    {combo.isPopular && (
                      <div className="absolute top-4 right-6 bg-personal-blue text-white text-[10px] font-black uppercase tracking-wider py-1 px-4 rounded-full flex items-center gap-1.5 shadow-md">
                        <Sparkles className="h-3 w-3 fill-current" />
                        <span>Recomendado</span>
                      </div>
                    )}

                    <div className="text-left">
                      <span className={`text-[10px] font-extrabold uppercase tracking-widest block mb-2 ${
                        combo.isPopular ? 'text-slate-400' : 'text-slate-500'
                      }`}>
                        {combo.type === 'tres_productos' ? 'Combo Triple' : 'Combo Doble'}
                      </span>
                      <h3 className="text-xl font-black uppercase tracking-wide leading-snug pr-20 sm:pr-0">
                        {combo.name}
                      </h3>

                      {/* Row-based Service List */}
                      <div className="flex flex-col gap-3.5 my-6">
                        {/* Internet Row */}
                        <div className="flex items-center gap-3">
                          <div className={`h-10 w-10 rounded-xl flex items-center justify-center shadow-sm flex-shrink-0 ${
                            combo.isPopular 
                              ? 'bg-sky-500/15 text-sky-300 border border-sky-500/25' 
                              : 'bg-sky-50 text-personal-blue border border-sky-100'
                          }`}>
                            <Globe className="h-5 w-5" />
                          </div>
                          <div className="flex flex-col text-left">
                            <span className={`text-[10px] font-bold uppercase tracking-wider ${combo.isPopular ? 'text-slate-400' : 'text-slate-500'}`}>
                              Internet Fibra Óptica
                            </span>
                            <span className="text-sm font-extrabold flex items-center gap-1.5">
                              {combo.originalInternetSpeed && combo.originalInternetSpeed !== combo.internetSpeed && (
                                <span className={`line-through font-normal text-xs ${combo.isPopular ? 'text-slate-500' : 'text-slate-400'}`}>
                                  {combo.originalInternetSpeed}
                                </span>
                              )}
                              <span className={combo.isPopular ? 'text-white' : 'text-slate-900'}>
                                {combo.internetSpeed}
                              </span>
                            </span>
                          </div>
                        </div>

                        {/* TV Row */}
                        {hasTv && (
                          <div className="flex items-center gap-3">
                            <div className={`h-10 w-10 rounded-xl flex items-center justify-center shadow-sm flex-shrink-0 ${
                              combo.isPopular 
                                ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/25' 
                                : 'bg-emerald-50 text-flow-green border border-emerald-100'
                            }`}>
                              <Tv className="h-5 w-5" />
                            </div>
                            <div className="flex flex-col text-left">
                              <span className={`text-[10px] font-bold uppercase tracking-wider ${combo.isPopular ? 'text-slate-400' : 'text-slate-500'}`}>
                                Televisión Digital
                              </span>
                              <span className={`text-sm font-extrabold ${combo.isPopular ? 'text-white' : 'text-slate-900'}`}>
                                Flow TV Incluido
                              </span>
                            </div>
                          </div>
                        )}

                        {/* Mobile Row */}
                        {hasMobile && (
                          <div className="flex items-center gap-3">
                            <div className={`h-10 w-10 rounded-xl flex items-center justify-center shadow-sm flex-shrink-0 ${
                              combo.isPopular 
                                ? 'bg-indigo-500/15 text-indigo-300 border border-indigo-500/25' 
                                : 'bg-indigo-50 text-indigo-600 border border-indigo-100'
                            }`}>
                              <Smartphone className="h-5 w-5" />
                            </div>
                            <div className="flex flex-col text-left">
                              <span className={`text-[10px] font-bold uppercase tracking-wider ${combo.isPopular ? 'text-slate-400' : 'text-slate-500'}`}>
                                Telefonía Móvil
                              </span>
                              <span className="text-sm font-extrabold flex items-center gap-1.5">
                                {combo.originalMobileData && combo.originalMobileData !== combo.mobileData && (
                                  <span className={`line-through font-normal text-xs ${combo.isPopular ? 'text-slate-500' : 'text-slate-400'}`}>
                                    {combo.originalMobileData}
                                  </span>
                                )}
                                <span className={combo.isPopular ? 'text-white' : 'text-slate-900'}>
                                  {combo.mobileData}
                                </span>
                              </span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Marketing Hook / Duplication Badge */}
                      {combo.badge && (
                        <div className={`mt-4 p-3 rounded-2xl border flex items-center gap-2.5 ${
                          combo.isPopular
                            ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300'
                            : 'bg-emerald-50 border-emerald-100 text-emerald-800'
                        }`}>
                          <Sparkles className="h-4.5 w-4.5 text-emerald-400 flex-shrink-0 animate-pulse" />
                          <span className="text-xs font-extrabold leading-tight">{combo.badge}</span>
                        </div>
                      )}
                    </div>

                    <div className="mt-4 flex items-end justify-between">
                      <div>
                        <p className={`text-[9px] uppercase font-bold tracking-wider ${
                          combo.isPopular ? 'text-slate-400' : 'text-slate-500'
                        }`}>
                          Precio Final Combo
                        </p>
                        <p className="text-3xl font-black mt-1 leading-none">
                          <span className={`font-light mr-1 text-lg ${
                            combo.isPopular ? 'text-slate-300' : 'text-slate-500'
                          }`}>Gs.</span>
                          {formatGs(combo.price)}
                          <span className="text-[10px] font-light opacity-75 block mt-1.5">
                            por mes
                          </span>
                        </p>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenModal({
                            name: combo.name,
                            category: 'Combo',
                            price: formatGs(combo.price),
                          });
                        }}
                        className={`rounded-2xl font-extrabold py-3 px-6 text-xs transition-all cursor-pointer hover:scale-[1.03] active:scale-[0.97] ${
                          combo.isPopular
                            ? 'bg-personal-blue hover:bg-sky-400 text-white shadow-lg shadow-sky-400/25'
                            : 'bg-[#0c2346] hover:bg-slate-800 text-white shadow-md shadow-[#0c2346]/10'
                        }`}
                      >
                        Lo Quiero
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>

          {/* Combos bullet checklist flyer */}
          <div className="mt-16 bg-white rounded-[2.5rem] p-8 sm:p-10 shadow-xl border border-slate-200/60 max-w-4xl mx-auto text-left relative overflow-hidden">
            <div className="absolute top-0 right-0 h-40 w-40 bg-personal-blue/5 rounded-full blur-3xl pointer-events-none" />
            <h4 className="text-base font-black uppercase tracking-wider text-[#0c2346] mb-6 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-personal-blue animate-pulse" />
              <span>¿Por qué te conviene combinar tus servicios?</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-600 leading-relaxed font-semibold">
              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0 mt-0.5 border border-emerald-100">
                  <Check className="h-4 w-4 text-emerald-500" />
                </div>
                <span>
                  <strong>Doble Mbps de Internet</strong>: Al combinar con Flow o Plan Móvil, duplicamos la velocidad de tu fibra gratis hasta 1Gbps.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0 mt-0.5 border border-emerald-100">
                  <Check className="h-4 w-4 text-emerald-500" />
                </div>
                <span>
                  <strong>Duplicamos tus Gigas</strong>:{' '}
                  {renderTextWithLogos("En tu plan móvil de Personal, te duplicamos la capacidad de datos (gigas) todos los meses de forma permanente.", 'text-personal-blue', 'h-[1.35em]')}
                </span>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0 mt-0.5 border border-emerald-100">
                  <Check className="h-4 w-4 text-emerald-500" />
                </div>
                <span>
                  <strong>Factura Única</strong>: Mayor comodidad para controlar tus gastos con una sola boleta consolidada para todos tus servicios.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0 mt-0.5 border border-emerald-100">
                  <Check className="h-4 w-4 text-emerald-500" />
                </div>
                <span>
                  <strong>Ahorro Garantizado</strong>: Contratar los servicios en combo es mucho más económico que pagarlos por separado en cuentas independientes.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Internet Hogar Section */}
      <section
        id="internet"
        className="bg-personal-blue text-white py-20 px-4 sm:px-6 lg:px-8 relative scroll-mt-20"
      >
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight">
            {renderTextWithLogos(internetBlock.title, 'text-white', 'h-[1.5em] sm:h-[1.7em]')}
          </h2>
          <p className="mt-4 text-base sm:text-lg md:text-xl text-sky-100 max-w-2xl mx-auto font-medium whitespace-pre-line">
            {renderTextWithLogos(internetBlock.subtitle, 'text-white', 'h-[1.35em]')}
          </p>

          {/* Plan Card Container */}
          <div className="mt-12 bg-personal-navy rounded-[2.5rem] p-6 sm:p-10 max-w-3xl mx-auto shadow-2xl border border-sky-950/20 text-left relative overflow-hidden">
            <div className="absolute top-0 right-0 h-40 w-40 bg-personal-blue/10 rounded-full blur-2xl pointer-events-none" />


            <div className="space-y-4">
              {internetBlock.internetPlans.map((plan, index) => {
                const match = plan.velocidad.match(/^(\d+)(.*)$/);
                const speedNum = match ? match[1] : plan.velocidad;
                const speedUnit = match ? match[2] : '';

                return (
                  <div
                    key={plan.id}
                    onClick={() =>
                      handleOpenModal({
                        name: `Internet Fibra ${plan.velocidad}`,
                        category: 'Internet Hogar',
                        price: formatGs(plan.precio),
                      })
                    }
                    className={`flex flex-row items-center justify-between gap-3 p-3 sm:p-5 rounded-2xl hover:bg-white/10 hover:shadow-xl hover:shadow-sky-500/5 hover:scale-[1.01] transition-all duration-200 cursor-pointer group ${
                      index !== internetBlock.internetPlans.length - 1
                        ? 'border-b border-sky-900/50 pb-5 sm:pb-6'
                        : ''
                    }`}
                  >
                    {/* Left Side: Icon & Speed */}
                    <div className="flex items-center gap-2.5 sm:gap-4">
                      <div className="h-10 w-10 sm:h-14 sm:w-14 rounded-xl sm:rounded-2xl bg-personal-blue/15 flex items-center justify-center text-personal-blue group-hover:bg-personal-blue group-hover:text-white transition-colors duration-300 flex-shrink-0">
                        <Globe className="h-5 w-5 sm:h-7 sm:w-7" />
                      </div>
                      <div className="flex items-baseline leading-none">
                        <span className="text-3xl sm:text-5xl md:text-6xl font-light text-white tracking-tight">
                          {speedNum}
                        </span>
                        <span className="text-base sm:text-2xl md:text-3xl font-light text-slate-300 ml-0.5 sm:ml-1 uppercase">
                          {speedUnit}
                        </span>
                      </div>
                    </div>

                    {/* Right Side: Price & Selector Button */}
                    <div className="flex items-center gap-2 sm:gap-5 flex-shrink-0">
                      <div className="relative flex flex-col items-end justify-center">
                        <p className="text-xl sm:text-3xl font-extrabold text-white leading-none">
                          <span className="font-light text-slate-300 mr-1 text-sm sm:text-2xl">Gs.</span>
                          {formatGs(plan.precio)}
                        </p>
                        <span className="absolute top-full right-0 text-[10px] sm:text-xs text-slate-400 font-light mt-1 whitespace-nowrap">
                          por mes
                        </span>
                      </div>

                      {/* Select Button CTA: Original circle arrow on desktop; solid blue circle arrow on mobile */}
                      <div className="flex-shrink-0">
                        {/* Desktop: Circle Button (glows blue on hover) */}
                        <div className="hidden sm:flex h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-white/10 border border-white/10 items-center justify-center text-white group-hover:bg-personal-blue group-hover:border-personal-blue group-hover:text-white group-hover:translate-x-1 transition-all duration-300 flex-shrink-0 shadow-md">
                          <ArrowRight className="h-5 w-5" />
                        </div>
                        {/* Mobile: Circle Button */}
                        <div className="sm:hidden flex h-8 w-8 items-center justify-center rounded-full bg-personal-blue text-white shadow-lg shadow-sky-400/20 active:scale-90 transition-all">
                          <ArrowRight className="h-4 w-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 text-center bg-white/5 rounded-2xl p-4 border border-white/5">
              <p className="text-xs sm:text-sm text-sky-200 font-semibold flex items-center justify-center gap-2">
                <Info className="h-4 w-4 flex-shrink-0" />
                <span>
                  Instalación sin costo de cableado interno en departamentos.
                  Sujeto a aprobación crediticia.
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Flow Section */}
      <section
        id="flow"
        className="bg-flow-green text-white py-20 px-4 sm:px-6 lg:px-8 relative scroll-mt-20"
      >
        <div className="mx-auto max-w-5xl text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#1c1c1e] bg-white px-3 py-1 rounded-full shadow-sm">
              Televisión Digital
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
            {flowBlock.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-emerald-100 max-w-3xl mx-auto font-medium leading-relaxed">
            {flowBlock.subtitle}
          </p>

          {/* Flow Features Card */}
          <div className="mt-12 bg-white rounded-[2.5rem] p-8 md:p-10 shadow-2xl max-w-4xl mx-auto text-slate-800">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center flex flex-col items-center">
                <div className="h-12 w-12 rounded-2xl bg-emerald-50 text-flow-green flex items-center justify-center flex-shrink-0">
                  <Smartphone className="h-6 w-6" />
                </div>
                <h4 className="font-extrabold text-sm text-slate-900 mt-4 leading-tight">
                  Multidispositivo
                </h4>
                <p className="text-[11px] text-slate-500 mt-2 leading-relaxed max-w-[180px] mx-auto">
                  Con la App de FLOW vas a poder ver donde quieras en tu celular, tablet, PC y Chromecast.
                </p>
              </div>

              <div className="text-center flex flex-col items-center">
                <div className="h-12 w-12 rounded-2xl bg-emerald-50 text-flow-green flex items-center justify-center flex-shrink-0">
                  <Play className="h-6 w-6" />
                </div>
                <h4 className="font-extrabold text-sm text-slate-900 mt-4 leading-tight">
                  Flow se adapta a vos
                </h4>
                <p className="text-[11px] text-slate-500 mt-2 leading-relaxed max-w-[180px] mx-auto">
                  Volvé a mirar, pausá, retrocedé tus programas y eventos deportivos favoritos desde el inicio.
                </p>
              </div>

              <div className="text-center flex flex-col items-center">
                <div className="h-12 w-12 rounded-2xl bg-emerald-50 text-flow-green flex items-center justify-center flex-shrink-0">
                  <Cloud className="h-6 w-6" />
                </div>
                <h4 className="font-extrabold text-sm text-slate-900 mt-4 leading-tight">
                  Grabación de contenido
                </h4>
                <p className="text-[11px] text-slate-500 mt-2 leading-relaxed max-w-[180px] mx-auto">
                  Podés grabar tus series y pelis favoritas en la nube y verlas hasta 3 meses después.
                </p>
              </div>

              <div className="text-center flex flex-col items-center">
                <div className="h-12 w-12 rounded-2xl bg-emerald-50 text-flow-green flex items-center justify-center flex-shrink-0">
                  <Monitor className="h-6 w-6" />
                </div>
                <h4 className="font-extrabold text-sm text-slate-900 mt-4 leading-tight">
                  Aplicaciones integradas
                </h4>
                <p className="text-[11px] text-slate-500 mt-2 leading-relaxed max-w-[180px] mx-auto">
                  Convertí tu televisión convencional en una SmartTv con Flow y disfrutá de streaming directo.
                </p>
              </div>
            </div>
          </div>

          {/* TV Cards plans */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {flowBlock.flowItems.map((item) => (
              <div
                key={item.id}
                onClick={() =>
                  handleOpenModal({
                    name: item.title,
                    category: 'Televisión Flow',
                    price: formatGs(item.precio),
                  })
                }
                className="bg-flow-dark rounded-[2.5rem] p-6 sm:p-10 text-left shadow-2xl border border-neutral-900 flex flex-col justify-between flow-card-hover-effect relative overflow-hidden cursor-pointer hover:scale-[1.02] hover:shadow-emerald-500/5 duration-300"
              >
                <div>
                  {/* Paramount Included Badge */}
                  <div className="inline-flex mb-4 bg-slate-950/80 border border-slate-800 text-[10px] uppercase font-bold tracking-widest text-flow-green px-3 py-1.5 rounded-full items-center gap-1.5">
                    <Star className="h-3 w-3 fill-current" />
                    <span>Paramount+ Incluido</span>
                  </div>

                  <h3 className="text-xl font-bold uppercase tracking-wider text-white">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-semibold mt-1">
                    TV por Internet - Más de 150 canales en vivo
                  </p>

                  {/* Features list */}
                  <ul className="mt-8 space-y-3">
                    <li className="flex items-start gap-2.5 text-xs text-slate-300">
                      <Check className="h-4.5 w-4.5 text-flow-green flex-shrink-0 mt-0.5" />
                      <span>
                        Más de 6.500 contenidos On Demand para ver cuando
                        quieras.
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5 text-xs text-slate-300">
                      <Check className="h-4.5 w-4.5 text-flow-green flex-shrink-0 mt-0.5" />
                      <span>
                        Paramount+ sin costo adicional incluido en tu
                        suscripción.
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5 text-xs text-slate-300">
                      <Check className="h-4.5 w-4.5 text-flow-green flex-shrink-0 mt-0.5" />
                      <span>
                        {item.type === 'con_decodificador'
                          ? 'Incluye decodificador Flow Smart con control de voz.'
                          : 'Acceso directo mediante App en Smart TV y dispositivos.'}
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="mt-10 border-t border-slate-900 pt-6">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">
                        Precio Final
                      </p>
                      <p className="text-3xl font-black text-white mt-1">
                        Gs. {formatGs(item.precio)}
                        <span className="text-xs text-slate-500 font-semibold block mt-0.5">
                          por mes
                        </span>
                      </p>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenModal({
                          name: item.title,
                          category: 'Televisión Flow',
                          price: formatGs(item.precio),
                        });
                      }}
                      className="rounded-2xl bg-flow-green hover:bg-emerald-50 text-white font-bold py-3 px-6 text-xs transition-all shadow-md shadow-emerald-500/10 cursor-pointer"
                    >
                      Lo Quiero
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>


          {/* Premium streaming packs footer */}
          <div className="mt-16 bg-flow-dark rounded-3xl p-6 shadow-2xl border border-neutral-900 max-w-4xl mx-auto overflow-hidden">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 text-left mb-6">
              Packs Premium y plataformas de streaming opcionales:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-800 items-center text-center gap-6 sm:gap-0">
              <div className="py-3 sm:py-2 sm:px-4 hover:scale-[1.05] transition-all duration-200 cursor-pointer group">
                <div className="flex justify-center items-center h-12 mb-3">
                  <img src="/img/disneyplus.svg" alt="Disney+" className="h-7 w-auto object-contain" />
                </div>
                <p className="text-sm font-black text-flow-green">
                  Gs. 99.000{' '}
                  <span className="text-[10px] text-slate-500 font-medium">
                    /mes
                  </span>
                </p>
              </div>
              <div className="py-3 sm:py-2 sm:px-4 hover:scale-[1.05] transition-all duration-200 cursor-pointer group">
                <div className="flex justify-center items-center h-12 mb-3">
                  <img src="/img/hbo.svg" alt="HBO Max" className="h-7 w-auto object-contain brightness-0 invert" />
                </div>
                <p className="text-sm font-black text-flow-green">
                  Gs. 49.900{' '}
                  <span className="text-[10px] text-slate-500 font-medium">
                    /mes
                  </span>
                </p>
              </div>
              <div className="py-3 sm:py-2 sm:px-4 hover:scale-[1.05] transition-all duration-200 cursor-pointer group">
                <div className="flex justify-center items-center h-12 mb-3">
                  <img src="/img/logo-tigo-sport.png" alt="Tigo Sports" className="h-11 w-auto object-contain" />
                </div>
                <p className="text-sm font-black text-flow-green">
                  Gs. 75.000{' '}
                  <span className="text-[10px] text-slate-500 font-medium">
                    /mes
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Telefonía Móvil Section */}
      <section
        id="movil"
        className="bg-[#0A1C36] text-white py-20 px-4 sm:px-6 lg:px-8 relative scroll-mt-20"
      >
        <div className="mx-auto max-w-5xl text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-personal-blue bg-sky-500/10 px-3 py-1 rounded-full border border-sky-500/20">
            Telefonía Móvil
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mt-4">
            {renderTextWithLogos(mobileBlock.title, 'text-white', 'h-[1.5em] sm:h-[1.7em]')}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-medium">
            {renderTextWithLogos(mobileBlock.subtitle, 'text-white', 'h-[1.35em]')}
          </p>

          {/* Mobile Benefits Card */}
          <div className="mt-12 bg-white rounded-[2.5rem] p-8 md:p-10 shadow-2xl max-w-4xl mx-auto text-slate-800">
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-4">
              <div className="text-center flex flex-col items-center">
                <div className="h-12 w-12 rounded-2xl bg-sky-50 text-personal-blue flex items-center justify-center flex-shrink-0">
                  <Phone className="h-6 w-6" />
                </div>
                <h4 className="font-extrabold text-sm text-slate-900 mt-4 leading-tight">
                  Minutos Ilimitados
                </h4>
                <p className="text-[11px] text-slate-500 mt-2 leading-relaxed max-w-[180px] mx-auto">
                  Llamadas y mensajes sin límites a todas las compañías del país.
                </p>
              </div>

              <div className="text-center flex flex-col items-center">
                <div className="h-12 w-12 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center flex-shrink-0">
                  <WhatsappIcon className="h-6 w-6" />
                </div>
                <h4 className="font-extrabold text-sm text-slate-900 mt-4 leading-tight">
                  WhatsApp Gratis
                </h4>
                <p className="text-[11px] text-slate-500 mt-2 leading-relaxed max-w-[180px] mx-auto">
                  Chateá, enviá fotos y videos sin consumir tus gigas del plan.
                </p>
              </div>

              <div className="text-center flex flex-col items-center">
                <div className="h-12 w-12 rounded-2xl bg-sky-50 text-personal-blue flex items-center justify-center flex-shrink-0">
                  <Globe className="h-6 w-6" />
                </div>
                <h4 className="font-extrabold text-sm text-slate-900 mt-4 leading-tight">
                  Roaming América
                </h4>
                <p className="text-[11px] text-slate-500 mt-2 leading-relaxed max-w-[180px] mx-auto">
                  Tus gigas te sirven para navegar en toda América como en casa.
                </p>
              </div>

              <div className="text-center flex flex-col items-center">
                <div className="h-12 w-12 rounded-2xl bg-sky-50 text-personal-blue flex items-center justify-center flex-shrink-0">
                  <Sparkles className="h-6 w-6" />
                </div>
                <h4 className="font-extrabold text-sm text-slate-900 mt-4 leading-tight">
                  FlowPass Gratis
                </h4>
                <p className="text-[11px] text-slate-500 mt-2 leading-relaxed max-w-[180px] mx-auto">
                  5GB adicionales exclusivos para disfrutar contenido en Flow App.
                </p>
              </div>

              <div className="text-center flex flex-col items-center col-span-2 lg:col-span-1 mx-auto lg:mx-0">
                <div className="h-12 w-12 rounded-2xl bg-sky-50 text-personal-blue flex items-center justify-center flex-shrink-0">
                  <Smartphone className="h-6 w-6" />
                </div>
                <h4 className="font-extrabold text-sm text-slate-900 mt-4 leading-tight">
                  Acumulá Gigas
                </h4>
                <p className="text-[11px] text-slate-500 mt-2 leading-relaxed max-w-[180px] mx-auto">
                  Los gigas que no uses este mes se te guardan para el próximo.
                </p>
              </div>
            </div>
          </div>

          {/* Grid of Mobile Plans */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {mobileBlock.mobile_item.map((plan) => (
              <div
                key={plan.id}
                onClick={() =>
                  handleOpenModal({
                    name: `Plan Móvil ${plan.cantidad_gigabytes}`,
                    category: 'Telefonía Móvil',
                    price: formatGs(plan.precio),
                  })
                }
                className="bg-white rounded-[2.5rem] p-6 sm:p-10 text-slate-800 shadow-2xl flex flex-col justify-between border border-slate-100 card-hover-effect relative overflow-hidden cursor-pointer hover:scale-[1.02] hover:shadow-sky-500/10 transition-all duration-300"
              >
                {/* Popular badge for the middle plan */}
                {plan.cantidad_gigabytes === '16GB' && (
                  <div className="absolute top-0 right-0 bg-personal-blue text-white text-[10px] font-bold uppercase tracking-wider py-1.5 px-5 rounded-bl-2xl">
                    Más Vendido
                  </div>
                )}

                <div className="text-left flex flex-col h-full justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
                      Internet Móvil
                    </span>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-6xl font-black text-slate-900 tracking-tight leading-none">
                        {plan.cantidad_gigabytes.replace(/GB/i, '')}
                      </span>
                      <span className="text-3xl font-black text-personal-blue">
                        GB
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 font-bold tracking-wide mt-1 uppercase">
                      Para navegar
                    </p>
                  </div>

                  {/* Price Block inspired by the flyer */}
                  <div className="my-6 bg-personal-blue rounded-2xl py-4 px-5 text-center text-white shadow-lg shadow-sky-400/15">
                    <p className="text-[10px] font-bold uppercase tracking-wider opacity-90">Abono mensual</p>
                    <div className="flex items-baseline justify-center gap-1 mt-1">
                      <span className="text-sm font-light opacity-85">Gs.</span>
                      <span className="text-3xl font-black tracking-tight leading-none">{formatGs(plan.precio)}</span>
                    </div>
                  </div>

                  {/* Clean highlights list */}
                  <div className="pb-6 border-b border-slate-100 flex flex-col gap-2.5">
                    <div className="inline-flex items-center gap-2.5 text-xs text-slate-600 font-semibold">
                      <div className="h-1.5 w-1.5 rounded-full bg-personal-blue flex-shrink-0" />
                      <span>Conexión LTE de alta velocidad</span>
                    </div>
                    <div className="inline-flex items-center gap-2.5 text-xs text-slate-600 font-semibold">
                      <div className="h-1.5 w-1.5 rounded-full bg-personal-blue flex-shrink-0" />
                      <span>Roaming América automático</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenModal({
                        name: `Plan Móvil ${plan.cantidad_gigabytes}`,
                        category: 'Telefonía Móvil',
                        price: formatGs(plan.precio),
                      });
                    }}
                    className="w-full rounded-2xl bg-[#0A1C36] hover:bg-personal-blue text-white font-bold py-4 text-sm transition-all duration-300 shadow-md hover:shadow-sky-400/20 hover:scale-[1.02] active:scale-[0.98] cursor-pointer text-center"
                  >
                    Lo Quiero
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Footer */}
      <Footer agentData={agentData} />

      {/* Interactive lead Modal */}
      <LeadModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        selectedPlan={selectedPlan}
        buildingName={buildingData?.name}
        agentData={agentData}
      />

      {/* Floating Whatsapp chat helper */}
      <WhatsappWidget
        onOpenLeadModal={handleOpenModal}
        buildingName={buildingData?.name}
        agentData={agentData}
      />
    </div>
  )
}
