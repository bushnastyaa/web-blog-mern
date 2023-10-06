import { useNavigate, Link } from 'react-router-dom';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from 'react-hook-form';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import Input from '../../components/Input';
import AuthForm from '../../components/AuthForm';

const schema = yup.object().shape({
  username: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(5).required()
});

const Register = () => {
  const { register, formState: { errors }, handleSubmit } = useForm({
    defaultValues: {
      username: '',
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
      const response = await axios.post('http://localhost:5000/api/auth/register', values);
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
        id="username" 
        type="text" 
        label="Username"
        placeholder="Username" 
        register={register}  
        errors={errors}
        required
      />
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
        Have an account? 
        <Link to='/login'>
          <span className="underline text-blue-500"> Login</span>
        </Link>
      </p>
    </div>
  );

  return (
    <AuthForm 
      onSubmit={handleSubmit(onSubmit)}
      title="Register"
      bodyContent={bodyContent}
      footerContent={footerContent}
    />
  )
};

export default Register;
