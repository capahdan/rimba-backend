module.exports = app => {
    const items = require("../controllers/items.controller.js");
    const { authJwt } = require("../middleware/index.js");

    app.post(
      "/api/items/",
      // [authJwt.verifyToken, authJwt.isAdmin], 
      items.create
      /* 	#swagger.tags = ['Items']
        #swagger.description = 'Input items' */

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
      "/api/items/",
      // [authJwt.verifyToken], 
      items.findAll
        /* 	#swagger.tags = ['Items']
        #swagger.description = 'Get all items' */

      /* #swagger.security = [{
              "apiKeyAuth": []
      }] */ 
      );
    app.get(
      "/api/items/:id", 
      // [authJwt.verifyToken], 
      items.findOne
       /* 	#swagger.tags = ['Items']
        #swagger.description = 'Get by Id items' */

      /* #swagger.security = [{
              "apiKeyAuth": []
      }] */ 
      );
    app.patch(
      "/api/items/:id", 
      // [authJwt.verifyToken,authJwt.isAdmin], 
      items.update
       /* 	#swagger.tags = ['Items']
        #swagger.description = 'Update items' */

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
      "/api/items/:id", 
      // [authJwt.verifyToken, authJwt.isAdmin], 
      items.delete
       /* 	#swagger.tags = ['Items']
        #swagger.description = 'Delete By ID items' */

      /* #swagger.security = [{
              "apiKeyAuth": []
      }] */ );
    app.delete(
      "/api/items/",
      // [authJwt.verifyToken, authJwt.isAdmin],
       items.deleteAll
        /* 	#swagger.tags = ['Items']
        #swagger.description = 'Delete all items' */


      /* #swagger.security = [{
              "apiKeyAuth": []
      }] */ 
       );
  };