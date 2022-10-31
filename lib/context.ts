import React from 'react';
import { GeneralSettings } from './types';

export const Context = React.createContext<GeneralSettings | null>(null);
