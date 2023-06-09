module.exports = app => {
    const sales = require("../controllers/sales.controller.js");
    const { authJwt } = require("../middleware/index.js");

    app.post(
      "/api/sales/",
      // [authJwt.verifyToken, authJwt.isAdmin], 
      sales.create
      /* 	#swagger.tags = ['Sales']
        #swagger.description = 'Input sales' */

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
      "/api/sales/",
      // [authJwt.verifyToken], 
      sales.findAll
        /* 	#swagger.tags = ['Sales']
        #swagger.description = 'Get all sales' */

      /* #swagger.security = [{
              "apiKeyAuth": []
      }] */ 
      );
    app.get(
      "/api/sales/:id", 
      // [authJwt.verifyToken], 
      sales.findOne
       /* 	#swagger.tags = ['Sales']
        #swagger.description = 'Get by Id sales' */

      /* #swagger.security = [{
              "apiKeyAuth": []
      }] */ 
      );
    app.patch(
      "/api/sales/:id", 
      // [authJwt.verifyToken,authJwt.isAdmin], 
      sales.update
       /* 	#swagger.tags = ['Sales']
        #swagger.description = 'Update sales' */

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
      "/api/sales/:id", 
      // [authJwt.verifyToken, authJwt.isAdmin], 
      sales.delete
       /* 	#swagger.tags = ['Sales']
        #swagger.description = 'Delete By ID sales' */

      /* #swagger.security = [{
              "apiKeyAuth": []
      }] */ );
    app.delete(
      "/api/sales/",
      // [authJwt.verifyToken, authJwt.isAdmin],
       sales.deleteAll
        /* 	#swagger.tags = ['Sales']
        #swagger.description = 'Delete all sales' */


      /* #swagger.security = [{
              "apiKeyAuth": []
      }] */ 
       );
  };