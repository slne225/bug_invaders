class StartScene extends Phaser.Scene {
    constructor() {
        super({ key: 'StartScene'})
    }


    create() {
        this.add.text( 150, 250, 'click to start', {fill: '#000000', fontSize: '20px'})
        this.input.on('pointerdown', () => {
            this.scene.stop('StartScene')
            this.scene.start('GameScene')
        })
    } 
}

			//   if (gameState.cursors.space.justDown && isPaused === false) {
			// 	togglePause();
			// 	console.log(isPaused)
				// } else if (gameState.cursors.space.isUp && isPaused === true){
				// 	isPaused = false;
				// 	console.log(isPaused)
				// }
				// console.log(isPaused)

		// 	if (gameState.cursors.space.isDown) {
		// 		 if (isPaused === false) {
		// 			isPaused = true;
		// 			console.log(isPaused)
		// 			console.log('test')
		// 			gameState.scoreText.setText(`Score: ${gameState.score += 100}`);
					
		// 	} 
		// } else {
		// 	isPaused = false
		// 	console.log(isPaused)