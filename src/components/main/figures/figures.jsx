import React from 'react';
import s from "../../../styles/figures.module.css";
import {actionCreatorChangeElement} from "../../../redux/main-reducer";

const Figures = (props) => {

    let drStart = (e) => {
        e.currentTarget.style.opacity = '.3';
        let elem = e.currentTarget.id;
        props.dispatch(actionCreatorChangeElement(elem));
    }

    let drEnd = (e) => {
        e.currentTarget.style.opacity = '1';
    }

    return (
        <div className={s.figures}>
            <div className={s.figures_header}> </div>
            <div className={s.figures_body}>
                <div className={s.figures_body_square}>
                    <div id='square' className={s.square} draggable='true'
                         onDragStart={(e) => drStart(e)}
                         onDragEnd={(e) => drEnd(e)}
                    > </div>
                </div>
                <div className={s.figures_body_circle}>
                    <div id='circle' className={s.circle} draggable='true'
                         onDragStart={(e) => drStart(e)}
                         onDragEnd={(e) => drEnd(e)}> </div>
                </div>
            </div>
        </div>
    )
}

export default Figures;
