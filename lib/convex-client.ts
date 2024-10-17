import { ConvexReactClient } from "convex/react";

export const getConvexClient = () => {
    const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
    if (!convexUrl) {
        throw new Error('NEXT_PUBLIC_CONVEX_URL environment variable is not set');
    }
    return new ConvexReactClient(convexUrl);
};  
