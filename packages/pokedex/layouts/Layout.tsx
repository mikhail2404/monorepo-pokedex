import React, { ReactNode } from "react";
import { Header } from "components";
import Head from "next/head";
import { useRouter } from "next/router";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const {
    query: { name },
  } = useRouter();

  return (
    <>
      <Head>
        <title>Pokedex</title>
        <meta name="description" content={"Pokedex"} />
      </Head>
      <Header text={name ? (name as string) : "Pokedex"} linkTo="/pokemons" />
      <main className="h-90v p-10 flex items-center  justify-center ">
        {children}
      </main>
    </>
  );
};

export default Layout;
