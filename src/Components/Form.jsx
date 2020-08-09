import React, { useState } from 'react';
import PropTypes from 'prop-types'

import Error from './Error'

const Form = ({selection, setSelection, setQuerySent}) => {

  const [error, setError] = useState(false);

  const { country, city } = selection;

  const gettingSelection = (event) => {
    setSelection({
      ...selection,
      [event.target.name]: event.target.value,
    });
  };

  const submitForm = (event) => {
    event.preventDefault();

    // FORM VALITDATION

    if (country === '' || city === '') {
      setError(true);
      return;
    }
    // SENT SELECTION TO APP
    setError(false);
    setQuerySent(true)
  };

  return (
    <form onSubmit={submitForm}>
      {error ? (
        <Error message='Todos los campos son necesarios' />
      ) : null}
      <div className='input-field col s12'>
        <input
          type='text'
          name='city'
          id='city'
          value={city}
          onChange={gettingSelection}
        />
        <label htmlFor='city'>Ciudad: </label>
      </div>
      <div className='input-field col s12'>
        <select
          name='country'
          id='country'
          value={country}
          onChange={gettingSelection}
        >
          <option value=''>---Seleciona un país---</option>
          <option value='US'>Estados Unidos</option>
          <option value='MX'>México</option>
          <option value='AR'>Argentina</option>
          <option value='CO'>Colombia</option>
          <option value='CR'>Costa Rica</option>
          <option value='ES'>España</option>
          <option value='PE'>Perú</option>
        </select>
        <label htmlFor='country'>País:</label>
      </div>
      <input className="input-submit waves-effect waves-light btn-large btn-block yellow accent-4" type='submit' value="Enviar"/>
    </form>
  );
};

Form.propTypes = {
  selection: PropTypes.object.isRequired,
  setSelection: PropTypes.func.isRequired,
  setQuerySent: PropTypes.func.isRequired
}

export default Form;
