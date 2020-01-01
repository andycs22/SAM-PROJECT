'use strict';

const Joi = require('@hapi/joi')
    .extend(require('@hapi/joi-date'));
const mysqlPool = require('../../../database/mysql-pool');

async function validateSchema(payload) {
    const schemaPackage = Joi.object({
        date_begin: Joi.date().format('YYYY-MM-DD').utc(),
        date_end: Joi.date().format('YYYY-MM-DD').utc(),
        code_package: Joi.string(),
        userId: Joi.number(),
        role: Joi.string(),
    });
    const schemaInsert = Joi.object({
        id_product: Joi.number(),
        id_paq: Joi.number(),
        paq_price: Joi.number(),
        paq_disc: Joi.string(),
    });
    Joi.assert(payload, schemaPackage, schemaInsert);
}

async function createPackage(req, res, next) {
    const { userId, role } = req.claims;
    const packageData = req.body;

    if (role !== 'Organizer') {
        return res.status(401).send('sin permisos');
    }

    try {
        await validateSchema(packageData);
    } catch (e) {
        return res.status(400).send(e);
    }

    try {
        const sqlInsertion = 'INSERT INTO package SET ?';
        const connection = await mysqlPool.getConnection();
        const [result] = await connection.query(sqlInsertion, {
            date_begin: packageData.date_begin,
            date_end: packageData.date_end,
            code_package: packageData.code_package,
            user_id: userId,
            id_product: packageData.id_product,
            id_paq: packageData.id_paq,
            paq_price: packageData.paq_prize,
            paq_disc: packageData.paq_disc,
        });
        connection.release();
        res.status(201).send('New package successfully created');

    } catch (e) {
        console.error(e);
        return res.status(500).send(e.message);
    }
}

module.exports = createPackage;