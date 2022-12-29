module.exports = (api) => {
  api.cache(true);

  const presets = [
    [
      "@babel/preset-env",
      {
        modules: false,
        targets: {
          browsers: "> 1%",
        },
      },
    ],
    [
      "@babel/preset-react",
      {
        runtime: "automatic",
      },
    ],
    "@babel/preset-typescript",
  ];

  const plugins = ["@babel/plugin-transform-runtime"];

  return {
    presets,
    plugins,
  };
};
