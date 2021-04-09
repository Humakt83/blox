import React, {useState, useEffect} from 'react';
import Actions from './Actions';
import Pieces from './Pieces';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {rotate, Direction, Shape, getShapes} from '../../logic/Block';
import { DraxProvider } from 'react-native-drax';
import styled from 'styled-components/native';
import {createBoard, placePiece, getMovableBoard, getEmptyMovableBoard} from '../../logic/Blox';
import {makeAIMove, AI, createAIPlayer} from '../../logic/AI';
import {Difficulty} from '../../logic/Difficulty';
import Board from './Board';
import GameOver from './GameOver';
import MainContainer from '../common/MainContainer';

const Game = ({navigation, route} : any) => {

  const [difficulty, setDifficulty] = useState(route.params.difficulty);
  const [shapes, setShapes] = useState(getShapes());
  const [aiOne, setAIOne] = useState(createAIPlayer(2));
  const [aiTwo, setAITwo] = useState(createAIPlayer(3));
  const [activeShape, setActiveShape] = useState(shapes[0]);
  const [gameBoard, setGameBoard] = useState(createBoard());
  const [movableBoard, setMovableBoard] = useState(getEmptyMovableBoard());
  const [partOfPieceDragged, setPartOfPieceDragged] = useState({x: 0, y: 0});
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    setDifficulty(route.params.difficulty);
    restart();
  }, [route.params.difficulty])

  const rotatePiece = (direction: Direction) => {
    const rotatedShape = rotate(activeShape, direction)
    const filteredPieces = shapes.filter((val: Shape) => val !== activeShape);
    filteredPieces.push(rotatedShape);
    setShapes(filteredPieces);
    setActiveShape(rotatedShape);
  };

  const moveAI = (board: number[][], ai: AI, setAI: Function): number[][] => {
    if (ai.skipping) {
      return board;
    }
    const aiMove = makeAIMove(board, ai.pieces);
    if (!aiMove.usedShape) {
      ai.skipping = true;
      setAI(ai);
      return board;
    }
    ai.pieces = ai.pieces.filter(piece => piece.name !== aiMove.usedShape?.name);
    setAI(ai);
    return aiMove.board;
  }

  const putPiece = (payload: Shape, row: number, column: number) => {
    if (movableBoard[row][column]) {
      const piece = payload || activeShape;
      const {x, y} = partOfPieceDragged;
      let newBoard = placePiece(gameBoard, piece, row, column, y, x);
      newBoard = moveAI(newBoard, aiOne, setAIOne);
      newBoard = moveAI(newBoard, aiTwo, setAITwo);
      setGameBoard(newBoard);
      const filteredPieces = shapes.filter((val: Shape) => val !== piece);
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
    let board = createBoard();
    const pieces = getShapes();
    setShapes(pieces);
    setAIOne(createAIPlayer(2));
    setAITwo(createAIPlayer(3));
    setActiveShape(pieces[0]);
    setGameOver(false);
    setMovableBoard(getEmptyMovableBoard());
    if (difficulty === Difficulty.HARD || difficulty === Difficulty.EXPERT) {
      board = moveAI(board, aiTwo, setAITwo);
      if (difficulty === Difficulty.EXPERT) {
        board = moveAI(board, aiOne, setAIOne);
      } 
    }
    setGameBoard(board);
  };

  const skip = () => {
    if (aiOne.skipping && aiTwo.skipping) {
      setGameOver(true);
    } else {
      let board = moveAI(gameBoard, aiOne, setAIOne);
      setGameBoard(moveAI(board, aiTwo, setAITwo));
      if (aiOne.skipping && aiTwo.skipping) {
        setGameOver(true);
      }
    }
  };

  const help = () => {
    navigation.navigate('Help');
  }

  const toMain = () => {
    navigation.navigate('Start');
  }

  return (
    <MainContainer>
      <GestureHandlerRootView>
        <DraxProvider>
          {
            gameOver ? <GameOver board={gameBoard} restart={restart}/> : <></>
          }
          <Board gameBoard={gameBoard} movableBoard={movableBoard} putPiece={putPiece}/>
          <View>
            <Actions rotatePiece={rotatePiece} activeShape={activeShape} dragStartFn={(x: number, y: number) => {
                    setPartOfPieceDragged({x, y});
                    setMovableBoard(getMovableBoard(gameBoard, activeShape, y, x));
                  }} restart={restart} skip={skip} toMain={toMain} help={help} />
            <Pieces clickFn={setActiveShape} shapes={shapes.filter((piece: Shape) => piece !== activeShape)} />
            <Pieces shapes={aiOne.pieces} aiPieces={true}/>
            <Pieces shapes={aiTwo.pieces} aiPieces={true}/>
          </View>
        </DraxProvider>
      </GestureHandlerRootView>
    </MainContainer>
  );
};

const View = styled.View`
  display: flex;
  margin-top: 15px;
  align-items: center;
`;

export default Game;
