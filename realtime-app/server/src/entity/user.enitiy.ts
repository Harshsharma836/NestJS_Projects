// src/user/user.entity.ts

export class User {
  id?: number;
  username: string;
  password: string;

  constructor(username: string, password: string, id?: number) {
    this.id = id;
    this.username = username;
    this.password = password;
  }
}
