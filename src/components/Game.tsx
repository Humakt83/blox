import React, {useState} from 'react';
import Actions from './Actions';
import Pieces from './Pieces';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {rotate, Direction, Shape, getShapes} from '../logic/Block';
import { DraxProvider } from 'react-native-drax';
import styled from 'styled-components/native';
import {createBoard, placePiece, getMovableBoard, getEmptyMovableBoard} from '../logic/Blox';
import {makeAIMove} from '../logic/AI';
import Board from './Board';

const Game = () => {

  const [shapes, setShapes] = useState(getShapes());
  const [aiPieces, setAIPieces] = useState(getShapes(2));
  const [ai2Pieces, setAI2Pieces] = useState(getShapes(3));
  const [activeShape, setActiveShape] = useState(shapes[0]);
  const [gameBoard, setGameBoard] = useState(createBoard());
  const [movableBoard, setMovableBoard] = useState(getEmptyMovableBoard());
  const [partOfPieceDragged, setPartOfPieceDragged] = useState({x: 0, y: 0});
  const [gameOver, setGameOver] = useState(false);

  const rotatePiece = (direction: Direction) => {
    const rotatedShape = rotate(activeShape, direction)
    const filteredPieces = shapes.filter((val: Shape) => val !== activeShape);
    filteredPieces.push(rotatedShape);
    setShapes(filteredPieces);
    setActiveShape(rotatedShape);
  };

  const moveAI = (board: number[][], aiShapes: Shape[], setPieces: Function): number[][] => {
    const aiMove = makeAIMove(board, aiShapes);
    setPieces(aiShapes.filter(piece => piece.name !== aiMove.usedShape?.name));
    return aiMove.board;
  }

  const putPiece = (payload: Shape, row: number, column: number) => {
    if (movableBoard[row][column]) {
      const {x, y} = partOfPieceDragged;
      let newBoard = placePiece(gameBoard, payload, row, column, y, x);
      newBoard = moveAI(newBoard, aiPieces, setAIPieces);
      newBoard = moveAI(newBoard, ai2Pieces, setAI2Pieces);
      setGameBoard(newBoard);
      const filteredPieces = shapes.filter((val: Shape) => val !== payload);
      setShapes(filteredPieces);
      if (filteredPieces.length < 1) {
        setGameOver(true);
      } else {
        setActiveShape(filteredPieces[0]);
      }
      setMovableBoard(getEmptyMovableBoard());
    }
  };

  const restart = () => {
    setGameBoard(createBoard());
    const pieces = getShapes();
    setShapes(pieces);
    setAIPieces(getShapes(2));
    setAI2Pieces(getShapes(3));
    setActiveShape(pieces[0]);
    setGameOver(false);
    setMovableBoard(getEmptyMovableBoard());
  };

  const skip = () => {
    let board = moveAI(gameBoard, aiPieces, setAIPieces);
    setGameBoard(moveAI(board, ai2Pieces, setAI2Pieces));
  };

  return (
    <GestureHandlerRootView>
      <DraxProvider>
        <Board gameBoard={gameBoard} movableBoard={movableBoard} putPiece={putPiece}/>
        <View>
          <Actions rotatePiece={rotatePiece} activeShape={activeShape} dragStartFn={(x: number, y: number) => {
                  setPartOfPieceDragged({x, y});
                  setMovableBoard(getMovableBoard(gameBoard, activeShape, y, x));
                }} restart={restart} skip={skip}/>
          <Pieces clickFn={setActiveShape} shapes={shapes.filter((piece: Shape) => piece !== activeShape)} />
          <Pieces shapes={aiPieces} aiPieces={true}/>
          <Pieces shapes={ai2Pieces} aiPieces={true}/>
          {
            gameOver ? <GameOver>Game Over!</GameOver> : <></>
          }
        </View>
      </DraxProvider>
    </GestureHandlerRootView>
  );
};

const View = styled.View`
  display: flex;
  margin-top: 15px;
  align-items: center;
`;

const GameOver = styled.Text`
  font-size: 28px;
  font-weight: bold;
`;

export default Game;
