import {Alert, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import axios from 'axios';
import styled from 'styled-components/native';

import User from '../../assets/User.png';
import InputButton from '../../components/CustomButton';
import Input from '../../components/Input';
import {UseFormContext} from '../../context/FormContext.tsx';
import {styles} from '../../styles.ts';
import {register, RegisterDataInterface} from './data.ts';
const RegisterPage = () => {
  const {form} = UseFormContext();
  const {navigate} = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const {isValidPassword, isValidEmail} = form;

  const handleRegistration = async () => {
    try {
      const storedEmail = await AsyncStorage.getItem('Email');
      const storedPassword = await AsyncStorage.getItem('Password');

      if (form.Email === storedEmail && form.Password === storedPassword) {
        Alert.alert('User with this Email, already exists');
        navigate('Login');
      } else {
        await AsyncStorage.setItem('Email', form.Email);
        await AsyncStorage.setItem('Password', form.Password);
        await AsyncStorage.setItem('isUserLoggedIn', 'true');

        const userData = {
          name: form.Email,
          username: form.Email,
          email: form.Email,
          password: form.Password,
          address: {
            street: 'Kulas Light',
            suite: 'Apt. 556',
            city: 'Gwenborough',
            zipcode: '92998-3874',
            geo: {
              lat: '-37.3159',
              lng: '81.1496',
            },
          },
          phone: '1-770-736-8031 x56442',
          website: 'hildegard.org',
          company: {
            name: 'Romaguera-Crona',
            catchPhrase: 'Multi-layered client-server neural-net',
            bs: 'harness real-time e-markets',
          },
        };

        await axios.post(
          'https://jsonplaceholder.typicode.com/users',
          userData,
        );

        navigate('Home', {email: form.Email});
      }
    } catch (error) {
      console.error('Something went wrong while registration', error);
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
        <HeaderText>SIGN UP</HeaderText>
        <HeaderDescriptionText>
          Create your email and password for your account
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
        onPress={handleRegistration}
        text="Sign Up"
        shadowOpacity={1}
        isValid={isValidEmail && isValidPassword}
      />
      <BottomTextContainer>
        <BottomText>Already have an account? </BottomText>
        <TouchableOpacity onPress={() => navigate('Login')}>
          <BottomTouchableText>Log in</BottomTouchableText>
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

export default RegisterPage;
