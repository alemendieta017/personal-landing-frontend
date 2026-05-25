'use client'

import React from 'react'
import WhatsappIcon from './WhatsappIcon'
import { AgentData } from '../lib/strapi'

interface HeaderProps {
  onOpenLeadModal: (
    plan: { name: string; category: string; price: string } | null,
  ) => void
  agentData: AgentData
}

export function PersonalLogo({
  className = 'h-6 text-personal-blue',
}: {
  className?: string
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 1366 568"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        {/* e */}
        <path d="M294.1,185.4c-24.4,0-46.9,9.7-63.6,27.2c-16.8,17.7-26.1,42-26.1,68.4c0,27.3,8.7,50.8,25.1,67.9c16.9,17.7,40.5,27,68.4,27c14.6,0,29.2-3.2,42.2-9.2c13.5-6.2,24.9-15.2,33.9-26.7l0.8-1l-22.6-22.8l-1.1,1.3c-12.3,14.2-30.3,22.4-49.5,22.4c-33.1,0-51.3-14-55.7-42.8H377l0-1.5c0.3-12.6,0.3-17.3,0.3-23.6c0-23.2-7.8-44.7-22-60.5C340.1,194.4,318.9,185.4,294.1,185.4 M338.4,266.2h-92.9c4-28.8,20.2-42.8,49.3-42.8C319.7,223.4,337.1,240.5,338.4,266.2" />
        {/* o */}
        <path d="M782.9,185.4c-52.5,0-95.2,42.7-95.2,95.2s42.7,95.2,95.2,95.2s95.2-42.7,95.2-95.2S835.5,185.4,782.9,185.4 M840.5,280.7c0,31.7-25.8,57.5-57.5,57.5c-31.7,0-57.5-25.8-57.5-57.5s25.8-57.5,57.5-57.5C814.7,223.1,840.5,248.9,840.5,280.7" />
        {/* p */}
        <path d="M99,185.1c-27.6,0-47.8,13.2-60.1,39.2h-1.3l-0.9-34.2H4.8v245.7H43v-98h1.2c4.8,10.9,11.4,19.7,19.6,26.1c10.2,8,22.7,12.1,37.2,12.1c22,0,42.1-9.4,56.7-26.5c14.8-17.4,23-41.9,23-69.1c0-27-8.2-51.3-23-68.5C142.9,194.6,122,185.1,99,185.1 M140.7,281.3c0,34.9-19.4,58.3-48.3,58.3c-14.7,0-27.1-6-35.8-17.4C48.5,311.7,44,297,44,281c0-16.3,4.7-31.2,13.1-41.9c9-11.4,21.5-17.4,36.2-17.4c13.8,0,25.6,5.7,34.2,16.5C136.1,249.1,140.7,264,140.7,281.3" />
        {/* r */}
        <path d="M444.1,223H443l-2.3-32.6h-32.9v180.9h39.3V266.7c0-23.9,9.6-34,32-34h25.1v-42.6h-12.8C466.2,190.1,450.7,200.8,444.1,223" />
        {/* s */}
        <path d="M591.8,215.4c21.5,0,38,11.4,45.4,31.2l0.5,1.4l30.5-11.4l-0.6-1.5c-6.5-16.1-16.2-28.7-28.8-37.3c-12.9-8.8-28.5-13.2-46.3-13.2c-16.3,0-32.6,5.4-44.5,14.7c-13.2,10.4-20.5,25-20.5,41.3c0,15.5,5.6,28.3,16.6,38c9.3,8.3,22.5,14.6,40.4,19.3l0.1,0c1.3,0.3,2.6,0.6,3.9,0.9c11,2.4,21.3,4.7,28.7,8.3c7.8,3.9,11.4,8.9,11.4,15.9c0,14.1-16.8,20.4-33.4,20.4c-22,0-42.4-11.7-53.2-30.5l-0.7-1.3L513,327.2l0.6,1.3c6.7,14.4,17.7,26.3,31.8,34.5c14.2,8.2,31.4,12.6,49.7,12.6c19.6,0,37.6-4.8,50.6-13.6c14.4-9.7,22-23.4,22-39.8c0.2-15.5-6.2-27.6-19.5-37c-12.3-8.7-29-13.7-42-17c-20.2-5.7-43.1-12.1-43.1-29.8C563.1,227.1,573.8,215.4,591.8,215.4" />
        {/* n */}
        <path d="M1001.2,185.4c-13.6,0-26.5,4-37.2,11.7c-9.6,6.8-17.3,16.3-22.5,27.6h-1.6v-34.2h-36.3v180.9h39.3V270.4c0-7.7,3.3-20.3,10.6-31.1c6-8.9,17-19.6,34.8-19.6c12.3,0,21,3.5,26.6,10.8c5.4,7,8.1,17.6,8.1,32.2v108.5h39.3V257.7c0-22.5-5.2-40.3-15.4-52.8C1036.3,192,1020.9,185.4,1001.2,185.4" />
        {/* a */}
        <path d="M1246.7,335.5v-81.4c0-20.1-6.4-37.2-18.5-49.3c-12.6-12.6-30.7-19.3-52.5-19.3c-39.1,0-66.2,17.8-82.8,54.4l-0.6,1.4l34,15.9l0.7-1.4c9.4-20.1,27.7-33.7,45.5-33.7c20,0,35,13.3,35,31v12.8h-41.3c-46.2,0-75,22.2-75,58c0,15.5,5.8,28.7,16.7,38.1c10.3,8.8,24.7,13.6,40.6,13.6c14.6,0,28.4-4.2,40-12.2c10.5-7.2,19-17.4,24.6-29.4h1.3l-0.3,9.8c0,18,8.8,27.5,25.5,27.5h25.5v-31h-15.2C1247.3,340.3,1246.7,337.7,1246.7,335.5 M1207.3,298.5c-1.5,10.8-8.1,21.2-18.7,29.7c-9.5,7.5-21,12.4-29.5,12.4c-7.8,0-14.9-1.8-19.9-5.1c-5.3-3.4-8.1-8.3-8.1-14c0-7.6,4.6-13.5,13.7-17.5c8.2-3.6,19.9-5.6,33.7-5.6L1207.3,298.5L1207.3,298.5z" />
        {/* l */}
        <path d="M1329.4,125.3v203.6c0,3.4,0.4,5.4,1.2,6.5c0.8,1.1,2.3,1.6,4.9,1.6h24.5v33.3h-36.8c-10.2,0-18-3.3-23.2-9.8c-5.3-6.6-7.9-16.5-7.9-29.6V125.3H1329.4" />
      </g>
    </svg>
  )
}

export function FlowLogo({
  className = 'h-6 text-flow-green',
}: {
  className?: string
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 512 512"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M412.22,83.35c112.59,102.87,89.49,289.81-39.33,368.01C182,567.23-44.01,363.57,46.78,160.1,109.44,19.67,297.79-21.21,412.22,83.35ZM348.09,143.86c-111.19-92.87-262.66,10.7-228.47,148.8,27.93,112.8,174.46,145.66,245.58,53.69,45.31-58.59,40.68-154.22-17.12-202.49Z" />
      <polygon points="208.16 189.37 330.51 252.81 208.16 320.37 208.16 189.37" />
    </svg>
  )
}

export default function Header({ onOpenLeadModal, agentData }: HeaderProps) {
  const handleContactClick = () => {
    onOpenLeadModal({
      name: 'Consulta General',
      category: 'Asesoramiento',
      price: 'Sin costo',
    })
  }

  return (
    <header className="absolute top-0 left-0 right-0 z-30 w-full bg-transparent">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex items-center justify-center md:justify-between h-20 sm:h-24">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <a href="#" className="flex items-center">
              <PersonalLogo className="h-7 md:h-8 text-white transition-colors duration-300" />
            </a>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={handleContactClick}
              className="flex items-center gap-2 rounded-2xl py-2.5 px-5 text-sm font-bold transition-all duration-300 cursor-pointer bg-white/10 text-white hover:bg-white/20 border border-white/20 active:scale-[0.98]"
            >
              <WhatsappIcon className="h-4.5 w-4.5 text-emerald-400" />
              {agentData.nombre} {agentData.apellido} - {agentData.genero === 'masculino' ? 'Ejecutivo de Ventas Edificios' : 'Ejecutiva de Ventas Edificios'}
            </button>
          </div>
        </div>
      </nav>
    </header>
  )
}
