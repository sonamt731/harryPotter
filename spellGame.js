class SpellGame {//which spell is using 

    constructor(spellMode) {
        this.exit = false

        this.spellMode = spellMode

        //state of game
        //0 for start, 1 for play, 2 for complete
        this.gameState = 0

        //store the points
        this.points = []
        this.edges = []
        this.activePoint = null

        //for state 2
        this.spellSize = 100

        if (this.spellMode == 1) {
            //points
            this.points.push(new Point(640 / 2, 480 / 2, 0))
            this.points.push(new Point(640 / 2 + 150, 480 / 2 + 150, 0))
            this.points.push(new Point(640 / 2 + 150, 480 / 2 - 150, 0))
            this.points.push(new Point(640 / 2 - 150, 480 / 2 + 150, 0))
            this.points.push(new Point(640 / 2 - 150, 480 / 2 - 150, 0))

            //edges
            this.edges.push(new Edge(this.points[0], this.points[1], 0, 1, 0))
            this.edges.push(new Edge(this.points[0], this.points[2], 0, 2, 0))
            this.edges.push(new Edge(this.points[0], this.points[3], 0, 3, 0))
            this.edges.push(new Edge(this.points[0], this.points[4], 0, 4, 0))
            this.edges.push(new Edge(this.points[1], this.points[3], 1, 3, 0))

            //link edges to points
            this.points[0].setConnectedEdges(
                [0, 1, 2, 3]
            )
            this.points[1].setConnectedEdges(
                [0, 4]
            )
            this.points[2].setConnectedEdges(
                [1]
            )
            this.points[3].setConnectedEdges(
                [2, 4]
            )
            this.points[4].setConnectedEdges(
                [3]
            )
        }

        if (this.spellMode == 2) {
            //points
            this.points.push(new Point(640 / 2, 480 / 2, 0))
            this.points.push(new Point(640 / 2 + 150, 480 / 2 + 150, 0))
            this.points.push(new Point(640 / 2 + 150, 480 / 2 - 150, 0))
            this.points.push(new Point(640 / 2 - 150, 480 / 2 + 150, 0))
            this.points.push(new Point(640 / 2 - 150, 480 / 2 - 150, 0))

            //edges
            this.edges.push(new Edge(this.points[0], this.points[1], 0, 1, 0))
            this.edges.push(new Edge(this.points[0], this.points[2], 0, 2, 0))
            this.edges.push(new Edge(this.points[0], this.points[3], 0, 3, 0))
            this.edges.push(new Edge(this.points[0], this.points[4], 0, 4, 0))
            this.edges.push(new Edge(this.points[1], this.points[3], 1, 3, 0))
            this.edges.push(new Edge(this.points[1], this.points[2], 1, 2, 0))
            this.edges.push(new Edge(this.points[3], this.points[4], 3, 4, 0))

            //link edges to points
            this.points[0].setConnectedEdges(
                [0, 1, 2, 3]
            )
            this.points[1].setConnectedEdges(
                [0, 4, 5]
            )
            this.points[2].setConnectedEdges(
                [1, 5]
            )
            this.points[3].setConnectedEdges(
                [2, 4, 6]
            )
            this.points[4].setConnectedEdges(
                [3, 6]
            )
        }

        if (this.spellMode == 3) {
            //points
            this.points.push(new Point(640 / 2, 480 / 2, 0))
            this.points.push(new Point(640 / 2 + 150, 480 / 2 + 150, 0))
            this.points.push(new Point(640 / 2 + 150, 480 / 2 - 150, 0))
            this.points.push(new Point(640 / 2 - 150, 480 / 2 + 150, 0))


            //edges
            this.edges.push(new Edge(this.points[0], this.points[1], 0, 1, 0))
            this.edges.push(new Edge(this.points[0], this.points[2], 0, 2, 0))
            this.edges.push(new Edge(this.points[0], this.points[3], 0, 3, 0))
            this.edges.push(new Edge(this.points[1], this.points[3], 1, 3, 0))

            //link edges to points
            this.points[0].setConnectedEdges(
                [0, 1, 2]
            )
            this.points[1].setConnectedEdges(
                [0, 3]
            )
            this.points[2].setConnectedEdges(
                [1]
            )
            this.points[3].setConnectedEdges(
                [2, 3]
            )
        }


    }

    draw() {
        noStroke()
        image(spellbg, 0, 0)

        if (this.gameState == 0) {

            //reset
            this.activePoint = null

            //display edges
            for (var i = 0; i < this.edges.length; i++) {
                this.edges[i].state = 0
            }

            //display points
            for (var i = 0; i < this.points.length; i++) {
                this.points[i].state = 0
            }

            imageMode(CENTER)
            image(txt, 640 / 2, 480 / 2)
            imageMode(CORNER)
        }

        if (this.gameState == 1) {

            noCursor()

            //display edges
            var allConnected = true
            for (var i = 0; i < this.edges.length; i++) {
                var counter = 60

                this.edges[i].display()

                if (this.edges[i].state != 2) {
                    this.edges[i].state = 0
                    allConnected = false
                }

            }

            if (allConnected == true) {
                this.gameState = 2
                spell_completed.play()
            }

            //display points
            for (var i = 0; i < this.points.length; i++) {
                this.points[i].display()
            }

            //displya active points and edges
            if (this.activePoint != null) {
                this.points[this.activePoint].state = 1

                var tempEdge = this.points[this.activePoint].getEdges()

                for (var j = 0; j < tempEdge.length; j++) {
                    var index = tempEdge[j]
                    if (this.edges[index].state != 2) {
                        this.edges[index].state = 1
                    }
                }
            }

            //display wand
            imageMode(CENTER)
            image(wand_effect, mouseX, mouseY, 50, 50)
            imageMode(CORNER)
            image(wand, mouseX, mouseY)
        }

        if (this.gameState == 2) {

            this.activePoint = null

            //display edges
            for (var i = 0; i < this.edges.length; i++) {
                this.edges[i].state = 2
                this.edges[i].display()
            }

            //display points
            for (var i = 0; i < this.points.length; i++) {
                this.points[i].state = 2
                this.points[i].display()

            }

            if (this.spellSize <= 1200) {
                this.spellSize += 10
            } else {
                fill(0)
                rect(0, 0, 640, 480)

                //state of game
                //0 for start, 1 for play, 2 for complete
                this.gameState = 0
                this.spellSize = 100
                this.exit = true
            }

            imageMode(CENTER)
            image(spellImage, 640 / 2, 480 / 2, this.spellSize, this.spellSize)
            imageMode(CORNER)


        }


    }

    mousePressed() {

        if (this.gameState == 1) {
            for (var i = 0; i < this.points.length; i++) {
                var temp = this.points[i].ifPressed()
                if (temp == true) {
                    if (this.activePoint != null) {
                        var connected = false
                        this.points[this.activePoint].state = 2
                        var tempEdge = this.points[this.activePoint].getEdges()
                        for (var j = 0; j < tempEdge.length; j++) {
                            if (this.activePoint == this.edges[tempEdge[j]].p1) {
                                var temp = this.edges[tempEdge[j]].p2
                            } else if (this.activePoint == this.edges[tempEdge[j]].p2) {
                                var temp = this.edges[tempEdge[j]].p1
                            }
                            //console.log(tempEdge[j])

                            //connect edge
                            if (temp == i) {
                                if (this.edges[tempEdge[j]].state == 1) {
                                    this.edges[tempEdge[j]].state = 2
                                    connectSound.play()
                                    connected = true
                                } else {
                                    this.gameState = 0
                                }
                            }
                        }

                        if (connected == false) {
                            this.gameState = 0
                        }
                    }

                    this.activePoint = i

                }
            }
        }
    }

    keyPressed() {
        if (keyCode == 32 && this.gameState == 0) {
            this.gameState = 1
            startSound.play()
        }
    }
}

class Point {
    //constructor
    constructor(x, y, state) {
        this.x = x
        this.y = y


        this.size = 150

        //0 for inactivated, 1 for activated, 2 for idle 
        this.state = state

        //for breathing
        this.breathSpeed = 0.5
    }

    //display
    display() {
        //inactivated state
        if (this.state == 0) {
            //inactivated point
            imageMode(CENTER)
            image(pointImage, this.x, this.y, this.size, this.size)
            imageMode(CORNER)

            if (dist(mouseX, mouseY, this.x, this.y) <= 25) {
                imageMode(CENTER)
                image(pointImage, this.x, this.y, this.size + 10, this.size + 10)
                imageMode(CORNER)
            }
        }
        //activated state
        if (this.state == 1) {

            //create stroke
            strokeWeight(20)
            stroke(204, 153, 255)
            line(this.x, this.y, mouseX, mouseY)
            noStroke()

            //breathing point
            this.size += this.breathSpeed
            if (this.size >= 170 || this.size <= 130) {
                this.breathSpeed *= -1
            }

            imageMode(CENTER)
            image(pointImage, this.x, this.y, this.size, this.size)
            imageMode(CORNER)
        }
        //idle
        if (this.state == 2) {
            imageMode(CENTER)
            image(pointImage, this.x, this.y, this.size, this.size)
            imageMode(CORNER)

            if (dist(mouseX, mouseY, this.x, this.y) <= 25) {
                imageMode(CENTER)
                image(pointImage, this.x, this.y, this.size + 10, this.size + 10)
                imageMode(CORNER)
            }
        }
    }

    //is pressed
    ifPressed() {
        if (dist(mouseX, mouseY, this.x, this.y) <= 25) {
            return true
        } else {
            return false
        }
    }
    //get x
    getX() {
        return this.x
    }
    //get y
    getY() {
        return this.y
    }
    //get state
    getState() {
        return this.state
    }
    //set state
    setState(state) {
        this.state = state
    }

    //connected edges
    setConnectedEdges(connectedEdges) {
        this.connectedEdges = connectedEdges
    }
    getEdges() {
        return this.connectedEdges
    }
}

class Edge {
    //constructor
    constructor(x1, x2, p1, p2, state) {
        this.x1 = x1.getX()
        this.y1 = x1.getY()
        this.x2 = x2.getX()
        this.y2 = x2.getY()
        this.p1 = p1
        this.p2 = p2

        this.width = 20
        //0 for inactivated, 1 for activated, 2 for used
        this.state = state

        //for breathing
        this.breath = 0
        this.breathSpeed = 0.2

    }

    //display
    display() {
        if (this.state == 0) {
            strokeWeight(this.width)
            stroke(229, 204, 255)
            line(this.x1, this.y1, this.x2, this.y2)
            noStroke()
        }
        if (this.state == 1) {
            //breathing
            stroke(229, 204, 255, 100)
            this.breath += this.breathSpeed
            if (this.breath >= 10 || this.breath <= 0) {
                this.breathSpeed *= -1
            }
            strokeWeight(this.width + this.breath)
            line(this.x1, this.y1, this.x2, this.y2)
            strokeWeight(this.width)
            stroke(229, 204, 255)
            line(this.x1, this.y1, this.x2, this.y2)
            noStroke()
        }
        //used
        if (this.state == 2) {
            strokeWeight(this.width)
            stroke(178, 102, 255)
            line(this.x1, this.y1, this.x2, this.y2)
            noStroke()
        }
    }

    getState() {
        return this.state
    }

    setState(state) {
        this.state = state
    }
}

