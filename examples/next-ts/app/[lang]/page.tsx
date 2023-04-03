import { getDictionary } from "../../get-dictionary";
import { cookies } from 'next/headers';
import Dunno from "./components/dunno";
import { GetServerSideProps } from 'next';

// alter title
// alter description
export const metadata = {
  title: "About he",
};

export default async function Home({
  params: { lang },
}: {
  params: { lang: "en" | "pt-BR" };
}) {
  const dict = await getDictionary(lang);
 
  return (
    <>
      <div>{dict.NO_INITIAL_SPACE}</div>
      <Dunno />
    </>
  );
}
