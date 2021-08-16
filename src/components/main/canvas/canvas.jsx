import React from 'react';
import s from "../../../styles/canvas.module.css";

import {
    actionCreatorCountCanvasCordinates,
    actionCreatorPushSquareElement,
    actionCreatorChangeSquaresArr,
    actionCreatorPushCircleElement,
    actionCreatorChangeCirclesArr
} from "../../../redux/main-reducer";

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

        let mouseCordinates = {x: e.pageX, y: e.pageY};

        let ctx = e.currentTarget.getContext('2d');

        switch (props.state.mainPage.element) {
            case 'square':
                let squareStart = {
                    x: e.pageX - props.state.mainPage.canvas.leftTop.x,
                    y: e.pageY - props.state.mainPage.canvas.leftTop.y
                }
                let newSquare = {
                    topLeft: {x: squareStart.x, y: squareStart.y},
                    topRight: {x: squareStart.x + 70, y: squareStart.y},
                    bottomRight: {x: squareStart.x + 70, y: squareStart.y + 70},
                    bottomLeft: {x: squareStart.x, y: squareStart.y + 70},
                    selected: false
                }

                ctx.fillStyle = 'red';
                ctx.fillRect(squareStart.x, squareStart.y, 70, 70);
                props.dispatch(actionCreatorPushSquareElement(newSquare));
                window.store.getState();
                break;

            case 'circle':

                ctx.fillStyle = 'green';
                ctx.beginPath();
                let newCircle = {x: mouseCordinates.x - props.state.mainPage.canvas.leftTop.x,
                y: mouseCordinates.y - props.state.mainPage.canvas.leftTop.y,
                selected: false};
                /*ctx.globalCompositeOperation = 'destination-out'*/
                ctx.arc(newCircle.x, newCircle.y, 35, 0, Math.PI * 2, true);
                ctx.fill();
                ctx.closePath();

                props.dispatch(actionCreatorPushCircleElement(newCircle));
                window.store.getState();
                break;

            default:
                break;
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

    let mouseClick = (e) => {
        let ctx = e.currentTarget.getContext('2d');
        ctx.strokeStyle = 'black';

        //это координаты мыши на канвасе
        let mouseCord = {
            x: e.pageX - props.state.mainPage.canvas.leftTop.x,
            y: e.pageY - props.state.mainPage.canvas.leftTop.y
        };

        let arrSq = props.state.mainPage.arrSquares;
        let arrCr = props.state.mainPage.arrCircles;


        arrSq.forEach( i => {
         if(i.selected === true) {
            ctx.clearRect(i.topLeft.x -1, i.topLeft.y -1, 71, 71);
            ctx.fillStyle = 'red';
            ctx.fillRect(i.topLeft.x, i.topLeft.y, 71, 71);
            i.selected = false;
         }
        });

        arrCr.forEach( i => {
            if(i.selected === true) {
                ctx.globalCompositeOperation='source-over';
                ctx.beginPath();
                ctx.arc(i.x, i.y, 36, 0, Math.PI * 2, true);
                ctx.closePath();
                ctx.fillStyle = 'green';
                ctx.fill();
                i.selected = false;
                console.log('олжно было в синий');
            }

        })

        let cr = arrCr.filter( i => {
            let x = mouseCord.x - i.x;
            let y = mouseCord.y - i.y;
            let c = Math.sqrt(x**2 + y**2);
            if (c < 35) {
                return i;
            }
        })[0];

        let sq = arrSq.filter( i => {
            if ((mouseCord.x >= i.topLeft.x) && (mouseCord.x <= i.topLeft.x + 70)
                && (mouseCord.y >= i.topLeft.y) && (mouseCord.y <= i.topLeft.y + 70)) {
                return i;
            }
        })[0];


        if (cr) {
            ctx.fillStyle = 'green';
            ctx.beginPath();
            ctx.arc(cr.x, cr.y, 35, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            cr.selected = true;

            arrCr.forEach( (i, ind, arr) => {
                if ((i.x === cr.x) && (i.y === cr.y)) {
                    arrCr.splice(ind, 1);
                    arrCr.unshift(cr);
                    /*arrCr[i] = cr;*/
                }
            })

            props.dispatch(actionCreatorChangeCirclesArr(arrCr));
            return;
        }

        if (sq) {
            ctx.clearRect(sq.topLeft.x, sq.topLeft.y, 70, 70);
            ctx.fillStyle = 'red';
            ctx.fillRect(sq.topLeft.x, sq.topLeft.y, 70, 70);
            ctx.strokeRect(sq.topLeft.x, sq.topLeft.y, 70, 70);
            sq.selected = true;

            arrSq.forEach( (i, ind, arr) => {
                if (i.topLeft === sq.topLeft) {
                    arrSq.splice(ind, 1);
                    arrSq.unshift(sq);

                    /*arrSq[i] = sq;*/
                }
            })

            props.dispatch(actionCreatorChangeSquaresArr(arrSq));
            console.log(window.store.getState());
            return;
        }

       /* props.dispatch(actionCreatorChangeCirclesArr(arrCr));
        props.dispatch(actionCreatorChangeSquaresArr(arrSq));
        console.log(window.store.getState());*/
    }

    return (
        <div className={s.canvas}>
            <div className={s.canvas_header}>canvas</div>
            <div className={s.canvas_body} ref={link}>
                <canvas className={s.block_with_canvas}

                        onDragEnter={(e) => funcDragEnter(e)}
                        onDragOver={(e) => funcDragOver(e)}
                        onDrop={(e) => funcDrop(e)}
                        onDragLeave={(e) => funcDragLeave(e)}
                        onClick={(e) => {
                            mouseClick(e)
                        }}
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
