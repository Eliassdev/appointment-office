import { useCallback, useEffect, useState } from 'react';
import { City, Country, State } from 'country-state-city';

// Formik
import { useFormik } from 'formik';

//Router
import { useNavigate, useLocation } from 'react-router-dom';

// Redux
import { useCreateStylistMutation } from '../../redux/modular/api/stylists.slice';
import { useGetBranchesQuery, useUpdateBranchMutation } from '../../redux/modular/api/branches.slice';
//Zod
import { stylistValidation } from '../../schemas/stylist.shema';



export const StylistsCreate = () => {
  
  const [countries, setCountries] = useState(null);
  const [selectedCountry, selectedCountrySet] = useState(null);
  const [states, setStates] = useState(null);
  const [InAnimation, setInAnimation] = useState(true);
  const [OutAnimation, setOutAnimation] = useState(false);

  
  const allCountries = Country.getAllCountries();

  const navigateOut = () => {
    setOutAnimation(true);
    setTimeout(() => {
      navigate('/dashboard/styli');
    }, 1000);}

  // --- Redux ---
  // Create Stylists Mutation
  const [CreateStylist,
    { 
    data: dataCreate,
    isLoading: isLoadingCreate,
    isSuccess: isSuccessCreate,
   },
  ] = useCreateStylistMutation();

  // Create Stylists Mutation
  const {data: branches = [], isLoading : isLoadingBra, isError : isErrorBra} = useGetBranchesQuery()
  
// --- React Router ---
const navigate = useNavigate();

  const formik = useFormik({initialValues: {
    stylist_firstname: '',
    stylist_lastname:'',
    marital_status:'',
    gender:'',
    branch_id: 1,
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
    // React query - Stylists Create
    let body = values;
    CreateStylist(body);
    // Navigate - 
    if(isSuccessCreate){
      setTimeout(() => {
         navigate('/dashboard/stylists')
      }, 1000);
    }
  },
  validate: (values) => {
    const result = stylistValidation.safeParse(values);
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
  if (isSuccessCreate) {
    setTimeout(() => {
      navigateOut();
    }, 500);
  }
}, [formik.values.country, selectedCountry, isSuccessCreate]);


  return (
    <div className="grid-span-2">
      <form  onSubmit={formik.handleSubmit}
          className="flex h-auto w-full flex-col bg-neutral-900 px-10 pb-4 pt-4">
        <fieldset>
          <legend>Stylists Form</legend>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
            }}
          >
            <label for="stylist_firstname">Nombre</label>
            <input
              type="text"
              id="stylist_firstname"
              name="stylist_firstname"
              className=" h-8 w-full rounded border-transparent bg-neutral-700  p-2 text-white outline-2 outline-transparent ring-2 ring-transparent focus:border-purple-500 focus:outline-purple-500 focus:ring-purple-500"
              value={formik.values.stylist_firstname}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
                          {formik.touched.stylist_firstname &&
                formik.errors.stylist_firstname &&
                InAnimation ? (
                  <span
                    className={`${OutAnimation ? 'hidden' : 'text-red-600'}`}
                  >
                    {formik.errors.stylist_firstname}
                  </span>
                ) : null}
                
            <label for="stylist_lastname">Apellido</label>
            <input
              type="text"
              id="stylist_lastname"
              name="stylist_lastname"
              className=" h-8 w-full rounded border-transparent bg-neutral-700  p-2 text-white outline-2 outline-transparent ring-2 ring-transparent focus:border-purple-500 focus:outline-purple-500 focus:ring-purple-500"
              value={formik.values.stylist_lastname}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
                                      {formik.touched.stylist_lastname &&
                formik.errors.stylist_lastname &&
                InAnimation ? (
                  <span
                    className={`${OutAnimation ? 'hidden' : 'text-red-600'}`}
                  >
                    {formik.errors.stylist_lastname}
                  </span>
                ) : null}

            <label for="marital_status">Estado civil</label>
            <select
              name="marital_status"
              id="marital_status"
              required=""
              placeholder="Seleccione una opcion"
              className=" h-8 w-full rounded border-transparent bg-neutral-700  p-2 text-white outline-2 outline-transparent ring-2 ring-transparent focus:border-purple-500 focus:outline-purple-500 focus:ring-purple-500"
              value={formik.values.marital_status}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="">Seleccione una opcion</option>
              <option value="marital_status">Soltero</option>
              <option value="marital_status">Casado</option>
            </select>

            {formik.touched.marital_status &&
                formik.errors.marital_status &&
                InAnimation ? (
                  <span
                    className={`${OutAnimation ? 'hidden' : 'text-red-600'}`}
                  >
                    {formik.errors.marital_status}
                  </span>
                ) : null}

            <label htmlFor="gender">Genero</label>
            <select
              name="gender"
              id="gender"
              required=""
              placeholder="Seleccione una opcion"
              className=" h-8 w-full rounded border-transparent bg-neutral-700  p-2 text-white outline-2 outline-transparent ring-2 ring-transparent focus:border-purple-500 focus:outline-purple-500 focus:ring-purple-500"
              value={formik.values.gender}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="">Seleccione una opcion</option>
              <option value="gender">Masculino</option>
              <option value="gender">Femenino</option>
            </select>

            {formik.touched.gender &&
                formik.errors.gender &&
                InAnimation ? (
                  <span
                    className={`${OutAnimation ? 'hidden' : 'text-red-600'}`}
                  >
                    {formik.errors.gender}
                  </span>
                ) : null}

            <label htmlFor="branch_id">Sucursal</label>
            <select name="branch_id" id="branch_id" required="">
              <option value="">Seleccione una opcion</option>
              {branches?.map((bra)=>{
                return (
                  <option value={bra.branch_id}>{bra.branch_name}</option>
                )
              })}
            </select>
            <label for="country">País</label>
            <select name="country" id="country"

                  className=" h-8 w-full rounded border-transparent bg-neutral-700  p-2 text-white outline-2 outline-transparent ring-2 ring-transparent focus:border-purple-500 focus:outline-purple-500 focus:ring-purple-500"
                  value={formik.values.country}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
            >
                          {formik.touched.country &&
                formik.errors.country &&
                InAnimation ? (
                  <span
                    className={`${OutAnimation ? 'hidden' : 'text-red-600'}`}
                  >
                    {formik.errors.country}
                  </span>
                ) : null}

            <option value="country">Argentina</option>
            </select>
            <label for="state">Provincia</label>
            <select name="state" id="state" 

              className=" h-8 w-full rounded border-transparent bg-neutral-700  p-2 text-white outline-2 outline-transparent ring-2 ring-transparent focus:border-purple-500 focus:outline-purple-500 focus:ring-purple-500"
              value={formik.values.state}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
                {formik.touched.state &&
                formik.errors.state &&
                InAnimation ? (
                  <span
                    className={`${OutAnimation ? 'hidden' : 'text-red-600'}`}
                  >
                    {formik.errors.state}
                  </span>
                ) : null}


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
            <label for="city">Ciudad</label>
            <input type="text" id="city" name="city" 
              className=" h-8 w-full rounded border-transparent bg-neutral-700  p-2 text-white outline-2 outline-transparent ring-2 ring-transparent focus:border-purple-500 focus:outline-purple-500 focus:ring-purple-500"
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            
            />
                {formik.touched.city &&
                formik.errors.city &&
                InAnimation ? (
                  <span
                    className={`${OutAnimation ? 'hidden' : 'text-red-600'}`}
                  >
                    {formik.errors.city}
                  </span>
                ) : null}

            <label for="street">Calle</label>
            <input type="text" id="street" name="street"
            
            className=" h-8 w-full rounded border-transparent bg-neutral-700  p-2 text-white outline-2 outline-transparent ring-2 ring-transparent focus:border-purple-500 focus:outline-purple-500 focus:ring-purple-500"
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

            <label for="address">Dirección</label>
            <input type="text" id="address" name="address"
            
            className=" h-8 w-full rounded border-transparent bg-neutral-700  p-2 text-white outline-2 outline-transparent ring-2 ring-transparent focus:border-purple-500 focus:outline-purple-500 focus:ring-purple-500"
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

            <label for="postal_code">CP</label>
            <input
              type="text"
              id="postal_code"
              name="postal_code"
              className=" h-8 w-full rounded border-transparent bg-neutral-700  p-2 text-white outline-2 outline-transparent ring-2 ring-transparent focus:border-purple-500 focus:outline-purple-500 focus:ring-purple-500"
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

            <label for="address_references">Otras Referencias</label>
            <input
              type="text"
              id="address_references"
              name="address_references"
              className=" h-8 w-full rounded border-transparent bg-neutral-700  p-2 text-white outline-2 outline-transparent ring-2 ring-transparent focus:border-purple-500 focus:outline-purple-500 focus:ring-purple-500"
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

            <label for="business_phone">Teléfono</label>
            <input
              type="tel"
              id="business_phone"
              name="business_phone"
              className=" h-8 w-full rounded border-transparent bg-neutral-700  p-2 text-white outline-2 outline-transparent ring-2 ring-transparent focus:border-purple-500 focus:outline-purple-500 focus:ring-purple-500"
              value={formik.values.business_phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />{' '}

                 {formik.touched.business_phone &&
                formik.errors.business_phone &&
                InAnimation ? (
                  <span
                    className={`${OutAnimation ? 'hidden' : 'text-red-600'}`}
                  >
                    {formik.errors.business_phone}
                  </span>
                ) : null}
            <br />
            <label for="email">Email</label>
            <input type="email" id="email" name="email" 

                      className=" h-8 w-full rounded border-transparent bg-neutral-700  p-2 text-white outline-2 outline-transparent ring-2 ring-transparent focus:border-purple-500 focus:outline-purple-500 focus:ring-purple-500"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur} 
                
                  />
                {formik.touched.email &&
                formik.errors.email &&
                InAnimation ? (
                  <span
                    className={`${OutAnimation ? 'hidden' : 'text-red-600'}`}
                  >
                    {formik.errors.email}
                  </span>
                ) : null}
            <button>Enviar</button>
          </div>
        </fieldset>
      </form>
    </div>
  );
}
