/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
    future: {
        v2_routeConvention: true,
    },
    ignoredRouteFiles: ['**/.*'],
    assetsBuildDirectory: 'public/web/build',
    publicPath: '/web/build/',
    serverDependenciesToBundle: ['@org/ui'],
    // appDirectory: "app",
    // serverBuildPath: "build/index.js",
    watchPaths: ['../../packages/ui', '../../packages/shared'],
};
