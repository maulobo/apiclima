import React, { useState } from "react";
import "./searchForm.css";
import SelectList from "./SelectList";

const SearchForm = ({ setSearch, setDb, db, setError, db2, setCountry }) => {
  const [city, setCity] = useState(null);
  const handleSubmit = (e) => {
    setError(false);
    e.preventDefault();
    if (db) {
      setDb(null);
    }
    if (!city) {
      alert("No buscaste nada!!!!!");
    } else {
      setDb(null);
      setSearch(city);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="city"
          onChange={(e) => {
            setCity(e.target.value);
          }}
        />
        {db2 && <SelectList db2={db2} setCountry={setCountry} />}
        <input type="submit" value="buscar" className="form" />
      </form>
    </>
  );
};

export default SearchForm;
