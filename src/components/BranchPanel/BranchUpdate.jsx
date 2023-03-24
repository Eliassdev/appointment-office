import { City, Country, State } from 'country-state-city';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useGetBranchByIdQuery,
  useUpdateBranchMutation,
} from '../../redux/modular/api/orgSlice';
import { branchValidation } from '../../schemas/branch.schema';
import CreationNav from '../CreationNav/CreationNav';

export const BranchUpdate = () => {
  const [countries, setCountries] = useState(null);
  const [states, setStates] = useState(null);
  const [selectedCountry, selectedCountrySet] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const allCountries = Country.getAllCountries();

  const { data: bra, isLoading, isSuccess } = useGetBranchByIdQuery(id);
  const [
    UpdateBranch,
    {
      isLoading: isLoadingUpdate,
      isError: isErrorUpdate,
      isSuccess: isSuccessUpdate,
    },
  ] = useUpdateBranchMutation();

  const formik = useFormik({
    initialValues: {
      branch_name: bra?.branch_name,
      organization_id: bra?.organization_id,
      country: bra?.country,
      state: bra?.state,
      city: bra?.city,
      street: bra?.street,
      address: bra?.address,
      postal_code: bra?.postal_code,
      address_references: bra?.address_references,
      business_phone: bra?.business_phone,
      email: bra?.email,
      latitude: bra?.latitude,
      longitude: bra?.longitude,
      created_by: bra?.created_by,
      updated_by: bra?.updated_by,
    },
    onSubmit: async (values) => {
      let body = values;
      let countryName = countries.find(
        (country) => country.isoCode === body.country
      );
      let stateName = states.find((state) => state.isoCode === body.state);
      body.country = countryName.name;
      body.state = stateName.name;
      const request = {
        id: id,
        info: body,
      };

      UpdateBranch(request);
    },
    validate: (values) => {
      const result = branchValidation.safeParse(values);
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

  useEffect(() => {
    if (!countries) {
      setCountries(allCountries);
    }
    if (formik.values.country !== null) {
      setTimeout(() => {
        selectedCountrySet(formik.values.country);
      }, 500);
      let countryStates = State.getStatesOfCountry(selectedCountry);
      setStates(countryStates);
    }
    if (isSuccessUpdate) {
      setTimeout(() => {
        navigate('/dashboard/branches');
      }, 1000);
    }
  }, [formik.values.country, selectedCountry, isSuccess]);
  return (
    <div className=" bg-neutral-800 h-screen w-full flex px-12">
      <CreationNav />
      <div className="w-full  ml-56 py-8">
        <form
          onSubmit={formik.handleSubmit}
          className="w-full flex flex-col h-auto px-10 pt-4 pb-4 bg-neutral-900"
        >
          <legend className="font-bold text-2xl text-center pl-4 text-purple-500">
            Editar datos de la sucursal
          </legend>
          <div className=" grid grid-cols-2 mt-2">
            <div>
              <div className="flex flex-col px-4 mb-2">
                <label className="mb-1 text-neutral-100" htmlFor="short_name">
                  Nombre Corto
                </label>
                <input
                  name="branch_name"
                  type="text"
                  id="branch_name"
                  className=" bg-neutral-700 border-transparent text-white outline-transparent ring-transparent  w-full h-8 rounded p-2 ring-2 outline-2 focus:border-purple-500 focus:outline-purple-500 focus:ring-purple-500"
                  value={formik.values.branch_name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />

                {formik.touched.branch_name && formik.errors.branch_name ? (
                  <span className="text-red-600">
                    {formik.errors.branch_name}
                  </span>
                ) : null}
              </div>
              <div className="flex flex-col px-4 mb-2">
                <label className="mb-1 text-neutral-100" htmlFor="country">
                  Pais
                </label>
                <select
                  name="country"
                  id="country"
                  className="bg-neutral-700 border-transparent text-white outline-transparent ring-transparent  w-full h-8 rounded ring-2 outline-2 focus:border-purple-500 focus:outline-purple-500 focus:ring-purple-500"
                  value={formik.values.country}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option defaultValue={''}>Selecciona una opcion</option>
                  {countries &&
                    countries.map((country, index) => (
                      <option
                        value={country.isoCode}
                        id={country.isoCode}
                        key={`${index}-${country.code}`}
                      >
                        {country.name}
                      </option>
                    ))}
                </select>
                {formik.touched.country && formik.errors.country ? (
                  <span className="text-red-600">{formik.errors.country}</span>
                ) : null}
              </div>
              <div className="flex flex-col px-4 mb-2">
                <label className="mb-1 text-neutral-100" htmlFor="state">
                  Provincia
                </label>
                <select
                  name="state"
                  id="state"
                  className="bg-neutral-700 border-transparent text-white outline-transparent ring-transparent  w-full h-8 rounded ring-2 outline-2 focus:border-purple-500 focus:outline-purple-500 focus:ring-purple-500"
                  value={formik.values.state}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option defaultValue={''}>Selecciona una opcion</option>
                  {states &&
                    states.map((state, index) => (
                      <option
                        value={state.isoCode}
                        key={`${index}-${state.isoCode}`}
                      >
                        {state.name}
                      </option>
                    ))}
                </select>
                {formik.touched.state && formik.errors.state ? (
                  <span className="text-red-600">{formik.errors.state}</span>
                ) : null}
              </div>
              <div className="flex flex-col px-4 mb-2">
                <label className="mb-1 text-neutral-100" htmlFor="city">
                  Ciudad
                </label>
                <input
                  name="city"
                  id="city"
                  type="text"
                  className="bg-neutral-700 border-transparent text-white outline-transparent ring-transparent  w-full h-8 rounded p-2 ring-2 outline-2 focus:border-purple-500 focus:outline-purple-500 focus:ring-purple-500"
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.city && formik.errors.city ? (
                  <span className="text-red-600">{formik.errors.city}</span>
                ) : null}
              </div>
              <div className="flex flex-col px-4 mb-2">
                <label className="mb-1 text-neutral-100" htmlFor="street">
                  Calle
                </label>
                <input
                  name="street"
                  type="text"
                  id="street"
                  className="bg-neutral-700 border-transparent text-white outline-transparent ring-transparent  w-full h-8 rounded p-2 ring-2 outline-2 focus:border-purple-500 focus:outline-purple-500 focus:ring-purple-500"
                  value={formik.values.street}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.street && formik.errors.street ? (
                  <span className="text-red-600">{formik.errors.street}</span>
                ) : null}
              </div>
            </div>
            <div>
              <div className="flex flex-col px-4 mb-2">
                <label className="mb-1 text-neutral-100" htmlFor="address">
                  Direccion
                </label>
                <input
                  name="address"
                  type="text"
                  id="address"
                  className="bg-neutral-700 border-transparent text-white outline-transparent ring-transparent  w-full h-8 rounded p-2 ring-2 outline-2 focus:border-purple-500 focus:outline-purple-500 focus:ring-purple-500"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.address && formik.errors.address ? (
                  <span className="text-red-600">{formik.errors.address}</span>
                ) : null}
              </div>
              <div className="flex flex-col px-4 mb-2">
                <label className="mb-1 text-neutral-100" htmlFor="postal_code">
                  CP
                </label>
                <input
                  name="postal_code"
                  type="text"
                  id="postal_code"
                  className="bg-neutral-700 border-transparent text-white outline-transparent ring-transparent  w-full h-8 rounded p-2 ring-2 outline-2 focus:border-purple-500 focus:outline-purple-500 focus:ring-purple-500"
                  value={formik.values.postal_code}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.postal_code && formik.errors.postal_code ? (
                  <span className="text-red-600">
                    {formik.errors.postal_code}
                  </span>
                ) : null}
              </div>
              <div className="flex flex-col px-4 mb-2">
                <label
                  className="mb-1 text-neutral-100"
                  htmlFor="address_references"
                >
                  Otras Referencia
                </label>
                <input
                  name="address_references"
                  type="text"
                  id="address_references"
                  className="bg-neutral-700 border-transparent text-white outline-transparent ring-transparent  w-full h-8 rounded p-2 ring-2 outline-2 focus:border-purple-500 focus:outline-purple-500 focus:ring-purple-500"
                  value={formik.values.address_references}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.address_references &&
                formik.errors.address_references ? (
                  <span className="text-red-600">
                    {formik.errors.address_references}
                  </span>
                ) : null}
              </div>
              <div className="flex flex-col px-4 mb-2">
                <label
                  className="mb-1 text-neutral-100"
                  htmlFor="business _phone"
                >
                  Telefono
                </label>
                <input
                  name="business_phone"
                  type="tel"
                  id="business_phone"
                  className="bg-neutral-700 border-transparent text-white outline-transparent ring-transparent  w-full h-8 rounded p-2 ring-2 outline-2 focus:border-purple-500 focus:outline-purple-500 focus:ring-purple-500"
                  value={formik.values.business_phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.business_phone &&
                formik.errors.business_phone ? (
                  <span className="text-red-600">
                    {formik.errors.business_phone}
                  </span>
                ) : null}
              </div>
              <div className="flex flex-col px-4 mb-2">
                <label className="mb-1 text-neutral-100" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-neutral-700 border-transparent text-white outline-transparent ring-transparent  w-full h-8 rounded p-2 ring-2 outline-2 focus:border-purple-500 focus:outline-purple-500 focus:ring-purple-500"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email ? (
                  <span className="text-red-600">{formik.errors.email}</span>
                ) : null}
              </div>
            </div>
          </div>
          <div className="flex flex-row">
            <button
              className="border border-purple-600 px-4 py-2 text-purple-600 text-md rounded-full w-32 ml-4 mt-4  disabled:border-neutral-400 disabled:text-neutral-400"
              disabled={!formik.isValid}
              type={'submit'}
            >
              Enviar
            </button>
            <button
              className="border border-purple-600 px-4 py-2 text-purple-600 text-md rounded-full w-32 ml-4 mt-4 disabled:bg-slate-600"
              onClick={() => {
                navigate(-1);
              }}
            >
              Regresar
            </button>
          </div>
        </form>
        <div
          className={`w-full flex flex-col h-auto px-10 pt-4 pb-4 mt-4 ${
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
