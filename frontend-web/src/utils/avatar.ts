export function getAvatarUrl(userId: string | undefined): string {
    const seed = encodeURIComponent(userId || 'fallback');
    return `https://api.dicebear.com/7.x/initials/svg?seed=${seed}&backgroundColor=ff2a5f&fontFamily=serif`;
}
