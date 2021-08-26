import { Router } from "express";

// Users Controllers
import { CreateUsersController } from "./controllers/CreateUsersController";
import { ListUsersController } from "./controllers/ListUsersController";

// Tags Controllers
import { CreateTagsController } from "./controllers/CreateTagsController";
import { ListTagsController } from "./controllers/ListTagsController";

// Compliments Controllers
import { CreateComplimentController } from "./controllers/CreateComplimentController";
import { ListUserReceiveComplimentsController } from "./controllers/ListUserReceiveComplimentsController";
import { ListUserSenderComplimentsController } from "./controllers/ListUserSenderComplimentsController";

// Authenticate Controller
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";

// Middlewares
import { ensureAdmin } from "./middleware/ensureAdmin";
import { ensureAuthenticated } from "./middleware/ensureAuthenticated";

// Routes Inicialization 
const router = Router();

// Instance of users controllers
const createUsersController = new CreateUsersController();
const listUsersController = new ListUsersController();

// Instance of tags controllers
const createTagsController = new CreateTagsController();
const listTagsController = new ListTagsController();

// Instance of compliments controllers
const createComplimentController = new CreateComplimentController();
const listUserReceiveComplimentsController = new ListUserReceiveComplimentsController();
const listUserSenderComplimentsController = new ListUserSenderComplimentsController();

// Instance of authenticate controller
const authenticateUserController = new AuthenticateUserController();


router.post("/users", createUsersController.handle);
router.post("/tags", ensureAuthenticated, ensureAdmin, createTagsController.handle);
router.post("/login", authenticateUserController.handle);
router.post("/compliment", ensureAuthenticated, createComplimentController.handle);

router.get("/users/compliments/receive", ensureAuthenticated, listUserReceiveComplimentsController.handle);
router.get("/users/compliments/send", ensureAuthenticated, listUserSenderComplimentsController.handle);
router.get("/users", ensureAuthenticated, listUsersController.handle);
router.get("/tags", ensureAuthenticated, listTagsController.handle);


export { router }