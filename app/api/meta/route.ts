import { NextResponse } from 'next/server';
import { fetchMetaInsights } from '@/services/metaService';

export async function GET() {
  try {
    const metrics = await fetchMetaInsights();
    return NextResponse.json({ success: true, data: metrics });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Erro interno' },
      { status: 500 }
    );
  }
}