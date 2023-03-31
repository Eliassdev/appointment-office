import { useState, useEffect } from 'react';
import { Country, State } from 'country-state-city';

const useCountryState = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
<<<<<<< HEAD
  const [selectedCountry, setSelectedCountry] = useState(null);
=======
  const [selectedCountry, setSelectedCountry] = useState('');
>>>>>>> d239a85 (create useCountryState.hook)

  useEffect(() => {
    setCountries(Country.getAllCountries());
  }, []);

  useEffect(() => {
    if (selectedCountry) {
<<<<<<< HEAD
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
=======
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
>>>>>>> d239a85 (create useCountryState.hook)
    handleCountryChange,
  };
};

export default useCountryState;
