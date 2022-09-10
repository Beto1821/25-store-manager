const productSchema = require('./productSchema');

const productValidation = (req, res, next) => {
  const { error } = productSchema.validate(req.body);

  if (error) { 
    console.log(error);
    const [code, message] = error.message.split('|');
    return res.status(Number(code)).json({ message });
  }
  next();
};

module.exports = productValidation;