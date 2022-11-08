import React, { useEffect, useState } from "react";
// import "materialize-css/dist/css/materialize.min.css";
import images from "../assets/images.gif";
import images2 from "../assets/clear.jpg";
import images3 from "../assets/clouds.jpg";
import "./climaCard.css";

const ClimaCard = ({ db }) => {
  const { name, timezone, main, wind, weather, sys } = db;
  const [hours, setHours] = useState(null);
  const [minutes, setMinutes] = useState(null);
  const [seconds, setSeconds] = useState(null);
  const [sky, setSky] = useState(null);

  let ciudad = name,
    pais = sys.country,
    temperatura = Math.trunc(main.temp),
    velocidadViento = wind.speed,
    horaEnHora = timezone / 3600,
    cielo = weather[0].main,
    iconoCode = weather[0].icon,
    tempMax = main.temp_max,
    tempMin = main.temp_min,
    iconUrl = "http://openweathermap.org/img/w/" + iconoCode + ".png";

  useEffect(() => {
    if (cielo === "Rain") {
      console.log("hola");
      setSky(images);
    } else if (cielo === "Clear") {
      setSky(images2);
    } else if (cielo === "Clouds") {
      console.log("HHH");
      setSky(images3);
    } else if (cielo === "overcast clouds") {
      setSky(images3);
    }
  }, [cielo]);

  const clock = () => {
    let mydia = new Date(),
      second =
        mydia.getSeconds() < 10 ? "0" + mydia.getSeconds() : mydia.getSeconds(),
      minute =
        mydia.getMinutes() < 10 ? "0" + mydia.getMinutes() : mydia.getMinutes(),
      hour = mydia.getHours() + 3 + horaEnHora;

    if (hour > 24) {
      hour = "0" + mydia.getHours() - 21 + horaEnHora;
    }

    setHours(hour);
    setSeconds(second);
    setMinutes(minute);
  };
  setInterval(clock, 1000);

  return (
    <div>
      <div>
        <div className="col s12 m6 cardCard ">
          <div
            className="card darken-1"
            style={{
              backgroundImage: `url(${sky})`,
              backgroundRepeat: "noRepeat",
              backgroundSize: "Cover",
              backgroundPosition: "center",
            }}
          >
            <div className="card-content white-text adelante ">
              <h3>{ciudad}</h3>
              <span className="card-title">{pais}</span>
              <span className="card-title">
                {hours < 10
                  ? `0${hours || "0"}:${minutes || "00"}:${seconds || "00"}`
                  : `${hours || "00"}:${minutes || "00"}:${seconds || "00"}`}
              </span>
              {/* <img src={`${sky}`} alt="" /> */}
              Foto
              <p>{temperatura}°C</p>
              <p>Velocidad del viento: {velocidadViento} km/h </p>
              <p>MAXIMA :{tempMax}°C</p>
              <p>MINIMA :{tempMin}°C</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ClimaCard;
