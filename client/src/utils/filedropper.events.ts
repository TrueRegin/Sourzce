type DragFunction = (e: DragEvent) => void;

let initialized = false
let dragEnter: DragFunction
let dragDrop: DragFunction
let dragEnd: DragFunction
let dragTimer: number

function init () {
    if (!initialized) {
        document.addEventListener('dragstart', dragEnter)
        document.addEventListener('dragover', dragEnter)
        document.addEventListener('drop', dragDrop)
        document.addEventListener('dragend', dragEnd)
    } else {
    }
    initialized = true
}

export const loadEventFunctions = (
    onDragEnter: DragFunction,
    onDrop: DragFunction,
    onDragEnd: DragFunction
) => {
    dragEnter = onDragEnter
    dragDrop = onDrop
    dragEnd = onDragEnd
    init()
}

export const getDragTimer = () => {
    return dragTimer
}

export const setDragTimer = (id: number) => {
    dragTimer = id
}
