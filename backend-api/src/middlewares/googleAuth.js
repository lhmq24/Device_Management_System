const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client();

async function googleAuthMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No access token provided" });
    }

    const token = authHeader.split(" ")[1];

    // Validate token
    client.setCredentials({ access_token: token });

    const userinfo = await client.request({
      url: "https://www.googleapis.com/oauth2/v3/userinfo",
    });

    // Attach user info to request object
    req.user = userinfo.data;
    next();
  } catch (error) {
    console.error("Google auth error:", error.message);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

module.exports = googleAuthMiddleware;
