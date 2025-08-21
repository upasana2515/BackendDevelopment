function m1(req, res, next) {
    console.log("running middleware 1...");
    req.user = {
        id: 1,
        username: "upasana"
    };
    next();
}

function m2(req, res, next) {
    console.log("running middleware 2...");
    console.log(req.user);
    req.isAdmin = true;   // set BEFORE next()
    next();
}

function checkAdmin(req, res, next) {
    let { name } = req.query;

    if (name === "upasana") {
        req.isAdmin = true;
        return next();
    }

    return res.json({
        success: false,
        message: "you are not an admin"
    });
}

function isLogin(req,res,next){
    console.log("running middleware isLogin")
    next();
}

module.exports.m1 = m1;
module.exports.m2 = m2;
module.exports.checkAdmin = checkAdmin;
module.exports.isLogin = isLogin;