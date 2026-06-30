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
let currentRoom = 1;
let nextSpawn = "default";
let spawnFromRight = false;
let isEmergingFromHole = false;
let emergeTargetY = 0;
let emergeSafeX = 0;
let emergeSpeed = 18;

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
