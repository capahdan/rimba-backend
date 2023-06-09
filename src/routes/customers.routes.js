module.exports = app => {
    const customers = require("../controllers/customers.controller.js");
    const { authJwt } = require("../middleware/index.js");

    app.post(
      "/api/customers/",
      // [authJwt.verifyToken, authJwt.isAdmin], 
      customers.create
      /* 	#swagger.tags = ['Customers']
        #swagger.description = 'Input customer' */

      /*	#swagger.parameters['obj'] = {
              in: 'body',
              description: 'ansswer information.',
              required: true,
             schema: { $ref: "#/definitions/AddAnswer" }
      } */

      /* #swagger.security = [{
              "apiKeyAuth": []
      }] */ 
      );
    app.get(
      "/api/customers/",
      // [authJwt.verifyToken], 
      customers.findAll
        /* 	#swagger.tags = ['Customers']
        #swagger.description = 'Get all customer' */

      /* #swagger.security = [{
              "apiKeyAuth": []
      }] */ 
      );
    app.get(
      "/api/customers/:id", 
      // [authJwt.verifyToken], 
      customers.findOne
       /* 	#swagger.tags = ['Customers']
        #swagger.description = 'Get by Id customer' */

      /* #swagger.security = [{
              "apiKeyAuth": []
      }] */ 
      );
    app.patch(
      "/api/customers/:id", 
      // [authJwt.verifyToken,authJwt.isAdmin], 
      customers.update
       /* 	#swagger.tags = ['Customers']
        #swagger.description = 'Update customer' */

      /*	#swagger.parameters['obj'] = {
              in: 'body',
              description: 'ansswer information.',
              required: true,
             schema: { $ref: "#/definitions/UpdateAnswer" }
      } */

      /* #swagger.security = [{
              "apiKeyAuth": []
      }] */ 
      );
    app.delete(
      "/api/customers/:id", 
      // [authJwt.verifyToken, authJwt.isAdmin], 
      customers.delete
       /* 	#swagger.tags = ['Customers']
        #swagger.description = 'Delete By ID customer' */

      /* #swagger.security = [{
              "apiKeyAuth": []
      }] */ );
    app.delete(
      "/api/customers/",
      // [authJwt.verifyToken, authJwt.isAdmin],
       customers.deleteAll
        /* 	#swagger.tags = ['Customers']
        #swagger.description = 'Delete all customer' */


      /* #swagger.security = [{
              "apiKeyAuth": []
      }] */ 
       );
  };