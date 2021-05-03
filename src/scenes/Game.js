import Phaser from './lib/phaser.js'

export default class Game extends Phaser.Scene
{
    constructor()
    {
        super(game);
    }

    //---------------------------------------------------------------------- VARIABLES ----------------------------------------------------------------------
    

    //----------------------- PRELOAD -----------------------------------------------------------------------------------------------------------------------

    preload ()
    {


        this.load.image('Tileset', 'assets/Serene_Village_32x32.png');

        this.load.tilemapTiledJSON('Map', 'ZeldaLike.json');

        this.load.image('pdv1', 'assets/pointDeVie1.png');
        this.load.image('pdv2', 'assets/pointDeVie2.png');
        this.load.image('pdv3', 'assets/pointDeVie3.png');
        this.load.spritesheet('ours', 'assets/ours.png', { frameWidth: 64, frameHeight: 94 });
        this.load.spritesheet('ennemi', 'assets/ennemi.png', { frameWidth: 64, frameHeight: 94 });
    }

    //----------------------- CREATE -------------------------------------------------------------------------------------------------------------------------

    create ()
    {
        let Village = this.make.tilemap({key:'Map'});

        let Terrain = Village.addTilesetImage('Serene_Village_32x32','Tileset');

        let Background = Village.createLayer('Background', Terrain, 0, 0).setDepth(-2);
        let Layer1 = Village.createLayer('ElemDecor', Terrain, 0, 0).setDepth(-1);
    cursors = this.input.keyboard.createCursorKeys();

        
        
        //---------------------------------------------------------------------- PLAYER ----------------------------------------------------------------------
            
            player = this.physics.add.sprite(100, 1910, 'ours');
            player.direction = 'right';
            player.setBounce(0);
            player.setCollideWorldBounds(true);
            
            hp = this.add.image(175,900, "pdv3").setScrollFactor(0);

            this.physics.add.collider(player, Background);

            Background.setCollisionByProperty({collides:true});
        //---------------------------------------------------------------------- ANIMS ----------------------------------------------------------------------   
            
            this.anims.create({
                key: 'left',
                frames: this.anims.generateFrameNumbers('ours', { start: 0, end: 3 }),
                frameRate: 10,
                repeat: 1
            });

            this.anims.create({
                key: 'turn',
                frames: [ { key: 'ours', frame: 4 } ],
                frameRate: 20
            });

            this.anims.create({
                key: 'right',
                frames: this.anims.generateFrameNumbers('ours', { start: 5, end: 8 }),
                frameRate: 11,
                repeat: 1
            });

        //camera
        this.cameras.main.startFollow(player);
        this.cameras.main.setBounds(0,0,Village.widthInPixels, Village.heightInPixels);
        this.physics.world.setBounds(0,0, Village.widthInPixels, Village.heightInPixels);
        player.setCollideWorldBounds(true);

    }
    //----------------------- UPDATE -------------------------------------------------------------------------------------------------------------------------
    update ()
    {
        player.setVelocity(0);
        if (cursors.left.isDown)  {
                player.direction = 'left';
                if (player.body.touching.down){
                    player.setVelocityX(-400);
                }
                else if (player.body.touching.grandePlateformeGlace){
                    player.setVelocityX(-4000);
                }
                else {
                    player.setVelocityX(-600);
                }
                player.anims.play('left', true);
            }
            else if (cursors.right.isDown) {
                player.direction = 'right';
                if (player.body.touching.down){
                    player.setVelocityX(400); 
                }
                else if (player.body.touching.grandePlateformeGlace){
                    player.setVelocityX(4000);
                }
                else {
                    player.setVelocityX(600);
                }
                player.anims.play('right', true);
            }
            else  {
                player.setVelocityX(0);
                player.anims.play('turn');
            }
            if (cursors.up.isDown ) {
                player.setVelocityY(-950);
            }
            if (cursors.down.isDown )
            {
                player.setVelocityY(900);
            }
            
    }
}