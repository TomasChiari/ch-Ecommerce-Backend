export function auth(req, res, next) {
	if (req.session.auth) {
		console.log(req.session);
		return next();
	}

	res.redirect("/errors/403");
}
