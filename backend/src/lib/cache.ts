// src/lib/cache.ts 
import NodeCache from 'node-cache';

// stdTTL: tempo de vida em segundos (10 minutos)
// check period: de quanto em quanto tempo ele limpa itens expirados
export const cache = new NodeCache({ stdTTL: 600, checkperiod: 120 });