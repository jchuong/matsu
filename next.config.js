/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
    reactStrictMode: true,
    swcMinify: true,
    output: "standalone",
    webpack: (config) => {
        config.externals.push('bun:sqlite');
        return config;
    },
};

export default config;
