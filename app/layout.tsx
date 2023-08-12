import { ReactNode } from "react";
import "@style/globals.css";
import Nav from "@components/Nav";
import Provider from "@components/Provider";

export const metadata = {
  title: "Promptopia",
  description: "Discover & share ai prompt",
};

const Rootlayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <link rel="icon" href="/assets/images/logo.svg" sizes="any" />
      <body>
        <Provider>
          <div className="main">
            <div className="gradient"></div>
          </div>
          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default Rootlayout;
