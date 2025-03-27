export const App = () => {
  const appName = import.meta.env.VITE_APP_NAME;

  return <>Welcome to {appName} !</>;
};
