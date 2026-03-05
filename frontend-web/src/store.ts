import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SyncStore {
    user: { id: string, email: string } | null;
    setUser: (u: any) => void;

    partner: { id: string, email: string } | null;
    setPartner: (p: any) => void;

    profile: any;
    setProfile: (p: any) => void;

    customAvatar: string | null;
    setCustomAvatar: (a: string | null) => void;

    notifications: any[];
    addNotification: (n: any) => void;
    clearNotifications: () => void;
}

export const useSyncStore = create<SyncStore>()(
    persist(
        (set) => ({
            user: null,
            setUser: (user) => set({ user }),
            partner: null,
            setPartner: (partner) => set({ partner }),
            profile: null,
            setProfile: (profile) => set({ profile }),
            customAvatar: null,
            setCustomAvatar: (customAvatar) => set({ customAvatar }),
            notifications: [],
            addNotification: (n) => set((s) => ({ notifications: [n, ...s.notifications] })),
            clearNotifications: () => set({ notifications: [] }),
        }),
        {
            name: 'syncheart-store', // unique name
        }
    )
);
