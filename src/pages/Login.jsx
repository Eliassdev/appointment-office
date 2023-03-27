import { useFormik } from 'formik';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/LogoTitle.png';
import NavBar from '../components/NavBar/NavBar';
import { useFetchOrganizationByIdQuery } from '../redux/modular/api/orgSlice';

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
    <div className="w-full h-screen flex bg-slate-700 place-items-center justify-center">
      <div className="container flex flex-col w-5/12 h-96 bg-gray-800 py-4 items-center rounded-md">
        <img className="w-72 " src={Logo} />
        <form onSubmit={formik.handleSubmit}>
          <div className="flex flex-col items-center mt-8">
            <label className="text-pink-500">Usuario/Mail</label>
            <input
              id="username"
              values={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="mt-2 mb-5 w-64 bg-gray-700 border-transparent text-white outline-transparent ring-transparent rounded p-2 ring-2 outline-2 focus:border-purple-500 focus:outline-purple-500 focus:ring-purple-500"
              type="text"
            />
            <label className="text-pink-500">Contraseña</label>
            <input
              id="password"
              values={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="mt-2 mb-5 w-64 bg-gray-700 border-transparent text-white outline-transparent ring-transparent rounded p-2 ring-2 outline-2 focus:border-purple-500 focus:outline-purple-500 focus:ring-purple-500"
              type="password"
            />
          </div>
          <div className="flex flex-row w-80 justify-evenly mt-4">
            <button
              className="border-2 border-purple-500 text-purple-500 rounded-full w-28 px-4 py-2 "
              onClick={() => {
                handleBack();
              }}
            >
              Regresar
            </button>
            <button
              type="submit"
              className="border-2 border-purple-500 text-purple-500 rounded-full w-28 px-4 py-2 "
            >
              Ingresar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
