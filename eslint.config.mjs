import next from "eslint-config-next";

const config = [...next, { ignores: [".next/**", "docs/**", "node_modules/**"] }];

export default config;
