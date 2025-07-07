import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	basePath: "/nathanbridgetwedding",
	output: "standalone",
	images: { unoptimized: true },
};

export default nextConfig;
