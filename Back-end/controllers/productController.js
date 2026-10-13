const productModel =
    require("../models/productModel");


/* =====================================================
   GET ALL PRODUCTS
===================================================== */

async function getProducts(req, res) {

    try {

        const products =
            await productModel.getAllProducts();


        res.status(200).json({

            success: true,

            count: products.length,

            products

        });

    } catch (error) {

        console.error(
            "Get products error:",
            error
        );

        res.status(500).json({

            success: false,

            message: "Unable to load products"

        });

    }
}


/* =====================================================
   GET SINGLE PRODUCT
===================================================== */

async function getProduct(req, res) {

    try {

        const { id } = req.params;


        const product =
            await productModel.getProductById(id);


        if (!product) {

            return res.status(404).json({

                success: false,

                message: "Product not found"

            });

        }


        res.status(200).json({

            success: true,

            product

        });

    } catch (error) {

        console.error(
            "Get product error:",
            error
        );

        res.status(500).json({

            success: false,

            message: "Unable to load product"

        });

    }
}


/* =====================================================
   GET PRODUCTS BY CATEGORY
===================================================== */

async function getProductsByCategory(req, res) {

    try {

        const { categoryId } = req.params;


        const products =
            await productModel
                .getProductsByCategory(categoryId);


        res.status(200).json({

            success: true,

            count: products.length,

            products

        });

    } catch (error) {

        console.error(
            "Category products error:",
            error
        );

        res.status(500).json({

            success: false,

            message:
                "Unable to load category products"

        });

    }
}


/* =====================================================
   GET CATEGORIES
===================================================== */

async function getCategories(req, res) {

    try {

        const categories =
            await productModel
                .getAllCategories();


        res.status(200).json({

            success: true,

            count: categories.length,

            categories

        });

    } catch (error) {

        console.error(
            "Categories error:",
            error
        );

        res.status(500).json({

            success: false,

            message: "Unable to load categories"

        });

    }
}


module.exports = {

    getProducts,

    getProduct,

    getProductsByCategory,

    getCategories

};