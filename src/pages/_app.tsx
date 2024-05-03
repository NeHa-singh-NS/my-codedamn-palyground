// _app.tsx
import React, { useState } from "react";
import type { AppProps } from "next/app";
// import { Provider } from "react-redux";
// import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
// import store, { persistor } from "@store/index";
import { PaletteMode } from "@mui/material";
import { useRouter } from "next/router";
import { Scrollbars } from "react-custom-scrollbars-2";

const cache = createCache({ key: "css", prepend: true });
const customStyle = {
  width: "100%",
  height: "100vh",
  "&::WebkitScrollbar": {
    width: "10px",
    backgroundColor: "#FFF",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#FF5733",
    borderRadius: "5px",
  },
};
const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const backgroundColor = "#FFF7F1";
  const [mode, setMode] = useState<PaletteMode>("dark");
  const theme = createTheme({
    palette: {
      mode: mode,
      background: {
        default: mode === "light" ? backgroundColor : "#191919",
      },
    },
  });
  const toggleTheme = () => {
    setMode(mode === "light" ? "dark" : "light");
  };

  return (
    // <Provider store={store}>
    //   <PersistGate loading={null} persistor={persistor}>
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Scrollbars style={customStyle}>
          <Component {...pageProps} toggleTheme={toggleTheme} />
        </Scrollbars>
      </ThemeProvider>
    </CacheProvider>
    //       </PersistGate>
    //     </Provider>
  );
};

export default App;
