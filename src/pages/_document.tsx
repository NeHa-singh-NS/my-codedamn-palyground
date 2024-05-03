import React, { useEffect, useState } from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import { CacheProvider } from "@emotion/react";
import createEmotionCache from "@emotion/cache";

const cache = createEmotionCache({ key: "css" });

const MyDocument = () => {
  return (
    <Html lang="en">
      <Head></Head>
      <body>
        <CacheProvider value={cache}>
          <Main />
          <NextScript />
        </CacheProvider>
      </body>
    </Html>
  );
};

export default MyDocument;
