#### #### #### #### #### #### #### #### #### #### #### #### #### #### #### #### #### #### #### #### #### #### #### #### 
NOTE DU 25/05/2023
#### #### #### #### #### #### #### #### #### #### #### #### #### #### #### #### #### #### #### #### #### #### #### #### 
pour rappel, pour utiliser un composant shared
côté HTML
<ng-container *ngFor="let prestationTarget of prestations">
    <app-card [prestation]="prestationTarget"></app-card>
</ng-container>

côté TS
  public prestations?: Prestation[];
  public prestationTarget?: Prestation;

  constructor(private service: PrestationService) { 
    this.prestationTarget = new Prestation("");
  }
  
  ngOnInit() {
    this.service.getTest().subscribe((response) => {
      this.prestations = response;
    });
  }

#### #### #### #### #### #### #### #### #### #### #### #### #### #### #### #### #### #### #### #### #### #### #### #### 
NOTE DU 30/04/2023
<TODO : 
#### #### #### #### #### #### #### #### #### #### #### #### #### #### #### #### #### #### #### #### #### #### #### #### 
- créer une classe PrestationEvaluated contenant en paramètre
    - une entité Prestation
    - une entité Registration 
- faire le repository, service, mapper et le Dto
    - quoique...il ne sera peut être pas nécessaire de faire tout cela, il est possible de travailler qu avec les repo
    des entités ainsi que service et autres. il faut concaténer dans le controller les entités pour construire le DTO
    attendu

#### #### #### #### #### #### #### #### #### #### #### #### #### #### #### #### #### #### #### #### #### #### #### #### 
NOTE DU 30/04/2023
Ci-dessous des exemples de requête et des annotions si on doit jouer des deux côtés des entités, car cela déclenche des 
boucles infinies.
#### #### #### #### #### #### #### #### #### #### #### #### #### #### #### #### #### #### #### #### #### #### #### #### 
    
    
    # USER MODEL
    Je pense qu'il n'est pas nécessaire d'avoir ces détails pour le moment, ça complexifie la gestion de l'API
<!--     
    @OneToMany(mappedBy = "creator", fetch = FetchType.LAZY)
    @JsonBackReference
    private List<Prestation> creations;

    @ManyToMany(fetch = FetchType.LAZY)
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
    @JoinTable(name = "registration", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "prestation_id"))
    private List<Prestation> registrations; 
-->

    # USER DTO
<!-- 
    private List<Registration> registrations;
    private List<Prestation> creations;
-->

    # PRESTATION REPOSITORY 

Exemple de requête, à adapter car elles ne doivent plus fonctionner telle quelle mais l'idée est là
<!-- 
    @Query("SELECT p.title, p.duration, p.add_point, r.comment, r.evaluation FROM
    Prestation p JOIN Registration r WHERE r.id = :id")
    Prestation findByIdWithCommentAndEvaluation(@Param("id") Long id);

    @Query("SELECT p.title, p.duration, p.add_point, r.comment, r.evaluation FROM
    Prestation p JOIN Registration r")
    Iterable<Prestation> findAllWithCommentAndEvaluation(); 
-->


