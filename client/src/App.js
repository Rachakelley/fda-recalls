import React from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Recalls from "./components/Recall/Recalls";
import Legend from "./components/Legend/Legend";

function App() {
  return (
    <div className="App">
      <Header />
      <main className="App-main">
        <h1>FDA Recalls</h1>
        <div className="legend-container">
          <Legend />
        </div>
        <div className="recalls-container">
          <Recalls />
        </div>
      </main>
    </div>
  );
}

export default App;
