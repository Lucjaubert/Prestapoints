import { Injectable } from '@angular/core';

@Injectable()
export class ToolsService {

  constructor() { }
  
  descSortListOfObjectByProperty(list: any[], property: keyof any): any[] {
    return list.sort((a, b) => {
      const valueA = a[property];
      const valueB = b[property];
      if (valueA != null && valueB != null) {
        if (valueA > valueB) {
          return -1;
        } else if (valueA < valueB) {
          return 1;
        } else {
          return 0;
        }
      }
      return 0;
    });
  }

  ascSortListOfObjectByProperty(list: any[], property: keyof any): any[] {
    return list.sort((a, b) => {
      const valueA = a[property];
      const valueB = b[property];
      if (valueA != null && valueB != null) {
        if (valueA < valueB) {
          return -1;
        } else if (valueA > valueB) {
          return 1;
        } else {
          return 0;
        }
      }
      return 0;
    });
  }
}
