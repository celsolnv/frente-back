export class PasswordNotMatch extends Error {
  constructor() {
    super("Email or password incorrect!");

    this.name = "PasswordNotMatch";

    Object.setPrototypeOf(this, PasswordNotMatch.prototype);
  }
}
