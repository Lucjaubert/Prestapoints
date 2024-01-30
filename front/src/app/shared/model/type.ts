import { Category } from "./category";

export class Type {

    constructor(
      public id?: string,
      public name?: string,
      public category?: Category,
      ) {}
  }