import {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import styled from 'styled-components/native';

import Letter from '../../assets/LetterR.png';
import InputButton from '../../components/CustomButton';
import {UseFormContext} from '../../context/FormContext.tsx';
import {styles} from '../../styles.ts';

const HomePage = ({route}) => {
  const {email} = route.params;
  const [userEmail, setUserEmail] = useState<string | null>('');
  const {setForm} = UseFormContext();
  const {navigate} = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const handleLogout = async () => {
    setForm(prev => ({...prev, isValidEmail: false, isValidPassword: false}));
    try {
      await AsyncStorage.removeItem('isUserLoggedIn');
      navigate('Main');
    } catch (error) {
      console.error('Помилка при виході:', error);
    }
  };

  useEffect(() => {
    const handleEmail = async () => {
      const storedEmail = await AsyncStorage.getItem('Email');

      email ? setUserEmail(email) : setUserEmail(storedEmail);
    };

    handleEmail();
  }, [email]);

  return (
    <Container>
      <LinearGradient
        colors={['#EB0057', '#1D1D1D', '#FFFFFF']}
        style={styles.gradientContainer}
        start={{x: -2.5, y: -0.1}}
        end={{x: 1.5, y: -1.5}}>
        <BgImg source={Letter}>
          <TextContainer>
            <HeaderText>You’re logged in now </HeaderText>
            <Name>{userEmail}</Name>
            <ContentContainer>
              <ContentText>Now you can see the app content!</ContentText>
            </ContentContainer>
          </TextContainer>

          <InputButton
            onPress={handleLogout}
            text={'Log out'}
            shadowOpacity={1}
          />
        </BgImg>
      </LinearGradient>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;

const TextContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
`;

const HeaderText = styled.Text`
  color: #818181;
  margin-bottom: 8px;
`;

const Name = styled.Text`
  color: #fff;
  font-size: 18px;
  font-weight: 600;
`;

const ContentContainer = styled.View`
  align-items: center;
  justify-content: center;
`;

const ContentText = styled.Text`
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
  color: #fff;
  padding-top: 60px;
`;

const BgImg = styled.ImageBackground`
  flex: 1;
  width: 100%;
  align-items: center;
`;
export default HomePage;
