import Stripe from "stripe";
import { Billing } from "../../firebaseFunction";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  const email = req.body.user.email
  const booking = req.body
  if (req.method === "POST") {
    try {
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: req.body.title,
                images: [req.body.images[0]],
              },
              unit_amount: req.body.total * 100,
            },
            quantity: 1,
          },
        ],
        submit_type: "pay",
        mode: "payment",
        payment_method_types: ["card"],
        success_url: `${req.headers.origin}/`,
        cancel_url: `${req.headers.origin}/`,
      });
      let data = {...session, ...booking}
      await Billing(email, data)
      console.log(data)
      res.status(200).json(session);
      
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
