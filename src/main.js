import Phaser from './lib/phaser.js'


import Game from './scenes/Game.js'
import Dungeon from './scenes/Dungeon.js'
import GameOver from './scenes/GameOver.js'
import Win from './scenes/Win.js'
import Lore from './scenes/Lore.js'

export default new Phaser.Game({
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    scene: [Lore, Dungeon, Game, GameOver, Win],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 0
            }
          
        }
    },
    input:{gamepad:true},
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
})