import { create } from 'zustand';

type State = { token: string; setToken: (token: string) => void; wsConnected: boolean; setWsConnected: (v: boolean) => void };

export const useAppStore = create<State>((set) => ({ token: '', setToken: (token) => set({ token }), wsConnected: false, setWsConnected: (wsConnected) => set({ wsConnected }) }));
