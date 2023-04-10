import { useEffect, useState } from 'react';

// Router
import { useNavigate } from 'react-router-dom';

// Redux
import { useCreateServiceMutation } from '../../redux/modular/api/services.slice';
import { useGetStylistQuery } from '../../redux/modular/api/stylists.slice';
import { useGetBranchesQuery } from '../../redux/modular/api/branches.slice';

// Components
import InputElement from '../../CustomComponents/Inputs/InputElement.component';
import SelectElement from '../../CustomComponents/Inputs/SelectElement.component';
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

const ServicesForm = ({ formType }) => {
  const [Branch, setBranch] = useState(null);
  const [Stylists, setStylists] = useState([]);

  // --- React Router ---
  const navigate = useNavigate();

  // --- Redux ---
  // Create Service Mutation
  const [
    createService,
    {
      isLoading: isLoadindUpdate,
      isSuccess: isSuccessUpdate,
      isError: isErrorUpdate,
    },
  ] = useCreateServiceMutation();

  // Get Stylists Query
  const {
    data: stylists = [],
    isSuccess: isSuccessSty,
    isLoading: isLoadingSty,
  } = useGetStylistQuery();

  // Get Branches Query
  const {
    data: branches = [],
    isSuccess: isSuccessGetBranches,
    isLoading: isLoadingGetBranches,
  } = useGetBranchesQuery();

  // --- Formik ---

  // Initial Values
  const initialFormikValues = () => {
    switch (formType) {
      case SERVICES_FORM_TYPE.create:
        return {
          stylist_id: 0,
          service_name: '',
          service_price: 500,
          service_duration: 20,
          created_by: 1,
          updated_by: 1,
        };
      case SERVICES_FORM_TYPE.update:
        return {
          stylist_id: serviceData.stylist_id,
          service_name: serviceData.service_name,
          service_price: serviceData.service_price,
          service_duration: serviceData.service_duration,
          created_by: 1,
          updated_by: 1,
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
          body.stylist_id = Number(values.stylist_id);
          console.log(body.stylist_id);
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
        };
    }
  };

  // Formik config
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
    if (isSuccessUpdate) {
      setTimeout(() => {
        navigate('/dashboard/services');
      }, 1000);
    }
  }, [isSuccessUpdate]);

  useEffect(() => {
    if (Branch !== null) {
      // setStylists(stylists?.filter((sty) => sty.stylist_firstname === 'Jack'));
      setStylists(stylists?.filter((sty) => sty.branch_id === Number(Branch)));
      console.log(Stylists);
    }
  }, [Branch]);

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex h-auto w-full flex-col rounded-md bg-neutral-900 px-10 py-8"
    >
      <div className=" mt-2 grid grid-cols-1">
        <div className="mb-2 flex flex-col px-4">
          <label className="mb-1 text-neutral-100" htmlFor="country">
            Sucursal
          </label>
          <select
            className="h-8 w-full rounded border-transparent bg-neutral-700  text-white outline-2 outline-transparent ring-2 ring-transparent focus:border-purple-500 focus:outline-purple-500 focus:ring-purple-500"
            onChange={(e) => {
              setBranch(e.target.value);
            }}
          >
            <option>Seleccione un estilista</option>
            {branches?.map((bra, index) => {
              return (
                <option key={`${bra}-${index}`} value={bra.branch_id}>
                  {bra.branch_name}
                </option>
              );
            })}
          </select>
        </div>

        <div className="mb-2 flex flex-col px-4">
          <label className="mb-1 text-neutral-100" htmlFor="country">
            Estilista
          </label>
          <select
            name={'stylist_id'}
            id={'stylist_id'}
            className="h-8 w-full rounded border-transparent bg-neutral-700  text-white outline-2 outline-transparent ring-2 ring-transparent focus:border-purple-500 focus:outline-purple-500 focus:ring-purple-500"
            type={'update'}
            value={formik.values.stylist_id}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option>Seleccione un estilista</option>
            {Stylists?.map((sty, index) => {
              console.log(sty);
              return (
                <option key={`${sty}-${index}`} value={sty.stylist_id}>
                  {sty.stylist_firstname + ' ' + sty.stylist_lastname}
                </option>
              );
            })}
          </select>
        </div>
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
          type={'number'}
          max={10000}
          min={500}
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
          type={'number'}
          max={180}
          min={20}
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
