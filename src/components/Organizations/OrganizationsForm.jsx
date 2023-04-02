import { useEffect, useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

//Redux
import {
  useCreateOrganizationMutation,
  useUpdateOrganizationMutation,
} from '../../redux/modular/api/organizations.slice';

//Components
import OrganizationsFormNav from './OrganizationsFormNav';
import InputElement from '../../CustomComponents/Inputs/InputElement.component';

//Formik
import { useFormik } from 'formik';

//Zod
import { organizationValidation } from '../../schemas/organization.schema';

//Country State City
import useCountryState from '../../hooks/useCountryState.hook';

export const ORGANIZATIONS_FORM_TYPE = {
  register: 'register',
  edit: 'edit',
};

const OrganizationForm = ({ formType, orgData }) => {
  const id = localStorage.getItem('organizationId') || null;
  const navigate = useNavigate();
  // const allCountries = Country.getAllCountries();

  // Country State
  const { countries, states, selectedCountry, handleCountryChange } =
    useCountryState();

  // Create Organization Mutation
  const [
    CreateOrganization,
    {
      data: dataCreate,
      isLoading: isLoadingCreate,
      isSuccess: isSuccessCreate,
    },
  ] = useCreateOrganizationMutation();

  // Update Organization Mutation
  const [
    UpdateOrganization,
    {
      data: dataUpdate,
      isLoading: isLoadingUpdate,
      isSuccess: isSuccessUpdate,
    },
  ] = useUpdateOrganizationMutation();

  // Formik configuration

  // Formik initial values
  const initialFormikValues = () => {
    switch (formType) {
      case ORGANIZATIONS_FORM_TYPE.register:
        return {
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
        };
      case ORGANIZATIONS_FORM_TYPE.edit:
        return {
          short_name: orgData?.short_name,
          business_name: orgData?.business_name,
          country: orgData?.country,
          state: orgData?.state,
          city: orgData?.city,
          street: orgData?.street,
          address: orgData?.address,
          postal_code: orgData?.postal_code,
          address_references: orgData?.address_references,
          business_phone: orgData?.business_phone,
          email: orgData?.email,
          latitude: 39.0,
          longitude: -12.0,
          created_by: 1,
          updated_by: 1,
        };
      default:
        return {
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
        };
    }
  };

  // Formik submit function swith for Form Type
  const formikSubmit = () => {
    switch (formType) {
      case ORGANIZATIONS_FORM_TYPE.register:
        return async (values) => {
          let body = values;
          CreateOrganization(body);
        };

      case ORGANIZATIONS_FORM_TYPE.edit:
        return async (values) => {
          let body = values;
          const request = {
            id: id,
            info: body,
          };
          UpdateOrganization(request);
          setTimeout(() => {
            navigate('/dashboard/organizations');
          }, 1000);
        };
    }
  };

  // Formik configuration
  const formik = useFormik({
    initialValues: initialFormikValues(),
    onSubmit: formikSubmit(),
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

  // Function to extract the number from a string - Used to get the organization id from the response message
  function getNumberFromString(s) {
    const regex = /(\d+)/;
    const match = s.match(regex);
    return match ? match[0] : null;
  }

  // Handle cancel button
  const handleCancelEdit = () => {
    navigate('/dashboard/organizations');
  };

  // Get states when country changes
  useEffect(() => {
    if (formik.values.country !== '') {
      handleCountryChange(formik.values.country);
    }
  }, [formik.values.country]);

  // Redirect to dashboard if create organization is successful
  useEffect(() => {
    if (isSuccessCreate) {
      let id = getNumberFromString(dataCreate.message);
      localStorage.setItem('organizationId', id);

      setTimeout(() => {
        navigate('/dashboard/');
      }, 1000);
    }
  }, [isSuccessCreate]);

  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        className="flex h-auto w-full flex-col bg-neutral-900 px-10 pt-4 pb-4"
      >
        <div className=" mt-2 grid grid-cols-2">
          <div>
            <InputElement
              title="Nombre corto"
              name="short_name"
              id="short_name"
              type="text"
              value={formik.values.short_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              formik={{
                touched: formik.touched.short_name,
                errors: formik.errors.short_name,
              }}
            />
            <InputElement
              title="Nombre de la empresa"
              name="business_name"
              id="business_name"
              type="text"
              value={formik.values.business_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              formik={{
                touched: formik.touched.business_name,
                errors: formik.errors.business_name,
              }}
            />
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
                <option defaultValue={formik.values.country}>
                  {formik.values.country === ''
                    ? '--Seleccionar Pais--'
                    : formik.values.country}
                </option>
                {countries.map((country) => (
                  <option key={country.isoCode} value={country.name}>
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
                <option defaultValue={formik.values.state}>
                  {formik.values.state === ''
                    ? '--Seleccionar Provincia--'
                    : formik.values.state}
                </option>
                {states.length !== 0
                  ? states.map((state) => (
                      <option key={state.isoCode} value={state.name}>
                        {state.name}
                      </option>
                    ))
                  : null}
              </select>
              {formik.touched.state && formik.errors.state ? (
                <span className="text-red-600">{formik.errors.state}</span>
              ) : null}
            </div>
            <InputElement
              title="Ciudad"
              name="city"
              id="city"
              type="text"
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              formik={{
                touched: formik.touched.city,
                errors: formik.errors.city,
              }}
            />

            <InputElement
              title="Calle"
              name="street"
              type="text"
              id="street"
              value={formik.values.street}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              formik={{
                touched: formik.touched.street,
                errors: formik.errors.street,
              }}
            />
            <InputElement
              title="Dirección"
              name="address"
              type="text"
              id="address"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              formik={{
                touched: formik.touched.address,
                errors: formik.errors.address,
              }}
            />
            <InputElement
              title="Código Postal"
              name="postal_code"
              type="text"
              id="postal_code"
              className="h-8 w-full rounded border-transparent bg-neutral-700  p-2 text-white outline-2 outline-transparent ring-2 ring-transparent focus:border-purple-500 focus:outline-purple-500 focus:ring-purple-500"
              value={formik.values.postal_code}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              formik={{
                touched: formik.touched.postal_code,
                errors: formik.errors.postal_code,
              }}
            />
            <InputElement
              title="Referencias"
              name="address_references"
              type="text"
              id="address_references"
              className="h-8 w-full rounded border-transparent bg-neutral-700  p-2 text-white outline-2 outline-transparent ring-2 ring-transparent focus:border-purple-500 focus:outline-purple-500 focus:ring-purple-500"
              value={formik.values.address_references}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              formik={{
                touched: formik.touched.address_references,
                errors: formik.errors.address_references,
              }}
            />
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
              {formik.touched.business_phone && formik.errors.business_phone ? (
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
        {/* <div className="flex flex-row justify-center">
          {formType === ORGANIZATIONS_FORM_TYPE.register ? (
            <Button
              buttonType={!formik.isValid ? 'disabled' : 'main'}
              type={'submit'}
            >
              Registrar
            </Button>
          ) : (
            <div className="flex w-full justify-center">
              <Button buttonType={'green'} onClick={handleCancelEdit}>
                Cancelar
              </Button>
              <Button
                buttonType={!formik.isValid ? 'disabled' : 'main'}
                type={'submit'}
              >
                Guardar
              </Button>
            </div>
          )}
        </div> */}
        <OrganizationsFormNav
          formik={{ isValid: formik.isValid }}
          formType={formType}
          handleCancelEdit={handleCancelEdit}
        />
      </form>
      <div
        className={`mt-4 flex h-auto w-full flex-col px-10 pt-4 pb-4 ${
          !isLoadingCreate && !isSuccessCreate
            ? 'transparent'
            : ' bg-neutral-900'
        }`}
      >
        {isLoadingCreate ? <p className="text-yellow-300">Enviando</p> : null}
        {isSuccessCreate ? (
          <p className="text-green-500">Creado con exito</p>
        ) : null}
      </div>
    </>
  );
};

export default OrganizationForm;
