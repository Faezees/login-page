import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method not allowed" });

  const { email, password } = req.body;

  // simulate latency
  setTimeout(() => {
    if (!email || !password)
      return res.status(400).json({ message: "Missing credentials" });

    if (email === "error@faeze.com") {
      return res.status(500).json({ message: "Server error" });
    }

    if (email === "admin@faeze.com" && password === "123456") {
      return res.status(200).json({
        user: { name: "Simo Oudib", role: "admin" },
        token: "mock-token-admin",
      });
    }

    if (email === "owner@faeze.com" && password === "123456") {
      return res.status(200).json({
        user: { name: "Anass Ojiyo", role: "owner" },
        token: "mock-token-owner",
      });
    }

    return res.status(401).json({ message: "Invalid credentials" });
  }, 700);
}
