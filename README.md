<!--

@license Apache-2.0

Copyright (c) 2018 The Stdlib Authors.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

-->

# Chi-square goodness-of-fit test

[![NPM version][npm-image]][npm-url] [![Build Status][test-image]][test-url] [![Coverage Status][coverage-image]][coverage-url] <!-- [![dependencies][dependencies-image]][dependencies-url] -->

> Perform a chi-square goodness-of-fit test.



<section class="usage">

## Usage

```javascript
import chi2gof from 'https://cdn.jsdelivr.net/gh/stdlib-js/stats-chi2gof@esm/index.mjs';
```

#### chi2gof( x, y\[, ...args]\[, opts] )

Computes a chi-square goodness-of-fit test for the **null hypothesis** that the values of `x` come from the discrete probability distribution specified by `y`.

```javascript
// Observed counts:
var x = [ 30, 20, 23, 27 ];

// Expected counts:
var y = [ 25, 25, 25, 25 ];

var res = chi2gof( x, y );
var o = res.toJSON();
/* returns
    {
        'rejected': false,
        'alpha': 0.05,
        'pValue': ~0.5087,
        'df': 3,
        'statistic': ~2.32,
        ...
    }
*/
```

The second argument can either be an array-like object (or 1-dimensional [`ndarray`][@stdlib/ndarray/array]) of expected frequencies, an array-like object (or 1-dimensional [`ndarray`][@stdlib/ndarray/array]) of population probabilities summing to one, or a discrete probability distribution name to test against.

```javascript
// Observed counts:
var x = [ 89, 37, 30, 28, 2 ];

// Expected probabilities:
var y = [ 0.40, 0.20, 0.20, 0.15, 0.05 ];

var res = chi2gof( x, y );
var o = res.toJSON();
/* returns
    {
        'rejected': true,
        'alpha': 0.05,
        'pValue': ~0.0187,
        'df': 3,
        'statistic': ~9.9901,
        ...
    }
*/
```

When specifying a discrete probability distribution name, distribution parameters **must** be provided as additional arguments.

```javascript
import Int32Array from 'https://cdn.jsdelivr.net/gh/stdlib-js/array-int32@esm/index.mjs';
import discreteUniform from 'https://cdn.jsdelivr.net/gh/stdlib-js/random-base-discrete-uniform@esm/index.mjs';

var res;
var x;
var v;
var i;

// Simulate expected counts...
x = new Int32Array( 100 );
for ( i = 0; i < x.length; i++ ) {
    v = discreteUniform( 0, 99 );
    x[ v ] += 1;
}

res = chi2gof( x, 'discrete-uniform', 0, 99 );
// returns {...}
```

The function accepts the following `options`:

-   **alpha**: significance level of the hypothesis test. Must be on the interval `[0,1]`. Default: `0.05`.
-   **ddof**: "delta degrees of freedom" adjustment. Must be a nonnegative integer. Default: `0`.
-   **simulate**: `boolean` indicating whether to calculate p-values by Monte Carlo simulation. Default: `false`.
-   **iterations**: number of Monte Carlo iterations. Default: `500`.

By default, the test is performed at a significance level of `0.05`. To adjust the significance level, set the `alpha` option.

```javascript
var x = [ 89, 37, 30, 28, 2 ];
var p = [ 0.40, 0.20, 0.20, 0.15, 0.05 ];

var res = chi2gof( x, p );

var table = res.toString();
/* e.g., returns

    Chi-square goodness-of-fit test

    Null hypothesis: population probabilities are equal to those in p

        pValue: 0.0186
        statistic: 9.9901
        degrees of freedom: 3

    Test Decision: Reject null in favor of alternative at 5% significance level

*/

res = chi2gof( x, p, {
    'alpha': 0.01
});

table = res.toString();
/* e.g., returns

    Chi-square goodness-of-fit test

    Null hypothesis: population probabilities are equal to those in p

        pValue: 0.0186
        statistic: 9.9901
        degrees of freedom: 3

    Test Decision: Fail to reject null in favor of alternative at 1% significance level

*/
```

By default, the p-value is computed using a chi-square distribution with `k-1` degrees of freedom, where `k` is the length of `x`. If provided distribution arguments are estimated (e.g., via maximum likelihood estimation), the degrees of freedom **should** be corrected. Set the `ddof` option to use `k-1-n` degrees of freedom, where `n` is the degrees of freedom adjustment.

```javascript
var x = [ 89, 37, 30, 28, 2 ];
var p = [ 0.40, 0.20, 0.20, 0.15, 0.05 ];

var res = chi2gof( x, p, {
    'ddof': 1
});

var o = res.toJSON();
// returns { 'pValue': ~0.0186, 'statistic': ~9.9901, 'df': 3, ... }
```

Instead of relying on chi-square approximation to calculate the p-value, one can use Monte Carlo simulation. When the `simulate` option is `true`, the simulation is performed by re-sampling from the discrete probability distribution specified by `y`.

```javascript
var x = [ 89, 37, 30, 28, 2 ];
var p = [ 0.40, 0.20, 0.20, 0.15, 0.05 ];

var res = chi2gof( x, p, {
    'simulate': true,
    'iterations': 1000 // explicitly set the number of Monte Carlo simulations
});
// returns {...}
```

The function returns a results `object` having the following properties:

-   **alpha**: significance level.
-   **rejected**: `boolean` indicating the test decision.
-   **pValue**: test p-value.
-   **statistic**: test statistic.
-   **df**: degrees of freedom.
-   **method**: test name.
-   **toString**: serializes results as formatted test output.
-   **toJSON**: serializes results as a JSON object.

To print formatted test output, invoke the `toString` method. The method accepts the following options:

-   **digits**: number of displayed decimal digits. Default: `4`.
-   **decision**: `boolean` indicating whether to show the test decision. Default: `true`.

```javascript
var x = [ 89, 37, 30, 28, 2 ];
var p = [ 0.40, 0.20, 0.20, 0.15, 0.05 ];

var res = chi2gof( x, p );

var table = res.toString({
    'decision': false
});
/* e.g., returns

    Chi-square goodness-of-fit test

    Null hypothesis: population probabilities are equal to those in p

        pValue: 0.0186
        statistic: 9.9901
        degrees of freedom: 3

*/
```

</section>

<!-- /.usage -->

<section class="notes">

## Notes

-   The chi-square approximation may be incorrect if the observed or expected frequencies in each category are too small. Common practice is to require frequencies **greater than** five.

</section>

<!-- /.notes -->

<section class="examples">

## Examples

<!-- eslint no-undef: "error" -->

```html
<!DOCTYPE html>
<html lang="en">
<body>
<script type="module">

import poisson from 'https://cdn.jsdelivr.net/gh/stdlib-js/random-base-poisson@esm/index.mjs';
import Int32Array from 'https://cdn.jsdelivr.net/gh/stdlib-js/array-int32@esm/index.mjs';
import chi2gof from 'https://cdn.jsdelivr.net/gh/stdlib-js/stats-chi2gof@esm/index.mjs';

var N = 400;
var lambda = 3.0;
var rpois = poisson.factory( lambda );

// Draw samples from a Poisson distribution:
var x = [];
var i;
for ( i = 0; i < N; i++ ) {
    x.push( rpois() );
}

// Generate a frequency table:
var freqs = new Int32Array( N );
for ( i = 0; i < N; i++ ) {
    freqs[ x[ i ] ] += 1;
}

// Assess whether the simulated values come from a Poisson distribution:
var out = chi2gof( freqs, 'poisson', lambda );
// returns {...}

console.log( out.toString() );

</script>
</body>
</html>
```

</section>

<!-- /.examples -->

<!-- Section for related `stdlib` packages. Do not manually edit this section, as it is automatically populated. -->

<section class="related">

</section>

<!-- /.related -->

<!-- Section for all links. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->


<section class="main-repo" >

* * *

## Notice

This package is part of [stdlib][stdlib], a standard library with an emphasis on numerical and scientific computing. The library provides a collection of robust, high performance libraries for mathematics, statistics, streams, utilities, and more.

For more information on the project, filing bug reports and feature requests, and guidance on how to develop [stdlib][stdlib], see the main project [repository][stdlib].

#### Community

[![Chat][chat-image]][chat-url]

---

## License

See [LICENSE][stdlib-license].


## Copyright

Copyright &copy; 2016-2023. The Stdlib [Authors][stdlib-authors].

</section>

<!-- /.stdlib -->

<!-- Section for all links. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->

<section class="links">

[npm-image]: http://img.shields.io/npm/v/@stdlib/stats-chi2gof.svg
[npm-url]: https://npmjs.org/package/@stdlib/stats-chi2gof

[test-image]: https://github.com/stdlib-js/stats-chi2gof/actions/workflows/test.yml/badge.svg?branch=main
[test-url]: https://github.com/stdlib-js/stats-chi2gof/actions/workflows/test.yml?query=branch:main

[coverage-image]: https://img.shields.io/codecov/c/github/stdlib-js/stats-chi2gof/main.svg
[coverage-url]: https://codecov.io/github/stdlib-js/stats-chi2gof?branch=main

<!--

[dependencies-image]: https://img.shields.io/david/stdlib-js/stats-chi2gof.svg
[dependencies-url]: https://david-dm.org/stdlib-js/stats-chi2gof/main

-->

[chat-image]: https://img.shields.io/gitter/room/stdlib-js/stdlib.svg
[chat-url]: https://gitter.im/stdlib-js/stdlib/

[stdlib]: https://github.com/stdlib-js/stdlib

[stdlib-authors]: https://github.com/stdlib-js/stdlib/graphs/contributors

[umd]: https://github.com/umdjs/umd
[es-module]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules

[deno-url]: https://github.com/stdlib-js/stats-chi2gof/tree/deno
[umd-url]: https://github.com/stdlib-js/stats-chi2gof/tree/umd
[esm-url]: https://github.com/stdlib-js/stats-chi2gof/tree/esm
[branches-url]: https://github.com/stdlib-js/stats-chi2gof/blob/main/branches.md

[stdlib-license]: https://raw.githubusercontent.com/stdlib-js/stats-chi2gof/main/LICENSE

[@stdlib/ndarray/array]: https://github.com/stdlib-js/ndarray-array/tree/esm

</section>

<!-- /.links -->
