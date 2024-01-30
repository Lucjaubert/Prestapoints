import { Prestation } from './prestation';
import { Role } from './role';

export class User {
  constructor(
    public firstname?: string | null,
    public lastname?: string | null,
    public email?: string | null,
    public password?: string | null,
    public phone?: string | null,
    public roles?: Role[] | null,
    public creationDate?: string | null,
    public id?: string | null,
    public image?: File | null,
    public prestation?: Prestation | null
  ) {}
}
