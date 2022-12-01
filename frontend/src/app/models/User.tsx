class User {
  public nameUser: string;
  public emailUser: string;
  public passwordUser: string;

  constructor(name: string, email: string, pass: string) {
    this.nameUser = name;
    this.emailUser = email;
    this.passwordUser = pass;
  }
}

export default User;
