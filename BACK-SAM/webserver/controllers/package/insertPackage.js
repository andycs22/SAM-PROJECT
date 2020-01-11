/*
'use strict';
//cuidado, no es propiamente controller. revisar posible ubicación
async function insertPackage(data) {
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
		code_package: packageData.code_package,
		user_id: userId,
		id_product: packageData.id_product,
		id_paq: packageData.id_paq,
		paq_price: packageData.paq_price,
		paq_disc: packageData.paq_disc
	});
	connection.release();
}

module.exports = insertPackage;
*/
