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
  commercialBuildingTitle?: string;
  subtitle: string;
  internetPlans: InternetPlan[];
}

export interface FlowItem {
  id: number;
  title: string;
  type: "sin_decodificador" | "con_decodificador";
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
  portabilidad?: boolean;
}

export interface MobileBlockData {
  id: number;
  documentId: string;
  title: string;
  subtitle: string;
  mobile_item: MobileItem[];
}

export interface ComboItem {
  id: number;
  name: string;
  price: number;
  type: "dos_productos" | "tres_productos";
  internetSpeed: string;
  mobileData?: string;
  includesFlow: boolean;
  badge?: string;
  isPopular: boolean;
  originalInternetSpeed?: string;
  originalMobileData?: string;
  invoiceDiscount?: number;
}

export interface ComboBlockData {
  id: number;
  documentId: string;
  title: string;
  subtitle: string;
  ComboItem: ComboItem[];
}

const STRAPI_API_URL = process.env.STRAPI_API_URL || "http://localhost:1337";
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
      headers["Authorization"] = `Bearer ${STRAPI_API_KEY}`;
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
    console.error(
      `Error connecting to Strapi for endpoint ${endpoint}:`,
      error,
    );
    return null;
  }
}

// Fallback data in case the API is down or not seeded
export const FALLBACK_INTERNET: InternetBlockData = {
  id: 0,
  documentId: "fallback-internet",
  title: "El Wifi en mi Depto. es de Personal",
  commercialBuildingTitle: "El mejor Wifi de Personal para tu Hogar",
  subtitle:
    "Disfrutá fibra óptica más rápida del país\nComprobado por vos, certificado por Ookla.",
  internetPlans: [
    { id: 1, velocidad: "200Mbps", precio: 100000 },
    { id: 2, velocidad: "400Mbps", precio: 150000 },
    { id: 3, velocidad: "600Mbps", precio: 200000 },
    { id: 4, velocidad: "800Mbps", precio: 250000 },
    { id: 5, velocidad: "1000Mbps", precio: 500000 },
  ],
};

export const FALLBACK_FLOW: FlowBlockData = {
  id: 0,
  documentId: "fallback-flow",
  title: "Encontrá en flow todo lo que te gusta.",
  subtitle:
    "Flow ofrece una experiencia completa de entretenimiento, ya que además de ver TV en vivo, películas, radio y música de Flow, cuenta con acceso a tus cuentas de otras plataformas de streaming a través de tu televisor, como Prime Video, YouTube, HBO+, Disney+ y Netflix. Además, podés disfrutarlo en otros dispositivos como PC, celular, tablet.",
  flowItems: [
    { id: 1, title: "Flow sin Deco", type: "sin_decodificador", precio: 70000 },
    {
      id: 2,
      title: "Flow con Deco",
      type: "con_decodificador",
      precio: 100000,
    },
  ],
};

export const FALLBACK_MOBILE: MobileBlockData = {
  id: 0,
  documentId: "fallback-mobile",
  title: "Internet sin límites",
  subtitle:
    "Los planes traen gigas para navegar, llamadas ilimitadas, WhatsApp gratis, *Roaming incluido y además acumulás tus gigas que no usás.",
  mobile_item: [
    // Sin Portabilidad (Default & More attractive prices)
    { id: 1, cantidad_gigabytes: "9GB", precio: 65000, portabilidad: false },
    { id: 2, cantidad_gigabytes: "16GB", precio: 85000, portabilidad: false },
    { id: 3, cantidad_gigabytes: "22GB", precio: 120000, portabilidad: false },
    // Con Portabilidad (Less attractive prices)
    { id: 4, cantidad_gigabytes: "9GB", precio: 80000, portabilidad: true },
    { id: 5, cantidad_gigabytes: "16GB", precio: 105000, portabilidad: true },
    { id: 6, cantidad_gigabytes: "22GB", precio: 140000, portabilidad: true },
  ],
};

export const FALLBACK_COMBO: ComboBlockData = {
  id: 0,
  documentId: "fallback-combo",
  title: "Armá tu Combo y Multiplicá tus Beneficios",
  subtitle:
    "Duplicamos la velocidad de tu internet y los gigas de tu línea móvil al combinar tus servicios.",
  ComboItem: [
    {
      id: 1,
      name: "Internet 400 Mbps + Flow",
      price: 185000,
      type: "dos_productos",
      internetSpeed: "800 Mbps",
      mobileData: "",
      includesFlow: true,
      badge: "¡Velocidad duplicada de 400Mbps a 800Mbps!",
      isPopular: false,
      originalInternetSpeed: "400 Mbps",
      originalMobileData: "",
    },
    {
      id: 2,
      name: "Internet 800 Mbps + Flow",
      price: 235000,
      type: "dos_productos",
      internetSpeed: "1 Gbps",
      mobileData: "",
      includesFlow: true,
      badge: "¡Velocidad duplicada de 800Mbps a 1 Gbps!",
      isPopular: false,
      originalInternetSpeed: "800 Mbps",
      originalMobileData: "",
    },
    {
      id: 3,
      name: "Internet 400 Mbps + Plan móvil 18 GB",
      price: 165000,
      type: "dos_productos",
      internetSpeed: "800 Mbps",
      mobileData: "36 GB",
      includesFlow: false,
      badge: "¡Velocidad a 800Mbps y gigas a 36GB!",
      isPopular: false,
      originalInternetSpeed: "400 Mbps",
      originalMobileData: "18 GB",
    },
    {
      id: 4,
      name: "Internet 800 Mbps + Plan móvil 32 GB",
      price: 235000,
      type: "dos_productos",
      internetSpeed: "1 Gbps",
      mobileData: "64 GB",
      includesFlow: false,
      badge: "¡Velocidad a 1 Gbps y gigas a 64GB!",
      isPopular: false,
      originalInternetSpeed: "800 Mbps",
      originalMobileData: "32 GB",
    },
    {
      id: 5,
      name: "Internet 400 Mbps + Flow + Plan móvil 18 GB",
      price: 250000,
      type: "tres_productos",
      internetSpeed: "800 Mbps",
      mobileData: "36 GB",
      includesFlow: true,
      badge: "¡Internet a 800Mbps y gigas a 36GB!",
      isPopular: false,
      originalInternetSpeed: "400 Mbps",
      originalMobileData: "18 GB",
    },
    {
      id: 6,
      name: "Internet 400 Mbps + Flow + Plan móvil 32 GB",
      price: 270000,
      type: "tres_productos",
      internetSpeed: "800 Mbps",
      mobileData: "64 GB",
      includesFlow: true,
      badge: "¡Internet a 800Mbps y gigas a 64GB!",
      isPopular: true,
      originalInternetSpeed: "400 Mbps",
      originalMobileData: "32 GB",
    },
    {
      id: 7,
      name: "Internet 800 Mbps + Flow + Plan móvil 32 GB",
      price: 320000,
      type: "tres_productos",
      internetSpeed: "1 Gbps",
      mobileData: "64 GB",
      includesFlow: true,
      badge: "¡Internet a 1 Gbps y gigas a 64GB!",
      isPopular: true,
      originalInternetSpeed: "800 Mbps",
      originalMobileData: "32 GB",
      invoiceDiscount: 20000,
    },
    {
      id: 8,
      name: "Internet 800 Mbps + Flow + Plan móvil 18 GB",
      price: 300000,
      type: "tres_productos",
      internetSpeed: "1 Gbps",
      mobileData: "36 GB",
      includesFlow: true,
      badge: "¡Internet a 1 Gbps y gigas a 36GB!",
      isPopular: false,
      originalInternetSpeed: "800 Mbps",
      originalMobileData: "18 GB",
    },
  ],
};

// API Functions
export async function getComboBlock(): Promise<ComboBlockData> {
  const data = await fetchStrapi<ComboBlockData>("combo?populate=*");
  return data || FALLBACK_COMBO;
}

export async function getInternetBlock(): Promise<InternetBlockData> {
  const data = await fetchStrapi<InternetBlockData>(
    "internet-block?populate=*",
  );
  return data || FALLBACK_INTERNET;
}

export async function getFlowBlock(): Promise<FlowBlockData> {
  const data = await fetchStrapi<FlowBlockData>("flow-block?populate=*");
  return data || FALLBACK_FLOW;
}

export async function getMobileBlock(): Promise<MobileBlockData> {
  const data = await fetchStrapi<MobileBlockData>("mobile-block?populate=*");
  return data || FALLBACK_MOBILE;
}

export interface BuildingData {
  id: number;
  documentId: string;
  name: string;
  code: string;
  address?: string;
  type?: "building" | "commercial";
}

export async function getBuildingByCode(
  code: string,
): Promise<BuildingData | null> {
  const data = await fetchStrapi<BuildingData[]>(
    `buildings?filters[code][$eq]=${code}`,
  );
  if (data && data.length > 0) {
    return data[0];
  }
  return null;
}

export interface AgentData {
  id: number;
  documentId: string;
  nombre: string;
  apellido: string;
  telefono: string;
  genero: "femenino" | "masculino";
  profilePictureUrl?: string | null;
}

export const FALLBACK_AGENT: AgentData = {
  id: 0,
  documentId: "fallback-agent",
  nombre: "Jessica",
  apellido: "Ciancio",
  telefono: "+595 994 925 946",
  genero: "femenino",
  profilePictureUrl: null,
};

export async function getAgentData(): Promise<AgentData> {
  const rawData = await fetchStrapi<any>("agent?populate=*");
  if (!rawData) return FALLBACK_AGENT;

  return {
    id: rawData.id,
    documentId: rawData.documentId,
    nombre: rawData.nombre,
    apellido: rawData.apellido,
    telefono: rawData.telefono,
    genero: rawData.genero,
    profilePictureUrl: rawData.foto_de_perfil
      ? getStrapiMediaUrl(rawData.foto_de_perfil.url)
      : null,
  };
}

export function getStrapiMediaUrl(url: string | undefined): string | null {
  if (!url) return null;
  if (url.startsWith("/uploads/")) {
    return `/api/media${url}`;
  }
  if (url.startsWith("http://") || url.startsWith("https://")) {
    if (url.includes("http://api:1337/uploads/")) {
      return url.replace("http://api:1337", "/api/media");
    }
    return url;
  }
  return url;
}
