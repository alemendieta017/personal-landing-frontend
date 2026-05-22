// Strapi v5 API Service for Personal Landing Page

export interface InternetPlan {
  id: number;
  velocidad: string;
  precio: number;
}

export interface InternetBlockData {
  id: number;
  documentId: string;
  title: string;
  subtitle: string;
  internetPlans: InternetPlan[];
}

export interface FlowItem {
  id: number;
  title: string;
  type: 'sin_decodificador' | 'con_decodificador';
  precio: number;
}

export interface FlowBlockData {
  id: number;
  documentId: string;
  title: string;
  subtitle: string;
  flowItems: FlowItem[];
}

export interface MobileItem {
  id: number;
  cantidad_gigabytes: string;
  precio: number;
}

export interface MobileBlockData {
  id: number;
  documentId: string;
  title: string;
  subtitle: string;
  mobile_item: MobileItem[];
}

const STRAPI_API_URL = process.env.STRAPI_API_URL || 'http://localhost:1337';
const STRAPI_API_KEY = process.env.STRAPI_API_KEY;
const STRAPI_REVALIDATE_TIME = process.env.STRAPI_REVALIDATE_TIME 
  ? parseInt(process.env.STRAPI_REVALIDATE_TIME, 10) 
  : 60; // Default to 60 seconds

// Helper to make requests to Strapi
async function fetchStrapi<T>(endpoint: string): Promise<T | null> {
  try {
    const url = `${STRAPI_API_URL}/api/${endpoint}`;
    const headers: HeadersInit = {};
    
    if (STRAPI_API_KEY) {
      headers['Authorization'] = `Bearer ${STRAPI_API_KEY}`;
    }
    
    // We add cache configuration or revalidation
    const res = await fetch(url, {
      headers,
      next: { revalidate: STRAPI_REVALIDATE_TIME },
    });

    if (!res.ok) {
      console.warn(`Strapi fetch failed for ${endpoint}: Status ${res.status}`);
      return null;
    }

    const json = await res.json();
    return json.data as T;
  } catch (error) {
    console.error(`Error connecting to Strapi for endpoint ${endpoint}:`, error);
    return null;
  }
}

// Fallback data in case the API is down or not seeded
export const FALLBACK_INTERNET: InternetBlockData = {
  id: 0,
  documentId: 'fallback-internet',
  title: 'El Wifi en mi Depto. es de Personal',
  subtitle: 'Disfrutá fibra óptica más rápida del país\nComprobado por vos, certificado por Ookla.',
  internetPlans: [
    { id: 1, velocidad: '200Mbps', precio: 100000 },
    { id: 2, velocidad: '400Mbps', precio: 150000 },
    { id: 3, velocidad: '600Mbps', precio: 200000 },
    { id: 4, velocidad: '800Mbps', precio: 250000 },
    { id: 5, velocidad: '1000Mbps', precio: 500000 },
  ],
};

export const FALLBACK_FLOW: FlowBlockData = {
  id: 0,
  documentId: 'fallback-flow',
  title: 'Encontrá en flow todo lo que te gusta.',
  subtitle: 'Flow ofrece una experiencia completa de entretenimiento, ya que además de ver TV en vivo, películas, radio y música de Flow, cuenta con acceso a tus cuentas de otras plataformas de streaming a través de tu televisor, como Prime Video, YouTube, HBO+, Disney+ y Netflix. Además, podés disfrutarlo en otros dispositivos como PC, celular, tablet.',
  flowItems: [
    { id: 1, title: 'Flow sin Deco', type: 'sin_decodificador', precio: 70000 },
    { id: 2, title: 'Flow con Deco', type: 'con_decodificador', precio: 100000 },
  ],
};

export const FALLBACK_MOBILE: MobileBlockData = {
  id: 0,
  documentId: 'fallback-mobile',
  title: 'Internet sin límites',
  subtitle: 'Los planes traen gigas para navegar, llamadas ilimitadas, WhatsApp gratis, *Roaming incluido y además acumulás tus gigas que no usás.',
  mobile_item: [
    { id: 1, cantidad_gigabytes: '9GB', precio: 65000 },
    { id: 2, cantidad_gigabytes: '16GB', precio: 85000 },
    { id: 3, cantidad_gigabytes: '22GB', precio: 120000 },
  ],
};

// API Functions
export async function getInternetBlock(): Promise<InternetBlockData> {
  const data = await fetchStrapi<InternetBlockData>('internet-block?populate=*');
  return data || FALLBACK_INTERNET;
}

export async function getFlowBlock(): Promise<FlowBlockData> {
  const data = await fetchStrapi<FlowBlockData>('flow-block?populate=*');
  return data || FALLBACK_FLOW;
}

export async function getMobileBlock(): Promise<MobileBlockData> {
  const data = await fetchStrapi<MobileBlockData>('mobile-block?populate=*');
  return data || FALLBACK_MOBILE;
}

export interface BuildingData {
  id: number;
  documentId: string;
  name: string;
  code: string;
  address?: string;
}

export async function getBuildingByCode(code: string): Promise<BuildingData | null> {
  const data = await fetchStrapi<BuildingData[]>(`buildings?filters[code][$eq]=${code}`);
  if (data && data.length > 0) {
    return data[0];
  }
  return null;
}

