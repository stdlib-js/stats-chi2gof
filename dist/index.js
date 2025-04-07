"use strict";var p=function(e,r){return function(){return r||e((r={exports:{}}).exports,r),r.exports}};var N=p(function(er,ie){ie.exports={alpha:.05,ddof:0,simulate:!1,iterations:500}});var x=p(function(rr,R){"use strict";var F=N();function te(){return{alpha:F.alpha,ddof:F.ddof,simulate:F.simulate,iterations:F.iterations}}R.exports=te});var M=p(function(ir,A){"use strict";var ae=require("@stdlib/assert-is-nonnegative-integer").isPrimitive,ne=require("@stdlib/assert-is-positive-integer").isPrimitive,se=require("@stdlib/assert-is-boolean").isPrimitive,oe=require("@stdlib/assert-is-number").isPrimitive,ue=require("@stdlib/assert-is-plain-object"),le=require("@stdlib/assert-is-nan"),O=require("@stdlib/assert-has-own-property"),y=require("@stdlib/string-format");function ve(e,r){if(!ue(r))return new TypeError(y("invalid argument. Options argument must be an object. Value: `%s`.",r));if(O(r,"alpha")){if(e.alpha=r.alpha,!oe(e.alpha)||le(e.alpha))return new TypeError(y("invalid option. `%s` option must be a number. Option: `%s`.","alpha",e.alpha));if(e.alpha<0||e.alpha>1)return new RangeError(y("invalid option. `%s` option must be a number on the interval: [0, 1]. Value: `%s`.","alpha",e.alpha))}return O(r,"ddof")&&(e.ddof=r.ddof,!ae(e.ddof))?new TypeError(y("invalid option. `%s` option must be a nonnegative integer. Option: `%s`.","ddof",e.ddof)):O(r,"iterations")&&(e.iterations=r.iterations,!ne(e.iterations))?new TypeError(y("invalid option. `%s` option must be a positive integer. Option: `%s`.","iterations",e.iterations)):O(r,"simulate")&&(e.simulate=r.simulate,!se(e.simulate))?new TypeError(y("invalid option. `%s` option must be a boolean. Option: `%s`.","simulate",e.simulate)):null}A.exports=ve});var z=p(function(tr,k){"use strict";var de=require("@stdlib/stats-base-dists-bernoulli-pmf"),fe=require("@stdlib/stats-base-dists-binomial-pmf"),me=require("@stdlib/stats-base-dists-discrete-uniform-pmf"),he=require("@stdlib/stats-base-dists-geometric-pmf"),pe=require("@stdlib/stats-base-dists-hypergeometric-pmf"),ce=require("@stdlib/stats-base-dists-negative-binomial-pmf"),ge=require("@stdlib/stats-base-dists-poisson-pmf"),qe={bernoulli:de,binomial:fe,"discrete-uniform":me,geometric:he,hypergeometric:pe,"negative-binomial":ce,poisson:ge};k.exports=qe});var D=p(function(ar,C){"use strict";var be=require("@stdlib/assert-has-own-property"),we=require("@stdlib/string-format"),B=z();function ye(e){return be(B,e)?B[e]:new Error(we("invalid argument. Unsupported/unrecognized distribution name. Value: `%s`.",e))}C.exports=ye});var j=p(function(nr,L){"use strict";var Pe=require("@stdlib/constants-float64-pinf");function Ee(e,r,i,n,o){var s,h,f,l,v;for(s=0,v=0;v<e;v++){if(h=r[v*i],f=n[v*o],f===0){if(h===0)continue;return Pe}l=h-f,s+=l*l/f}return s}L.exports=Ee});var J=p(function(sr,U){"use strict";function _e(e,r,i,n,o){var s;for(s=0;s<e;s++)n[r[s*i]*o]+=1;return n}U.exports=_e});var G=p(function(or,Q){"use strict";var Te=require("@stdlib/array-base-incrspace"),Fe=require("@stdlib/random-sample"),Oe=require("@stdlib/array-float64"),Ve=require("@stdlib/blas-ext-base-dfill"),je=J(),Se=j();function Ie(e,r,i,n,o,s){var h,f,l,v,c,d;for(h=Te(0,e,1),f={size:o,probs:i},l=new Oe(e),v=1,d=0;d<s;d++)c=Fe(h,f),l=je(e,c,1,l,1),Se(e,l,1,r,1)>=n&&(v+=1),d<s-1&&Ve(e,0,l,1);return v/(s+1)}Q.exports=Ie});var X=p(function(ur,W){"use strict";var Ne=require("@stdlib/assert-is-positive-integer"),Re=require("@stdlib/assert-is-plain-object"),xe=require("@stdlib/assert-is-boolean").isPrimitive,H=require("@stdlib/assert-has-own-property"),K=require("@stdlib/math-base-special-roundn"),I=require("@stdlib/utils-define-nonenumerable-read-only-property"),E=require("@stdlib/utils-define-nonenumerable-read-only-accessor"),S=require("@stdlib/string-format");function m(e,r,i,n){return this instanceof m?(this._pValue=e,this._alpha=r,this._statistic=i,this._df=n,this):new m(e,r,i,n)}E(m.prototype,"alpha",function(){return this._alpha});E(m.prototype,"df",function(){return this._df});I(m.prototype,"method","Chi-square goodness-of-fit test");E(m.prototype,"pValue",function(){return this._pValue});E(m.prototype,"rejected",function(){return this._pValue<=this._alpha});E(m.prototype,"statistic",function(){return this._statistic});I(m.prototype,"toString",function(r){var i,n,o;if(n=4,i=!0,arguments.length>0){if(!Re(r))throw new TypeError(S("invalid argument. Must provide an object. Value: `%s`.",r));if(H(r,"digits")){if(!Ne(r.digits))throw new TypeError(S("invalid option. `%s` option must be a positive integer. Option: `%s`.","digits",r.digits));n=r.digits}if(H(r,"decision")){if(!xe(r.decision))throw new TypeError(S("invalid option. `%s` option must be a boolean. Option: `%s`.","decision",r.decision));i=r.decision}}return o=[this.method,"","","Null hypothesis: population probabilities are equal to those in p","","","    pValue: "+K(this._pValue,-n),"    statistic: "+K(this._statistic,-n),"    degrees of freedom: "+this._df,""],i&&(o.push("Test Decision: "+(this.rejected?"Reject":"Fail to reject")+" null in favor of alternative at "+this._alpha*100+"% significance level"),o.push("")),o.join("\n")});I(m.prototype,"toJSON",function(){return{rejected:this.rejected,alpha:this._alpha,pValue:this._pValue,df:this._df,statistic:this._statistic,method:this.method}});W.exports=m});var re=p(function(lr,ee){"use strict";var Ae=require("@stdlib/assert-is-nonnegative-integer").isPrimitive,Y=require("@stdlib/assert-is-collection"),Z=require("@stdlib/assert-is-ndarray-like"),$=require("@stdlib/assert-is-number").isPrimitive,Me=require("@stdlib/assert-is-string").isPrimitive,ke=require("@stdlib/math-base-utils-absolute-difference"),ze=require("@stdlib/constants-float64-sqrt-eps"),Be=require("@stdlib/constants-float64-pinf"),Ce=require("@stdlib/stats-base-dists-chisquare-cdf"),P=require("@stdlib/string-format"),De=require("@stdlib/assert-is-nan"),Le=require("@stdlib/blas-base-daxpy"),Ue=require("@stdlib/blas-base-dscal"),Je=require("@stdlib/blas-ext-base-dsumpw"),V=require("@stdlib/array-float64"),Qe=x(),Ge=M(),He=D(),Ke=j(),We=G(),Xe=X();function Ye(e,r){var i,n,o,s,h,f,l,v,c,d,_,u,q,b,w,g,T,t,a;if(Z(e)&&e.ndims===1&&e.strides.length===1)q=e.data,b=e.strides[0],w=e.offset;else if(Y(e))q=e,b=1,w=0;else throw new TypeError(P("invalid argument. First argument must be either an array-like object or a one-dimensional ndarray. Value: `%s`.",e));for(u=e.length,l=new V(u+1),g=0,a=0;a<u;a++){if(t=q[w+b*a],!Ae(t))throw new TypeError(P("invalid argument. First argument must contain nonnegative integers. Index: `%u`. Value: `%s`.",a,t));l[a]=t,g+=t}if(g===0)throw new Error("invalid argument. First argument must contain at least one element greater than zero (i.e., the total number number of observations must be greater than zero).");if(n=0,Me(r)){if(c=He(r),c instanceof Error)throw c;for(n+=c.length-1,o=[0],a=0;a<n;a++){if(t=arguments[a+2],!$(t)||De(t))throw new TypeError(P("invalid argument. Probability mass function (PMF) arguments must be numbers. Argument: `%u`. Value: `%s`.",a+2,t));o.push(t)}for(i=new V(u+1),d=0,a=0;a<u;a++)o[0]=a,r==="discrete-uniform"&&(o[0]+=o[1]),t=c.apply(null,o),d+=t,i[a]=t*g;d<1&&(i[u]=(1-d)*g,u+=1)}else{if(Z(r)&&r.ndims===1&&r.strides.length===1)q=r.data,b=r.strides[0],w=r.offset;else if(Y(r))q=r,b=1,w=0;else throw new TypeError(P("invalid argument. Second argument must be either an array-like object (or one-dimensional ndarray) of probabilities summing to one, an array-like object (or one-dimensional ndarray) of expected frequencies, or a discrete probability distribution name. Value: `%s`.",r));if(r.length!==u)throw new RangeError("invalid arguments. First and second arguments must have the same length.");for(i=new V(u),d=0,a=0;a<u;a++){if(t=q[w+b*a],!$(t))throw new TypeError(P("invalid argument. Second argument must only contain numbers. Index: `%u`. Value: `%s`.",a,t));if(t<0)throw new TypeError(P("invalid argument. Second argument must only contain nonnegative numbers. Index: `%u`. Value: `%d`.",a,t));t>1?d+=Be:d+=t,i[a]=t}ke(d,1)<=ze&&(T=r,i=Ue(u,g,i,1))}if(s=Qe(),arguments.length>2+n&&(v=Ge(s,arguments[2+n]),v))throw v;return f=Ke(u,l,1,i,1),s.simulate?(T===void 0&&(t=Je(u,i,1),T=Le(u,1/t,i,1,new V(u),1)),h=We(u,i,T,f,g,s.iterations)):(_=u-1-s.ddof,h=1-Ce(f,_)),new Xe(h,s.alpha,f,_===void 0?null:_)}ee.exports=Ye});var Ze=re();module.exports=Ze;
/**
* @license Apache-2.0
*
* Copyright (c) 2020 The Stdlib Authors.
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
//# sourceMappingURL=index.js.map
