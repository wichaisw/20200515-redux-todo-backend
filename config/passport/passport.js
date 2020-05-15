const passport = require("passport");
const passportJwt = require("passport-jwt");
const db = require("../../models");

const options = {
  jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET,
};

const jwtStategy = new passportJwt.Strategy(options, async (payload, done) => {
  const user = await db.User.findOne({ where: { id: payload.id } });
  if (user) {
    done(null, user);
  } else {
    done(null, false);
  }
});

passport.use("jwt-authenticate", jwtStategy);
