var arrowMapper = require('./arrowMapper').map

module.exports = {
    mapEndWithArrows: (end) => {
        return {
            Id: end.idEnd,
            Arrows: end.Arrows.map(arrowMapper)
        }
    }
}