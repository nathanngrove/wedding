import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	basePath: "/",
	output: "standalone",
	images: { unoptimized: true },
};

export default nextConfig;
