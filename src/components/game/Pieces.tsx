import React from 'react';
import Piece from './Piece';
import {Shape} from '../../logic/Block';

import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import {COLORS} from '../../Constants';

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
  margin: 4px 0 0;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 95%;
  background-color: ${COLORS.white};
  border-radius: 2px;
  padding: 2px;
  border: 1px solid ${COLORS.lightgray};
`

export default Pieces;
