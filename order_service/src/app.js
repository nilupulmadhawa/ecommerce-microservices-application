import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './database';
import routes from './routes/index.routes';

const { errors } = require('celebrate');

dotenv.config();

const app = express();

app.use(helmet());

app.use(cors());

app.use(express.json({ limit: '1mb' }));

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.status(200).json({ message: 'Server Up and Running' }));

app.use('/api', routes);
app.use(errors())

connectDB();

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`Server successfully started on port ${port}`)
})

import Stripe from "stripe";
const StripeService = new Stripe("sk_test_51MzCVyDLsDEcxsJae7qc2Mwav0p806c0csjck4dkU5tmSscoYXGWU5FONe6dkQtZStOWOSYhTwnMTcSIZ7JkkYNg00wmmMw4vR", {
    apiVersion: "2022-11-15",
    typescript: true,
});
app.post("/create-payment-intent", async (req, res) => {
    try {
        const params = {
            payment_method_types: ["card"],
            line_items: req.body.cartItems.map((item) => {
                return {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: item.name,
                        },
                        unit_amount: Math.round(item.price * 100),
                    },
                    quantity: item.qty,
                };
            }),
            billing_address_collection: "required",
            shipping_address_collection: {
                allowed_countries: ["US", "CA"],
            },
            mode: "payment",
            success_url: `http://localhost:3000/paymentsuccess`,
            cancel_url: `http://localhost:3000/addPayment`,
            currency: "usd",
        };
        const session = await StripeService.checkout.sessions.create(params);
        res.status(200).json({
            url: session.url,

        });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});
