const {
    override,
    useBabelRc,
    // addDecoratorsLegacy,
    // disableEsLint,
    // addBundleVisualizer,
    // addWebpackAlias,
    // adjustWorkbox
  } = require("customize-cra");
//   const path = require("path");
  
  module.exports = override(
    // use babelrc to use your.babelrc file
    useBabelRc()
    // // enable legacy decorators babel plugin
    // addDecoratorsLegacy(),
  
    // // disable eslint in webpack
    // disableEsLint(),
  
    // // add webpack bundle visualizer if BUNDLE_VISUALIZE flag is enabled
    // process.env.BUNDLE_VISUALIZE == 1 && addBundleVisualizer(),
  
    // // add an alias for "ag-grid-react" imports
    // addWebpackAlias({
    //   ["ag-grid-react$"]: path.resolve(__dirname, "src/shared/agGridWrapper.js")
    // }),
  
    // // adjust the underlying workbox
    // adjustWorkbox(wb =>
    //   Object.assign(wb, {
    //     skipWaiting: true,
    //     exclude: (wb.exclude || []).concat("index.html")
    //   })
    // )
  );