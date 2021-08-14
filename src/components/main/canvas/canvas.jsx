import React from 'react';
import s from "../../../styles/canvas.module.css";

import {actionCreatorCountCanvasCordinates} from "../../../redux/main-reducer";

const Canvas = (props) => {
    window.onload = () => {
        clickCanv();
    }

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

    let funcDrop = (e) => {
        e.preventDefault();
        console.log('бросили');
        let cord = {x:e.pageX, y:e.pageY};
        console.log(cord);

        let ctx = e.currentTarget.getContext('2d');

        switch (props.state.mainPage.element) {
            case 'square':
                ctx.fillStyle = 'red';
                ctx.fillRect(cord.x- props.state.mainPage.canvas.leftTop.x,
                    cord.y - props.state.mainPage.canvas.leftTop.y,
                    70,70);
                break;

            case 'circle':
                ctx.fillStyle = 'green';
                ctx.beginPath();
                ctx.arc(cord.x- props.state.mainPage.canvas.leftTop.x,
                    cord.y - props.state.mainPage.canvas.leftTop.y,35,0,Math.PI*2,true);
                ctx.fill();
                ctx.closePath();
                break;

            default: break;
        }


    }

    let funcDragEnter = (e) => {
        e.preventDefault();
        console.log('зашли в зону');
    }

    let funcDragOver = (e) => {
        e.preventDefault();
        console.log('шаримся по зоне');
    }

    let funcDragLeave = (e) => {
        e.preventDefault();
        console.log('покинули зону');
    }

    return (
        <div className={s.canvas}>
            <div className={s.canvas_header}>canvas</div>
            <div className={s.canvas_body} ref={link} >
                <canvas className={s.block_with_canvas}
                        onDragEnter={(e) => funcDragEnter(e)}
                        onDragOver={(e) => funcDragOver(e)}
                        onDrop={(e) => funcDrop(e)}
                        onDragLeave={(e) => funcDragLeave(e)}
                    //если оставить здесь эти параметры, то при кликах увеличивается ширина
                    width={props.state.mainPage.canvas.rightTop.x - props.state.mainPage.canvas.leftTop.x}
                    height={props.state.mainPage.canvas.leftBottom.y - props.state.mainPage.canvas.leftTop.y}
                >square
                </canvas>
            </div>
        </div>
    )
}

export default Canvas;
