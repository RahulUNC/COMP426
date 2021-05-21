import Game from './engine/game.js'
var game = null;

$(function() {    
    const $root = $('#root');
    game = new Game(4);
    loadPageWithGame(game);    
    $root.on('click', '#reset', handleResetButtonPress);
    document.onkeydown = function(event) {
        switch (event.code) {
           case "ArrowLeft":
                game.move("left")
              break;
           case "ArrowUp":
                game.move("up");
              break;
           case "ArrowRight":
                game.move("right");
              break;
           case "ArrowDown":
                game.move("down");
              break;
        }        
        $('#board').replaceWith(renderBoard(game.gameState.board, game.size))
        $('#score').replaceWith(renderScore(game.gameState.score))
        if(game.gameState.won) {
            $('#won').replaceWith(`<div class = "issubtitle is-3" id = "score">
                                        <h1>You have won!</h1>
                                        <h1>Restart or</h1>
                                        <h1>Keep playing.</h1>
                                   </div>`);
        }
        if(game.gameState.over) {
            $('#board').replaceWith(`<div id= "board" class="container has-text-centered">
                                        <h2>You lost! with a total score of ${game.gameState.score}</h2>
                                        <p>Please restart the game to try again!</p>
                                    </div>`);
        }
    };
})

export const handleResetButtonPress = function(event) {
    game.setupNewGame();
    $('#board').replaceWith(renderBoard(game.gameState.board, game.size))
    $('#score').replaceWith(renderScore(game.gameState.score))
}

export const loadPageWithGame = function(game) {    
    const $board = $('#board');
    $board.append(renderBoard(game.gameState.board, game.size))
}

function renderScore(score) {
    return `<div class = "issubtitle is-3" id = "score">
                <h2>Score: ${score}</h2>
            </div>`
}

function renderBoard(board, size) {
    let fullBoard = `<div id= "board" class="container">`;
    for (let i = 0; i < size; i++) {
        let rowAdd = `<div class="tile is-ancestor">`;
        for (let j = 0; j < board.length; j++) {
            if ((i + 1) === Math.ceil(((j + 1) / size))) {
                rowAdd +=  renderTile(board[j]);
            }
        }
        fullBoard += rowAdd
        fullBoard += `</div>`
    }
    fullBoard += `</div>`
    return fullBoard;
}

function renderTile(number) {
    let color = "";
    if(number === 0) {
        color = "notification";
    } else if (number === 2) {
        color = "notification is-primary";
    } else if (number === 4) {
        color = "notification is-link"
    } else if (number === 8) {
        color = "notification is-info"
    } else if (number === 16) {
        color = "notification is-success"
    } else if (number === 32) {
        color = "notification is-warning"
    } else if (number === 64) {
        color = "notification is-danger"
    } else if (number === 128) {
        color = "notification is-primary"
    } else if (number === 256) {
        color = "notification is-link"
    } else if (number === 512) {
        color = "notification is-info"
    } else if (number === 1024) {
        color = "notification is-success"
    } else if (number === 2048) {
        color = "notification is-warning"
    } else {
        color = "notification is-danger"
    }
    return `<div class="tile is-parent">
                <article class="tile is-child box has-text-centered ${color}">
                    <div class="content">
                        <span></span>
                        <h1>${number}</h1>
                        <span></span>
                    </div>
                </article>
            </div>`;
}