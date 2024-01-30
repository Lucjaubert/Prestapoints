
it.only('ReqRes API Create User test', () => {
    cy.request({
        url: 'http://localhost:8080/public/sign-in',
        method: 'POST',
        body: {
            "firstname": "Mohammed",
            "lastname": "Ali",
            "email": "mohammed@ali.com",
            "password": "momo123456",
            "phone": "0123456789"

        }
    }).then((response) => {
        cy.log(JSON.stringify(response))

        expect(response.body[0].email).to.equal('mohammed@ali.com'); // Vérifiez la propriété email

    });
});
