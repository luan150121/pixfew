//pega o player do HTML pra conseguir controlar ele no JS
const player = document.getElementById("player");
const popup = document.getElementById("interaction-popup");

const doorElement = document.getElementById("door");
const wallLeftElement = document.getElementById("wall-left");
const exitAreaElement = document.getElementById("wall-right-top");
const leftExitElement = document.getElementById("area2-wall-left-top");
const area3LeftElement = document.getElementById("area3-wall-left-top");
const area3RightElement = document.getElementById("area3-wall-right-top");
const area4LeftElement = document.getElementById("area4-wall-left-top");
const area4RightElement = document.getElementById("area4-wall-left-bottom");
const area5LeftElement = document.getElementById("area5-wall-left-top");
const area5RightElement = document.getElementById("area5-wall-left-bottom");

const floorElement = document.getElementById("floor");
const floorLeftElement = document.getElementById("floor-left");
const floorRightElement = document.getElementById("floor-right");

//plataformas
const platform1Element = document.getElementById("platform-1");
const platform2Element = document.getElementById("platform-2");
const platform3Element = document.getElementById("platform-3");
const platform4Element = document.getElementById("platform-4");

//plataforma que cai
const fallingPlatformElement = document.getElementById("falling-platform");

//fragmento de memória e obstáculo de dano
const memoryFragmentElement = document.getElementById("memory-fragment");
const memoryPopupElement = document.getElementById("memory-popup");

const damageObstacleElement = document.getElementById("damage-obstacle");
const damagePopupElement = document.getElementById("damage-popup");

//corrente de vento
const windZoneElement = document.getElementById("wind-zone");

//posição inicial do player (centro da tela)
let x = (window.innerWidth / 2) - 10;
let y = (window.innerHeight / 2) - 15;

//velocidade do player
let speed = 3;

//velocidade, gravidade, tamanho do pulo(quanto menor mais alto)
let velocityY = 0;
let gravity = 0.5;
let jumpForce = -20;

//desbugar pulo
let isGrounded = false;
let jumpPressed = false;

let fallingPlatformY = 420;
let fallingPlatformFalling = false;
let fallingPlatformTimerStarted = false;

//define onde o player aparece ao trocar de área
const spawnPoint = localStorage.getItem("spawnPoint");

if(spawnPoint === "fromLeft"){
    x = 80;
    y = window.innerHeight - 100;
    localStorage.removeItem("spawnPoint");
}

if(spawnPoint === "fromRight"){
    x = window.innerWidth - 120;
    y = window.innerHeight - 100;
    localStorage.removeItem("spawnPoint");
}

if(spawnPoint === "fromTop"){
    x = (window.innerWidth / 2) - 10;
    y = 120;
    velocityY = 0;
    isGrounded = false;
    localStorage.removeItem("spawnPoint");
}

//variável para entrar na porta
let canEnterDoor = false;

//detecta se as teclas estão pressionadas
const keys = {
    w: false,
    a: false,
    s: false,
    d: false
};

//hitbox do player (tamanho lógico pra colisão)
const hitbox = {
    width: 20,
    height: 30
};

//hitbox das paredes da primeira área
const walls = [
    {
        x: 0,
        y: 0,
        width: 40,
        height: window.innerHeight
    },
    {
        x: window.innerWidth - 40,
        y: 0,
        width: 40,
        height: 250
    },
    {
        x: window.innerWidth - 40,
        y: window.innerHeight - 250,
        width: 40,
        height: 250
    }
];

//hitbox das paredes da área 2
const area2Walls = [
    {
        x: 0,
        y: 0,
        width: 40,
        height: 250
    },
    {
        x: 0,
        y: window.innerHeight - 250,
        width: 40,
        height: 250
    }
];

//hitbox das paredes da área 3
const area3Walls = [
    {
        x: 0,
        y: 0,
        width: 40,
        height: 250
    },
    {
        x: 0,
        y: window.innerHeight - 250,
        width: 40,
        height: 250
    }
];

//hitbox das paredes da direita da área 3
const area3RightWalls = [
    {
        x: window.innerWidth - 40,
        y: 0,
        width: 40,
        height: 160
    },
    {
        x: window.innerWidth - 40,
        y: 300,
        width: 40,
        height: 180
    },
    {
        x: window.innerWidth - 40,
        y: window.innerHeight - 120,
        width: 40,
        height: 120
    }
];

const area4Walls = [
    {
        x: 0,
        y: 0,
        width: 40,
        height: 250
    },
    {
        x: 0,
        y: window.innerHeight - 250,
        width: 40,
        height: 250
    }
];

const area5Walls = [
    {
        x: 0,
        y: 0,
        width: 40,
        height: 250
    },
    {
        x: 0,
        y: window.innerHeight - 250,
        width: 40,
        height: 250
    }
];

const area4LeftExitArea = {
    x: 0,
    y: 250,
    width: 40,
    height: window.innerHeight - 500
};

//hitbox plataformas suspensas
const platforms = [
    {
        element: platform1Element,
        x: 300,
        y: 550,
        width: 140,
        height: 15
    },
    {
        element: platform2Element,
        x: 550,
        y: 400,
        width: 40,
        height: 50
    },
    {
        element: platform3Element,
        x: 730,
        y: 300,
        width: 40,
        height: 50
    },
    {
        element: platform4Element,
        x: 900,
        y: 300,
        width: 500,
        height: 50
    }
];

const fallingPlatform = {
    x: 350,
    y: fallingPlatformY,
    width: 160,
    height: 25
};

//hitbox da porta
const door = {
    x: 600,
    y: 647,
    width: 60,
    height: 90
};

//saída lateral direita da primeira área
const exitArea = {
    x: window.innerWidth - 40,
    y: 250,
    width: 40,
    height: window.innerHeight - 500
};

//saída lateral esquerda da área 2
const leftExitArea = {
    x: 0,
    y: 250,
    width: 40,
    height: window.innerHeight - 500
};

//saída lateral esquerda da área 3
const area3LeftExitArea = {
    x: 0,
    y: 250,
    width: 40,
    height: window.innerHeight - 500
};

//saída direita superior da área 3
const area3RightTopExitArea = {
    x: window.innerWidth - 40,
    y: 160,
    width: 40,
    height: 140
};

//saída direita inferior da área 3
const area3RightBottomExitArea = {
    x: window.innerWidth - 40,
    y: 480,
    width: 40,
    height: window.innerHeight - 600
};

const area5LeftExitArea = {
    x: 0,
    y: 250,
    width: 40,
    height: window.innerHeight - 500
};

//saída para baixo da área 5
const downExitArea = {
    x: window.innerWidth * 0.45,
    y: window.innerHeight - 40,
    width: window.innerWidth * 0.10,
    height: 40
};

//hitbox do chão
const floor = {
    x: 0,
    y: window.innerHeight - 40,
    width: window.innerWidth,
    height: 40
};

const floorLeft = {
    x: 0,
    y: window.innerHeight - 40,
    width: window.innerWidth * 0.45,
    height: 40
};

const floorRight = {
    x: window.innerWidth * 0.55,
    y: window.innerHeight - 40,
    width: window.innerWidth * 0.45,
    height: 40
};

const memoryFragment = {
    x: 600,
    y: 500,
    width: 25,
    height: 25
};

const damageObstacle = {
    x: 400,
    y: 560,
    width: 80,
    height: 30
};

const windZone = {
    x: window.innerWidth - 270,
    y: window.innerHeight - 300,
    width: 90,
    height: 260
};

//função de colisão
function checkColision(playerBox, wallBox){
    return playerBox.x < wallBox.x + wallBox.width &&
           playerBox.x + playerBox.width > wallBox.x &&
           playerBox.y < wallBox.y + wallBox.height &&
           playerBox.y + playerBox.height > wallBox.y;
}

//verifica colisão com as paredes da área atual
function checkWallCollision(playerBox){

    //se o player estiver no jato de vento, ele é empurrado para cima
    if(windZoneElement && checkColision(playerBox, windZone)){
        velocityY = -6;
        isGrounded = false;
    }

    if(damageObstacleElement && checkColision(playerBox, damageObstacle)){
        if(damagePopupElement){
            damagePopupElement.style.display = "block";
        }
    }else{
        if(damagePopupElement){
            damagePopupElement.style.display = "none";
        }
    }

    if(area4LeftElement && checkColision(playerBox, area4LeftExitArea)){
    localStorage.setItem("spawnPoint", "fromRight");
    window.location.href = "area3.html";
    return false;
    }

    //permite sair pela passagem da área 5 antes de bloquear na parede
    if(area5LeftElement && checkColision(playerBox, area5LeftExitArea)){
        localStorage.setItem("spawnPoint", "fromRight");
        window.location.href = "area3.html";
        return false;
    }

    //permite sair pela passagem da área 2 antes de bloquear na parede
    if(leftExitElement && checkColision(playerBox, leftExitArea)){
        localStorage.setItem("spawnPoint", "fromRight");
        window.location.href = "game.html";
        return false;
    }

    //permite sair pela passagem da área 3 antes de bloquear na parede
    if(area3LeftElement && checkColision(playerBox, area3LeftExitArea)){
        localStorage.setItem("spawnPoint", "fromRight");
        window.location.href = "game.html";
        return false;
    }

    if(wallLeftElement && walls.some(wall => checkColision(playerBox, wall))){
        return true;
    }

    if(leftExitElement && area2Walls.some(wall => checkColision(playerBox, wall))){
        return true;
    }

    if(area3LeftElement && area3Walls.some(wall => checkColision(playerBox, wall))){
        return true;
    }

    if(area3RightElement && area3RightWalls.some(wall => checkColision(playerBox, wall))){
        return true;
    }

    if(area4LeftElement && area4Walls.some(wall => checkColision(playerBox, wall))){
        return true;
    }

    if(area5LeftElement && area5Walls.some(wall => checkColision(playerBox, wall))){
        return true;
    }

    if(floorElement && checkColision(playerBox, floor)){
        return true;
    }

    if(floorLeftElement && checkColision(playerBox, floorLeft)){
    return true;
    }

    if(floorRightElement && checkColision(playerBox, floorRight)){
        return true;
    }

    //colisão com plataformas suspensas
    if(platforms.some(platform => platform.element && checkColision(playerBox, platform))){
        return true;
    }

    if(fallingPlatformElement && checkColision(playerBox, fallingPlatform)){
    return true;
    }

    if(area4LeftElement && area4Walls.some(wall => checkColision(playerBox, wall))){
    return true;
    }

    if(area5LeftElement && area5Walls.some(wall => checkColision(playerBox, wall))){
    return true;
    }

    return false;
}

//quando uma tecla é pressionada
document.addEventListener("keydown", function(event){

    //ativa a tecla pressionada
    if(event.key in keys){
        keys[event.key] = true;
    }

    if(event.key === "w" && isGrounded && !jumpPressed){
        velocityY = jumpForce;
        isGrounded = false;
        jumpPressed = true;
    }

    //abre o menu de pausa ao apertar ESC
    if(event.key === "Escape"){
        localStorage.setItem("lastArea", window.location.pathname);
        window.location.href = "pause.html";
    }

    //entra na porta se o player estiver nela
    if(event.key === "Enter" && canEnterDoor){
        window.location.href = "area2.html";
    }
});

//quando a tecla é solta
document.addEventListener("keyup", function(event){

    //desativa a tecla
    if(event.key in keys){
        keys[event.key] = false;
    }

    //libera o pulo de novo quando solta W
    if(event.key === "w"){
        jumpPressed = false;
    }
});

//loop principal do jogo
function gameLoop(){

    //movimentação horizontal
    if(keys.d){
        x += speed;

        const playerBox = {
            x: x,
            y: y,
            width: hitbox.width,
            height: hitbox.height
        };

        if(checkWallCollision(playerBox)){
            x -= speed;
        }
    }

    if(keys.a){
        x -= speed;

        const playerBox = {
            x: x,
            y: y,
            width: hitbox.width,
            height: hitbox.height
        };

        if(checkWallCollision(playerBox)){
            x += speed;
        }
    }

    //movimentação vertical
    velocityY += gravity;
    y += velocityY;

    const verticalPlayerBox = {
        x: x,
        y: y,
        width: hitbox.width,
        height: hitbox.height
    };

    if(fallingPlatformElement){

    fallingPlatform.y = fallingPlatformY;

    if(checkColision(verticalPlayerBox, fallingPlatform) && !fallingPlatformTimerStarted){
        fallingPlatformTimerStarted = true;

        setTimeout(function(){
            fallingPlatformFalling = true;
        }, 700);
    }

    if(fallingPlatformFalling){
        fallingPlatformY += 4;
        fallingPlatformElement.style.top = fallingPlatformY + "px";
        }

        if(fallingPlatformY > window.innerHeight){
        fallingPlatformElement.style.display = "none";
        fallingPlatformFalling = false;
        }
    }

    if(checkWallCollision(verticalPlayerBox)){
        y -= velocityY;

        if(velocityY > 0){
            isGrounded = true;
        }

        velocityY = 0;
    }else{
        isGrounded = false;
    }

    /*if(keys.s){
        y += speed;

        const playerBox = {
            x: x,
            y: y,
            width: hitbox.width,
            height: hitbox.height
        };

        if(checkWallCollision(playerBox)){
            y -= speed;
        }
    }*/

    /*if(keys.w){
        y -= speed;

        const playerBox = {
            x: x,
            y: y,
            width: hitbox.width,
            height: hitbox.height
        };

        if(checkWallCollision(playerBox)){
            y += speed;
        }
    }*/

    //impede o player de sair pela esquerda
    if(x < 0){
        x = 0;
    }

    //impede o player de sair por cima
    if(y < 0){
        y = 0;
    }

    //impede o player de sair pela direita
    if(x > window.innerWidth - hitbox.width){
        x = window.innerWidth - hitbox.width;
    }

    //impede o player de sair por baixo
    if(y > window.innerHeight - hitbox.height){
        y = window.innerHeight - hitbox.height;
        velocityY = 0;
        isGrounded = true;
    }

    //cria a hitbox atual do player
    const playerBox = {
        x: x,
        y: y,
        width: hitbox.width,
        height: hitbox.height
    };

    //ativa interação com a porta somente se a porta existir na página
    if(doorElement && checkColision(playerBox, door)){
        canEnterDoor = true;

        if(popup){
            popup.style.display = "block";
        }

    }else{
        canEnterDoor = false;

        if(popup){
            popup.style.display = "none";
        }
    }

    //se encostar na saída lateral direita, vai para a área 3
    if(exitAreaElement && checkColision(playerBox, exitArea)){
        localStorage.setItem("spawnPoint", "fromLeft");
        window.location.href = "area3.html";
    }

    //se encostar na saída direita superior da área 3, vai para area4
    if(area3RightElement && checkColision(playerBox, area3RightTopExitArea)){
        localStorage.setItem("spawnPoint", "fromLeft");
        window.location.href = "area4.html";
    }

    //se encostar na saída direita inferior da área 3, vai para area5
    if(area3RightElement && checkColision(playerBox, area3RightBottomExitArea)){
        localStorage.setItem("spawnPoint", "fromLeft");
        window.location.href = "area5.html";
    }

    //se cair no buraco da área 5, vai para area6
    if(floorLeftElement && checkColision(playerBox, downExitArea)){
        localStorage.setItem("spawnPoint", "fromTop");
        window.location.href = "area6.html";
    }

    if(memoryFragmentElement && checkColision(playerBox, memoryFragment)){
        memoryFragmentElement.style.display = "none";

        if(memoryPopupElement){
            memoryPopupElement.style.display = "block";
            memoryPopupElement.style.animation = "none";

            setTimeout(function(){

                memoryPopupElement.style.animation =
                    "popupMemory 2s forwards";

            }, 10);

            setTimeout(function(){

                memoryPopupElement.style.display = "none";

            }, 2000);
        }
    }

    //atualiza a posição do player na tela
    player.style.left = x + "px";
    player.style.top = y + "px";

    //faz o loop rodar infinitamente
    requestAnimationFrame(gameLoop);
}

//inicia o loop do jogo
gameLoop();