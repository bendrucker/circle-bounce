'use strict'

var svg = require('virtual-dom/virtual-hyperscript/svg')

module.exports = function Mask (vtree) {
  var id = 'circle-bounce-mask'

  return {
    id: id,
    vtree: svg('mask', {id: id}, [
      svg('rect', {
        width: '100%',
        height: '100%',
        fill: 'white'
      }),
      vtree
    ])
  }
}
