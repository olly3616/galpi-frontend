// Learn more: https://docs.expo.dev/guides/customizing-metro/
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// lucide-react-native's ESM build re-exports every icon from internal files with explicit
// `.mjs` paths (e.g. ./icons/a-arrow-down.mjs) that aren't declared in the package's
// `exports` map. With Expo's strict package-exports resolution enabled, Metro's native dev
// bundle fails ("Unable to resolve module ./icons/a-arrow-down.mjs"). Point the bare
// `lucide-react-native` import at its CJS entry instead — the CJS barrel resolves its icons
// with plain relative `.js` requires. Scoped to lucide only; every other package is untouched.
// require.resolve here runs in CJS, so the `require` export condition wins → the CJS entry.
const lucideCjsEntry = require.resolve('lucide-react-native');
const defaultResolveRequest = config.resolver.resolveRequest;
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName === 'lucide-react-native') {
    return { type: 'sourceFile', filePath: lucideCjsEntry };
  }
  if (defaultResolveRequest) {
    return defaultResolveRequest(context, moduleName, platform);
  }
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
