import React from 'react';
import s from "../../../styles/canvas.module.css";

import {
    actionCreatorCountCanvasCordinates,
    actionCreatorPushElem,
    actionCreatorChangeElementsArr,
    actionCreatorChangeMouseIsDown,
    actionCreatorChangeSelectedElement,
    actionCreatorChangeSelectedElementType,
    actionCreatorButtonDisable,
    actionCreatorChangeElemOutCords,
    actionCreatorChangeVisibility
} from "../../../redux/main-reducer";

const Canvas = (props) => {

    let link = React.createRef(),
        myCanvas = React.createRef(),
        canvas = props.state.mainPage.canvas,
        canvasWidth = canvas.rightTop.x - canvas.leftTop.x,
        canvasHeight = canvas.leftBottom.y - canvas.leftTop.y,
        elements = props.state.mainPage.arrElements,
        selectedElement = props.state.mainPage.selected,
        selectedElementType = props.state.mainPage.selectedElementType;

    let clickCanv = () => {
        let verxLevo, nizLevo, verxPravo, nizPravo,
            top = link.current.getBoundingClientRect().top,
            left = link.current.getBoundingClientRect().left,
            bottom = link.current.getBoundingClientRect().bottom,
            right = link.current.getBoundingClientRect().right;

        verxLevo = {x: left, y: top};
        verxPravo = {x: right, y: top};
        nizPravo = {x: right, y: bottom};
        nizLevo = {x: left, y: bottom}

        props.dispatch(actionCreatorCountCanvasCordinates(verxLevo, verxPravo, nizPravo, nizLevo));
    }

    window.onload = () => {
        clickCanv();
    }


//ф-ция рисует квадрат без обводки
    let drawSquare = (ctx, squareStart, width, height) => {
        ctx.fillStyle = '#07b189';
        ctx.fillRect(squareStart.x, squareStart.y, width, height);
    }

//ф-ция рисует круг без обводки
    let drawCircle = (ctx, newCircle, radius) => {
        ctx.fillStyle = '#005cff';
        ctx.beginPath();
        ctx.arc(newCircle.x, newCircle.y, radius, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.closePath();
    }

//ф-ция меняет массив elements, убирая из него определенный элемент квадрат
    let deleteSquareFromArr = (elements, element) => {
        elements.forEach((i, ind) => {
            if (i.topLeft === element.topLeft) {
                elements.splice(ind, 1);
                elements.unshift(element);
            }
        })
    }

//ф-ция меняет массив elements, убирая из него определенный элемент круг
    let deleteCircleFromArr = (elements, element) => {
        elements.forEach((i, ind) => {
            if ((i.x === element.x) && (i.y === element.y)) {
                elements.splice(ind, 1);
                elements.unshift(element);
            }
        })
    }

    //ф-ция когда мы отпускаем курсор при перетягивании фигуры на канвас
    let funcDrop = (e) => {
        e.preventDefault();

        let ctx = myCanvas.current.getContext('2d');

        switch (props.state.mainPage.element) {
            case 'square':
                let squareStart = {
                    x: e.clientX - canvas.leftTop.x,
                    y: e.clientY - canvas.leftTop.y
                }

                let newSquare = {
                    topLeft: {x: squareStart.x, y: squareStart.y},
                    topRight: {x: squareStart.x + 70, y: squareStart.y},
                    bottomRight: {x: squareStart.x + 70, y: squareStart.y + 70},
                    bottomLeft: {x: squareStart.x, y: squareStart.y + 70},
                    selected: false
                }

                drawSquare(ctx, squareStart, 70, 70);
                props.dispatch(actionCreatorPushElem(newSquare));
                break;

            case 'circle':
                let newCircle = {
                    x: e.clientX - canvas.leftTop.x,
                    y: e.clientY - canvas.leftTop.y,
                    selected: false
                };

                drawCircle(ctx, newCircle, 35);
                props.dispatch(actionCreatorPushElem(newCircle));
                break;

            default:
                break;
        }
    }

    let funcDragEnter = (e) => {
        e.preventDefault();
    }

    let funcDragOver = (e) => {
        e.preventDefault();
    }

    let funcDragLeave = (e) => {
        e.preventDefault();
    }

    //функция перерисовки всего массива
    let redraw = (elements, ctx) => {
        elements.reverse();
        elements.forEach(i => {
            if (i.topLeft && i.selected === true) {
                drawSquare(ctx, i.topLeft, 70, 70)
                ctx.strokeRect(i.topLeft.x, i.topLeft.y, 70, 70);
            } else if (i.topLeft) {
                drawSquare(ctx, i.topLeft, 70, 70)
            } else if (i.x && i.selected === true) {
                drawCircle(ctx, i, 35);
                ctx.stroke();
            } else if (i.x) {
                drawCircle(ctx, i, 36);
            } else alert('хрень какая-то');
        })
    }

    //возвращает массив элементов без удаленного
    let removeFigure = (elements, selectedElement, selectedElementType) => {
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

            default:
                return elements;
        }

    }

    //по клику на кнопку удаляем элемент с канваса
    let clickButton = (drawSquare, drawCircle) => {
        let ctx = myCanvas.current.getContext('2d');
        elements = removeFigure(elements, selectedElement, selectedElementType);
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        redraw(elements, ctx, drawSquare, drawCircle);
        elements.reverse();
        props.dispatch(actionCreatorChangeElementsArr(elements));
        props.dispatch(actionCreatorButtonDisable(true));
    }


    //это событие на mousedawn на нажатие мыши именно на области канваса
    let mouseClick = (e) => {

        props.dispatch(actionCreatorChangeMouseIsDown(true));

        let ctx = myCanvas.current.getContext('2d');
        ctx.strokeStyle = 'black';
        //координаты мышт на канвасе
        let mouseCord = {
            x: e.clientX - canvas.leftTop.x,
            y: e.clientY - canvas.leftTop.y
        };

        //перед каждым нажатие мыши я проверяю выбран ли како-нибудь элемент (из массива эл-ов в пропсах)
        //и если да, то перерисовываю этот элемент уже без обводки и делаю его не выбранным
        elements.forEach(i => {
            if (i.selected === true) {
                if (i.x) {
                    ctx.globalCompositeOperation = 'source-over';
                    drawCircle(ctx, i, 36);
                } else if (i.topLeft) {
                    ctx.clearRect(i.topLeft.x - 1, i.topLeft.y - 1, 71, 71);
                    drawSquare(ctx, i.topLeft, 71, 71);
                }
                i.selected = false;
            }
        })

        //проверяю, попал ли клик на каую-нибудь фигуру
        let element = elements.find(i => {
            if (i.x) {
                let x = mouseCord.x - i.x;
                let y = mouseCord.y - i.y;
                let c = Math.sqrt(x ** 2 + y ** 2);
                if (c < 35) {
                    return i;
                }
            } else if (i.topLeft) {
                if ((mouseCord.x >= i.topLeft.x) && (mouseCord.x <= i.topLeft.x + 70)
                    && (mouseCord.y >= i.topLeft.y) && (mouseCord.y <= i.topLeft.y + 70)) {
                    return i;
                }
            }
            return '';
        });

        if (!element) {
            props.dispatch(actionCreatorChangeSelectedElement(false));
            props.dispatch(actionCreatorChangeSelectedElementType(''));
            props.dispatch(actionCreatorButtonDisable(true));
            return;
        }

//если попали на квадрат
        if (element.topLeft) {
            ctx.clearRect(element.topLeft.x, element.topLeft.y, 70, 70);
            drawSquare(ctx, element.topLeft, 70, 70);
            ctx.strokeRect(element.topLeft.x, element.topLeft.y, 70, 70);
            deleteSquareFromArr(elements, element);
            props.dispatch(actionCreatorChangeSelectedElementType('square'));
        }

//если попали на круг
        if (element.x) {
            drawCircle(ctx, element, 35);
            ctx.stroke();
            deleteCircleFromArr(elements, element);
            props.dispatch(actionCreatorChangeSelectedElementType('circle'));
        }

        element.selected = true;
        props.dispatch(actionCreatorChangeSelectedElement(element));
        props.dispatch(actionCreatorButtonDisable(false));
        props.dispatch(actionCreatorChangeElementsArr(elements));

    }

    window.onmouseup = () => {
        props.dispatch(actionCreatorChangeVisibility(true));
        props.dispatch(actionCreatorChangeMouseIsDown(false));
    }

    window.onmousemove = (e) => {
        let ctx = myCanvas.current.getContext('2d');

//если зажат эл-т на канвасе и мы вышли за его границы
        if (props.state.mainPage.selected && props.state.mainPage.mouseIsDown) {
            if ((e.clientX < canvas.leftTop.x) || (e.clientX > canvas.rightTop.x)
                || (e.clientY > canvas.leftBottom.y) || (e.clientY < canvas.leftTop.y)) {

                props.dispatch(actionCreatorButtonDisable(true));

                let elemOutCords;
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

                    default:
                        return;
                }

                (selectedElementType === 'square') ? elemOutCords = {
                    top: e.clientY, left: e.clientX,
                    backgroundColor: '#07b189'
                } : elemOutCords = {
                    top: e.clientY, left: e.clientX,
                    backgroundColor: '#005cff', "borderRadius": '50%'
                };

                ctx.clearRect(0, 0, canvasWidth, canvasHeight);
                redraw(elements, ctx);
                elements.reverse();
                props.dispatch(actionCreatorChangeElementsArr(elements));
                props.dispatch(actionCreatorChangeElemOutCords(elemOutCords));
                props.dispatch(actionCreatorChangeVisibility(false));
            }
        }
    }


    //для даижения мыши в пределах канваса
    let funcMouseMove = (e) => {
        let ctx = myCanvas.current.getContext('2d');

        if (props.state.mainPage.mouseIsDown && props.state.mainPage.selected) {
            props.dispatch(actionCreatorButtonDisable(false));
            props.dispatch(actionCreatorChangeVisibility(true));

//это координаты начала квадрата и центр круга
            let mouseCord = {
                x: e.clientX - props.state.mainPage.canvas.leftTop.x,
                y: e.clientY - props.state.mainPage.canvas.leftTop.y
            };

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

                default:
                    return;
            }

            elements.unshift(selectedElement);
            props.dispatch(actionCreatorChangeSelectedElement(selectedElement));
            props.dispatch(actionCreatorChangeSelectedElementType(selectedElementType));
            redraw(elements, ctx);
            elements.reverse();
            props.dispatch(actionCreatorChangeElementsArr(elements));
        }
    }

    return (
        <div className={s.canvas}>
            <div className={s.canvas_header}>

                <button disabled={props.state.mainPage.buttonState}
                        onClick={clickButton}>delete
                </button>
            </div>
            <div className={s.canvas_body} ref={link}>
                <canvas ref={myCanvas} className={s.block_with_canvas}
                        onMouseDown={(e) => {
                            mouseClick(e)
                        }}
                        onMouseMove={(e) => {
                            funcMouseMove(e)
                        }}
                        onDragEnter={(e) => funcDragEnter(e)}
                        onDragOver={(e) => funcDragOver(e)}
                        onDrop={(e) => funcDrop(e)}
                        onDragLeave={(e) => funcDragLeave(e)}
                        width={props.state.mainPage.canvas.rightTop.x - props.state.mainPage.canvas.leftTop.x}
                        height={props.state.mainPage.canvas.leftBottom.y - props.state.mainPage.canvas.leftTop.y}
                >canvas
                </canvas>
            </div>
            <div className={s.elem_out}
                 hidden={props.state.mainPage.visibility} style={props.state.mainPage.elemOutCords}> </div>
        </div>
    )
}

export default Canvas;
