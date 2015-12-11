'use strict'

var svg = require('virtual-dom/virtual-hyperscript/svg')

module.exports = Circle

function Circle (data) {
  return svg('circle', {
    id: data.id,
    r: data.radius,
    cx: data.center,
    cy: data.center,
    mask: data.mask ? 'url(#' + data.mask + ')' : undefined,
    fill: data.fill
  })
}
