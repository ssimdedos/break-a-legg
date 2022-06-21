const express = require("express");
const router = express.Router();
const db = require("../database/pool");
require("dotenv").config();

const EXPO_CLIENT_ID = process.env.EXPO_CLIENT_ID;
const ANDROID_CLIENT_ID = process.env.ANDROID_CLIENT_ID;
const WEB_CLIENT_SECRET_KEY = process.env.WEB_CLIENT_SECRET_KEY;

const { OAuth2Client } = require("google-auth-library");

router.post("/checkGID", async (req, res, next) => {
  // console.log(req);
  const { params } = req.body;
  //console.log(params);
  const data = await getAccountFromIdToken(params.id_token);
  // console.log(data);
  res.json(data);
});

router.get("/getIds", async (req, res) => {
  //console.log("get request");
  const ids = {
    EXPO_CLIENT_ID,
    ANDROID_CLIENT_ID,
  };
  //console.log("ids 전송", ids);
  res.json(ids);
});

async function getAccountFromIdToken(idToken) {
  const client = new OAuth2Client(EXPO_CLIENT_ID);
  const ticket = await client.verifyIdToken({
    idToken: idToken,
    audience: EXPO_CLIENT_ID,
  });
  const payload = ticket.getPayload();
  const { email, name } = payload;
  const emailFrom = email.split("@")[1].split(".")[0];
  try {
    const idCheck = await db.query(
      `SELECT email FROM members where email='${email}'`
    );
    //계정 존재유무 확인
    if (idCheck[0].length === 0) {
      await db.query(
        `INSERT INTO members (username, email, emailFrom) VALUES('${name}','${email}','${emailFrom}')`
      );
      console.log(`회원가입 완료 ${email}`);
    }
    // console.log(email);
    return { email, name };
  } catch (err) {
    console.error(err);
  }
}

module.exports = router;
