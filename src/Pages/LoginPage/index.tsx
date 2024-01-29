import {Alert, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import styled from 'styled-components/native';

import User from '../../assets/User.png';
import InputButton from '../../components/CustomButton';
import Input from '../../components/Input';
import {UseFormContext} from '../../context/FormContext.tsx';
import {register, RegisterDataInterface} from '../RegisterPage/data.ts';
import {styles} from '../../styles.ts';

const LoginPage = () => {
  const {form} = UseFormContext();
  const {navigate} = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const {isValidPassword, isValidEmail} = form;
  const handleLogin = async () => {
    try {
      const storedEmail = await AsyncStorage.getItem('Email');
      const storedPassword = await AsyncStorage.getItem('Password');

      if (form.Email === storedEmail && form.Password === storedPassword) {
        await AsyncStorage.setItem('isUserLoggedIn', 'true');
        navigate('Home', {email: storedEmail});
      } else {
        Alert.alert('User does not exist');
        navigate('Register');
      }
    } catch (error) {
      console.error('Помилка при вході:', error);
    }
  };
  return (
    <LinearGradient
      colors={['#EB0057', '#1D1D1D', '#FFFFFF']}
      style={styles.gradientContainer}
      start={{x: -2.5, y: -0.1}}
      end={{x: 1.5, y: -1.5}}>
      <IconImage source={User} />
      <HeaderTextContainer>
        <HeaderText>LOGIN</HeaderText>
        <HeaderDescriptionText>
          Enter your login password from your account
        </HeaderDescriptionText>
      </HeaderTextContainer>
      {register.map((item: RegisterDataInterface) => (
        <Input
          key={item.id}
          item={item}
          brdColor={
            item.name === 'Email'
              ? isValidEmail
                ? '#262727'
                : 'red'
              : isValidPassword
              ? '#262727'
              : 'red'
          }
        />
      ))}
      <InputButton
        onPress={handleLogin}
        text="Sign Up"
        shadowOpacity={1}
        isValid={isValidPassword && isValidPassword}
      />
      <BottomTextContainer>
        <BottomText>Don't have an account? </BottomText>
        <TouchableOpacity onPress={() => navigate('Register')}>
          <BottomTouchableText>Sign up</BottomTouchableText>
        </TouchableOpacity>
      </BottomTextContainer>
    </LinearGradient>
  );
};

const IconImage = styled.Image`
  height: 70px;
  width: 70px;
  margin-left: 100px;
  margin-bottom: 35px;
`;

const HeaderTextContainer = styled.View`
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
`;
const HeaderText = styled.Text`
  color: #ffffff;
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 8px;
`;

const HeaderDescriptionText = styled.Text`
  color: #818181;
  font-size: 11px;
  font-weight: 400;
  text-align: center;
`;

const BottomTextContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 30px;
  padding-top: 30px;
`;

const BottomText = styled.Text`
  font-size: 11px;
  font-weight: 400;
  line-height: 14px;
`;

const BottomTouchableText = styled.Text`
  color: #eb0057;
  font-size: 11px;
  font-weight: 400;
  line-height: 14px;
  border-bottom-width: 0.5px;
  border-color: #eb0057;
`;

export default LoginPage;
