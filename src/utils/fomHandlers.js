export const handleChange = (event, state, stateSet) => {
  stateSet({ ...state, [event.target.name]: event.target.value });
};
