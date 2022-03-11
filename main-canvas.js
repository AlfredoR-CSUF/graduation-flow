

class FlowNode {

    // Public node fields
    x = 0
    y = 0

    className = "Introduction to Mathmatics"
    classCode = "MATH101"

    // Private + static node fields
    static #sizeX = 100
    static #sizeY = 70
    static #tabSizeY = 20
    static #textPadding = 3

    constructor(x, y, tabColor) {

        this.x = x
        this.y = y
        this.tabColor = tabColor

    }

    isInVolume(_x, _y) {
        return  this.x <= _x && 
                this.y <= _y && 
                this.x + FlowNode.#sizeX >= _x && 
                this.y + FlowNode.#sizeY >= _y
    }

    isInTabVolume(_x, _y) {
        return  this.x <= _x && 
                this.y <= _y && 
                this.x + FlowNode.#sizeX >= _x && 
                this.y + FlowNode.#tabSizeY >= _y
    }

    draw() {
        stroke('rgb(0,0,0)')
        strokeWeight(2)
        fill('white')
        rect(this.x, this.y, FlowNode.#sizeX, FlowNode.#sizeY, 5)
        fill(this.tabColor)
        rect(this.x, this.y, FlowNode.#sizeX, FlowNode.#tabSizeY, 5)

        strokeWeight(0)
        textSize(FlowNode.#tabSizeY - FlowNode.#textPadding * 2)
        textAlign(CENTER, TOP)
        fill('black')
        text(
            this.classCode, 
            this.x + FlowNode.#textPadding,
            this.y + FlowNode.#textPadding,
            FlowNode.#sizeX - FlowNode.#textPadding * 2,
            FlowNode.#sizeY - FlowNode.#textPadding * 2,
        )
        textAlign(CENTER, CENTER)
        text(
            this.className, 
            this.x + FlowNode.#textPadding,
            this.y + FlowNode.#tabSizeY + FlowNode.#textPadding,
            FlowNode.#sizeX - FlowNode.#textPadding * 2,
            FlowNode.#sizeY - FlowNode.#tabSizeY - FlowNode.#textPadding,
        )
    }
}

class MainCanvas {

    canvas
    nodes
    dragging = false
    currently_dragged = null
    drag_offx = 0
    drag_offy = 0
    fadeForeground = false
    fadeForegroundAlpha = 0
    fadeForegroundAlphaTarget = 0.5
    curPopup = true
    selectedNode = null

    setup() {

        this.nodes = []

        let canvasRegion = document.getElementById("canvas-region").getBoundingClientRect()
        this.canvas = createCanvas(windowWidth - canvasRegion.left, windowHeight - canvasRegion.top - 70);
        this.canvas.parent("canvas-region")
        this.canvas.style("width","100%")
    
        let testNodeColors = ["maroon", "violet", "cyan", "green", "orange"]
        for(let i = 0; i < 10; ++i) {
            this.nodes.push(new FlowNode(i * 100, 0, testNodeColors[i % testNodeColors.length]))
        }
    
    }
    
    windowResized() {
        
        let canvasRegion = document.getElementById("canvas-region").getBoundingClientRect()
        resizeCanvas(windowWidth - canvasRegion.left, windowHeight - canvasRegion.top - 70);
        this.canvas.style("width","100%")
    }
    
    draw() {
    
        clear()
    
        for (let node of this.nodes) {
            node.draw()
        }
    
        if (this.fadeForeground) {
    
            if(this.fadeForegroundAlpha < this.fadeForegroundAlphaTarget)
                this.fadeForegroundAlpha += this.fadeForegroundAlphaTarget / 7
    
            fill(`rgba(0,0,0,${this.fadeForegroundAlpha})`);
            rect(-2, -2, windowWidth, windowHeight)
    
        }
    
    }
    
    mousePressed() {
    
        if (this.fadeForeground) {
    
        } else {
    
            if (this.currently_dragged == null) {
                for (let node of this.nodes) {
                    if (node.isInTabVolume(mouseX, mouseY)) {
                        this.drag_offx = mouseX - node.x
                        this.drag_offy = mouseY - node.y
                        this.currently_dragged = node
                    }
                }
                
            }
    
        }
    
    }
    
    mouseDragged() {
    
        this.dragging = true
    
        if (this.currently_dragged != null) {
            this.currently_dragged.x = (mouseX - this.drag_offx)
            this.currently_dragged.y = (mouseY - this.drag_offy)
        }
    
    }
    
    
    mouseReleased() {
    
        if (this.fadeForeground) {

            this.hideLastPopup()
    
        } else if (!this.dragging) {
    
            for (let node of this.nodes) {
                if (node.isInVolume(mouseX, mouseY)) {
                    this.showPopup("modify-node-form")
                    this.selectedNode = node
                    break
                }
            }
    
        }
    
        this.dragging = false
        this.currently_dragged = null
    
    }

    hideLastPopup() {
        this.fadeForegroundAlpha = 0
        this.fadeForeground = false
        this.curPopup.style.display="none"
        this.curPopup = null
    }

    showPopup(popupName) {
        this.curPopup = document.getElementById(popupName)
        this.curPopup.style.display="block"
        this.fadeForeground = true
    }

}

window.mainCanvas = new MainCanvas()

// Mount main canvas functions to the locations p5 expects them
window.setup = window.mainCanvas.setup
window.draw = window.mainCanvas.draw
window.windowResized = window.mainCanvas.windowResized
window.mousePressed = window.mainCanvas.mousePressed
window.mouseDragged = window.mainCanvas.mouseDragged
window.mouseReleased = window.mainCanvas.mouseReleased

