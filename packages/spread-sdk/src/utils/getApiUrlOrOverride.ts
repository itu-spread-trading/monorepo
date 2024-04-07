export const getApiUrlOrOverride = (override?: string): string => {
    return override || 'https://api.ituspreadtrading.com';
};
