
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";


import noFoto from "../../../../assets/img/acercade.png";
import Profile from "../../../models/Profile";
import Usuario from "../../../models/Usuario";
import ApiBackend from "../../../utilities/domains/apiBackend";
import PrivateService from "../../../services/PrivateService";
import { useForm } from "../../../utilities/hooks/useForm";
import { MessageToastify } from "../../../utilities/functions/MessageToastify";
import { ToastContainer } from "react-toastify";
import { ConvBs64 } from "../../../utilities/functions/ConvBs64";

export const CurrentUser = () => {

    // Variables
    let { id } = useParams();
    const [avatarBase64, setAvatarBase64] = useState<string>("");
    const [imagenMiniatura, setImagenMiniatura] = useState(noFoto);
    const [nombreimagenTempo, setNombreimagenTempo] = useState<string>("");
  
    const [todoListo, setTodoListo] = useState<boolean>(false);
    let cargaFinalizada = todoListo !== false;
  
    type formaHtml = React.FormEvent<HTMLFormElement>;
    const [enProceso, setEnProceso] = useState<boolean>(false);
    const [arregloPerfiles, setArregloPerfiles] = useState<Profile[]>([]);
    // *******************************************************************
  
  // Hook para formulario
    let { nameUser, emailUser, stateUser, passwordUser, nameUserImg, userAvatar, codProfile, dobleLink, obj,
    } = useForm<Usuario>( new Usuario("", "", "", "", new Date(), 0, "", "", new Profile("", "", 1)) );
    // *******************************************************************
  
  
    // Consulta los datos de un usuario por su _id
    // *******************************************************************
    const obtenerUnUsuario = async () => {
      const urlCargarUnUsuario = ApiBackend.USUARIOS_OBTENER_UNO + "/" + id;
      const usuRecibido = await PrivateService.peticionGET(urlCargarUnUsuario);
      if (usuRecibido) {
        obj.nameUser = usuRecibido.nameUser;
        obj.emailUser = usuRecibido.emailUser;
        obj.stateUser = usuRecibido.stateUser;
        // Input file es inmutable !!!. La siguiente linea no se puede habilitar
        // obj.nameUserImg = usuRecibido.nameUserImg;
        obj.userAvatar = usuRecibido.userAvatar;
        obj.codProfile = usuRecibido.codProfile;
  
        if (usuRecibido) {
          setAvatarBase64(usuRecibido.userAvatar);
          setImagenMiniatura(usuRecibido.userAvatar);
          setNombreimagenTempo(usuRecibido.nameUserImg);
          setTodoListo(true);
        }
      }
    };
    // *******************************************************************
  
    // Obtener perfiles a mostrar en el combo
    const obtenerPerfiles = async () => {
      const resultado = await PrivateService.peticionGET( ApiBackend.PROFILES_ALL );
      setArregloPerfiles(resultado);
    };
    // ************************************************************************
  
  
    // Mostrar imagen en pantalla
    // *******************************************************************
    const mostrarImagen = async (e: any) => {
      const archivos = e.target.files;
      const imagen = archivos[0];
      setImagenMiniatura(URL.createObjectURL(imagen));
      dobleLink(e);
      const base64 = await ConvBs64(imagen);
      setAvatarBase64(String(base64));
    };
    // ************************************************************************
  
  
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
        obj.userAvatar = userAvatar;
        obj.userAvatar = avatarBase64;
  
        const urlActualizar = ApiBackend.USUARIOS_ACTUALIZAR + "/" + id;
        const objActualizar = new Usuario( obj._id, obj.nameUser, obj.emailUser, "", new Date(), obj.stateUser,
          nameUserImg !== "" ? nameUserImg : nombreimagenTempo, obj.userAvatar, obj.codProfile );
        const resultado = await PrivateService.peticionPUT( urlActualizar, objActualizar );
  
        if (resultado.nuevo) {
          setEnProceso(false);
          MessageToastify("success", "Usuario actualizado correctamente", 7000);
        } else {
          MessageToastify( "error", "No se puede actualizar el usuario. Verifique el correo electrónico", 7000 );
        }
      }
    };
    // *******************************************************************
  
  // Hook para cargar información una vez renderizado el componente
    useEffect(() => {
      obtenerPerfiles();
      obtenerUnUsuario();
    }, []);
  // *******************************************************************


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
            <li className="breadcrumb-item">
              <Link to="/home/admuser">Administración de usuarios</Link>
            </li>
            <li className="breadcrumb-item active">Actualizar</li>
          </ol>
        </nav>
      </div>
      {/* Navegación estilo breadcrumb: Fin */}

      {/* Ejemplo de formulario: Inicio */}
      <div className="col-lg-12">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Formulario de creación</h5>

            {cargaFinalizada ? (
              <Form
                noValidate
                validated={enProceso}
                onSubmit={enviarFormulario}
              >
                <Form.Group as={Row} className="mb-3" controlId="nameUser">
                  <Form.Label column sm={3}>
                    <span className="text-success">
                      <small>Nombre completo:</small>
                    </span>
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      size="sm"
                      required
                      type="text"
                      name="nameUser"
                      className="form-control"
                      value={nameUser}
                      onChange={dobleLink}
                    />
                    <Form.Control.Feedback type="invalid">
                      Nombre completo del usuario
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="emailUser">
                  <Form.Label column sm={3}>
                    <span className="text-success">
                      <small>Correo electrónico:</small>
                    </span>
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      size="sm"
                      required
                      type="text"
                      name="emailUser"
                      className="form-control"
                      pattern="[a-z0-9+_.-]+@[a-z]+\.[a-z]{2,3}"
                      value={emailUser}
                      onChange={dobleLink}
                    />
                    <Form.Control.Feedback type="invalid">
                      Correo inválido
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="stateUser">
                  <Form.Label column sm={3}>
                    <span className="text-success">
                      <small>Estado usuario:</small>
                    </span>
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Select
                      size="sm"
                      required
                      name="stateUser"
                      value={stateUser}
                      onChange={dobleLink}
                    >
                      <option value="">Seleccione el estado</option>
                      <option value={1}>Activo</option>
                      <option value={2}>Inactivo</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      Seleccione el estado inicial del usuario
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="codProfile">
                  <Form.Label column sm={3}>
                    <span className="text-success">
                      <small>Perfil del usuario:</small>
                    </span>
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Select
                      size="sm"
                      required
                      name="codProfile"
                      value={codProfile._id}
                      onChange={dobleLink}
                    >
                      <option value="">Seleccione el perfil</option>
                      {arregloPerfiles.map((miPer, indice) => (
                        <option key={indice} value={miPer._id}>
                          {miPer.profileName}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      Seleccione el perfil del usuario
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>

                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="nameUserImg"
                >
                  <Form.Label column sm={3}>
                    <div>
                      <span className="text-success">Foto actual: </span>
                      <span>
                        <small>{nombreimagenTempo}</small>
                      </span>
                    </div>
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      size="sm"
                      accept="image/png, image/jpeg"
                      type="file"
                      name="nameUserImg"
                      className="form-control"
                      value={nameUserImg}
                      onChange={mostrarImagen}
                    />
                    <Form.Control.Feedback type="invalid">
                      Debe seleccionar un avatar para el usuario
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>

                <div className="mb-3 row">
                  <div className="col-sm-3"></div>
                  <div className="d-flex justify-content-center col-sm-9">
                    <img
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src = noFoto;
                      }}
                      src={imagenMiniatura}
                      alt="Profile"
                      className="max-update-size"
                    />
                  </div>
                </div>

                <Form.Group as={Row} className="mb-3">
                  <Col sm={{ span: 9, offset: 3 }}>
                    <Button type="submit" className="btn btn-primary">
                      Actualizar usuario
                    </Button>
                  </Col>
                </Form.Group>
              </Form>
            ) : (
              <div>Cargando información de los perfiles</div>
            )}
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
  