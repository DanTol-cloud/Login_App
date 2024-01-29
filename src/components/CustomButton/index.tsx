import {useRef} from 'react';
import {Animated, Easing} from 'react-native';
import DropShadow from 'react-native-drop-shadow';

import styled from 'styled-components/native';

interface InputButton {
  onPress: () => void;
  text: string;
  bgColor: string;
  shadowOpacity: number;
  isValid?: boolean;
}

const InputButton = ({
  onPress,
  text,
  bgColor,
  shadowOpacity,
  isValid = true,
}: InputButton) => {
  const animation = useRef(new Animated.Value(0)).current;
  const interpolated = animation.interpolate({
    inputRange: [0, 0.5, 1, 1.5, 2, 2.5, 3],
    outputRange: [0, -15, 0, 15, 0, -15, 0],
  });

  const style = {
    transform: [{translateX: interpolated}],
  };

  const triggerAnimation = () => {
    animation.setValue(0);
    Animated.timing(animation, {
      duration: 500,
      toValue: 3,
      easing: Easing.bounce,
      useNativeDriver: true,
    }).start();
  };

  const handlePress = () => {
    if (isValid) {
      onPress();
    } else {
      triggerAnimation();
    }
  };

  return (
    <DropShadow
      style={{
        shadowColor: '#EB005780',
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: shadowOpacity,
        shadowRadius: 5,
      }}>
      <ButtonContainer>
        <CustomButton onPress={handlePress} bgColor={bgColor}>
          <Animated.View style={style}>
            <ButtonText>{text}</ButtonText>
          </Animated.View>
        </CustomButton>
      </ButtonContainer>
    </DropShadow>
  );
};

const CustomButton = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  background-color: ${(props: {bgColor: string}) => props.bgColor};
  border-radius: 8px;
  margin: 0 35px 15px 35px;
`;

const ButtonText = styled.Text`
  font-size: 12px;
  text-align: center;
  font-family: sans-serif;
  font-weight: 700;
  padding: 20px;
  color: #ffffff;
`;

const ButtonContainer = styled.View`
  align-self: center;
  flex-direction: row;
`;

export default InputButton;
