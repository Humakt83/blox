import React from 'react';
import styled from 'styled-components/native';
import { StyleSheet, } from 'react-native';
import { COLORS, PLAYER_COLOR_MAP } from '../../Constants';

import Animated, {
  withTiming,
  withRepeat,
  useAnimatedStyle,
  withSequence,
  Easing
} from 'react-native-reanimated';

export enum SquareSizes {
  XS, S, M
}

export const COLOR_MAP = [COLORS.white].concat(PLAYER_COLOR_MAP) ;

const convertSize = (size: SquareSizes) : number => {
  switch(size) {
    case SquareSizes.XS:
      return 6;
    case SquareSizes.S: 
      return 12;
    default:
      return 30;
  }
}

type Props = {
  x?: number,
  y?: number,
  color?: number,
  movable?: boolean,
  dragStartFn?: Function,
  squareSize?: SquareSizes
}

const Square: React.FC<Props> = ({x, y, color = 0, movable = false, dragStartFn, squareSize = SquareSizes.M}) => {

  const opacity = color === -1 ? 0 : 1;
  const size = convertSize(squareSize) ;

  const glimmer = useAnimatedStyle(() => {
    return {
      opacity: withRepeat(withSequence(withTiming(1, {
        duration: 2000,
        easing: Easing.inOut(Easing.cubic)}),
        withTiming(0, {
          duration: 2000,
          easing: Easing.inOut(Easing.cubic)
        })), -1, true),
      marginLeft: withRepeat(withSequence(withTiming(5, {
        duration: 1000,
        easing: Easing.inOut(Easing.cubic)}),
        withTiming(20, {
          duration: 1000,
          easing: Easing.inOut(Easing.cubic)
        })), -1, true),
      marginTop: withRepeat(withSequence(withTiming(3, {
        duration: 1000,
        easing: Easing.inOut(Easing.cubic)}),
        withTiming(10, {
          duration: 1000,
          easing: Easing.inOut(Easing.cubic)
        })), -1, true)
    };
  });

  const Container = styled.View`
    opacity: ${opacity};
    width: ${size}px;
    height: ${size}px;
  `;
  
  const View = styled.View`
    border: 1px solid ${COLORS.black};
    position: absolute;
    z-index: 1;
    width: ${size}px;
    height: ${size}px;
    background: ${movable? COLORS.yellow : COLOR_MAP[Math.max(0, color)]};
    padding-left: ${size / 3}px;
    opacity: ${opacity};
  `;

  const GradientA = styled.View`
    z-index: 3;
    width: ${size / 3}px;
    height: ${size}px;
    background: ${COLORS.white};
    opacity: 0.6;
    position: absolute;
  `;

  const GradientB = styled.View`
    z-index: 2;
    width: ${size * 2 / 3}px;
    height: ${size}px;
    background: ${COLORS.white};
    opacity: 0.3;
    position: absolute;
  `;

  const styles = StyleSheet.create({
    glimmer: {
      opacity: 0,
      zIndex: 4,
      width: size / 2,
      height: size / 2,
      borderRadius: 45,
      backgroundColor: COLORS.white,
      marginLeft: 5,
      marginTop: 3,
      position: 'absolute'
    }
  });

  const animation = !movable && color > 0 && squareSize === SquareSizes.M? <Animated.View style={[styles.glimmer, glimmer]} /> : <></>;

  return (
    <Container>
      <View onTouchStart={() => {
        if (dragStartFn) {
          dragStartFn(x, y);
        }
      }}>
        <GradientB>
          <GradientA>
            {/* { animation } */}
          </GradientA>
        </GradientB>
      </View>
    </Container>
  );
};

export default Square;
