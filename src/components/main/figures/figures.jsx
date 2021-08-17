import React from 'react';
import s from "../../../styles/figures.module.css";

import {actionCreatorChangeCursorCordinates, actionCreatorChangeElement} from "../../../redux/main-reducer";

const Figures = (props) => {

    /* let link = React.createRef();

     let showFigures = () => {
         alert(link.current.type);
     }*/

    let mouse = {
        x: 0,
        y: 0
    }

    window.onmousemove = (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        props.dispatch(actionCreatorChangeCursorCordinates(mouse));
    }

    let drStart = (e) => {
        e.currentTarget.style.opacity = '.3';
        let elem = e.currentTarget.id;
        props.dispatch(actionCreatorChangeElement(elem));
        console.log(window.store.getState());
    }

    let drEnd = (e) => {
        e.currentTarget.style.opacity = '1';
    }


    return (
        <div className={s.figures}>
            <div className={s.figures_header}>
                <div>x{props.state.mainPage.figures.pointerX} y{props.state.mainPage.figures.pointerY}</div>
            </div>
            <div className={s.figures_body}>
                <div className={s.figures_body_square}>
                    <div id='square' className={s.square} draggable='true'
                         onDragStart={(e) => drStart(e)}
                         onDragEnd={(e) => drEnd(e)}
                    ></div>
                </div>
                <div className={s.figures_body_circle}>

                    <div id='circle' className={s.circle} draggable='true'
                         onDragStart={(e) => drStart(e)}
                         onDragEnd={(e) => drEnd(e)}></div>
                </div>
            </div>
        </div>
    )
}

export default Figures;
