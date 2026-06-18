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

//posição inicial do player (centro da tela)
let x = (window.innerWidth / 2) - 10;
let y = (window.innerHeight / 2) - 15;

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
        spawnY: window.innerHeight - 100,
        showDoor: true,
        showBlock: false
    },

    2: {
        spawnX: 80,
        spawnY: window.innerHeight - 100,
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
        spawnY: window.innerHeight - 100,
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
        spawnY: window.innerHeight - 100,
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
        spawnY: window.innerHeight - 100,
        showDoor: false,
        showBlock: false,
        elements: [
            floorLeftElement,
            floorRightElement,
            area5LeftElement,
            area5RightElement
        ]
    },

    6: {
        spawnX: (window.innerWidth / 2) - 10,
        spawnY: 120,
        showDoor: false,
        showBlock: false,
        elements: [
            memoryFragmentElement,
            memoryPopupElement,
            damageObstacleElement,
            damagePopupElement
        ]
    }

};

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
        height: window.innerHeight * 0.25
    },
    {
        x: window.innerWidth - 40,
        y: window.innerHeight * 0.40,
        width: 40,
        height: window.innerHeight * 0.20
    },
    {
        x: window.innerWidth - 40,
        y: window.innerHeight * 0.75,
        width: 40,
        height: window.innerHeight * 0.25
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
    width: 60,
    height: 90,
    x: (window.innerWidth / 2) - 30,
    y: window.innerHeight - 40 - 90
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
        condition: playerBox => playerBox.x >= window.innerWidth - hitbox.width,
        toRoom: 3
    },
    {
        room: 3,
        condition: playerBox =>
            playerBox.x >= window.innerWidth - hitbox.width &&
            playerBox.y >= 160 &&
            playerBox.y <= 300,
        toRoom: 4
    },
    {
        room: 3,
        condition: playerBox =>
            playerBox.x >= window.innerWidth - hitbox.width &&
            playerBox.y >= 450,
        toRoom: 5
    },
    {
        room: 5,
        condition: playerBox => checkColision(playerBox, downExitArea),
        toRoom: 6
    },
    {
        room: 2,
        condition: playerBox => playerBox.x < 0 && playerBox.y > 250 && playerBox.y < window.innerHeight - 250,
        toRoom: 1,
        apply: function(){
            nextSpawn = "door";
        }
    },
    {
        room: 3,
        condition: playerBox => playerBox.x < 0 && playerBox.y > 250 && playerBox.y < window.innerHeight - 250,
        toRoom: 1
    },
    {
        room: 4,
        condition: playerBox => playerBox.x < 0 && playerBox.y > 250 && playerBox.y < window.innerHeight - 250,
        toRoom: 3
    },
    {
        room: 5,
        condition: playerBox =>
            playerBox.x < 0 &&
            playerBox.y > 250 &&
            playerBox.y < window.innerHeight - 250,
        toRoom: 3,
        apply: function(){
            spawnFromRight = true;
        }
    }
];

//colisões de cada sala
const collisionConfig = {
    1: [
        { boxes: walls, requiredElement: wallLeftElement },
        { boxes: [floor], requiredElement: floorElement, active: () => currentRoom !== 5 },
        { boxes: [floorLeft], requiredElement: floorLeftElement },
        { boxes: [floorRight], requiredElement: floorRightElement }
    ],
    2: [
        { boxes: area2Walls },
        { boxes: [floor], requiredElement: floorElement },
        { custom: playerBox => playerBox.x + playerBox.width > window.innerWidth - 40 }
    ],
    3: [
        { boxes: area3Walls, requiredElement: area3LeftElement },
        { boxes: area3RightWalls, requiredElement: area3RightElement },
        { boxes: [floor], requiredElement: floorElement, active: () => currentRoom !== 5 },
        { boxes: [floorLeft], requiredElement: floorLeftElement },
        { boxes: [floorRight], requiredElement: floorRightElement },
        { boxes: platforms, requiredElement: platform1Element }
    ],
    4: [
        { boxes: area4Walls, requiredElement: area4LeftElement },
        { boxes: [floor], requiredElement: floorElement, active: () => currentRoom !== 5 },
        { boxes: [floorLeft], requiredElement: floorLeftElement },
        { boxes: [floorRight], requiredElement: floorRightElement }
    ],
    5: [
        { boxes: area5Walls, requiredElement: area5LeftElement },
        { boxes: [floorLeft], requiredElement: floorLeftElement },
        { boxes: [floorRight], requiredElement: floorRightElement }
    ],
    6: [
        { boxes: [floor], requiredElement: floorElement, active: () => currentRoom !== 5 },
        { boxes: [floorLeft], requiredElement: floorLeftElement },
        { boxes: [floorRight], requiredElement: floorRightElement }
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

    if(currentRoom === 4 && windZoneElement && checkColision(playerBox, windZone)){
        velocityY = -6;
        isGrounded = false;
    }

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

    if(currentRoom === 4 && fallingPlatformElement && checkColision(playerBox, fallingPlatform)){
        return true;
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

        if(fallingPlatformY > window.innerHeight){
        fallingPlatformElement.style.display = "none";
        fallingPlatformFalling = false;
        }
    }

    if(checkWallCollision(verticalPlayerBox)){
        y -= velocityY * deltaTime;

        if(velocityY > 0){
            isGrounded = true;
            coyoteTime = coyoteTimeMax;
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

    if(currentRoom === 1 && nextSpawn === "door"){

        x = (window.innerWidth / 2) - 10;
        y = window.innerHeight - 40 - hitbox.height;

        nextSpawn = "default";

    }else if(currentRoom === 3 && spawnFromRight){

        x = window.innerWidth - 120;
        y = window.innerHeight * 0.65;

        spawnFromRight = false;

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

}

//inicia o loop do jogo
loadRoom();
requestAnimationFrame(gameLoop);