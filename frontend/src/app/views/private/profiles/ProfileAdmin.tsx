import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";

import { ToastContainer } from "react-toastify";
import Profile from "../../../models/Profile";
import ApiBackend from "../../../utilities/domains/apiBackend";
import PrivateService from "../../../services/PrivateService";
import { MessageToastify } from "../../../utilities/functions/MessageToastify";


export const ProfileAdmin = () => {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [arrProfiles, setArrProfiles] = useState<Profile[]>([]);
  const [objPro, setObjPro] = useState<Profile>(new Profile("", "", 0));

  const getProfiles = async () => {
    const resultado = await PrivateService.peticionGET( ApiBackend.PROFILES_ALL );
    setArrProfiles(resultado);
    return resultado;
  };

  const borrarPerfil = async (codProfile: string) => {
    const urlBorrar = ApiBackend.PROFILES_DELETE + "/" + codProfile;
    const resultado = await PrivateService.peticionDELETE(urlBorrar);
    console.log(resultado);
    if (typeof resultado.id === "undefined") {
      MessageToastify( "error", "No se puede crear eliminar el perfil. Es posible que esté relacionado con usuarios", 7000 );
    } else {
      MessageToastify("success", "Perfil eliminado de la base de datos", 7000);
    }
    getProfiles();
  };

  useEffect(() => {
    getProfiles();
  }, []);

    return (
      <main id="main" className="main">
      {/* Navegación estilo breadcrumb: Inicio */}
      <div className="pagetitle">
        <h1>Perfiles</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="index.html">Inicio</a>
            </li>
            <li className="breadcrumb-item active">
              Administración de perfiles
            </li>
          </ol>
        </nav>
      </div>
      {/* Navegación estilo breadcrumb: Fin */}

      {/* Ejempplo de una tabla para presentación de datos: Inicio */}
      <div className="col-lg-12">
        <div className="card">
          <div className="card-body">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th style={{ width: "25%" }}>Orden</th>
                  <th style={{ width: "40%" }}>Nombre perfil</th>
                  <th style={{ width: "15%" }}>Estado</th>
                  <th className="text-center" style={{ width: "10%" }}>
                    Usuarios
                  </th>
                  <th style={{ width: "10%" }}> </th>
                </tr>
              </thead>
              <tbody>
                {arrProfiles.map((miPerfil, indice) => (
                  <tr key={indice}>
                    <td>{indice + 1}</td>
                    <td>{miPerfil.profileName}</td>
                    <td>
                      {miPerfil.profileStatus === 1 ? "Activo" : "Inactivo"}
                    </td>
                    <td className="text-center">{miPerfil.quantityUsers}</td>
                    <td className="text-center">
                      {miPerfil.quantityUsers === 0 ? (
                        <a
                          href="/#"
                          onClick={(e) => {
                            e.preventDefault();
                            setShow(true);
                            setObjPro(miPerfil);
                          }}
                        >
                          <i
                            className="fa-solid fa-trash-can"
                            style={{ color: "#990000" }}
                          ></i>
                        </a>
                      ) : (
                        <i
                          className="fa-solid fa-trash-can"
                          style={{ color: "#908989" }}
                        ></i>
                      )}{" "}
                      <Link to={"/home/updateprofile/" + miPerfil._id}>
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
                <Modal.Title>Eliminar perfil</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                ¿Realmente desea eleminar el perfil?
                <br />
                <strong>{objPro.profileName}</strong>
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
                    borrarPerfil(objPro._id);
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
      {/* Ejempplo de una tabla para presentación de datos: Fin */}

      {/* Requerido para presentar los mensajes Toast: Inicio */}
      <ToastContainer />
      {/* Requerido para presentar los mensajes Toast: Fin */}
    </main>
    );
  };
  