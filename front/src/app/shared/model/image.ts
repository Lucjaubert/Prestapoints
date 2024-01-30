import { Prestation } from "./prestation";

export class Image {

    public id: number = 0;
    public data?: Blob | undefined;
    public prestation?: Prestation;
    public url?: string;
    private imageUrl?: string;
    
    constructor() {
    }
    
    

}
