class Profile {
  public _id: string
  public profileName: string;
  public profileStatus: number;

  public quantityUsers?: number;

  constructor(id: string, name: string, status: number) {
    this._id = id;
    this.profileName = name;
    this.profileStatus = status;
  }
}

export default Profile;
