import {TouchableOpacity} from 'react-native';

import styled from 'styled-components/native';

import SvgEmailIcon from '../../assets/icons/Email.tsx';
import SvgEyeIcon from '../../assets/icons/Eye.tsx';
import SvgLockIcon from '../../assets/icons/Lock.tsx';
import {UseFormContext} from '../../context/FormContext.tsx';
import {RegisterDataInterface} from '../../Pages/RegisterPage/data.ts';

interface InputInterface {
  item: RegisterDataInterface;
  brdColor: string;
}

const Input = ({item, brdColor}: InputInterface) => {
  const {form, onChangeText, setForm} = UseFormContext();
  const {isValidEmail, isPasswordShown} = form;
  return (
    <InputContainer brdColor={brdColor}>
      {item.name === 'Email' ? (
        <SvgEmailIcon color={isValidEmail ? '#262727' : '#EB0057'} />
      ) : (
        <SvgLockIcon color={isValidEmail ? '#262727' : '#EB0057'} />
      )}
      <InputForm
        placeholder={item.name}
        secureTextEntry={item.name === 'Password' && !isPasswordShown}
        value={form[item.id]}
        onChangeText={(value: string) => onChangeText(value, item.name)}
      />
      {item.name === 'Password' && (
        <TouchableOpacity
          onPress={() =>
            setForm(prev => ({...prev, isPasswordShown: !prev.isPasswordShown}))
          }>
          <SvgEyeIcon color={isValidEmail ? '#262727' : '#EB0057'} />
        </TouchableOpacity>
      )}
    </InputContainer>
  );
};

const InputContainer = styled.View`
  flex-direction: row;
  border-width: 1px;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border-color: ${(props: {brdColor: string}) => props.brdColor};
  margin: 12px;
`;

const InputForm = styled.TextInput`
  flex: 1;
  text-align: left;
  margin-top: 10px;
  margin-bottom: 10px;
  color: #818181;
`;

export default Input;
