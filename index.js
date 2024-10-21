/*
    GAME OF LIFE RULES
    -> Alive and has 0 or 1 neighbors, the cell dies
    -> Alive and 2 or 3 neighbors it lives
    -> Alive and 4 or more neighbors it dies
    -> Dead and has exactly 3 neighbors, it becomes alive.

*/

const gridHTML = document.getElementById("grid-container");
const nextButton = document.getElementById("nextButton");

//Will eventually add so user can select how many cols/rows
const rows = 10;
const cols = 10;

let currentGrid;
let newGridHTML = '';

currentGrid = createGrid();
fillGridRandom(currentGrid);
setGridColsRows();

console.log(currentGrid);

createGridHTML();

for(let i = 0; i < 10; ++i){
    setTimeout(nextButtonClicked, i * 1000);
}



nextButton.addEventListener("click", nextButtonClicked);

function nextButtonClicked(){
    getNextGrid();
    currentGrid = nextGrid;
    createGridHTML();
    console.log(currentGrid);
}

function createGrid(){
    const newGrid = new Array(cols);

    for(let i = 0; i < cols; ++i){
        newGrid[i] = new Array(rows);
    }

    return newGrid;
}

function fillGridRandom(grid){
    for(let i = 0; i < cols; ++i){
        for(let j = 0; j < rows; ++j){
            grid[i][j] = Math.floor(Math.random() * 2);
        }
    }
}
/*
    If a square is 1 then it will be considered "alive" or white in the grid
    If a sqaure is 0 then it will be considered "dead" or black in the grid
*/
function createGridHTML(){
    
    newGridHTML = ``;

    for(let i = 0; i < cols; ++i){
        for(let j = 0; j < rows; ++j){
            newGridHTML += `<div class = "gridSquare ${getDeadOrAlive(i, j)}"></div>`;
        }
    }

    gridHTML.innerHTML = newGridHTML;
}

function getDeadOrAlive(i, j){
    if(currentGrid[i][j] === 1){
        return "alive";
    }

    return "dead";
}

function setGridColsRows(){
    gridHTML.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    gridHTML.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
}

function getNextGrid(){

    let neighbors;
    nextGrid = createGrid();
    
    for(let i = 0; i < cols; ++i){
        for(let j = 0; j < rows; ++j){
            neighbors = getNeighbors(i, j);

            if(currentGrid[i][j] ===1){
                if(neighbors === 2 || neighbors === 3){
                    nextGrid[i][j] = 1;
                }
                else{
                    nextGrid[i][j] = 0;
                }
            }
            else if(currentGrid[i][j] === 0){
                if(neighbors === 3){
                    nextGrid[i][j] = 1;
                }
                else{
                    nextGrid[i][j] = 0;
                }
            }
            else{
                nextGrid[i][j] = 0;
            }
            console.log(`Neighbors = ${neighbors} at (${i}, ${j})`);
        }     
    }
    //console.log(nextGrid)
}

function getNeighbors(i, j){
    let neighbors = 0;

    if(i - 1 >= 0){
        if(j - 1 >= 0){
            neighbors += currentGrid[i - 1][j - 1];
        }
        if(j + 1 < rows){
            neighbors += currentGrid[i - 1][j + 1];
        }
        neighbors += currentGrid[i - 1][j];
    }

    if(i + 1 < cols){
        if(j - 1 >= 0){
            neighbors += currentGrid[i + 1][j - 1];
        }

        if(j + 1 < rows){
            neighbors += currentGrid[i + 1][j + 1];
        }
        neighbors += currentGrid[i + 1][j];
    }

    if(j - 1 >= 0){
        neighbors += currentGrid[i][j - 1];
    }

    if(j + 1 < rows){
        neighbors += currentGrid[i][j + 1];
    }

    return neighbors;
}