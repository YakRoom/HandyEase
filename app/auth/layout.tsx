import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign up/login page",
  description: "Sign up/login page",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main>auth layout {children}</main>;
}
