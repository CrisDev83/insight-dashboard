// services/metaService.ts

export interface MetaInsightData {
  reach: number;
  spend: number;
  impressions: number;
}

export async function fetchMetaInsights(): Promise<MetaInsightData> {
  const ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;
  const AD_ACCOUNT_ID = process.env.META_AD_ACCOUNT_ID;

  if (!ACCESS_TOKEN || !AD_ACCOUNT_ID) {
    throw new Error('Credenciais da Meta não configuradas no ambiente.');
  }

  try {
    const response = await fetch(
      `https://graph.facebook.com/v18.0/${AD_ACCOUNT_ID}/insights?fields=reach,spend,impressions&access_token=${ACCESS_TOKEN}`,
      { cache: 'no-store' } // Evita cache para garantir dados em tempo real
    );

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.message);
    }

    // Se houverem dados, somamos ou tratamos conforme necessário
    const items = data.data || [];
    
    let totalReach = 0;
    let totalSpend = 0;
    let totalImpressions = 0;

    items.forEach((item: any) => {
      totalReach += Number(item.reach || 0);
      totalSpend += Number(item.spend || 0);
      totalImpressions += Number(item.impressions || 0);
    });

    return {
      reach: totalReach,
      spend: totalSpend,
      impressions: totalImpressions,
    };
  } catch (error) {
    console.error('Erro no serviço da Meta:', error);
    // Retorna valores zerados em caso de falha para não quebrar o layout
    return { reach: 0, spend: 0, impressions: 0 };
  }
}