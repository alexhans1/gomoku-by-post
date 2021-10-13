import React, { CSSProperties } from "react";
import Board from "./components/Board";
import "../styles/global.css";

// styles
const pageStyles: CSSProperties = {
  color: "#232129",
  padding: 40,
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
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
