import { useEffect, useState } from 'react';
import { branchValidation } from '../../schemas/branch.schema';
import { handleChange } from '../../utils/fomHandlers';
import regionData from '../../utils/listOfCountries_States_Cities.json';

const BranchForm = () => {
  const [countries, setCountries] = useState(null);
  const [states, setStates] = useState(null);
  const [info, infoSet] = useState({
    short_name: '',
    business_name: '',
    country: '',
  });
  const [errors, errorsSet] = useState({
    short_name: '',
    business_name: '',
    country: '',
  });

  useEffect(() => {
    setCountries(regionData[0].countries);
    setStates(regionData[0].states);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = branchValidation.safeParse(info);
    if (result.success) return;
    if (result.error) {
      console.log(result.error.errors);
      result.error.errors.map((err) => {
        let path = err.path[0];
        errorsSet({ ...errors, [path]: err.message });
        console.log(err);
      });
    }
  };

  return (
    <div className=" bg-slate-300 flex absolute left-1/4 top-10 p-4 w-2/4">
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Branch Form</legend>
          <div className={'flex flex-col items-start'}>
            <label htmlFor="organization_id">ID</label>
            <input
              name="organization_id"
              id="organization_id"
              type="text"
              disabled
            />
            <label htmlFor="short_name">Nombre Corto</label>
            <input
              name="short_name"
              type="text"
              id="short_name"
              value={info.short_name}
              onChange={(e) => {
                handleChange(e, info, infoSet);
              }}
            />
            {errors.short_name ? <span>{errors.short_name}</span> : null}
            <label htmlFor="business_name">Nombre</label>
            <input
              name="business_name"
              type="text"
              id="business_name"
              value={info.business_name}
              onChange={(e) => {
                handleChange(e, info, infoSet);
              }}
            />
            {errors.business_name ? <span>{errors.business_name}</span> : null}
            <label htmlFor="country">Pais</label>
            <select
              name="country"
              id="country"
              value={info.country}
              onChange={(e) => {
                handleChange(e, info, infoSet);
              }}
            >
              <option value="" disabled selected hidden></option>
              {countries &&
                countries.map((country, index) => (
                  <option value={country.name} key={`${index}-${country.code}`}>
                    {country.name}
                  </option>
                ))}
            </select>
            <label htmlFor="state">Provincia</label>
            <select name="state" id="state">
              <option value="" disabled selected hidden></option>
              {states &&
                states.map((state, index) => (
                  <option value={state.name} key={`${index}-${state.code}`}>
                    {state.name}
                  </option>
                ))}
            </select>
            <label htmlFor="city">Ciudad</label>
            <input name="city" type="text" id="city" />
            <label htmlFor="street">Calle</label>
            <input name="street" type="text" id="street" />
            <label htmlFor="addres">Direccion</label>
            <input name="addres" type="text" id="addres" />
            <label htmlFor="postal_code">CP</label>
            <input name="postal_code" type="text" id="postal_code" />
            <label htmlFor="address_references">Otras Referencia</label>
            <input
              name="address_references"
              type="text"
              id="address_references"
            />
            <label htmlFor="business _phone">Telefono</label>
            <input name="business_phone" type="tel" id="business_phone" />
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" />
            <br />
            <button type={'submit'}>Enviar</button>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default BranchForm;
