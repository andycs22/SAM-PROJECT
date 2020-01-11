'use strict';

const mysqlPool = require('../../../database/mysql-pool');

async function deletePackage(req, res, next) {
	const userId = req.claims.userId;
	const packageId = req.params.packageId;
	const role = req.claims.role;
	const checkUser = `select user_id from package`;

	if (role !== 'Organizer') {
		return res.status(401).send('sin permisos');
	}

	if (userId === checkUser) {
		try {
			const deleteQuery = `delete p.*, pip.* 
            from package p
            inner join product_include_package  pip
            on  p.id=pip.id_paq
            where p.id=pip.id_paq and p.id=${packageId}`;
			const connection = await mysqlPool.getConnection();
			await connection.execute(deleteQuery);
			connection.release();
			return res.status(200).send('Package successfully deleted');
		} catch (e) {
			return res.status(500).send({
				message: e.message
			});
		}
	}
}

module.exports = deletePackage;
