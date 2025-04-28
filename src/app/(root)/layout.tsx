import "~/styles/globals.css";

import Footer from "~/components/layout/footer";
import { Navbar } from "~/components/layout/navbar";

export const metadata = {
  title: "Budgets Map",
  description: "",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
