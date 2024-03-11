import "~/styles/globals.css";
import { Providers } from "~/components/providers/Providerts";
import { Toaster } from "sonner";
import { MyContextProvider } from "~/components/Context/MyContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Providers>
        <MyContextProvider>
          {children}
          <Toaster />{" "}
        </MyContextProvider>
      </Providers>
    </div>
  );
}
