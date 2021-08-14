import React from 'react';
import s from "../../../styles/figures.module.css";

import {actionCreatorChangeCursorCordinates} from "../../../redux/main-reducer";

const Figures = (props) => {

    let link = React.createRef();

    let showFigures = () => {
        alert(link.current.type);
    }

    let mouse = {
        x: 0,
        y: 0
    }

    window.onmousemove = (e) => {
        mouse.x = e.pageX;
        mouse.y = e.pageY;
        props.dispatch(actionCreatorChangeCursorCordinates(mouse));
    }

    return (
        <div className={s.figures}>
            <div className={s.figures_header}
                 onClick={showFigures}>
                <div>x{props.state.mainPage.figures.pointerX} y{props.state.mainPage.figures.pointerY}</div>
            </div>
            <div className={s.figures_body}>
                <div className={s.figures_body_square}>
                    <div className={s.square} draggable='true'></div>
                </div>
                <div className={s.figures_body_circle}>
                    <div className={s.circle} draggable='true'></div>
                </div>
            </div>
        </div>
    )
}

export default Figures;
