'use server';

import { fetchMetaInsights } from '@/services/metaService';

export async function getMetaFunnelData() {
  try {
    const metrics = await fetchMetaInsights();
    const { reach, spend, impressions } = metrics;

    // Cálculo do CPM: (Gasto / Impressões) * 1000
    const cpm = impressions > 0 ? (spend / impressions) * 1000 : 0;

    return {
      success: true,
      data: {
        reach,
        cpm,
        spend,
        impressions
      }
    };
  } catch (error: any) {
    console.error('Erro ao processar métricas da Meta:', error);
    return {
      success: false,
      error: error.message || 'Erro desconhecido',
      data: { reach: 0, cpm: 0, spend: 0, impressions: 0 }
    };
  }
}