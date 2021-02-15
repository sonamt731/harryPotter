//game state 1 is play
//game state 2 is game over - loss
//game state 3 is win 
class YuleBallGame {
	constructor() {
		this.exit = false

		this.gameState = 1
		this.xCount = 0
		this.eggCount = 0

		this.bgY1 = 0;
		this.bgY2 = 360;
		this.floorX1 = 0;
		this.floorX2 = 630;


		this.harryXpos = 200;
		this.harryYpos = 340;

		this.parvatiXpos = 300;
		this.parvatiYpos = 340;

		this.arrows = []
		this.prev = -50

		this.first = new Arrow(this.prev - 250, 0)
		this.arrows.push(this.first)
		this.second = new Arrow(this.prev - 250, 1)
		while (dist(this.second.xPos, this.second.yPos, this.first.xPos, this.first.yPos) <= 80) {
			this.second.xPos = random(40, 540)
		}
		this.arrows.push(this.second)
		// for (let i = 0; i<2; i++){
		// 	temp = new Arrow(prev - 250)
		// 	while (xposes.includes(temp.xPos)){
		// 		temp.xPos = random(40,540)
		// 	}
		// 	xposes.push(temp.xPos)
		// 	arrows.push(temp)
		// }

		this.egg = new Egg()
	}

	draw() {
		image(ballbg, 0, 0)
		image(snow1, 0, this.bgY1);
		image(snow2, 0, this.bgY2);
		this.bgY1 += 1;
		this.bgY2 += 1;

		if (this.bgY1 >= 360) {
			this.bgY1 = this.bgY2 - 360;
		}
		if (this.bgY2 >= 360) {
			this.bgY2 = this.bgY1 - 360;
		}

		if (this.gameState == 0) {

			fill(192)
			image(floor1, 0, 460)
			fill(255)
			ellipse(318, 100, 400, 100)
			fill(0)
			textSize(20)
			//textStyle(BOLD)
			text("Blimey Harry, don't embarras yourself!", 150, 100)
			image(ron, 340, 120)
			image(harryPotter, this.harryXpos, this.harryYpos)
			image(parvati, this.parvatiXpos, this.parvatiYpos)
		}


		if (this.gameState == 1) {

			//arrows behind harry and parvati
			for (let arrow of this.arrows) {
				arrow.moveAndDisplay();
			}
			fill(192)
			image(floor1, this.floorX1, 460);
			image(floor2, this.floorX2, 460);

			this.egg.moveAndDisplay();

			image(harryPotter, this.harryXpos, this.harryYpos)
			image(parvati, this.parvatiXpos, this.parvatiYpos)

			rect(500, 0, 140, 40)

			fill(0)
			textStyle(BOLD)
			textSize(15)
			text("Egg Count: " + this.eggCount, 520, 25)



			//right
			if (keyIsDown(68)) {
				this.harryXpos += 4;
				this.parvatiXpos += 4;
			}
			//left
			if (keyIsDown(65)) {
				this.harryXpos -= 4;
				this.parvatiXpos -= 4;
			}
			//up
			if (keyIsDown(87)) {
				this.harryYpos -= .2;
				this.parvatiYpos -= .2;
			}
			//down
			if (keyIsDown(83)) {
				this.harryYpos += .2;
				this.parvatiYpos += .2;
			}

			if (this.harryXpos <= 0) {
				this.harryXpos = 620;
			}
			if (this.parvatiXpos <= 0) {
				this.parvatiXpos = 620;
			}

			if (this.parvatiXpos >= 640) {
				this.parvatiXpos = 0
			}

			if (this.harryXpos >= 640) {
				this.harryXpos = 0;
			}

			for (let i = 0; i < this.xCount; i++) {
				image(wrong, 10 + 50 * i, 25)
			}

			if (this.xCount >= 3) {
				this.gameState = 2
			}

			if (this.floorX1 <= -630) {
				this.floorX1 = this.floorX2 + 630;
			}

			if (this.floorX2 <= -630) {
				this.floorX2 = this.floorX1 + 630
			}

			this.floorX1 -= 1;
			this.floorX2 -= 1;

		}

		if (this.gameState == 2) {
			fill(255)
			ellipse(318, 100, 400, 100)
			fill(0)
			textSize(20)
			textStyle(BOLD)
			text("Bloody Hell Harry.. you're horrible!", 150, 100)
			image(ron, 340, 120)
			image(floor1, 0, 460)

			for (let i = 0; i < this.xCount; i++) {
				image(wrong, 5 + 50 * i, 25)
			}

			image(harryPotter, this.harryXpos, this.harryYpos)
			image(parvati, this.parvatiXpos, this.parvatiYpos)

			fill(169)
			rect(50, 160, 250, 50)
			fill(0)
			textSize(15)
			text("Click the Screen for the Map", 70, 190)
			//text("Click Screen to Play Again", );
		}

		if (this.xCount < 3 && this.eggCount == 15) {
			this.gameState = 3;
		}

		if (this.gameState == 3) {
			fill(255)
			ellipse(318, 100, 400, 100)
			fill(0)
			textSize(20)
			textStyle(BOLD)
			text("Bloody Hell Harry.. you're not bad!", 150, 100)
			image(ron, 340, 120)
			fill(192)
			image(floor1, 0, 460)

			for (let i = 0; i < this.xCount; i++) {
				image(wrong, 5 + 50 * i, 25)
			}

			image(harryPotter, this.harryXpos, this.harryYpos)
			image(parvati, this.parvatiXpos, this.parvatiYpos)

			fill(169)
			rect(50, 160, 250, 50)
			fill(0)
			textSize(15)
			text("Click the Screen for the Map", 70, 190)
		}
	}
	mousePressed() {
		if (this.gameState === 2 || this.gameState === 3) {
			// window.location = "index.html"
			console.log("back to menu")

			this.exit = true

			this.xCount = 0
			this.eggCount = 0
		}
	}



}



class Arrow {
	constructor(yPos, arrowNum) {
		//will be used to pick the direction of the arrow 
		this.randNum = int(random(1, 4.5))
		this.isVisible = false;
		this.xPos = random(40, 540)
		this.yPos = yPos;
		this.arrowNum = arrowNum
	}

	moveAndDisplay() {
		this.yPos += 2.5;

		if (this.yPos > 0 && this.yPos < 480) {
			this.isVisible = true;
		}

		if (this.yPos >= 480) {
			this.randNum = int(random(1, 4))
			this.xPos = random(20, 540)
			//make sure arrows do not have same xpos
			if (this.arrowNum == 0) {
				while (dist(this.xPos, this.yPos, yuleBallGame.arrows[1].xPos, yuleBallGame.arrows[1].yPos) <= 80) {
					this.xPos = random(20, 540)
				}
			}
			if (this.arrowNum == 1) {
				while (dist(this.xPos, this.yPos, yuleBallGame.arrows[0].xPos, yuleBallGame.arrows[0].yPos) <= 80) {
					this.xPos = random(20, 540)
				}
			}
			this.yPos = -50
			this.isVisible = false;

			yuleBallGame.xCount += 1;

		}
		else {
			if (this.randNum === 1) {
				image(upArrow, this.xPos, this.yPos)
			}
			else if (this.randNum === 2) {
				image(downArrow, this.xPos, this.yPos)

			}
			else if (this.randNum === 3) {
				image(leftArrow, this.xPos, this.yPos)
			}
			//rightArrow
			else if (this.randNum === 4) {
				image(rightArrow, this.xPos, this.yPos)
			}
		}
		if (this.isVisible) {
			//up
			if (keyIsDown(87) && this.randNum === 1) {
				this.randNum = int(random(1, 4.5))
				this.xPos = random(20, 540)
				this.yPos = random(-500, -100)
				this.isVisible = false;
			}
			//down
			if (keyIsDown(83) && this.randNum === 2) {
				this.randNum = int(random(1, 4.5))
				this.xPos = random(20, 540)
				this.yPos = random(-500, -100)
				this.isVisible = false;
			}
			//left
			if (keyIsDown(65) && this.randNum === 3) {
				this.randNum = int(random(1, 4.5))
				this.xPos = random(20, 540)
				this.yPos = random(-500, -100)
				this.isVisible = false;
			}
			//right
			if (keyIsDown(68) && this.randNum === 4) {
				this.randNum = int(random(1, 4.5))
				this.xPos = random(20, 540)
				this.yPos = random(-500, -100)
				this.isVisible = false;
			}
		}
	}

}


class Egg {
	constructor() {
		this.xpos = random(40, 560)
		this.ypos = random(-300, -100)
	}

	moveAndDisplay() {
		image(eggImg, this.xpos, this.ypos)

		this.ypos += 4

		if (dist(yuleBallGame.harryXpos, yuleBallGame.harryYpos, this.xpos, this.ypos) <= 40) {
			yuleBallGame.eggCount += 1;
			this.xpos = random(40, 560)
			this.ypos = random(-1000, -400)
		}

		if (this.ypos >= 480) {
			this.ypos = random(-1000, -400)
		}
	}

}