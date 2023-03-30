import { useFormik } from 'formik';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/LogoTitle.png';

export const Login = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: (values) => {
      localStorage.setItem('organization_id', values.username);
      navigate('/dashboard');
    },
  });
  return (
    <div className="flex h-screen w-full place-items-center justify-center bg-slate-700">
      <div className="container flex h-96 w-5/12 flex-col items-center rounded-md bg-gray-800 py-4">
        <img className="w-72 " src={Logo} />
        <form onSubmit={formik.handleSubmit}>
          <div className="mt-8 flex flex-col items-center">
            <label className="text-pink-500">Usuario/Mail</label>
            <input
              id="username"
              values={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="mt-2 mb-5 w-64 rounded border-transparent bg-gray-700 p-2 text-white outline-2 outline-transparent ring-2 ring-transparent focus:border-purple-500 focus:outline-purple-500 focus:ring-purple-500"
              type="text"
            />
            <label className="text-pink-500">Contraseña</label>
            <input
              id="password"
              values={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="mt-2 mb-5 w-64 rounded border-transparent bg-gray-700 p-2 text-white outline-2 outline-transparent ring-2 ring-transparent focus:border-purple-500 focus:outline-purple-500 focus:ring-purple-500"
              type="password"
            />
          </div>
          <div className="mt-4 flex w-80 flex-row justify-evenly">
            <button
              className="w-28 rounded-full border-2 border-purple-500 px-4 py-2 text-purple-500 "
              onClick={() => {
                handleBack();
              }}
            >
              Regresar
            </button>
            <button
              type="submit"
              className="w-28 rounded-full border-2 border-purple-500 px-4 py-2 text-purple-500 "
            >
              Ingresar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
