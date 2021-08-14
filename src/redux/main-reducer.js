const CHANGE_CURSOR_CORDINATES = 'CHANGE-CURSOR-CORDINATES';
const COUNT_CANVAS_CORDINATES = 'COUNT-CANVAS-CORDINATES';

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
    }
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

        default:
            return state;
    }
}

export const actionCreatorCountCanvasCordinates = (verxLevo, verxPravo, nizPravo, nizLevo) => ({
    type: COUNT_CANVAS_CORDINATES,
    leftTop: verxLevo,
    rightTop: verxPravo, rightBottom: nizPravo, leftBottom: nizLevo
})

export const actionCreatorChangeCursorCordinates = (mouse) => ({type: CHANGE_CURSOR_CORDINATES, x: mouse.x, y: mouse.y})

export default mainReducer;
