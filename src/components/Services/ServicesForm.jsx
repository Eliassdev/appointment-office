import { useEffect } from 'react';

// Router
import { useNavigate } from 'react-router-dom';

// Redux
import { useCreateServiceMutation } from '../../redux/modular/api/services.slice';
import { useUpdateServiceMutation } from '../../redux/modular/api/services.slice';

// Components
import InputElement from '../../CustomComponents/Inputs/InputElement.component';
import ServicesFormNav from './ServicesFormNav';

//Formik
import { useFormik } from 'formik';

//Zod
import { serviceValidation } from '../../schemas/services.schema';

//Constants
export const SERVICES_FORM_TYPE = {
  create: 'create',
  update: 'update',
};

const ServicesForm = ({ formType, ServiceData }) => {
  // --- React Router ---
  const navigate = useNavigate();

  // --- Redux ---
  // Create Service Mutation
  const [
    createService,
    {
      isLoading: isLoadindCreate,
      isSuccess: isSuccessCreate,
      isError: isErrorCreate,
    },
  ] = useCreateServiceMutation();

  // Update Service Mutation
  const [
    updateService,
    {
      isLoading: isLoadindUpdate,
      isSuccess: isSuccessUpdate,
      isError: isErrorUpdate,
    },
  ] = useUpdateServiceMutation();

  const initialFormikValues = () => {
    switch (formType) {
      case SERVICES_FORM_TYPE.create:
        return {
          service_name: '',
          service_price: '',
          service_duration: '',
        };
      case SERVICES_FORM_TYPE.update:
        return {
          service_name: ServiceData.service_name,
          service_price: ServiceData.service_price,
          service_duration: ServiceData.service_duration,
        };
    }
  };

  // Formik submit function swith for Form Type
  const formikSubmit = () => {
    switch (formType) {
      case SERVICES_FORM_TYPE.create:
        return async (values) => {
          console.log('onSubmit ejecuted');
          let body = values;
          createService(body);
        };
      case SERVICES_FORM_TYPE.update:
        return async (values) => {
          let body = values;
          const request = {
            id: id,
            info: body,
          };
          updateService(request);
          setTimeout(() => {
            navigate('/dashboard/services/');
          }, 1000);
        };
    }
  };

  // --- Formik configuration ---
  const formik = useFormik({
    initialValues: initialFormikValues(),
    onSubmit: formikSubmit(),
    validate: (values) => {
      const result = serviceValidation.safeParse(values);
      if (result.success) {
        return;
      }
      if (result.error.issues) {
        const errors = {};
        result.error.issues.map((err) => {
          errors[err.path[0]] = err.message;
        });
        return errors;
      }
    },
  });

  // --- Handle functions ---
  // Handle cancel button
  const handleCancel = () => navigate('/dashboard/services');

  // Redirect to dashboard if create organization is successful
  useEffect(() => {
    if (isSuccessCreate) {
      setTimeout(() => {
        navigate('/dashboard/services');
      }, 1000);
    }
  }, [isSuccessCreate]);

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex h-auto w-full flex-col rounded-md bg-neutral-900 px-10 py-8"
    >
      <div className=" mt-2 grid grid-cols-1">
        <InputElement
          title={'Nombre del Servicio'}
          name={'service_name'}
          id={'service_name'}
          type={'text'}
          value={formik.values.service_name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          formik={{
            touched: formik.touched.service_name,
            errors: formik.errors.service_name,
          }}
        />
        <InputElement
          title={'Valor del Servicio'}
          name={'service_price'}
          id={'service_price'}
          type={'text'}
          value={formik.values.service_price}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          formik={{
            touched: formik.touched.service_price,
            errors: formik.errors.service_price,
          }}
        />
        <InputElement
          title={'Duracion del Servicio'}
          name={'service_duration'}
          id={'service_duration'}
          type={'time'}
          value={formik.values.service_duration}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          formik={{
            touched: formik.touched.service_duration,
            errors: formik.errors.service_duration,
          }}
        />
        <ServicesFormNav
          handleCancel={handleCancel}
          formType={formType}
          formik={{ isValid: formik.isValid }}
        />
      </div>
    </form>
  );
};

export default ServicesForm;
