import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { ToastContainer } from "react-toastify";

import Profile from "../../../models/Profile";
import PrivateService from "../../../services/PrivateService";
import ApiBackend from "../../../utilities/domains/apiBackend";
import { useForm } from "../../../utilities/hooks/useForm";
import { MessageToastify } from "../../../utilities/functions/MessageToastify";
import { useState } from "react";

export const NewProfile = () => {
  // Variables
  type formaHtml = React.FormEvent<HTMLFormElement>;
  const [enProceso, setEnProceso] = useState<boolean>(false);
  let { profileName, profileStatus, dobleLink, obj } = useForm<Profile>(
    new Profile("","", 0)
  );
  // *******************************************************************

  // Función flecha para limpiar cajas
  const limpiarCajas = (formulario: HTMLFormElement) => {
    formulario.reset();

    obj.profileName = "";
    obj.profileStatus = 0;

    formulario.profileName.value = "";
    formulario.profileStatus.value = "";

    formulario.classList.remove("was-validated");
  };

  // Crear el perfil
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
      const result = await PrivateService.peticionPOST(
        ApiBackend.PROFILES_CREATE,
        obj
      );
      if (result.id) {
        setEnProceso(false);
        MessageToastify("info", "Profile created!", 7000);
      } else {
        MessageToastify("error", "Profile created!", 7000);
      }
      limpiarCajas(formulario);
    }
  };

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
            <li className="breadcrumb-item active">Crear perfil</li>
          </ol>
        </nav>
      </div>
      {/* Navegación estilo breadcrumb: Fin */}

      {/* Ejemplo de formulario: Inicio */}
      <div className="col-lg-12">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Formulario de creación</h5>

            <Form noValidate validated={enProceso} onSubmit={enviarFormulario}>
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
                    <option value="">Seleccione el estado</option>
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
                  <Button type="submit">Crear perfil</Button>
                </Col>
              </Form.Group>
            </Form>
          </div>
        </div>
      </div>
      {/* Ejemplo de formulario: Inicio */}

      {/* Requerido para presentar los mensajes Toast: Inicio */}
      <ToastContainer />
      {/* Requerido para presentar los mensajes Toast: Fin */}
    </main>
  );
};
