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
        toRoom: 1,
        apply: function(){
            nextSpawn = "fromRight";
        }
    },
    {
        room: 4,
        condition: playerBox => playerBox.x < 0 && playerBox.y > 250 && playerBox.y < gameHeight - 250,
        toRoom: 3,
        apply: function(){
            spawnFromRight = true;
        }
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
