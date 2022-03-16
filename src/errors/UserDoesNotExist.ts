export class UserDoesNotExists extends Error {
  constructor() {
    super("User does not exists!");

    this.name = "UserDoesNotExists";

    Object.setPrototypeOf(this, UserDoesNotExists.prototype);
  }
}
