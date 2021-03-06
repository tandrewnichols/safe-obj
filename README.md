[![Build Status](https://travis-ci.org/tandrewnichols/safe-obj.png)](https://travis-ci.org/tandrewnichols/safe-obj)

# Safe-obj

Underscore helpers to make object accessors safe

## Install

`npm install safe-obj --save`

## Usage

I came (partly) from a Perl background where you could say `$obj->{thing}->{another_thing}->{more_things}`, and it would not blow up even if $obj was totally empty. Similarly, you could say `$obj->{thing}->{foo} = 'bar'`, even if $obj had no property called 'thing'. I don't miss everything about Perl, but I do miss that. In javascript, you'd have to say:

```javascript
if (obj && obj.thing && obj.thing.another_thing && obj.thing.another_thing.more_things) {
  // I want to die a little bit
}
```

`safe-obj` exports an object that can be mixed into underscore like this:

```javascript
_.mixin(require('safe-obj'));
```

that let's you access object properties with wild abandon. It has two functions, which are essentially opposites of one another.

### Safe

Let's you access object properties (and array indices too!) regardless of whether they exist. If, at any point, a property returns `undefined` (where calling another object accessor would blow up), `safe` immediately just returns `undefined` (or a default, if you provide one).

```javascript
var obj = {}

// returns undefined
var innerProp = _(obj).safe('foo.bar.baz.0.hello.world'); 

// returns [] - useful if you want to call array methods but don't want to check the type
var anotherProp = _(obj).safe('a.brave.new.world', []); 
```

### Expand

Let's you assign to any arbitrarily deep and non-existent property on an object. Any non-existent properties are expanded into objects.

```javascript
var obj = {}

_(obj).expand('foo.bar.baz', 'hello world');

// obj now equals: {
//   foo: {
//     bar: {
//       baz: 'hello world'
//     }
//   }
// }
```

Expand is likely to be finnicky (at the moment) with expanding arrays. It's untested, and my guess is that it will create object properties with numbers. Something like

```javascript
property: {
  0: {
    // more stuff
  }
}
```

I'd like to make that work more as expected in a future release, but for now, don't expect it to work.
