const {
  generateRegistrationOptions,
  verifyRegistrationResponse,
  generateAuthenticationOptions,
  verifyAuthenticationResponse,
} = require("@simplewebauthn/server");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const {
  getUserByEmail,
  createUser,
  updateUserCounter,
  getUserById,
} = require("./db");

const app = express();
const crypto = require("crypto");

// ✅ MUST BE BEFORE ANY ROUTES
app.use(express.json());
app.use(cookieParser());

// ✅ USE EXPLICIT CLIENT_URL FOR CORS (not wildcard or default)
const CLIENT_URL = "https://finger-print-zeta.vercel.app";
const RP_ID = "finger-print-zeta.vercel.app";

app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  })
);

// ✅ INIT REGISTER
app.get("/init-register", async (req, res) => {
  const email = req.query.email;
  if (!email) return res.status(400).json({ error: "Email is required" });

  if (getUserByEmail(email) != null) {
    return res.status(400).json({ error: "User already exists" });
  }

  const options = await generateRegistrationOptions({
  rpID: RP_ID,
  rpName: "SecureAuth",
  userID: Buffer.from(crypto.randomUUID()), // ✅ FIXED
  userName: email,
});


  res.cookie(
    "regInfo",
    JSON.stringify({
      userId: options.user.id,
      email,
      challenge: options.challenge,
    }),
    {
      httpOnly: true,
      maxAge: 60000,
      secure: true,
      sameSite: "none", // ✅ Required when frontend/backend on different domains
    }
  );

  res.json(options);
});

// ✅ VERIFY REGISTER
app.post("/verify-register", async (req, res) => {
  let regInfo;
  try {
    regInfo = JSON.parse(req.cookies.regInfo);
  } catch (err) {
    return res.status(400).json({ error: "Invalid registration cookie" });
  }

  if (!regInfo) {
    return res.status(400).json({ error: "Registration info not found" });
  }

  let verification;
  try {
    verification = await verifyRegistrationResponse({
      response: req.body,
      expectedChallenge: regInfo.challenge,
      expectedOrigin: CLIENT_URL,
      expectedRPID: RP_ID,
    });
  } catch (err) {
    return res.status(400).json({ error: "Verification error", details: err.message });
  }

  if (verification.verified) {
    createUser(regInfo.userId, regInfo.email, {
      id: verification.registrationInfo.credentialID,
      publicKey: verification.registrationInfo.credentialPublicKey,
      counter: verification.registrationInfo.counter,
      deviceType: verification.registrationInfo.credentialDeviceType,
      backedUp: verification.registrationInfo.credentialBackedUp,
      transports: req.body.transports,
    });

    res.clearCookie("regInfo");
    return res.json({ verified: true });
  } else {
    return res.status(400).json({ verified: false, error: "Verification failed" });
  }
});

// ✅ INIT AUTH
app.get("/init-auth", async (req, res) => {
  const email = req.query.email;
  if (!email) return res.status(400).json({ error: "Email is required" });

  const user = getUserByEmail(email);
  if (!user) return res.status(400).json({ error: "No user for this email" });

  const options = await generateAuthenticationOptions({
    rpID: RP_ID,
    allowCredentials: [
      {
        id: user.passKey.id,
        type: "public-key",
        transports: user.passKey.transports,
      },
    ],
  });

  res.cookie(
    "authInfo",
    JSON.stringify({
      userId: user.id,
      challenge: options.challenge,
    }),
    {
      httpOnly: true,
      maxAge: 60000,
      secure: true,
      sameSite: "none",
    }
  );

  res.json(options);
});

// ✅ VERIFY AUTH
app.post("/verify-auth", async (req, res) => {
  let authInfo;
  try {
    authInfo = JSON.parse(req.cookies.authInfo);
  } catch (err) {
    return res.status(400).json({ error: "Invalid auth cookie" });
  }

  const user = getUserById(authInfo.userId);
  if (!user || user.passKey.id !== req.body.id) {
    return res.status(400).json({ error: "Invalid user" });
  }

  let verification;
  try {
    verification = await verifyAuthenticationResponse({
      response: req.body,
      expectedChallenge: authInfo.challenge,
      expectedOrigin: CLIENT_URL,
      expectedRPID: RP_ID,
      authenticator: {
        credentialID: user.passKey.id,
        credentialPublicKey: user.passKey.publicKey,
        counter: user.passKey.counter,
        transports: user.passKey.transports,
      },
    });
  } catch (err) {
    return res.status(400).json({ error: "Authentication error", details: err.message });
  }

  if (verification.verified) {
    updateUserCounter(user.id, verification.authenticationInfo.newCounter);
    res.clearCookie("authInfo");
    return res.json({ verified: true });
  } else {
    return res.status(400).json({ verified: false, error: "Verification failed" });
  }
});

app.listen(3000, () => {
  console.log("✅ Server running on http://localhost:3000");
});
