const db = require('../models')
const Cart = db.Cart
const LineItem = db.LineItem
const Product = db.Product
const Images = db.Images
const PAGE_LIMIT = 10;
const PAGE_OFFSET = 0;

let cartController = {
    getCart: (req, res) => {
        console.log('req.session: ', req.session)
        return Cart.findByPk(req.session.cartId, {
            include: [{
                model: Product,
                as: 'items',
                include: [
                    {
                        model: Images,
                        attributes: ['url'],
                    }
                ]
            }]
        }).then(cart => {
            cart = cart || { items: [] }
            if (cart === null) {
                console.log('Not found!');
            } else {
                console.log('cart: ', cart);
            }

            let totalPrice = cart.items.length > 0 ? cart.items.map(d => d.price * d.LineItem.quantity).reduce((a, b) => a + b) : 0
            return res.render('cart', {
                cart,
                totalPrice,
            })
        })
    },
    postCart: async (req, res) => {
        try {
            //req.session = req.body.productId
            console.log('req.session: ', req.session)
            console.log('=================================')
            console.log('req.body: ', req.body)
            console.log('=================================')


            return await Cart.findOrCreate({
                where: {
                    id: req.session.cartId,
                },
                defaults: {
                    id: 0
                }
            }).then(cart => {
                //console.log(cart)
                return LineItem.findOrCreate({
                    where: {
                        CartId: cart.id,
                        ProductId: req.body.productId
                    },
                    default: {
                        CartId: cart.id,
                        ProductId: req.body.productId,
                    }
                }).then(lineItem => {
                    return lineItem.update({
                        quantity: (lineItem.quantity || 0) + 1,
                    })
                        .then(lineItem => {
                            req.session.cartId = cart.id
                            return req.session.save(() => {
                                return res.redirect('back')
                            })
                        })

                })
            });
        }
        catch (err) {
            console.log(`ERROR! => ${err.name}: ${err.message}`)
            res.status(500).send(err.message)
        }
    }
}

module.exports = cartController