import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin(
  "./src/shared/localization/request.ts"
);

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export" as const,
  trailingSlash: true,
  images: {
    unoptimized: true,
    domains: ["", ""],
  },
  useFileSystemPublicRoutes: true,
};

export default withNextIntl(nextConfig);
