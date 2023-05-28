import React from "react";
import { useSelector } from "react-redux";
import { Stack, Typography } from "@mui/material";
import axios, { AxiosError } from "axios";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";

import { selectPokemons } from "@/store/pokemons/pokemonsSlice";

interface PokemonProps {
  pokemon: PokemonDetails;
  error?: string;
}

const Pokemon: React.FC<PokemonProps> = ({ pokemon, error }) => {
  const { pokemons, pokemonsCount } = useSelector(selectPokemons);

  console.log({ pokemons, pokemonsCount });
  if (error) {
    return (
      <Typography variant="inherit" color="error">
        {error}
      </Typography>
    );
  }

  return (
    <Stack className="items-center justify-center">
      <Head>
        <title>{pokemon.name}</title>
        <meta name="description" content={pokemon.name} />
      </Head>
      {pokemon.sprites.other["official-artwork"]?.front_default ? (
        <Image
          src={pokemon.sprites.other["official-artwork"]?.front_default}
          alt={"Pokemon: " + pokemon.name}
          width={400}
          height={400}
        />
      ) : (
        <p>Image can not be loaded</p>
      )}
      <p>
        <span className="font-bold mr-2">Weight:</span> {pokemon.weight}
      </p>
      <p>
        <span className="font-bold mr-2">Height:</span>
        {pokemon.height}
      </p>
      <h2 className="text-2xl mt-6 mb-2">Types</h2>
      {pokemon.types.map((type, index) => (
        <p key={index}>{type.type.name}</p>
      ))}
    </Stack>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { name } = query;

  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${String(name)}`
    );
    const pokemon: PokemonDetails = response.data as PokemonDetails;

    return {
      props: {
        pokemon,
      },
    };
  } catch (e) {
    const error = e as AxiosError;

    return {
      props: {
        error: error.message,
      },
    };
  }
};

export default Pokemon;
