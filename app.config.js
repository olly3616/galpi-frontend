// Dynamic layer on top of app.json (Expo reads app.json first and passes it in as `config`).
//
// google-services.json is gitignored, so it is NOT present in the repo checkout during an
// EAS cloud build. Instead it is injected as the GOOGLE_SERVICES_JSON *file* secret, whose
// value at build time is the absolute path to the restored file. Locally that env var is
// unset, so we fall back to the app.json path (the file sits at the repo root, ignored by git).
module.exports = ({ config }) => ({
  ...config,
  android: {
    ...config.android,
    googleServicesFile: process.env.GOOGLE_SERVICES_JSON ?? config.android?.googleServicesFile,
  },
});
