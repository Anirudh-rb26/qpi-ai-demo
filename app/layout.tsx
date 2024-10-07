import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider, SignedIn, UserButton } from "@clerk/nextjs";
import { Menubar } from "@/components/ui/menubar";
import { MenubarMenu, MenubarTrigger } from "@radix-ui/react-menubar";
import 'react-toastify/dist/ReactToastify.css';


export const metadata: Metadata = {
  title: "Qpi AI",
  description: "RBAC & Upload POC",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        variables: { colorPrimary: "#3371FF", fontSize: "16px" },
      }}
    >
      <html lang="en">
        <body className="antialiased">
          <Menubar className="justify-end px-3 bg-black border-black rounded-none">
            <MenubarMenu>
              <MenubarTrigger className="mt-5">
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </MenubarTrigger>
            </MenubarMenu>
          </Menubar>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
