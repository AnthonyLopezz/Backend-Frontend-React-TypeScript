
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Usuario from "../../../models/Usuario";
import ApiBackend from "../../../utilities/domains/apiBackend";
import noFoto from "../../../../assets/img/acercade.png"
import PrivateService from "../../../services/PrivateService";
import { obtenerFechaLocal, obtenerHora } from "../../../utilities/functions/DateFormat";


export const DetailsUser = () => {

  let { id } = useParams();
  const regresar = useNavigate();
  const [todoListo, setTodoListo] = useState<boolean>(false);
  let cargaFinalizada = todoListo !== undefined;
  const [objUsuario, setObjUsuario] = useState<Usuario>();

  useEffect(() => {
    // Consulta los datos de un usuario por su _id
    // *******************************************************************
    const obtenerUnUsuario = async () => {
      const urlCargarUnUsuario = ApiBackend.USUARIOS_OBTENER_UNO + "/" + id;
      const usuRecibido = await PrivateService.peticionGET(urlCargarUnUsuario);
      if (usuRecibido) {
        setObjUsuario(usuRecibido);
        setTodoListo(true);
      }
    };
    // *******************************************************************
    obtenerUnUsuario();
  }, [id]);

    return (
      <main id="main" className="main">
      {cargaFinalizada ? (
        <div className="d-flex justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">Información del usuario</div>
              <div className="card-body">
                <h5 className="card-title">
                  Nombre: {objUsuario?.nameUser}
                </h5>
                <p className="card-text">
                  Correo: {objUsuario?.emailUser}
                  <br />
                  Perfil: {objUsuario?.codProfile.profileName}
                  <br />
                  Fecha creación:{" "}
                  {obtenerFechaLocal(String(objUsuario?.dateUser))}
                  <br />
                  Hora creación:{" "}
                  {obtenerHora(String(objUsuario?.dateUser))}
                  <br />
                  Estado:
                  <span
                    className={
                      objUsuario?.stateUser === 1
                        ? "text-success"
                        : "text-danger"
                    }
                  >
                    {objUsuario?.stateUser === 1 ? "Activo" : "Inactivo"}
                  </span>
                  <br />
                  Nombre avatar: {objUsuario?.nameUserImg}
                  <br />
                  <img
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null;
                      currentTarget.src = noFoto;
                    }}
                    src={objUsuario?.userAvatar}
                    alt="Profile"
                    className="max-creation-size"
                  />
                </p>
              </div>
              <div className="card-footer">
                <button
                  onClick={() => regresar(-1)}
                  className="btn btn-info btn-sm"
                >
                  Regresar
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Carga de usuario en proceso</div>
      )}
    </main>
    );
  };
  