const { logVisit } = require('../Services/visit.service');

const TRACKED_ROUTES = [
    '/',
    '/reservation',
    '/login',
    '/register'
];

async function visitMiddleware(req, res, next) {

    if (!TRACKED_ROUTES.includes(req.path)) {
        return next();
    }

    try {
        await logVisit({
            route: req.originalUrl,
            method: req.method,
            sessionId: req.sessionID,
            userId: req.session?.userId ?? null,
            userAgent: req.get('user-agent'),
            createdAt: new Date()
        });
    } catch (err) {
        console.error('Erreur log visite :', err);
    }

    next();
}

module.exports = visitMiddleware;