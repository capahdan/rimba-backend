const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail
    ],
    controller.signup
     /* 	#swagger.tags = ['User']
        #swagger.description = 'Register user' */

    /*	#swagger.parameters['obj'] = {
            in: 'body',
            description: 'User information.',
            required: true,
            schema: { $ref: "#/definitions/AddUser" }
    } */

    /* #swagger.security = [{
            "apiKeyAuth": []
    }] */
  );

  app.post(
    "/api/auth/signin",
    controller.signin
   /* 	#swagger.tags = ['User']
        #swagger.description = 'Signin' */

    /*	#swagger.parameters['obj'] = {
            in: 'body',
            description: 'User information.',
            required: true,
            schema: { $ref: "#/definitions/LoginUser" }
    } */

    /* #swagger.security = [{
            "apiKeyAuth": []
    }] */ 
    );
  app.patch(
    "/api/auth/update/:id", 
    controller.update
     /* 	#swagger.tags = ['User']
        #swagger.description = 'Endpoint to sign in a specific user' */

    /*	#swagger.parameters['obj'] = {
            in: 'body',
            description: 'User information.',
            required: true,
            schema: { $ref: "#/definitions/UpdateUser" }
    } */

    /* #swagger.security = [{
            "apiKeyAuth": []
    }] */
    );
};
