var config = require('../../config/configs.json').passportFacebook

module.exports = (passport, Strategy) => {
    passport.use(new Strategy({
            clientID: config.clientID,
            clientSecret: config.clientSecret,
            callbackURL: config.callback
        },
        function (accessToken, refreshToken, profile, cb) {
            return cb(null, profile)
        }))
    passport.serializeUser(function (user, cb) {
        cb(null, user)
    })

    passport.deserializeUser(function (user, cb) {
        // if(!session.user.dbLoaded){
        //   find.user...
        // }
        cb(null, user)
    })
}