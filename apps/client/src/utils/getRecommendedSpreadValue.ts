export const getRecommendedSpreadSellValue = (
    currentSpreadValue: number,
    standardDeviation: number,
) => {
    return currentSpreadValue + standardDeviation / 4;
};

export const getRecommendedSpreadBuyValue = (
    currentSpreadValue: number,
    standardDeviation: number,
) => {
    return currentSpreadValue - standardDeviation / 4;
};
