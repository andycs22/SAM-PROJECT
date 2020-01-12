'use strict';
const uuidV4 = require('uuid/v4');
const uniqid = require('uniqid');
const mysqlPool = require('../../../database/mysql-pool');

async function createPackage(req, res, next) {
  const { userId, role } = req.claims;
  console.log(userId);
  const order = req.body;
  const orderPack = JSON.parse(order.order);
  console.log(orderPack[0]);

  const now = new Date();
  const createdAt = now.toISOString().substring(0, 19).replace('T', ' ');
  console.log(createdAt);
  const id = uuidV4();
  console.log(id);
  const code_package = uniqid();
  console.log(code_package);

  if (role !== 'organizer') {
    return res.status(401).send('sin permisos');
  }

  try {
    const connection = await mysqlPool.getConnection();

    const sqlPack = `INSERT INTO package SET ?`;
    await connection.query(sqlPack, {
      id,
      date_begin: createdAt,
      date_end: order.date_end,
      code_package,
      user_id: userId,
    })

    for (let order in orderPack) {
      const sqlProduct = 'INSERT INTO product_include_package SET ?';
      await connection.query(sqlProduct, {
        id_product: orderPack[order].productId,
        id_paq: id,
        paq_price: orderPack[order].newPrice,
        paq_disc: orderPack[order].discount,
      })
    }


    connection.release();

    res.status(201).send(code_package);

  } catch (e) {
    console.error(e);
    return res.status(500).send(e.message);
  }
}

module.exports = createPackage;