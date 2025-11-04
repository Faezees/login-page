import { NextApiRequest, NextApiResponse } from "next";

const bookings = [
  {
    id: 1,
    name: "Sara Ali",
    phone: "0605047577",
    time: "June, 12 Monday, 20:30",
    status: "pending",
  },
  {
    id: 2,
    name: "Anass Ojiyo",
    phone: "0605047577",
    time: "June, 12 Monday, 20:30",
    status: "pending",
  },
  {
    id: 3,
    name: "Lina Farid",
    phone: "0605047578",
    time: "June, 13 Tuesday, 18:00",
    status: "pending",
  },
  {
    id: 4,
    name: "Omar Khalid",
    phone: "0605047579",
    time: "June, 14 Wednesday, 19:30",
    status: "pending",
  },
  {
    id: 5,
    name: "Mina Rashid",
    phone: "0605047580",
    time: "June, 15 Thursday, 20:00",
    status: "pending",
  },
  {
    id: 6,
    name: "Ali Hassan",
    phone: "0605047581",
    time: "June, 16 Friday, 21:00",
    status: "pending",
  },
  {
    id: 7,
    name: "Nadia Karim",
    phone: "0605047582",
    time: "June, 17 Saturday, 17:30",
    status: "pending",
  },
  {
    id: 8,
    name: "Youssef Omar",
    phone: "0605047583",
    time: "June, 18 Sunday, 16:00",
    status: "pending",
  },
  {
    id: 9,
    name: "Fatima Noor",
    phone: "0605047584",
    time: "June, 19 Monday, 18:30",
    status: "pending",
  },
  {
    id: 10,
    name: "Rami Adel",
    phone: "0605047585",
    time: "June, 20 Tuesday, 19:00",
    status: "pending",
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const mode = req.query.mode;
  setTimeout(() => {
    if (mode === "error")
      return res.status(500).json({ message: "Server error" });
    if (mode === "empty") return res.status(200).json([]);
    res.status(200).json(bookings);
  }, 600);
}
