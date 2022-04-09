const player = (mark) => {
    return { mark };
}
const player1 = player("X")
const player2 = player("O")

const gameGrid = (() => {
    const grid = []
    for (let i = 0; i < 9; i++) {
        const cell = ""
        grid.push(cell);
    }
    function display() {
        for (let i = 0; i < grid.length; i++) {
            let x = document.createElement("button");
            x.setAttribute("type", "button");
            x.setAttribute("class", "cells");
            x.setAttribute("data-cell", i)
            document.querySelector(".board").appendChild(x)
        }
    }
    function newGrid() {
        document.querySelector(".board").addEventListener("click", gameProgress.gameOrder)
        document.querySelector(".winnerMsg").innerHTML = ""
        document.querySelectorAll(".cells").forEach(function (cell) {
            cell.innerHTML = "";
        })
        for (let i = 0; i < grid.length; i++) {
            grid[i] = ""
        }
    }
    return { grid, display, newGrid };
})();

const gameProgress = (() => {
    let x = gameGrid.grid;
    let currentPlayer = player1;
    let nextPlayer = player2;
    let win = false;
    document.querySelector(".board").addEventListener("click", gameOrder)
    function gameOrder(e) {
        if (e.target.innerHTML === "") {
            e.target.innerHTML = currentPlayer.mark
            gameGrid.grid[e.target.getAttribute('data-cell')] = currentPlayer.mark
            document.querySelector(".winnerMsg").innerHTML = "Player " + nextPlayer.mark + " turn"
            gameWinner();
            if (currentPlayer == player1) {
                currentPlayer = nextPlayer;
                nextPlayer = player1;
            } else if (currentPlayer == player2) {
                currentPlayer = nextPlayer;
                nextPlayer = player2;
            }
        }
    }
    document.querySelector(".restart").addEventListener("click", function () {
        win = false;
        gameGrid.newGrid();
    })

    function gameWinner() {
        for (let i = 0; i < x.length; i += 3) {
            if (x[i] == x[i + 1] && x[i + 1] == x[i + 2] && x[i] != "") {
                document.querySelector(".winnerMsg").innerHTML = "Player " + currentPlayer.mark + " is the winner"
                win = true;
            }
        }
        for (let i = 0; i < 3; i += 1) {
            if (x[i] == x[i + 3] && x[i + 3] == x[i + 6] && x[i] != "") {
                document.querySelector(".winnerMsg").innerHTML = "Player " + currentPlayer.mark + " is the winner"
                win = true;
            }
        }
        if (x[0] == x[4] && x[4] == x[8] && x[4] != "") {
            document.querySelector(".winnerMsg").innerHTML = "Player " + currentPlayer.mark + " is the winner"
            win = true;

        }
        if (x[2] == x[4] && x[4] == x[6] && x[4] != "") {
            document.querySelector(".winnerMsg").innerHTML = "Player " + currentPlayer.mark + " is the winner"
            win = true;
        }
        if (!gameGrid.grid.includes("") && win == false) {
            document.querySelector(".winnerMsg").innerHTML = "It's a Draw"
        }
        if (win == true) {
            document.querySelector(".board").removeEventListener("click", gameOrder)
        }
    }

    return { gameOrder }
})();

gameGrid.display();