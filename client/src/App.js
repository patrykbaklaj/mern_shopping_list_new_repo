import React from "react";
import { Provider } from "react-redux";
import { Container } from "reactstrap";
import store from "./store";
import ItemModal from "./componentns/ItemModal";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AppNavbar from "./componentns/AppNavbar";
import ShoppingList from "./componentns/ShoppingList";

function App() {
    return (
        <Provider store={store}>
            <div className="App">
                <AppNavbar />
                <Container>
                    <h1 className="text-center">Dont forget anythink!</h1>
                    <ItemModal />
                    <ShoppingList />
                </Container>
            </div>
        </Provider>
    );
}

export default App;
