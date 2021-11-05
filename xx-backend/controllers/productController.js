const db = require('../models')
const Product = db.Product;
const Images = db.Images;
const PAGE_LIMIT = 3;
const PAGE_OFFSET = 0;

let productController = {
    getProducts: (req, res) => {
        Product.findAndCountAll({
            raw: true,
            nest: true,
            offset: PAGE_OFFSET,
            limit: PAGE_LIMIT,
            include: [
                {
                    model: Images,
                    attributes: ['url']
                }
            ]
        }).then(products => {
            //console.log(products.rows)

            return res.render('products', {
                products,
            })
            // return res.json(products)
        })
    },
}

module.exports = productController