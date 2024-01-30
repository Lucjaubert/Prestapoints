import { Component, Input, OnInit } from '@angular/core';
import { Prestation } from '../../model/prestation';
import { Router } from '@angular/router';
import { ImageService } from '../../services/image.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
    @Input() public prestation?: Prestation;
    public imageBlob: Blob | undefined;
    public imageUrl: string | undefined;

    
    constructor(private router: Router, private imageService: ImageService) {}

    ngOnInit(): void {
        if(this.prestation?.images[0].id != undefined ){
            this.imageService.getImageById(this.prestation?.images[0].id).subscribe(
                (data: Blob) => {
                    this.imageBlob = data;
                    this.imageUrl = URL.createObjectURL(data); 
                },
                error => {
                    reportError('Erreur lors de la récupération de l\'image : '+ error);
                }
            );
        }  
    }

    openCardDetails() {
        if (this.prestation && this.prestation.id) {
        this.router.navigate(['/prestations', this.prestation.id, 'details']);
        }
    } 
}
