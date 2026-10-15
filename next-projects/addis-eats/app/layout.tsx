import type { Metadata } from "next";
import Header from "./_components/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: "Addis Café",
  description: "Fresh Ethiopian food & coffees",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
        <div className="app-shell">
          <div className="main">
            <Header />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
