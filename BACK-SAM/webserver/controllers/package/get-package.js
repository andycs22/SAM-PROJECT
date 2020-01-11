'use strict';

const mysqlPool = require('../../../database/mysql-pool');

async function getPackage(req, res, next) {
	const codePackage = req.claims.userId;
	//const codePackage = req.params.codePackage;

	try {
		const getPackageQuery = `select * from package p
        inner join product_include_package  pip
        on  p.id=pip.id_paq
        where code_package=${codePackage}`;

		const connection = await mysqlPool.getConnection();
		const [ packageData ] = await connection.execute(getPackageQuery);
		connection.release();

		return res.status(200).send({
			data: packageData
		});
	} catch (e) {
		console.error(e);
		res.status(500).send({
			message: e.message
		});
	}
}

module.exports = getPackage;
