describe("Prestation home page", () => {
  it("Access to home page and search a prestation wich contains 'Poterie' in the card", () => {
    //Access
    cy.visit("");
    //Act
    cy.get(".search-input").type("poterie");
    //Activate
    cy.get(".discover-button").click();
    //Assert
    cy.get(".category-text").first().should("have.text", " Poterie ");
  });

  //Component test
  it("Access to home page and verify than search button contains 'Découvrir'", () => {
    //when
    cy.visit("");
    //then
    cy.get(".discover-button").should("have.text", "Découvrir");
  });
});
