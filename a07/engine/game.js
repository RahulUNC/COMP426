/*
Add your code for Game here
 */
export default class Game {
    constructor(size) {
        this.size = size;
        this.listenToMove = [];
        this.listenToWin = [];
        this.listenToLose = [];
        this.gameState = {
            board: new Array(size * size).fill(0),
            score: 0,
            won: false,
            over: false
        }
        //intialize two empty spots
        this.genNextSpot(this.gameState)
        this.genNextSpot(this.gameState)
    }

    //this method modifies the game state board with a new value at a blank spot
    genNextSpot() {
        let countFreeSpaces = this.gameState.board.filter((i) => i === 0).length;
        if (countFreeSpaces === 0) {
            this.checkLose();
        } else {
            let locationToAdd = Math.floor(Math.random() * Math.floor(countFreeSpaces));
            let numEmptyTraversed = 0;
            for (let i = 0; i < this.gameState.board.length; i++) {
                if (this.gameState.board[i] === 0) {
                    if (numEmptyTraversed === locationToAdd) {
                        this.gameState.board[i] = this.gen2or4();
                        break;
                    } else {
                        numEmptyTraversed++;
                    }
                }
            }
        }        
    }

    checkLose() {
        let columnCount = 0;
        for (let i = 0; i < this.size; i++) {
            let columnAdd = [];
            for (let j = i; j < this.gameState.board.length; j += this.size) {
                columnAdd.push(this.gameState.board[j]);
            }
            if(this.arrayCheck(columnAdd)) {
                columnCount++;
            }
        }
        let rowCount = 0;
        for (let i = 0; i < this.size; i++) {
            let rowAdd = [];
            for (let j = 0; j < this.gameState.board.length; j++) {
                if ((i + 1) === Math.ceil(((j + 1) / this.size))) {
                    rowAdd.push(this.gameState.board[j]);
                }
            }
            if(this.arrayCheck(rowAdd)) {
                rowCount++;
            }
        }
        if(rowCount === this.size && columnCount === this.size) {            
            this.gameState.over = true;
            return true;
        }
        return false;        
    }

    arrayCheck(array) {
        for(let i = 0; i < array.length - 1; i++) {
            if(array[i] === 0 || array[array.length - 1] === 0) {
                return false;
            } else if (array[i] === array[i+1]) {
                return false;
            }
        }
        return true;
    }

    //method generates either a 2 or 4
    gen2or4() {
        let weighted2At90 = [2, 2, 2, 2, 2, 2, 2, 2, 2, 4];
        return weighted2At90[Math.floor(Math.random() * Math.floor(10))];
    }

    //registers all move listeners
    onMove(callback) {
        this.listenToMove.push(callback);
    }

    onLose(callback) {
        this.listenToLose.push(callback);
    }

    onWin(callback) {
        this.listenToWin.push(callback);
    }

    setupNewGame() {
        this.gameState = {
            board: new Array(this.size * this.size).fill(0),
            score: 0,
            won: false,
            over: false
        };
        //initialize two empty spots
        this.genNextSpot(this.gameState);
        this.genNextSpot(this.gameState);
    }

    loadGame(gameState) {
        this.gameState = gameState;
    }

    //performs the move via helper functions and updates listeners
    //after each move checkLose and win are called
    move(direction) {
        switch (direction) {
            case 'left':
                this.moveLeftRight(0);
                break;
            case 'right':
                this.moveLeftRight(1);
                break;
            case 'down':
                this.moveUpDown(1);
                break;
            case 'up':
                this.moveUpDown(0);
                break;
        }
        this.listenToMove.forEach((i) => i(this.gameState));        
        if(this.checkLose()) {this.listenToLose.forEach((i) => i(this.gameState));}        
        if(this.win()) {this.listenToWin.forEach((i) => i(this.gameState));}
    }

    toString() {
        let gameString = "Score: " + this.gameState.score + "\n"
        gameString += "-------" + "\n"
        for (let i = 0; i < this.gameState.board.length; i++) {
            gameString += this.gameState.board[i] + "     ";
            if ((i + 1) % this.size == 0) {
                gameString += "\n"
            }
        }
        gameString += "Game over: " +  this.gameState.over;
        return gameString;
    }

    win() {
        for(let i = 0; i < this.gameState.board.length; i++) {
            if(this.gameState.board[i] === 2048) {                
                this.gameState.won = true;
                this.listenToMove.forEach((i) => i(this.gameState));
                return true;
            }
        }
        return false;
    }

    getGameState() {
        return this.gameState;
    }

    //combine logic for down and right moves
    aggregateDownRight(uncombined) {
        let zeroToAdd = uncombined.filter((i) => i === 0)
        let withoutZero = uncombined.filter(i => i);
        let shifted = zeroToAdd.concat(withoutZero);
        for (let i = this.size -1 ; i >0 ; i--) {
            if (shifted[i] === shifted[i - 1]) {
                shifted[i] = shifted[i] + shifted[i - 1];     
                this.gameState.score += shifted[i];
                shifted[i - 1] = 0;           
            }
        }
        zeroToAdd = shifted.filter((i) => i === 0)
        withoutZero = shifted.filter(i => i);
        shifted = zeroToAdd.concat(withoutZero);
        return shifted;
    }

    //combine logic for up and left moves
    aggregateUpLeft(uncombined) {
        let zeroToAdd = uncombined.filter((i) => i === 0)
        let withoutZero = uncombined.filter(i => i);
        let shifted = withoutZero.concat(zeroToAdd);
        for (let i = 0; i < this.size - 1; i++) {
            if (shifted[i] === shifted[i + 1]) {
                shifted[i] = shifted[i] + shifted[i + 1];                
                this.gameState.score += shifted[i];                
                shifted[i + 1] = 0;
            }
        }
        zeroToAdd = shifted.filter((i) => i === 0)
        withoutZero = shifted.filter(i => i);
        shifted = withoutZero.concat(zeroToAdd);
        return shifted;
    }

    //turns the 1d array into 2d arrays based on rows, each row is sent to the aggregator
    //returned row is checked for duplication, if duplicate it represents an invalid move
    //if move is valid gen next tile is called
    moveLeftRight(val) {
        let newGrid = []
        for (let i = 0; i < this.size; i++) {
            let rowAdd = [];
            for (let j = 0; j < this.gameState.board.length; j++) {
                if ((i + 1) === Math.ceil(((j + 1) / this.size))) {
                    rowAdd.push(this.gameState.board[j]);
                }
            }
            newGrid.push(rowAdd);
        }
        for (let i = 0; i < newGrid.length; i++) {
            if(val === 0) {newGrid[i] = this.aggregateUpLeft(newGrid[i])} else {newGrid[i] = this.aggregateDownRight(newGrid[i])}
        }
        let returnGrid = []
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                returnGrid.push(newGrid[i][j])
            }
        }
        if(!(returnGrid.join(',') === this.gameState.board.join(','))){
            this.gameState.board = returnGrid;
            this.genNextSpot()
        }
    }

    //turns the 1d array into 2d arrays based on columns, each column is sent to the aggregator
    //returned column is checked for duplication, if duplicate it represents an invalid move
    //if move is valid gen next tile is called
    moveUpDown(val) {
        let newGrid = []
        for (let i = 0; i < this.size; i++) {
            let columnAdd = [];
            for (let j = i; j < this.gameState.board.length; j += this.size) {
                columnAdd.push(this.gameState.board[j]);
            }
            newGrid.push(columnAdd);
        }
        for (let i = 0; i < newGrid.length; i++) {
            if(val === 0) {newGrid[i] = this.aggregateUpLeft(newGrid[i])} else {newGrid[i] = this.aggregateDownRight(newGrid[i])}
        }        
        let returnGrid = []
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                returnGrid.push(newGrid[j][i])
            }
        }
        if(!(returnGrid.join(',') === this.gameState.board.join(','))){
            this.gameState.board = returnGrid;
            this.genNextSpot()
        }
    }
}