import React from 'react';
import styled from 'styled-components/native';

type Props = {
  clickFn: Function,
  text: string
}

const ActionButton: React.FC<Props> = ({clickFn, text}) => {

  return (
    <Button onPress={() => clickFn()}>
        <ButtonText>{text}</ButtonText>
    </Button>
  );
};

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

export default ActionButton;
