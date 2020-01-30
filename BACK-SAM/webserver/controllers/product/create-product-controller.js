'use strict';

const cloudinary = require('cloudinary');
const Joi = require('@hapi/joi');
const mysqlPool = require('../../../database/mysql-pool');

cloudinary.config({
  cloud_name: process.env.CLOUDINARI_CLOUD_NAME,
  api_key: process.env.CLOUDINARI_API_KEY,
  api_secret: process.env.CLOUDINARI_API_SECRET,
});

async function validateSchema(payload) {
  const schema = Joi.object({
    name: Joi.string(),
    description: Joi.string(),
    init_price: Joi.number(),
    discount: Joi.number(),
    final_price: Joi.number(),
    category: Joi.string(),
    userId: Joi.number(),
    role: Joi.string(),
  });
  Joi.assert(payload, schema);
}

async function createProduct(req, res, next) {
  const { userId, role } = req.claims;
  const productData = req.body;
  console.log(productData);
  const { file } = req;
  console.log(file);

  // const productData = { ...req.body, userId, role };
  // const productData = JSON.parse(req.body.datos);

  if (role !== 'colaborator') {
    return res.status(401).send('sin permisos');
  }

  try {
    await validateSchema(productData);
  } catch (e) {
    return res.status(400).send(e);
  }

  if (!file || !file.buffer) {
    return res.status(400).send({
      message: 'upload an image',
    });
  }

  cloudinary.v2.uploader.upload_stream({
    resource_type: 'image',
    public_id: userId,
    width: 600,
    height: 600,
    format: 'jpg',
    crop: 'limit',
  }, async (err, result) => {
    if (err) {
      console.error(err);
      return res.status(400).send(err);
    }

    const {
      secure_url: secureUrl,
    } = result;

    try {

      const connection = await mysqlPool.getConnection();
      const sqlInsercion = 'INSERT INTO product SET ?';

      await connection.query(sqlInsercion, {
        name: productData.name,
        description: productData.description,
        init_price: productData.init_price,
        discount: productData.discount,
        final_price: productData.final_price,
        category: productData.category,
        user_id: userId,
        photo: secureUrl,
      });

      connection.release();

      res.status(201).send('product created');

    } catch (e) {
      console.error(e);
      return res.status(500).send(e.message);
    }
  }).end(file.buffer);
}


module.exports = createProduct;
