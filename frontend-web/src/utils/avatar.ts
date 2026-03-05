export function getAvatarUrl(userId: string | undefined): string {
    if (!userId) return "https://api.dicebear.com/7.x/adventurer/svg?seed=fallback";
    // Deterministic male/female based on user ID
    const isMale = userId.charCodeAt(0) % 2 === 0;
    const seed = encodeURIComponent(userId);
    return isMale
        ? `https://api.dicebear.com/7.x/adventurer/svg?seed=${seed}&backgroundColor=b6e3f4&hair=short01,short02`
        : `https://api.dicebear.com/7.x/adventurer/svg?seed=${seed}&backgroundColor=ffdfbf&hair=long01,long02`;
}
