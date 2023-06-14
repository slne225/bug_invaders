const gameState = {
	score: 0
};
 
let isPaused = false;

let gameOver = false;

class GameScene extends Phaser.Scene {
	constructor(){
		super({ key: 'GameScene' });
	}

	preload() {
		this.load.image('bug1', 'https://content.codecademy.com/courses/learn-phaser/physics/bug_1.png');
		this.load.image('bug2', 'https://content.codecademy.com/courses/learn-phaser/physics/bug_2.png');
		this.load.image('bug3', 'https://content.codecademy.com/courses/learn-phaser/physics/bug_3.png');
		this.load.image('platform', 'https://content.codecademy.com/courses/learn-phaser/physics/platform.png');
		this.load.image('codey', 'https://content.codecademy.com/courses/learn-phaser/physics/codey.png');
	}


	create() {

		gameState.player = this.physics.add.sprite(225, 450, 'codey').setScale(.5);

		const platforms = this.physics.add.staticGroup();

		platforms.create(225, 490, 'platform').setScale(1, .3).refreshBody();

		gameState.scoreText = this.add.text(195, 485, `Score: ${gameState.score}`, { fontSize: '15px', fill: '#000000' });

		gameState.player.setCollideWorldBounds(true);

		this.physics.add.collider(gameState.player, platforms);

		gameState.cursors = this.input.keyboard.createCursorKeys();

		gameState.bugs = this.physics.add.group();

		// const bugs = this.physics.add.group();

		const bugList = ['bug1', 'bug2', 'bug3']

		this.initializeKeys();

		//randomly generates a bug at the top of the game display
		const bugGen = () => {
			if (isPaused === false) {
				if (gameOver === false){
					const xCoord = Math.random() * 500
					let randomBug = bugList[Math.floor(Math.random() * 3)]
					gameState.bugs.create(xCoord, 10, randomBug)
				}
			}
		}
		
		

		this.initializeBugGenLoop(bugGen);
		

		//if the bug hits the platform the score increases
		this.physics.add.collider(gameState.bugs, platforms, function (bug) {
			bug.destroy();
			gameState.score += 10;
			gameState.scoreText.setText(`Score: ${gameState.score}`);
		})
		
		//if the player and bug collide it ends the game
		this.physics.add.collider(gameState.player, gameState.bugs, () => {
			gameOver = true;
			this.physics.pause();
			gameState.score = 0;
			this.add.text(180, 250, 'Game Over', { fontSize: '15px', fill: '#000000' });
			this.add.text(152, 270, 'Click to Restart', { fontSize: '15px', fill: '#000000' });



			this.input.on('pointerup', () => {
				this.scene.stop('GameScene')
				this.scene.start('StartScene')
				gameOver = false;
				isPaused = false;
			});
		});


	}

	update() {
			 
			//controls for the character
			if (isPaused === false) {
				if (gameState.cursors.left.isDown) {
					gameState.player.setVelocityX(-160);
				} else if (gameState.cursors.right.isDown) {
					gameState.player.setVelocityX(160);
				} else {
					gameState.player.setVelocityX(0);
				}
			}
			
			//if you pause it will suspend the falling bugs
			if (isPaused === true) {
				gameState.bugs.setVelocity(0, -3.3);
			}
			
			//toggles the isPaused global variable to true (pause) or false (unpause)
			const togglePause = () => {
				if (isPaused === false && gameOver != true) {
				  isPaused = true;
				  this.displayPauseScreen();
				} else {
				  isPaused = false;
				  this.removePauseScreen(); 
				}
			  }
			
			//push the space bar to pause and unpause the game
			if (Phaser.Input.Keyboard.JustDown(gameState.spaceKey)) {
				togglePause()
			}

		}
	
	//scope spacebar key outside of create
	initializeKeys() {
		gameState.spaceKey = this.input.keyboard.addKey('space')
		
	}


	// display background overlay with pause messages to indicate game is paused
	displayPauseScreen() {
		gameState.pauseOverlay = this.add.rectangle(0, 0, 480, 640, 0xFFFFFF);
		gameState.pauseOverlay.alpha = 0.75;
		gameState.pauseOverlay.setOrigin(0, 0);

		gameState.pauseText = this.add.text(225, 325, 'PAUSED').setColor('#000000');
		gameState.resumeText = this.add.text(125, 375, 'Press space to resume game').setColor('#000000');
	}

	// remove overlay and pause messages when game is unpaused
	removePauseScreen() {
		if (gameOver != true) {			gameState.pauseOverlay.destroy();
			gameState.pauseText.destroy();
			gameState.resumeText.destroy();
		}
	}

	//loop bugGen to drop bugs from the sky at random 
	initializeBugGenLoop(loopCallback) {

		this.time.addEvent({
				delay: 100, //one second
				callback: loopCallback, //bugGen
				callbackScope: this,
				loop: true, 
			});
	}

}





