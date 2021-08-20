const COUNT_CANVAS_CORDINATES = 'COUNT-CANVAS-CORDINATES';
const CHANGE_ELEMENT = 'CHANGE-ELEMENT';
const CHOOSE_ELEMENT = 'CHOOSE-ELEMENT';
const PUSH_NEW_ELEM = 'PUSH-NEW-ELEM';
const CHANGE_ELEMENTS_ARR = 'CHANGE-ELEMENTS-ARR';
const CHANGE_MOUSE_IS_DOWN = 'CHANGE-MOUSE-IS-DOWN';
const CHANGE_SELECTED_ELEMENT = 'CHANGE-SELECTED-ELEMENT';
const CHANGE_SELECTED_ELEMENT_TYPE = 'CHANGE-SELECTED-ELEMENT-TYPE'
const CHANGE_BUTTON_DASABLE = 'CHANGE-BUTTON-DASABLE';
const CHANGE_ELEM_OUT_CORDS = 'CHANGE-ELEM-OUT-CORDS';
const CHANGE_VISIBILITY = "CHANGE-VISIBILITY";

let initialState = {
    canvas: {
        leftTop: {x: 0, y: 0},
        rightTop: {x: 0, y: 0},
        rightBottom: {x: 0, y: 0},
        leftBottom: {x: 0, y: 0}
    },
    element: '',
    arrElements: [],
    mouseIsDown: false,
    selected: false,
    selectedElementType: '',
    buttonState: true,
    elemOutCords: {
        top: -9999999999999,
        left: -999999999999
    },
    visibility: false
}

const mainReducer = (state = initialState, action) => {
    switch (action.type) {
        case COUNT_CANVAS_CORDINATES:
            state.canvas.leftTop = action.leftTop;
            state.canvas.rightTop = action.rightTop;
            state.canvas.rightBottom = action.rightBottom;
            state.canvas.leftBottom = action.leftBottom;
            return state;

        case CHANGE_ELEMENT:
            state.element = action.element;
            return state;

        case PUSH_NEW_ELEM:
            state.arrElements.unshift(action.element);
            return state;

        case CHANGE_ELEMENTS_ARR:
            state.arrElements = action.arrElem;
            return state;

        case CHANGE_MOUSE_IS_DOWN:
            state.mouseIsDown = action.status;
            return state;

        case CHANGE_SELECTED_ELEMENT:
            state.selected = action.element;
            return state;

        case CHANGE_SELECTED_ELEMENT_TYPE:
            state.selectedElementType = action.elementType;
            return state;

        case CHANGE_BUTTON_DASABLE:
            state.buttonState = action.disabled;
            return state;

        case CHANGE_ELEM_OUT_CORDS:
            state.elemOutCords = action.elemOutCords;
            return state;

        case CHANGE_VISIBILITY:
            state.visibility = action.visibility;
            return state;

        default:
            return state;
    }
}

export const actionCreatorCountCanvasCordinates = (verxLevo, verxPravo, nizPravo, nizLevo) => ({
    type: COUNT_CANVAS_CORDINATES,
    leftTop: verxLevo,
    rightTop: verxPravo, rightBottom: nizPravo, leftBottom: nizLevo
});
export const actionCreatorChangeElement = (elem) => ({type: CHANGE_ELEMENT, element: elem});
export const actionCreatorChoseElem = (elem) => ({type: CHOOSE_ELEMENT, chosenElement: elem});
export const actionCreatorPushElem = (elem) => ({type: PUSH_NEW_ELEM, element: elem});
export const actionCreatorChangeElementsArr = (arrElem) => ({type: CHANGE_ELEMENTS_ARR, arrElem: arrElem});
export const actionCreatorChangeMouseIsDown = (status) => ({type: CHANGE_MOUSE_IS_DOWN, status: status});
export const actionCreatorChangeSelectedElement = (element) => ({type: CHANGE_SELECTED_ELEMENT, element: element});
export const actionCreatorChangeSelectedElementType = (type) => ({type: CHANGE_SELECTED_ELEMENT_TYPE, elementType: type});
export const actionCreatorButtonDisable = (status) => ({type: CHANGE_BUTTON_DASABLE, disabled: status});
export const actionCreatorChangeElemOutCords = (elemOutCords) => ({type: CHANGE_ELEM_OUT_CORDS, elemOutCords: elemOutCords});
export const actionCreatorChangeVisibility = (vis) => ({type: CHANGE_VISIBILITY, visibility: vis});

export default mainReducer;
