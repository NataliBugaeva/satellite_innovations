import React from 'react';
import s from '../../styles/main.module.css';

import Figures from "./figures/figures";
import Canvas from "./canvas/canvas";


const Main = (props) => {
    return (
        <main className={s.main}>
            <div className={s.central_part}>
                <Figures state={props.state} dispatch={props.dispatch}/>
                <Canvas state={props.state} dispatch={props.dispatch}/>
            </div>
        </main>
    )
}

export default Main;
