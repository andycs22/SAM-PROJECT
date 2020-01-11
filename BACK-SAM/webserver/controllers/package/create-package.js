'use strict';

const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));
const mysqlPool = require('../../../database/mysql-pool');

async function validateSchema(payload) {
	const schema = Joi.object({
		date_begin: Joi.date().format('YYYY-MM-DD').utc(),
		date_end: Joi.date().format('YYYY-MM-DD').utc(),
		code_package: Joi.string(),
		userId: Joi.number(),
		id_product: Joi.number(),
		id_paq: Joi.number(),
		paq_price: Joi.number(),
		paq_disc: Joi.string(),
		role: Joi.string()
	});
	Joi.assert(payload, schema);
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
		const code_package = ParseInt(Math.random() * 1000000);
		const sqlInsertion = `start transaction;
        insert into package 
        (date_begin, date_end, code_package, user_id)
        values 
        (?, ?,?, ?)
        where user_id = ${userId};
        insert into product_include_package 
        (id_product, id_paq, paq_price, paq_disc)
        values 
        (?, last_insert_id(), ?, ?);
        commit`;
		const connection = await mysqlPool.getConnection();
		const [ result ] = await connection.query(sqlInsertion, {
			//igual en vez de .query es .transaction --- mirar documentación
			date_begin: packageData.date_begin,
			date_end: packageData.date_end,
			code_package: code_package,
			user_id: userId,
			id_product: packageData.id_product,
			id_paq: packageData.id_paq,
			paq_price: packageData.paq_price,
			paq_disc: packageData.paq_disc
		});
		connection.release();
		res.status(201).send('New package successfully created');
	} catch (e) {
		console.error(e);
		return res.status(500).send(e.message);
	}
}

module.exports = createPackage;
