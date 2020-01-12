'use strict';
// para que la contraseña no se pueda repetir, añade "unique" a password en la base de datos
const mysqlPool = require('../../../database/mysql-pool');
const Joi = require('@hapi/joi');

async function validateSchema(payload) {
	const schema = Joi.object({
		userId: Joi.string(),
		password: Joi.string()
	});
	Joi.assert(payload, schema);
}

async function editAccount(req, res, next) {
	const userId = req.params.userId;
	const userData = {
		...req.body,
		userId
	};

	try {
		await validateSchema(userData);
	} catch (e) {
		return res.status(400).send(e);
	}

	try {
		const oldPassword = `select password from user where id = ${userId}`;
		const confirmOldPassword = `insert into user (password) values ? is not null where id = ${userId}`;
		if (oldPassword === confirmOldPassword) {
			const securePassword = await bcrypt.hash(userData.password, 10);

			const connection = await mysqlPool.getConnection();
			const sqlEditAccount = `UPDATE user
			SET password = ? is not null
			WHERE id = ${userId}`;

			await connection.query(sqlEditAccount, {
				password: securePassword
			});
			connection.release();

			return res.status(204).send('New password successfully registered');
		}
	} catch (e) {
		console.error(e);
		return res.status(500).send({
			message: e.message
		});
	}
}

module.exports = editAccount;
