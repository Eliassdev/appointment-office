import { useState, useEffect } from 'react';
import { Country, State } from 'country-state-city';

const useCountryState = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');

  useEffect(() => {
    setCountries(Country.getAllCountries());
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      setStates(State(selectedCountry));
    }
  }, [selectedCountry]);

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  return {
    countries,
    states,
    selectedCountry,
    handleCountryChange,
  };
};

export default useCountryState;
