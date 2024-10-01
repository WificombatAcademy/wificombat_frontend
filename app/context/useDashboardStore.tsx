// stores/useDashboardStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface DashboardState {
  dashboardData: any;
  setDashboardData: (data: any) => void;
}

export const useDashboardStore = create<DashboardState>((set:any) => ({
  dashboardData: null,
  setDashboardData: (data:any) => set({ dashboardData: data }),
}));