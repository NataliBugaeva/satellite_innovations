import React from 'react';
import s from "../../../styles/canvas.module.css";

import {
    actionCreatorCountCanvasCordinates,
    actionCreatorPushElem,
    actionCreatorChangeElementsArr,
    actionCreatorChangeMouseIsDown,
    actionCreatorChangeSelectedElement,
    actionCreatorChangeSelectedElementType,
    actionCreatorButtonDisable
} from "../../../redux/main-reducer";

const Canvas = (props) => {
    let canvas = props.state.mainPage.canvas;
    let canvasWidth = canvas.rightTop.x - canvas.leftTop.x;
    let canvasHeight = canvas.leftBottom.y - canvas.leftTop.y;


    let link = React.createRef();
    let myCanvas = React.createRef();


    window.onload = () => {
        clickCanv();
    }

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
        console.log(props.state.mainPage.canvas.leftTop.x, props.state.mainPage.canvas.leftTop.y);
    }


    let funcDrop = (e) => {
        e.preventDefault();

        let ctx = e.currentTarget.getContext('2d');

        switch (props.state.mainPage.element) {
            case 'square':
                let squareStart = {
                    x: e.clientX - props.state.mainPage.canvas.leftTop.x,
                    y: e.clientY - props.state.mainPage.canvas.leftTop.y
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

                props.dispatch(actionCreatorPushElem(newSquare));
                break;

            case 'circle':

                ctx.fillStyle = 'green';

                let newCircle = {
                   /* x: mouseCordinates.x - props.state.mainPage.canvas.leftTop.x,
                    y: mouseCordinates.y - props.state.mainPage.canvas.leftTop.y,*/
                    x: e.clientX - props.state.mainPage.canvas.leftTop.x,
                    y: e.clientY - props.state.mainPage.canvas.leftTop.y,
                    selected: false
                };
                ctx.beginPath();
                ctx.arc(newCircle.x, newCircle.y, 35, 0, Math.PI * 2, true);
                ctx.fill();
                ctx.closePath();

                props.dispatch(actionCreatorPushElem(newCircle));
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


    //функция перерисовки всего массива
    let redraw = (elements, ctx) => {
        elements.reverse();
        elements.forEach( i => {
            if(i.topLeft && i.selected === true) {
                ctx.fillStyle = 'red';
                ctx.fillRect(i.topLeft.x, i.topLeft.y, 70, 70);
                ctx.strokeRect(i.topLeft.x, i.topLeft.y, 70, 70);
            } else if (i.topLeft) {
                ctx.fillStyle = 'red';
                ctx.fillRect(i.topLeft.x, i.topLeft.y, 70, 70);
            } else if (i.x && i.selected === true) {
                ctx.fillStyle = 'green';
                ctx.beginPath();
                ctx.arc(i.x, i.y, 35, 0, Math.PI * 2, true);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();
            } else if (i.x) {
                ctx.fillStyle = 'green';
                ctx.beginPath();
                ctx.arc(i.x, i.y, 36, 0, Math.PI * 2, true);
                ctx.closePath();
                ctx.fill();
            } else alert('хрень какая-то');
        })
    }

    //возвращает массив элементов без удаленного
    let removeFigure = (elements, selectedElement, selectedElementType, ctx, redraw) => {
        switch (selectedElementType) {
            case 'square':
                elements.forEach((i, ind) => {
                    if (i.topLeft === selectedElement.topLeft) {
                        elements.splice(ind, 1);
                    }
                })
            return elements;

            case 'circle':
                elements.forEach((i, ind) => {
                    if ((i.x === selectedElement.x) && (i.y === selectedElement.y)) {
                        elements.splice(ind, 1);
                    }
                })
            return elements;


            default: return elements;
        }

       /* redraw(elements, ctx);*/
      /*  elements.reverse();
        props.dispatch(actionCreatorChangeElementsArr(elements));*/
    }

    //по клику на кнопку удаляем элемент с канваса
    let clickButton = () => {
        let ctx = myCanvas.current.getContext('2d');
        let elements = props.state.mainPage.arrElements;
        let selectedElement = props.state.mainPage.selected;
        let selectedElementType = props.state.mainPage.selectedElementType;
        elements = removeFigure(elements,selectedElement,selectedElementType);
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        redraw(elements, ctx);
        elements.reverse();
        props.dispatch(actionCreatorChangeElementsArr(elements));
        props.dispatch(actionCreatorButtonDisable(true));
        console.log(props.state.mainPage.arrElements.length);
    }





    //это событие на mousedawn
    let mouseClick = (e) => {

        props.dispatch(actionCreatorChangeMouseIsDown(true));

        let ctx = e.currentTarget.getContext('2d');
        ctx.strokeStyle = 'black';
       //координаты мышт на канвасе
        let mouseCord = {
            x: e.clientX - props.state.mainPage.canvas.leftTop.x,
            y: e.clientY - props.state.mainPage.canvas.leftTop.y
        };

        let arrElements = props.state.mainPage.arrElements;
        //перед каждым нажатие мыши я проверяю выбран ли како-нибудь элемент (из массива эл-ов в пропсах)
        //и если да, то перерисовываю этот элемент уже без обводки и делаю его не выбранным
        arrElements.forEach(i => {
            if (i.selected === true) {
                if (i.x) {
                    ctx.globalCompositeOperation = 'source-over';
                    ctx.beginPath();
                    ctx.arc(i.x, i.y, 36, 0, Math.PI * 2, true);
                    ctx.closePath();
                    ctx.fillStyle = 'green';
                    ctx.fill();
                } else if (i.topLeft) {
                    ctx.clearRect(i.topLeft.x - 1, i.topLeft.y - 1, 71, 71);
                    ctx.fillStyle = 'red';
                    ctx.fillRect(i.topLeft.x, i.topLeft.y, 71, 71);
                }
                i.selected = false;
            }
        })

            //проверяю, попал ли клик на каую-нибудь фигуру
            //если нет, то в пропсах selected и selectedElementType делаю false и прекращаю выполнение ф-ции
        let element = arrElements.find(i => {
            if (i.x) {
                let x = mouseCord.x - i.x;
                let y = mouseCord.y - i.y;
                let c = Math.sqrt(x ** 2 + y ** 2);
                if (c < 35) {
                    console.log('на круге');
                    return i;
                }
            } else if (i.topLeft) {
                if ((mouseCord.x >= i.topLeft.x) && (mouseCord.x <= i.topLeft.x + 70)
                    && (mouseCord.y >= i.topLeft.y) && (mouseCord.y <= i.topLeft.y + 70)) {
                    console.log('на квадрате');
                    return i;
                }
            }
            console.log('не на фигуре');
            return '';
        });

        if (!element) {
            props.dispatch(actionCreatorChangeSelectedElement(false));
            props.dispatch(actionCreatorChangeSelectedElementType(''));
            props.dispatch(actionCreatorButtonDisable(true));
            console.log(props.state.mainPage.buttonState);
            return;
        }

        //если элемент есть и у него есть значение topLeft, значит попали на квадрат
        //и перерисовываем квадрат уже с обводкой
        //перебираем массив элементов, удаляем из него тот,на который сейчас попали и запушиваем
        //этот элемент в начало массива и обновляем пропсы и выходим из функции
        if (element.topLeft) {
            ctx.clearRect(element.topLeft.x, element.topLeft.y, 70, 70);
            ctx.fillStyle = 'red';
            ctx.fillRect(element.topLeft.x, element.topLeft.y, 70, 70);
            ctx.strokeRect(element.topLeft.x, element.topLeft.y, 70, 70);
            element.selected = true;
            props.dispatch(actionCreatorChangeSelectedElement(element));
            props.dispatch(actionCreatorChangeSelectedElementType('square'));
            props.dispatch(actionCreatorButtonDisable(false));


            arrElements.forEach((i, ind) => {
                if (i.topLeft === element.topLeft) {
                    arrElements.splice(ind, 1);
                    arrElements.unshift(element);
                }
            })

            props.dispatch(actionCreatorChangeElementsArr(arrElements));
            console.log(props.state.mainPage.selected);
            return;
        }

        //если элемент есть и у него есть значение x, значит попали на круг
        //и перерисовываем круг уже с обводкой
        //перебираем массив элементов, удаляем из него тот,на который сейчас попали и запушиваем
        //этот элемент в начало массива и обновляем пропсы и выходим из функции
        if (element.x) {
            ctx.fillStyle = 'green';
            ctx.beginPath();
            ctx.arc(element.x, element.y, 35, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            element.selected = true;
            props.dispatch(actionCreatorChangeSelectedElement(element));
            props.dispatch(actionCreatorChangeSelectedElementType('circle'));
            props.dispatch(actionCreatorButtonDisable(false));

            arrElements.forEach((i, ind, arr) => {
                if ((i.x === element.x) && (i.y === element.y)) {
                    arrElements.splice(ind, 1);
                    arrElements.unshift(element);
                }
            })

            props.dispatch(actionCreatorChangeElementsArr(arrElements));

            console.log(props.state.mainPage.selected);
        }

    }

   window.onmouseup = (e) => {
       props.dispatch(actionCreatorChangeMouseIsDown(false));
       console.log(props.state.mainPage.arrElements.length);
       console.log(props.state.mainPage.selected);
       console.log(props.state.mainPage.selectedElementType);
       console.log(props.state.mainPage.selected,props.state.mainPage.selectedElementType );
   }

/*
    let funcMouseUp = (e) => {
        props.dispatch(actionCreatorChangeMouseIsDown(false));
        console.log(props.state.mainPage.selected,props.state.mainPage.selectedElementType );

    }*/





    window.onmousemove = (e) => {

        let ctx = myCanvas.current.getContext('2d');
        /*console.log(ctx);*/


        if(props.state.mainPage.selected && props.state.mainPage.mouseIsDown) {
            if ((e.clientX < props.state.mainPage.canvas.leftTop.x) || (e.clientX > props.state.mainPage.canvas.rightTop.x)
                || (e.clientY > props.state.mainPage.canvas.leftBottom.y) || (e.clientY < props.state.mainPage.canvas.leftTop.y)) {
                console.log('вышли из канваса!');
                props.dispatch(actionCreatorButtonDisable(true));
                let elements = props.state.mainPage.arrElements;
                let selectedElement = props.state.mainPage.selected;
                let selectedElementType = props.state.mainPage.selectedElementType;
                switch (selectedElementType) {
                    case 'square':
                        elements.forEach((i, ind) => {
                            if (i.topLeft === selectedElement.topLeft) {
                                elements.splice(ind, 1);
                            }
                        })
                        break;

                    case 'circle':
                        elements.forEach((i, ind) => {
                            if ((i.x === selectedElement.x) && (i.y === selectedElement.y)) {
                                elements.splice(ind, 1);
                            }
                        })
                        break;

                    default: return;
                }
                /*props.dispatch(actionCreatorChangeElementsArr(elements));*/
                //это пока не делаю, внимательно читай задание, удаляться должны полностью только
                //при отпускании мыши, а здесь пока только с канваса удаляю
               /* props.dispatch(actionCreatorChangeSelectedElement(false));
                props.dispatch(actionCreatorChangeSelectedElementType(''));*/

                ctx.clearRect(0, 0, canvasWidth, canvasHeight);
               /* elements.reverse();*/
                redraw(elements, ctx);

                elements.reverse();
                props.dispatch(actionCreatorChangeElementsArr(elements));

                /*redraw(props.state.mainPage.arrElements, ctx);*/
                console.log(props.state.mainPage.arrElements.length);
            }
        }
    }

    let funcMouseMove = (e) => {

        if (props.state.mainPage.mouseIsDown && props.state.mainPage.selected) {
            props.dispatch(actionCreatorButtonDisable(false));
            let ctx = e.currentTarget.getContext('2d');
           /* let canvas = props.state.mainPage.canvas;
            let canvasWidth = canvas.rightTop.x - canvas.leftTop.x;
            let canvasHeight = canvas.leftBottom.y - canvas.leftTop.y;*/
            //это координаты начала квадрата и центр круга
            let mouseCord = {
                x: e.clientX - props.state.mainPage.canvas.leftTop.x,
                y: e.clientY - props.state.mainPage.canvas.leftTop.y
            };
            let elements = props.state.mainPage.arrElements;
            let selectedElementType = props.state.mainPage.selectedElementType;
            let selectedElement = props.state.mainPage.selected;

            ctx.clearRect(0, 0, canvasWidth, canvasHeight);

                switch (selectedElementType) {
                    case 'square':
                        elements.forEach((i, ind) => {
                            if (i.topLeft === selectedElement.topLeft) {
                                elements.splice(ind, 1);
                            }
                        })

                        selectedElement = {
                            topLeft: {x: mouseCord.x, y: mouseCord.y},
                            topRight: {x: mouseCord.x + 70, y: mouseCord.y},
                            bottomRight: {x: mouseCord.x + 70, y: mouseCord.y + 70},
                            bottomLeft: {x: mouseCord.x, y: mouseCord.y + 70},
                            selected: true
                        }

                        break;

                    case 'circle':

                        elements.forEach((i, ind) => {
                            if ((i.x === selectedElement.x) && (i.y === selectedElement.y)) {
                                elements.splice(ind, 1);
                            }
                        })

                        selectedElement = {
                            x: mouseCord.x,
                            y: mouseCord.y,
                            selected: true
                        };
                        break;

                    default: return;
                }
            elements.unshift(selectedElement);
            /*props.dispatch(actionCreatorChangeElementsArr(elements));*/
            props.dispatch(actionCreatorChangeSelectedElement(selectedElement));
            props.dispatch(actionCreatorChangeSelectedElementType(selectedElementType));
            redraw(elements, ctx);
            elements.reverse();
            props.dispatch(actionCreatorChangeElementsArr(elements));
            console.log(props.state.mainPage.arrElements.length);
        }
    }




    return (
        <div className={s.canvas} >
            <div className={s.canvas_header}>
                <button disabled={props.state.mainPage.buttonState}
                        onClick={clickButton}>delete</button>
            </div>
            <div className={s.canvas_body} ref={link}>
                <canvas ref={myCanvas} className={s.block_with_canvas}


                        onMouseDown={(e) => {
                            mouseClick(e)
                        }}
                        onMouseMove={(e) => {
                            funcMouseMove(e)
                        }}
                       /* onMouseUp={(e) => {
                            funcMouseUp(e)
                        }}*/
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
