import ApiBackend from "../utilities/domains/apiBackend";

class PrivateService {
  // Servicio con bearer para hacer peticiones GET
  // *******************************************************************
  public static async peticionGET(urlServicio: string) {
    const bearer = "Bearer " + String(localStorage.getItem("Token"));

    const datosEnviar = {
      method: "GET",
      headers: { "Content-Type": "application/json; charset=UTF-8", authorization: bearer }
    };

    const url = ApiBackend.URL + urlServicio;
    const respuesta = fetch(url, datosEnviar)
      .then((respuesta) => respuesta.json())
      .then((datos) => { return datos; })
      .catch((miError) => { return miError; });
    return respuesta;
  }

  // Servicio con bearer para hacer peticiones POST
  // *******************************************************************
  public static async peticionPOST(urlServicio: string, miJSON: any) {
    const bearer = "Bearer " + String(localStorage.getItem("Token"));

    const datosEnviar = {
      method: "POST",
      body: JSON.stringify(miJSON),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        authorization: bearer
      }
    };

    const url = ApiBackend.URL + urlServicio;
    const respuesta = fetch(url, datosEnviar)
      .then((respuesta) => respuesta.json())
      .then((datos) => { return datos; })
      .catch((miError) => { return miError; });
    return respuesta;
  }

  // Servicio con bearer para hacer peticiones DELETE
  // *******************************************************************
  public static async peticionDELETE(urlServicio: string) {
    const bearer = "Bearer " + String(localStorage.getItem("Token"));

    const datosEnviar = { method: "DELETE", headers: { "Content-Type": "application/json; charset=UTF-8", authorization: bearer } };

    const url = ApiBackend.URL + urlServicio;
    const respuesta = fetch(url, datosEnviar)
      .then((respuesta) => respuesta.json())
      .then((datos) => { return datos; })
      .catch((miError) => { return miError; });
    return respuesta;
  }

  // Servicio con bearer para hacer peticiones PUT
  // *******************************************************************
  public static async peticionPUT(urlServicio: string, miJSON: any) {
    const bearer = "Bearer " + String(localStorage.getItem("Token"));

    const datosEnviar = {
      method: "PUT",
      body: JSON.stringify(miJSON),
      headers: { "Content-Type": "application/json; charset=UTF-8", authorization: bearer }
    };

    const url = ApiBackend.URL + urlServicio;
    const respuesta = fetch(url, datosEnviar)
      .then((respuesta) => respuesta.json())
      .then((datos) => { return datos; })
      .catch((miError) => { return miError; });
    return respuesta;
  }
}

export default PrivateService;
