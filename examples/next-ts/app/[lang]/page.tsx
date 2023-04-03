import { getDictionary } from "../../get-dictionary";
import Dunno from "./components/dunno";
import "./style.css";

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
      <div className="test">{dict.NO_INITIAL_SPACE}</div>
      <Dunno />
    </>
  );
}
