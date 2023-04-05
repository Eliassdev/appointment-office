import { useEffect, useState } from 'react';

// Router
import { useNavigate } from 'react-router-dom';

// Redux
import { useCreateServiceMutation } from '../../redux/modular/api/services.slice';
import { useGetStylistQuery } from '../../redux/modular/api/stylists.slice';

// Components
import InputElement from '../../CustomComponents/Inputs/InputElement.component';
import ServicesFormNav from './ServicesFormNav';

//Formik
import { useFormik } from 'formik';

//Zod
import SelectElement from '../../CustomComponents/Inputs/SelectElement.component';
import { useGetBranchesQuery } from '../../redux/modular/api/branches.slice';
import { serviceValidation } from '../../schemas/services.schema';

const ServicesForm = () => {
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
  const {
    data: stylists = [],
    isSuccess: isSuccessSty,
    isLoading: isLoadingSty,
  } = useGetStylistQuery();
  const {
    data: branches = [],
    isSuccess: isSuccessBra,
    isLoading: isLoadingBra,
  } = useGetBranchesQuery();

  // --- Formik configuration ---
  const formik = useFormik({
    initialValues: {
      stylist_id: 0,
      service_name: '',
      service_price: 500,
      service_duration: 20,
      created_by: 1,
      updated_by: 1,
    },
    onSubmit: async (values) => {
      console.log('onSubmit ejecuted');
      console.log(values);

      let body = values;
      body.stylist_id = Number(values.stylist_id);
      console.log(body.stylist_id);
      createService(body);
    },
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
            {branches?.map((bra) => {
              return <option value={bra.branch_id}>{bra.branch_name}</option>;
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
            {Stylists?.map((sty) => {
              console.log(sty);
              return (
                <option value={sty.stylist_id}>
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
