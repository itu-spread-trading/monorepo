export const formatAddress = (address: string | null | undefined): string => {
    if (address == null) {
        return '';
    }
    return address.slice(0, 6) + '...' + address.slice(-4);
};
