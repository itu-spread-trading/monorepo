import { defaultMarketData } from '@/queries';
import { MarketData } from '@/types';
import { createContext, useContext } from 'react';

export const context = createContext<MarketData>(defaultMarketData);

export const MarketDataProvider = context.Provider;

export const useMarketDataContext = () => useContext(context);
