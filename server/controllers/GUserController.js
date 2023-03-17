import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { validationResult } from "express-validator/src/validation-result.js"
import GUserModel from "../models/GUser.js"

export const gLogin = async (req, res) => {
  try {
    const doc = new GUserModel({ 
      googleId: req.googleId,
      username: req.username,
        gAvatarUrl: req.gAvatarUrl
    })

    const gUser = await doc.save()
    // console.log({...gUser})

    // res.json({...gUser})
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: err,
    })
  }
}
