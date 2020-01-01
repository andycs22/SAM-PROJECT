'use strict';

const mysqlPool = require('../../../database/mysql-pool');

async function getOrder(req, res, next) {
    const userId = req.claims.userId;

    try {
        const getOrdersQuery = `select 
        p.id, 
        p.name, 
        p.category, 
        p.description, 
        p.init_price, p.discount, 
        p.final_price, 
        p.photo, 
        p.user_id
        from product p
        inner join enter_product_order eproo
        on p.id = eproo.id_product 
        inner join order_final of
        on eproo.id_order = of.id
        inner join user us
        on of.id = us.id
        where us.id=${userId}

        union all

        select 
        p.id, 
        p.name, 
        p.category, 
        p.description, 
        p.init_price, 
        p.discount, 
        p.final_price, 
        p.photo, 
        p.user_id
        from product p
        inner join product_include_package pip
        on p.id = pip.id_product 
        inner join package paq
        on pip.id_paq = paq.id
        inner join enter_package_order epaqo
        on paq.id = epaqo.id_paq
        inner join order_final of
        on epaqo.id_order = of.id
        inner join user us
        on of.id = us.id
        where us.id=${userId}`;

        const connection = await mysqlPool.getConnection();
        const [orderData] = await connection.execute(getOrdersQuery);
        connection.release();

        return res.status(200).send({
            data: orderData,
        });
    } catch (e) {
        console.error(e);
        res.status(500).send({
            message: e.message,
        });
    }
}

module.exports = getOrder;