const { getUser } = require("../service/auth");

async function restrictToLoggedUserOnly(req, res, next) {

    const userUid = req.cookies?.uid;

    if (!userUid) return res.redirect('/api/user/login')

    const user = await getUser(userUid)
    if (!user) return res.redirect('/api/user/login')

    req.user = user;
    next()
}  

module.exports = {
    restrictToLoggedUserOnly
}