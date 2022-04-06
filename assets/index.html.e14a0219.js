import{r as i,o as t,c as r,b as a,d,F as s,e,a as n}from"./app.3c952c49.js";import{_ as c}from"./plugin-vue_export-helper.21dcd24c.js";const l={},h=a("h1",{id:"changelog",tabindex:"-1"},[a("a",{class:"header-anchor",href:"#changelog","aria-hidden":"true"},"#"),e(" Changelog")],-1),p=a("p",null,"All notable changes to this project will be documented in this file.",-1),u=e("The format is based on "),m={href:"https://keepachangelog.com/en/1.0.0/",target:"_blank",rel:"noopener noreferrer"},f=e("Keep a Changelog"),b=e(", and this project adheres to "),g={href:"https://semver.org/spec/v2.0.0.html",target:"_blank",rel:"noopener noreferrer"},y=e("Semantic Versioning"),x=e("."),v=n('<h2 id="_1-0-0-alpha-32-2022-02-28" tabindex="-1"><a class="header-anchor" href="#_1-0-0-alpha-32-2022-02-28" aria-hidden="true">#</a> [1.0.0-alpha.32] - 2022-02-28</h2><h3 id="fixed" tabindex="-1"><a class="header-anchor" href="#fixed" aria-hidden="true">#</a> Fixed</h3><ul><li>Fixed bug from <code>alpha.31</code> where component props would be typed as <code>Ref</code> in bindings.</li></ul><h2 id="_1-0-0-alpha-31-2022-02-28" tabindex="-1"><a class="header-anchor" href="#_1-0-0-alpha-31-2022-02-28" aria-hidden="true">#</a> [1.0.0-alpha.31] - 2022-02-28</h2><h3 id="breaking" tabindex="-1"><a class="header-anchor" href="#breaking" aria-hidden="true">#</a> Breaking</h3><p>Highlights of breaking changes from the log further down:</p><h4 id="simplify-usage-of-lazy-components" tabindex="-1"><a class="header-anchor" href="#simplify-usage-of-lazy-components" aria-hidden="true">#</a> Simplify usage of <code>lazy</code> components</h4><p>In order to use components as <code>lazy</code>, they had to be exported with the <code>supportLazy</code> helper. This is not needed anymore. The <code>lazy</code> function now determines the export based on the <code>displayName</code> (1st parameter), which should match the export based on convention. If you follow this convention for your components, you don&#39;t have to change anything.</p><p>If you had a <code>webpackExports: lazy</code> comment in your <code>import</code> statement (as was previously recommended in the docs and examples), this can be removed.</p><p>If your component export doesn&#39;t match the convention, you can provide the <code>exportName</code> (3rd parameter).</p>',10),_=e("See the docs for "),w={href:"https://mubanjs.github.io/muban/api/component.html#lazy",target:"_blank",rel:"noopener noreferrer"},k=e("lazy"),A=e(" for more details."),T=n('<h4 id="only-allow-passing-reactive-values-to-component-props-in-bindings" tabindex="-1"><a class="header-anchor" href="#only-allow-passing-reactive-values-to-component-props-in-bindings" aria-hidden="true">#</a> Only allow passing reactive values to component <code>props</code> in <code>bindings</code></h4><p>Previously you could pass non-reactive values to component <code>prop</code> <code>bindings</code>. While this technically works, this is <strong>often not intended</strong>, and results in the unexpected behaviour of the component not receiving updated values. This change requires all bindings to component props to be reactive.</p><p>Even though this is technically a breaking change, any cases that will give an error after upgrading to this version, were probably mistakes in your existing code.</p><p>If you do have a need for static values in your bindings, you should now wrap them in a <code>computed</code>.</p><h4 id="two-way-input-bindings" tabindex="-1"><a class="header-anchor" href="#two-way-input-bindings" aria-hidden="true">#</a> Two-way input <code>bindings</code></h4><p>Two-way bindings sync up the state between the component and the HTML. If the initial state of the two match up, there is nothing to do here. But if the initial state is different (e.g. a <code>ref</code> has <code>true</code>, but html has <code>false</code>), the binding code doesn&#39;t know what to do.</p><p>By default, it still picks the HTML as the initial source, but a warning is logged that they were not equal. To change this behaviour, or get rid of the warning, you can explicitly provide the source by setting the <code>initialValueSource</code> binding config to either <code>html</code> or <code>binding</code>.</p>',7),q=e("See the docs for "),F={href:"https://mubanjs.github.io/muban/api/bindings.html#form-bindings",target:"_blank",rel:"noopener noreferrer"},I=e("bindings"),M=e(" for more details."),C=n(`<h4 id="make-the-props-object-parameter-in-the-setup-function-readonly" tabindex="-1"><a class="header-anchor" href="#make-the-props-object-parameter-in-the-setup-function-readonly" aria-hidden="true">#</a> Make the <code>props</code> object parameter in the <code>setup</code> function <code>readonly</code>.</h4><p>Previously it was possible to abuse the <code>props</code> objects that is passed in the <code>setup</code> function as internal component state. While this can work for extracted props, for the ones passed from parent components this could result in conflicts.</p><p>Since the data flow should be predictable, props should only flow from source (html or parent) to target (child), and should be immutable. This is why this object is now <code>readonly</code>. Both at runtime (will log an error) and in the type system.</p><p>If your code relies on this current behaviour, you should copy this state to an internal <code>ref</code>, and use that to read and write the value instead.</p><h4 id="improve-control-over-bindtemplate-rendering" tabindex="-1"><a class="header-anchor" href="#improve-control-over-bindtemplate-rendering" aria-hidden="true">#</a> Improve control over <code>bindTemplate</code> rendering</h4><p>The biggest change here is that the <code>data</code> and <code>template</code> properties are now merged into a single <code>onUpdate</code> function, that acts as a <code>watchEffect</code>. All usages of <code>bindTemplate</code> have to be updated.</p><p>Previously:</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token function">bindTemplate</span><span class="token punctuation">(</span>
  refs<span class="token punctuation">.</span>container<span class="token punctuation">,</span>
  <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> someData<span class="token punctuation">.</span>value<span class="token punctuation">,</span>
  <span class="token punctuation">(</span>data<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> data<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>renderTemplate<span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>Now:</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token function">bindTemplate</span><span class="token punctuation">(</span>refs<span class="token punctuation">.</span>container<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> someData<span class="token punctuation">.</span>value<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>renderTemplate<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div>`,10),j=e("Read the docs on "),R={href:"https://mubanjs.github.io/muban/api/bindings.html#bindtemplate",target:"_blank",rel:"noopener noreferrer"},z=e("bindTemplate"),S=e(" to understand when the optional "),V=a("code",null,"onlyWach",-1),E=e(" parameter from "),L=a("code",null,"onUpdate",-1),D=e(" can be used to improve performance in advanced use cases."),P=n('<p>Additionally, the <code>renderImmediate</code> option has been changed to <code>forceImmediateRender</code> to indicate the new behaviour. Previously you would have to be explicit about when the <code>bindTemplate</code> should render immediately or not, while the new implementation does this based on the existence of any HTML inside the container. <code>forceImmediateRender</code> can override this behaviour.</p><blockquote><p><strong>Note:</strong> Previously, <code>watch</code> was used to watch for explicit changes to the passed computed. This would have been &quot;shallow&quot; by default, and other reactive data used in the template function would not trigger a rerender.</p><p>The new implementation uses <code>watchEffect</code>, which is triggered by any reactive updates in the <code>onUpdate</code> function, but also watches refs that have nested objects deeply by default.</p><p>To only update changes to the <code>ref.value</code>, a <code>shallowRef</code> can be used instead.</p></blockquote><h3 id="added" tabindex="-1"><a class="header-anchor" href="#added" aria-hidden="true">#</a> Added</h3><ul><li>Allow the <code>.source()</code> option of the <code>propType.</code> helper to receive an array of source configurations. The first hit will be used.</li><li>Add support for multiple components in <code>refComponents</code> \u2013 same as already was possible in <code>refComponent</code></li><li>Proxy <code>watch</code>/<code>watchEffect</code> to allow auto-cleanup on component unmount \u2013 no need to clean these up yourself anymore.</li><li>Allow typing refs as <code>SVGElement</code></li></ul><h3 id="fixed-1" tabindex="-1"><a class="header-anchor" href="#fixed-1" aria-hidden="true">#</a> Fixed</h3><ul><li>Fix usage of the <code>css</code> &quot;string&quot; binding.</li><li>Fix usage of multiple classes as key for the <code>css</code> &quot;object&quot; binding.</li><li>Fix issues with <strong>two-way</strong> input <code>bindings</code>.</li><li>Allow DOM <code>bindings</code> on components without <code>props</code></li><li>Fix issue with <code>queryRef</code> where a nested element would be found and ignored</li></ul><h3 id="changed" tabindex="-1"><a class="header-anchor" href="#changed" aria-hidden="true">#</a> Changed</h3><ul><li>Simplify usage of <code>lazy</code> components.</li><li>Only allow passing <strong>reactive values</strong> to component <code>props</code> in <code>bindings</code>.</li><li>When <strong>two-way</strong> input <code>bindings</code> don&#39;t match between the html and the initial binding value, the <code>initialValueSource</code> binding config should be added to specify which source should be used.</li><li>Make the <code>props</code> object parameter in the <code>setup</code> function <code>readonly</code>.</li><li>Improve control over <code>bindTemplate</code> rendering.</li><li>Update <code>@vue/reactivity</code> and <code>@vue/runtime-core</code> to <code>3.2.31</code></li></ul><h3 id="deprecated" tabindex="-1"><a class="header-anchor" href="#deprecated" aria-hidden="true">#</a> Deprecated</h3><ul><li>The <code>supportLazy</code> is a no-op function, the <code>lazy</code> export is not used anymore</li></ul><h3 id="misc" tabindex="-1"><a class="header-anchor" href="#misc" aria-hidden="true">#</a> Misc</h3><ul><li>Improve bundle size by switching some external libraries, or replace them by internal utils.</li><li>Update internal repo structure into multiple projects folders for specific test cases</li></ul><h2 id="_1-0-0-alpha-30-2022-02-28" tabindex="-1"><a class="header-anchor" href="#_1-0-0-alpha-30-2022-02-28" aria-hidden="true">#</a> [1.0.0-alpha.30] - 2022-02-28</h2><p>Deprecated</p><h2 id="_1-0-0-alpha-29-2022-01-18" tabindex="-1"><a class="header-anchor" href="#_1-0-0-alpha-29-2022-01-18" aria-hidden="true">#</a> [1.0.0-alpha.29] - 2022-01-18</h2><h3 id="fixed-2" tabindex="-1"><a class="header-anchor" href="#fixed-2" aria-hidden="true">#</a> Fixed</h3><ul><li>Don&#39;t set refs to undefined in component or element ref collections that stay in the DOM.</li></ul><h2 id="_1-0-0-alpha-28-2021-12-09" tabindex="-1"><a class="header-anchor" href="#_1-0-0-alpha-28-2021-12-09" aria-hidden="true">#</a> [1.0.0-alpha.28] - 2021-12-09</h2><h3 id="added-1" tabindex="-1"><a class="header-anchor" href="#added-1" aria-hidden="true">#</a> Added</h3><ul><li>Add <code>propType.any</code></li><li>Fix <code>propType.object.defaultValue</code> to allow receiving function value</li></ul><h3 id="fixed-3" tabindex="-1"><a class="header-anchor" href="#fixed-3" aria-hidden="true">#</a> Fixed</h3><ul><li>Don&#39;t re-create ref components when previously created globally</li><li>Fix <code>attr</code> source conversion</li><li>Improve <code>bindMap</code> and other bindings after <code>bindTemplate</code> updates</li><li>Fix some internal typing issues that were causing build error</li><li>Check current HTML value before setting innerHTML</li><li>Improve performance with global MutationObserver</li></ul><h3 id="changed-1" tabindex="-1"><a class="header-anchor" href="#changed-1" aria-hidden="true">#</a> Changed</h3><ul><li>Upgrade <code>vue/reactivity</code> and <code>vue/runtime-core</code> to <code>3.2.22</code></li><li>Improve types for prop <code>source</code> options</li><li>Improve error reporting for invalid refs</li></ul><h3 id="misc-1" tabindex="-1"><a class="header-anchor" href="#misc-1" aria-hidden="true">#</a> Misc</h3><ul><li>Add example stories</li><li>Update docs</li><li>Exclude type test files in Jest</li><li>Update Arrays for refs/elements to ReadonlyArray</li><li>Change target for ESM builds to es6 to be more modern</li></ul><h2 id="_1-0-0-alpha-27-2021-05-16" tabindex="-1"><a class="header-anchor" href="#_1-0-0-alpha-27-2021-05-16" aria-hidden="true">#</a> [1.0.0-alpha.27] - 2021-05-16</h2><h3 id="added-2" tabindex="-1"><a class="header-anchor" href="#added-2" aria-hidden="true">#</a> Added</h3><ul><li>Add validation on component bindings that try to set props that don&#39;t exist.</li><li>Add an <code>ignoreGuard</code> option to all <code>ref</code> helpers to bypass the default child-component guard.</li><li>Add support for passing multiple components to <code>refComponent</code> \u2013 e.g. <code>refComponent([Button, Link], { ref: &#39;some-button&#39; })</code>.</li><li>Make the <code>defaultValue</code> on props actually do something, setting the value when no other &quot;error&quot; case is triggered.</li></ul><h3 id="fixed-4" tabindex="-1"><a class="header-anchor" href="#fixed-4" aria-hidden="true">#</a> Fixed</h3><ul><li>Fix incorrect invalid binding warnings, showing logs in the console that were not correct.</li><li>Prevent refs on collections to update when &quot;inner&quot; HTML updates, causing bindings to re-apply without cleanup.</li><li>Apply <code>validation</code> (correctly) on all variations of how to pass props. Don&#39;t run validation on <code>undefined</code> values.</li></ul><h3 id="misc-2" tabindex="-1"><a class="header-anchor" href="#misc-2" aria-hidden="true">#</a> Misc</h3><ul><li>Fix small errors in docs</li><li>Update <code>refs</code> API docs to be accurate, and add more examples</li><li>Reorganize and add more Stories for testing</li><li>Add more unit tests</li></ul><h2 id="_1-0-0-alpha-26-2021-03-31" tabindex="-1"><a class="header-anchor" href="#_1-0-0-alpha-26-2021-03-31" aria-hidden="true">#</a> [1.0.0-alpha.26] - 2021-03-31</h2><h3 id="added-3" tabindex="-1"><a class="header-anchor" href="#added-3" aria-hidden="true">#</a> Added</h3><ul><li>Add <code>minimumItemsRequired</code> option to collection refs \u2013 e.g. <code>refCollection(&#39;item&#39;, { minimumItemsRequired: 3 })</code>.</li><li>Support <code>null</code> in predicates for any type</li></ul><h2 id="_1-0-0-alpha-25-2021-03-30" tabindex="-1"><a class="header-anchor" href="#_1-0-0-alpha-25-2021-03-30" aria-hidden="true">#</a> [1.0.0-alpha.25] - 2021-03-30</h2><h3 id="changed-2" tabindex="-1"><a class="header-anchor" href="#changed-2" aria-hidden="true">#</a> Changed</h3><ul><li><p>Refactor the propType generation and typing</p><p>Drastically reducing the generated TS declarations (was over 96000 lines) to only 60 by using Generics.</p><p>Also set a fixed order of setters in the chaining API, while still allowing omitting helpers in the middle.</p><p><code>propType.[type].[optional / defaultValue].[validate].[source]</code> <code>propType.func.[optional].[shape]</code></p></li></ul><h3 id="misc-3" tabindex="-1"><a class="header-anchor" href="#misc-3" aria-hidden="true">#</a> Misc</h3><ul><li>Add unit tests for props</li><li>Add type tests for props</li></ul><h2 id="_1-0-0-alpha-24-2021-03-29" tabindex="-1"><a class="header-anchor" href="#_1-0-0-alpha-24-2021-03-29" aria-hidden="true">#</a> [1.0.0-alpha.24] - 2021-03-29</h2><h3 id="fixed-5" tabindex="-1"><a class="header-anchor" href="#fixed-5" aria-hidden="true">#</a> Fixed</h3><ul><li>Fix ordering of adding the propType source helper</li></ul><h2 id="_1-0-0-alpha-23-2021-03-29" tabindex="-1"><a class="header-anchor" href="#_1-0-0-alpha-23-2021-03-29" aria-hidden="true">#</a> [1.0.0-alpha.23] - 2021-03-29</h2><h3 id="added-4" tabindex="-1"><a class="header-anchor" href="#added-4" aria-hidden="true">#</a> Added</h3><ul><li>Allow for optional source &quot;attributes&quot;</li></ul><h3 id="misc-4" tabindex="-1"><a class="header-anchor" href="#misc-4" aria-hidden="true">#</a> Misc</h3><ul><li>Fix doc typos</li></ul><h2 id="_1-0-0-alpha-22-2021-03-29" tabindex="-1"><a class="header-anchor" href="#_1-0-0-alpha-22-2021-03-29" aria-hidden="true">#</a> [1.0.0-alpha.22] - 2021-03-29</h2><h3 id="added-5" tabindex="-1"><a class="header-anchor" href="#added-5" aria-hidden="true">#</a> Added</h3><ul><li>Add support for <code>source</code> in <code>propType</code> helper</li><li>Add <code>text</code> and <code>html</code> sources</li></ul><h3 id="misc-5" tabindex="-1"><a class="header-anchor" href="#misc-5" aria-hidden="true">#</a> Misc</h3><ul><li>Fix all unit tests</li><li>Add propType stories as tests and examples</li><li>Add and update docs about props usage</li><li>Remove template code, use <code>@muban/template</code> instead (internal change only)</li></ul><h2 id="_1-0-0-alpha-21-2021-03-24" tabindex="-1"><a class="header-anchor" href="#_1-0-0-alpha-21-2021-03-24" aria-hidden="true">#</a> [1.0.0-alpha.21] - 2021-03-24</h2><h3 id="added-6" tabindex="-1"><a class="header-anchor" href="#added-6" aria-hidden="true">#</a> Added</h3><ul><li>Add <code>object</code> propType</li></ul><h3 id="misc-6" tabindex="-1"><a class="header-anchor" href="#misc-6" aria-hidden="true">#</a> Misc</h3><ul><li>Remove old transition prototype code</li></ul><h2 id="_1-0-0-alpha-20-2021-03-24" tabindex="-1"><a class="header-anchor" href="#_1-0-0-alpha-20-2021-03-24" aria-hidden="true">#</a> [1.0.0-alpha.20] - 2021-03-24</h2><h3 id="changed-3" tabindex="-1"><a class="header-anchor" href="#changed-3" aria-hidden="true">#</a> Changed</h3><ul><li>Guard <code>ref</code> query selection to only select direct children. This will make sure that no refs in child components can be selected.</li></ul><h3 id="misc-7" tabindex="-1"><a class="header-anchor" href="#misc-7" aria-hidden="true">#</a> Misc</h3><ul><li>Remove old transition prototype code</li></ul><h2 id="_1-0-0-alpha-19-2021-03-23" tabindex="-1"><a class="header-anchor" href="#_1-0-0-alpha-19-2021-03-23" aria-hidden="true">#</a> [1.0.0-alpha.19] - 2021-03-23</h2><h3 id="added-7" tabindex="-1"><a class="header-anchor" href="#added-7" aria-hidden="true">#</a> Added</h3><ul><li><code>bindMap</code> now accepts an &quot;<code>Array</code> of <code>refs</code>&quot; in addition to a <code>collection</code>.</li><li>[typing] Add and move template types</li></ul><h3 id="fixed-6" tabindex="-1"><a class="header-anchor" href="#fixed-6" aria-hidden="true">#</a> Fixed</h3><ul><li>[typing] Allow <code>ComponentFactory</code> to allow any component in &quot;strict&quot; mode by mapping any to <code>any</code> instead of <code>{}</code> in component props.</li></ul><h3 id="misc-8" tabindex="-1"><a class="header-anchor" href="#misc-8" aria-hidden="true">#</a> Misc</h3><ul><li>Add stories to showcase and test the bindMap use cases</li><li>[typing] Fix all TS errors in example components after previous refactors</li></ul><h2 id="_1-0-0-alpha-18-2021-03-19" tabindex="-1"><a class="header-anchor" href="#_1-0-0-alpha-18-2021-03-19" aria-hidden="true">#</a> [1.0.0-alpha.18] - 2021-03-19</h2><h3 id="fixed-7" tabindex="-1"><a class="header-anchor" href="#fixed-7" aria-hidden="true">#</a> Fixed</h3><ul><li>Fix provide/inject bugs by moving <code>Object.create(provides)</code> from <code>provide</code> to &quot;component creation&quot;.</li></ul><h2 id="_1-0-0-alpha-17-2021-03-18" tabindex="-1"><a class="header-anchor" href="#_1-0-0-alpha-17-2021-03-18" aria-hidden="true">#</a> [1.0.0-alpha.17] - 2021-03-18</h2><h3 id="added-8" tabindex="-1"><a class="header-anchor" href="#added-8" aria-hidden="true">#</a> Added</h3><ul><li>Allow <code>event</code> bindings on component <code>refs</code></li></ul><h2 id="_1-0-0-alpha-16-2021-03-17" tabindex="-1"><a class="header-anchor" href="#_1-0-0-alpha-16-2021-03-17" aria-hidden="true">#</a> [1.0.0-alpha.16] - 2021-03-17</h2><h3 id="added-9" tabindex="-1"><a class="header-anchor" href="#added-9" aria-hidden="true">#</a> Added</h3><ul><li>Add reactive <code>bindMap</code> implementation</li></ul><h3 id="removed" tabindex="-1"><a class="header-anchor" href="#removed" aria-hidden="true">#</a> Removed</h3><ul><li>Remove <code>renderChildTemplate</code>, wasn&#39;t doing what it should</li></ul><h2 id="_1-0-0-alpha-15-2021-03-17" tabindex="-1"><a class="header-anchor" href="#_1-0-0-alpha-15-2021-03-17" aria-hidden="true">#</a> [1.0.0-alpha.15] - 2021-03-17</h2><h3 id="added-10" tabindex="-1"><a class="header-anchor" href="#added-10" aria-hidden="true">#</a> Added</h3><ul><li>Add <code>renderChildTemplate</code> util function</li></ul><h2 id="_1-0-0-alpha-14-2021-03-16" tabindex="-1"><a class="header-anchor" href="#_1-0-0-alpha-14-2021-03-16" aria-hidden="true">#</a> [1.0.0-alpha.14] - 2021-03-16</h2><h3 id="added-11" tabindex="-1"><a class="header-anchor" href="#added-11" aria-hidden="true">#</a> Added</h3><ul><li>Add new <code>bindings</code>; <code>checked</code>, <code>html</code>, <code>style</code>, <code>text</code>, <code>textInput</code> and <code>value</code>.</li><li>Allow <code>refs</code> to on the root element using its <code>data-ref</code>, helps when wrapping and unwrapping elements and those sometimes becoming the root element.</li></ul><h2 id="_1-0-0-alpha-12-2020-12-29" tabindex="-1"><a class="header-anchor" href="#_1-0-0-alpha-12-2020-12-29" aria-hidden="true">#</a> [1.0.0-alpha.12] - 2020-12-29</h2><h3 id="fixed-8" tabindex="-1"><a class="header-anchor" href="#fixed-8" aria-hidden="true">#</a> Fixed</h3><ul><li>Re-export <code>supportLazy</code> in <code>index</code>.</li><li>Use <code>globalThis</code> to support building and running in node.</li></ul><h2 id="_1-0-0-alpha-11-2020-12-29" tabindex="-1"><a class="header-anchor" href="#_1-0-0-alpha-11-2020-12-29" aria-hidden="true">#</a> [1.0.0-alpha.11] - 2020-12-29</h2><h3 id="added-12" tabindex="-1"><a class="header-anchor" href="#added-12" aria-hidden="true">#</a> Added</h3><ul><li>Add new <code>bindings</code>; <code>hasFocus</code>, <code>enable/disable</code>, <code>visible/hidden</code> and <code>submit</code>.</li><li>[types] Improve the types of refs/bindings</li></ul><h3 id="changed-4" tabindex="-1"><a class="header-anchor" href="#changed-4" aria-hidden="true">#</a> Changed</h3><ul><li><p>Introduced a &quot;global&quot; <code>App</code> using <code>createApp</code> as a starting point.</p><p>This will &quot;replace&quot; the <code>mount</code> and <code>registerGlobalComponents</code>, and other things that were kind of global / settings.</p></li><li><p>Change lifecycle hooks to mimic the Vue structure a bit more, and get rid of external eventEmitter dependency.</p></li></ul><h3 id="misc-9" tabindex="-1"><a class="header-anchor" href="#misc-9" aria-hidden="true">#</a> Misc</h3><ul><li>Updated the folder structure to match the almost final shape of the API.</li><li>Add some unit tests, and include babel in those tests to get everything working again.</li><li>Introduce &quot;component instances&quot; for <code>refs</code> to support devtools, keeping track of bindings and when they update.</li><li>Add devtools support, highly inspired by the Vue Devtools.</li></ul><h2 id="older" tabindex="-1"><a class="header-anchor" href="#older" aria-hidden="true">#</a> Older</h2><p>Older versions are too much PoC to list here retro-actively.</p>',100);function U(B,N){const o=i("ExternalLinkIcon");return t(),r(s,null,[h,p,a("p",null,[u,a("a",m,[f,d(o)]),b,a("a",g,[y,d(o)]),x]),v,a("p",null,[_,a("a",w,[k,d(o)]),A]),T,a("p",null,[q,a("a",F,[I,d(o)]),M]),C,a("p",null,[j,a("a",R,[z,d(o)]),S,V,E,L,D]),P],64)}var G=c(l,[["render",U]]);export{G as default};