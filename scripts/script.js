{
    let restartButtonContainer = document.getElementById("restartButtonContainer");
    let showTurnContainer = document.getElementById("showTurnContainer");
    restartButtonContainer.children[1].addEventListener("click",function(){flowControl.promptAskForName();});
    restartButtonContainer.children[0].addEventListener("click",function(){window.location.reload();});
    document.getElementById("crossClose").addEventListener("click",function(){
      document.getElementById("bg-blackie").style.visibility = "hidden";
    });
    
    const flowControl = (() => {
        let arrayPlayers = [];
        let counter =0 ;
        let turnMarkToPaint = 0;
        let playerTurn;
        const addPlayerToArray = (player) => arrayPlayers.push(player); 
        const getArrayPlayers = () => console.log(arrayPlayers);
        const checkForThreeOrTie = () => {
            if(counter == 9){
                alert("Tie! End of game");
            }else{
                checkForThreeHorizontal();
                checkForThreeVertical();
                checkForThreeDiagonal();
            }
        };
        const checkForThreeHorizontal = () => {
            let gameboardArray = gameboard.getGameboardArray();
            if((gameboardArray[0][0] == "O" | gameboardArray[0][0] == "X") & gameboardArray[0][0] == gameboardArray[0][1] & gameboardArray[0][0]  == gameboardArray[0][2]){
                disableButtonsFromTable();
                alert(playerTurn + " has won the game! Congratulations!");
            }
            if((gameboardArray[1][0] == "O" | gameboardArray[1][0] == "X") & gameboardArray[1][0] == gameboardArray[1][1] & gameboardArray[1][0]  == gameboardArray[1][2]){
                disableButtonsFromTable();
                alert(playerTurn + " has won the game! Congratulations!");
            }
            if((gameboardArray[2][0] == "O" | gameboardArray[2][0] == "X") & gameboardArray[2][0] == gameboardArray[2][1] & gameboardArray[2][0]  == gameboardArray[2][2]){
                disableButtonsFromTable();
                alert(playerTurn + " has won the game! Congratulations!");
            }
        }
        const checkForThreeVertical = () =>{
            let gameboardArray = gameboard.getGameboardArray();
            if((gameboardArray[0][0] == "O" | gameboardArray[0][0] == "X") & gameboardArray[0][0] == gameboardArray[1][0] & gameboardArray[0][0]  == gameboardArray[2][0]){
                disableButtonsFromTable();
                alert(playerTurn + " has won the game! Congratulations!");
            }
            if((gameboardArray[0][1] == "O" | gameboardArray[0][1] == "X") & gameboardArray[0][1] == gameboardArray[1][1] & gameboardArray[0][1]  == gameboardArray[2][1]){
                disableButtonsFromTable();
                alert(playerTurn + " has won the game! Congratulations!");
            }
            if((gameboardArray[0][2] == "O" | gameboardArray[0][2] == "X") & gameboardArray[0][2] == gameboardArray[1][2] & gameboardArray[0][2]  == gameboardArray[2][2]){
                disableButtonsFromTable();
                alert(playerTurn + " has won the game! Congratulations!");
            }
        }
        const checkForThreeDiagonal = () =>{
            let gameboardArray = gameboard.getGameboardArray();
            if((gameboardArray[0][0] == "O" | gameboardArray[0][0] == "X") & gameboardArray[0][0] == gameboardArray[1][1] & gameboardArray[0][0]  == gameboardArray[2][2]){
                disableButtonsFromTable();
                alert(playerTurn + " has won the game! Congratulations!");
            }
            if((gameboardArray[0][2] == "O" | gameboardArray[0][2] == "X") & gameboardArray[0][2] == gameboardArray[1][1] & gameboardArray[0][2]  == gameboardArray[2][0]){
                disableButtonsFromTable();
                alert(playerTurn + " has won the game! Congratulations!");
            }
        }
        const changeTurn = () => {
            switch(turnMarkToPaint){
                case 0:
                    playerTurn = arrayPlayers[0].name;
                    turnMarkToPaint++;
                    break;
                case 1:
                    playerTurn = arrayPlayers[1].name;
                    turnMarkToPaint--;
                    break;
            }
            counter++;
        }
        const promptAskForName = () => {
            document.getElementById("bg-blackie").style.visibility = "visible";
            document.getElementById("okLetsGo").addEventListener("click",function(){
                let inputPLayer1 = document.getElementById("inputPlayerOne").value;
                let inputPLayer2 = document.getElementById("inputPLayerTwo").value;
                if(inputPLayer1 != '' & inputPLayer2 != '')
                {
                    document.getElementById("containerDeGameboard").style.visibility = "visible";
                    startGame(inputPLayer1, inputPLayer2);
                   removeElement("bg-blackie");
                }
            });
        }
        const markToPaint = () => {return arrayPlayers[turnMarkToPaint].mark};
        return {playerTurn,addPlayerToArray, getArrayPlayers,changeTurn, markToPaint, checkForThreeOrTie,promptAskForName}
    })();

    const player = (name, mark) => {
        return{name, mark}
    }
    function startGame(inputPLayer1, inputPLayer2){
        const player1 = player(inputPLayer1, "X");
        const player2 = player(inputPLayer2, "O");
        flowControl.playerTurn = inputPLayer1;
        flowControl.addPlayerToArray(player1);
        flowControl.addPlayerToArray(player2);
        restartButtonContainer.children[1].disabled="true";
    }
    function disableButtonsFromTable(){
        let arrayChildrenTable = document.getElementById("gameboard").children;
        for(let x = 0;x < arrayChildrenTable.length;x++){
            arrayChildrenTable[x].style.pointerEvents = "none";
        }
    }
    function removeElement(id) {
        var elem = document.getElementById(id);
        return elem.parentNode.removeChild(elem);
    }

    const gameboard = (() => {
        let gameboardArray = [['','',''],['','',''],['','','']];
        let idNumber = 0;
        let gameboardInHtml = document.getElementById("gameboard");
        const updateGameboardArray = (idBox) => {
            document.getElementById(idBox).innerHTML = flowControl.markToPaint();
            let numberBox = parseInt(idBox.charAt(idBox.length-1));
            switch(numberBox){
                case 0:
                case 1:
                case 2:
                    gameboardArray[0][numberBox] = flowControl.markToPaint();
                    break;
                case 3:
                case 4:
                case 5:
                    gameboardArray[1][numberBox-3] = flowControl.markToPaint();
                    break;
                case 6:
                case 7:
                case 8:
                    gameboardArray[2][numberBox-6] = flowControl.markToPaint();
                    break;
            }
            document.getElementById(idBox).style.pointerEvents = 'none';
        }
        const lockTable = ()=> function(){
            gameboardInHtml.style.pointerEvents = "none";
            console.log("Bloqueado");
            console.log(gameboardInHtml.children);
        }
        const createBoxesForTicTacToe = () => {
            for(let x = 0;x < 9;x++)
            {
                let box = document.createElement("div");
                box.classList.add("box");
                box.id = "box"+idNumber;
                idNumber++;
                gameboardInHtml.appendChild(box);
                box.onclick = function(){updateGameboardArray (box.id);flowControl.changeTurn();flowControl.checkForThreeOrTie();}
            }
        }
        const getGameboardArray  = () => {return gameboardArray};
        return{ updateGameboardArray, createBoxesForTicTacToe, getGameboardArray, lockTable}
    })();
    gameboard.createBoxesForTicTacToe();
}

