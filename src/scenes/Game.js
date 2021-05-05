import Phaser from '../lib/phaser.js'

export default class Game extends Phaser.Scene
{
    constructor()
    {
        super('game');
    }
    init(data){
		this.attack = data.attack
		this.life = data.health
	}

    //---------------------------------------------------------------------- VARIABLES ----------------------------------------------------------------------
    

    //----------------------- PRELOAD -----------------------------------------------------------------------------------------------------------------------

    preload ()
    {


        this.load.image('Tileset', 'assets/Serene_Village_32x32.png');

        this.load.tilemapTiledJSON('Map', 'ZeldaLike.json');

        this.load.image('Pdv', 'assets/Pdv.png');
        this.load.image('PdvPerdu', 'assets/PdvPerdu.png');
      
        this.load.spritesheet('ours', 'assets/chevalier.png', { frameWidth: 24, frameHeight: 37 });
        this.load.spritesheet('ennemi', 'assets/ennemi.png', { frameWidth: 64, frameHeight: 94 });
    }

    //----------------------- CREATE -------------------------------------------------------------------------------------------------------------------------

    create ()
    {
        this.life = 3
        //Vie
        if (this.life == 3){
			this.pdv1 = this.add.image(40,50,'Pdv').setScale(2).setScrollFactor(0).setDepth(3);
			this.pdv2 = this.add.image(85,50,'Pdv').setScale(2).setScrollFactor(0).setDepth(3);
			this.pdv3 = this.add.image(130,50,'Pdv').setScale(2).setScrollFactor(0).setDepth(3);
		}

		else if (this.life == 2){
			this.pdv1 = this.add.image(40,50,'Pdv').setScale(2).setScrollFactor(0).setDepth(3);
			this.pdv2 = this.add.image(92,50,'Pdv').setScale(2).setScrollFactor(0).setDepth(3);
            this.pdvDead = this.add.image(145,45,'PdvPerdu').setScale(2).setScrollFactor(0).setDepth(3);
		}
		else if (this.life == 1){
			this.pdv1 = this.add.image(40,50,'Pdv').setScale(2).setScrollFactor(0).setDepth(3);
            this.pdvDead = this.add.image(92,45,'PdvPerdu').setScale(2).setScrollFactor(0).setDepth(3);
            this.pdvDead = this.add.image(165,45,'PdvPerdu').setScale(2).setScrollFactor(0).setDepth(3);
		}

        let Village = this.make.tilemap({key:'Map'});

        let Terrain = Village.addTilesetImage('Serene_Village_32x32','Tileset');

        let Background = Village.createLayer('Background', Terrain, 0, 0).setDepth(-2);
        let Layer1 = Village.createLayer('ElemDecor', Terrain, 0, 0).setDepth(-1);
        this.cursors = this.input.keyboard.createCursorKeys();

        
        
        //---------------------------------------------------------------------- PLAYER ----------------------------------------------------------------------
            
            this.player = this.physics.add.sprite(200, 1900, 'ours');
            this.player.direction = 'right';
            this.player.setBounce(0);
            this.player.setCollideWorldBounds(true);

            this.physics.add.collider(this.player, Background);

            Background.setCollisionByProperty({collides:true});
        //---------------------------------------------------------------------- ANIMS ----------------------------------------------------------------------   
            
            this.anims.create({
                key: 'left',
                frames: this.anims.generateFrameNumbers('ours', { start: 0, end: 2 }),
                frameRate: 10,
                repeat: -1
            });

            this.anims.create({
                key: 'turn',
                frames: [ { key: 'ours', frame: 7 } ],
                frameRate: 20
            });

            this.anims.create({
                key: 'right',
                frames: this.anims.generateFrameNumbers('ours', { start: 9, end: 11 }),
                frameRate: 10,
                repeat: -1
            });

            this.anims.create({
                key: 'up',
                frames: this.anims.generateFrameNumbers('ours', { start: 3, end: 5 }),
                frameRate: 10,
                repeat: -1
            });
            this.anims.create({
                key: 'down',
                frames: this.anims.generateFrameNumbers('ours', { start: 6, end: 8 }),
                frameRate: 10,
                repeat: -1
            });
        
            this.physics.add.collider(this.player, Background);
        
            Background.setCollisionByProperty({collide:true});
    
            this.physics.add.collider(this.player, Layer1);
            
            Layer1.setCollisionByProperty({collide:true});
    

    
    
             const debugGraphics = this.add.graphics().setAlpha(0.75);
            Background.renderDebug(debugGraphics, {
                  tileColor: null, // Color of non-colliding tiles
                  collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
                  faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
            });
            Layer1.renderDebug(debugGraphics, {
                tileColor: null, // Color of non-colliding tiles
                collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
                faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
              });
            
        
        //camera
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setBounds(0,0,Village.widthInPixels, Village.heightInPixels);
        this.physics.world.setBounds(0,0, Village.widthInPixels, Village.heightInPixels);
        this.player.setCollideWorldBounds(true);

    }
    //----------------------- UPDATE -------------------------------------------------------------------------------------------------------------------------
    update (t,dt)
    {
        const speed = 275;

        if (!this.player)
		{
			return
		}

        this.player.setVelocity(0)
		this.player.anims.play('turn')

        if (this.paddleConnected == true)
    	{

        	if (paddle.right)
        	{
            	this.player.setVelocityX(speed);
            	//this.player.anims.play('right', true);
        	}
        	else if (paddle.left)
        	{
            	this.player.setVelocityX(-speed);
            	//this.player.anims.play('left', true);
        	}
            else if (paddle.up)
        	{
            	this.player.setVelocityY(-speed);
            	//this.player.anims.play('up', true);
        	}
            else if (paddle.down)
        	{
            	this.player.setVelocityY(speed);
            	//this.player.anims.play('down', true);
        	}

			if (this.attack && paddle.A){
				this.attaquer(this.player);
			}

		}

		else if (this.cursors.up.isDown)
		{
			this.player.direction='up';
			this.player.setVelocityY(-speed)
			//this.player.anims.play('up', true);
		}


		else if (this.cursors.left.isDown)
		{
			this.player.direction='left';
            this.player.setVelocityX(-speed)
			//this.player.anims.play('left', true)
		}

		else if (this.cursors.right.isDown)
		{
			this.player.direction='right';
            this.player.setVelocityX(speed)
			//this.player.anims.play('right', true)	
		}
        else if (this.cursors.down.isDown)
		{
			this.player.direction='down';
            this.player.setVelocityY(speed)
			//this.player.anims.play('down', true)	
		}	
		
		if (this.attack && Phaser.Input.Keyboard.JustDown(this.boutonAttaque)){
			this.player.setVelocity(0)
			this.attaquer(this.player);
		}

    }
}