'use strict';

const Joi = require('@hapi/joi')
    .extend(require('@hapi/joi-date'));
const mysqlPool = require('../../../database/mysql-pool');

async function validateSchema(payload) {
    const schema = Joi.object({
        date_begin: Joi.date().format('YYYY-MM-DD').utc(),
        date_end: Joi.date().format('YYYY-MM-DD').utc(),
        code_package: Joi.string(),
        userId: Joi.number(),
    });
    Joi.assert(payload, schema);
}

async function createPackage(req, res, next) {
    const { userId } = req.claims;

    const packageData = {
        ...req.body,
        userId,
    };

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
            user_id: packageData.userId,
        });
        connection.release();
        res.status(201).send('New package successfully created');

    } catch (e) {
        console.error(e);
        return res.status(500).send(e.message);
    }
}

module.exports = createPackage;