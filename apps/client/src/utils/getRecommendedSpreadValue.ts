export const getRecommendedSpreadSellValue = (
    currentSpreadValue: number,
    standardDeviation: number,
) => {
    return currentSpreadValue + standardDeviation / 8;
};

export const getRecommendedSpreadBuyValue = (
    currentSpreadValue: number,
    standardDeviation: number,
) => {
    return currentSpreadValue - standardDeviation / 8;
};
