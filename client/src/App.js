import React from "react";
import "./App.css";
import FDARecalls from "./components/FDARecalls/FDARecalls";
import Header from "./components/Header/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <main className="App-main">
        <FDARecalls />
      </main>
    </div>
  );
}

export default App;
