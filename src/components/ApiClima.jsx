import React, { useEffect, useState } from "react";
import ClimaCard from "./ClimaCard";
import Loader from "./Loader";
import Messaje from "./Messaje";
import SearchForm from "./SearchForm";
import "./apiClima.css";
import "materialize-css/dist/css/materialize.min.css";

const ApiClima = () => {
  const [db, setDb] = useState(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState(null);
  const [error, setError] = useState(null);
  const [db2, setDb2] = useState(null);
  const [country, setCountry] = useState(null);

  useEffect(() => {
    const url = "https://restcountries.com/v3.1/all";

    const abortController = new AbortController();
    const signal = abortController.signal;
    const respuesta = async () => {
      setLoading(true);
      try {
        const res = await fetch(url);
        if (!res.ok) {
          let err = new Error("Error en la peticion fetch");
          err.status = res.status || "00";
          err.statusText = res.statusText || "ocurrio un error";
          throw err;
        }
        const data = await res.json();

        let dataUtil = data.map((el) => {
          return {
            id: el.ccn3,
            shortName: el.cca2,
            longName: el.name.common,
          };
        });
        console.log(dataUtil);
        setDb2(dataUtil);

        if (!signal.aborted) {
          setError(null);
        }
      } catch (error) {
        if (!signal.aborted) {
          setError(error);
        }
      } finally {
        setLoading(false);
      }
    };
    respuesta();
  }, []);

  useEffect(() => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${search},${country}&APPID=23fca73ccf86754594e2cb9081dbf93d&&units=metric`;
    if (search === null) return;

    const abortController = new AbortController();
    const signal = abortController.signal;
    const respuesta = async () => {
      setLoading(true);
      try {
        const res = await fetch(url);
        if (!res.ok) {
          let err = new Error("Error en la peticion fetch");
          err.status = res.status || "00";
          err.statusText = res.statusText || "ocurrio un error";
          throw err;
        }
        const climaBuscado = await res.json();

        console.log(climaBuscado);
        if (!signal.aborted) {
          setDb(climaBuscado);
          setError(null);
        }
      } catch (error) {
        if (!signal.aborted) {
          setError(error);
        }
      } finally {
        setLoading(false);
        setSearch(null);
      }
    };
    respuesta();
  }, [search]);

  return (
    <div className="mia">
      <div>
        <h1>App del Clima</h1>
        {loading && <Loader />}
        {db2 && (
          <SearchForm
            db2={db2}
            setCountry={setCountry}
            setSearch={setSearch}
            search={search}
            setDb={setDb}
            db={db}
            setError={setError}
          />
        )}
        <div>{db && <ClimaCard db={db} />}</div>
        {error && <Messaje error={error} />}
      </div>
    </div>
  );
};

export default ApiClima;
