
import { getDictionary } from "../../get-dictionary";
import { GTLogin } from "@geavila/gt-design";
import { useCallback } from "react";

export default async function Home({ params: { lang } }: { params: { lang: "en" | "pt-BR" } }) {
  const onPasswordForgot = useCallback(() => {
    console.log("damn");
  }, []);

  const dict = await getDictionary(lang)

  // return <GTLogin onPasswordForgot={onPasswordForgot} />;
  return <div>REQUIRED</div>;
}
