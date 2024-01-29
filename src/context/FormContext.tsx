import {createContext, useState} from 'react';

const FormContext = createContext({
  Email: '',
  Password: '',
});

const FormProvider = ({children}) => {
  const [form, setForm] = useState({
    Email: '',
    Password: '',
  });

  const onChangeText = (value: string, name: string) => {
    setForm(prev => ({...prev, [name]: value}));
  };

  return (
    <FormContext.Provider></>
  )
};
