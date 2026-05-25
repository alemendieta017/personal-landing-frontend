import React from 'react';
import { PersonalLogo } from './Header';
import { Shield, MapPin, CheckCircle } from 'lucide-react';
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
            <p className="text-sm text-slate-400 max-w-sm mt-2 leading-relaxed">
              Propuesta comercial exclusiva de servicios hogar y móvil para inquilinos y copropietarios del edificio residencial.
            </p>
            <div className="flex items-center gap-2 text-xs text-sky-400 font-semibold mt-1">
              <CheckCircle className="h-4 w-4" />
              <span>Soporte e instalación prioritaria</span>
            </div>
          </div>

          {/* Col 2: Info & Contact */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Tu {agentData.genero === 'masculino' ? 'Asesor' : 'Asesora'} Comercial
            </h4>
            <div className="mt-1 flex flex-col sm:flex-row items-center gap-3">
              {agentData.profilePictureUrl ? (
                <div className="h-10 w-10 rounded-full overflow-hidden border border-slate-700 flex-shrink-0">
                  <img 
                    src={agentData.profilePictureUrl} 
                    alt={`${agentData.nombre} ${agentData.apellido}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : (
                <div className="h-10 w-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-sky-400 flex-shrink-0">
                  {agentData.nombre[0]}{agentData.apellido[0]}
                </div>
              )}
              <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                <p className="text-sm font-bold text-white">{agentData.nombre} {agentData.apellido}</p>
                <a 
                  href={`https://wa.me/${agentData.telefono.replace(/\D/g, '')}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs text-personal-blue hover:underline flex items-center gap-1.5 font-semibold mt-0.5"
                >
                  <WhatsappIcon className="h-3.5 w-3.5" />
                  {agentData.telefono}
                </a>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400 mt-2">
              <MapPin className="h-4 w-4 text-slate-500" />
              <span>Instalación directa en el departamento</span>
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
