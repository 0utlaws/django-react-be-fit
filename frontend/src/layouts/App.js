import React from "react";
import '../styles/App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navigation from "./Navigation";
import Page from "./Page";
import Footer from "./Footer";
import Login from "../components/Login";
import { useCookies } from "react-cookie";



function App() {

  const [token, setToken, removeToken] = useCookies(['mr-token']);
  
  return (
      <div className="app">
        <Router>
          {token['mr-token'] ?
            <>
              <nav>
                <Navigation rmvToken={removeToken}/>
              </nav>
              <main>
                <Page />
              </main>
              <footer>
                <Footer />
              </footer>
            </>
          :
            <Route component={Login} /> 
          }  
        </Router> 
      </div>
  );
};

export default App;
