module.exports = function (req, res, next) {
    if (req.session.user.role != 'Manager') {
        req.session.flash = {
            type: 'danger',
            message: 'Only Admin Can View This Area',
        };
        return res.redirect('/login');
    }

    next();
};
