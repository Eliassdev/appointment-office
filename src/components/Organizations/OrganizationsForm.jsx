import { useEffect, useState } from 'react';

// Router
import { useNavigate } from 'react-router-dom';

//Redux
import {
  useCreateOrganizationMutation,
  useUpdateOrganizationMutation,
  useDeleteOrganizationMutation,
} from '../../redux/modular/api/organizations.slice';

//Components
import OrganizationsFormNav from './OrganizationsFormNav';
import InputElement from '../../CustomComponents/Inputs/InputElement.component';
import SelectElement from '../../CustomComponents/Inputs/SelectElement.component';

//Formik
import { useFormik } from 'formik';

//Zod
import { organizationValidation } from '../../schemas/organization.schema';

//Country State City
import useCountryState from '../../hooks/useCountryState.hook';

//Constants
export const ORGANIZATIONS_FORM_TYPE = {
  create: 'create_orgnization',
  read: 'read_orgnization',
  update: 'update_orgnization',
};

const OrganizationForm = ({ formType, orgData }) => {
  // --- Local State ---
  // Delayed States to populate form
  const [delayedStates, setDelayedStates] = useState([]);

  // --- Local Storage ---
  const id = localStorage.getItem('organizationId') || null;

  // --- React Router ---
  const navigate = useNavigate();

  // --- Country State ---
  const { countries, states, handleCountryChange } = useCountryState();

  // --- Redux ---
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

  // Delete Organization Mutation
  const [
    DeleteOrganization,
    { isSuccess: isSuccessDeletion, isLoading: isLoadingDeletion },
  ] = useDeleteOrganizationMutation();

  // --- Formik configuration ---
  // Formik initial values
  const initialFormikValues = () => {
    switch (formType) {
      case ORGANIZATIONS_FORM_TYPE.create:
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
      case ORGANIZATIONS_FORM_TYPE.update || ORGANIZATIONS_FORM_TYPE.read:
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

  // Formik submit function switch that returns Form Type
  const formikSubmit = () => {
    switch (formType) {
      case ORGANIZATIONS_FORM_TYPE.create:
        return async (values) => {
          let body = values;
          CreateOrganization(body);
        };

      case ORGANIZATIONS_FORM_TYPE.update:
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
      case ORGANIZATIONS_FORM_TYPE.read:
        return async () => {
          const request = {
            id: id,
          };
          DeleteOrganization(request);
          if (isSuccessDeletion) {
            localStorage.clear();
            setTimeout(() => {
              navigate('/');
            }, 1000);
          }
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
        console.log('result', result);
        console.log('errors', errors);
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

  // --- Handle functions ---
  // Handle cancel button
  const handleCancelEdit = () => {
    navigate('/dashboard/organizations');
  };

  // Handle create organization
  const handleEditar = () => {
    navigate(`/dashboard/organizations/update/:${id}`);
  };

  // Handle delete organization
  const handleBorrar = () => {
    navigate(`/dashboard/organizations/delete/:${id}`);
  };

  // Handle delete organization
  const handleCancelBorrar = () => {
    navigate(`/dashboard/organizations`);
  };

  // Handle delete organization
  const handleDeleteOrganization = () => {
    const target = { id };
    DeleteOrganization(target);
    if (isSuccessDeletion) {
      localStorage.clear();
      setTimeout(() => {
        navigate('/');
      }, 1000);
    }
  };

  // Get states when country changes
  useEffect(() => {
    if (formik.values.country !== '') {
      handleCountryChange(formik.values.country);

      setTimeout(() => {
        setDelayedStates(states);
      }, 300);
    }
  }, [formik.values.country, states, delayedStates]);

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
        className="flex h-auto flex-col rounded-md bg-neutral-900 px-10 py-8 lg:w-3/5"
      >
        <div className=" mt-2 grid grid-cols-2">
          <div>
            <InputElement
              title="Nombre corto"
              name="short_name"
              id="short_name"
              type="text"
              formType={formType}
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
              formType={formType}
              value={formik.values.business_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              formik={{
                touched: formik.touched.business_name,
                errors: formik.errors.business_name,
              }}
            />
            <SelectElement
              title="Pais"
              name="country"
              id="country"
              formType={formType}
              value={formik.values.country}
              defaultValue={formik.values.country}
              countries={countries}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.country}
              errors={formik.errors.country}
            />
            <SelectElement
              title="Provincia"
              name="state"
              id="state"
              formType={formType}
              value={formik.values.state}
              defaultValue={formik.values.state}
              states={delayedStates}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.state}
              errors={formik.errors.state}
            />
            <InputElement
              title="Ciudad"
              name="city"
              id="city"
              type="text"
              formType={formType}
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
              formType={formType}
              id="street"
              value={formik.values.street}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              formik={{
                touched: formik.touched.street,
                errors: formik.errors.street,
              }}
            />
          </div>
          <div>
            <InputElement
              title="Dirección"
              name="address"
              type="text"
              formType={formType}
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
              formType={formType}
              id="postal_code"
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
              formType={formType}
              id="address_references"
              value={formik.values.address_references}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              formik={{
                touched: formik.touched.address_references,
                errors: formik.errors.address_references,
              }}
            />

            <InputElement
              title="Teléfono"
              name="business_phone"
              type="tel"
              formType={formType}
              id="business_phone"
              value={formik.values.business_phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              formik={{
                touched: formik.touched.business_phone,
                errors: formik.errors.business_phone,
              }}
            />
            <InputElement
              title="Email"
              name="email"
              type="email"
              formType={formType}
              id="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              formik={{
                touched: formik.touched.email,
                errors: formik.errors.email,
              }}
            />
          </div>
        </div>
        <OrganizationsFormNav
          formik={{ isValid: formik.isValid }}
          formType={formType}
          handleCancelEdit={handleCancelEdit}
          handleEditar={handleEditar}
          handleBorrar={handleBorrar}
          handleCancelBorrar={handleCancelBorrar}
          handleDeleteOrganization={handleDeleteOrganization}
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
