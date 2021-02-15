class HouseSortingGame {
    constructor() {
        this.exit = false

        //0 for start
        //0.5 & 1 for gryffindor game
        //1.5 & 2 for Slytherin game
        //2.5 & 3 for Hufflepuff game
        //3.5 & 4 for Ravenclaw game
        //4.5 & 5 for result
        this.gameState = 0

        //player
        this.x = 50
        this.y = 250
        this.xSpeed = 9
        this.ySpeed = 5
        this.currentFrame = 0

        //for gryffindor game
        this.ballState = 0
        this.powerTimer = 20
        this.ghosts = []
        this.timeToEnd = 10
        this.score_gryffindor = 0
        for (var i = 0; i < 2; i++) {
            this.ghosts.push(new Ghost())
        }

        //for slytherin game
        this.score_slytherin = 20
        this.flowers = []
        for (var i = 0; i < 7; i++) {
            this.flowers.push(new Flower())
        }

        //for hufflepuff game
        this.score_hufflepuff = 0
        this.badgers = []
        for (var i = 0; i < 8; i++) {
            this.badgers.push(new Badger())
        }

        //for ravenclaw game
        this.score_ravenclaw = 0
        this.book = new Book()

        //for result
        this.textTimer = 200
        this.highestScore = 0

        //1 for gryffindor, 2 for slytherin, 3 for hufflepuff, 4 for ravenclaw
        this.house = 1
        this.showResult = 0
    }

    draw() {
        noStroke()

        if (this.gameState == 0) {
            //load images
            background(0)
            image(icon_gry, 60, 20, 200, 200)
            image(icon_sly, 380, 20, 200, 200)
            image(icon_huff, 60, 260, 200, 200)
            image(icon_rav, 380, 260, 200, 200)

            //make images darker
            fill(0, 150)
            rect(0, 0, 640, 480)

            imageMode(CENTER)
            image(txt, 320, 240)
            imageMode(CORNER)

            if (keyIsDown(32)) {
                this.gameState = 0.5
            }
        }

        //instructions 
        if (this.gameState == 0.5) {
            background(214, 159, 53)
            fill(93, 15, 5)
            textAlign(CENTER)
            textSize(32)
            text("Press SPACE to kill the ghost", width / 2, 100)

            image(icon_gry, 10, 10, 30, 30)
            image(ghost_dead, width / 2, height / 2 - 100)

            text("Click to start", width / 2, 400)
            textAlign(LEFT)

            this.x = 50
            this.y = 250

            this.currentFrame = 0
            this.timeToEnd = 10


            if (mouseIsPressed) {
                this.gameState = 1
            }
        }

        //gryffindor
        if (this.gameState == 1) {
            this.gryffindorGame()
        }

        //insturctions
        if (this.gameState == 1.5) {
            background(204)
            fill(66, 114, 43)
            textAlign(CENTER)
            textSize(32)
            text("Use W and S to control the snake", width / 2, 100)

            image(icon_sly, 10, 10, 30, 30)
            image(snakeGraphic, width / 2 - 50, height / 2 - 100, 100, 100, 0, 2 * 33, 32, 32)

            text("Click to start", width / 2, 400)
            textAlign(LEFT)


            this.x = 50
            this.y = 250
            this.ySpeed = 5

            this.currentFrame = 0
            this.timeToEnd = 10

            if (mouseIsPressed) {
                this.gameState = 2
            }
        }

        //slytherin
        if (this.gameState == 2) {
            this.slytherinGame()
        }

        //instructions
        if (this.gameState == 2.5) {
            background(31, 30, 26)
            fill(241, 161, 56)
            textAlign(CENTER)
            textSize(32)
            text("Use A and D to control the basket", width / 2, 100)

            image(icon_huff, 10, 10, 30, 30)
            image(basketGraphic, width / 2 - 50, height / 2 - 100, 150, 69)

            text("Click to start", width / 2, 400)
            textAlign(LEFT)

            this.x = 50
            this.y = 350
            this.xSpeed = 9

            this.currentFrame = 0
            this.timeToEnd = 10

            if (mouseIsPressed) {
                this.gameState = 3
            }
        }

        //hufflepuff
        if (this.gameState == 3) {
            this.hufflepuffGame()
        }

        //instructions
        if (this.gameState == 3.5) {
            background(33, 57, 84)
            fill(134, 83, 39)
            textAlign(CENTER)
            textSize(32)
            text("Use WASD to control the eagle", width / 2, 100)

            image(icon_rav, 10, 10, 30, 30)
            image(eagleGraphic, width / 2 - 50, height / 2 - 100, 82, 42, 0, 0, 41, 21)

            text("Click to start", width / 2, 400)
            textAlign(LEFT)

            this.x = width / 2
            this.y = height / 2
            this.xSpeed = 5
            this.ySpeed = 5

            this.currentFrame = 0
            this.timeToEnd = 10

            if (mouseIsPressed) {
                this.gameState = 4
            }
        }

        //ravenclaw
        if (this.gameState == 4) {
            this.ravenclawGame()
        }

        //score board -> you belong to
        if (this.gameState == 4.5) {
            background(0)
            this.textTimer -= 1

            //determine which house player belongs in
            this.highestScore = this.score_gryffindor

            if (this.score_slytherin > this.highestScore) {
                this.highestScore = this.score_slytherin
                this.house = 2
            }
            if (this.score_hufflepuff > this.highestScore) {
                this.highestScore = this.score_hufflepuff
                this.house = 3
            }
            if (this.score_ravenclaw > this.highestScore) {
                this.highestScore = this.score_ravenclaw
                this.house = 4
            }

            if (this.textTimer > 0) {
                imageMode(CENTER)
                image(scoreText, 320, 70)
                imageMode(CORNER)
                image(icon_gry, 100, 120, 50, 50)
                image(icon_sly, 100, 220, 50, 50)
                image(icon_huff, 100, 320, 50, 50)
                image(icon_rav, 100, 420, 50, 50)
                fill(255)
                textSize(32)
                text(this.score_gryffindor, 300, 150)
                text(this.score_slytherin, 300, 250)
                text(this.score_hufflepuff, 300, 350)
                text(this.score_ravenclaw, 300, 450)
            } else if (this.textTimer <= 0) {
                imageMode(CENTER)
                image(houseText, 320, 240)
                imageMode(CORNER)
            }

            if (this.textTimer <= -120) {
                this.gameState = 5
                this.textTimer = 200
            }

        }

        //house result announcement
        if (this.gameState == 5) {
            background(0)

            if (this.showResult == 0) {
                fill(255)
                textSize(32)
                text("click to show results", 180, 240)
            }

            if (mouseIsPressed) {
                this.showResult = 1

                if (this.house == 1) {
                    gryffindorSound.play()
                } else if (this.house == 2) {
                    slytherinSound.play()
                } else if (this.house == 3) {
                    hufflepuffSound.play()
                } else if (this.house == 4) {
                    ravenclawSound.play()
                }
            }

            if (this.showResult == 1) {
                imageMode(CENTER)
                if (this.house == 1) {
                    image(text_gry, 320, 100)
                    image(icon_gry, 320, 300, 200, 200)
                } else if (this.house == 2) {
                    image(text_sly, 320, 100)
                    image(icon_sly, 320, 300, 200, 200)
                } else if (this.house == 3) {
                    image(text_huff, 320, 100)
                    image(icon_huff, 320, 300, 200, 200)
                } else if (this.house == 4) {
                    image(text_rav, 320, 100)
                    image(icon_rav, 320, 300, 200, 200)
                }
                imageMode(CORNER)
            }

            this.textTimer -= 1
            if (this.textTimer <= 0) {
                this.exit = true

                //reset everything
                this.gameState = 0

                //player
                this.x = 50
                this.y = 250
                this.xSpeed = 9
                this.ySpeed = 5
                this.currentFrame = 0

                //for gryffindor game
                this.ballState = 0
                this.powerTimer = 20
                this.ghosts = []
                this.timeToEnd = 10
                this.score_gryffindor = 0
                for (var i = 0; i < 2; i++) {
                    this.ghosts.push(new Ghost())
                }

                //for slytherin game
                this.score_slytherin = 20
                this.flowers = []
                for (var i = 0; i < 7; i++) {
                    this.flowers.push(new Flower())
                }

                //for hufflepuff game
                this.score_hufflepuff = 0
                this.badgers = []
                for (var i = 0; i < 8; i++) {
                    this.badgers.push(new Badger())
                }

                //for ravenclaw game
                this.score_ravenclaw = 0
                this.book = new Book()

                //for result
                this.textTimer = 200
                this.highestScore = 0

                //1 for gryffindor, 2 for slytherin, 3 for hufflepuff, 4 for ravenclaw
                this.house = 1
                this.showResult = 0
            }
        }
    }

    gryffindorGame() {
        //draw backgrounds
        background(214, 159, 53)
        fill(93, 15, 5)
        rect(0, 300, 640, 180)
        textSize(24)
        text("score: " + this.score_gryffindor, 50, 30)
        image(icon_gry, 10, 10, 30, 30)

        //display ghosts

        for (var i = 0; i < 2; i++) {

            //check if killed by player

            if (this.ghosts[i].killed == 0 && dist(this.ghosts[i].x, this.ghosts[i].y, this.x, this.y) <= 100) {
                if (this.ballState == 0) {
                    this.ghosts[i].killed = 1
                    collideSound.play()
                } else {
                    this.ghosts[i].killed = 2
                    killSound.play()
                    this.score_gryffindor += 1
                }
            }

            if (this.ghosts[i].moveAndDisplay()) {
                this.timeToEnd -= 0.5
            }


        }

        //check if using power
        if (this.ballState == 1) {
            fill(93, 15, 5, 100)
            ellipse(this.x + 50, this.y + 15, 100, 100)
            this.powerTimer -= 1
            if (this.powerTimer <= 0) {
                this.ballState = 0
                this.powerTimer = 20
            }
        }

        //player
        image(gry_ball, this.x, this.y, 100, 35)

        if (this.timeToEnd < 0) {
            this.gameState = 1.5
        }
    }

    slytherinGame() {
        //draw backgrounds
        background(204)
        fill(66, 114, 43)
        textSize(24)
        text("score: " + this.score_slytherin, 50, 30)
        image(icon_sly, 10, 10, 30, 30)

        //display grass and flower
        for (var i = 0; i < 7; i++) {
            for (var j = 0; j < 6; j++) {
                image(grassGraphic, i * 100, j * 100, 15, 15)
                image(grassGraphic, i * 100 + 50, j * 100 + 50, 15, 15)
            }
        }

        for (var i = 0; i < this.flowers.length; i++) {

            if (dist(this.x + 50, this.y + 50, this.flowers[i].x + 25, this.flowers[i].y + 25) <= 50) {
                collideSound.play()
                this.flowers[i].isCollide = true
                if (this.score_slytherin > 0) {
                    this.score_slytherin -= 1
                }
            }

            if (this.flowers[i].moveAndDisplay()) {
                this.timeToEnd -= 0.2
            }
        }

        //control snake
        if (keyIsDown(87)) {
            this.y -= this.ySpeed
        }
        if (keyIsDown(83)) {
            this.y += this.ySpeed
        }

        if (this.y > height) {
            this.y = -100
        }
        if (this.y < -100) {
            this.y = height
        }

        //display snake
        image(snakeGraphic, this.x, this.y, 100, 100, int(this.currentFrame / 4) * 32, 2 * 33, 32, 32)
        this.currentFrame += 1
        if (this.currentFrame >= 10 * 4) {
            this.currentFrame = 0
        }

        if (this.timeToEnd <= 0) {
            this.gameState = 2.5
        }

    }

    hufflepuffGame() {

        //draw backgrounds
        background(31, 30, 26)
        fill(241, 161, 56)
        textSize(24)
        text("score: " + this.score_hufflepuff, 50, 30)
        image(icon_huff, 10, 10, 30, 30)

        //display badgers
        for (var i = 0; i < this.badgers.length; i++) {
            //if caught
            if (this.badgers[i].y <= 370) {
                if (dist(this.badgers[i].x + badgerGraphic.width / 2, this.badgers[i].y + badgerGraphic.height / 2, this.x + 50, 350) <= 50) {
                    this.score_hufflepuff += 1
                    collectSound.play()
                    this.badgers[i].isCaught = true
                }
            }

            if (this.badgers[i].moveAndDisplay()) {
                this.timeToEnd -= 0.4
            }
        }

        //control
        if (keyIsDown(65)) {
            this.x -= this.xSpeed
        }
        if (keyIsDown(68)) {
            this.x += this.xSpeed
        }

        if (this.x < - 100) {
            this.x = width
        }
        if (this.x > width) {
            this.x = -100
        }


        //player
        image(basketGraphic, this.x, this.y, 150, 69)


        if (this.timeToEnd <= 0) {
            this.gameState = 3.5
        }
    }

    ravenclawGame() {

        //draw backgrounds
        background(33, 57, 84)
        fill(134, 83, 39)
        textSize(24)
        text("score: " + this.score_ravenclaw, 50, 30)
        image(icon_rav, 10, 10, 30, 30)

        //book
        //check if picked
        if (dist(this.x, this.y, this.book.x, this.book.y) < 50) {
            this.score_ravenclaw += 1
            this.book.isPick = true
            collectSound.play()
        }
        if (this.book.moveAndDisplay()) {
            this.timeToEnd -= 0.3
        }

        //control
        if (keyIsDown(87)) {
            this.y -= this.ySpeed
        }
        if (keyIsDown(83)) {
            this.y += this.ySpeed
        }
        if (keyIsDown(65)) {
            this.x -= this.xSpeed
        }
        if (keyIsDown(68)) {
            this.x += this.xSpeed
        }

        if (this.x < 0) {
            this.x = 0
        }
        if (this.x + 82 > width) {
            this.x = width - 82
        }
        if (this.y < 0) {
            this.y = 0
        }
        if (this.y + 42 > height) {
            this.y = height - 42
        }

        //player
        image(eagleGraphic, this.x, this.y, 82, 42, int(this.currentFrame / 4) * 41, 0, 41, 21)
        this.currentFrame += 1
        if (this.currentFrame >= 7 * 4) {
            this.currentFrame = 0
        }

        if (this.timeToEnd < 0) {
            this.gameState = 4.5
        }
    }

    keyPressed() {
        if (this.gameState == 1) {
            if (keyCode == 32 && this.ballState == 0) {
                this.ballState = 1
            }
        }

        //cheating
        if (keyCode == 80) {
            this.gameState += 0.5
        }
    }
}


class Ghost {
    //constructor
    constructor() {
        this.x = random(width + 100, width + 300)
        this.y = 230

        this.xSpeed = random(4, 6)

        //0 is inactivated, 1 is not killed, 2 is killed
        this.killed = 0

        this.currentFrame = 0
    }

    moveAndDisplay() {
        this.x -= this.xSpeed

        if (this.killed == 2) {
            image(ghost_dead, this.x, this.y, ghost_dead.width / 2, ghost_dead.height / 2)

            this.y -= 2
        }
        else {
            image(ghostGraphics[int(this.currentFrame / 20)], this.x, this.y)

            this.currentFrame += 1

            // did we go over the end of the list?  if so, cycle around to the beginning
            if (this.currentFrame >= ghostGraphics.length * 20) {
                this.currentFrame = 0
            }
        }

        if (this.x <= 0) {
            this.killed = 0
            this.x = random(width + 100, width + 300)
            this.y = 230
            this.xSpeed = random(4, 6)
            return true
        }

        return false
    }


}

class Flower {
    constructor() {
        this.x = width + 50
        this.y = random(0, height - 50)

        this.xSpeed = random(6, 8)

        this.isCollide = false
    }

    moveAndDisplay() {
        this.x -= this.xSpeed
        image(flowerGraphic, this.x, this.y, 50, 50)

        if (this.x <= -50 || this.isCollide == true) {
            this.x = width + 50
            this.y = random(0, height - 50)

            this.xSpeed = random(6, 8)

            this.isCollide = false

            return true
        }

        return false
    }

}

class Badger {
    constructor() {
        this.x = random(0, width - badgerGraphic.width)
        this.y = random(-100, -900)

        this.ySpeed = random(4, 6)

        this.isCaught = false
    }

    moveAndDisplay() {
        this.y += this.ySpeed

        if (this.y > height || this.isCaught == true) {
            this.x = random(0, width - badgerGraphic.width)
            this.y = random(-100, -900)
            this.ySpeed = random(4, 6)
            this.isCaught = false

            return true
        }

        image(badgerGraphic, this.x, this.y)

        return false
    }

}

class Book {
    constructor() {
        this.x = random(10, width - 40)
        this.y = random(10, height - 40)
        this.existingTime = random(60, 120)
        this.isPick = false
    }

    moveAndDisplay() {
        this.existingTime -= 1
        if (this.existingTime < 0 || this.isPick == true) {

            this.x = random(10, width - 40)
            this.y = random(10, height - 40)
            this.existingTime = random(60, 120)
            this.isPick = false

            return true
        }
        image(bookGraphic, this.x, this.y, 40, 40)

        return false
    }

}


