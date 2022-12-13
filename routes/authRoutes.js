const express = require("express");
const router = express.Router();
var otpGenerator = require("otp-generator");
const nodemailer = require("nodemailer");
const xss = require("xss");
const dotenv = require("dotenv");
dotenv.config();
const { userData } = require("../data");

let otp = "";

const sendEMail = (receiver, req) => {
  const transport = {
    //this is the authentication for sending email.
    service: "gmail",
    //create a .env file and define the process.env variables
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASS,
    },
  };
  const transporter = nodemailer.createTransport(transport);
  console.log(transport);
  //make mailable object
  otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
  });
  req.session.user.otp = otp;
  const mail = {
    from: "YASMP",
    to: receiver,
    subject: "OTP for YASMP",
    text: `
    A log-in attempt was made to your YASMP account

    Your OTP is: ${otp}
    
    Ignore this email if this wasn't you.
    `,
  };
  transporter.sendMail(mail, (err, data) => {
    if (err) {
      throw err;
    } else {
      console.log(data);
    }
  });

  return otp;
};

router
  .route("/login")
  .get(async (req, res) => {
    //code here for GET
    try {
      if (!req.session.user) {
        return res
          .status(200)
          .render("auth/login", { title: "Login", partial: "auth-script", css: "auth-css" });
      } else {
        return res.redirect("/home");
      }
    } catch (err) {
      res
        .status(err?.status ?? 500)
        .render("auth/login", { title: "Login", partial: "auth-script", css: "auth-css" });
    }
  })
  .post(async (req, res) => {
    try {
      let { emailInput, passwordInput } = req.body;
      emailInput = xss(emailInput);
      passwordInput = xss(passwordInput);

      // TODO: Input CHecking
    } catch (err) {
      res
        .status(err?.status ?? 400)
        .render("auth/login", {
          title: "Login",
          error: err?.message ?? err,
          partial: "auth-script", css: "auth-css",
        });
    }

    try {
      let { emailInput, passwordInput } = req.body;
      emailInput = xss(emailInput);
      passwordInput = xss(passwordInput);

      const existingUser = await userData.checkUser(emailInput, passwordInput);
      if (existingUser) {
        req.session.user = existingUser;
        return res.redirect("otp");
      } else {
        res
          .status(err?.status ?? 500)
          .render("auth/login", {
            title: "Login",
            error: err?.message ?? err,
            partial: "auth-script", css: "auth-css",
          });
      }
    } catch (err) {
      res
        .status(err?.status ?? 500)
        .render("auth/login", {
          title: "Login",
          error: err?.message ?? err,
          partial: "auth-script", css: "auth-css",
        });
    }
  });

router
  .route("/signup")
  .get(async (req, res) => {
    //code here for GET
    try {
      if (!req.session.user || !req.session.user.verified) {
        return res
          .status(200)
          .render("auth/signup", { title: "Sign-up", partial: "auth-script", css: "auth-css" });
      } else {
        return res.redirect("/home");
      }
    } catch (err) {
      console.log(err);
      res
        .status(err?.status ?? 500)
        .render("auth/signup", {
          title: "Sign-up",
          partial: "auth-script", css: "auth-css",
          error: err?.message ?? err,
        });
    }
  })
  .post(async (req, res) => {
    try {
      const {
        firstnameInput,
        lastnameInput,
        DOBInput,
        usernameInput,
        emailInput,
        passwordInput,
      } = req.body; // TODO: Input Validation
    } catch (err) {
      console.log(err, "Line 150");
      res
        .status(err?.status ?? 400)
        .render("auth/signup", {
          title: "Sign-up",
          partial: "auth-script", css: "auth-css",
          error: err?.message ?? err,
        });
    }
    try {
      let {
        firstnameInput,
        lastnameInput,
        DOBInput,
        usernameInput,
        emailInput,
        passwordInput,
      } = req.body;
      firstnameInput = xss(firstnameInput);
      lastnameInput = xss(lastnameInput);
      DOBInput = xss(DOBInput);
      usernameInput = xss(usernameInput);
      emailInput = xss(emailInput);
      passwordInput = xss(passwordInput);

      const newUser = await userData.createUser(
        firstnameInput,
        lastnameInput,
        DOBInput,
        usernameInput,
        emailInput,
        passwordInput
      );
      if (!newUser.insertedUser) {
        console.log(err, "Line 184");
        res
          .status(err?.status ?? 500)
          .render("auth/signup", {
            title: "Sign-up",
            partial: "auth-script", css: "auth-css",
            error: err?.message ?? err,
          });
      } else {
        res.redirect("/login");
      }
    } catch (err) {
      console.log(err, "Line 196");
      res
        .status(err?.status ?? 500)
        .render("auth/signup", {
          title: "Sign-up",
          partial: "auth-script", css: "auth-css",
          error: err?.message ?? err,
        });
    }
  });

router
  .route("/otp")
  .get(async (req, res) => {
    try {
      if (!req.session.user) {
        location.replace("/");
      } else {
        otp = sendEMail(req?.session?.user?.email, req);

        return res
          .status(200)
          .render("auth/two-factor", {
            title: "2 Factor",
            partial: "auth-script", css: "auth-css"
          });
      }
    } catch (err) {
      console.log("Line 226", err);
      res.status(err?.status ?? 500).render("auth/two-factor", {
        title: "2 Factor",
        partial: "auth-script", css: "auth-css",
        error: err?.message ?? err,
      });
    }
  })
  .post(async (req, res) => {
    try {
      const { OTPInput } = req.body; // TODO: Input Checking
    } catch (err) {
      console.log("Line 234", err);
      res
        .status(err?.status ?? 400)
        .render("auth/two-factor", {
          title: "2 Factor",
          error: err?.message ?? err,
          partial: "auth-script", css: "auth-css"
        });
    }

    try {
      let { OTPInput } = req.body;
      OTPInput = xss(OTPInput);
      otp = req.session.user.otp;
      if (otp === OTPInput) {
        req.session.user = {
          ...req.session.user,
          verified: true,
        };
        res.status(200).redirect("/home"); // Homepage
      } else {
        console.log("OTPs:", OTPInput, otp);
      }
    } catch (err) {
      console.log("Line 255", err);
      res
        .status(err?.status ?? 500)
        .render("auth/two-factor", {
          title: "2 Factor",
          error: err?.message ?? err,
          partial: "auth-script", css: "auth-css"
        });
    }
  });

router.route("/logout").get(async (req, res) => {
  //code here for GET
  req.session.destroy();
  return res.render("logout", { title: "Logged out", partial: "auth-script", css: "auth-css" });
});

module.exports = router;
