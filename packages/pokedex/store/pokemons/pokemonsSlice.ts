import type { PayloadAction } from "@reduxjs/toolkit";
import { createAction, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

import { AppState } from "@/store/store";

interface PokemonsState {
  pokemons: Pokemon[];
  pokemonsCount: number;
}

interface HydrateAction {
  type: typeof HYDRATE;
  payload: {
    pokemons?: {
      pokemons: Pokemon[];
      pokemonsCount: number;
    };
  };
}

const hydrateAction = createAction<HydrateAction>(HYDRATE);

const initialState: PokemonsState = {
  pokemons: [],
  pokemonsCount: 0,
};

export const pokemonsSlice = createSlice({
  name: "pokemons",
  initialState,
  reducers: {
    setPokemons: (
      state,
      action: PayloadAction<{ pokemons: Pokemon[]; pokemonsCount: number }>
    ) => {
      state.pokemons = action.payload.pokemons;
      state.pokemonsCount = action.payload.pokemonsCount;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(hydrateAction, (state, action) => {
      const payload = action.payload as HydrateAction["payload"];

      if (!payload.pokemons?.pokemons || !payload.pokemons?.pokemonsCount) {
        return state;
      }

      state.pokemons = payload.pokemons.pokemons;
      state.pokemonsCount = payload.pokemons.pokemonsCount;
    });
  },
});
export const { setPokemons } = pokemonsSlice.actions;

export const selectPokemons = (state: AppState) => state?.pokemons;
export default pokemonsSlice.reducer;
