import {
  Main,
  ContactForm,
  LabelForm,
  FieldForm,
  ErrorMsg,
  Buttons,
} from '../phoneBook/contactForm/contactForm.styled';
import toast, { Toaster } from 'react-hot-toast';
import { getRegisterSchema } from 'redux/auth/validation';
import { useDispatch } from 'react-redux';
import { signUp } from 'redux/auth/auth-operations';
import { Heading } from '@chakra-ui/react';
import { useAuthUser } from 'hooks/useAuthUser';

const Registration = () => {
  const dispatch = useDispatch();
  const registerSchema = getRegisterSchema();

  const { userName } = useAuthUser();

  const handleSubmit = (values, { resetForm }) => {
    const { name, email, password } = values;

    if (userName) {
      toast.error(`Email with name ${name} already exists.`);
      resetForm();
      return;
    }

    dispatch(signUp({ name, email, password }));

    toast.success(`Your account with name ${name}, succesfully created`);
    resetForm();
  };

  return (
    <>
      <Heading as="h2" size="xl" marginBottom={10}>
        Registration
      </Heading>
      <Main
        initialValues={{ name: '', email: '', password: '' }}
        validationSchema={registerSchema}
        onSubmit={handleSubmit}
      >
        <ContactForm>
          <LabelForm htmlFor="name">
            Name
            <FieldForm
              type="text"
              name="name"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
            />
            <ErrorMsg name="name" component="p" required />
          </LabelForm>

          <LabelForm htmlFor="email">
            Email
            <FieldForm name="email" required />
            <ErrorMsg name="email" component="p" />
          </LabelForm>

          <LabelForm htmlFor="password">
            Password
            <FieldForm type="password" name="password" required />
            <ErrorMsg name="password" component="p" />
          </LabelForm>

          <Buttons type="submit">Sign up</Buttons>
          <Toaster />
        </ContactForm>
      </Main>
    </>
  );
};

export default Registration;
