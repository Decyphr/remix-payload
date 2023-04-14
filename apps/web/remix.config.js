/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
    future: {
        v2_errorBoundary: true,
        v2_normalizeFormMethod: true,
        v2_meta: true,
        v2_routeConvention: true,
        unstable_tailwind: true
    },
    ignoredRouteFiles: ['**/.*'],
    assetsBuildDirectory: 'public/web/build',
    publicPath: '/web/build/',
    // serverDependenciesToBundle: [],
    // appDirectory: "app",
    // serverBuildPath: "build/index.js",
    watchPaths: ['../../packages/shared'],
};
