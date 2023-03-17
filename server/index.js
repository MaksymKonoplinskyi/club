import "dotenv/config"
import express from "express"
import fs from "fs"
import multer from "multer"
import cors from "cors"
import mongoose from "mongoose"
import {
  registerValidation,
  loginValidation,
  postCreateValidation,
} from "./validations.js"
import { checkAuth, handleValidationErrors } from "./utils/index.js"
import {
  UserController,
  PostController,
  CommentController,
} from "./controllers/index.js"
import checkAftorComent from "./utils/checkAftorComent.js"
import checkAftorPost from "./utils/checkAftorPost.js"
import passport from "passport"
import session from "express-session"

import "./passport.js"
import "./routes/auth.js"

const options = { dbName: "club" }
mongoose.set("strictQuery", true)
mongoose
  .connect(process.env.MONGODB_URL, options)
  .then(() => console.log("DB ok"))
  .catch(err => console.log("DB err", err))

const app = express()

app.use(
  session({
    name: "session",
    secret: "SuperSecret",
    resave: false,
    saveUninitialized: false, 
    cookie: { maxAge: 24 * 60 * 60 * 1000 },  
  })
)
app.use(passport.initialize())
app.use(passport.session())

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    if (!fs.existsSync("uploads")) {
      fs.mkdirSync("uploads")
    } 
    cb(null, "uploads")
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname) 
  },
})

const upload = multer({ storage })

app.use(express.json())
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
)
app.use("/uploads", express.static("uploads"))
// app.use('/uploadsAvatars', express.static('uploadsAvatars'));



app.post(
  "/auth/login",
  loginValidation,
  handleValidationErrors,
  UserController.login
)
app.post(
  "/auth/register",
  registerValidation,
  handleValidationErrors,
  UserController.register
)
app.get("/auth/me", checkAuth, UserController.getMe)

app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  })
})
app.post("/uploadAvatar", upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  })
})
app.patch("/patchProfile", checkAuth, UserController.update)

app.get("/tags/new", PostController.getLastTags)
app.get("/tags/pop", PostController.getPopularTags)

app.get("/posts/sort/:sort", PostController.getAll)
// app.get('/postsNew', PostController.getAllNew);
// app.get('/postsPopular', PostController.getAllPopular);

app.get("tags/new", PostController.getLastTags)
app.get("tags/pop", PostController.getPopularTags)
app.get("/posts/:id", PostController.getOne)
app.post(
  "/posts",
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.create
)
app.delete("/posts/:id", checkAuth, checkAftorPost, PostController.remove)
app.patch(
  "/posts/:id",
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  checkAftorPost,
  PostController.update
)

app.post("/comment", checkAuth, CommentController.create)
app.get("/comments/:postId", CommentController.getAll)
app.get("/comment/:id", checkAuth, CommentController.getOne)
app.patch("/comment/:id", checkAuth, checkAftorComent, CommentController.update)
app.delete("/comment/:id", checkAuth, CommentController.remove)
app.get("/posts/withTag/:tagName/:sort", PostController.getPostsWithTag)


// const router = express.Router();
// import passport from "passport";
// import second from 'express/'

app.get("/login/success", (req, res) => {
    if (req.user) {
        res.status(200).json({
            success: true,
            message: "successfull",
            user: req.user,
            // cookies: req.cookies,
        })
    }
})

app.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

app.get("/logout", (req, res) => {
    req.logout()
    res.redirect(process.env.CLIENT_URL)
})

app.get("/auth/google", passport.authenticate("google", { scope: ["profile"] }))
 
app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    
      successRedirect: process.env.CLIENT_URL,
      failureRedirect: "/login/failed",
  }),
)

// router.get("/github", passport.authenticate("github", { scope: ["profile"] }));

// router.get(
//   "/github/callback",
//   passport.authenticate("github", {
//     successRedirect: CLIENT_URL,
//     failureRedirect: "/login/failed",
//   })
// );

// router.get("/facebook", passport.authenticate("facebook", { scope: ["profile"] }));

// router.get(
//   "/facebook/callback",
//   passport.authenticate("facebook", {
//     successRedirect: CLIENT_URL,
//     failureRedirect: "/login/failed",
//   })
// );


app.listen(process.env.PORT || 4444, err => {
  err ? console.log(err) : console.log("Server OK")
})
