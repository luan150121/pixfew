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

        x = downExitArea.x - hitbox.width - 20;
        y = floor.y - hitbox.height;
        velocityY = 0;
        isGrounded = true;

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
