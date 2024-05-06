const { check, validationResult } = require("express-validator");

//pack rules
exports.packRules = () => [
  check("nom", "nom is required").notEmpty(),
  check("pack_image", "image is required").notEmpty(),
  check("dateDebut", "Startingdate is required and should be a valid date ").notEmpty().isDate(),
  check("dateFin", "Endingdate  is required and should be a valid date").notEmpty().isDate(),
];


exports.Validation = (req, res, next) => {
  const errors = validationResult(req);
  console.log(errors);
    if (!errors.isEmpty()) {
        return res.status(400).send({
            errors: errors.array().map((el) => ({
                msg: el.msg,
            })),
        });
    }
    next();
};