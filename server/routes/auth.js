

import express from "express";

const router = express.Router();
import passport from "passport";
// import second from 'express/'

router.get("/login/success", (req, res) => {
    if (req.user) {
        res.status(200).json({
            success: true,
            message: "successfull",
            user: req.user,
            // cookies: req.cookies,
        })
    }
})

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

router.get("/logout", (req, res) => {
    req.logout()
    res.redirect(process.env.CLIENT_URL)
})

router.get("/auth/google", passport.authenticate("google", { scope: ["profile"] }))
 
router.get(
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

export default router