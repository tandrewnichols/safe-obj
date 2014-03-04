should = require('should')
_ = require('underscore')

describe 'safe', ->
  Given -> _.mixin(require '../safe')
  describe '.safe', ->
    context 'the property exists', ->
      Given -> @obj =
        foo:
          bar:
            baz:
              bozo: 'hello world'
      When -> @result = _(@obj).safe('foo.bar.baz.bozo')
      Then -> @result.should.equal 'hello world'

    context 'the property doesn\'t exist', ->
      Given -> @obj = {}
      When -> @result = _(@obj).safe('foo.bar.baz.bozo')
      Then -> should(@result).equal(undefined)

    context 'with array indices', ->
      Given -> @obj =
        foo:
          bar:
            list: [
                foo: 'baby'
                fart: 'bag'
              ,
                foo: 'not baby'
                fart: 'jar'
            ]
      When -> @result = _(@obj).safe('foo.bar.list.0.foo')
      Then -> @result.should.equal 'baby'

    context 'with a default', ->
      Given -> @obj =
        foo:
          bar: {}
      When -> @result = _(@obj).safe('foo.bar.baz', [])
      Then -> @result.should.eql []

  describe '.expand', ->
    context 'with an empty object', ->
      Given -> @obj = {}
      When -> _(@obj).expand('nested.path', 'value')
      Then -> @obj.should.eql
        nested:
          path: 'value'

    context 'with a non empty object', ->
      Given -> @obj =
        nested:
          path: 'value'
      When -> _(@obj).expand('nested.path', [1,2])
      Then -> @obj.should.eql
        nested:
          path: [1,2]

    context 'with array indices', ->
      Given -> @obj =
        nested:
          path: []
      When -> _(@obj).expand('nested.path.0', {foo: 'bar'})
      Then -> @obj.should.eql
        nested:
          path: [
            foo: 'bar'
          ]
