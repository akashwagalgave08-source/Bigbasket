const { pool } = require("../config/db");


/* =====================================================
   GET ALL PRODUCTS
===================================================== */

async function getAllProducts() {

    const [rows] = await pool.execute(`

        SELECT

            p.id,

            p.category_id,

            p.name,

            p.description,

            p.image,

            p.price,

            p.original_price,

            p.unit,

            p.stock,

            p.rating,

            p.review_count,

            p.is_featured,

            c.name AS category

        FROM products p

        INNER JOIN categories c
            ON p.category_id = c.id

        WHERE p.status = 'active'

        AND c.status = 'active'

        ORDER BY p.id DESC

    `);

    return rows;
}


/* =====================================================
   GET PRODUCT BY ID
===================================================== */

async function getProductById(id) {

    const [rows] = await pool.execute(

        `SELECT

            p.id,

            p.category_id,

            p.name,

            p.description,

            p.image,

            p.price,

            p.original_price,

            p.unit,

            p.stock,

            p.rating,

            p.review_count,

            p.is_featured,

            c.name AS category

         FROM products p

         INNER JOIN categories c
            ON p.category_id = c.id

         WHERE p.id = ?

         AND p.status = 'active'

         LIMIT 1`,

        [id]

    );

    return rows[0];
}


/* =====================================================
   GET PRODUCTS BY CATEGORY
===================================================== */

async function getProductsByCategory(categoryId) {

    const [rows] = await pool.execute(

        `SELECT

            p.id,

            p.category_id,

            p.name,

            p.description,

            p.image,

            p.price,

            p.original_price,

            p.unit,

            p.stock,

            p.rating,

            p.review_count,

            p.is_featured,

            c.name AS category

         FROM products p

         INNER JOIN categories c
            ON p.category_id = c.id

         WHERE p.category_id = ?

         AND p.status = 'active'

         ORDER BY p.id DESC`,

        [categoryId]

    );

    return rows;
}


/* =====================================================
   GET ALL CATEGORIES
===================================================== */

async function getAllCategories() {

    const [rows] = await pool.execute(`

        SELECT

            id,

            name,

            description,

            image

        FROM categories

        WHERE status = 'active'

        ORDER BY name ASC

    `);

    return rows;
}


module.exports = {

    getAllProducts,

    getProductById,

    getProductsByCategory,

    getAllCategories

};