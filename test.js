'use strict'

var test = require('tape')
var $ = require('vdom-query')
var partial = require('ap').partial
var Circles = require('./')

test('initial render', function (t) {
  var circles = Circles({radius: 10})

  var elements = $(partial(circles, 0)).find('circle')

  t.equal(svgAttr(elements.eq(0), 'r'), 0, 'mask radius = 0')
  t.equal(svgAttr(elements.eq(1), 'r'), 10, 'outer radius = 10')

  t.end()
})

function svgAttr (vquery, key) {
  return vquery.get(0).properties.attributes[key]
}
