import { create } from 'zustand';

interface SyncStore {
    user: { id: string, email: string } | null;
    setUser: (u: any) => void;

    partner: { id: string, email: string } | null;
    setPartner: (p: any) => void;
}

export const useSyncStore = create<SyncStore>((set) => ({
    user: null, // Default
    setUser: (user) => set({ user }),
    partner: null,
    setPartner: (partner) => set({ partner })
}));
