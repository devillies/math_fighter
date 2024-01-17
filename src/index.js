import { AUTO, Scale, Game } from 'phaser'
import MathFighterScene from './scenes/MathFighterScene'

const config = {
	type: AUTO,
	backgroundColor: '#32A5E7',
	scale: {
		width: 480,
		height: 640,
		mode: Scale.FIT,
		autoCenter: Scale.CENTER_BOTH,
	},
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 200 },
			debug: false,
		},
	},
	scene: [MathFighterScene],
}

/* eslint-disable-next-line */
export default new Game(config)
