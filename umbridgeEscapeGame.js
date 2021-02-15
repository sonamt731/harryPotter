//game states
//0 - game not started 
//1 - game playing
//2 - game over fred is dead 
//3 - game over all umbridges defeated 

class UmbridgeEscapeGame{
	constructor() {
		this.exit = false;
		this.gameState = 1;

		this.fredXpos = 50;
		this.fredYpos = 420;

		this.alive = true;
		this.fredLifeLine = 100;

		this.defeated = 0;
		this.umbridges = []
		this.fireworks = []
		for (let u = 0; u < 3; u++){
			let temp = new Umbridge();
			this.umbridges.push(temp);
		}
	}
	draw(){
		if(this.gameState == 0){
			imageMode(CORNER)
			image(wallbg,0,0)
			image(gameName, 25,100)
			image(fred, 250, 380)
			image(umbridgeImg, 320,380)
		}
		if(this.gameState == 1){
			imageMode(CORNER)
			background(255)
			image(wallbg,0,0)
			imageMode(CENTER)

			image(fred, this.fredXpos, this.fredYpos);

			//code for Fred's battery life
			//noFill();
			stroke(0);
			strokeWeight(1);
			rectMode(CORNER)
			rect(this.fredXpos-50, this.fredYpos-80, 100, 25);

			if (this.fredLifeLine < 50) {
				fill(255,0,0);
			}
			else {
				fill(0,255,0);
			}
			rect(this.fredXpos-50,this.fredYpos -80, this.fredLifeLine, 25);

			if(this.fredLifeLine<= 0){
				this.alive = false;
			}
			
			for (let u of this.umbridges){
				if(u.alive){
					u.moveAndDisplay()
				}		
			}


			if(this.fredXpos <= 0){
				this.fredXpos = 590;
			}

			if(this.fredXpos >= 620){
				this.fredXpos = 50;
			}

			if(this.fredYpos >= 480){
				this.fredYpos = 40;
			}

			if(this.fredYpos <= 0){
				this.fredYpos = 420
			}

			//left
			if(keyIsDown(65)){
				this.fredXpos-=2;
			}
			//right
			if(keyIsDown(68)){
				this.fredXpos+=2;

			}
			//down
			if(keyIsDown(83)){
				this.fredYpos +=2;
			}
			//up 
			if(keyIsDown(87)){
				this.fredYpos-=2;
			}

			if(this.fredXpos <= 0){
				this.fredXpos = 640
			}

			if(this.fredXpos >= 640){
				this.fredXpos = 0
			}

			if(this.fredYpos < 0){
				this.fredYpos = 480
			}

			if(this.fredYpos > 480){
				this.fredYpos = 0
			}
			for (let i = 0; i < this.fireworks.length; i++){
				if (this.fireworks[i].state !== 'done'){
					this.fireworks[i].display();
				}
			}

			for(let u of this.umbridges){
				for(firework of this.fireworks){
					if(firework.state!== 'done'){
						if (dist(firework.xpos, firework.ypos, u.xpos, u.ypos)<50){
							u.lifeline -= 10;
							u.xpos+=50;
							u.ypos+=100; 
						}
					}
				}
			}

			if(this.defeated === 3){
				this.gameState = 3;
			}
			else if(this.fredLifeLine == 0){
				this.gameState = 2;
			}
		}
		if(this.gameState === 3){ //defeated energy 
			imageMode(CORNER)
			image(wallbg,0,0)
			image(fred, 250, 380)
			fill(255)
			ellipse(318,100,400,100)
			fill(0)
			textSize(20)
			textStyle(BOLD)
			text("You know, I really hate children!",160,100)
			image(umbridgeImg, 340,120)
			fill(15)
			rect(50,160,250,50)
			fill(255)
			textSize(15)
			text("Click the Screen for the Map",70,190)

		}
		if(this.gameState === 2){ //fred dead 
			imageMode(CORNER)
			image(wallbg,0,0)
			fill(255)
			ellipse(318,100,400,100)
			fill(0)
			textSize(20)
			textStyle(BOLD)
			text("Bloody Hell, that witch!",190,100)
			image(fred, 340,120)
			image(umbridgeImg, 320,380)
			rect(50,160,250,50)
			fill(255)
			textSize(15)
			text("Click the Screen for the Map",70,190)

		}

		fill(184)
		noStroke()
		rect(470, 450, 170, 30)
		fill(15)
		textSize(14)
		text('Umbridges Defeated: '+this.defeated+'/3', 475, 470)
	}

	mouseClicked(){
		if(this.gameState == 1){
			this.fireworks.push(new Expansion())	
		}	
	}

	mousePressed(){
		if(this.gameState == 2 || this.gameState == 3){
			this.exit = true
			this.defeated = 0
			
			for(let u of this.umbridges){
				u.lifeline = 100;
				u.alive = true
			}
			this.fredLifeLine = 100;
			this.alive = true
		}
	}	
}

class Umbridge{
	constructor(){
		this.xpos = random(120,600);
		this.ypos = random(100,400);
		this.speed = random(2,4);
		this.alive = true;
		this.state = 0;
		this.timeInState = int(random(100,250));
		this.lifeline = 100;
	}	

	moveAndDisplay(){
		if(this.alive){
			if(this.state == 0){ //have umbridge move right
				this.xpos += this.speed;
			}
			else if (this.state == 1){ //have umbridge move left 
				this.xpos -= this.speed;
			}
			else if (this.state == 2){ //move up 
				this.ypos -= this.speed;
			}
			else if (this.state == 3){ // moving down
				this.ypos += this.speed;
			}

			this.timeInState -=1;
			if (this.timeInState === 0){
				this.timeInState = int(random(100,250));
				this.state = int(random(0,4))
			}

			if(this.xpos <= 0){
				this.xpos = 600
			}
			if(this.xpos >= 640){
				this.xpos = 70
			}
			if(this.ypos < 0){
				this.ypos = 420
			}
			if(this.ypos > 480){
				this.ypos = 100
			}

			image(umbridgeImg, this.xpos, this.ypos);
			//code for umbridges battery life
			noFill();
			stroke(0);
			rectMode(CORNER)
			rect(this.xpos-50, this.ypos-80, 100, 25);

			if (this.lifeline < 50) {
					fill(255,0,0);
			}
			else {
					fill(0,255,0);
			}
			rect(this.xpos -50,this.ypos -80, this.lifeline, 25);

			if(this.lifeline<= 0){
				this.alive = false;
				umbridgeEscapeGame.defeated+=1
				umbridgeExplode.play();
			}

			if(dist(umbridgeEscapeGame.fredXpos, umbridgeEscapeGame.fredYpos, this.xpos, this.ypos) <= 75){
				umbridgeEscapeGame.fredLifeLine -= 5; 
				this.xpos+=50;
				this.ypos+=100; 
			}
		}
	}
}

class Expansion{
	constructor(){
		this.xpos = umbridgeEscapeGame.fredXpos;
		this.ypos = umbridgeEscapeGame.fredYpos;
		this.size = 5;
		this.timer = 20;
		this.state = 'seed';
		this.r = random(0,255);
		this.g = random(0,255);
		this.b = random(0,255);
		this.particles = []
		this.gravity = .1
		this.rand = int(random(0,2))

	}

	display(){
		noStroke()
		fill(this.r, this.g, this.b)

		if (this.state === 'seed'){
			if (this.timer == 0){
				this.timer == 10;
				ellipse(this.xpos+4, this.ypos-5, this.size);
			}

			if(this.size>=20){
				this.state = 'firework';
				ellipse(this.xpos+4, this.ypos-5, this.size);
			}
			else{
				this.size += .25;
			}
			this.timer -= 1;
		}

		else if (this.state === 'firework'){
			if(this.rand == 1){ 
				image(firework1, this.xpos, this.ypos)
			}
			else{
				image(firework2, this.xpos, this.ypos)
			}
			ellipse(this.xpos+4, this.ypos-5, this.size);
			this.ypos +=1;
		}
		if(this.ypos >= 480){
			this.state = 'done'
		}
	}	
}

