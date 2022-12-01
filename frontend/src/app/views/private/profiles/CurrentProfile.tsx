import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { ToastContainer } from "react-toastify";

import Profile from "../../../models/Profile";
import ApiBackend from "../../../utilities/domains/apiBackend";
import PrivateService from "../../../services/PrivateService";
import { MessageToastify } from "../../../utilities/functions/MessageToastify";
import { useForm } from "../../../utilities/hooks/useForm";


export const CurrentProfile = () => {
  // Variables
let { id } = useParams();
type formaHtml = React.FormEvent<HTMLFormElement>;
const [enProceso, setEnProceso] = useState<boolean>(false);
const [todoListo, setTodoListo] = useState<boolean>(false);
let cargaFinalizada = todoListo !== undefined;
let { profileName, profileStatus, dobleLink, obj } =
  useForm<Profile>(new Profile("", "", 0));
// *******************************************************************


    // Consultar datos del perfil a modificar
  // *******************************************************************
  const obtenerUnPerfil = async () => {
    const urlCargarUnPerfil = ApiBackend.PROFILES_GETONE + "/" + id;
    const perfilRecibido = await PrivateService.peticionGET(
      urlCargarUnPerfil
    );
    obj._id = perfilRecibido._id;
    obj.profileName = perfilRecibido.profileName;
    obj.profileStatus = perfilRecibido.profileStatus;
    if (perfilRecibido) {
      setTodoListo(true);
    }
  };
  // *******************************************************************

// Actualizar el perfil
// *******************************************************************
const enviarFormulario = async (fh: formaHtml) => {
  fh.preventDefault();
  setEnProceso(true);
  const formulario = fh.currentTarget;
  formulario.classList.add("was-validated");

  if (formulario.checkValidity() === false) {
    fh.preventDefault();
    fh.stopPropagation();
  } else {
    const urlActualizar = ApiBackend.PROFILES_UPDATE + "/" + obj._id;
    const resultado = await PrivateService.peticionPUT(
      urlActualizar,
      obj
    );

    if (resultado.new) {
      setEnProceso(false);
      MessageToastify("success", "Perfil actualizado correctamente", 6000);
    } else {
      MessageToastify(
        "error",
        "No se puede actualizar el perfil. Es posible que el nombre ya exista en la base de datos",
        6000
      );
    }
  }
};
// *******************************************************************

// Hook de react que se usa cuando se renderiza o pinta la página (vista)
useEffect(() => {
  obtenerUnPerfil();
}, []);
// *******************************************************************

    return (
      <main id="main" className="main">
      {/* Navegación estilo breadcrumb: Inicio */}
      <div className="pagetitle">
        <h1>Perfiles</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/home">Inicio</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/home/admprofile">Administración de perfiles</Link>
            </li>
            <li className="breadcrumb-item active">Actualizar</li>
          </ol>
        </nav>
      </div>
      {/* Navegación estilo breadcrumb: Fin */}

      {/* Ejemplo de furmulario: Inicio */}
      <div className="col-lg-12">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Formulario de edición</h5>
            {cargaFinalizada ? (
              <Form
                noValidate
                validated={enProceso}
                onSubmit={enviarFormulario}
              >
                <Form.Group as={Row} className="mb-3" controlId="profileName">
                  <Form.Label column sm={2}>
                    Nombre perfil
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      required
                      type="text"
                      name="profileName"
                      className="form-control"
                      value={profileName}
                      onChange={dobleLink}
                    />
                    <Form.Control.Feedback type="invalid">
                      Nombre del perfil es obligatorio
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="profileStatus">
                  <Form.Label column sm={2}>
                    Estado perfil
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Select
                      required
                      name="profileStatus"
                      value={profileStatus}
                      onChange={dobleLink}
                    >
                      <option value={1}>Activo</option>
                      <option value={2}>Inactivo</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      Seleccione el estado del perfil
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                  <Col sm={{ span: 10, offset: 2 }}>
                    <Button type="submit" className="btn btn-sm">
                      Actualizar perfil
                    </Button>
                  </Col>
                </Form.Group>
              </Form>
            ) : (
              <div>Cargando información para la edición</div>
            )}
          </div>
        </div>
      </div>
      {/* Ejemplo de furmulario: Fin */}

      {/* Requerido para presentar los mensajes Toast: Inicio */}
      <ToastContainer />
      {/* Requerido para presentar los mensajes Toast: Fin */}
    </main>
    );
  };
  