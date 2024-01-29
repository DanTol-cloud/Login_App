import styled from 'styled-components';

import SvgEmailIcon from '../../icons/Email.tsx';
import SvgEyeIcon from '../../icons/Eye.tsx';
import SvgLockIcon from '../../icons/Lock.tsx';
import {styles} from './styles.ts';

const Input = ({item}) => {
  return (
    <InputContainer key={item.id}>
      {item.name === 'Email' ? (
        <SvgEmailIcon style={styles.icons} />
      ) : (
        <SvgLockIcon style={styles.icons} />
      )}
      <Input
        textContentType={item.type}
        placeholder={item.name}
        value={form[item.id]}
        onChangeText={(value: string) => onChangeText(value, item.name)}
      />
      {item.name === 'Password' && <SvgEyeIcon style={styles.icons} />}
    </InputContainer>
  );
};

const InputContainer = styled.View`
  flex-direction: row;
`;

const Input = styled.TextInput`
  flex: 1;
  background-color: #262727;
  border-width: 1px;
  border-radius: 8px;
  margin-bottom: 10px;
  color: #818181;
`;

export default Input;
