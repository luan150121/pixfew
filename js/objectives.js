var playerHasMemoryFragment = false;
var memoryFragmentDelivered = false;

const memoryPedestal = {
    x: (gameWidth / 2) - 40,
    y: gameHeight - 120,
    width: 80,
    height: 80
};

function updateMemoryFragmentVisibility(){
    if(playerHasMemoryFragment && memoryFragmentElement){
        memoryFragmentElement.style.display = "none";
    }
}

function collectMemoryFragment(){
    if(playerHasMemoryFragment){
        return;
    }

    playerHasMemoryFragment = true;

    if(memoryFragmentElement){
        memoryFragmentElement.style.display = "none";
    }

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

function checkMemoryPedestalDelivery(playerBox){
    if(memoryFragmentDelivered){
        return;
    }

    if(!playerHasMemoryFragment){
        return;
    }

    if(currentRoom !== 2){
        return;
    }

    if(!memoryPedestalElement){
        return;
    }

    if(!checkColision(playerBox, memoryPedestal)){
        return;
    }

    playerHasMemoryFragment = false;
    memoryFragmentDelivered = true;

    if(memoryUnlockedPopupElement){
        memoryUnlockedPopupElement.style.display = "block";

        setTimeout(function(){
            memoryUnlockedPopupElement.style.display = "none";
        }, 2000);
    }
}
