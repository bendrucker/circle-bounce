'use strict'

var svg = require('virtual-dom/virtual-hyperscript/svg')
var bezier = require('bezier-easing')
var Size = require('create-svg-size')
var Circle = require('./circle')
var Mask = require('./mask')

module.exports = function CircleBounce (data) {
  return function render (time) {
    var mask = Mask(renderInner(data.radius,  time))
    var outer = renderOuter(data.radius, time, data.fill, mask.id)

    var options = Size({x: data.radius * 2, y: data.radius * 2})

    return svg('svg', options, [
      mask.vtree,
      outer
    ])
  }
}

function renderInner (radius, time) {
  var coefficient = 0.95 * curve(time < 0.5 ? time : 1 - time)

  return Circle({
    radius: radius * coefficient,
    center: radius
  })
}

function renderOuter (radius, time, fill, mask) {
  var coefficent = curve(time < 0.5 ? 1 - time : time)

  return Circle({
    id: 'circle-bounce-circle',
    radius: radius * coefficent,
    center: radius,
    fill: fill,
    mask: mask
  })
}

function curve (value) {
  return bezier(.10, 0.45, .9, .45).get(value)
}
