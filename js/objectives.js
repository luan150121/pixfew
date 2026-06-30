var playerHasMemoryFragment = false;

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
