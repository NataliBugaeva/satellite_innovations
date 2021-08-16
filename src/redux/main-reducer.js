const CHANGE_CURSOR_CORDINATES = 'CHANGE-CURSOR-CORDINATES';
const COUNT_CANVAS_CORDINATES = 'COUNT-CANVAS-CORDINATES';
const CHANGE_ELEMENT = 'CHANGE-ELEMENT';
const PUSH_SQUARE = 'PUSH-SQUARE';
const CHOOSE_ELEMENT = 'CHOOSE-ELEMENT';
const  CHANGE_SQUARES_ARR = ' CHANGE-SQUARES-ARR';
const CHANGE_CIRCLES_ARR = 'CHANGE-CIRCLES-ARR';

const PUSH_CIRCLE = 'PUSH-CIRCLE';

let initialState = {
    figures: {
        pointerX: 0,
        pointerY: 0
    },
    canvas: {
        leftTop: {x: 0, y: 0},
        rightTop: {x: 0, y: 0},
        rightBottom: {x: 0, y: 0},
        leftBottom: {x: 0, y: 0}
    },
    element: '',
    arrSquares: [],
    arrCircles: []
}

const mainReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_CURSOR_CORDINATES:
            state.figures.pointerX = action.x;
            state.figures.pointerY = action.y;
            return state;

        case COUNT_CANVAS_CORDINATES:
            state.canvas.leftTop = action.leftTop;
            state.canvas.rightTop = action.rightTop;
            state.canvas.rightBottom = action.rightBottom;
            state.canvas.leftBottom = action.leftBottom;
            return state;

        case CHANGE_ELEMENT:
            state.element = action.element;
            return state;

        case PUSH_SQUARE:
            state.arrSquares.push(action.square);
            return state;

        case PUSH_CIRCLE:
            state.arrCircles.push(action.circle);
            return state;

        case  CHANGE_SQUARES_ARR:
            state.arrSquares = action.arrSq;
            return state;

        case CHANGE_CIRCLES_ARR:
            state.arrCircles = action.arrCr;
            return state;

       /* case CHOOSE_ELEMENT:
            state.arrSquares.*/

        default:
            return state;
    }
}

export const actionCreatorCountCanvasCordinates = (verxLevo, verxPravo, nizPravo, nizLevo) => ({
    type: COUNT_CANVAS_CORDINATES,
    leftTop: verxLevo,
    rightTop: verxPravo, rightBottom: nizPravo, leftBottom: nizLevo
})

export const actionCreatorChangeCursorCordinates = (mouse) => ({type: CHANGE_CURSOR_CORDINATES, x: mouse.x, y: mouse.y});

export const actionCreatorChangeElement = (elem) => ({type: CHANGE_ELEMENT, element: elem});

export const actionCreatorPushSquareElement = (elem) => ({type: PUSH_SQUARE, square: elem});

export const actionCreatorChoseElem = (elem) => ({type: CHOOSE_ELEMENT, chosenElement: elem});
export const actionCreatorChangeSquaresArr = (newArrSq) => ({type: CHANGE_SQUARES_ARR, arrSq: newArrSq});

export const actionCreatorPushCircleElement = (newCircle) => ({type: PUSH_CIRCLE, circle: newCircle});

export const actionCreatorChangeCirclesArr = (arrCr) => ({type: CHANGE_CIRCLES_ARR, arrCr: arrCr});

export default mainReducer;
