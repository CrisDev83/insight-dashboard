'use client';

import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  Activity, 
  CheckCircle2, 
  ArrowUpRight, 
  Filter, 
  Download,
  Flame,
  ShieldCheck,
  HeartHandshake,
  RefreshCw
} from 'lucide-react';
import { getMetaFunnelData } from './actions/metaActions';

export default function InsightDashboard() {
  const [clienteAtual, setClienteAtual] = useState('Farias Gás (Distribuição Local)');
  
  // Estados para os dados dinâmicos do Estágio 1 (Meta Ads API)
  const [metaMetrics, setMetaMetrics] = useState({
    reach: 0,
    cpm: 0,
    loading: true,
    connected: false
  });

  const loadMetaData = async () => {
    setMetaMetrics(prev => ({ ...prev, loading: true }));
    
    const response = await getMetaFunnelData();

    if (response.success) {
      setMetaMetrics({
        reach: response.data.reach,
        cpm: response.data.cpm,
        loading: false,
        connected: true
      });
    } else {
      setMetaMetrics(prev => ({ ...prev, loading: false, connected: false }));
    }
  };

  useEffect(() => {
    loadMetaData();
  }, []);

  return (
    <div className="min-h-screen bg-[#0B0A10] text-gray-100 p-4 md:p-8 font-sans">
      
      {/* HEADER INSTITUCIONAL INSIGHT+ */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-800 pb-6 mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="bg-purple-600 text-white text-xs px-3 py-1 rounded-full font-bold tracking-wide flex items-center gap-1 shadow-sm">
              <SparklesIcon className="w-3.5 h-3.5 text-purple-200" /> INSIGHT+ INTELLIGENCE
            </span>
            <span className="bg-orange-500/10 text-orange-400 text-xs px-2.5 py-1 rounded-full font-medium border border-orange-500/20">
              Cliente: {clienteAtual}
            </span>
            <span className={`text-xs px-2.5 py-1 rounded-full font-medium border flex items-center gap-1.5 ${metaMetrics.connected ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
              <span className={`w-2 h-2 rounded-full ${metaMetrics.connected ? 'bg-emerald-400 animate-pulse' : 'bg-red-400'}`}></span> 
              {metaMetrics.connected ? 'Meta Ads API Conectada' : 'Erro na Conexão Meta'}
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
            Painel de Inteligência e Jornada de Valor
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Mapeamento analítico de performance comercial, conversão de tráfego pago e fidelidade do cliente estruturado pela Insight+.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={loadMetaData}
            title="Atualizar dados da API"
            className="bg-[#15131D] hover:bg-gray-800 border border-gray-800 rounded-lg p-2.5 text-xs text-gray-300 flex items-center gap-2 transition-all"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${metaMetrics.loading ? 'animate-spin text-purple-400' : ''}`} />
          </button>
          <div className="bg-[#15131D] border border-gray-800 rounded-lg px-3 py-2 text-xs text-gray-300 flex items-center gap-2">
            <span>Últimos 30 dias</span>
          </div>
          <button className="bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold px-4 py-2.5 rounded-lg flex items-center gap-2 transition-all shadow-lg shadow-purple-900/20">
            <Download className="w-4 h-4" /> Exportar Relatório Insight+
          </button>
        </div>
      </header>

      {/* KPI CARDS (MÉTRICAS PRINCIPAIS) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-[#15131D] border border-gray-800/80 rounded-xl p-5 relative overflow-hidden">
          <div className="flex justify-between items-start mb-3">
            <span className="text-xs font-medium text-gray-400">Valor Total Investido</span>
            <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded flex items-center gap-0.5">
              <ArrowUpRight className="w-3 h-3" /> +8.2% vs. mês ant.
            </span>
          </div>
          <div className="text-2xl md:text-3xl font-bold text-white mb-1">R$ 12.450,00</div>
          <p className="text-xs text-gray-500">Meta Ads: R$ 9.600 | Google: R$ 2.850</p>
        </div>

        <div className="bg-[#15131D] border border-gray-800/80 rounded-xl p-5 relative overflow-hidden">
          <div className="flex justify-between items-start mb-3">
            <span className="text-xs font-medium text-gray-400">Faturamento Gerado Direto</span>
            <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded flex items-center gap-0.5">
              <ArrowUpRight className="w-3 h-3" /> +24.5% vs. mês ant.
            </span>
          </div>
          <div className="text-2xl md:text-3xl font-bold text-white mb-1">R$ 48.900,00</div>
          <p className="text-xs text-gray-500">Receita atribuída por conversões diretas</p>
        </div>

        <div className="bg-[#15131D] border border-purple-500/30 rounded-xl p-5 relative overflow-hidden bg-gradient-to-br from-[#15131D] to-purple-950/20">
          <div className="flex justify-between items-start mb-3">
            <span className="text-xs font-medium text-purple-300">Taxa de Retorno Real (ROI)</span>
            <span className="text-xs text-purple-400 font-bold">Margem Líq: 44%</span>
          </div>
          <div className="text-2xl md:text-3xl font-bold text-purple-400 mb-1">3.9x <span className="text-sm font-normal text-gray-300">(+292%)</span></div>
          <p className="text-xs text-gray-400">Para cada R$ 1,00 investido, retornaram R$ 3,90</p>
        </div>

        <div className="bg-[#15131D] border border-gray-800/80 rounded-xl p-5 relative overflow-hidden">
          <div className="flex justify-between items-start mb-3">
            <span className="text-xs font-medium text-gray-400">CAC Médio Geral</span>
            <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded flex items-center gap-0.5">
              -14.7% Otimizado
            </span>
          </div>
          <div className="text-2xl md:text-3xl font-bold text-white mb-1">R$ 38,50</div>
          <p className="text-xs text-gray-500">Baseado em novos clientes únicos</p>
        </div>
      </div>

      {/* SEÇÃO DO FUNIL DE 8 ETAPAS (FORMATO AFUNILADO) */}
      <div className="bg-[#15131D] border border-gray-800 rounded-2xl p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-4 border-b border-gray-800 gap-4">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-500"></span>
              Jornada de Valor do Cliente (Funil de 8 Estágios)
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">Mapeamento sequencial contínuo de alcance em tráfego pago até a ativação dos embaixadores de alta fidelidade.</p>
          </div>
          <div className="flex items-center gap-4 text-xs text-gray-300">
            <div>Taxa Decrescente & Esperada</div>
            <div className="bg-purple-500/10 text-purple-300 px-3 py-1 rounded-lg border border-purple-500/20 font-semibold">
              100% ➔ 0.8% Embaixadores
            </div>
          </div>
        </div>

        {/* CONTAINER DO FUNIL (CENTRALIZADO COM LARGURAS DECRESCENTES) */}
        <div className="flex flex-col items-center space-y-3 w-full">
          
          {/* Estágio 1 - CONECTADO À API DA META */}
          <div className="w-full bg-[#1B1824] border border-gray-800 rounded-xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-all hover:border-purple-500/40">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-wider text-gray-400 bg-gray-800 px-2 py-0.5 rounded font-medium">Estágio 01 • Topo de Funil • "Eu sei"</span>
                <span className="text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.2 rounded font-mono">Live API</span>
              </div>
              <h3 className="text-sm font-bold text-white mt-1">1. Descoberta</h3>
              <p className="text-xs text-gray-400">Alcance de anúncio em primeiras impressões via Meta Ads (Instagram Feed & Stories).</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right">
                {metaMetrics.loading ? (
                  <span className="text-xs text-purple-400 animate-pulse block my-1">Sincronizando...</span>
                ) : (
                  <span className="text-lg font-bold text-white">{metaMetrics.reach.toLocaleString('pt-BR')}</span>
                )}
                <span className="text-xs text-gray-400 block">pessoas alcançadas</span>
              </div>
              <div className="text-right">
                <span className="text-xs text-purple-400 font-semibold">Custo/CPM</span>
                <span className="text-xs text-white block">R$ {metaMetrics.cpm.toFixed(2).replace('.', ',')}</span>
              </div>
            </div>
          </div>

          <div className="text-center text-xs text-purple-400 font-medium py-0.5">↓ 20.0% conversão</div>

          {/* Estágio 2 (92% Largura) */}
          <div className="w-[92%] bg-[#1B1824] border border-gray-800 rounded-xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-all hover:border-purple-500/40">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-gray-400 bg-gray-800 px-2 py-0.5 rounded font-medium">Estágio 02 • Interação Ativa • "Eu gostei"</span>
              <h3 className="text-sm font-bold text-white mt-1">2. Atração</h3>
              <p className="text-xs text-gray-400">Engajamento orgânico e patrocinado em criativos de conexão e valor empático.</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right">
                <span className="text-lg font-bold text-white">28.560</span>
                <span className="text-xs text-gray-400 block">engajes reais</span>
              </div>
              <div className="text-right">
                <span className="text-xs text-purple-400 font-semibold">Custo/Engaj.</span>
                <span className="text-xs text-white block">R$ 0,38</span>
              </div>
            </div>
          </div>

          <div className="text-center text-xs text-purple-400 font-medium py-0.5">↓ 15.0% conversão</div>

          {/* Estágio 3 (84% Largura) */}
          <div className="w-[84%] bg-[#1B1824] border border-gray-800 rounded-xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-all hover:border-purple-500/40">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-gray-400 bg-gray-800 px-2 py-0.5 rounded font-medium">Estágio 03 • Meio de Funil • "Quero saber mais"</span>
              <h3 className="text-sm font-bold text-white mt-1">3. Consideração</h3>
              <p className="text-xs text-gray-400">Acesso ao menu/catálogo digital e início de conversa qualificada no WhatsApp.</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right">
                <span className="text-lg font-bold text-white">4.280</span>
                <span className="text-xs text-gray-400 block">leads convertidos</span>
              </div>
              <div className="text-right">
                <span className="text-xs text-purple-400 font-semibold">Custo por Lead</span>
                <span className="text-xs text-white block">R$ 2,90</span>
              </div>
            </div>
          </div>

          <div className="text-center text-xs text-purple-400 font-medium py-0.5">↓ 20.0% Conversão Direta</div>

          {/* Estágio 4 - DESTAQUE DE COMPRA (76% Largura) */}
          <div className="w-[76%] bg-gradient-to-r from-purple-950/40 via-[#1B1824] to-[#1B1824] border border-purple-500/50 rounded-xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-lg">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-wider text-purple-300 bg-purple-500/20 px-2 py-0.5 rounded font-bold">ESTÁGIO 04 • CONVERSÃO REAL</span>
                <span className="text-[10px] bg-purple-600 text-white px-2 py-0.5 rounded font-bold">Momento de Compra</span>
              </div>
              <h3 className="text-sm font-bold text-white mt-1">4. Ação (Conversão Direta)</h3>
              <p className="text-xs text-gray-400">Conclusão de pedido ou contratação imediata com base em oferta irresistível.</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right">
                <span className="text-lg font-bold text-purple-300">856 conversões</span>
                <span className="text-xs text-emerald-400 font-bold block">R$ 48.900,00</span>
              </div>
              <div className="text-right">
                <span className="text-xs text-purple-400 font-semibold">CAC Direto</span>
                <span className="text-xs text-white block">R$ 14,54</span>
              </div>
            </div>
          </div>

          <div className="text-center text-xs text-purple-400 font-medium py-0.5">↓ 90.0% satisfação extrema</div>

          {/* Estágio 5 (68% Largura) */}
          <div className="w-[68%] bg-[#1B1824] border border-gray-800 rounded-xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-all hover:border-purple-500/40">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-gray-400 bg-gray-800 px-2 py-0.5 rounded font-medium">Estágio 05 • Encantamento • "Momento Aha"</span>
              <h3 className="text-sm font-bold text-white mt-1">5. Surpresa</h3>
              <p className="text-xs text-gray-400">Superação de expectativas com atendimento excepcional e rapidez.</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right">
                <span className="text-lg font-bold text-white">770 clientes</span>
                <span className="text-xs text-gray-400 block">(90% encantados)</span>
              </div>
              <div className="text-right">
                <span className="text-xs text-purple-400 font-semibold">Experiência</span>
                <span className="text-xs text-white block">Excepcional</span>
              </div>
            </div>
          </div>

          <div className="text-center text-xs text-purple-400 font-medium py-0.5">↓ 50.0% recompra em 45 dias</div>

          {/* Estágio 6 (60% Largura) */}
          <div className="w-[60%] bg-[#1B1824] border border-gray-800 rounded-xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-all hover:border-purple-500/40">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-gray-400 bg-gray-800 px-2 py-0.5 rounded font-medium">Estágio 06 • Retenção & LTV</span>
              <h3 className="text-sm font-bold text-white mt-1">6. Expansão</h3>
              <p className="text-xs text-gray-400">Recompra consistente e ampliação do valor do cliente (LTV).</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right">
                <span className="text-lg font-bold text-white">385 clientes</span>
                <span className="text-xs text-gray-400 block">R$ 12.500 LTV</span>
              </div>
              <div className="text-right">
                <span className="text-xs text-purple-400 font-semibold">Ciclo Médio</span>
                <span className="text-xs text-white block">45 dias</span>
              </div>
            </div>
          </div>

          <div className="text-center text-xs text-purple-400 font-medium py-0.5">↓ 60.0% prova social ativa</div>

          {/* Estágio 7 (52% Largura) */}
          <div className="w-[52%] bg-[#1B1824] border border-gray-800 rounded-xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-all hover:border-purple-500/40">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-gray-400 bg-gray-800 px-2 py-0.5 rounded font-medium">Estágio 07 • Prova Social</span>
              <h3 className="text-sm font-bold text-white mt-1">7. Defesa</h3>
              <p className="text-xs text-gray-400">Depoimentos espontâneos e avaliações positivas.</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right">
                <span className="text-lg font-bold text-white">231 avaliações</span>
                <span className="text-xs text-gray-400 block">Google 4.9 ⭐</span>
              </div>
              <div className="text-right">
                <span className="text-xs text-purple-400 font-semibold">Canal</span>
                <span className="text-xs text-white block">Redes Sociais</span>
              </div>
            </div>
          </div>

          <div className="text-center text-xs text-purple-400 font-medium py-0.5">↓ 40.0% Embaixadores</div>

          {/* Estágio 8 (45% Largura - Fundo do Funil) */}
          <div className="w-[45%] bg-gradient-to-r from-purple-950/40 via-[#1B1824] to-[#1B1824] border border-purple-500/50 rounded-xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-lg">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-wider text-purple-300 bg-purple-500/20 px-2 py-0.5 rounded font-bold">ESTÁGIO 08 • EMBAIXADORES</span>
                <span className="text-[10px] bg-emerald-500 text-black px-2 py-0.5 rounded font-bold">VIP</span>
              </div>
              <h3 className="text-sm font-bold text-white mt-1">8. Promoção</h3>
              <p className="text-xs text-gray-400">Embaixadores ativos gerando novas indicações.</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right">
                <span className="text-lg font-bold text-purple-400">92 embaixadores</span>
                <span className="text-xs text-emerald-400 font-bold block">+ R$ 22.400,00</span>
              </div>
            </div>
          </div>

      </div>
    </div>

  </div>
  );
}

function SparklesIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M3 5h4" />
      <path d="M19 17v4" />
      <path d="M17 19h4" />
    </svg>
  );
}