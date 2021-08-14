import React from 'react';
import s from "../../../styles/canvas.module.css";

import {actionCreatorCountCanvasCordinates} from "../../../redux/main-reducer";

const Canvas = (props) => {
    let link = React.createRef();

    let verxLevo;
    let nizLevo;

    let verxPravo;
    let nizPravo;

    let clickCanv = () => {
        let top = link.current.getBoundingClientRect().top;
        let left = link.current.getBoundingClientRect().left;
        let bottom = link.current.getBoundingClientRect().bottom;
        let right = link.current.getBoundingClientRect().right;

        verxLevo = {x: left, y: top};
        verxPravo = {x: right, y: top};
        nizPravo = {x: right, y: bottom};
        nizLevo = {x: left, y: bottom}

        props.dispatch(actionCreatorCountCanvasCordinates(verxLevo, verxPravo, nizPravo, nizLevo));

        console.log(verxLevo, verxPravo, nizPravo, nizLevo);
        console.log(verxPravo.x - verxLevo.x, nizLevo.y - verxLevo.y);
    }


    return (
        <div className={s.canvas}>
            <div className={s.canvas_header}>canvas</div>
            <div className={s.canvas_body} ref={link} onClick={clickCanv}>
                <canvas className={s.block_with_canvas}
                        onClick={() => console.log('сработало')}
                    //если оставить здесь эти параметры, то при кликах увеличивается ширина
                    /*width={props.state.canvas.rightTop.x - props.state.canvas.leftTop.y}
                    height={props.state.canvas.leftBottom.y - props.state.canvas.leftTop.y}*/
                >square
                </canvas>
            </div>
        </div>
    )
}

export default Canvas;
