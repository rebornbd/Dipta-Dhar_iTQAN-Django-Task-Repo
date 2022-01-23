import React from "react";
import { Header } from "../header";
import { Footer } from "../footer";


export default function Loading({ message = "loading" }) {
  return (
    <div
      style={{
        height: "60vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <span>{message}...</span>
    </div>
  );
}

export const HFLoading = ({ message = "loading" }) => {
  return (<>
    <Header />
    <Loading message={message} />
    <Footer />
  </>);
};
