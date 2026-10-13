const express = require("express");

const router = express.Router();


const {

    getProducts,

    getProduct,

    getProductsByCategory,

    getCategories

} = require("../controllers/productController");


/* =====================================================
   GET CATEGORIES

   GET /api/products/categories
===================================================== */

router.get(
    "/categories",
    getCategories
);


/* =====================================================
   GET PRODUCTS BY CATEGORY

   GET /api/products/category/1
===================================================== */

router.get(
    "/category/:categoryId",
    getProductsByCategory
);


/* =====================================================
   GET ALL PRODUCTS

   GET /api/products
===================================================== */

router.get(
    "/",
    getProducts
);


/* =====================================================
   GET SINGLE PRODUCT

   GET /api/products/1
===================================================== */

router.get(
    "/:id",
    getProduct
);


module.exports = router;