'use strict';

const mysqlPool = require('../../../database/mysql-pool');

async function deletePackage(req, res, next) {
    const packageId = req.params.packageId;
    const userId = req.claims.userId;

    try {
        const sqlQuery = `DELETE FROM package WHERE id=${packageId} AND user_id=${userId}`;
        const connection = await mysqlPool.getConnection();
        const [packageData] = await connection.execute(sqlQuery);
        connection.release();
        return res.status(200).send('Package successfully deleted');
    } catch (e) {
        return res.status(500).send({
            message: e.message,
        });
    }
}

module.exports = deletePackage;