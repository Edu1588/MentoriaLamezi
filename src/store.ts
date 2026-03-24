import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Plan {
  id: string;
  namePt: string;
  nameEn: string;
  descPt: string;
  descEn: string;
  priceBRL: string;
  priceUSD: string;
  sufPt: string;
  sufEn: string;
  featuresPt: string[];
  featuresEn: string[];
  isPopular?: boolean;
}

export interface WaitlistEntry {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
}

interface AppState {
  plans: Plan[];
  waitlist: WaitlistEntry[];
  updatePlanPrice: (id: string, priceBRL: string, priceUSD: string) => void;
  addWaitlistEntry: (entry: Omit<WaitlistEntry, 'id' | 'date'>) => void;
  removeWaitlistEntry: (id: string) => void;
}

const defaultPlans: Plan[] = [
  {
    id: 'plan1',
    namePt: 'DIÁRIO',
    nameEn: 'DAILY',
    descPt: 'Consultoria pontual para resolver desafios específicos.',
    descEn: 'Specific consulting to solve punctual challenges.',
    priceBRL: 'R$ 600',
    priceUSD: '$ 300',
    sufPt: '/dia',
    sufEn: '/day',
    featuresPt: ['2 horas de consultoria', 'Feedback direto', 'Tira-dúvidas prático'],
    featuresEn: ['2 consulting hours', 'Direct feedback', 'Practical Q&A'],
  },
  {
    id: 'plan2',
    namePt: 'MENSAL',
    nameEn: 'MONTHLY',
    descPt: 'Acompanhamento de curto prazo para evolução contínua.',
    descEn: 'Short-term follow-up for continuous evolution.',
    priceBRL: 'R$ 1.000',
    priceUSD: '$ 600',
    sufPt: '/mês',
    sufEn: '/month',
    featuresPt: ['4 horas de consultoria', 'Válido por 2 dias', 'Análise de projetos', 'Acompanhamento'],
    featuresEn: ['4 consulting hours', 'Valid for 2 days', 'Project analysis', 'Follow-up'],
  },
  {
    id: 'plan3',
    namePt: 'PLANO ANUAL',
    nameEn: 'ANNUAL PLAN',
    descPt: 'O plano definitivo para dominar workflows reais.',
    descEn: 'The definitive plan to master real workflows.',
    priceBRL: 'R$ 11.000',
    priceUSD: '$ 7.200',
    sufPt: '/ano',
    sufEn: '/year',
    featuresPt: ['48 horas de consultoria', 'Válido por 24 dias/ano', 'Acesso total', 'Mentoria de carreira'],
    featuresEn: ['48 consulting hours', 'Valid for 24 days/year', 'Full access', 'Career Mentoring'],
    isPopular: true,
  }
];

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      plans: defaultPlans,
      waitlist: [],
      updatePlanPrice: (id, priceBRL, priceUSD) => set((state) => ({
        plans: state.plans.map((plan) => 
          plan.id === id ? { ...plan, priceBRL, priceUSD } : plan
        )
      })),
      addWaitlistEntry: (entry) => set((state) => ({
        waitlist: [
          ...state.waitlist, 
          { 
            ...entry, 
            id: crypto.randomUUID(), 
            date: new Date().toISOString() 
          }
        ]
      })),
      removeWaitlistEntry: (id) => set((state) => ({
        waitlist: state.waitlist.filter((entry) => entry.id !== id)
      }))
    }),
    {
      name: 'lamezi-storage',
    }
  )
);
