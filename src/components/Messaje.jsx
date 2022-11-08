import React from "react";

const Messaje = ({ error }) => {
  return (
    <div>
      <h3>
        {error.statusText} - {error.status}
      </h3>
      <p>Tu busqueda no existe, por favor pruba otra vez</p>
    </div>
  );
};

export default Messaje;
