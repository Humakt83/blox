import React from 'react';
import Piece from './Piece';
import {Shape} from '../logic/Block';

import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';

type Props = {
  clickFn?: Function,
  shapes: Shape[],
  aiPieces?: boolean
}

const Pieces: React.FC<Props> = ({clickFn = () => null, shapes, aiPieces = false}) => {

  return (
    <View>
      {
        shapes
          .map((piece: Shape, index: number) => {
            return (
              <TouchableOpacity 
                  onPress={() => clickFn(piece)}
                  key={`piece-${index}`}>
                <Piece 
                  shape={piece}                                              
                  aiPiece={aiPieces}/>
              </TouchableOpacity>
            )
          })
      }
    </View>
  );
};

const View = styled.View`
  margin-top: 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
`

export default Pieces;
