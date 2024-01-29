import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';
interface FormContextInterface {
  form: {
    Email: string;
    Password: string;
    isValidEmail: boolean;
    isValidPassword: boolean;
    isPasswordShown: boolean;
  };
  setForm: Dispatch<
    SetStateAction<{
      Email: string;
      Password: string;
      isValidEmail: boolean;
      isValidPassword: boolean;
      isPasswordShown: boolean;
    }>
  >;
  onChangeText: (value: string, name: string) => void;
}

const FormContext = createContext<FormContextInterface>({
  form: {
    Email: '',
    Password: '',
    isValidEmail: false,
    isValidPassword: false,
    isPasswordShown: false,
  },
  setForm: () => {},
  onChangeText: () => {},
});

interface FormProviderProps {
  children: ReactNode;
}

export const FormProvider = ({children}: FormProviderProps) => {
  const [form, setForm] = useState({
    Email: '',
    Password: '',
    isValidEmail: false,
    isValidPassword: false,
    isPasswordShown: false,
  });

  const onChangeText = (value: string, name: string) => {
    if (name === 'Email' && !value.includes('@gmail.com')) {
      setForm(prev => ({...prev, isValidEmail: false}));
    } else if (name === 'Password' && value.length < 8) {
      setForm(prev => ({...prev, isValidPassword: false}));
    } else if (name === 'Email' && value.includes('@gmail.com')) {
      setForm(prev => ({
        ...prev,
        [name]: value,
        isValidEmail: true,
      }));
    } else if (name === 'Password' && value.length >= 8) {
      setForm(prev => ({
        ...prev,
        [name]: value,
        isValidPassword: true,
      }));
    }
  };

  return (
    <FormContext.Provider value={{form, setForm, onChangeText}}>
      {children}
    </FormContext.Provider>
  );
};

export const UseFormContext = () => useContext(FormContext);
