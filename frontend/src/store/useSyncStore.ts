import { create } from 'zustand';

interface User {
    id: string;
    name: string;
    attachmentStyle?: string;
    loveLanguage?: string;
}

interface Partner {
    id: string;
    name: string;
}

interface SyncState {
    dailySyncScore: number;
    streak: number;
    user: User | null;
    partner: Partner | null;
    updateSyncScore: (score: number) => void;
    incrementStreak: () => void;
    setUser: (userData: User) => void;
    setPartner: (partnerData: Partner) => void;
}

const useSyncStore = create<SyncState>((set) => ({
    dailySyncScore: 85,
    streak: 12,
    user: null,
    partner: null,

    updateSyncScore: (score) => set({ dailySyncScore: score }),
    incrementStreak: () => set((state) => ({ streak: state.streak + 1 })),
    setUser: (userData) => set({ user: userData }),
    setPartner: (partnerData) => set({ partner: partnerData }),
}));

export default useSyncStore;
