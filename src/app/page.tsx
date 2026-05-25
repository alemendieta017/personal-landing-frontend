import React from 'react';
import LandingPageClient from '../components/LandingPageClient';
import { getInternetBlock, getFlowBlock, getMobileBlock, getComboBlock, getBuildingByCode, getAgentData } from '../lib/strapi';

// Opt in to dynamic rendering so that database updates are reflected instantly
export const dynamic = 'force-dynamic';

export default async function Home(props: { searchParams: Promise<{ b?: string; building?: string }> }) {
  const searchParams = await props.searchParams;
  const buildingCode = searchParams.b || searchParams.building;

  // Fetch block configurations from Strapi API, agent details & building details in parallel on the server
  const [internetBlock, flowBlock, mobileBlock, comboBlock, agentData, buildingData] = await Promise.all([
    getInternetBlock(),
    getFlowBlock(),
    getMobileBlock(),
    getComboBlock(),
    getAgentData(),
    buildingCode ? getBuildingByCode(buildingCode) : Promise.resolve(null),
  ]);

  return (
    <LandingPageClient 
      internetBlock={internetBlock}
      flowBlock={flowBlock}
      mobileBlock={mobileBlock}
      comboBlock={comboBlock}
      agentData={agentData}
      buildingData={buildingData}
    />
  );
}

