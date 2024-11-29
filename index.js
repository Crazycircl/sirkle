// Welcome to
// __________         __    __  .__                               __
// \______   \_____ _/  |__/  |_|  |   ____   ______ ____ _____  |  | __ ____
//  |    |  _/\__  \\   __\   __\  | _/ __ \ /  ___//    \\__  \ |  |/ // __ \
//  |    |   \ / __ \|  |  |  | |  |_\  ___/ \___ \|   |  \/ __ \|    <\  ___/
//  |________/(______/__|  |__| |____/\_____>______>___|__(______/__|__\\_____>
//
// This file can be a nice home for your Battlesnake logic and helper functions.
//
// To get you started we've included code to prevent your Battlesnake from moving backwards.
// For more info see docs.battlesnake.com

import runServer from './server';

// info is called when you create your Battlesnake on play.battlesnake.com
// and controls your Battlesnake's appearance
// TIP: If you open your Battlesnake URL in a browser you should see this data
function info() {
  console.log("INFO");

  return {
    apiversion: "1",
    author: "Sirkle",       // TODO: Your Battlesnake Username
    color: "#ff0001", // TODO: Choose color
    head: "all-seeing",  // TODO: Choose head
    tail: "block-bum",  // TODO: Choose tail
  };
}

// start is called when your Battlesnake begins a game
function start(gameState) {
  console.log("GAME START");
}

// end is called when your Battlesnake finishes a game
function end(gameState) {
  console.log("GAME OVER\n");
}

// move is called on every turn and returns your next move
// Valid moves are "up", "down", "left", or "right"
// See https://docs.battlesnake.com/api/example-move for available data
function move(gameState) {

  console.log("move start")

  let isMoveSafe = {
    up: true,
    down: true,
    left: true,
    right: true
  };

  // We've included code to prevent your Battlesnake from moving backwards
  const myHead = gameState.you.body[0];
  const myNeck = gameState.you.body[1];

  if (myNeck.x < myHead.x) {        // Neck is left of head, don't move left
    isMoveSafe.left = false;

  } else if (myNeck.x > myHead.x) { // Neck is right of head, don't move right
    isMoveSafe.right = false;

  } else if (myNeck.y < myHead.y) { // Neck is below head, don't move down
    isMoveSafe.down = false;

  } else if (myNeck.y > myHead.y) { // Neck is above head, don't move up
    isMoveSafe.up = false;
  }

  // TODO: Step 1 - Prevent your Battlesnake from moving out of bounds
  const boardWidth = gameState.board.width;
  const boardHeight = gameState.board.height;

  if (myHead.x == 0) {
    console.log('left of board')
    isMoveSafe.left = false;
  }
  if (myHead.x == boardWidth - 1){
    console.log('right of board')
    isMoveSafe.right = false;
  }
  if (myHead.y == 0) {
    console.log('bottom of board')
    isMoveSafe.down = false;
  }
  if (myHead.y == boardHeight - 1){
    console.log('top of board')
    isMoveSafe.up = false;
  }

  // TODO: Step 2 - Prevent your Battlesnake from colliding with itself
  const myBody = gameState.you.body;
  const bodyLeft = myBody.some(u => u.x == myHead.x - 1 && u.y == myHead.y)
  if (bodyLeft){
    console.log("body is to left")
    isMoveSafe.left = false;
  }
  const bodyRight = myBody.some(u => u.x == myHead.x + 1 && u.y == myHead.y)
  if (bodyRight){
    console.log("body is to right")
    isMoveSafe.right = false;
  }
  const bodyUp = myBody.some(u => u.x == myHead.x && u.y == myHead.y + 1)
  if (bodyUp){
    console.log("body is above")
    isMoveSafe.up = false;
  }
  const bodyDown = myBody.some(u => u.x == myHead.x && u.y == myHead.y - 1)
  if (bodyDown){
    console.log("body is below")
    isMoveSafe.down = false;
  }

  // TODO: Step 3 - Prevent your Battlesnake from colliding with other Battlesnakes
  // opponents = gameState.board.snakes;

  // Are there any safe moves left?
  const safeMoves = Object.keys(isMoveSafe).filter(key => isMoveSafe[key]);
  if (safeMoves.length == 0) {
    console.log(`MOVE ${gameState.turn}: No safe moves detected! Moving down`);
    return { move: "down" };
  }

  // Choose a random move from the safe moves
  const nextMove = safeMoves[Math.floor(Math.random() * safeMoves.length)];

  // TODO: Step 4 - Move towards food instead of random, to regain health and survive longer
  // food = gameState.board.food;
  console.log(`Current coords : ${myHead.x},${myHead.y}`)
  console.log(`MOVE ${gameState.turn}: ${nextMove}`)
  return { move: nextMove };
}

runServer({
  info: info,
  start: start,
  move: move,
  end: end
});
