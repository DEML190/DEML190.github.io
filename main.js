const interface = document.querySelector('#game-interface');
const btn = document.querySelector('.button-text');
const selectBtns = document.querySelectorAll('.select-button');

function random(upperBound) {
    return Math.floor(Math.random() * (upperBound));
}

function randomNum() {
    return random(2) * 2 + 2;
}

function GameBoard(size) {
    this.size = size;
}

GameBoard.prototype.clearBoard = function() {
    // this.size = 0;
    const rows = document.querySelectorAll('.row-block');
    for (var i = 0; i < size; ++i) {
        interface.removeChild(rows[i]);
    }
    this.size = 0;
};
// select button
for (var i = 0; i < 2; ++i) {
    if (selectBtns[i].innerText == '3*3') {
        selectBtns[i].onclick = function() {
            gameBoard.clearBoard();
            gameBoard.size = 3;
            gameBoard.initBoard();
            size = 3;
            initGame();
        }
    } else if (selectBtns[i].innerText == '4*4') {
        selectBtns[i].onclick = function() {
            gameBoard.clearBoard();
            gameBoard.size = 4;
            gameBoard.initBoard();
            size = 4;
            initGame();
        }
    }
    /*
    else {
        selectBtns[i].onclick = function() {
            gameBoard.clearBoard();
            gameBoard.size = 5;
            gameBoard.initBoard();
            size = 5;
            initGame();
        }
    }
    */
}

//construct the board
let blocks = [];
let blockSpans = [];
GameBoard.prototype.initBoard = function() {
    blockSpans = [];
    blocks = [];
    for (var i = 0; i < this.size; ++i) {
        var tmpRowBlock = document.createElement('div');
        tmpRowBlock.className = 'row-block';
        tmpRowBlock.style.height = 600 / gameBoard.size + 'px';
        interface.appendChild(tmpRowBlock);
    }
    const rowBlocks = document.getElementsByClassName('row-block');
    for (var i = 0; i < this.size; ++i) {
        let tmp = [];
        let spanTmps = [];
        for (var j = 0; j < this.size; ++j) {
            var tmpSubblock = document.createElement('div');
            // tmpSubblock.setAttribute('class', 'subblock');
            tmpSubblock.className = 'subblock';
            let blockSize = 600 / this.size;
            tmpSubblock.style.width = blockSize + 'px';
            tmpSubblock.style.height = blockSize + 'px';
            rowBlocks[i].appendChild(tmpSubblock);


            var blockSpan = document.createElement('span');
            blockSpan.setAttribute('class', 'block-num');
            tmpSubblock.appendChild(blockSpan);

            spanTmps.push(blockSpan);
            tmp.push(tmpSubblock);
        }
        blocks.push(tmp);
        blockSpans.push(spanTmps);

    }
};

// set 4 as the board size
let size = 3;
gameBoard = new GameBoard(size);
gameBoard.initBoard();

//new size * size subblock
function Block(x, y) {
    this.exsits = false;
    this.hasBeenCombined = false;
    this.x = x;
    this.y = y;
};



let numBlock = [];

function initGame() {
    numBlock = [];
    for (var i = 0; i < size; ++i) {
        let tmps = [];
        for (var j = 0; j < size; ++j) {
            let tmp = new Block(i, j);
            tmps.push(tmp);
        }
        numBlock.push(tmps);
    }
    let x = random(size);
    let y = random(size);
    numBlock[x][y].exsits = true;
    blockSpans[x][y].innerText = randomNum();
    leftEmptyBlock = size * size - 1;
    updateBorad();
    setControl();
}

function updateBorad() {
    for (var i = 0; i != size; ++i) {
        for (var j = 0; j != size; ++j) {
            if (numBlock[i][j].exsits) {
                blocks[i][j].style.background = 'sandybrown';
            } else {
                blocks[i][j].style.background = 'gray';
                blockSpans[i][j].innerText = "";
            }
        }
    }
}

function clearBoard() {
    for (var i = 0; i < size; ++i) {
        for (var j = 0; j < size; ++j) {
            numBlock[i][j].exsits = false;
            blockSpans[i][j].innerText = "";
        }
    }
    initGame();
}

btn.onclick = function() {
    clearBoard();
}

function move(blocks, direction) {
    if (direction == 'left') {
        for (var j = 0; j < size; ++j) {
            for (var i = 0; i < size; ++i) {
                if (blocks[i][j].exsits) {
                    blocks[i][j].exsits = false;
                    let targetX = i,
                        targetY = j;
                    let tmpText = blockSpans[i][j].innerText;
                    while (targetY > 0 && !blocks[targetX][targetY - 1].exsits) {
                        --targetY;
                    }
                    if (targetY > 0 && blockSpans[i][j].innerText == blockSpans[targetX][targetY - 1].innerText &&
                        !blocks[targetX][targetY - 1].hasBeenCombined) {
                        changed = true;
                        --targetY;
                        blockSpans[targetX][targetY].innerText = blockSpans[i][j].innerText * 2;
                        blockSpans[i][j].innerText = "";
                        ++leftEmptyBlock;
                        blocks[targetX][targetY].hasBeenCombined = true;
                        continue;
                    }
                    blocks[targetX][targetY].exsits = true;
                    if (targetX != i || targetY != j) {
                        changed = true;
                        blockSpans[i][j].innerText = "";
                        blockSpans[targetX][targetY].innerText = tmpText;
                    }
                }

            }
        }
    }
    if (direction == 'right') {
        for (var j = size - 1; j >= 0; --j) {
            for (var i = 0; i < size; ++i) {
                if (blocks[i][j].exsits) {
                    blocks[i][j].exsits = false;
                    let targetX = i,
                        targetY = j;
                    let tmpText = blockSpans[i][j].innerText;
                    while (targetY < size - 1 && !blocks[targetX][targetY + 1].exsits) {
                        ++targetY;
                    }
                    if (targetY < size - 1 && blockSpans[i][j].innerText == blockSpans[targetX][targetY + 1].innerText &&
                        !blocks[targetX][targetY + 1].hasBeenCombined) {
                        ++targetY;
                        changed = true;
                        blockSpans[targetX][targetY].innerText = blockSpans[i][j].innerText * 2;
                        blockSpans[i][j].innerText = "";
                        ++leftEmptyBlock;
                        blocks[targetX][targetY].hasBeenCombined = true;
                        continue;
                    }
                    blocks[targetX][targetY].exsits = true;
                    if (targetX != i || targetY != j) {
                        changed = true;
                        blockSpans[i][j].innerText = "";
                        blockSpans[targetX][targetY].innerText = tmpText;
                    }
                }

            }
        }
    }
    if (direction == 'up') {
        for (var i = 0; i < size; ++i) {
            for (var j = 0; j < size; ++j) {
                if (blocks[i][j].exsits) {
                    blocks[i][j].exsits = false;
                    let targetX = i,
                        targetY = j;
                    let tmpText = blockSpans[i][j].innerText;
                    while (targetX > 0 && !blocks[targetX - 1][targetY].exsits) {
                        --targetX;
                    }
                    if (targetX > 0 && blockSpans[i][j].innerText == blockSpans[targetX - 1][targetY].innerText &&
                        !blocks[targetX - 1][targetY].hasBeenCombined) {
                        --targetX;
                        changed = true;
                        // blockSpans[targetX][targetY].innerText = blockSpan[i][j].innerText * 2;
                        blockSpans[targetX][targetY].innerText = blockSpans[i][j].innerText * 2;
                        blockSpans[i][j].innerText = "";
                        ++leftEmptyBlock;
                        blocks[targetX][targetY].hasBeenCombined = true;
                        continue;
                    }
                    blocks[targetX][targetY].exsits = true;
                    if (targetX != i || targetY != j) {
                        changed = true;
                        blockSpans[i][j].innerText = "";
                        blockSpans[targetX][targetY].innerText = tmpText;
                    }
                }

            }
        }
    }
    if (direction == 'down') {
        for (var i = size - 1; i >= 0; --i) {
            for (var j = 0; j < size; ++j) {
                if (blocks[i][j].exsits) {
                    blocks[i][j].exsits = false;
                    let targetX = i,
                        targetY = j;
                    let tmpText = blockSpans[i][j].innerText;
                    while (targetX < size - 1 && !blocks[targetX + 1][targetY].exsits) {
                        ++targetX;
                    }
                    if (targetX < size - 1 && blockSpans[i][j].innerText == blockSpans[targetX + 1][targetY].innerText &&
                        !blocks[targetX + 1][targetY].hasBeenCombined) {
                        changed = true;
                        ++targetX;
                        blockSpans[targetX][targetY].innerText = blockSpans[i][j].innerText * 2;
                        blockSpans[i][j].innerText = "";
                        ++leftEmptyBlock;
                        blocks[targetX][targetY].hasBeenCombined = true;
                        continue;
                    }
                    blocks[targetX][targetY].exsits = true;
                    if (targetX != i || targetY != j) {
                        changed = true;
                        blockSpans[i][j].innerText = "";
                        blockSpans[targetX][targetY].innerText = tmpText;
                    }
                }

            }
        }
    }
    for (var i = 0; i < size; ++i) {
        for (var j = 0; j < size; ++j) {
            blocks[i][j].hasBeenCombined = false;
        }
    }

    updateBorad();

}

function setControl() {
    window.onkeydown = function(e) {
        changed = false;
        for (var i = 0; i < size; ++i) {
            for (var j = 0; j < size; ++j) {
                blocks[i][j].hasBeenCombined = false;
            }
        }
        if (e.key === 'a' || e.key == 'ArrowLeft') {
            move(numBlock, 'left');
        } else if (e.key === 'd' || e.key == 'ArrowRight') {
            move(numBlock, 'right');
        } else if (e.key === 'w' || e.key == 'ArrowUp') {
            move(numBlock, 'up');
        } else if (e.key === 's' || e.key == 'ArrowDown') {
            move(numBlock, 'down');
        }
        if (leftEmptyBlock != 0 && changed) {
            let counter = random(leftEmptyBlock);
            let x = 0,
                y = 0;
            for (var i = 0; i < size && counter >= 0; ++i) {
                for (var j = 0; j < size && counter >= 0; ++j) {
                    if (!numBlock[i][j].exsits) {
                        if (counter == 0) {
                            numBlock[i][j].exsits = true;
                            blockSpans[i][j].innerText = randomNum();
                        }
                        --counter;
                    }
                }
            }
            --leftEmptyBlock;
            updateBorad();
        }
        if (leftEmptyBlock == 0 && couldNotChange()) {
            window.setTimeout(alert('You lost.'), 0);
        }
    };
}

function couldNotChange() {
    let flag = true;
    for (var i = 0; i < size; ++i) {
        for (var j = 0; j < size; ++j) {
            let leftCol = j - 1,
                rightCol = j + 1;
            let upRow = i - 1,
                downRow = i + 1;
            let text = blockSpans[i][j].innerText;
            if (leftCol >= 0) {
                flag = flag && text != blockSpans[i][leftCol].innerText;
            }
            if (rightCol < size) {
                flag = flag && text != blockSpans[i][rightCol].innerText;
            }
            if (upRow >= 0) {
                flag = flag && text != blockSpans[upRow][j].innerText;
            }
            if (downRow < size) {
                flag = flag && text != blockSpans[downRow][j].innerText;
            }
            if (flag == false) {
                break;
            }
        }
    }
    return flag;
}
let leftEmptyBlock = size * size - 1;
let changed = false;
initGame();