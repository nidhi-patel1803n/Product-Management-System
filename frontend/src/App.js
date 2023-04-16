import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import ProductList from "./components/ProductList";

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a
          href="/products"
          className="navbar-brand"
          style={{ color: "#007bff", fontWeight: 600 }}
        >
          Product Management System
        </a>
      </nav>

      <div className="container mt-3">
        <ToastContainer theme="light" type="warning" />
        <Switch>
          <Route exact path={["/", "/products"]} component={ProductList} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
