import React from 'react';
import './App.css';

import Header from "./components/header/header";
import Main from "./components/main/main";
import Footer from "./components/footer/footer";

function App(props) {
    return (
        <div className="app">
            <Header/>
            <Main state={props.state}
                  dispatch={props.dispatch}/>
            <Footer/>
        </div>
    );
}

export default App;
