import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin(
  "./src/shared/localization/request.ts"
);

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export" as const,
  distDir: "out",
  trailingSlash: true,
  images: {
    unoptimized: true,
    domains: ["example.com", "another-domain.com"],
  },
  transpilePackages: ["@ant-design", "rc-util", "antd"],
  experimental: {
    esmExternals: false,
  },
  useFileSystemPublicRoutes: true,
};

export default withNextIntl(nextConfig);
