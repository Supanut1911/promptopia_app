import { ReactNode } from "react";
import "@style/globals.css";
import Nav from "@components/Nav";
import Provider from "@components/Provider";

export const metadata = {
  title: "Speac Explor",
  description: "Discover & share ai prompt",
};

const Rootlayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <Provider session={null}>
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
