import React from 'react';
import './App.css';
import Main from "./components/main/main";

function App(props) {
    return (
        <div className="app">
            <Main state={props.state}
                  dispatch={props.dispatch}/>
        </div>
    );
}

export default App;
