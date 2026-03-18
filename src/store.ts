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
    namePt: 'ACESSO DIÁRIO',
    nameEn: 'DAILY ACCESS',
    descPt: 'Ideal para projetos rápidos ou para conhecer a plataforma.',
    descEn: 'Ideal for quick projects or to get to know the platform.',
    priceBRL: 'R$ 49',
    priceUSD: '$ 9',
    sufPt: '/dia',
    sufEn: '/day',
    featuresPt: ['Acesso a todos os módulos por 24h', 'Material de apoio básico', 'Suporte via comunidade'],
    featuresEn: ['Access to all modules for 24h', 'Basic support material', 'Community support'],
  },
  {
    id: 'plan2',
    namePt: 'ACESSO MENSAL',
    nameEn: 'MONTHLY ACCESS',
    descPt: 'Para quem quer estudar no seu próprio ritmo.',
    descEn: 'For those who want to study at their own pace.',
    priceBRL: 'R$ 197',
    priceUSD: '$ 39',
    sufPt: '/mês',
    sufEn: '/month',
    featuresPt: ['Acesso ilimitado por 30 dias', 'Downloads de assets', 'Suporte prioritário'],
    featuresEn: ['Unlimited access for 30 days', 'Asset downloads', 'Priority support'],
  },
  {
    id: 'plan3',
    namePt: 'ACESSO ANUAL',
    nameEn: 'YEARLY ACCESS',
    descPt: 'A melhor escolha para profissionais sérios.',
    descEn: 'The best choice for serious professionals.',
    priceBRL: 'R$ 997',
    priceUSD: '$ 199',
    sufPt: '/ano',
    sufEn: '/year',
    featuresPt: ['12 meses de acesso total', 'Mentoria em grupo mensal', 'Certificado de conclusão'],
    featuresEn: ['12 months of full access', 'Monthly group mentoring', 'Certificate of completion'],
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
