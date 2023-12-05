const Boom = require('@hapi/boom');

function validatorHandler(schema, property) {
  return (req, res, next) => {
    // Busca la data dependiendo del tipo de petición
    const data = req[property];
    // Valida si los datos cumplen con el schema
    const { error } = schema.validate(data, { abortEarly: false });
    // Si encuentra un error
    if (error) {
      next(Boom.badRequest(error));
    }
    next();
  };
}

module.exports = validatorHandler;
