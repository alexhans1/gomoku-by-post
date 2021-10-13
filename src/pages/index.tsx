import React, { CSSProperties } from "react";
import Board from "./components/Board";
import "../styles/global.css";

// styles
const pageStyles: CSSProperties = {
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
};

// markup
const IndexPage = () => {
  return (
    <main style={pageStyles}>
      <Board />
    </main>
  );
};

export default IndexPage;
