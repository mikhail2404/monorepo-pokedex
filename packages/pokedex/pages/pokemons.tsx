import React from "react";
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";
import { GridColDef, GridEventListener, GridRowsProp } from "@mui/x-data-grid";
import axios, { AxiosError } from "axios";
import { CustomDataGrid } from "components";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { getIndex } from "utils";

import { selectPokemons, setPokemons } from "@/store/pokemons/pokemonsSlice";
import { wrapper } from "@/store/store";

const columns: GridColDef[] = [
  { field: "name", headerName: "name", flex: 1 },
  {
    field: "image",
    headerName: "image",
    renderCell: (params) => (
      <Image
        src={params.value as string}
        alt={params.row.name as string}
        width={100}
        height={100}
      />
    ),
    sortable: false,
    flex: 1,
  },
  { field: "id", headerName: "id", flex: 1 },
];

interface PokemonsProps {
  error?: string;
}

const Pokemons: React.FC<PokemonsProps> = ({ error }) => {
  const { pokemons, pokemonsCount } = useSelector(selectPokemons);
  const router = useRouter();
  const { offset, limit } = router.query;
  const initialPage = limit && offset ? Math.floor(+offset / +limit) : 0;

  const rows: GridRowsProp = pokemons.map((pokemon: Pokemon) => {
    const pokemonIndex = getIndex(pokemon.url);

    return {
      id: `#${pokemonIndex?.toString() ?? ""}`,
      name: pokemon.name,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
        pokemonIndex?.toString() ?? ""
      }.png`,
    };
  });
  const initialGridState = {
    pagination: {
      paginationModel: { page: initialPage, pageSize: limit ? +limit : 20 },
    },
  };
  const paginationModelChangeHandler = ({
    page,
    pageSize,
  }: {
    page: number;
    pageSize: number;
  }) => {
    void (async () => {
      await router.push({
        pathname: router.pathname,
        query: { offset: page * pageSize, limit: pageSize },
      });
    })();
  };

  const handleRowClick: GridEventListener<"rowClick"> = (params) => {
    void router.push(`/pokemon/${params.row.name as string}`);
  };

  if (error) {
    return (
      <Typography variant="inherit" color="error">
        {error}
      </Typography>
    );
  }

  return (
    <CustomDataGrid
      rowHeight={120}
      pageSizeOptions={[20, 50, 100]}
      paginationMode="server"
      columns={columns}
      rowsCount={pokemonsCount}
      rows={rows}
      paginationModelChangeHandler={paginationModelChangeHandler}
      handleRowClick={handleRowClick}
      initialState={initialGridState}
    />
  );
};

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async ({ query }) => {
    const { offset, limit } = query;

    try {
      const response = await axios.get<{ results: Pokemon[]; count: number }>(
        `https://pokeapi.co/api/v2/pokemon?offset=${String(
          offset
        )}&limit=${String(limit)}`
      );

      const pokemons: Pokemon[] = response.data.results;

      store.dispatch(
        setPokemons({
          pokemons,
          pokemonsCount: response.data.count,
        })
      );

      return {
        props: {} as PokemonsProps,
      };
    } catch (e) {
      const error = e as AxiosError;

      return {
        props: {
          error: error.message,
        },
      };
    }
  });

export default Pokemons;
