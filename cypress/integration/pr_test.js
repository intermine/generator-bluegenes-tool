describe("UI Test", function() {
  beforeEach(function() {
    cy.visit("/");
  });


  it("should show the new generator on a report page", function() {
    cy.server()

    //navigate to a report page
    cy.get(".search .typeahead-search").last()
    .type("Devon White{downarrow}{enter}",{delay:100});

    //check for existence of newly generated tool

  });


});
