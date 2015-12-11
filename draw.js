'use strict'

var Circle = require('./')
var vdom = require('virtual-dom')
var Loop = require('raf-loop')

var time = 0
var circle = Circle({radius: 10, fill: 'white'})

var vtree = render()
var element = vdom.create(vtree)

document.body.appendChild(element)

var loop = Loop(function (delta) {
  time += delta / 1000
  if (time > 1) time--

  var newTree = render()
  element = vdom.patch(element, vdom.diff(vtree, newTree))
  vtree = newTree
})

loop.start()

function render () {
  var button = {
    display: 'inline-block',
    background: '#587EE1',
    borderRadius: '3px',
    padding: '5px'
  }

  return vdom.h('div', {style: button}, [
    circle(time)
  ])
}
