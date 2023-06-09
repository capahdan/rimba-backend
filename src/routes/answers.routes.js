module.exports = app => {
    const answers = require("../controllers/answers.controller.js");
    const { authJwt } = require("../middleware/index.js");

    app.post(
      "/api/answers/",
      [authJwt.verifyToken, authJwt.isAdmin], 
      answers.create
      /* 	#swagger.tags = ['Answers']
        #swagger.description = 'Input answer' */

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
      "/api/answers/",
      [authJwt.verifyToken], 
      answers.findAll
        /* 	#swagger.tags = ['Answers']
        #swagger.description = 'Get all answer' */

      /* #swagger.security = [{
              "apiKeyAuth": []
      }] */ 
      );
    app.get(
      "/api/answers/:id", 
      [authJwt.verifyToken], 
      answers.findOne
       /* 	#swagger.tags = ['Answers']
        #swagger.description = 'Get by Id answer' */

      /* #swagger.security = [{
              "apiKeyAuth": []
      }] */ 
      );
    app.patch(
      "/api/answers/:id", 
      [authJwt.verifyToken,authJwt.isAdmin], 
      answers.update
       /* 	#swagger.tags = ['Answers']
        #swagger.description = 'Update answer' */

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
      "/api/answers/:id", 
      [authJwt.verifyToken, authJwt.isAdmin], 
      answers.delete
       /* 	#swagger.tags = ['Answers']
        #swagger.description = 'Delete By ID answer' */

      /* #swagger.security = [{
              "apiKeyAuth": []
      }] */ );
    app.delete(
      "/api/answers/",
      [authJwt.verifyToken, authJwt.isAdmin],
       answers.deleteAll
        /* 	#swagger.tags = ['Answers']
        #swagger.description = 'Delete all answer' */


      /* #swagger.security = [{
              "apiKeyAuth": []
      }] */ 
       );
  };