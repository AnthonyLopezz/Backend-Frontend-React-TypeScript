import Profile from "./Profile";

class Usuario {
  public _id: string;
  public nameUser: string;
  public emailUser: string;
  public passwordUser: string;
  public stateUser: number;
  public dateUser: Date;
  public codProfile: Profile;

  public nameUserImg: string;
  public userAvatar: string;

  constructor(
    id: string,
    nom: string,
    cor: string,
    cla: string,
    fec: Date,
    est: number,
    nomi: string,
    ava: string,
    codp: Profile
  ) {
    this._id = id;
    this.nameUser = nom;
    this.emailUser = cor;
    this.passwordUser = cla;
    this.dateUser = fec;
    this.stateUser = est;
    this.nameUserImg = nomi;
    this.userAvatar = ava;
    this.codProfile = codp;
  }
}

export default Usuario;
