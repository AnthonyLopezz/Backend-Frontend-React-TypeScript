import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import Vehicle from "../../../models/Vehicle";
import Brand from "../../../models/Brand";
import Color from "../../../models/Color";
import ApiBackend from "../../../utilities/domains/apiBackend";
import PrivateService from "../../../services/PrivateService";



export const ListVehicles = () => {

    // ************************************************************************
  const [arr, setarr] = useState<Vehicle[]>([]);
  // ************************************************************************

  // ************************************************************************
  const obtenerUsuarios = async () => {
    const resultado = await PrivateService.peticionGET( ApiBackend.VEHICLE_OBTENER );
    setarr(resultado);
  };
  // ************************************************************************

  // ************************************************************************
  useEffect(() => {
    obtenerUsuarios();
  }, []);
  // ************************************************************************

    return (
      <main id="main" className="main">
      {/* Navegación estilo breadcrumb: Inicio */}
      <div className="pagetitle">
        <h1>Vehiculos</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="index.html">Inicio</a>
            </li>
            <li className="breadcrumb-item active">Listado de vehiculos</li>
          </ol>
        </nav>
      </div>
      {/* Navegación estilo breadcrumb: Fin */}

      {/* Ejemplo de una tabla para presentación de datos: Inicio */}
      <div className="col-lg-12">
        <div className="card">
          <div className="card-body">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th className="text-center" style={{ width: "8%" }}> Nro </th>
                  <th style={{ width: "40%" }}>Marca</th>
                  <th style={{ width: "16%" }}>Color</th>
                  <th style={{ width: "20%" }}>Placa</th>
                  <th style={{ width: "6%" }}> </th>
                </tr>
              </thead>
              <tbody>
                {arr.map((miUsu, indice) => (
                  <tr key={indice}>
                    <td className="text-center align-middle">
                      <small>{indice + 1}</small>{" "}
                    </td>
                    <td>
                      {miUsu.brandId._id}
                      <br />
                      <small className="text-muted">
                        {miUsu.colorId._id}
                      </small>
                    </td>
                    <td>
                      {miUsu.plate}
                    </td>
                    <td className="text-center align-middle">
                      <Link to={"/home/detailvec/"+miUsu._id}>
                        <i className="fa-solid fa-magnifying-glass fa-sm"></i>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* Ejemplo de una tabla para presentación de datos: Fin */}
    </main>
    );
  };
  