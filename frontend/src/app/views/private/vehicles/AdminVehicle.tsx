
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";

import Vehicle from "../../../models/Vehicle";
import Brand from "../../../models/Brand";
import Color from "../../../models/Color";
import ApiBackend from "../../../utilities/domains/apiBackend";
import PrivateService from "../../../services/PrivateService";
import { useForm } from "../../../utilities/hooks/useForm";
import { MessageToastify } from "../../../utilities/functions/MessageToastify";
import { obtenerFechaLocal, obtenerHora } from "../../../utilities/functions/DateFormat";
import { ToastContainer } from "react-toastify";

export const AdminVehicle = () => {

     // ************************************************************************
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [obj, setobj] = useState<Vehicle>( new Vehicle("", new Brand("", ""), new Color("", ""), "") );
  const [arr, setarr] = useState<Vehicle[]>([]);
  // ************************************************************************


  // Eliminar Profile
  // **************************************************************************
  const borrarUsuario = async (id: string) => {
    const urlBorrar = ApiBackend.VEHICLE_ELIMINAR + "/" + id;
    const resultado = await PrivateService.peticionDELETE(urlBorrar);
    console.log(resultado);
    if (typeof resultado.eliminado === "undefined") {
      MessageToastify("error", "No se puede eliminar el vehiculo.", 7000);
    } else {
      MessageToastify( "success", "Vehicle con placa: " + obj.plate + " ha sido eliminado", 7000 );
    }
    obtenerVehiculos();
  };
  // **************************************************************************


  // ************************************************************************
  const obtenerVehiculos = async () => {
    const resultado = await PrivateService.peticionGET(
      ApiBackend.VEHICLE_OBTENER
    );
    setarr(resultado);
  };
  // ************************************************************************


  // ************************************************************************
  useEffect(() => {
    obtenerVehiculos();
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
              <Link to="/home">Inicio</Link>
            </li>
            <li className="breadcrumb-item active">
              Administración de vehiculos
            </li>
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
                  <th className="text-center" style={{ width: "8%" }}>
                    {" "}
                    Nro{" "}
                  </th>
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
                      {miUsu.brandId.brand}
                      <br />
                      <small className="text-muted">
                        {miUsu.colorId.color}
                      </small>
                    </td>
                    <td>
                    {miUsu.plate}
                    </td>
                    <td className="text-center align-middle">
                      <Link to={"/home/detailvec/" + miUsu._id}>
                        <i className="fa-solid fa-magnifying-glass fa-sm"></i>
                      </Link>{" "}
                      <a
                        href="/#"
                        onClick={(e) => {
                          e.preventDefault();
                          setShow(true);
                          setobj(miUsu);
                        }}
                      >
                        <i
                          className="fa-solid fa-trash-can fa-sm"
                          style={{ color: "#990000" }}
                        ></i>
                      </a>{" "}
                      <Link to={"/home/updatevec/" + miUsu._id}>
                        <i
                          className="fa-regular fa-pen-to-square"
                          style={{ color: "#006600" }}
                        ></i>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Modal para eliminar */}
            {/* *********************************************************************************/}
            <Modal
              show={show}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header closeButton>
                <Modal.Title>Eliminar vehiculo</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                ¿Realmente desea eleminar el vehiculo?
                <br />
                <strong>
                  {obj.brandId.brand} - {obj.plate}
                </strong>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={(e) => {
                    setShow(false);
                  }}
                >
                  Cancelar
                </Button>
                <Button
                  variant="danger"
                  onClick={(e) => {
                    borrarUsuario(obj._id);
                    setShow(false);
                  }}
                >
                  Eliminar
                </Button>
              </Modal.Footer>
            </Modal>
            {/* *********************************************************************************/}
          </div>
        </div>
      </div>
      {/* Ejemplo de una tabla para presentación de datos: Fin */}

      {/* Requerido para presentar los mensajes Toast: Inicio */}
      <ToastContainer />
      {/* Requerido para presentar los mensajes Toast: Fin */}
    </main>
    );
  };
  