import passport from "passport";
import passportLocal from "passport-local";
import passportGithub from "passport-github2";
import { Users } from "../models/user.model.js";
import { createHash, validatePassword } from "../utils/cryptPassword.util.js";
import { ghId, ghSecret } from "./server.config.js";

const LocalStragy = passportLocal.Strategy;
const GithubStrategy = passportGithub.Strategy;

export const initPassport = () => {
	passport.use(
		"register",
		new LocalStragy(
			{ passReqToCallback: true, usernameField: "email" },
			async (req, username, password, done) => {
				try {
					const { first_name, last_name, email } = req.body;

					if (!first_name || !last_name || !email || !password) {
						console.log("parametro vacio");
						return done(null, false);
					}

					if (await Users.findOne({ email: username })) {
						console.log("user exist");
						return done(null, false);
					}
					const newUserInfo = {
						first_name,
						last_name,
						email,
						password: createHash(password),
					};

					const user = await Users.create(newUserInfo);

					return done(null, user);
				} catch (error) {
					return done(error);
				}
			}
		)
	);

	passport.use(
		"login",
		new LocalStragy({ usernameField: "email" }, async (username, password, done) => {
			try {
				const user = await Users.findOne({ username });

				if (!user) {
					console.log("urer not registered");
					return done(null, false);
				}

				if (!validatePassword(user.password, password)) {
					console.log("wrong password");
					return done(null, error);
				}

				done(null, user);
			} catch (error) {
				done(error);
			}
		})
	);

	passport.use(
		"github",
		new GithubStrategy(
			{
				clientID: ghId,
				clientSecret: ghSecret,
				callbackURL: "http://localhost:3000/auth/githubcallback",
			},
			async (accessToken, RefreshToken, profile, done) => {
				try {
					const { id, login, name, email } = profile._json;

					const user = await Users.findOne({ email: email });

					if (!user) {
						const newUserInfo = {
							first_name: name,
							email,
							githubId: id,
							githubUsername: login,
						};

						const newUser = await Users.create(newUserInfo);
						return done(null, newUser);
					}

					return done(null, user);
				} catch (error) {
					done(error);
				}
			}
		)
	);

	passport.serializeUser((user, done) => {
		done(null, user._id);
	});

	passport.deserializeUser(async (id, done) => {
		const user = Users.findById(id);
		done(null, user);
	});
};
