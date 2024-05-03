// @ts-nocheck
import React, { useEffect } from "react";
// import Header from "@components/MyComponent/Header";
import Header from "@/components/Header";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import Footer from "@/components/Footer";

const Index: React.FC = (props: {
  toggleTheme: React.MouseEventHandler<HTMLAnchorElement>;
}) => {
  const router = useRouter();

  return (
    <>
      <Header toggleTheme={props.toggleTheme} />
      <Layout />
      <Footer />
    </>
  );
};

export default Index;
