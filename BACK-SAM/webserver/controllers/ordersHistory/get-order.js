'use strict';

const mysqlPool = require('../../../database/mysql-pool');

async function getOrder(req, res, next) {
    const userId = req.claims.userId;

    try {
        const getOrdersQuery = `select 
        p.*
        from product p
        inner join enter_product_order eproo
        on p.id = eproo.id_product 
        inner join order_final orf
        on eproo.id_order = orf.id
        inner join user us
        on orf.user_id = us.id
        where us.id=${userId}`

        const connection = await mysqlPool.getConnection();
        const [orderData] = await connection.execute(getOrdersQuery);
        connection.release();

        return res.status(200).send(orderData);
    } catch (e) {
        console.error(e);
        res.status(500).send({
            message: e.message,
        });
    }
}

module.exports = getOrder;