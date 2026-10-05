import "dotenv/config";
import passport from "passport";
import {
  Strategy as GoogleStrategy,
  type Profile,
} from "passport-google-oauth20";
import User from "../models/userModel";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: process.env.GOOGLE_CALLBACK_URL as string,
    },

    async (_accessToken, _refreshToken, profile: Profile, done) => {
      try {
        const email = profile.emails?.[0]?.value?.toLowerCase();

        if (!email) {
          return done(new Error("Google account has no email"));
        }

        let user = await User.findOne({
          emailAddress: email,
        });

        if (user) {
          if (!user.googleId) {
            user.googleId = profile.id;
            user.isVerified = true;

            await user.save();
          }
        } else {
          const username = `google_${profile.id}`.slice(0, 30);

          user = await User.create({
            username,
            emailAddress: email,
            googleId: profile.id,
            isVerified: true,
          });
        }

        return done(null, user);
      } catch (error) {
        return done(error as Error);
      }
    },
  ),
);

console.log("Google Passport strategy initialized");

export default passport;
