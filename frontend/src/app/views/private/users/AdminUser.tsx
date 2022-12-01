
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";

import Profile from "../../../models/Profile";
import Usuario from "../../../models/Usuario";
import ApiBackend from "../../../utilities/domains/apiBackend";
import PrivateService from "../../../services/PrivateService";
import { useForm } from "../../../utilities/hooks/useForm";
import { MessageToastify } from "../../../utilities/functions/MessageToastify";
import { obtenerFechaLocal, obtenerHora } from "../../../utilities/functions/DateFormat";
import { ToastContainer } from "react-toastify";

export const AdminUser = () => {

     // ************************************************************************
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [objUsu, setObjUsu] = useState<Usuario>( new Usuario("", "", "", "", new Date(), 1, "", "", new Profile("", "", 1)) );
  const [arregloUsuarios, setArregloUsuarios] = useState<Usuario[]>([]);
  // ************************************************************************


  // Eliminar Profile
  // **************************************************************************
  const borrarUsuario = async (codUser: string) => {
    const urlBorrar = ApiBackend.USUARIOS_ELIMINAR + "/" + codUser;
    const resultado = await PrivateService.peticionDELETE(urlBorrar);
    console.log(resultado);
    if (typeof resultado.eliminado === "undefined") {
      MessageToastify("error", "No se puede eliminar el usuario.", 7000);
    } else {
      MessageToastify( "success", "Usuario con correo: " + objUsu.emailUser + " ha sido eliminado", 7000 );
    }
    obtenerUsuarios();
  };
  // **************************************************************************


  // ************************************************************************
  const obtenerUsuarios = async () => {
    const resultado = await PrivateService.peticionGET(
      ApiBackend.USUARIOS_OBTENER
    );
    setArregloUsuarios(resultado);
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
        <h1>Usuarios</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/home">Inicio</Link>
            </li>
            <li className="breadcrumb-item active">
              Administración de usuarios
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
                  <th style={{ width: "40%" }}>Usuario</th>
                  <th style={{ width: "16%" }}>Creación</th>
                  <th style={{ width: "20%" }}>Perfil</th>
                  <th className="text-center" style={{ width: "10%" }}>
                    Estado
                  </th>
                  <th style={{ width: "6%" }}> </th>
                </tr>
              </thead>
              <tbody>
                {arregloUsuarios.map((miUsu, indice) => (
                  <tr key={indice}>
                    <td className="text-center align-middle">
                      <small>{indice + 1}</small>{" "}
                    </td>
                    <td>
                      {miUsu.nameUser}
                      <br />
                      <small className="text-muted">
                        {miUsu.emailUser}
                      </small>
                    </td>
                    <td>
                      {obtenerFechaLocal(miUsu.dateUser)}
                      <br />
                      <small className="text-muted">
                        {obtenerHora(miUsu.dateUser)}
                      </small>
                    </td>
                    <td className="align-middle">
                      {miUsu.codProfile.profileName}
                    </td>
                    <td
                      className={
                        miUsu.stateUser === 1
                          ? "text-center align-middle text-success"
                          : "text-center align-middle text-danger"
                      }
                    >
                      <small>
                        {miUsu.stateUser === 1 ? "Activo" : "Inactivo"}{" "}
                      </small>
                    </td>
                    <td className="text-center align-middle">
                      <Link to={"/home/detailuser/" + miUsu._id}>
                        <i className="fa-solid fa-magnifying-glass fa-sm"></i>
                      </Link>{" "}
                      <a
                        href="/#"
                        onClick={(e) => {
                          e.preventDefault();
                          setShow(true);
                          setObjUsu(miUsu);
                        }}
                      >
                        <i
                          className="fa-solid fa-trash-can fa-sm"
                          style={{ color: "#990000" }}
                        ></i>
                      </a>{" "}
                      <Link to={"/home/updateuser/" + miUsu._id}>
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
                <strong>
                  {objUsu.nameUser} - {objUsu.emailUser}
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
                    borrarUsuario(objUsu._id);
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
  