import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PrestationService } from 'src/app/shared/services/prestation.service';
import { Prestation } from 'src/app/shared/model/prestation';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss'],
})
export class SearchbarComponent implements OnInit {
  @Input() prestationsApi: Prestation[] = [];
  public prestationsSearch?: Prestation[];
  public searchForm: FormGroup;
  public noWorkshopFound: boolean = false;
  @Output() prestationsEmitter: EventEmitter<Prestation[] | null> =
    new EventEmitter();

  constructor(
    private prestationService: PrestationService,
    public fb: FormBuilder
  ) {
    this.searchForm = this.fb.group({
      search: [
        '',
        [
          Validators.maxLength(255),
        ],
      ],
    });
  }

  ngOnInit() {
    this.prestationService.getPrestations().subscribe((response) => {
      this.prestationsApi = response;
    });
  }

  onSubmit() {
    const searchValue = this.searchForm.value['search'].trim();

    const searchWords: string[] = searchValue.toLowerCase().split(' ');
    
      this.getPrestationsContainingWordsLike(searchWords);

      if (this.prestationsSearch && this.prestationsSearch.length > 0) {
        this.prestationsEmitter.emit(this.prestationsSearch);
      } else {
        this.prestationsEmitter.emit(this.prestationsApi || []);
      }
  }

  getPrestationsContainingWordsLike(searchWords: string[]) {
    this.prestationsSearch = this.prestationsApi?.filter((prestation) =>
      searchWords.some((word) => this.isMatch(prestation, word))
    );

    this.noWorkshopFound = this.prestationsSearch?.length === 0;
    this.sendPrestations();
  }

  isMatch(prestation: Prestation, word: string): boolean {
    return (
      prestation.title?.toLowerCase().includes(word) ||
      false ||
      prestation.location?.city?.toLowerCase().includes(word) ||
      false ||
      prestation.description?.toLowerCase().includes(word) ||
      false ||
      prestation.type?.category?.name?.toLowerCase().includes(word) ||
      false ||
      prestation.type?.name?.toLowerCase().includes(word) ||
      false
    );
  }

  sendPrestations(): void {
    if (this.prestationsApi && this.prestationsApi.length > 0) {
      this.prestationsEmitter.emit(
        this.prestationsSearch || this.prestationsApi
      );
    } else {
      this.prestationsEmitter.emit([]);
    }
  }

  resetSearch(): void {
    this.prestationsSearch = this.prestationsApi;
    this.noWorkshopFound = false;
    this.sendPrestations();
  }
}
