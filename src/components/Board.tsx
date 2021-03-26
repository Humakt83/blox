import React, {useState} from 'react';
import Square from './Square';
import Piece from './Piece';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {rotate, Direction, Shape, getShapes} from '../logic/Block';
import { DraxProvider, DraxView } from 'react-native-drax';

import {Button, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import {createBoard, placePiece, getMovableBoard, getEmptyMovableBoard} from '../logic/Blox';
import {makeAIMove} from '../logic/AI';

const Board = () => {

  const [pieces, setPieces] = useState(getShapes());
  const [aiPieces, setAIPieces] = useState(getShapes(2));
  const [activeShape, setActiveShape] = useState(pieces[0]);
  const [gameBoard, setGameBoard] = useState(createBoard());
  const [movableBoard, setMovableBoard] = useState(getEmptyMovableBoard());
  const [partOfPieceDragged, setPartOfPieceDragged] = useState({x: 0, y: 0});
  const [gameOver, setGameOver] = useState(false);

  const rotatePiece = (direction: Direction) => {
    setActiveShape(rotate(activeShape, direction));
  };

  const putPiece = (payload: Shape, row: number, column: number) => {
    if (movableBoard[row][column]) {
      const {x, y} = partOfPieceDragged;
      let newBoard = placePiece(gameBoard, payload, row, column, y, x);
      newBoard = makeAIMove(newBoard);
      setGameBoard(newBoard);
      setPieces(pieces.filter((val: Shape) => val !== payload));
      if (pieces.length < 2) {
        setGameOver(true);
      } else {
        setActiveShape(pieces[1]);
      }
      setMovableBoard(getEmptyMovableBoard());
    }
  };

  const restart = () => {
    setGameBoard(createBoard());
    const pieces = getShapes();
    setPieces(pieces);
    setAIPieces(getShapes(2));
    setActiveShape(pieces[0]);
    setMovableBoard(getEmptyMovableBoard());
  };

  const skip = () => {
    setGameBoard(makeAIMove(gameBoard));
  };

  return (
    <GestureHandlerRootView>
      <DraxProvider>
        <View>
          {
            gameBoard.map((row: number[], index: number) => {
              return (
                <Row key={`row-${index}`}>
                  {                   
                    row.map((column: number, indexCol: number) => {
                      return (
                        <DraxView 
                            onReceiveDragDrop={({ dragged: { payload } }) => putPiece(payload, index, indexCol)}
                            key={`drax-${index}-${indexCol}`}>
                          <Square color={column} movable={movableBoard[index][indexCol]} key={`col-${index}-${indexCol}`}/>
                        </DraxView>
                      )
                    })
                  }
                </Row>
              )
            })
          }            
        </View>
        <View>
          <PieceView>
            <RotateButton onPress={() => rotatePiece(Direction.CLOCKWISE)}>
              <RotateButtonText>↩️</RotateButtonText>
            </RotateButton>
            <DraxView payload={activeShape}>
              <Piece shape={activeShape} dragStartFn={(x: number, y: number) => {
                setPartOfPieceDragged({x, y});
                setMovableBoard(getMovableBoard(gameBoard, activeShape, y, x));
              }}/>
            </DraxView>
            <RotateButton onPress={() => rotatePiece(Direction.COUNTERCLOCKWISE)}>
              <RotateButtonText>↪️</RotateButtonText>
            </RotateButton>
          </PieceView>
          <Pieces>
            {
              pieces
                .filter((piece: Shape) => piece !== activeShape)
                .map((piece: Shape, index: number) => {
                  return (
                    <TouchableOpacity 
                        onPress={() => setActiveShape(piece)}
                        key={`piece-${index}`}>
                      <Piece 
                        shape={piece}                                              
                        small={true}/>
                    </TouchableOpacity>
                  )
                })
            }
          </Pieces>
          <Button onPress={restart} title="Restart"/>
          <Button onPress={skip} title="Skip"/>
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

const RotateButton = styled.TouchableOpacity`
  width: 30px;
  height: 30px;  
  background-color: rgb(46, 185, 250);
  border-radius: 15px;
  align-items: center;
  margin: 0 5px;
  justify-content: center;
`;

const RotateButtonText = styled.Text`
  color: white;
  font-size: 16px;
`;

const PieceView = styled.View`
  display: flex;
  flex-direction: row;
`;

const Pieces = styled.View`
  margin-top: 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
`

const Row = styled.View`
  display: flex;
  flex-direction: row;
`;

const GameOver = styled.Text`
  font-size: 28px;
  font-weight: bold;
`;

export default Board;
