import { useContext } from 'react';
import GameContext from './GameContextValue';

export const useGame = () => useContext(GameContext);
