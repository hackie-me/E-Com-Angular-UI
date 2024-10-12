export function isBrowserEnvironment(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
}
