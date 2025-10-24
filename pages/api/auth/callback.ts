import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const code = req.query.code as string;
  if (!code) return res.status(400).json({ error: "No code provided" });

  const params = new URLSearchParams();
  params.append("client_id", process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID!);
  params.append("client_secret", process.env.DISCORD_CLIENT_SECRET!);
  params.append("grant_type", "authorization_code");
  params.append("code", code);
  params.append("redirect_uri", process.env.NEXT_PUBLIC_DISCORD_REDIRECT_URI!);

  try {
    const tokenRes = await fetch("https://discord.com/api/oauth2/token", {
      method: "POST",
      body: params,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
    const tokenData = await tokenRes.json();

    // Kullanıcının Discord bilgilerini al
    const userRes = await fetch("https://discord.com/api/users/@me", {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });
    const userData = await userRes.json();

    // userData.id = Discord ID
    // Bunu session veya cookie ile frontend’e iletebilirsin
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json({ error: "Discord OAuth failed", details: err });
  }
}