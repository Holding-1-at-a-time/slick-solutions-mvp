import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { ConvexProvider, ConvexReactClient } from "convex/react";

// Create a Layout component in this file if it doesn't exist elsewhere
const Layout = ({ children }: { children: React.ReactNode }) => (
  <div>{children}</div>
);
const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
if (!convexUrl) {
  throw new Error('NEXT_PUBLIC_CONVEX_URL environment variable is not set');
}
const convex = new ConvexReactClient(convexUrl);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <ClerkProvider>
        <ConvexProvider client={convex}>
          <body>
            <Layout>{children}</Layout>
          </body>
        </ConvexProvider>
      </ClerkProvider>
    </html>
  )
}
