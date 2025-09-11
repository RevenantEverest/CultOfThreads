import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        loader: "custom",
        loaderFile: "./supabaseLoader.js",
        remotePatterns: [
            {
                protocol: "https",
                hostname: "i.imgur.com"
            },
            {
                protocol: "https",
                hostname: "cdn.imgchest.com"
            },
            {
                protocol: "https",
                hostname: new URL(process.env.NEXT_PUBLIC_SUPABASE_URL as string).hostname
            }
        ]
    }
};

export default nextConfig;
