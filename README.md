# react-with-dimension
[![npm version](https://img.shields.io/npm/v/react-with-dimension.svg?style=flat-square)](https://www.npmjs.com/package/react-with-dimension)
[![dependency status](https://img.shields.io/david/team-767/react-with-dimension.svg?style=flat-square)](https://david-dm.org/team-767/react-with-dimension)
[![build status](https://img.shields.io/travis/team-767/react-with-dimension.svg?style=flat-square)](https://travis-ci.org/team-767/react-with-dimension)

Debounced React high order component to expose container width and height.

## Usage

Let's build an example react component:

```js
const Header = ({ style }) => (<h1 style={style}>Header</h1>)
```

And decorate:

```js
import WithDimension from 'react-with-dimension'

const Decorated = WithDimension()(Header)
```

Now when you use `<Decorated />` it will pass the numeric properties `containerWidth` and `containerHeight`.

You can change the property name by passing a function, example:

```js
const Decorated = WithDimension(
  { transform: (width, height) => ({ largeness: width, tallness: height }) }
)(Header)
```

The property passed to the `Header` would change to `largeness` and `tallness`

You can also change the wrapper div style to meet your needs like:

```js
const Decorated = WithDimension(
  { containerStyle: { display: 'inline-block' } }
)(Header)
```

## Contributing

First of all, **thank you** for wanting to help!

1. [Fork it](https://help.github.com/articles/fork-a-repo).
2. Create a feature branch - `git checkout -b more_magic`
3. Add tests and make your changes
4. Check if tests are ok - `npm test`
5. Commit changes - `git commit -am "Added more magic"`
6. Push to Github - `git push origin more_magic`
7. Send a [pull request](https://help.github.com/articles/using-pull-requests)! :heart: :sparkling_heart: :heart:
