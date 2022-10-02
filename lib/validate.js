/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isNonNegativeInteger = require( '@stdlib/assert-is-nonnegative-integer' ).isPrimitive;
var isPositiveInteger = require( '@stdlib/assert-is-positive-integer' ).isPrimitive;
var isBoolean = require( '@stdlib/assert-is-boolean' ).isPrimitive;
var isNumber = require( '@stdlib/assert-is-number' ).isPrimitive;
var isObject = require( '@stdlib/assert-is-plain-object' );
var isnan = require( '@stdlib/assert-is-nan' );
var hasOwnProp = require( '@stdlib/assert-has-own-property' );
var format = require( '@stdlib/error-tools-fmtprodmsg' );


// MAIN //

/**
* Validates function options.
*
* @private
* @param {Object} opts - destination for validated options
* @param {Options} options - function options
* @param {number} [options.alpha] - significance level
* @param {NonNegativeInteger} [options.ddof] - degrees of freedom adjustment
* @param {boolean} [options.simulate] - boolean indicating whether to compute p-values by Monte Carlo simulation
* @param {PositiveInteger} [options.iterations] - number of Monte Carlo iterations
* @returns {(null|Error)} null or an error
*
* @example
* var opts = {};
* var options = {
*     'alpha': 0.01,
*     'simulate': false,
*     'ddof': 2
* };
* var err = validate( opts, options );
* if ( err ) {
*     throw err;
* }
*/
function validate( opts, options ) {
	if ( !isObject( options ) ) {
		return new TypeError( format( '0dO2h', options ) );
	}
	if ( hasOwnProp( options, 'alpha' ) ) {
		opts.alpha = options.alpha;
		if ( !isNumber( opts.alpha ) || isnan( opts.alpha ) ) {
			return new TypeError( format( '0dO8h', 'alpha', opts.alpha ) );
		}
		if ( opts.alpha < 0.0 || opts.alpha > 1.0 ) {
			return new RangeError( format( 'invalid option. `%s` option must be a number on the interval: [0, 1]. Value: `%s`.', 'alpha', opts.alpha ) );
		}
	}
	if ( hasOwnProp( options, 'ddof' ) ) {
		opts.ddof = options.ddof;
		if ( !isNonNegativeInteger( opts.ddof ) ) {
			return new TypeError( format( '0dO35', 'ddof', opts.ddof ) );
		}
	}
	if ( hasOwnProp( options, 'iterations' ) ) {
		opts.iterations = options.iterations;
		if ( !isPositiveInteger( opts.iterations ) ) {
			return new TypeError( format( '0dO3b', 'iterations', opts.iterations ) );
		}
	}
	if ( hasOwnProp( options, 'simulate' ) ) {
		opts.simulate = options.simulate;
		if ( !isBoolean( opts.simulate ) ) {
			return new TypeError( format( '0dO30', 'simulate', opts.simulate ) );
		}
	}
	return null;
}


// EXPORTS //

module.exports = validate;