import React, { Component } from "react";
import { hot } from "react-hot-loader";
import 'bootstrap/dist/css/bootstrap.css'
import "./App.css";
import Game from "./components/Game/Game";

class App extends Component {
  render() {
    return (
      <div className="App container py-2">
        <h1 className="text-center">The Game</h1>
        <Game rows={10} columns={10}/>
      </div>
    );
  }
}

export default hot(module)(App);
