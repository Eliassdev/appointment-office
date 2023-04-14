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
  create: 'create_service',
  update: 'update_service',
  read: 'read_service',
};

const ServicesForm = ({ formType }) => {
  const [SelectedBranch, setSelectedBranch] = useState(null);
  const [stylistsOnSelectedBranch, setStylistsOnSelectedBranch] = useState([]);
  const [selectedStylist, setSelectedStylist] = useState({});

  // --- React Router ---
  const navigate = useNavigate();

  // --- Redux ---
  // Create Service Mutation
  const [
    createService,
    {
      isLoading: isLoadindCreateService,
      isSuccess: isSuccessCreateService,
      isError: isErrorCreateService,
    },
  ] = useCreateServiceMutation();

  // Get Stylists Query
  const {
    data: stylists = [],
    isSuccess: isSuccessStylists,
    isLoading: isLoadingStylists,
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
          stylist_id: '',
          stylist_firstname: '',
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
          let body = {
            stylist_id: selectedStylist.stylist_id,
            service_name: values.service_name,
            service_price: values.service_price,
            service_duration: values.service_duration,
            created_by: values.created_by,
            updated_by: values.updated_by,
          };
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

  // Handle Branch Select
  const handleBranchSelect = (e) => {
    const branchOnSelect = branches.filter(
      (branch) => branch.branch_name === e.target.value
    );
    setSelectedBranch(branchOnSelect[0]);
  };

  // Redirect to dashboard if create organization is successful
  useEffect(() => {
    if (isSuccessCreateService) {
      setTimeout(() => {
        navigate('/dashboard/services');
      }, 1000);
    }
  }, [isSuccessCreateService]);

  useEffect(() => {
    if (SelectedBranch !== null) {
      const stylistsOnBranch = stylists.filter(
        (stylist) => stylist.branch_id === SelectedBranch.branch_id
      );
      setStylistsOnSelectedBranch(stylistsOnBranch);
    }
  }, [SelectedBranch]);

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex h-auto w-full flex-col rounded-md bg-neutral-900 px-10 py-8"
    >
      <div className=" mt-2 grid grid-cols-1">
        <SelectElement
          title={'Sucursal'}
          name={'branch_id'}
          id={'branch_id'}
          formType={formType}
          value={SelectedBranch?.branch_name}
          options={branches}
          onChange={(e) => {
            formik.handleChange(e);
            handleBranchSelect(e);
          }}
          onBlur={formik.handleBlur}
          touched={formik.touched.stylist_id}
          errors={formik.errors.stylist_id}
        />
        <div className="flex flex-row">
          <SelectElement
            title={'Estilista'}
            name={'stylist_firstname'}
            id={'stylist_firstname'}
            formType={formType}
            defaultValue={formik.values.stylist_firstname}
            value={formik.values.stylist_firstname}
            options={stylistsOnSelectedBranch}
            onChange={(e) => {
              formik.handleChange(e);
              // Get the stylist object from the array and set it to the state
              const stylistOnSelect = stylistsOnSelectedBranch.filter(
                (stylist) => stylist.stylist_firstname === e.target.value
              )[0];
              setSelectedStylist(stylistOnSelect);
            }}
            onBlur={formik.handleBlur}
            touched={formik.touched.stylist_firstname}
            errors={formik.errors.stylist_firstname}
            className={'w-1/2'}
          />
          <InputElement
            title={'ID'}
            name={'stylist_id'}
            id={'stylist_id'}
            type={'text'}
            value={selectedStylist?.stylist_id || ''}
            formType={SERVICES_FORM_TYPE.read}
            className={'w-1/2'}
          />
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
