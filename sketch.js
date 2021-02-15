//0 for map
//1 for spell game
//2 for house game
//3 for yuleBall game
//4 for umbridge game
let state = 0

//variable of images
var bg, harry
var hat, snow, firework

//for house sorting game
var ghostGraphics = []

//declare games
var spellGame1
var yuleBallGame
var umbridgeEscapeGame

//cooldown
var coolDown = 0


function preload() {
    bg = loadImage("images/map.png")
    harry = loadImage("images/harry.png")
    hat = loadImage("images/hat.png")
    snow = loadImage("images/snow.png")
    firework = loadImage("images/firework.png")

    //spellGames
    spellbg = loadImage("images/spellGraphics/spell_background.jpeg")
    wand = loadImage("images/spellGraphics/magic_wand.png")
    wand_effect = loadImage("images/spellGraphics/wand_effect.png")
    spellImage = loadImage("images/spellGraphics/spell.png")
    pointImage = loadImage("images/spellGraphics/point.png")
    txt = loadImage("images/spellGraphics/text.png")

    spell_completed = loadSound("sounds/spell_completed.mp3")
    connectSound = loadSound("sounds/connected.wav")
    startSound = loadSound("sounds/start.wav")

    //houseSortingGame
    //load images
    scoreText = loadImage("images/houseGraphics/scoreText.png")
    houseText = loadImage("images/houseGraphics/houseText.png")
    text_gry = loadImage("images/houseGraphics/gryText.png")
    text_sly = loadImage("images/houseGraphics/slyText.png")
    text_huff = loadImage("images/houseGraphics/huffText.png")
    text_rav = loadImage("images/houseGraphics/ravText.png")

    //icons
    icon_gry = loadImage("images/houseGraphics/gryffindor/gryffindor.png")
    icon_sly = loadImage("images/houseGraphics/slytherin/slytherin.png")
    icon_huff = loadImage("images/houseGraphics/hufflepuff/hufflepuff.png")
    icon_rav = loadImage("images/houseGraphics/ravenclaw/ravenclaw.png")

    //gryffindor
    gry_ball = loadImage("images/houseGraphics/gryffindor/ball.png")

    for (var i = 1; i <= 2; i++) {
        var filename = "ghost" + i + ".png";
        ghostGraphics.push(loadImage("images/houseGraphics/gryffindor/" + filename));
    }
    ghost_dead = loadImage("images/houseGraphics/gryffindor/ghost_dead.png")

    //slytherin
    snakeGraphic = loadImage("images/houseGraphics/slytherin/snake.png")
    grassGraphic = loadImage("images/houseGraphics/slytherin/grass.png")
    flowerGraphic = loadImage("images/houseGraphics/slytherin/flower.png")

    //hufflepuff
    badgerGraphic = loadImage("images/houseGraphics/hufflepuff/badger.png")
    //spinnerGraphic = loadImage("images/houseGraphics/hufflepuff/spinner.png")
    basketGraphic = loadImage("images/houseGraphics/hufflepuff/basket.png")

    //ravenclaw
    eagleGraphic = loadImage("images/houseGraphics/ravenclaw/eagle.png")
    bookGraphic = loadImage("images/houseGraphics/ravenclaw/book.png")

    //sounds
    collectSound = loadSound("sounds/collect.wav")
    collideSound = loadSound("sounds/collide.mp3")
    killSound = loadSound("sounds/kill.wav")

    //annoucement sound
    gryffindorSound = loadSound("sounds/gryffindor.wav")
    slytherinSound = loadSound("sounds/slytherin.wav")
    hufflepuffSound = loadSound("sounds/hufflepuff.wav")
    ravenclawSound = loadSound("sounds/ravenclaw.wav")

    //yuleBallGame
    upArrow = loadImage('images/yuleBallGraphics/upArrow.png')
    downArrow = loadImage('images/yuleBallGraphics/downArrow.png')
    leftArrow = loadImage('images/yuleBallGraphics/leftArrow.png')
    rightArrow = loadImage('images/yuleBallGraphics/rightArrow.png')
    ballbg = loadImage('images/yuleBallGraphics/yuleball.png')
    snow1 = loadImage('images/yuleBallGraphics/snow.png')
    snow2 = loadImage('images/yuleBallGraphics/snow.png')
    harryPotter = loadImage('images/yuleBallGraphics/harryPotter.png')
    parvati = loadImage('images/yuleBallGraphics/parvati.png')
    wrong = loadImage('images/yuleBallGraphics/x.png')
    ron = loadImage('images/yuleBallGraphics/ron.png')
    eggImg = loadImage('images/yuleBallGraphics/goldenEgg.png')
    floor1 = loadImage('images/yuleBallGraphics/floor.png')
    floor2 = loadImage('images/yuleBallGraphics/floor.png')

    //umbridgeEscapeGame
    fred = loadImage('images/UmbridgeEscapeGraphics/fred.png')
    umbridgeImg = loadImage('images/UmbridgeEscapeGraphics/umbridge.png')
    firework1 = loadImage('images/UmbridgeEscapeGraphics/firework1.png')
    firework2 = loadImage('images/UmbridgeEscapeGraphics/firework2.png')
    wallbg = loadImage('images/UmbridgeEscapeGraphics/bg.png')
    umbridgeExplode = loadSound('sounds/explosion.wav')
    gameName = loadImage('images/UmbridgeEscapeGraphics/gameName.png')


}

function setup() {
    //games
    spellGame1 = new SpellGame(1)
    spellGame2 = new SpellGame(2)
    spellGame3 = new SpellGame(3)
    houseSortingGame = new HouseSortingGame()
    yuleBallGame = new YuleBallGame()
    umbridgeEscapeGame = new UmbridgeEscapeGame()

    canvas = createCanvas(640, 480);
    canvas.style('display', 'block');
    canvas.style('margin', 'auto');
    canvas.style('margin-bottom', '200px')


    //construct game objectss
    YuleBallGraphic = new Game(140, 140, snow, 2.5)
    HouseGraphic = new Game(340, 200, hat, 1)
    UmbridgeEscapeGraphic = new Game(500, 30, firework, 3.5)

}

function draw() {
    coolDown--
    coolDown = constrain(coolDown, 0, 100)
    // console.log(state, coolDown)
    if (state == 0) {
        //noCursor()
        noStroke()
        //draw background
        image(bg, 0, 0, 640, 480)

        //display game icons
        YuleBallGraphic.display()
        // console.log("*", state)
        HouseGraphic.display()
        UmbridgeEscapeGraphic.display()

        //player controlled character
        imageMode(CENTER)
        image(harry, mouseX, mouseY)
        imageMode(CORNER)
    }// spell game
    else if (state == 1) {
        // ask the spellGame1 object to run its draw function
        spellGame1.draw()
        if (spellGame1.exit == true) {
            state = 2
            spellGame1.exit = false
        }
    }// house sorting game
    else if (state == 2) {
        houseSortingGame.draw()

        if (houseSortingGame.exit == true) {
            state = 0
            houseSortingGame.exit = false
        }
    }
    else if (state == 2.5) {
        spellGame2.draw()
        if (spellGame2.exit == true) {
            state = 3
            spellGame2.exit = false
        }
    }
    else if (state == 3) {
        yuleBallGame.draw()
        //console.log(yuleBallGame.exit)

        if (yuleBallGame.exit == true) {
            state = 0
            yuleBallGame.gameState = 1
            yuleBallGame.exit = false
        }
    }
    else if (state == 3.5) {
        spellGame3.draw()
        if (spellGame3.exit == true) {
            state = 4
            spellGame3.exit = false
        }
    }
    else if (state == 4) {
        umbridgeEscapeGame.draw()

        if (umbridgeEscapeGame.exit == true) {
            state = 0
            umbridgeEscapeGame.gameState = 1
            umbridgeEscapeGame.exit = false
        }
    }
}

//this class display game icons and evoke the game when the icon is pressed
class Game {
    constructor(x, y, graphic, gameCode) {
        this.x = x
        this.y = y
        this.graphic = graphic
        this.gameCode = gameCode
        // this.coolDown = 0
    }

    //display
    display() {
        this.mouseClose()
        //display the game icon
        image(this.graphic, this.x, this.y)
    }

    mouseClose() {
        if (dist(this.x + this.graphic.width / 2, this.y + this.graphic.height / 2, mouseX, mouseY) < 100) {
            fill(255, 255, 153, 80)
            ellipse(this.x + this.graphic.width / 2, this.y + this.graphic.height / 2, 200)

            return true
        }
        else {
            return false
        }
    }

    setState() {
        if (this.mouseClose()) {
            state = this.gameCode
        }
    }
}

function keyPressed() {
    if (state == 1) {
        spellGame1.keyPressed()
    }
    if (state == 2) {
        houseSortingGame.keyPressed()
    }
    if (state == 2.5) {
        spellGame2.keyPressed()
    }
    if (state == 3.5) {
        spellGame3.keyPressed()
    }

}

function mousePressed() {

    if (coolDown <= 0) {
        if (state == 0) {
            YuleBallGraphic.setState()
            // console.log("*", state)
            HouseGraphic.setState()
            UmbridgeEscapeGraphic.setState()
        }

        if (state == 1) {
            spellGame1.mousePressed()
        }
        if (state == 2.5) {
            spellGame2.mousePressed()
        }
        if (state == 3) {
            yuleBallGame.mousePressed()
        }
        if (state == 3.5) {
            spellGame3.mousePressed()
        }
        if (state == 4) {
            umbridgeEscapeGame.mousePressed()
        }
    }

    coolDown = 30

}

function mouseClicked() {
    if (state == 4) {
        umbridgeEscapeGame.mouseClicked()
    }
}

