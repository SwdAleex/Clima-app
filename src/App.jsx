import React, { Fragment, useState, useEffect } from 'react';

import Header from './Components/Header';
import Form from './Components/Form';
import WeatherBoard from './Components/WeatherBoard';
import Error from './Components/Error';

function App() {
  //api.openweathermap.org/data/2.5/weather?q=Mexico,MX&APPID=e4a8104a6f1e8619a8c60c57e27d9d6c

  // DEFINING STATES

  const [selection, setSelection] = useState({
    country: '',
    city: '',
  });

  const [querySent, setQuerySent] = useState(false);
  const [result, setResult] = useState({});
  const [error, setError] = useState(false);

  const { country, city } = selection;

  useEffect(() => {
    const apiQwery = async () => {
      if (querySent) {
        const apiKey = 'e4a8104a6f1e8619a8c60c57e27d9d6c';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${apiKey}`;

        const gottenData = await fetch(apiUrl);
        const data = await gottenData.json();

        setResult(data);
        setQuerySent(false);

        // ERROR DETECT

        if (data.cod === 200) {
          setError(false);
        } else {
          setError(true);
        }
      }
    };
    apiQwery();
    // eslint-disable-next-line
  }, [querySent]);

  let board;

  if (error) {
    board = <Error message='Ciudad no encontrada' />;
  } else {
    board = <WeatherBoard result={result} />;
  }

  return (
    <Fragment>
      <Header titulo={'Clima React'} />

      <div className='contenedor-form'>
        <div className='container div row'>
          <div className='col m6 s12'>
            <Form
              selection={selection}
              setSelection={setSelection}
              setQuerySent={setQuerySent}
            />
          </div>
          <div className='col m6 s12'>{board}</div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
