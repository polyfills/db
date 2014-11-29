
# polyfills db

[![NPM version][npm-image]][npm-url]
[![Build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![Dependency Status][david-image]][david-url]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]
[![Gittip][gittip-image]][gittip-url]


A database for various polyfills that includes:

- Which browsers support a feature
- Associated modules or files for each feature

Types of polyfills:

- polyfills - runtime JS polyfills for [polyfills](http://github.com/polyfills/polyfills)
- recast - JS transpilation using [recast](https://github.com/benjamn/recast) and [ecstacy](https://github.com/polyfills/ecstacy)
- postcss - CSS transpilation using [postcss](https://github.com/postcss/postcss) and [ecstacy](https://github.com/polyfills/ecstacy)

## Testing on Browsers

Of course, we want to actually test each bundle on a browser.
Right now, tests are in [paas](https://github.com/polyfills/paas),
so everytime you add a polyfill, checkout [paas](https://github.com/polyfills/paas)
and see if hitting `GET /test.html` works in all your browsers.
CI testing is coming!

## Help Maintaining

Most updates are currently done manually.
Please help add polyfills and update the relevant versions.
Some helpful resources are:

- [HTML5 Cross Browser Polyfills](https://github.com/Modernizr/Modernizr/wiki/HTML5-Cross-browser-Polyfills)
- [caniuse](http://caniuse.com)
- [MDN](https://developer.mozilla.org/en-US/)
- [ES Compatibility Table](http://kangax.github.io/compat-table/es6/)
- [esnext](https://github.com/esnext/esnext) and its [organization](https://github.com/esnext)
- [cssnext](https://github.com/cssnext/cssnext) and the [postcss organization](https://github.com/postcss)

## Notes

`regenerator` includes `es7-async-fn`. If you use `regenerator`,
be sure to not use `es7-async-fn`, or at least the runtime.

[npm-image]: https://img.shields.io/npm/v/polyfills-db.svg?style=flat-square
[npm-url]: https://npmjs.org/package/polyfills-db
[github-tag]: http://img.shields.io/github/tag/polyfills/db.svg?style=flat-square
[github-url]: https://github.com/polyfills/db/tags
[travis-image]: https://img.shields.io/travis/polyfills/db.svg?style=flat-square
[travis-url]: https://travis-ci.org/polyfills/db
[coveralls-image]: https://img.shields.io/coveralls/polyfills/db.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/polyfills/db?branch=master
[david-image]: http://img.shields.io/david/polyfills/db.svg?style=flat-square
[david-url]: https://david-dm.org/polyfills/db
[license-image]: http://img.shields.io/npm/l/polyfills-db.svg?style=flat-square
[license-url]: LICENSE
[downloads-image]: http://img.shields.io/npm/dm/polyfills-db.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/polyfills-db
[gittip-image]: https://img.shields.io/gittip/jonathanong.svg?style=flat-square
[gittip-url]: https://www.gittip.com/jonathanong/
