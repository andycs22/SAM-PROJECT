'use strict';

const mysqlPool = require("../../../database/mysql-pool");

async function showProduct(req, res, next) {
  const productId = req.params.productId;

  try {
    const connection = await mysqlPool.getConnection();
    const sqlIsRate = `SELECT * FROM rate WHERE id_product=${productId}`
    const [isRate] = await connection.query(sqlIsRate);
    const sqlRate = `select product.*, rate.* FROM product, rate where product.id=rate.id_product and product.id=${productId}`;
    const sqlProduct = `SELECT * FROM product WHERE id=${productId}`;
    if (isRate.length === 0) {
      const [productData] = await connection.query(sqlProduct);
      console.log(productData);

      res.status(200).send(productData);
      connection.release();

    } else {
      const [productData] = await connection.query(sqlRate);
      console.log(productData);

      res.status(200).send(productData);
      connection.release();

    }


  } catch (e) {
    return res.status(500).send({
      message: e.message,
    });
  }
}

module.exports = showProduct;
