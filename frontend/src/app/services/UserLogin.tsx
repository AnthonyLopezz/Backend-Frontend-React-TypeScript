class UserLogin {
  public static async consumService(urlApi: string, obj: any) {
    const information = {
      method: "POST",
      body: JSON.stringify(obj),
      headers: { "Content-Type": "application/json; charset=UTF-8" }
    };
    const resultApi = fetch(urlApi, information)
      .then((getInfo) => getInfo.json()) // No puede ir con llaves porque inflinge la regla del fetch
      .then((info) => { return info; })
      .catch((err) => { return err; });
    return resultApi;
  }
}

export default UserLogin;
