'use strict';

const mysqlPool = require('../../../database/mysql-pool');

async function getPackage(req, res, next) {
    const userId = req.claims.userId;

    try {
        const getPackageQuery = `select 
        *
        from package
        where user_id=${userId}`;

        const connection = await mysqlPool.getConnection();
        const [packageData] = await connection.execute(getPackageQuery);
        connection.release();

        return res.send({
            data: packageData,
        });
    } catch (e) {
        console.error(e);
        res.status(500).send({
            message: e.message,
        });
    }
}

module.exports = getPackage;