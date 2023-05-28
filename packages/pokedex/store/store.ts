import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";

import pokemonsReducer from "./pokemons/pokemonsSlice";

const makeStore = () =>
  configureStore({
    reducer: {
      pokemons: pokemonsReducer,
    },
    devTools: true,
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;

export const wrapper = createWrapper<AppStore>(makeStore);
