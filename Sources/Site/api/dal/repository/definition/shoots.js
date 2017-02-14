'use strict'
module.exports = (props) => {
    const mapShoots = require('../../mappers/shootMapper').map
    const mapShoot = require('../../mappers/shootMapper').mapWithArrows

    return {
        get: (id_User, callback) => {
            props.store.models.Shoot.findAll({
                where: {
                    FK_User: id_User
                },
                order: '`Shoot`.`Date_Shoot` DESC',
                include: [props.store.models.End, props.store.models.Type, props.store.models.Location]

            }).then((shoots) => {
                callback(null, shoots.map(mapShoots))
            }).catch((err) => {
                callback(err, null)
            })
        },
        getById: (id_User, id_Shoot = null, callback) => {
            props.store.models.Shoot.find({
                where: {
                    id_Shoot: id_Shoot
                },
                include: [{
                    model: props.store.models.End,
                    include: [{
                        model: props.store.models.Arrow
                    }]
                }, props.store.models.Type, props.store.models.Location]
            }).then((shoot) => {
                calculateSummarySpecifications(shoot, () => {
                    callback(null, mapShoot(shoot))
                })
            }).catch((err) => {
                callback(err, null)
            })
            return false
        },
        add: (params) => {
            return false
        }
    }
}

var calculateSummarySpecifications = (shoot, callback) => {
    var total = 0
    var goldHit = 0
    var nbNine = 0
    var nbTen = 0
    shoot.Ends.forEach((end, index, array) => {
        end.Arrows.forEach((arrow, index, array) => {
            total += arrow.Point
            switch (arrow.Point) {
                case 9:
                    goldHit += 1
                    nbNine += 1
                case 10:
                    goldHit += 1
                    nbTen += 1
            }
        })
        if (index == array.length - 1) {
            shoot.averageArrow = total / (shoot.totalEnds * shoot.arrowsbyend),
                shoot.total = total,
                shoot.goldHit = goldHit / (shoot.totalEnds * shoot.arrowsbyend)
            shoot.Tens = nbTen
            shoot.Nines = nbNine
        }
    })
    callback()
}