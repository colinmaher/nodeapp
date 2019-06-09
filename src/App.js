import React, { Component } from "react";
// import logo from "./logo.svg";
import "./App.css";
import ToDO from "./pages/todo";
import { Provider as ReduxProvider } from "react-redux";
import configureStore from "./modules/store";
// import MenuAppBar from "./components/MenuAppBar"
import PersistentDrawerLeft from "./components/PersistentDrawerLeft"
// import { AppBar } from "@material-ui/core";

const reduxStore = configureStore(window.REDUX_INITIAL_DATA);

class App extends Component {
  render() {
    return (
      <ReduxProvider store={reduxStore}>
        <div className="App">
          <PersistentDrawerLeft/>
          <ToDO />
        </div>
      </ReduxProvider>
    );
  }
}

export default App;