const roomBounds = {
    left: 0,
    top: 0,
    right: gameWidth,
    bottom: gameHeight
};

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
        { custom: playerBox => playerBox.x + playerBox.width > gameWidth - 40 }
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
        { boxes: [floorRight], requiredElement: floorRightElement },
        { boxes: [fallingPlatform], requiredElement: fallingPlatformElement }
    ],
    5: [
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


function getElementBox(element){
    const rect = element.getBoundingClientRect();

    return {
        x: rect.left,
        y: rect.top,
        width: rect.width,
        height: rect.height
    };
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
