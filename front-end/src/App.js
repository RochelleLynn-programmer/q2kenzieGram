import React from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./components/navbar/NavBar";
import Form from "./components/form/Form";
import Photos from "./components/photos/Photos";

function App() {
  return (
    <>
      <NavBar></NavBar>
      <div className="app">
        <Switch>
          <Route exact path="/">
            <Form></Form>
          </Route>
          <Route path="/photos">
            <Photos></Photos>
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default App;
