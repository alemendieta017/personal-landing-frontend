import React from 'react';
import { PersonalLogo } from './Header';
import WhatsappIcon from './WhatsappIcon';
import { AgentData } from '../lib/strapi';

interface FooterProps {
  agentData: AgentData;
}

export default function Footer({ agentData }: FooterProps) {
  return (
    <footer className="bg-personal-dark text-slate-300 font-sans border-t border-slate-800">
      
      {/* Upper part */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          
          {/* Col 1: Branding */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-4">
            <PersonalLogo className="h-7 text-white self-center md:self-start" />
          </div>

          {/* Col 2: Info & Contact */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Tu {agentData.genero === 'masculino' ? 'Ejecutivo' : 'Ejecutiva'} De Ventas
            </h4>
            <div className="mt-2 flex flex-col sm:flex-row items-center gap-5">
              {agentData.profilePictureUrl ? (
                <div className="h-24 w-24 rounded-full overflow-hidden border border-slate-700 flex-shrink-0 shadow-md">
                  <img 
                    src={agentData.profilePictureUrl} 
                    alt={`${agentData.nombre} ${agentData.apellido}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : (
                <div className="h-24 w-24 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-sky-400 text-3xl flex-shrink-0 shadow-md">
                  {agentData.nombre[0]}{agentData.apellido[0]}
                </div>
              )}
              <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                <p className="text-lg font-extrabold text-white">{agentData.nombre} {agentData.apellido}</p>
                <a 
                  href={`https://wa.me/${agentData.telefono.replace(/\D/g, '')}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-base text-personal-blue hover:underline flex items-center gap-2 font-bold mt-1.5"
                >
                  <WhatsappIcon className="h-5 w-5" />
                  {agentData.telefono}
                </a>
              </div>
            </div>
          </div>

          {/* Col 3: Certification */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">Certificación y Garantía</h4>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              La fibra óptica de Personal está calificada como la más rápida de Paraguay. Comprobado por usuarios independientes y certificado internacionalmente por <strong>Ookla® Speedtest®</strong>.
            </p>

          </div>

        </div>

        {/* Divider */}
        <div className="mt-10 border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p className="text-center md:text-left">
            &copy; {new Date().getFullYear()} Personal Paraguay. Todos los derechos reservados.
          </p>
          <p className="text-center md:text-right">
            Esta es una landing page de prospección comercial. Sujeto a disponibilidad técnica de cobertura en el edificio.
          </p>
        </div>
      </div>
    </footer>
  );
}
