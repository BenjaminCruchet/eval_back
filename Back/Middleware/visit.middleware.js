const { logEvent } = require('../Services/log.service');

const TRACKED_ROUTES = [
    '/',
    '/reservation',
    '/login',
    '/register',
    '/cart'
];

async function visitMiddleware(req, res, next) {

    if (!TRACKED_ROUTES.includes(req.path.split("?")[0])) {
        return next();
    }

    try {
        await logEvent({
            type: "VISIT",
            route: req.originalUrl,
            method: req.method,
            sessionId: req.sessionID,
            userId: req.session?.user?.id ?? null,
            userAgent: req.get('user-agent')
        });
    } catch (err) {
        console.error('Erreur log visite :', err);
    }

    next();
}

module.exports = visitMiddleware;