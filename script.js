//Canvas SetUp
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 800; 
canvas.height = 500; 

let score = 0;
let gameFrame = 0; 
ctx.font = '50px Georgia';


//Mouse interactivity
let canvasPosition = canvas.getBoundingClientRect();
const mouse =
{
    x: canvas.width/2,
    y: canvas.height/2,
    click:false
}

canvas.addEventListener('mousedown', function(event)
{
    mouse.click = true; 
    mouse.x = event.x - canvasPosition.left;
    mouse.y = event.y - canvasPosition.top;
});

canvas.addEventListener('mouseup', function()
{
    mouse.click = false;
})

//Player

const boot = new Image();
boot.src = 'boot.png';

class Player
{
    constructor()
    {
        this.x = canvas.width/2;
        this.y = canvas.height/2;
        this.radius = 50;
        this.angle = 0; 
        this.frameX = 0;
        this.frameY = 0;
        this.spriteWidth = 498;
        this.spriteHeight = 327;
    }

    update()
    {
        const dx = this.x - mouse.x; 
        const dy = this.y - mouse.y;

        if(mouse.x != this.x)
        {
            this.x -= dx/5;
        }
        if(mouse.y != this.y/5)
        {
            this.y -= dy;
        }
    }

    draw()
    {
        if(mouse.click)
        {
            ctx.lineWidth = 0.2; 
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
        }
        ctx.drawImage(boot, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, 
            this.spriteWidth, this.spriteHeight, this.x - 45, this.y -35, this.spriteWidth/4, this.spriteHeight/4);
    }

}  

const player = new Player();

//Bugs 
const bugsArray = [];
const spider = new Image();
spider.src = 'spider.png';

class Bug
{
    constructor()
    {
        this.x= Math.random() * canvas.width;
        this.y= canvas.height + 80;
        this.radius = 30;
        this.speed = Math.random() * 2 + 2;
        this.distance;
        this.counted = false;  

    }
    update()
    {
        this.y -= this.speed;
        const dx = this.x - player.x;
        const dy = this.y - player.y; 
        this.distance = Math.sqrt(dx*dx + dy*dy);
    }

    draw()
    {
        // ctx.fillStyle = 'green';
        // ctx.beginPath();
        // ctx.arc(this.x, this.y, this.radius, 0, Math.PI *2);
        // ctx.fill();
        // ctx.closePath();
        // ctx.stroke();
        ctx.drawImage(spider, this.x - 25, this.y - 30, this.radius * 2, this.radius * 2);
    }
}

const squash = document.createElement('audio');
squash.src = 'impactsplat03.mp3.flac';

function handleBugs()
{
    if(gameFrame % 50 == 0)
    {
        bugsArray.push(new Bug());
    }
    for(let i =0; i < bugsArray.length; i++)
    {
        bugsArray[i].update();
        bugsArray[i].draw();
        if(bugsArray[i].y < 0 - this.radius *2)
        {
            bugsArray.splice(i, 1);
            i--;
        }
     
        else if(bugsArray[i].distance < bugsArray[i].radius + player.radius)
            {
                if(!bugsArray[i].counted)
                {
                    squash.play();
                    score++;
                    bugsArray[i].counted = true; 
                    bugsArray.splice(i, 1);
                    i--;
                 }
            }

    }
    for(let i =0; i < bugsArray.length; i++)
    {
       
        if(bugsArray[i].distance < bugsArray[i].radius + player.radius)
        {
            
        }
    }
}

//Background
const background = new Image();
background.src = 'livingroom.jpg';

function handleBackground()
{
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
}

//Good bugs

const bee = new Image();
bee.src = 'bee.png';

class Good_Bugs
{
    constructor()
    {
        this.x = canvas.width + 200;
        this.y = Math.random() * (canvas.height -150) + 90;
        this.radius = 60;
        this.speed = Math.random() * 2 + 2;
        this.frame = 0; 
        this.frameX = 0; 
        this.frameY = 0; 
    }

    draw()
    {
        ctx.drawImage(bee, this.x - 25, this.y - 30, this.radius * 2, this.radius * 2);
        // ctx.fillStyle = 'blue';
        // ctx.beginPath();
        // ctx.arc(this.x, this.y, this.radius, 0, Math.PI *2);
        // ctx.fill();
    }

    update()
    {
        this.x -= this.speed;
        if(this.x < 0 - this.radius * 2)
        {
            this.x = canvas.width + 200;
            this.y = Math.random() * (canvas.height - 150) + 90;
            this.speed = Math.random() * 2 + 2;
        }
    }
}

const queen = new Good_Bugs();
function handleGoodBugs() 
{
    queen.update();
    queen.draw();
}



//Animation Loop
function animate()
{
    ctx.clearRect(0,0,canvas.width, canvas.height);
    handleBackground();
    handleGoodBugs();
    handleBugs();
    player.update();
    player.draw();
    ctx.fillStyle = 'black';
    ctx.fillText('Bugs Squashed: ' + score, 5, 50, 150);
    gameFrame++; 
    requestAnimationFrame(animate);
}

animate();

window.addEventListener('resize', function(){
    canvasPosition = canvas.getBoundingClientRect();
});