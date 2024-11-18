/** @type {import("prettier").Config} */
const config = {
    tabWidth: 4,
    semi: true,
    trailingComma: "es5",
    bracketSpacing: true,
    bracketSameLine: true,
    arrowParens: "always",
    plugins: ["prettier-plugin-astro"],
    printWidth: 400,
    singleQuote: false,
};

export default config;
