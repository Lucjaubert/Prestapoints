
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Component,OnInit } from '@angular/core';
import { Prestation } from '../../../shared/model/prestation';
import { Location } from '../../../shared/model/location';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormValidatorsService } from 'src/app/shared/services/formValidators.service';
import { CategoryService } from 'src/app/shared/services/category.service';
import { Category } from 'src/app/shared/model/category';
import { Type } from 'src/app/shared/model/type';
import { Router } from '@angular/router';
import { PrestationService } from 'src/app/shared/services/prestation.service';
import { ImageService } from 'src/app/shared/services/image.service';
import { Image } from '../../../shared/model/image';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-prestation-formulaire',
  templateUrl: './prestation-formulaire.component.html',
  styleUrls: ['./prestation-formulaire.component.scss'],
})
export class PrestationFormulaireComponent {
    private unsubscribe$ = new Subject<void>();
    prestation: Prestation = new Prestation;
    location: Location = new Location;
    type: Type = new Type;
    category: Category = new Category;
    categories: Category[]=  [];

    isLoaded: boolean = false;
    isFormulaireFalse : boolean = false;
    prestationFormBasic!: FormGroup;
    prestationFormDescription!: FormGroup;
    prestationFormLocation!: FormGroup;
    prestationFormMedia!: FormGroup;
    prestationFormCharacteristic!:  FormGroup;
    pageNumber: number = 0;

    imageSrc: any; // Utilisé pour afficher l'image dans le balisage img
    selectedFile!: File; // Stocke le fichier sélectionné
    isImageLoading: boolean = false;
    imageFile: Image = new Image;
    imageFiles: Image[] = [];
    messageErreurImage: String = "";

    loading: boolean = false;


    formFieldsBasic: { name: string; label: string; type: string; placeholder: string; validationMessage: string }[] = [
        { name: 'type', label: 'Type', type: 'text', placeholder: "ex : Dressage de chiens", validationMessage: 'Le champs est limité à 50 caractères.' },
        { name: 'title', label: 'Titre', type: 'text', placeholder: "ex : Apprenez à dresser votre chien avec notre expert canin", validationMessage: 'Le champs est limité à 50 caractères.' },
    ];

    formFieldsCharacteristic: { name: string; label: string; type: string; placeholder: string; validationMessage: string }[] = [
        { name: 'dateStart', label: 'Date de début', type: 'date', placeholder: "", validationMessage: 'La date doit être sous forme jj/mm/aaaa et supérieur à aujourdui.' },
        { name: 'timeStart', label: 'Heure de début', type: 'text', placeholder: "ex : 16:00", validationMessage: "On accepte que des nombres" },
        { name: 'duration', label: 'Durée de la prestation en Heure', type: 'number', placeholder: "ex : 3", validationMessage: "Le nombre d'heure n'est pas conforme." },
        { name: 'maxUser', label: 'Nombre maximal d\'utilisateurs', type: 'number', placeholder: "ex : 6", validationMessage: 'L\'information du nombre de participants maximal est obligatoire.' }
    ];

    formFieldsDescription: { name: string; label: string; type: string; placeholder: string; validationMessage: string }[] = [
        { name: 'practicalInformation', label: 'Informations pratiques', type: 'text', placeholder: "ex : Les chiens admis sont des chiens dressés ...", validationMessage: 'ex : Le champs est limité à 255 caractères.' },
        { name: 'description', label: 'Description', type: 'textarea', placeholder: "ex : Découvrez les techniques de dressage de chiens et renforcez ...", validationMessage: 'Une description de la prestation est obligatoire.' },
        { name: 'littleDescription', label: 'Petite description', type: 'text', placeholder: "ex : Découvrez les techniques de dressage de chiens ...", validationMessage: 'Le champs est limité à 50 caractères.' },
        { name: 'language', label: 'Durée de la prestation', type: 'text', placeholder: "ex : francais", validationMessage: "Le champs est limité à 50 caractères." },
        { name: 'personalInfos', label: 'Quelques informations personnelles', type: 'text', placeholder: "ex : Notre expert canin possède une vaste expérience ...", validationMessage: 'Le champs est limité à 255 caractères.' },
    ];

    formFieldsLocation: { name: string; label: string; type: string; placeholder: string; validationMessage: string }[] = [
        { name: 'LocationAddressNumber', label: 'Numéro de la rue', type: 'text', placeholder: "ex : 25bis", validationMessage: "L'horraire n'est pas conforme hh:mm." },
        { name: 'LocationAddress', label: 'Nom de la rue', type: 'text', placeholder: "ex : rue de la Forge", validationMessage: 'Le champs est limité à 50 caractères.' },
        { name: 'LocationPostalCode', label: 'Code postal', type: 'text', placeholder: "ex : 45000", validationMessage: 'Le champs doit être de ce format 45000.' },
        { name: 'LocationCity', label: 'Nom de la ville', type: 'text', placeholder: "ex : ORLEANS", validationMessage: 'Le champs est limité à 50 caractères.' },
        { name: 'LocationAddressInformation', label: 'Informations complémentaires sur l\'adresse', type: 'text', placeholder: "ex : L'atelier de Modesto se trouve dans la rue Gerlach Ports ...", validationMessage: 'Le champs est limité à 255 caractères.' }, 
    ];

    constructor( private prestationService: PrestationService,
        private router: Router, 
        private formBuilder: FormBuilder, 
        private http: HttpClient, 
        private formValidatorsService: FormValidatorsService, 
        private categoryService: CategoryService,
        private imageService: ImageService
        ) {
  
        this.categoryService.getCategories().subscribe((categories) => {
            this.categories = categories;
            this.isLoaded = true;
        });

     }
  

    ngOnInit(): void {
    
        this.prestationFormBasic = this.formBuilder.group({
            title: ['Dressage de chiens', [Validators.required, Validators.maxLength(50)]],
            type: ['Apprenez à dresser votre chien avec notre expert canin', [Validators.required, Validators.maxLength(100)]],
            category: ['', Validators.required],
        });

        this.prestationFormCharacteristic = this.formBuilder.group({
            dateStart: ['15/11/2023', [Validators.required, this.formValidatorsService.dateValidator()]],
            timeStart: ['16:00', [Validators.required, this.formValidatorsService.timeValidator]],
            duration: ['3', [Validators.required, Validators.maxLength(2)]],
            maxUser: ['6', [Validators.required, Validators.maxLength(3)]],
        });

        this.prestationFormDescription = this.formBuilder.group({
            practicalInformation: ['Les chiens admis sont des chiens dressés ...',[ Validators.required, Validators.maxLength(255)]],
            description: ['Découvrez les techniques de dressage de chiens et renforcez ...', [Validators.required, Validators.maxLength(1000)]],
            littleDescription: ['Découvrez les techniques de dressage de chiens ...',[ Validators.required, Validators.maxLength(255)]],
            language: ['Francais', [Validators.required, Validators.maxLength(50)]],
            personalInfos: ['Notre expert canin possède une vaste expérience', [Validators.required, Validators.maxLength(255)]],
        });

        this.prestationFormLocation = this.formBuilder.group({
            LocationCity: ['Janville', [Validators.required, Validators.maxLength(50)]],
            LocationPostalCode: ['28310', [Validators.required, this.formValidatorsService.postalCodeValidator(),Validators.maxLength(5)]],
            LocationAddress: ['forge', [Validators.required, Validators.maxLength(50)]],
            LocationAddressNumber: ['56', [Validators.required, Validators.maxLength(50)]],
            LocationAddressInformation: ['dans un grand espace', [Validators.required, Validators.maxLength(255)]],
        });

        this.prestationFormMedia = this.formBuilder.group({
            mediaImage: ['', Validators.required],
            mediaVideo: ['https://www.youtube.com/embed/MtRkuDjodCM', [Validators.required, Validators.maxLength(255)]],
        });

    }

    onSubmitBpNext(pageNumber: number){
        if (pageNumber == 0 && this.prestationFormBasic.invalid) {
            this.isFormulaireFalse = true;
            return;
        }
        if (pageNumber == 1 && this.prestationFormCharacteristic.invalid) {
            this.isFormulaireFalse = true;
            return;
        }
        if (pageNumber == 2 && this.prestationFormDescription.invalid) {
            this.isFormulaireFalse = true;
            return;
        }
        if (pageNumber == 3 && this.prestationFormLocation.invalid) {
            this.isFormulaireFalse = true;
            return;
        }
        if (pageNumber == 4 && this.prestationFormMedia.invalid) {
            this.isFormulaireFalse = true;
            return;
        }

        this.isFormulaireFalse = false;
        this.pageNumber = pageNumber + 1;

    }

    onSubmitBpPrevious(pageNumber: number){
        this.pageNumber = pageNumber - 1;

    }

    onSubmit() {
        this.UploadImg();
    }

    // Méthode appelée lorsque le fichier est sélectionné
    onFileSelected(event: any) {
        this.isImageLoading = false;
        this.imageSrc= "";
        this.messageErreurImage = "";
        
        this.selectedFile = event.target.files[0];
 
        // verif du type de fichier
        if (!this.isValidImageType(this.selectedFile.type)) {
           console.error('Type de fichier non pris en charge. Veuillez sélectionner une image au format jpg, jpeg, ou png.');
           this.messageErreurImage = "Type de fichier non pris en charge. Veuillez sélectionner une image au format jpg, jpeg, ou png.";
           return;
        }

        // Vérif la taille du fichier
        if (!this.isValidImageSize(this.selectedFile.size)) {
            console.error('La taille du fichier est trop grande. Veuillez sélectionner une image plus petite.');
            this.messageErreurImage = this.messageErreurImage + "La taille du fichier est trop grande. Veuillez sélectionner une image plus petite.";
            return;
        }

        // Afficher l'image sélectionnée
        const reader = new FileReader();
        reader.onload = (e: any) => {
                this.imageSrc = e.target.result;
        };
        reader.readAsDataURL(this.selectedFile);

        this.isImageLoading = true;

    }

    // Méthode appelée lors du clic sur le bouton "Enregistrer"
    UploadImg() {
        if (this.selectedFile) {
            this.messageErreurImage = "";           
            this.loading = true;

            // Enregistrement de l'image
            this.imageService.uploadImage(this.selectedFile).subscribe(
                (imageId) => {
                    console.log('Image enregistrée avec succès!', imageId);
                    this.imageFile.id = imageId;
                    this.prestationLoading();
                },
                (error) => {
                    console.error('Erreur lors de l\'enregistrement de l\'image', error);
                    if (error instanceof HttpErrorResponse) {
                        if (error.status === 500 || error.status === 400) {
                            console.error('Retour négatif du serveur' + error.error);
                            this.messageErreurImage ='Retour négatif du serveur : ' + error.error;

                        }
                    }
                    this.loading = false;
                }
            );
        }
    }

    prestationLoading() {
        if (this.prestationFormLocation.invalid) {
          return;
        }

        const formDataBasic = this.prestationFormBasic.value;
        const formDataDescription = this.prestationFormDescription.value;
        const formDataLocation = this.prestationFormLocation.value;
        const formDataCharacteristic = this.prestationFormCharacteristic.value;
        const formDataMedia = this.prestationFormMedia.value;

        this.prestation.title = formDataBasic.title;
        this.type.name = formDataBasic.type;
        this.category.id = formDataBasic.category-1;
        this.type.category =  this.category;
        
        this.prestation.type = this.type;

        const [annee, mois, jour] = formDataCharacteristic.dateStart.split('-');  
        const [heures, minutes] = formDataCharacteristic.timeStart.split(':');
        const date = new Date(annee, mois - 1, jour, heures, minutes);
        this.prestation.dateStart = date.getTime();
        
        const dateBase = new Date();
        dateBase.setHours(formDataCharacteristic.duration);
        this.prestation.duration = dateBase.getTime(); 

        this.prestation.maxUser = formDataCharacteristic.maxUser;


        this.prestation.description = formDataDescription.description;
        this.prestation.littleDescription = formDataDescription.littleDescription;
        
        this.prestation.practicalInformation = formDataDescription.practicalInformation;
        this.prestation.language = formDataDescription.language;
        this.prestation.personalInfos = formDataDescription.personalInfos;
        
        this.location.city = formDataLocation.LocationCity;
        this.location.postalCode = formDataLocation.LocationPostalCode;
        this.location.address = formDataLocation.LocationAddress;
        this.location.addressNumber = formDataLocation.LocationAddressNumber;
        this.location.addressInformation = formDataLocation.LocationAddressInformation;
        this.prestation.location = this.location;

        this.prestation.videoLink = formDataMedia.mediaVideo;

        this.imageFiles.push(this.imageFile);
        this.prestation.images = this.imageFiles;
        console.log(this.prestation);
        this.savePrestationToBack(this.prestation);
        

    }
    
    savePrestationToBack(prestationIn: Prestation) {
        this.prestationService.createPrestation(prestationIn).subscribe(
            (prestation) => {
                this.prestation = prestation;
    
                // Use object instead of array for navigation
                this.router.navigate(['/prestations', prestation.id, 'details']);
    
                this.prestationFormBasic.reset();
                this.prestation = new Prestation();
                this.location = new Location();
                this.type = new Type();
                this.category = new Category();
                this.categories = [];
    
                this.loading = false;
            },
            error => {
                this.imageFiles = [];
                console.error('Erreur lors de l\'enregistrement de la prestation', error);
                if (error instanceof HttpErrorResponse) {
                    if (error.status === 500 || error.status === 400) {
                        console.error('Retour négatif du serveur' + error.error);
                        this.messageErreurImage ='Retour négatif du serveur : ' + error.error;

                    }
                }
    
                this.loading = false;
            }
        );
    }


    // Fonction pour vérifier le type de fichier
    private isValidImageType(fileType: string): boolean {
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
        return allowedTypes.includes(fileType);
    }

    // Fonction pour vérifier la taille du fichier
    private isValidImageSize(fileSize: number): boolean {
        const maxSize = 1024 * 1024; // Exemple : 1 Mo (1 Mo = 1024 * 1024 octets)
        return fileSize <= maxSize;
    }

}

  