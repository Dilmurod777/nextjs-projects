import Stripe from 'stripe';
import {NextApiRequest, NextApiResponse} from 'next';
import {CartItemModel} from "../../models/cart_item";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY || '', {
    apiVersion: '2022-11-15',
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === 'POST') {
            try {
                const params = {
                    mode: 'payment',
                    submit_type: 'pay',
                    payment_method_types: ['card'],
                    billing_address_collection: 'auto',
                    shipping_options: [
                        {shipping_rate: 'shr_1MQ1sVKayjIxuta2JvJRHYVn'},
                        {shipping_rate: 'shr_1MQ1t3KayjIxuta2mUnsK8An'}
                    ],
                    success_url: `${req.headers.origin}/success`,
                    cancel_url: `${req.headers.origin}/canceled`,
                    line_items: req.body.cartItems.map((item: CartItemModel) => {
                        const image = item.image[0].asset._ref;
                        const newImage = image
                            .replace('image-', 'https://cdn.sanity.io/images/herlvqx4/production/')
                            .replace('-webp', '.webp');

                        return {
                            price_data: {
                                currency: 'usd',
                                product_data: {
                                    name: item.name,
                                    images: [newImage]
                                },
                                unit_amount: item.price * 100
                            },
                            adjustable_quantity: {
                                enabled: true,
                                minimum: 1
                            },
                            quantity: item.quantity
                        }
                    })
                } as Stripe.Checkout.SessionCreateParams;

                const session = await stripe.checkout.sessions.create(params);
                res.status(200).json(session);
            } catch (err: any) {
                res.status(err.statusCode || 500).json(err.message);
            }
        } else {
            res.setHeader('Allow', 'POST');
            res.status(405).end('Method Not Allowed');
        }
    } catch (error: any) {
        res.status(500).json({message: error.message})
    }
}

