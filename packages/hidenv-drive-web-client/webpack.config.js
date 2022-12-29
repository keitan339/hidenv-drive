const baseConfig = require("@hidenv-drive/web-build/config/webpack.config.base");

module.exports = (env, argv) => {
  return baseConfig(env, argv);
};
