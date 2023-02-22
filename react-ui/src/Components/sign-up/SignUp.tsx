import { message } from 'antd';
import React, { useState } from 'react';
import { IUser, RoleEnum } from '../../Models/User';
import { saveNewUser } from '../../BusinessLogic/userActions';
import SuccessfulSignUp from './SuccessfulSignUp';
import SignUpForm from './SignUpForm';

const SignUp: React.FC = () => {
  const [submitLoading, setSubmitLoading] = useState(false);
  const [signUpCompleted, setSignUpCompleted] = useState(false);

  const onFinish = async (values: any) => {
    const newUser: IUser = {
      username: values.username,
      password: values.password,
      email: values.email,
      firstName: values.firstName,
      lastName: values.lastName,
      city: values.city,
      state: values.state,
      role: RoleEnum.User,
      verified: false,
      public: false,
      leagues: undefined,
      skillLevel: undefined
    }
    try {
      setSubmitLoading(true);
      await saveNewUser(newUser);
      setSignUpCompleted(true);
    } catch (error: any) {
      setSubmitLoading(false);
      message.error('Unable to create new user.');
    }
  };

  return (
    signUpCompleted ?
      <SuccessfulSignUp /> :
      <SignUpForm
        submitLoading={submitLoading}
        onFinish={onFinish}
      />
  );
}

export default SignUp