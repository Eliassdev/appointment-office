import axios from 'axios';
import { City, Country, State } from 'country-state-city';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { branchValidation } from '../../schemas/branch.schema';
import { handleChange } from '../../utils/fomHandlers';
import regionData from '../../utils/listOfCountries_States_Cities.json';

const BranchForm = () => {
  const [countries, setCountries] = useState(null);
  const [states, setStates] = useState(null);
  const [selectedCountry, selectedCountrySet] = useState(null);
  const allCountries = Country.getAllCountries();

  const postBranch = async (data) => {
    const info = await axios.post('/branches', data);
    return info.data;
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
      const res = await postBranch(body);
      console.log(res);
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
  }, [formik.values.country, selectedCountry]);

  return (
    <div className=" bg-neutral-900 p-4 mx-14 my-16 container rounded-md">
      <form onSubmit={formik.handleSubmit}>
        <legend className="font-medium text-lg pl-4 text-purple-500">
          AGREGA TU SUCURSAL AL SISTEMA
        </legend>
        <div className=" grid grid-cols-2 mt-4">
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
              {formik.touched.business_phone && formik.errors.business_phone ? (
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
        <button
          className="bg-purple-800 px-5 py-1 text-gray-300 text-xl rounded-xl w-32 ml-4 mt-4 disabled:bg-slate-600"
          disabled={!formik.isValid}
          type={'submit'}
        >
          Enviar
        </button>
      </form>
    </div>
  );
};

export default BranchForm;
