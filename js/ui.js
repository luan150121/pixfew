//pega o player do HTML pra conseguir controlar ele no JS
const player = document.getElementById("player");
const popup = document.getElementById("interaction-popup");

const gameArea = document.getElementById("game-area");

const gameWidth = gameArea.offsetWidth;
const gameHeight = gameArea.offsetHeight;

function resizeGame(){
    const availableWidth = document.documentElement.clientWidth;
    const availableHeight = document.documentElement.clientHeight;

    const scaleX = availableWidth / gameWidth;
    const scaleY = availableHeight / gameHeight;

    gameArea.style.transform =
        `translate(-50%, -50%) scale(${scaleX}, ${scaleY})`;
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
