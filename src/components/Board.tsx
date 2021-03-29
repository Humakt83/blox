import React, {useState} from 'react';
import Square from './Square';
import Piece from './Piece';
import Pieces from './Pieces';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {rotate, Direction, Shape, getShapes} from '../logic/Block';
import { DraxProvider, DraxView } from 'react-native-drax';
import styled from 'styled-components/native';
import {createBoard, placePiece, getMovableBoard, getEmptyMovableBoard} from '../logic/Blox';
import {makeAIMove} from '../logic/AI';

const Board = () => {

  const [shapes, setShapes] = useState(getShapes());
  const [aiPieces, setAIPieces] = useState(getShapes(2));
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

  const moveAI = (board: number[][]): number[][] => {
    const aiMove = makeAIMove(board, aiPieces);
    setAIPieces(aiPieces.filter(piece => piece.name !== aiMove.usedShape?.name));
    return aiMove.board;
  }

  const putPiece = (payload: Shape, row: number, column: number) => {
    if (movableBoard[row][column]) {
      const {x, y} = partOfPieceDragged;
      let newBoard = placePiece(gameBoard, payload, row, column, y, x);
      newBoard = moveAI(newBoard);
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
    setActiveShape(pieces[0]);
    setMovableBoard(getEmptyMovableBoard());
  };

  const skip = () => {
    setGameBoard(moveAI(gameBoard));
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
          <Row>
            <PieceView>
              <RotateButton onPress={() => rotatePiece(Direction.CLOCKWISE)}>
                <RotateButtonText>↩️</RotateButtonText>
              </RotateButton>
              <DraxView payload={activeShape}>
                <Piece large={true} shape={activeShape} dragStartFn={(x: number, y: number) => {
                  setPartOfPieceDragged({x, y});
                  setMovableBoard(getMovableBoard(gameBoard, activeShape, y, x));
                }}/>
              </DraxView>
              <RotateButton onPress={() => rotatePiece(Direction.COUNTERCLOCKWISE)}>
                <RotateButtonText>↪️</RotateButtonText>
              </RotateButton>
            </PieceView>
            <CommandMenu>
              <Button onPress={restart}>
                  <ButtonText>RESTART</ButtonText>
                </Button>
                <Button onPress={skip}>
                  <ButtonText>
                    SKIP
                  </ButtonText>
                </Button>
            </CommandMenu>
          </Row>
          <Pieces clickFn={setActiveShape} shapes={shapes.filter((piece: Shape) => piece !== activeShape)} />
          <Pieces shapes={aiPieces} aiPieces={true}/>
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

const Row = styled.View`
  display: flex;
  flex-direction: row;
`;

const GameOver = styled.Text`
  font-size: 28px;
  font-weight: bold;
`;

const Button = styled.TouchableOpacity`
  width: 80px;
  height: 30px;
  background-color: rgb(46, 185, 250);
  border-radius: 15px;
  align-items: center;
  justify-content: center;
`

const ButtonText = styled.Text`
  font-size: 13px;
  color: white;
  font-weight: bold;
`

const CommandMenu = styled.View`
  padding-left: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

export default Board;
