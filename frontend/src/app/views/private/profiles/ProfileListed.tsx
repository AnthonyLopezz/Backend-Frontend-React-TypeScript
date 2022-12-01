import { useEffect, useState } from "react";
import Profile from "../../../models/Profile";
import PrivateService from "../../../services/PrivateService";
import ApiBackend from "../../../utilities/domains/apiBackend";

export const ProfileListed = () => {
  const [arrProfile, setArrProfile] = useState<Profile[]>([]);

  const getProfiles = async () => {
    const result = await PrivateService.peticionGET(ApiBackend.PROFILES_ALL);
    setArrProfile(result);
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
            <li className="breadcrumb-item active">Listado de perfiles</li>
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
                  <th style={{ width: "20%" }}>Orden</th>
                  <th style={{ width: "50%" }}>Nombre perfil</th>
                  <th style={{ width: "15%" }}>Estado</th>
                  <th className="text-center" style={{ width: "15%" }}>
                    Usuarios
                  </th>
                </tr>
              </thead>
              <tbody>
                {arrProfile.map((profile, count) => (
                  <tr key={count}>
                    <td style={{ width: "20%" }}>{count + 1}</td>
                    <td style={{ width: "50%" }}>{profile.profileName}</td>
                    <td style={{ width: "15%" }}>
                      {profile.profileStatus === 1 ? "Active" : "Inactive"}
                    </td>
                    <td className="text-center" style={{ width: "15%" }}>
                      {profile.quantityUsers}
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
