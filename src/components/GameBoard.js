import React, { useEffect, useState } from "react";
import GameCirlcle from "./GameCirlcle";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./Game.css";
import {
  GAME_STATE_PLAYING,
  GAME_STATE_DRAW,
  NO_CIRCLES,
  PLAYER_1,
  PLAYER_2,
  GAME_STATE_WIN,
  NO_PLAYER,
} from "./Constants";
import { isDraw, isWinner, getComputerMove } from "./helper";

const GameBoard = () => {
  const [gameBoard, setGameBoard] = useState(Array(NO_CIRCLES).fill(NO_PLAYER));
  const [currentPlayer, setCurrentPlayer] = useState(PLAYER_1);
  const [gameState, setGameState] = useState(GAME_STATE_PLAYING);
  const [winPlayer, setWinPlayer] = useState(NO_PLAYER);

  console.log(gameBoard);

  useEffect(() => {
    initGame();
  }, []);

  const initGame = () => {
    setCurrentPlayer(PLAYER_1);
    setGameBoard(Array(NO_CIRCLES).fill(NO_PLAYER));
    setGameState(GAME_STATE_PLAYING);
  };

  const initBoard = () => {
    const circles = [];
    for (let i = 0; i < NO_CIRCLES; i++) {
      circles.push(renderCircle(i));
    }
    return circles;
  };

  const suggestMove = () => {
    circleClicked(getComputerMove(gameBoard));
  };

  const circleClicked = (id) => {
    console.log("circle clicked:" + id);

    if (gameBoard[id] !== NO_PLAYER) return;
    if (gameState !== GAME_STATE_PLAYING) return;

    if (isWinner(gameBoard, id, currentPlayer)) {
      setGameState(GAME_STATE_WIN);
      setWinPlayer(currentPlayer);
    }

    if (isDraw(gameBoard, id, currentPlayer)) {
      setGameState(GAME_STATE_DRAW);
      setWinPlayer(NO_PLAYER);
    }

    setGameBoard((prev) => {
      return prev.map((circle, pas) => {
        if (pas === id) return currentPlayer;
        return circle;
      });
    });

    setCurrentPlayer(currentPlayer === PLAYER_1 ? PLAYER_2 : PLAYER_1);
    console.log(gameBoard);
    console.log(currentPlayer);
  };

  const renderCircle = (id) => {
    return (
      <GameCirlcle
        key={id}
        id={id}
        className={`player_${gameBoard[id]}`}
        oncCircleClicked={circleClicked}
      ></GameCirlcle>
    );
  };

  return (
    <>
      <Header
        gameState={gameState}
        currentPlayer={currentPlayer}
        winPlayer={winPlayer}
      />
      <div className="gameBoard">{initBoard()}</div>

      <Footer
        onNewGameClick={initGame}
        onSuggestClick={suggestMove}
        gameState={gameState}
      />
    </>
  );
};

export default GameBoard;
