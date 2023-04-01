import { useState, useEffect } from 'react';
import { Country, State } from 'country-state-city';

const useCountryState = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    setCountries(Country.getAllCountries());
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      setStates(State.getStatesOfCountry(selectedCountry.isoCode));
    }
  }, [selectedCountry]);

  const handleCountryChange = (country) => {
    const countryObj =
      countries.filter((c) => {
        if (c.name === country) {
          return c;
        }
      })[0] || null;
    setSelectedCountry(countryObj);
  };

  return {
    // Get all countries
    countries,
    // Get all states
    states,
    // Get selected country
    selectedCountry,
    // Handle country change
    handleCountryChange,
  };
};

export default useCountryState;
