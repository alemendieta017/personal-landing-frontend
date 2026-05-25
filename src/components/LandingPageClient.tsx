'use client'

import React, { useState, useEffect, useRef } from 'react'
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
  Zap,
} from 'lucide-react'
import WhatsappIcon from './WhatsappIcon'
import Header, { FlowLogo } from './Header'
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

  const sentinelRef = useRef<HTMLDivElement>(null)
  const [shortcutsSticky, setShortcutsSticky] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShortcutsSticky(!entry.isIntersecting)
      },
      {
        threshold: [0],
        rootMargin: '0px 0px 0px 0px',
      }
    )

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800 antialiased selection:bg-personal-blue selection:text-white">
      {/* Sticky Header */}
      <Header onOpenLeadModal={handleOpenModal} agentData={agentData} />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0A1C36] via-[#0C2346] to-[#0A1C36] text-white pt-28 sm:pt-36 pb-20 px-4 sm:px-6 lg:px-8 border-b border-sky-950">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/4 h-72 w-72 rounded-full bg-personal-blue/20 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-5xl text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-sky-500/10 px-4 py-1.5 text-xs font-semibold text-personal-blue border border-sky-500/20 mb-6 animate-pulse">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Propuesta Comercial Exclusiva</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.1] max-w-4xl">
            Aprovecha las promociones de {' '}
            <span className="text-personal-blue">Personal</span> para{' '}
            {buildingData ? buildingData.name : 'tu Departamento'}!
          </h1>
        </div>

        {/* Sentinel for sticky shortcut bar */}
        <div ref={sentinelRef} className="absolute bottom-0 left-0 right-0 h-px pointer-events-none" />
      </section>

      {/* Sticky Quick Menu Tabs Wrapper */}
      <div className={`sticky top-0 z-20 w-full flex justify-center px-4 transition-all duration-300 ${
        shortcutsSticky
          ? 'py-3 bg-white/90 backdrop-blur-md border-b border-slate-200/60 shadow-md'
          : '-mt-10 mb-6 bg-transparent'
      }`}>
        <div className={`w-full max-w-lg grid grid-cols-4 p-2 gap-2 transition-all duration-300 ${
          shortcutsSticky
            ? 'bg-transparent border-transparent'
            : 'bg-white rounded-3xl border border-slate-200/80 shadow-xl shadow-slate-950/20'
        }`}>
          <a
            href="#combos"
            className="flex flex-col items-center gap-1.5 py-2.5 rounded-2xl hover:bg-slate-50 transition-all text-slate-700 hover:text-personal-blue group"
          >
            <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shadow-inner group-hover:scale-105 group-hover:bg-white group-hover:shadow-md transition-all duration-300 p-2 sm:p-2.5">
              <img src="/img/shortcuts/combos.svg" alt="Combos" className="h-full w-full object-contain" />
            </div>
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider">
              Combos
            </span>
          </a>
          <a
            href="#internet"
            className="flex flex-col items-center gap-1.5 py-2.5 rounded-2xl hover:bg-slate-50 transition-all text-slate-700 hover:text-personal-blue group"
          >
            <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shadow-inner group-hover:scale-105 group-hover:bg-white group-hover:shadow-md transition-all duration-300 p-2 sm:p-2.5">
              <img src="/img/shortcuts/fibra.svg" alt="Fibra" className="h-full w-full object-contain" />
            </div>
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider">
              Fibra
            </span>
          </a>
          <a
            href="#flow"
            className="flex flex-col items-center gap-1.5 py-2.5 rounded-2xl hover:bg-slate-50 transition-all text-slate-700 hover:text-personal-blue group"
          >
            <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shadow-inner group-hover:scale-105 group-hover:bg-white group-hover:shadow-md transition-all duration-300 p-2 sm:p-2.5">
              <img src="/img/shortcuts/flow.svg" alt="Flow" className="h-full w-full object-contain" />
            </div>
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider">
              Flow
            </span>
          </a>
          <a
            href="#movil"
            className="flex flex-col items-center gap-1.5 py-2.5 rounded-2xl hover:bg-slate-50 transition-all text-slate-700 hover:text-personal-blue group"
          >
            <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shadow-inner group-hover:scale-105 group-hover:bg-white group-hover:shadow-md transition-all duration-300 p-2 sm:p-2.5">
              <img src="/img/shortcuts/movil.svg" alt="Móvil" className="h-full w-full object-contain" />
            </div>
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider">
              Móvil
            </span>
          </a>
        </div>
      </div>

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
              {comboBlock?.title || "¡Los Combos de Personal te convienen mucho más! 💥"}
            </h2>
            <p className="mt-4 text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
              {comboBlock?.subtitle || "Combinando tus productos de Internet Fibra, Flow TV y Telefonía móvil, accedés a beneficios exclusivos y duplicás tus velocidades de forma automática."}
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
                🔥 Combos Triple
              </button>
              <button
                onClick={() => setSelectedComboType('dos_productos')}
                className={`px-6 py-3 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-300 cursor-pointer ${
                  selectedComboType === 'dos_productos'
                    ? 'bg-[#0A1C36] text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Combos Doble
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
                                Flow TV
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

        </div>
      </section>

      {/* Internet Hogar Section */}
      <section
        id="internet"
        className="bg-gradient-to-br from-[#0092C7] via-[#00b0eb] to-[#0092C7] text-white py-20 px-4 sm:px-6 lg:px-8 relative scroll-mt-20 border-b border-sky-400/20 overflow-hidden"
      >
        {/* Glow Effects */}
        <div className="absolute top-12 left-[10%] h-72 w-72 rounded-full bg-white/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-12 right-[10%] h-72 w-72 rounded-full bg-sky-300/25 blur-3xl pointer-events-none" />

        {/* Fiber Optic Waves SVG (White semi-transparent lines) */}
        <div className="absolute inset-0 opacity-20 pointer-events-none select-none">
          <svg className="w-full h-full min-h-[600px]" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 1440 600">
            <path d="M 0 100 Q 360 80 720 150 T 1440 100" fill="none" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="3" />
            <path d="M 0 250 Q 400 350 800 200 T 1440 300" fill="none" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="2" />
            <path d="M 0 450 Q 300 400 750 480 T 1440 420" fill="none" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1.5" />
            
            <path d="M 200 0 L 200 600" fill="none" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="0.5" strokeDasharray="5,15" />
            <path d="M 600 0 L 600 600" fill="none" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="0.5" strokeDasharray="5,15" />
            <path d="M 1000 0 L 1000 600" fill="none" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="0.5" strokeDasharray="5,15" />
          </svg>
        </div>

        <div className="relative mx-auto max-w-4xl text-center">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-white bg-white/10 px-3.5 py-1.5 rounded-full border border-white/20 mb-5">
            Internet Fibra
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
            {(() => {
              if (!internetBlock.title) return null;
              const parts = internetBlock.title.split(/(personal)/i);
              return parts.map((part, index) => {
                if (part.toLowerCase() === 'personal') {
                  return (
                    <span 
                      key={index} 
                      className="bg-personal-dark text-personal-blue px-2.5 py-0.5 rounded-lg mx-1 inline-block align-middle"
                    >
                      {part}
                    </span>
                  );
                }
                return part;
              });
            })()}
          </h2>
          <p className="mt-4 text-base sm:text-lg md:text-xl text-sky-100 max-w-2xl mx-auto font-medium whitespace-pre-line">
            {internetBlock.subtitle}
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
          </div>
        </div>
      </section>

      {/* Flow Section */}
      <section
        id="flow"
        className="bg-gradient-to-br from-[#009472] via-[#00b289] to-[#009472] text-white py-20 px-4 sm:px-6 lg:px-8 relative scroll-mt-20 border-t border-emerald-400/20 border-b border-emerald-400/20 overflow-hidden"
      >
        {/* Glow Effects */}
        <div className="absolute top-12 left-[10%] h-72 w-72 rounded-full bg-white/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-12 right-[10%] h-72 w-72 rounded-full bg-emerald-300/20 blur-3xl pointer-events-none" />

        {/* Media / Flow visualizer SVG (White semi-transparent waves) */}
        <div className="absolute inset-0 opacity-20 pointer-events-none select-none">
          <svg className="w-full h-full min-h-[600px]" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 1440 600">
            <path d="M 0 150 Q 400 50 800 250 T 1440 150" fill="none" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="2.5" />
            <path d="M 0 350 Q 300 450 750 300 T 1440 380" fill="none" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1.5" strokeDasharray="10,10" />
            
            <path d="M 120 180 L 135 190 L 120 200 Z" fill="none" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1.5" />
            <path d="M 1320 250 L 1335 260 L 1320 270 Z" fill="none" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1.5" />
            <circle cx="250" cy="420" r="8" fill="none" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1" />
            <circle cx="1150" cy="120" r="12" fill="none" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1.5" />
          </svg>
        </div>

        <div className="relative mx-auto max-w-5xl text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="text-xs font-bold uppercase tracking-widest text-white bg-white/10 px-3.5 py-1.5 rounded-full border border-white/20">
              Flow
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

          {/* TV Cards plans (Restored bg-flow-dark for contrast) */}
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
                    {item.type !== 'con_decodificador' && (
                      <li className="flex items-start gap-2.5 text-[10px] text-slate-400 bg-black/30 p-3 rounded-xl border border-white/5 mt-4">
                        <Info className="h-4 w-4 text-flow-green flex-shrink-0 mt-0.5" />
                        <span>
                          La App de Flow requiere dispositivos con Android 8.0 o superior para su funcionamiento.
                        </span>
                      </li>
                    )}
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
            <div className="grid grid-cols-3 divide-x divide-slate-800 items-center text-center">
              <div className="py-2 px-1 sm:py-2 sm:px-4 hover:scale-[1.05] transition-all duration-200 cursor-pointer group">
                <div className="flex justify-center items-center h-8 sm:h-12 mb-2 sm:mb-3">
                  <img src="/img/disneyplus.svg" alt="Disney+" className="h-5 sm:h-7 w-auto object-contain" />
                </div>
                <p className="text-xs sm:text-sm font-black text-flow-green flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-1">
                  <span>Gs. 99.000</span>{' '}
                  <span className="text-[9px] sm:text-[10px] text-slate-500 font-medium">
                    /mes
                  </span>
                </p>
              </div>
              <div className="py-2 px-1 sm:py-2 sm:px-4 hover:scale-[1.05] transition-all duration-200 cursor-pointer group">
                <div className="flex justify-center items-center h-8 sm:h-12 mb-2 sm:mb-3">
                  <img src="/img/hbo.svg" alt="HBO Max" className="h-5 sm:h-7 w-auto object-contain brightness-0 invert" />
                </div>
                <p className="text-xs sm:text-sm font-black text-flow-green flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-1">
                  <span>Gs. 49.900</span>{' '}
                  <span className="text-[9px] sm:text-[10px] text-slate-500 font-medium">
                    /mes
                  </span>
                </p>
              </div>
              <div className="py-2 px-1 sm:py-2 sm:px-4 hover:scale-[1.05] transition-all duration-200 cursor-pointer group">
                <div className="flex justify-center items-center h-8 sm:h-12 mb-2 sm:mb-3">
                  <img src="/img/logo-tigo-sport.png" alt="Tigo Sports" className="h-8 sm:h-11 w-auto object-contain" />
                </div>
                <p className="text-xs sm:text-sm font-black text-flow-green flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-1">
                  <span>Gs. 75.000</span>{' '}
                  <span className="text-[9px] sm:text-[10px] text-slate-500 font-medium">
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
            {mobileBlock.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-medium">
            {mobileBlock.subtitle}
          </p>

          {/* Mobile Benefits Card */}
          <div className="mt-12 bg-white rounded-[2.5rem] p-8 md:p-10 shadow-2xl max-w-4xl mx-auto text-slate-800">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-4">
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
                  <Zap className="h-6 w-6" />
                </div>
                <h4 className="font-extrabold text-sm text-slate-900 mt-4 leading-tight">
                  Conexión LTE
                </h4>
                <p className="text-[11px] text-slate-500 mt-2 leading-relaxed max-w-[180px] mx-auto">
                  Navegá a la máxima velocidad 4G/5G en la red más rápida del país.
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
                <div className="h-12 w-12 rounded-2xl bg-emerald-50 text-flow-green flex items-center justify-center flex-shrink-0">
                  <FlowLogo className="h-6 w-6" />
                </div>
                <h4 className="font-extrabold text-sm text-slate-900 mt-4 leading-tight">
                  FlowPass Gratis
                </h4>
                <p className="text-[11px] text-slate-500 mt-2 leading-relaxed max-w-[180px] mx-auto">
                  5GB adicionales exclusivos para disfrutar contenido en Flow App.
                </p>
              </div>

              <div className="text-center flex flex-col items-center">
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
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
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
                className="bg-white rounded-3xl p-5 sm:p-7 text-slate-800 shadow-xl flex flex-col justify-between border border-slate-100 card-hover-effect relative overflow-hidden cursor-pointer hover:scale-[1.02] hover:shadow-sky-500/10 transition-all duration-300"
              >
                {/* Popular badge for the middle plan */}
                {plan.cantidad_gigabytes === '16GB' && (
                  <div className="absolute top-0 right-0 bg-personal-blue text-white text-[9px] font-black uppercase tracking-wider py-1 px-4 rounded-bl-xl">
                    Más Vendido
                  </div>
                )}

                <div className="text-left flex flex-col h-full justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-0.5">
                      Internet Móvil
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-none">
                        {plan.cantidad_gigabytes.replace(/GB/i, '')}
                      </span>
                      <span className="text-2xl font-black text-personal-blue">
                        GB
                      </span>
                      <span className="text-[11px] text-slate-500 font-bold tracking-wide ml-1.5 uppercase">
                        para navegar
                      </span>
                    </div>
                  </div>

                  {/* Compact Price Block */}
                  <div className="my-4 bg-sky-50/75 rounded-2xl py-2.5 px-4 flex items-center justify-between border border-sky-100/50">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">Abono mensual</span>
                    <div className="flex items-baseline gap-0.5">
                      <span className="text-xs font-semibold text-slate-400">Gs.</span>
                      <span className="text-xl sm:text-2xl font-black text-personal-blue tracking-tight leading-none">{formatGs(plan.precio)}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenModal({
                        name: `Plan Móvil ${plan.cantidad_gigabytes}`,
                        category: 'Telefonía Móvil',
                        price: formatGs(plan.precio),
                      });
                    }}
                    className="w-full rounded-xl bg-[#0A1C36] hover:bg-personal-blue text-white font-bold py-2.5 text-xs transition-all duration-300 shadow-md hover:shadow-sky-400/20 hover:scale-[1.01] active:scale-[0.98] cursor-pointer text-center"
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
