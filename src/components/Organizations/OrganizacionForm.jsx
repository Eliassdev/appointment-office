import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

//Redux
import { useCreateBranchMutation } from '../../redux/modular/api/branches.slice';

//Formik
import { useFormik } from 'formik';

//Zod
import { organizationValidation } from '../../schemas/organization.schema';

//Country State City
import { City, Country, State } from 'country-state-city';
import { handleChange } from '../../utils/fomHandlers';

//Components
import Button from '../../CustomComponents/Button/Button.component';

const OrganizationForm = () => {
  const [countries, setCountries] = useState(null);
  const [states, setStates] = useState(null);
  const [selectedCountry, selectedCountrySet] = useState(null);
  const navigate = useNavigate();
  const allCountries = Country.getAllCountries();

  const [CreateBranch, { isLoading, isError, isSuccess, data }] =
    useCreateBranchMutation();

  const formik = useFormik({
    initialValues: {
      short_name: '',
      business_name: '',
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
      const result = organizationValidation.safeParse(values);
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
    if (isSuccess) {
      setTimeout(() => {
        navigate('/dashboard/branches');
      }, 1000);
    }
  }, [formik.values.country, selectedCountry, isSuccess]);

  return (
    <div className=" flex h-screen w-full bg-neutral-800 px-12">
      <div className="  w-full py-8">
        <form
          onSubmit={formik.handleSubmit}
          className="flex h-auto w-full flex-col bg-neutral-900 px-10 pt-4 pb-4"
        >
          <legend className="pl-4 text-center text-2xl font-bold text-purple-500">
            Registra tu Empresa
          </legend>
          <div className=" mt-2 grid grid-cols-2">
            <div>
              <div className="mb-2 flex flex-col px-4">
                <label className="mb-1 text-neutral-100" htmlFor="short_name">
                  Nombre Corto
                </label>
                <input
                  name="short_name"
                  type="text"
                  id="short_name"
                  className=" h-8 w-full rounded border-transparent bg-neutral-700  p-2 text-white outline-2 outline-transparent ring-2 ring-transparent focus:border-purple-500 focus:outline-purple-500 focus:ring-purple-500"
                  value={formik.values.branch_name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />

                {formik.touched.short_name && formik.errors.short_name ? (
                  <span className="text-red-600">
                    {formik.errors.short_name}
                  </span>
                ) : null}
              </div>
              <div className="mb-2 flex flex-col px-4">
                <label
                  className="mb-1 text-neutral-100"
                  htmlFor="business_name"
                >
                  Nombre de la Empresa
                </label>
                <input
                  name="business_name"
                  type="text"
                  id="business_name"
                  className=" h-8 w-full rounded border-transparent bg-neutral-700  p-2 text-white outline-2 outline-transparent ring-2 ring-transparent focus:border-purple-500 focus:outline-purple-500 focus:ring-purple-500"
                  value={formik.values.branch_name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />

                {formik.touched.business_name && formik.errors.business_name ? (
                  <span className="text-red-600">
                    {formik.errors.business_name}
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
                {formik.touched.country && formik.errors.country ? (
                  <span className="text-red-600">{formik.errors.country}</span>
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
                {formik.touched.state && formik.errors.state ? (
                  <span className="text-red-600">{formik.errors.state}</span>
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
                {formik.touched.city && formik.errors.city ? (
                  <span className="text-red-600">{formik.errors.city}</span>
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
                {formik.touched.street && formik.errors.street ? (
                  <span className="text-red-600">{formik.errors.street}</span>
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
                {formik.touched.address && formik.errors.address ? (
                  <span className="text-red-600">{formik.errors.address}</span>
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
                {formik.touched.postal_code && formik.errors.postal_code ? (
                  <span className="text-red-600">
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
                formik.errors.address_references ? (
                  <span className="text-red-600">
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
                formik.errors.business_phone ? (
                  <span className="text-red-600">
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
                {formik.touched.email && formik.errors.email ? (
                  <span className="text-red-600">{formik.errors.email}</span>
                ) : null}
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-center">
            <Button buttonType={!formik.isValid ? 'disabled' : 'main'}>
              Registrar
            </Button>
          </div>
        </form>
        <div
          className={`mt-4 flex h-auto w-full flex-col px-10 pt-4 pb-4 ${
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

/*import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrganizations } from '../../redux/slice/organizationsSlice.js';

const OrganizationForm = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrganizations());
  }, []);

  const { organizations, loading, error } = useSelector(
    (state) => state.organizations
  );

  console.log("organizations: ", organizations);

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

  return (
    <div className="grid-span-2">
      <form className="form">
        <fieldset>
          <legend>Organizations Formulario</legend>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <label htmlFor="organization_id">ID</label>
            <input
              type="text"
              id="organization_id"
              name="organization_id"
              required=""
              disabled
            />
            <label htmlFor="short_name">Nombre corto</label>
            <input type="text" id="short_name" name="short_name" required="" />
            <label htmlFor="business_name">Nombre completo</label>
            <input
              type="text"
              id="business_name"
              name="business_name"
              required=""
            />
            <label htmlFor="country">País</label>
            <select name="country" id="country" required="">
              <option value="country">Argentina</option>
            </select>
            <label htmlFor="state">Provincia</label>
            <select name="state" id="state" required="">
              <option value="state">Buenos Aires</option>
              <option value="state">Catamarca</option>
              <option value="state">Chaco</option>
              <option value="state">Chubut</option>
              <option value="state">Córdoba</option>
              <option value="state">Corrientes</option>
              <option value="state">Entre Ríos</option>
              <option value="state">Formosa</option>
              <option value="state">Jujuy</option>
              <option value="state">La Pampa</option>
              <option value="state">La Rioja</option>
              <option value="state">Mendoza</option>
              <option value="state">Misiones</option>
              <option value="state">Neuquén</option>
              <option value="state">Río Negro</option>
              <option value="state">Salta</option>
              <option value="state">San Juan</option>
              <option value="state">San Luís</option>
              <option value="state">Santa Cruz</option>
              <option value="state">Santa Fe</option>
              <option value="state">Santiago del Estero</option>
              <option value="state">Tierra del Fuego</option>
              <option value="state">Tucumán</option>
            </select>
            <label htmlFor="city">Ciudad</label>
            <input type="text" id="city" name="city" required="" />
            <label htmlFor="street">Calle</label>
            <input type="text" id="street" name="street" required="" />
            <label htmlFor="address">Dirección</label>
            <input type="text" id="address" name="address" required="" />
            <label htmlFor="postal_code">CP</label>
            <input
              type="text"
              id="postal_code"
              name="postal_code"
              required=""
            />
            <label htmlFor="address_references">Otras Referencias</label>
            <input
              type="text"
              id="address_references"
              name="address_references"
              required=""
            />
            <label htmlFor="business_phone">Teléfono</label>
            <input
              type="tel"
              id="business_phone"
              name="business_phone"
              required=""
            />{" "}
            <br />
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required="" />
            <button>Enviar</button>
          </div>
        </fieldset>
      </form>
    </div>
  );
};*/

export default OrganizationForm;
