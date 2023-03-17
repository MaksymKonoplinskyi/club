import { Strategy } from "passport-google-oauth20"
import passport from "passport"
import GUserModel from "./models/GUser.js"
import { GUserController } from "./controllers/index.js"

const GoogleStrategy = Strategy

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:4444/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      const userData = {
        googleId: profile.id,
        username:  profile.displayName,
        gAvatarUrl: profile.photos[0].value
      }
      console.log(userData);
      GUserController.gLogin(userData)
      done(null, profile)
      //     UserModel.findOrCreate({ googleId: profile.id }, function (err, user) {
      //   return cb(err, user);
      // });
    }
  ) 
)

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((user, done) => {
  done(null, user)
})
