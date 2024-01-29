import {useEffect} from 'react';
import {Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ThemeProvider} from 'styled-components';
import styled from 'styled-components/native';

import Logo from '../../assets/Logo.png';
import InputButton from '../../components/CustomButton';
import {buttons, ButtonsInterface} from './data.ts';
import {styles} from '../../styles.ts';

const MainPage = () => {
  const {navigate, replace} =
    useNavigation<NativeStackNavigationProp<ParamListBase>>();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const isUserLoggedIn = await AsyncStorage.getItem('isUserLoggedIn');

        if (isUserLoggedIn === 'true') {
          replace('Home');
        }
      } catch (error) {
        console.error('Помилка при перевірці входу:', error);
      }
    };

    checkLoginStatus();
  }, [replace]);

  return (
    <LinearGradient
      colors={['#EB0057', '#1D1D1D', '#FFFFFF']}
      style={styles.gradientContainer}
      start={{x: -2, y: 0.5}}
      end={{x: 2, y: -1}}>
      <LogoImgContainer>
        <Image source={Logo} />
      </LogoImgContainer>
      {buttons.map((item: ButtonsInterface) =>
        item.name === 'Register' ? (
          <ThemeProvider key={item.id} theme={{register: '#1D1D1D'}}>
            <InputButton
              onPress={() => navigate(item.name)}
              text={item.name}
              shadowOpacity={0}
            />
          </ThemeProvider>
        ) : (
          <InputButton
            key={item.id}
            onPress={() => navigate(item.name)}
            text={item.name}
            shadowOpacity={1}
          />
        ),
      )}
    </LinearGradient>
  );
};

const LogoImgContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export default MainPage;
