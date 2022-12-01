
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";


import Vehicle from "../../../models/Vehicle";
import Brand from "../../../models/Brand";
import Color from "../../../models/Color";
import ApiBackend from "../../../utilities/domains/apiBackend";
import PrivateService from "../../../services/PrivateService";
import { useForm } from "../../../utilities/hooks/useForm";
import { MessageToastify } from "../../../utilities/functions/MessageToastify";
import { ToastContainer } from "react-toastify";
import { ConvBs64 } from "../../../utilities/functions/ConvBs64";

export const CurrentUser = () => {

    // Variables
    let { id } = useParams();
  
    const [todoListo, setTodoListo] = useState<boolean>(false);
    let cargaFinalizada = todoListo !== false;
  
    type formaHtml = React.FormEvent<HTMLFormElement>;
    const [enProceso, setEnProceso] = useState<boolean>(false);
    const [arr, setarr] = useState<Vehicle[]>([]);
    // *******************************************************************
  
  // Hook para formulario
    let {  brandId, colorId, plate, dobleLink, obj,
    } = useForm<Vehicle>( new Vehicle("", new Brand("", "",), new Color("", ""),"") );
    // *******************************************************************
  
  
    // Consulta los datos de un usuario por su _id
    // *******************************************************************
    const obtenerUnUsuario = async () => {
      const urlCargarUnUsuario = ApiBackend.USUARIOS_OBTENER_UNO + "/" + id;
      const usuRecibido = await PrivateService.peticionGET(urlCargarUnUsuario);
      if (usuRecibido) {
        obj.brandId = usuRecibido.brandId;
        obj.colorId = usuRecibido.colorId;
        obj.plate = usuRecibido.plate;
        if (usuRecibido) {
          setTodoListo(true);
        }
      }
    };
    // *******************************************************************
  
    // Obtener perfiles a mostrar en el combo
    const obtenerMarcas = async () => {
      const resultado = await PrivateService.peticionGET( ApiBackend.BRANDS_ALL );
      setarr(resultado);
      if (resultado) { setTodoListo(true); }
    };
 
    const obtenerColores = async () => {
     const resultado = await PrivateService.peticionGET( ApiBackend.COLORS_ALL );
     setarr(resultado);
     if (resultado) { setTodoListo(true); }
   };
    // ************************************************************************
  
  
  
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
  
        const urlActualizar = ApiBackend.VEHICLE_ACTUALIZAR + "/" + id;
        const objActualizar = new Vehicle( obj._id, obj.brandId, obj.colorId,"" );
        const resultado = await PrivateService.peticionPUT( urlActualizar, objActualizar );
  
        if (resultado.nuevo) {
          setEnProceso(false);
          MessageToastify("success", "Vehicle actualizado correctamente", 7000);
        } else {
          MessageToastify( "error", "No se puede actualizar el vehicle. Verifique el correo electrónico", 7000 );
        }
      }
    };
    // *******************************************************************
  
  // Hook para cargar información una vez renderizado el componente
    useEffect(() => {
      obtenerColores();
      obtenerMarcas();
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
                <Form.Group as={Row} className="mb-3" controlId="brandId">
                  <Form.Label column sm={3}>
                    <span className="text-success">
                      <small>Marca del vehiculo:</small>
                    </span>
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Select
                      size="sm"
                      required
                      name="brandId"
                      value={brandId._id}
                      onChange={dobleLink}
                    >
                      <option value="">Seleccione la marca</option>
                      {arr.map((miPer, indice) => (
                        <option key={indice} value={miPer._id}>
                          {miPer.brandId.brand}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      Seleccione la marca del vehiculo
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="colorId">
                  <Form.Label column sm={3}>
                    <span className="text-success">
                      <small>Color del vehiculo:</small>
                    </span>
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Select
                      size="sm"
                      required
                      name="colorId"
                      value={colorId._id}
                      onChange={dobleLink}
                    >
                      <option value="">Seleccione la marca</option>
                      {arr.map((miPer, indice) => (
                        <option key={indice} value={miPer._id}>
                          {miPer.colorId.color}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      Seleccione la marca del vehiculo
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="plate">
                  <Form.Label column sm={3}>
                    <span className="text-success">
                      <small>Placa</small>
                    </span>
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      size="sm"
                      required
                      type="text"
                      name="plate"
                      className="form-control"
                      value={plate}
                      onChange={dobleLink}
                    />
                    <Form.Control.Feedback type="invalid">
                      Placa del vehiculo
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                  <Col sm={{ span: 9, offset: 3 }}>
                    <Button type="submit" className="btn btn-primary">
                      Actualizar usuario
                    </Button>
                  </Col>
                </Form.Group>
              </Form>
            ) : (
              <div>Cargando información de los vehiculos</div>
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
  