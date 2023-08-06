import { Children, ReactNode } from "react";
import "@style/globals.css";

export const metadata = {
  title: "Speac Explor",
  description: "Discover & share ai prompt",
};

const Rootlayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <div className="main">
          <div className="gradient"></div>
        </div>
        <main className="app">{children}</main>
      </body>
    </html>
  );
};

export default Rootlayout;
