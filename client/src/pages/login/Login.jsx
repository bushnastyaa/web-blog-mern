import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import Input from '../../components/Input';
import AuthForm from '../../components/AuthForm';
import { apiPath } from '../../routes';

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required()
});

const Login = () => {
  const { register, formState: { errors }, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
    resolver: yupResolver(schema)
  })
  const auth = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      const response = await axios.post(`${apiPath}/auth/login`, values);
      localStorage.setItem('userInfo', JSON.stringify(response.data));
      auth.logIn();
      navigate('/');
    } catch (err) {
      throw err;
    }
  };

  const bodyContent = (
    <>
      <Input
        id="email"
        label="Email"
        type="email"
        placeholder="Email" 
        register={register}  
        errors={errors}
        required
      />
      <Input
        label="Password"
        type="password" 
        id="password" 
        placeholder="Password" 
        register={register}  
        errors={errors}
        required
      />
    </>
  );

  const footerContent = (
    <div className="mt-3">
      <p className="text-center font-montserrat text-slate-gray">
        No account? 
        <Link to='/register'>
          <span className="underline text-blue-500"> Register</span>
        </Link>
      </p>
    </div>
  );

  return (
    <AuthForm 
      onSubmit={handleSubmit(onSubmit)}
      title="Login"
      bodyContent={bodyContent}
      footerContent={footerContent}
    />
  )
};

export default Login;
