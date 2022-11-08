import React, { useState } from "react";

const SelectList = ({ db2, setCountry }) => {
  return (
    <label>
      Please select the country
      <select
        className="browser-default"
        onChange={(e) => setCountry(e.target.value)}
      >
        <option value="" defaultValue>
          Elegir pais
        </option>
        {db2 &&
          db2.map((el) => (
            <option key={el.id} value={el.shortName}>
              {el.shortName} = {el.longName}
            </option>
          ))}
      </select>
    </label>
  );
};

export default SelectList;
