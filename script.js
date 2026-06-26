//pega o player do HTML pra conseguir controlar ele no JS
const player = document.getElementById("player");
const popup = document.getElementById("interaction-popup");

const gameArea = document.getElementById("game-area");

const gameWidth = gameArea.offsetWidth;
const gameHeight = gameArea.offsetHeight;

function resizeGame(){
    const availableWidth = document.documentElement.clientWidth;
    const availableHeight = document.documentElement.clientHeight;

    const scale = Math.min(
        availableWidth / gameWidth,
        availableHeight / gameHeight
    ) * 0.96;

    gameArea.style.transform =
        `translate(-50%, -50%) scale(${scale})`;
}

const doorElement = document.getElementById("door");
const wallLeftElement = document.getElementById("wall-left");
const exitAreaElement = document.getElementById("wall-right-top");
const leftExitElement = document.getElementById("area2-wall-left-top");

const area3LeftElement = document.getElementById("area3-wall-left-top");
const area3RightElement = document.getElementById("area3-wall-right-top");

const area4LeftElement = document.getElementById("area4-wall-left-top");
const area4RightElement = document.getElementById("area4-wall-left-bottom");

const area5LeftElement = document.getElementById("area5-wall-left-top");
const area5LeftBottomElement = document.getElementById("area5-wall-left-bottom");
const area5RightElement = document.getElementById("area5-wall-right");

const area6WallLeftElement = document.getElementById("area6-wall-left");
const area6WallRightElement = document.getElementById("area6-wall-right");
const area6CeilingLeftElement = document.getElementById("area6-ceiling-left");
const area6CeilingRightElement = document.getElementById("area6-ceiling-right");
const area6Platform1Element = document.getElementById("area6-platform-1");
const area6Platform2Element = document.getElementById("area6-platform-2");
const area6Platform3Element = document.getElementById("area6-platform-3");
const area6Platform4Element = document.getElementById("area6-platform-4");

//novo sistema de salas
const room2WallTopElement = document.getElementById("room2-wall-left-top");
const room2WallBottomElement = document.getElementById("room2-wall-left-bottom");
const room2WallRightElement = document.getElementById("room2-wall-right");
const area2BlockElement = document.getElementById("area2-block");

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

//teto
const ceiling = {
    x: 0,
    y: -40,
    width: gameWidth,
    height: 40
};

//posição inicial do player (centro da tela)
let x = (gameWidth / 2) - 10;
let y = (gameHeight / 2) - 15;

//velocidade do player
let speed = 3;

//velocidade, gravidade, tamanho do pulo(quanto menor mais alto)
let velocityY = 0;
let gravity = 0.5;
let jumpForce = -20;

//dash
let facingDirection = 1;
let isDashing = false;
let dashTime = 0;
let dashDuration = 10;
let dashSpeed = 50;
let dashCooldown = false;

//desbugar pulo
let isGrounded = false;
let jumpPressed = false;
let coyoteTime = 0;
let coyoteTimeMax = 8;
let lastTime = 0;

let fallingPlatformY = 420;
let fallingPlatformFalling = false;
let fallingPlatformTimerStarted = false;

//sistema de salas novo
let currentRoom = 1;
let nextSpawn = "default";
let spawnFromRight = false;

//o que cada sala tem
const rooms = {
    1: {
        spawnX: 80,
        spawnY: gameHeight - 100,
        showDoor: true,
        showBlock: false
    },

    2: {
        spawnX: 80,
        spawnY: gameHeight - 100,
        showDoor: false,
        elements: [
            area2BlockElement,
            room2WallTopElement,
            room2WallBottomElement,
            room2WallRightElement
        ]
    },

    3: {
        spawnX: 80,
        spawnY: gameHeight - 100,
        showDoor: false,
        showBlock: false,
        elements: [
            platform1Element,
            platform2Element,
            platform3Element,
            platform4Element,
            area3LeftElement,
            document.getElementById("area3-wall-left-bottom"),
            area3RightElement,
            document.getElementById("area3-wall-right-middle"),
            document.getElementById("area3-wall-right-bottom")
        ]
    },

    4: {
        spawnX: 80,
        spawnY: gameHeight - 100,
        showDoor: false,
        showBlock: false,
        elements: [
            windZoneElement,
            fallingPlatformElement,
            area4LeftElement,
            area4RightElement
        ]
    },

    5: {
        spawnX: 80,
        spawnY: gameHeight - 100,
        showDoor: false,
        showBlock: false,
            elements: [
            floorLeftElement,
            floorRightElement,
            area5LeftElement,
            area5LeftBottomElement,
            area5RightElement
        ]
    },

    6: {
        spawnX: (gameWidth / 2) - 10,
        spawnY: 120,
        showDoor: false,
        showBlock: false,
        elements: [
            memoryFragmentElement,
            memoryPopupElement,
            damageObstacleElement,
            damagePopupElement,
            area6WallLeftElement,
            area6WallRightElement,
            area6CeilingLeftElement,
            area6CeilingRightElement,
            area6Platform1Element,
            area6Platform2Element,
            area6Platform3Element,
            area6Platform4Element
        ]
    }
};

//define onde o player aparece ao trocar de área
const spawnPoint = localStorage.getItem("spawnPoint");

if(spawnPoint === "fromLeft"){
    x = 80;
    y = gameHeight - 100;
    localStorage.removeItem("spawnPoint");
}

if(spawnPoint === "fromRight"){
    x = gameWidth - 120;
    y = gameHeight - 100;
    localStorage.removeItem("spawnPoint");
}

if(spawnPoint === "fromTop"){
    x = (gameWidth / 2) - 10;
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
        height: gameHeight
    },
    {
        x: gameWidth - 40,
        y: 0,
        width: 40,
        height: 250
    },
    {
        x: gameWidth - 40,
        y: gameHeight - 250,
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
        y: gameHeight - 250,
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
        y: gameHeight - 250,
        width: 40,
        height: 250
    }
];

//PAREDES DIREITAS DA SALA 3
const area3RightWallConfig = {
    width: 40,

    topOpeningStart: 0.32,
    topOpeningHeight: 0.11,

    bottomOpeningStart: 0.58,
    bottomOpeningHeight: 0.10
};

//hitbox das paredes da direita da área 3
let area3RightWalls = [];

function updateArea3RightWalls(){

    const width = area3RightWallConfig.width;

    const topWall = {
        x: gameWidth - width,
        y: 0,
        width: width,
        height: gameHeight * area3RightWallConfig.topOpeningStart
    };

    const middleWall = {
        x: gameWidth - width,
        y: gameHeight * (
            area3RightWallConfig.topOpeningStart +
            area3RightWallConfig.topOpeningHeight
        ),
        width: width,
        height: gameHeight * (
            area3RightWallConfig.bottomOpeningStart -
            area3RightWallConfig.topOpeningStart -
            area3RightWallConfig.topOpeningHeight
        )
    };

    const bottomWall = {
        x: gameWidth - width,
        y: gameHeight * (
            area3RightWallConfig.bottomOpeningStart +
            area3RightWallConfig.bottomOpeningHeight
        ),
        width: width,
        height: gameHeight * (
            1 -
            area3RightWallConfig.bottomOpeningStart -
            area3RightWallConfig.bottomOpeningHeight
        )
    };

    area3RightWalls = [topWall, middleWall, bottomWall];

    const topElement = document.getElementById("area3-wall-right-top");
    const middleElement = document.getElementById("area3-wall-right-middle");
    const bottomElement = document.getElementById("area3-wall-right-bottom");

    topElement.style.height = (topWall.height) + "px";

    middleElement.style.top = (middleWall.y) + "px";
    middleElement.style.height = (middleWall.height) + "px";

    bottomElement.style.top = (bottomWall.y) + "px";
    bottomElement.style.bottom = "auto";
    bottomElement.style.height = (bottomWall.height) + "px";
}
updateArea3RightWalls();

const area4Walls = [
    {
        x: 0,
        y: 0,
        width: 40,
        height: 250
    },
    {
        x: 0,
        y: gameHeight - 250,
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
        y: gameHeight - 250,
        width: 40,
        height: 250
    }
];

const area6Walls = [
    {
        x: 0,
        y: 0,
        width: 40,
        height: gameHeight
    },
    {
        x: gameWidth - 40,
        y: 0,
        width: 40,
        height: gameHeight
    }
];

const area4LeftExitArea = {
    x: 0,
    y: 250,
    width: 40,
    height: gameHeight - 500
};

const area5RightWall = {
    x: gameWidth - 40,
    y: 0,
    width: 40,
    height: gameHeight
};

//plataformas area 6
const area6Platforms = [
    {
        element: area6Platform1Element,
        x: gameWidth * 0.15,
        y: gameHeight * 0.75,
        width: gameWidth * 0.12,
        height: gameHeight * 0.025
    },
    {
        element: area6Platform2Element,
        x: gameWidth * 0.35,
        y: gameHeight * 0.60,
        width: gameWidth * 0.12,
        height: gameHeight * 0.025
    },
    {
        element: area6Platform3Element,
        x: gameWidth * 0.55,
        y: gameHeight * 0.45,
        width: gameWidth * 0.12,
        height: gameHeight * 0.025
    },
    {
        element: area6Platform4Element,
        x: gameWidth * 0.43,
        y: gameHeight * 0.25,
        width: gameWidth * 0.12,
        height: gameHeight * 0.025
    }
];

//teto sala 6
const area6Ceiling = [
    {
        x: 0,
        y: 0,
        width: gameWidth * 0.45,
        height: 40
    },
    {
        x: gameWidth * 0.55,
        y: 0,
        width: gameWidth * 0.45,
        height: 40
    }
];

const area6TopExitArea = {
    x: gameWidth * 0.45,
    y: 0,
    width: gameWidth * 0.10,
    height: 40
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
    width: 60,
    height: 90,
    x: (gameWidth / 2) - 30,
    y: gameHeight - 40 - 90
};

//saída lateral direita da primeira área
const exitArea = {
    x: gameWidth - 40,
    y: 250,
    width: 40,
    height: gameHeight - 500
};

//saída lateral esquerda da área 2
const leftExitArea = {
    x: 0,
    y: 250,
    width: 40,
    height: gameHeight - 500
};

//saída lateral esquerda da área 3
const area3LeftExitArea = {
    x: 0,
    y: 250,
    width: 40,
    height: gameHeight - 500
};

//saída direita superior da área 3
const area3RightTopExitArea = {
    x: gameWidth - 40,
    y: 160,
    width: 40,
    height: 140
};

//saída direita inferior da área 3
const area3RightBottomExitArea = {
    x: gameWidth - 40,
    y: 480,
    width: 40,
    height: gameHeight - 600
};

const area5LeftExitArea = {
    x: 0,
    y: 250,
    width: 40,
    height: gameHeight - 500
};

//saída para baixo da área 5
const downExitArea = {
    x: gameWidth * 0.45,
    y: gameHeight,
    width: gameWidth * 0.10,
    height: 80
};

//hitbox do chão
const floor = {
    x: 0,
    y: gameHeight - 40,
    width: gameWidth,
    height: 40
};

const floorLeft = {
    x: 0,
    y: gameHeight - 40,
    width: gameWidth * 0.45,
    height: 40
};

const floorRight = {
    x: gameWidth * 0.55,
    y: gameHeight - 40,
    width: gameWidth * 0.45,
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
    x: gameWidth - 270,
    y: gameHeight - 300,
    width: 90,
    height: 260
};

const roomTransitions = [
    {
        room: 4,
        area: area4LeftExitArea,
        requiredElement: area4LeftElement,
        toRoom: 3,
        apply: function(){
            spawnFromRight = true;
        }
    },
    {
        room: 5,
        area: area5LeftExitArea,
        requiredElement: area5LeftElement,
        toRoom: 3,
        apply: function(){
            spawnFromRight = true;
        }
    }
];

//configurações de saída de cada sala
const roomExitRules = [
    {
        room: 1,
        condition: playerBox => playerBox.x >= gameWidth - hitbox.width,
        toRoom: 3
    },
    {
    room: 3,
        condition: playerBox =>
            playerBox.x >= gameWidth - hitbox.width &&
            playerBox.y + playerBox.height > gameHeight * area3RightWallConfig.topOpeningStart &&
            playerBox.y < gameHeight * (
                area3RightWallConfig.topOpeningStart +
                area3RightWallConfig.topOpeningHeight
            ),
        toRoom: 4
    },
    {
    room: 3,
        condition: playerBox =>
            playerBox.x >= gameWidth - hitbox.width &&
            playerBox.y + playerBox.height > gameHeight * area3RightWallConfig.bottomOpeningStart &&
            playerBox.y < gameHeight * (
                area3RightWallConfig.bottomOpeningStart +
                area3RightWallConfig.bottomOpeningHeight
            ),
        toRoom: 5
    },
    {
        room: 5,
        condition: playerBox => 
            playerBox.x + playerBox.width > downExitArea.x &&
            playerBox.x < downExitArea.x + downExitArea.width &&
            playerBox.y >= gameHeight - hitbox.height,
        toRoom: 6
    },
    {
        room: 2,
        condition: playerBox => playerBox.x < 0 && playerBox.y > 250 && playerBox.y < gameHeight - 250,
        toRoom: 1,
        apply: function(){
            nextSpawn = "door";
        }
    },
    {
        room: 3,
        condition: playerBox => playerBox.x < 0 && playerBox.y > 250 && playerBox.y < gameHeight - 250,
        toRoom: 1
    },
    {
        room: 4,
        condition: playerBox => playerBox.x < 0 && playerBox.y > 250 && playerBox.y < gameHeight - 250,
        toRoom: 3
    },
    {
        room: 5,
        condition: playerBox =>
            playerBox.x < 0 &&
            playerBox.y > 250 &&
            playerBox.y < gameHeight - 250,
        toRoom: 3,
        apply: function(){
            spawnFromRight = true;
        }
    },
    {
        room: 6,
        condition: playerBox =>
            playerBox.x + playerBox.width > area6TopExitArea.x &&
            playerBox.x < area6TopExitArea.x + area6TopExitArea.width &&
            playerBox.y <= 0,
        toRoom: 5,
        apply: function(){
            nextSpawn = "fromHole";
        }
    },
];

//colisões de cada sala
const collisionConfig = {
    1: [
        { boxes: [ceiling] },
        { boxes: walls, requiredElement: wallLeftElement },
        { boxes: [floor], requiredElement: floorElement, active: () => currentRoom !== 5 },
        { boxes: [floorLeft], requiredElement: floorLeftElement },
        { boxes: [floorRight], requiredElement: floorRightElement }
    ],
    2: [
        { boxes: [ceiling] },
        { boxes: area2Walls },
        { boxes: [floor], requiredElement: floorElement },
        { custom: playerBox => playerBox.x + playerBox.width > gameWidth - 40 }
    ],
    3: [
        { boxes: [ceiling] },
        { boxes: area3Walls, requiredElement: area3LeftElement },
        { boxes: area3RightWalls, requiredElement: area3RightElement },
        { boxes: [floor], requiredElement: floorElement, active: () => currentRoom !== 5 },
        { boxes: [floorLeft], requiredElement: floorLeftElement },
        { boxes: [floorRight], requiredElement: floorRightElement },
        { boxes: platforms, requiredElement: platform1Element }
    ],
    4: [
        { boxes: [ceiling] },
        { boxes: area4Walls, requiredElement: area4LeftElement },
        { boxes: [floor], requiredElement: floorElement, active: () => currentRoom !== 5 },
        { boxes: [floorLeft], requiredElement: floorLeftElement },
        { boxes: [floorRight], requiredElement: floorRightElement },
        { boxes: [fallingPlatform], requiredElement: fallingPlatformElement }
    ],
    5: [
        { boxes: [ceiling] },
        { boxes: area5Walls, requiredElement: area5LeftElement },
        { boxes: [area5RightWall], requiredElement: area5RightElement },
        { boxes: [floorLeft], requiredElement: floorLeftElement },
        { boxes: [floorRight], requiredElement: floorRightElement }
    ],
    6: [
        { boxes: area6Walls },
        { boxes: area6Ceiling, requiredElement: area6CeilingLeftElement },
        { boxes: [floor], requiredElement: floorElement, active: () => currentRoom !== 5 },
        { boxes: area6Platforms, requiredElement: area6Platform1Element }
    ]
};

function createPlayerBox(){
    return {
        x: x,
        y: y,
        width: hitbox.width,
        height: hitbox.height
    };
}

//função de colisão
function checkColision(playerBox, wallBox){
    return playerBox.x < wallBox.x + wallBox.width &&
           playerBox.x + playerBox.width > wallBox.x &&
           playerBox.y < wallBox.y + wallBox.height &&
           playerBox.y + playerBox.height > wallBox.y;
}

//verifica colisão com as paredes da área atual
function checkRoomTransition(playerBox){
    const transition = roomTransitions.find(item =>
        item.room === currentRoom &&
        item.requiredElement &&
        checkColision(playerBox, item.area)
    );

    if(!transition){
        return false;
    }

    currentRoom = transition.toRoom;

    if(typeof transition.apply === "function"){
        transition.apply();
    }

    loadRoom();
    return true;
}

function getElementBox(element){
    const rect = element.getBoundingClientRect();

    return {
        x: rect.left,
        y: rect.top,
        width: rect.width,
        height: rect.height
    };
}

function checkRoomExit(playerBox){
    const exitRule = roomExitRules.find(item =>
        item.room === currentRoom &&
        item.condition(playerBox)
    );

    if(!exitRule){
        return false;
    }

    currentRoom = exitRule.toRoom;

    if(typeof exitRule.apply === "function"){
        exitRule.apply();
    }

    loadRoom();
    return true;
}

function checkWallCollision(playerBox){

    if(currentRoom === 6 && damageObstacleElement && checkColision(playerBox, damageObstacle)){
        if(damagePopupElement){
            damagePopupElement.style.display = "block";
        }
    } else if(damagePopupElement){
        damagePopupElement.style.display = "none";
    }

    const configs = collisionConfig[currentRoom] || [];

    for(const config of configs){
        if(config.requiredElement === undefined || config.requiredElement){
            if(config.active && !config.active()){
                continue;
            }

            if(config.custom){
                if(config.custom(playerBox)){
                    return true;
                }
            } else if(config.boxes && config.boxes.some(box => checkColision(playerBox, box))){
                return true;
            }
        }
    }

    return false;
}

//quando uma tecla é pressionada
document.addEventListener("keydown", function(event){

    if(event.key === "Shift" && !isDashing && !dashCooldown){
    isDashing = true;
    dashTime = dashDuration;
    dashCooldown = true;
    }

    //ativa a tecla pressionada
    if(event.key in keys){
        keys[event.key] = true;
    }

    if(event.key === "w" && isGrounded && !jumpPressed){
        velocityY = jumpForce;
        isGrounded = false;
        jumpPressed = true;
        coyoteTime = 0;
    }

    //abre o menu de pausa ao apertar ESC
    if(event.key === "Escape"){
        localStorage.setItem("lastArea", window.location.pathname);
        window.location.href = "pause.html";
    }

    //entra na porta se o player estiver nela
    if(event.key === "Enter" && canEnterDoor){
        currentRoom = 2;

        loadRoom();
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

function getCollidingBox(playerBox){
    const configs = collisionConfig[currentRoom] || [];

    for(const config of configs){
        if(config.requiredElement === undefined || config.requiredElement){
            if(config.active && !config.active()){
                continue;
            }

            if(config.boxes){
                const box = config.boxes.find(box => checkColision(playerBox, box));

                if(box){
                    return box;
                }
            }
        }
    }

    return null;
}

function applyRoomEffects(){
    const playerBox = createPlayerBox();

    if(currentRoom === 4 && windZoneElement && checkColision(playerBox, windZone)){
        velocityY = -6;
        isGrounded = false;
    }
}

//loop principal do jogo
function gameLoop(currentTime){

    if(!lastTime){
        lastTime = currentTime;
    }

    let deltaTime = (currentTime - lastTime) / 16.67;
    lastTime = currentTime;

    if(deltaTime > 2){
        deltaTime = 2;
    }

    if(isDashing){
        x += facingDirection * dashSpeed * deltaTime;

        const dashPlayerBox = {
            x: x,
            y: y,
            width: hitbox.width,
            height: hitbox.height
        };

        if(checkWallCollision(dashPlayerBox)){
            x -= facingDirection * dashSpeed * deltaTime;
            isDashing = false;
            dashTime = 0;

            setTimeout(function(){
                dashCooldown = false;
            }, 500);
        }

        dashTime -= deltaTime;

        if(dashTime <= 0){
            isDashing = false;

            setTimeout(function(){
                dashCooldown = false;
            }, 500);
        }
    }

    //movimentação horizontal
    if(keys.d){
        x += speed * deltaTime;

        facingDirection = 1;

        const playerBox = {
            x: x,
            y: y,
            width: hitbox.width,
            height: hitbox.height
        };

        if(checkWallCollision(playerBox)){
            x -= speed * deltaTime;
        }
    }

    if(keys.a){
        x -= speed * deltaTime;

        facingDirection = -1;

        const playerBox = {
            x: x,
            y: y,
            width: hitbox.width,
            height: hitbox.height
        };

        if(checkWallCollision(playerBox)){
            x += speed * deltaTime;
        }
    }

    applyRoomEffects();

    //movimentação vertical
    velocityY += gravity * deltaTime;
    y += velocityY * deltaTime;

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
        fallingPlatformY += 4 * deltaTime;
        fallingPlatformElement.style.top = fallingPlatformY + "px";
        }

        if(fallingPlatformY > gameHeight){
        fallingPlatformElement.style.display = "none";
        fallingPlatformFalling = false;
        }
    }

    const collidedBox = getCollidingBox(verticalPlayerBox);

    if(collidedBox){
        if(velocityY > 0){
            y = collidedBox.y - hitbox.height;
            isGrounded = true;
            coyoteTime = coyoteTimeMax;
        }else if(velocityY < 0){
            y = collidedBox.y + collidedBox.height;
        }

        velocityY = 0;
    }else{
        isGrounded = false;

        if(coyoteTime > 0){
            coyoteTime--;
        }
    }

    //impede o player de sair pela esquerda
    if(x < 0){
        const playerBox = createPlayerBox();

        if(checkRoomExit(playerBox)){
            player.style.left = x + "px";
            player.style.top = y + "px";
            requestAnimationFrame(gameLoop);
            return;
        }

        x = 0;
    }

    //impede o player de sair por cima
    const topLimit = 120;

    if(y < topLimit){
        y = topLimit;
        velocityY = 0;
    }

    //impede o player de sair pela direita
    if(x > gameWidth - hitbox.width){
        x = gameWidth - hitbox.width;
    }

    //impede o player de sair por baixo
    if(y > gameHeight - hitbox.height){
        y = gameHeight - hitbox.height;
        velocityY = 0;
        isGrounded = true; 92596
    }

    //cria a hitbox atual do player
    const playerBox = createPlayerBox();

    if(checkRoomExit(playerBox)){
        player.style.left = x + "px";
        player.style.top = y + "px";
        requestAnimationFrame(gameLoop);
        return;
    }

    //ativa interação com a porta somente se a porta existir na página
    if(currentRoom === 1 && doorElement && checkColision(playerBox, door)){
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

    //se cair no buraco da área 5, vai para area6
    if(currentRoom === 5 && checkColision(playerBox, downExitArea)){
        currentRoom = 6;
        loadRoom();
    }

    if(
        currentRoom === 6 &&
        damageObstacleElement &&
        checkColision(playerBox, damageObstacle)
    ){
        damagePopupElement.style.display = "block";
    }else{
        damagePopupElement.style.display = "none";
    }

    //fragmento de memória(popup)
    if(currentRoom === 6 && memoryFragmentElement && checkColision(playerBox, memoryFragment)){
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

//função pras salas ficarem no js inves de ter varios html
function loadRoom(){

    const room = rooms[currentRoom];

    if(currentRoom === 3){
        updateArea3RightWalls();
    }

    if(currentRoom === 1 && nextSpawn === "door"){

        x = (gameWidth / 2) - 10;
        y = gameHeight - 40 - hitbox.height;

        nextSpawn = "default";

    }else if(currentRoom === 3 && spawnFromRight){

        x = gameWidth - 120;
        y = gameHeight * 0.65;

        spawnFromRight = false;

    }
    else if(currentRoom === 5 && nextSpawn === "fromHole"){

        x = (gameWidth * 0.50) - 10;
        y = gameHeight - 120;

        nextSpawn = "default";
    }else{

        x = room.spawnX;
        y = room.spawnY;
    }

    if(doorElement){
        doorElement.style.display =
            room.showDoor ? "block" : "none";
    }

    if(floorElement){
        floorElement.style.display =
            currentRoom === 5 ? "none" : "block";
    }

    if(area2BlockElement){
        area2BlockElement.style.display =
            room.showBlock ? "block" : "none";
    }

    if(!room.showDoor && popup){
        popup.style.display = "none";
    }

    if(room2WallTopElement){
        room2WallTopElement.style.display =
            currentRoom === 2 ? "block" : "none";
    }

    if(room2WallBottomElement){
        room2WallBottomElement.style.display =
            currentRoom === 2 ? "block" : "none";
    }

    if(room2WallRightElement){
        room2WallRightElement.style.display =
            currentRoom === 2 ? "block" : "none";
    }

    if(wallLeftElement){
        wallLeftElement.style.display =
            currentRoom === 1 ? "block" : "none";
    }

    Object.values(rooms).forEach(function(roomData){
        if(roomData.elements){
            roomData.elements.forEach(function(element){
                if(element){
                    element.style.display = "none";
                }
            });
        }
    });

    if(room.elements){
        room.elements.forEach(function(element){
            if(element){
                element.style.display = "block";
            }
        });
    }

    if(currentRoom === 4 && fallingPlatformElement){
        fallingPlatformY = 420;
        fallingPlatform.y = fallingPlatformY;
        fallingPlatformFalling = false;
        fallingPlatformTimerStarted = false;

        fallingPlatformElement.style.top = fallingPlatformY + "px";
        fallingPlatformElement.style.display = "block";
    }
}

//inicia o loop do jogo
loadRoom();
requestAnimationFrame(gameLoop);