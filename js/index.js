
import { Levels } from './level.js';
let niveau = 0
let grid = JSON.parse(JSON.stringify(Levels[niveau]));

gridToMap(grid)
const fps = 10
const keys = {
  37: 'left',
  39: 'right',
  38: 'up',
  40: 'down'
}
window.addEventListener("keydown", function (event) {
  console.log("Touche pressée : " + event.key);
})

function gridToMap(level) {

  let divall = document.createElement("div");
  divall.classList.toggle("divall");//ajout d'une classe à ma div 
  level.forEach(function (row) {//for each tableau
    row.forEach(function (square) {//for each row chiffre du tableau
      let squarediv = document.createElement("div");
      divall.append(squarediv);
      squaresAttributions(square, squarediv);

    })

  })
  const body = document.querySelector('body');
  body.append(divall);

}

/**
 * @param {Number} index 
 * @param {HTMLDivElement} squarediv 
 */
function squaresAttributions(index, squarediv) {
  if (index == 0) {//empyt
    squarediv.style.backgroundImage = "url(../img/empty.png)"//.. renvenir un cran en arrière
    squarediv.style.backgroundSize = "contain";

  } else if (index == 1) {//wall
    squarediv.style.backgroundImage = "url(../img/wall.png)"//.. renvenir un cran en arrière
    squarediv.style.backgroundSize = "contain";
    squarediv.style.border = '1px solid black';

  } else if (index == 2) {//boxes
    squarediv.style.backgroundImage = "url(../img/box.png)";
    squarediv.style.backgroundSize = "contain";
    squarediv.style.border = '1px solid black';

  } else if (index == 3) {//player
    squarediv.style.backgroundImage = "url(../img/man.png)";
    squarediv.style.backgroundSize = "contain";
    squarediv.style.backgroundPosition = 'center';
    squarediv.style.backgroundRepeat = 'no-repeat';
    squarediv.style.backgroundColor = 'rgba(0,0,0,0)';

  } else if (index == 4) {//Where box must be to complete the level
    squarediv.style.backgroundImage = "url(../img/earth.png)"//.. renvenir un cran en arrière
    squarediv.style.backgroundSize = "contain";
    squarediv.style.border = '1px solid black';

  } else if (index == 5) {
    squarediv.style.backgroundImage = "url(../img/boxes.png)";
    squarediv.style.backgroundSize = "contain";
    squarediv.style.border = '1px solid black';
  }
}

let nexttobox;
let newybox;
let newxbox;

let endboxx
let endboxy

let newy;
let newx;
document.addEventListener('keydown', (event) => {
  nexttobox = false
  newybox = startingPos(grid)[0];
  newxbox = startingPos(grid)[1];
  newy = startingPos(grid)[0];
  newx = startingPos(grid)[1];
  if (event.code === 'ArrowUp') {
    // Déplace le joueur vers le haut si la case au-dessus est libre
    if (grid[newy - 1][newx] === 0 || grid[newy - 1][newx] === 4) {
      newy--;
    } else if (grid[newy - 1][newx] === 2 || grid[newy - 1][newx] === 5) {
      if (grid[newy - 2][newx] === 0 || grid[newy - 2][newx] === 4) {
        newy--
        newybox = newybox - 2
        nexttobox = true
      }
    }

  } else if (event.code === 'ArrowDown') {
    // Déplace le joueur vers le bas si la case en-dessous est libre
    if (grid[newy + 1][newx] === 0 || grid[newy + 1][newx] === 4) {
      newy++;
    }
    else if (grid[newy + 1][newx] === 2 || grid[newy + 1][newx] === 5) {
      if (grid[newy + 2][newx] === 0 || grid[newy + 2][newx] === 4) {
        newy++
        newybox = newybox + 2
        nexttobox = true
      }
    }
  } else if (event.code === 'ArrowLeft') {
    // Déplace le joueur vers la gauche si la case à gauche est libre
    if (grid[newy][newx - 1] === 0 || grid[newy][newx - 1] === 4) {
      newx--;
    } else if (grid[newy][newx - 1] === 2 || grid[newy][newx - 1] === 5) {
      if (grid[newy][newx - 2] === 0 || grid[newy][newx - 2] === 4) {
        newx--
        newxbox = newxbox - 2
        nexttobox = true
      }
    }
  } else if (event.code === 'ArrowRight') {
    // Déplace le joueur vers la droite si la case à droite est libre
    if (grid[newy][newx + 1] === 0 || grid[newy][newx + 1] === 4) {
      newx++;
    } else if (grid[newy][newx + 1] === 2 || grid[newy][newx + 1] === 5) {
      if (grid[newy][newx + 2] === 0 || grid[newy][newx + 2] === 4) {
        newx++
        newxbox = newxbox + 2
        nexttobox = true
      }
    }
  }
  if (detectwin(grid, niveau)) {
    niveau++;
    grid = JSON.parse(JSON.stringify(Levels[niveau]));
  }
  updatetab(grid);
  gridToMap(grid);
});




function startingPos(grid) {
  let arr = []
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] == 3) {
        arr = [i, j]
      }
    }
  }
  return arr
}

function updatetab(grid) {
  let divtoclear = document.querySelector(".divall");
  divtoclear.innerHTML = '';
  let playerpos = startingPos(grid);

  let temp = grid[playerpos[0]][playerpos[1]];
  if (Levels[niveau][playerpos[0]][playerpos[1]] == 4) {
    grid[playerpos[0]][playerpos[1]] = 4;
  } else {
    grid[playerpos[0]][playerpos[1]] = 0;
  }
  grid[newy][newx] = temp
  if (nexttobox) {
    if (grid[newybox][newxbox] == 4) {
      grid[newybox][newxbox] = 5;
    } else {
      grid[newybox][newxbox] = 2;
    }

  }


}

document.addEventListener("keydown", function (event) {
  if (event.code === "Space") {
    grid = JSON.parse(JSON.stringify(Levels[niveau]));
  }
});


function detectwin(grid, level) {
  let initialCounter = 0
  let currentCounter = 0
  for (let i = 0; i < Levels[level].length; i++) {
    for (let j = 0; j < Levels[level][i].length; j++) {
      if (Levels[level][i][j] == 2) {
        initialCounter++;
      }
    }
  }
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] == 5) {
        currentCounter++;
      }
    }
  }
  if (initialCounter == currentCounter) {
    return true
  }
  return false
}