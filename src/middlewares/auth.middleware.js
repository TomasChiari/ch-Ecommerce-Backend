export function auth (req, res, next) {
    if (req.session.auth) return next()
    
    res.redirect('/login')
}