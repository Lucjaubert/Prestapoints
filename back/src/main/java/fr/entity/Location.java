package fr.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name="`location`")
public class Location {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String latitude;
    private String longitude;
    private String city;
    private String postalCode;
    private String address;
    private String addressNumber;
    private String addressInformation;

   @OneToOne(mappedBy = "location", fetch = FetchType.LAZY)
   @JsonIgnore
    private Prestation prestation;
}
