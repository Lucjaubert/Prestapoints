import { RoleEnum } from '../enum/role.enum';

export class Role {
  public slug?: string;
  
  constructor(public name?: string) {
    this.setSlug(this.name);
  }

  setSlug(name?: string) {
    switch (name) {
      case RoleEnum.USER:
        this.slug = RoleEnum.SLUG_USER;
        break;
      case RoleEnum.ADMIN:
        this.slug = RoleEnum.SLUG_ADMIN;
        break;
    }
  }
}
