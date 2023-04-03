import axios from 'axios';
import { City, Country, State } from 'country-state-city';
import { useFormik } from 'formik';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateBranchMutation } from '../../redux/modular/api/branches.slice';
import { branchValidation } from '../../schemas/branch.schema';
import { handleChange } from '../../utils/fomHandlers';
import regionData from '../../utils/listOfCountries_States_Cities.json';

const BranchForm = () => {
  const [countries, setCountries] = useState(null);
  const [states, setStates] = useState(null);
  const [selectedCountry, selectedCountrySet] = useState(null);
  const [InAnimation, setInAnimation] = useState(true);
  const [OutAnimation, setOutAnimation] = useState(false);

  const navigate = useNavigate();
  const allCountries = Country.getAllCountries();

  const [CreateBranch, { isLoading, isError, isSuccess, data }] =
    useCreateBranchMutation();

  const navigateOut = () => {
    setOutAnimation(true);
    setTimeout(() => {
      navigate('/dashboard/branches');
    }, 1000);
  };
  const formik = useFormik({
    initialValues: {
      branch_name: '',
      organization_id: 1,
      country: '',
      state: '',
      city: '',
      street: '',
      address: '',
      postal_code: '',
      address_references: '',
      business_phone: '',
      email: '',
      latitude: 39.0,
      longitude: -12.0,
      created_by: 1,
      updated_by: 1,
    },
    onSubmit: async (values) => {
      let body = values;
      let countryName = countries.find(
        (country) => country.isoCode === body.country
      );
      let stateName = states.find((state) => state.isoCode === body.state);
      body.country = countryName.name;
      body.state = stateName.name;
      console.log(body);
      CreateBranch(body);
      console.log(data);
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
      console.log('selectedCountry', selectedCountry);
      let countryStates = State.getStatesOfCountry(selectedCountry);
      setStates(countryStates);
    }
    if (isSuccess) {
      setTimeout(() => {
        navigateOut();
      }, 500);
    }
  }, [formik.values.country, selectedCountry, isSuccess]);

  return (
    <div
      className={` ${
        InAnimation
          ? 'flex h-5/6 w-full px-12 py-8 animate-in slide-in-from-right duration-1000'
          : 'hidden'
      } ${
        OutAnimation
          ? 'flex h-full w-full px-12 py-8 animate-out slide-out-to-left duration-1000'
          : null
      }`}
    >
      <div className="w-full py-8">
        <form
          onSubmit={InAnimation ? formik.handleSubmit : null}
          className="flex h-auto w-full flex-col bg-neutral-900 px-10 pb-4 pt-4"
        >
          <legend className="pl-4 text-center text-2xl font-bold text-purple-500">
            Agrega tu sucursal al sistema
          </legend>
          <div className=" mt-2 grid grid-cols-2">
            <div>
              <div className="mb-2 flex flex-col px-4">
                <label className="mb-1 text-neutral-100" htmlFor="short_name">
                  Nombre Corto
                </label>
                <input
                  name="branch_name"
                  type="text"
                  id="branch_name"
                  className=" h-8 w-full rounded border-transparent bg-neutral-700  p-2 text-white outline-2 outline-transparent ring-2 ring-transparent focus:border-purple-500 focus:outline-purple-500 focus:ring-purple-500"
                  value={formik.values.branch_name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />

                {formik.touched.branch_name &&
                formik.errors.branch_name &&
                InAnimation ? (
                  <span
                    className={`${OutAnimation ? 'hidden' : 'text-red-600'}`}
                  >
                    {formik.errors.branch_name}
                  </span>
                ) : null}
              </div>
              <div className="mb-2 flex flex-col px-4">
                <label className="mb-1 text-neutral-100" htmlFor="country">
                  Pais
                </label>
                <select
                  name="country"
                  id="country"
                  className="h-8 w-full rounded border-transparent bg-neutral-700  text-white outline-2 outline-transparent ring-2 ring-transparent focus:border-purple-500 focus:outline-purple-500 focus:ring-purple-500"
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
                {formik.touched.country &&
                formik.errors.country &&
                InAnimation ? (
                  <span
                    className={`${OutAnimation ? 'hidden' : 'text-red-600'}`}
                  >
                    {formik.errors.country}
                  </span>
                ) : null}
              </div>
              <div className="mb-2 flex flex-col px-4">
                <label className="mb-1 text-neutral-100" htmlFor="state">
                  Provincia
                </label>
                <select
                  name="state"
                  id="state"
                  className="h-8 w-full rounded border-transparent bg-neutral-700  text-white outline-2 outline-transparent ring-2 ring-transparent focus:border-purple-500 focus:outline-purple-500 focus:ring-purple-500"
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
                {formik.touched.state && formik.errors.state && InAnimation ? (
                  <span
                    className={`${OutAnimation ? 'hidden' : 'text-red-600'}`}
                  >
                    {formik.errors.state}
                  </span>
                ) : null}
              </div>
              <div className="mb-2 flex flex-col px-4">
                <label className="mb-1 text-neutral-100" htmlFor="city">
                  Ciudad
                </label>
                <input
                  name="city"
                  id="city"
                  type="text"
                  className="h-8 w-full rounded border-transparent bg-neutral-700  p-2 text-white outline-2 outline-transparent ring-2 ring-transparent focus:border-purple-500 focus:outline-purple-500 focus:ring-purple-500"
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.city && formik.errors.city && InAnimation ? (
                  <span
                    className={`${OutAnimation ? 'hidden' : 'text-red-600'}`}
                  >
                    {formik.errors.city}
                  </span>
                ) : null}
              </div>
              <div className="mb-2 flex flex-col px-4">
                <label className="mb-1 text-neutral-100" htmlFor="street">
                  Calle
                </label>
                <input
                  name="street"
                  type="text"
                  id="street"
                  className="h-8 w-full rounded border-transparent bg-neutral-700  p-2 text-white outline-2 outline-transparent ring-2 ring-transparent focus:border-purple-500 focus:outline-purple-500 focus:ring-purple-500"
                  value={formik.values.street}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.street &&
                formik.errors.street &&
                InAnimation ? (
                  <span
                    className={`${OutAnimation ? 'hidden' : 'text-red-600'}`}
                  >
                    {formik.errors.street}
                  </span>
                ) : null}
              </div>
            </div>
            <div>
              <div className="mb-2 flex flex-col px-4">
                <label className="mb-1 text-neutral-100" htmlFor="address">
                  Direccion
                </label>
                <input
                  name="address"
                  type="text"
                  id="address"
                  className="h-8 w-full rounded border-transparent bg-neutral-700  p-2 text-white outline-2 outline-transparent ring-2 ring-transparent focus:border-purple-500 focus:outline-purple-500 focus:ring-purple-500"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.address &&
                formik.errors.address &&
                InAnimation ? (
                  <span
                    className={`${OutAnimation ? 'hidden' : 'text-red-600'}`}
                  >
                    {formik.errors.address}
                  </span>
                ) : null}
              </div>
              <div className="mb-2 flex flex-col px-4">
                <label className="mb-1 text-neutral-100" htmlFor="postal_code">
                  CP
                </label>
                <input
                  name="postal_code"
                  type="text"
                  id="postal_code"
                  className="h-8 w-full rounded border-transparent bg-neutral-700  p-2 text-white outline-2 outline-transparent ring-2 ring-transparent focus:border-purple-500 focus:outline-purple-500 focus:ring-purple-500"
                  value={formik.values.postal_code}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.postal_code &&
                formik.errors.postal_code &&
                InAnimation ? (
                  <span
                    className={`${OutAnimation ? 'hidden' : 'text-red-600'}`}
                  >
                    {formik.errors.postal_code}
                  </span>
                ) : null}
              </div>
              <div className="mb-2 flex flex-col px-4">
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
                  className="h-8 w-full rounded border-transparent bg-neutral-700  p-2 text-white outline-2 outline-transparent ring-2 ring-transparent focus:border-purple-500 focus:outline-purple-500 focus:ring-purple-500"
                  value={formik.values.address_references}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.address_references &&
                formik.errors.address_references &&
                InAnimation ? (
                  <span
                    className={`${OutAnimation ? 'hidden' : 'text-red-600'}`}
                  >
                    {formik.errors.address_references}
                  </span>
                ) : null}
              </div>
              <div className="mb-2 flex flex-col px-4">
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
                  className="h-8 w-full rounded border-transparent bg-neutral-700  p-2 text-white outline-2 outline-transparent ring-2 ring-transparent focus:border-purple-500 focus:outline-purple-500 focus:ring-purple-500"
                  value={formik.values.business_phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.business_phone &&
                formik.errors.business_phone &&
                InAnimation ? (
                  <span
                    className={`${OutAnimation ? 'hidden' : 'text-red-600'}`}
                  >
                    {formik.errors.business_phone}
                  </span>
                ) : null}
              </div>
              <div className="mb-2 flex flex-col px-4">
                <label className="mb-1 text-neutral-100" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="h-8 w-full rounded border-transparent bg-neutral-700  p-2 text-white outline-2 outline-transparent ring-2 ring-transparent focus:border-purple-500 focus:outline-purple-500 focus:ring-purple-500"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email && InAnimation ? (
                  <span
                    className={`${OutAnimation ? 'hidden' : 'text-red-600'}`}
                  >
                    {formik.errors.email}
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
                navigateOut();
              }}
            >
              Regresar
            </button>
          </div>
        </form>
        <div
          className={`mt-4 flex h-auto w-full flex-col px-10 pb-4 pt-4 ${
            !isLoading && !isSuccess ? 'transparent' : ' bg-neutral-900'
          }`}
        >
          {isLoading ? <p className="text-yellow-300">Enviando</p> : null}
          {isSuccess ? (
            <p className="text-green-500">Creado con exito</p>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default BranchForm;
