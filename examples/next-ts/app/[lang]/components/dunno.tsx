"use client";

import { GTBasic, GTLogin } from "@geavila/gt-design";

const MagicScriptTag = () => {
  const codeToRunOnClient = `
(function() {
  const root = document.documentElement;

  const colorMode = localStorage.getItem('darkTheme') ?? 'light';

  root.style.setProperty(
    '--color',
    colorMode === 'light'
    ? 'red' : 'blue'
  );
})()
  `;
  // eslint-disable-next-line react/no-danger
  return <script dangerouslySetInnerHTML={{ __html: codeToRunOnClient }} />;
};

function Dunno() {
  return (
    // <>
    //   <MagicScriptTag />
    // </>
    <GTBasic>
      <GTLogin
        onPasswordForgot={() => {
          console.log("forgot");
        }}
      />
    </GTBasic>
  );
}

export default Dunno;
