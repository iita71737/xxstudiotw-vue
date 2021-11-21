const db = require('../models')
const Cart = db.Cart
const LineItem = db.LineItem
const Product = db.Product
const Images = db.Images
const PAGE_LIMIT = 10;
const PAGE_OFFSET = 0;

let cartController = {
    getCart: async (req, res) => {
        console.log('=================================')
        console.log('req.session: ', req.session)
        console.log('=================================')

        return await Cart.findByPk(req.session.cartId, {
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
                cart = cart.toJSON()
                console.log('cart: ', cart);
            }
            let totalPrice = cart.items.length > 0 ? cart.items.map(d => d.price * d.LineItem.quantity).reduce((a, b) => a + b) : 0

            console.log('cart2: ', cart);
            return res.render('cart', {
                cart,
                totalPrice,
            })
        })
    },
    postCart: async (req, res) => {
        try {
            // console.log('=================================')
            // console.log('req.session: ', req.session)
            // console.log('=================================')

            const [cart, created] = await Cart.findOrCreate({
                where: {
                    id: req.session.cartId || 0
                }
            })
            if (cart) {
                // console.log('=================================')
                // console.log('cart', cart.toJSON())
                // console.log('=================================')
                const [lineItem, created] = await LineItem.findOrCreate({
                    where: {
                        CartId: cart.id,
                        ProductId: req.body.productId,
                    },
                    default: {
                        CartId: cart.id,
                        ProductId: req.body.productId,
                        quantity: 1
                    }
                })
                if (lineItem) {
                    // console.log('=================================')
                    // console.log('lineItem', lineItem.toJSON())
                    // console.log('=================================')
                    await lineItem.update(
                        {
                            quantity: (lineItem.quantity || 0) + 1,
                        }
                    ).then(lineItem => {
                        req.session.cartId = cart.id
                        req.session.save(() => {
                            res.redirect('back')
                        })
                    })
                }
            }
        }
        catch (err) {
            console.log(`ERROR! => ${err.name}: ${err.message}`)
            res.status(500).send(err.message)
        }
    }
}

module.exports = cartController