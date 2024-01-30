import { Type } from "./type";
import { Registration } from "./registration";
import { Location } from "./location";
import { Image } from "./image";
import { User } from "./user";
import { Category } from "./category";

export class Prestation {

    constructor(
        public id? : number,
        public user? : User,
        public title : string ="",
        public duration? : number,
        public addPoint? : number,
        public dateStart? : number,
        public dateEnd? : number,
        public state? : string,
        public description? : string,
        public maxUser? : number,
        public images : Image[] = [],
        public type?: Type,
        public category?: Category,
        public location?: Location,
        public placeAvailable?: number,
        public littleDescription?: string,
        public videoLink?: string,
        public practicalInformation?: string,
        public language?: string,
        public personalInfos?: string,
        public registrations?: Registration[],
    ){}

  get getDuration(): string {
    if (this.duration != undefined) {
      const durautionHour = this.duration / 1000 / 60 / 60;
      return durautionHour.toString();
    }
    return '0';
  }

    get getDateStartString(): string {
        if (typeof this.dateStart === 'number') {
            const dateStart = new Date(this.dateStart);
            const day = dateStart.getDate().toString().padStart(2, '0');
            const month = (dateStart.getMonth() + 1).toString().padStart(2, '0');
            const year = dateStart.getFullYear().toString();
            const formattedDate = `${day}/${month}/${year}`;
            return formattedDate;
        }
        return 'dd/mm/yyyy'; 
    }
      
    get getTimeStartString(): string {
        if (typeof this.dateStart === 'number') {
            const date = new Date(this.dateStart);
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');
            return `${hours}:${minutes}`;
        }
        return "hh:mm";
          
    }

    get getDateTimeStartString(): string {
        if (typeof this.dateStart === 'number') {
            const dateTime = new Date(this.dateStart);    
            const day = dateTime.getDate().toString().padStart(2, '0');
            const month = (dateTime.getMonth() + 1).toString().padStart(2, '0');
            const year = dateTime.getFullYear().toString();
            const hours = dateTime.getHours().toString().padStart(2, '0');
            const minutes = dateTime.getMinutes().toString().padStart(2, '0');
      
        return `${day} ${month} ${year}, ${hours}:${minutes}`;
      }
      return "dd MM yyyy, HH:mm";
      
    }

}
