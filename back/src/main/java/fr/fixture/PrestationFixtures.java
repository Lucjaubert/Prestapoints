package fr.fixture;

import java.sql.Timestamp;
import java.time.Duration;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.util.concurrent.TimeUnit;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.github.javafaker.Faker;
import fr.entity.Location;
import fr.entity.Prestation;
import fr.entity.Type;
import fr.entity.User;
import fr.enums.TablesEnum;
import fr.repository.LocationRepository;
import fr.repository.PrestationRepository;
import fr.repository.TypeRepository;
import fr.repository.UserRepository;

@Component
public class PrestationFixtures {

    @Autowired
    private Fixtures fixtures;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PrestationRepository prestationRepository;
    @Autowired
    private TypeRepository typeRepository;
    @Autowired
    private LocationRepository locationRepository;


    public void prepareFixtures() {
        
        String[] titles = { 
            "Apprenez à dresser votre chien avec notre expert canin",
            "Explorez votre créativité avec la poterie",
            "Apprenez à créer vos propres bijoux en perles",
            "Apprenez à construire vos propres meubles en bois",
            "Créez vos vêtements sur mesure avec notre styliste",
            "Apprenez à créer un jardin harmonieux",
            "Découvrez les saveurs des cuisines du monde",
            "Portrait", 
            "Forme toi à la tapisserie d’ameublement"
        };

        String[] littleDescriptions  = {
            "Découvrez les techniques de dressage de chiens et renforcez votre relation avec votre compagnon à quatre pattes.",
            "Découvrez l'art de la poterie et exprimez votre créativité en créant vos propres pièces uniques.",
            "Laissez libre cours à votre imagination et créez des bijoux uniques en apprenant les techniques de création de bijoux en perles.",
            "Découvrez l'art de la construction de meubles en bois et fabriquez votre propre pièce unique.",
            "Explorez le monde de la couture et apprenez à confectionner vos vêtements sur mesure.",
            "Découvrez l'art de l'aménagement paysager et apprenez à créer un jardin harmonieux qui reflète votre style personnel.",
            "Partez pour un voyage culinaire et découvrez les saveurs des cuisines du monde.",
            "Capturez votre essence unique à travers un portrait réalisé par notre talentueux artiste.",
            "Découvrez le monde de la tapisserie d'ameublement et donnez une seconde vie à votre mobilier avec Soazig"
        };

        String[] descriptions  = {
            "Découvrez les techniques de dressage de chiens et renforcez votre relation avec votre compagnon à quatre pattes. Rejoignez notre atelier pour des conseils d'experts et une expérience inoubliable. Vous apprendrez à comprendre le comportement canin, à enseigner des commandes de base et à résoudre les problèmes de comportement. Avec notre expert canin, votre chien deviendra un compagnon bien éduqué et obéissant",
            "Explorez votre créativité avec la poterie. Notre atelier de poterie vous permettra de créer des œuvres d'art uniques tout en apprenant les bases de cette technique ancienne. Vous travaillerez avec de l'argile de qualité, maîtriserez le tour de potier et expérimenterez différentes méthodes de modelage. Que vous soyez débutant ou expérimenté, ce cours vous inspirera à créer des pièces céramiques uniques à ramener chez vous.",
            "Apprenez à créer vos propres bijoux en perles. Nos experts en bijouterie vous guideront à travers le processus de création, vous permettant de fabriquer des bijoux personnalisés. Vous explorerez une variété de perles, de cristaux et de matériaux pour créer des colliers, des bracelets et des boucles d'oreilles uniques. Vous découvrirez également des techniques de tissage et d'assemblage pour donner vie à vos idées de bijoux.",
            "Apprenez à construire vos propres meubles en bois. Notre ébéniste expérimenté vous enseignera les techniques de menuiserie pour créer des meubles de qualité. Vous travaillerez avec du bois soigneusement sélectionné, utiliserez des outils de menuiserie professionnels et apprendrez les finitions pour obtenir des pièces durables et esthétiques. Que vous souhaitiez créer une chaise, une étagère ou une table, ce cours vous donnera les compétences nécessaires.",
            "Créez vos vêtements sur mesure avec notre styliste de mode professionnelle. Vous découvrirez l'art de la couture et obtiendrez des vêtements qui vous vont parfaitement. À partir de vos propres mesures, vous choisirez des tissus de qualité et apprendrez les techniques de coupe et d'assemblage. Sous la direction de notre styliste, vous confectionnerez des vêtements élégants et uniques qui refléteront votre style personnel.",
            "Apprenez à créer un jardin harmonieux grâce à notre expert en aménagement paysager. Transformez votre espace extérieur en un havre de paix en explorant les principes du design paysager. Vous découvrirez comment choisir les plantes appropriées, concevoir des espaces fonctionnels et créer une atmosphère agréable. Avec nos conseils d''experts, votre jardin deviendra un lieu de détente et de beauté.",
            "Découvrez les saveurs des cuisines du monde lors de nos ateliers culinaires. Vous apprendrez à cuisiner des plats délicieux et exotiques, en explorant une variété de cuisines internationales. Nos chefs expérimentés vous guideront à travers les recettes authentiques, les techniques de préparation et les secrets des épices. Vous pourrez ensuite déguster vos créations lors d'une délicieuse dégustation.",
            "Faites-vous portraiturer par nos artistes talentueux. Nous capturerons votre essence unique dans une œuvre d'art. Nos artistes travailleront en collaboration avec vous pour comprendre votre personnalité et votre style. Vous pourrez choisir parmi différents médiums artistiques, des portraits réalistes aux œuvres abstraites. Une expérience artistique qui vous laissera avec une œuvre précieuse à chérir.",
            "Découvrez le monde de la tapisserie d'ameublement avec Soazig. Elle vous enseignera les techniques pour rénover vos meubles et leur donner une seconde vie. Dans son charmant atelier, vous apprendrez les méthodes traditionnelles et contemporaines de la tapisserie. Soazig partagera son amour pour les étoffes et vous montrera comment restaurer et embellir vos meubles. Un atelier où l'histoire rencontre la créativité."
        };

        String[] practicalsInformations  = {
            "Découvrez les techniques de dressage de chiens et renforcez votre relation avec votre compagnon à quatre pattes.",
            "Découvrez l'art de la poterie et exprimez votre créativité en créant vos propres pièces uniques.",
            "Laissez libre cours à votre imagination et créez des bijoux uniques en apprenant les techniques de création de bijoux en perles.",
            "Découvrez l'art de la construction de meubles en bois et fabriquez votre propre pièce unique.",
            "Explorez le monde de la couture et apprenez à confectionner vos vêtements sur mesure.",
            "Découvrez l'art de l'aménagement paysager et apprenez à créer un jardin harmonieux qui reflète votre style personnel.",
            "Partez pour un voyage culinaire et découvrez les saveurs des cuisines du monde.",
            "Capturez votre essence unique à travers un portrait réalisé par notre talentueux artiste.",
            "Découvrez le monde de la tapisserie d'ameublement et donnez une seconde vie à votre mobilier avec Soazig."
        };

        String[] languages  = {
            "Cet atelier est animé en français et anglais.",
            "Cet atelier est animé en français.",
            "Cet atelier est animé en français.",
            "Cet atelier est animé en français et anglais.",
            "Cet atelier est animé en français.",
            "Cet atelier est animé en français et anglais.",
            "Cet atelier est animé en français.",
            "Cet atelier est animé en français.",
            "Cet atelier est animé en français."
        };

        String[] personalsInfos  = {
            "Notre expert canin possède une vaste expérience dans le dressage de chiens et est passionné par leur comportement et leur bien-être. Il vous fournira des conseils personnalisés pour gérer les défis spécifiques de votre chien et vous aidera à établir une communication efficace.",
            "Notre potier expérimenté est spécialisé dans la poterie artisanale et aime partager son savoir-faire avec les participants. Il vous montrera différentes techniques pour créer des bols, des vases, des assiettes et d'autres objets en argile. Vous pourrez également expérimenter avec les émaux et les finitions pour donner vie à vos créations.",
            "Notre expert en bijouterie possède une vaste expérience dans la création de bijoux et est passionné par les perles et les matériaux précieux. Il vous enseignera les techniques de base pour créer vos propres bijoux en perles, ainsi que des conseils sur la sélection des matériaux et des combinaisons de couleurs.",
            "Notre ébéniste expérimenté vous guidera dans la construction de meubles en bois de qualité. Vous apprendrez les techniques de base de la menuiserie, la sélection du bois et les finitions pour créer des meubles durables et esthétiques.",
            "Notre styliste de mode professionnelle vous aidera à créer des vêtements sur mesure qui correspondent à votre style et à vos préférences. Elle vous conseillera sur le choix des tissus, les mesures et les ajustements, et vous guidera tout au long du processus de création.",
            "Notre expert en jardinage paysager vous aidera à concevoir et à créer un jardin harmonieux qui correspond à vos goûts et à votre environnement. Il vous donnera des conseils sur la sélection des plantes, l'aménagement de l'espace et l'entretien du jardin.",
            "Nos chefs cuisiniers expérimentés vous feront découvrir les saveurs exquises des cuisines du monde. Vous apprendrez des recettes authentiques, des techniques de préparation et des astuces culinaires pour créer des plats délicieux.",
            "Nos artistes talentueux captureront votre portrait de manière unique et artistique. Vous pourrez choisir parmi différentes techniques et styles artistiques pour obtenir un portrait qui vous ressemble.",
            "Soazig est tapissière d'ameublement. Elle adore le mobilier et les étoffes, et plus précisément redonner vie aux vieux fauteuils ! Elle effectue des réfections traditionnelles ou contemporaines de sièges, fauteuils, canapés, méridiennes, chaises, têtes de lit, tabourets... À travers la diversité des matières et des couleurs, elle se fera un plaisir de vous parler de son parcours et de vous donner des conseils techniques. Soazig vous accueillera avec plaisir et vous transmettra son savoir au sein d'une belle boutique-atelier partagée située en plein centre-ville !"
        };

        String[] durations  = {
            "02:00",
            "02:30",
            "00:30",
            "01:00",
            "03:00",
            "06:00",
            "10:00",
            "11:00",
            "05:30"
        };

        String[] videosLink  = {
            "https://www.youtube.com/embed/5o8-JmnJAWE?autoplay=1&mute=1",
            "https://www.youtube.com/embed/nVoDmaF8Znc?autoplay=1&mute=1",
            "https://www.youtube.com/embed/-UjxcOWnVq8?autoplay=1&mute=1",
            "https://www.youtube.com/embed/kkSI8PSRBHI?autoplay=1&mute=1",
            "https://www.youtube.com/embed/s-oU7B6Mung?autoplay=1&mute=1",
            "https://www.youtube.com/embed/Kei6o8jE7BY?autoplay=1&mute=1",
            "https://www.youtube.com/embed/2tHEQNIgIF4?autoplay=1&mute=1",
            "https://www.youtube.com/embed/HVXVrZJz0ns?autoplay=1&mute=1",
            "https://www.youtube.com/embed/r3XHEhE3dns?autoplay=1&mute=1"
        };

        String table = TablesEnum.PRESTATION.getTableName();
        Faker faker = new Faker();
        Prestation prestation = new Prestation();

        if (fixtures.isDatatableExistAndDelete(table)){            

            for (int i = 0; i < titles.length; i++) {
                prestation.setId(i+1);

                User user = userRepository.getReferenceById(i+1);
                prestation.setUser(user);
                
                prestation.setTitle(titles[i]);

                LocalDateTime dateStart = faker.date().future(30, TimeUnit.DAYS).toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime();
                long timestamp = dateStart.toInstant(ZoneOffset.UTC).toEpochMilli();
                Timestamp timestampSql = new Timestamp(timestamp);
                prestation.setDateStart(timestampSql);

                // Générer une durée aléatoire au format "hh:mm"
                String randomDuration = durations[i];
                // Convertir la durée en LocalTime
                LocalTime duration = LocalTime.parse(randomDuration);
                Long milliseconds = Duration.between(LocalTime.MIN, duration).toMillis();
                prestation.setDuration(milliseconds);
        
                prestation.setAddPoint(300);
                prestation.setState("EN_COURS");
                prestation.setDescription(descriptions[i]);
                prestation.setMaxUser(faker.number().numberBetween(1,10));
                
                Type type = typeRepository.getReferenceById(i+1);
                prestation.setType(type);

                Location location = locationRepository.getReferenceById(i+1);
                prestation.setLocation(location);

                prestation.setLanguage(languages[i]);
                prestation.setLittleDescription(littleDescriptions[i]);
                prestation.setPersonalInfos(personalsInfos[i]);
                prestation.setPlaceAvailable(faker.number().numberBetween(1,prestation.getMaxUser()));
                prestation.setPracticalInformation(practicalsInformations[i]);
                prestation.setVideoLink(videosLink[i]);
        
                prestationRepository.save(prestation);
            
            }
        }
    } 

}
