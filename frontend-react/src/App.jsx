import { useState } from "react";
import "./assets/css/style.css";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header />
      <center style={{ color: "orange", fontSize: 100, fontWeight: "bold" }}>
        Jai Shree Ram🙏
      </center>
      <Main />
      <Footer />
    </>
  );
}

export default App;
