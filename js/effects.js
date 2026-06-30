let fallingPlatformY = 420;
let fallingPlatformFalling = false;
let fallingPlatformTimerStarted = false;

function applyRoomEffects(){
    const playerBox = createPlayerBox();

    if(currentRoom === 4 && windZoneElement && checkColision(playerBox, windZone)){
        velocityY = -6;
        isGrounded = false;
    }
}

