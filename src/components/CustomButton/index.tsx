import {useRef} from 'react';
import {Animated, Easing} from 'react-native';
import DropShadow from 'react-native-drop-shadow';

import styled from 'styled-components/native';

interface CustomButtonProps {
  onPress: () => void;
  text: string;
  shadowOpacity: number;
  isValid?: boolean;
}

const CustomButton = ({
  onPress,
  text,
  shadowOpacity,
  isValid = true,
}: CustomButtonProps) => {
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
        <Button onPress={handlePress}>
          <Animated.View style={style}>
            <ButtonText>{text}</ButtonText>
          </Animated.View>
        </Button>
      </ButtonContainer>
    </DropShadow>
  );
};

const Button = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  background-color: ${(props: {theme: {register: string}}) =>
    props.theme.register};
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

Button.defaultProps = {
  theme: {
    register: '#EB0057',
  },
};

export default CustomButton;
