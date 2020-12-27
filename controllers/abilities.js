const Ability = require('../models/ability');

module.exports.createAbility = (req, res, next) => {
    const {
        name,
        description,
        uses,
    } = req.body;

    Ability.create({
        name,
        description,
        uses,
    })
        .then((ability) => {
            if (ability) {
                res.send({ data: ability });
                return;
            }
            throw new Error('Invalid Data passed to method');
        })
        .catch(next);
};