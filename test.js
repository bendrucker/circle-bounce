'use strict'

var test = require('tape')
var $ = require('vdom-query')
var partial = require('ap').partial
var Circles = require('./')

var circles = Circles({radius: 10})

test('initial render', function (t) {
  var elements = $(partial(circles, 0)).find('circle')

  t.equal(radius(elements.eq(0)), 0, 'mask radius = 0')
  t.equal(radius(elements.eq(1)), 10, 'outer radius = 10')

  t.end()
})

test('final render', function (t) {
  var elements = $(partial(circles, 1)).find('circle')

  t.equal(radius(elements.eq(0)), 0, 'mask radius = 0')
  t.equal(radius(elements.eq(1)), 10, 'outer radius = 10')

  t.end()
})

test('pre middle render', function (t) {
  var elements = $(partial(circles, 0.49)).find('circle')

  var inner = (radius(elements.eq(0))) / (0.95 * 5)
  var outer = radius(elements.eq(1)) / 5

  t.ok(inner > 0.9 && inner < 1, 'mask radius 10% smaller than final')
  t.ok(outer > 1 && outer < 1.1, 'outer radius 10% bigger than final')

  t.end()
})

test('post middle render', function (t) {
  var elements = $(partial(circles, 0.51)).find('circle')

  var inner = (radius(elements.eq(0))) / (0.95 * 5)
  var outer = radius(elements.eq(1)) / 5

  t.ok(inner > 0.9 && inner < 1, 'mask radius 10% smaller than final')
  t.ok(outer > 1 && outer < 1.1, 'outer radius 10% bigger than final')

  t.end()
})

function svgAttr (vquery, key) {
  return vquery.get(0).properties.attributes[key]
}

function radius (vquery) {
  return svgAttr(vquery, 'r')
}
