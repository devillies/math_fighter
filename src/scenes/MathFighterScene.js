import { Scene } from 'phaser'

// https://github.com/devillies/math_fighter

export default class MathFighterScene extends Scene {
	constructor() {
		super('math-fighter-scene')
	}

	init() {
		this.gameHalfWidth = this.scale.width * 0.5
		this.gameHalfHeight = this.scale.height * 0.5
		this.player = undefined
		this.enemy = undefined
		this.slash = undefined
		this.startGame = undefined
		this.questionText = undefined
		this.resultText = undefined
		//  button init
		this.button1 = undefined
		this.button2 = undefined
		this.button3 = undefined
		this.button4 = undefined
		this.button5 = undefined
		this.button6 = undefined
		this.button7 = undefined
		this.button8 = undefined
		this.button9 = undefined
		this.button0 = undefined
		this.buttonDel = undefined
		this.buttonOk = undefined
	}

	preload() {
		// load image
		this.load.image('background', 'images/bg_layer1.png')
		this.load.image('fight-bg', 'images/fight-bg.png')
		this.load.image('tile', 'images/tile.png')
		this.load.image('start-btn', 'images/start_button.png')

		// load spritesheet
		this.load.spritesheet('player', 'images/warrior1.png', {
			frameWidth: 80,
			frameHeight: 80,
		})

		this.load.spritesheet('enemy', 'images/warrior2.png', {
			frameWidth: 80,
			frameHeight: 80,
		})
		this.load.spritesheet('numbers', 'images/numbers.png', {
			frameWidth: 131,
			frameHeight: 71.25,
		})
		this.load.spritesheet('slash', 'images/slash.png', {
			frameWidth: 42,
			frameHeight: 88,
		})
	}

	create() {
		// World
		this.add.image(240, 320, 'background')
		const fight_bg = this.add.image(240, 160, 'fight-bg')
		const tile = this.physics.add.staticImage(240, fight_bg.height - 40, 'tile')
		let start_button = this.add
			.image(this.gameHalfWidth, this.gameHalfHeight + 181, 'start-btn')
			.setInteractive()

		// Player
		this.player = this.physics.add
			.sprite(this.gameHalfWidth - 150, this.gameHalfHeight - 200, 'player')
			.setBounce(0.2)
			.setOffset(-20, -10)

		// Enemy
		this.enemy = this.physics.add
			.sprite(this.gameHalfWidth + 150, this.gameHalfHeight - 200, 'enemy')
			.setBounce(0.2)
			.setOffset(20, -10)
			.setFlipX(true)

		// Slash
		this.slash = this.physics.add
			.sprite(240, 60, 'slash')
			.setActive(false)
			.setVisible(false) // nyalakan untuk liat posisi slash
			.setGravityY(-500)
			.setOffset(0, -10)
			.setDepth(1)
			.setCollideWorldBounds(true)

		// Collider
		this.physics.add.collider(this.player, tile)
		this.physics.add.collider(this.enemy, tile)

		// event start button
		start_button.on(
			'pointerdown',
			() => {
				this.gameStart()
				start_button.destroy()
				this.createButtons()
			},
			this,
		)

		this.createAnimation()
	}

	update() {}

	createAnimation() {
		// animasi player

		this.anims.create({
			key: 'player-standby',
			frames: this.anims.generateFrameNumbers('player', { start: 15, end: 19 }),
			frameRate: 10,
			repeat: -1,
		})
		this.anims.create({
			key: 'player-attack',
			frames: this.anims.generateFrameNumbers('player', { start: 10, end: 14 }),
			frameRate: 10,
		})
		this.anims.create({
			key: 'player-hit',
			frames: this.anims.generateFrameNumbers('player', { start: 5, end: 9 }),
			frameRate: 10,
		})
		this.anims.create({
			key: 'player-die',
			frames: this.anims.generateFrameNumbers('player', { start: 0, end: 4 }),
			frameRate: 10,
		})

		// animasi enemy

		this.anims.create({
			key: 'enemy-standby',
			frames: this.anims.generateFrameNumbers('enemy', { start: 15, end: 19 }),
			frameRate: 10,
			repeat: -1,
		})

		this.anims.create({
			key: 'enemy-attack',
			frames: this.anims.generateFrameNumbers('player', { start: 10, end: 14 }),
			frameRate: 10,
		})
		this.anims.create({
			key: 'enemy-hit',
			frames: this.anims.generateFrameNumbers('player', { start: 5, end: 9 }),
			frameRate: 10,
		})

		this.anims.create({
			key: 'enemy-die',
			frames: this.anims.generateFrameNumbers('player', { start: 0, end: 4 }),
			frameRate: 10,
		})
	}

	gameStart() {
		this.startGame = true
		//  enemy dan player animasi standby
		this.player.anims.play('player-standby', true)
		this.enemy.anims.play('enemy-standby', true)
		// munculkan text result dan question
		this.resultText = this.add.text(this.gameHalfWidth, 200, '0', {
			fontSize: '32px',
			fill: '#000',
		})
		this.questionText = this.add.text(this.gameHalfWidth, 100, '0', {
			fontSize: '32px',
			fill: '#000',
		})
	}

	createButtons() {
		const startPosY = this.scale.height - 246

		const widthDiff = 131

		const heightDiff = 71.25

		// middle button
		this.button2 = this.add
			.image(this.gameHalfWidth, startPosY, 'numbers', 1)
			.setInteractive()
			.setData('value', 2)
		this.button5 = this.add
			.image(this.gameHalfWidth, this.button2.y + heightDiff, 'numbers', 4)
			.setInteractive()
			.setData('value', 5)
		this.button8 = this.add
			.image(this.gameHalfWidth, this.button5.y + heightDiff, 'numbers', 7)
			.setInteractive()
			.setData('value', 8)
		this.button0 = this.add
			.image(this.gameHalfWidth, this.button8.y + heightDiff, 'numbers', 10)
			.setInteractive()
			.setData('value', 0)

		// left button

		this.button1 = this.add
			.image(this.button2.x - widthDiff, startPosY, 'numbers', 0)
			.setInteractive()
			.setData('value', 1)

		this.button4 = this.add
			.image(
				this.button5.x - widthDiff,
				this.button1.y + heightDiff,
				'numbers',
				3,
			)
			.setInteractive()
			.setData('value', 4)

		this.button7 = this.add
			.image(
				this.button8.x - widthDiff,
				this.button4.y + heightDiff,
				'numbers',
				6,
			)
			.setInteractive()
			.setData('value', 7)

		this.buttonDel = this.add
			.image(
				this.button0.x - widthDiff,
				this.button7.y + heightDiff,
				'numbers',
				9,
			)
			.setInteractive()
			.setData('value', 'del')

		// right button
		this.button3 = this.add
			.image(this.button2.x + widthDiff, startPosY, 'numbers', 2)
			.setInteractive()
			.setData('value', 3)

		this.button6 = this.add
			.image(
				this.button5.x + widthDiff,
				this.button3.y + heightDiff,
				'numbers',
				5,
			)
			.setInteractive()
			.setData('value', 6)

		this.button9 = this.add
			.image(
				this.button8.x + widthDiff,
				this.button6.y + heightDiff,
				'numbers',
				8,
			)
			.setInteractive()
			.setData('value', 9)

		this.buttonOk = this.add
			.image(
				this.button0.x + widthDiff,
				this.button9.y + heightDiff,
				'numbers',
				11,
			)
			.setInteractive()
			.setData('value', 'ok')
	}
}
