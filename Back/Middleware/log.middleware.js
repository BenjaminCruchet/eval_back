const routesToLog = new Set([
  "/",
  "/login",
  "/register",
  "/reservation"
]);

function logMiddleware(req, res, next) {
  if (!routesToLog.has(req.path)) {
    return next();
  }

  logVisit(
    req.originalUrl,
    req.method,
    req.sessionID,
    req.session?.userId ?? null
  ).catch(err => console.error("log error:", err));

  next();
}