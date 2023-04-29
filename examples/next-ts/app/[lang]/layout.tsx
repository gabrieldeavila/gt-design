import { getDictionary } from "@/get-dictionary";
import { Kanit } from "next/font/google";
import GTWrapper from "./gtWrapper";
import StyledComponentsRegistry from "./registry";
import "./style.css";

const kanit = Kanit({
  weight: ["100", "200", "300", "400", "500", "600", "700", "900"],
  style: ["italic", "normal"],
  subsets: ["latin-ext"],
  display: "swap",
});

export const metadata = {
  template: "%s | Acme",
  description: "Generated by create next app",
};

export async function generateStaticParams() {
  return [{ lang: "en-US" }, { lang: "pt-BR" }];
}

// this page is dynamic because the cookies are used to set the theme
export const dynamic = true;

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: "en" | "pt-BR" };
}) {
  const dict = await getDictionary("en");

  return (
    <StyledComponentsRegistry>
      <html lang={params.lang} className={kanit.className}>
        <body>
          <GTWrapper serverTranslation={dict} lang={params.lang}>
            {children}
          </GTWrapper>
        </body>
      </html>
    </StyledComponentsRegistry>
  );
}
