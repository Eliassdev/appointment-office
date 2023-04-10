// React Router Dom
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useGetServiceByIdQuery,
  useUpdateServiceMutation,
} from '../../redux/modular/api/services.slice';
import { serviceValidation } from '../../schemas/services.schema';

export const ServiceUpdate = () => {
  const [InAnimation, setInAnimation] = useState(true);
  const [OutAnimation, setOutAnimation] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  const navigateOut = () => {
    setOutAnimation(true);
    setTimeout(() => {
      navigate('/dashboard/services');
    }, 1000);
  };

  const { data: ser, isLoading, isSuccess } = useGetServiceByIdQuery(id);
  const [
    UpdateService,
    {
      isLoading: isLoadingUpdate,
      isError: isErrorUpdate,
      isSuccess: isSuccessUpdate,
    },
  ] = useUpdateServiceMutation();

  const formik = useFormik({
    initialValues: {
      service_name: ser?.service_name,
      service_duration: ser?.service_duration,
      service_price: ser?.service_price,
    },
    onSubmit: async (values) => {
      let body = values;
      const request = {
        id: id,
        info: body,
      };

      UpdateService(request);
      setTimeout(() => {
        navigateOut(-1);
      }, 500);
    },
    validate: (values) => {
      const result = serviceValidation.safeParse(values);
      if (result.success) return;
      if (result.error.issues) {
        const errors = {};
        result.error.issues.map((err) => {
          errors[err.path[0]] = err.message;
        });
        return errors;
      }
    },
  });

  return (
    <div
      className={` ${
        InAnimation
          ? 'flex h-screen w-full bg-neutral-800 px-12 animate-in slide-in-from-right duration-1000'
          : 'hidden'
      } ${
        OutAnimation
          ? 'flex h-screen w-full bg-neutral-800 px-12 animate-out slide-out-to-left duration-1000'
          : null
      }`}
    >
      <div className=" w-full py-8">
        <form
          onSubmit={formik.handleSubmit}
          className="flex h-auto w-full flex-col bg-neutral-900 px-10 pb-4 pt-4"
        >
          <legend className="pl-4 text-center text-2xl font-bold text-purple-500">
            Editar datos del servicio
          </legend>
          <div className=" mt-2 grid grid-cols-2">
            <div>
              <div className="mb-2 flex flex-col px-4">
                <label className="mb-1 text-neutral-100" htmlFor="short_name">
                  Nombre del Servicio
                </label>
                <input
                  name="service_name"
                  type="text"
                  id="service_name"
                  className=" h-8 w-full rounded border-transparent bg-neutral-700  p-2 text-white outline-2 outline-transparent ring-2 ring-transparent focus:border-purple-500 focus:outline-purple-500 focus:ring-purple-500"
                  value={formik.values.service_name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />

                {formik.touched.service_name &&
                formik.errors.service_name &&
                InAnimation ? (
                  <span
                    className={`${OutAnimation ? 'hidden' : 'text-red-600'}`}
                  >
                    {formik.errors.service_name}
                  </span>
                ) : null}
              </div>
              <div className="mb-2 flex flex-col px-4">
                <label className="mb-1 text-neutral-100" htmlFor="country">
                  Duracion del Servicio
                </label>
                <input
                  name="service_duration"
                  id="service_duration"
                  type="number"
                  className="h-8 w-full rounded border-transparent bg-neutral-700  p-2 text-white outline-2 outline-transparent ring-2 ring-transparent focus:border-purple-500 focus:outline-purple-500 focus:ring-purple-500"
                  value={formik.values.service_duration}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                ></input>
                {formik.touched.service_duration &&
                formik.errors.service_duration &&
                InAnimation ? (
                  <span
                    className={`${OutAnimation ? 'hidden' : 'text-red-600'}`}
                  >
                    {formik.errors.service_duration}
                  </span>
                ) : null}
              </div>
              <div className="mb-2 flex flex-col px-4">
                <label className="mb-1 text-neutral-100" htmlFor="state">
                  Precio del Servicio
                </label>
                <input
                  name="service_price"
                  id="service_price"
                  type="number"
                  className="h-8 w-full rounded border-transparent bg-neutral-700  p-2 text-white outline-2 outline-transparent ring-2 ring-transparent focus:border-purple-500 focus:outline-purple-500 focus:ring-purple-500"
                  value={formik.values.service_price}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />

                {formik.touched.service_price &&
                formik.errors.service_price &&
                InAnimation ? (
                  <span
                    className={`${OutAnimation ? 'hidden' : 'text-red-600'}`}
                  >
                    {formik.errors.service_price}
                  </span>
                ) : null}
              </div>
            </div>
          </div>
          <div className="flex flex-row">
            <button
              className="text-md ml-4 mt-4 w-32 rounded-full border border-purple-600 px-4 py-2 text-purple-600  disabled:border-neutral-400 disabled:text-neutral-400"
              disabled={!formik.isValid}
              type={'submit'}
            >
              Enviar
            </button>
            <button
              className="text-md ml-4 mt-4 w-32 rounded-full border border-purple-600 px-4 py-2 text-purple-600 disabled:bg-slate-600"
              onClick={() => {
                navigate(-1);
              }}
            >
              Regresar
            </button>
          </div>
        </form>
        <div
          className={`mt-4 flex h-auto w-full flex-col px-10 pb-4 pt-4 ${
            !isLoadingUpdate && !isSuccessUpdate
              ? 'transparent'
              : ' bg-neutral-900'
          }`}
        >
          {isLoadingUpdate ? <p className="text-yellow-300">Enviando</p> : null}
          {isSuccessUpdate ? (
            <p className="text-green-500">Creado con exito</p>
          ) : null}
        </div>
      </div>
    </div>
  );
};
