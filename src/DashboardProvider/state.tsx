import { Dispatch, SetStateAction } from 'react';

export type State = {
  prices: {
    bac: string | null;
  };
};

export interface Dispatcher {
  updateState: Dispatch<SetStateAction<State>>;
}

export const createInitialState = (): State => ({
  prices: {
    bac: null,
  },
});
