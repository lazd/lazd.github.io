{
    title: "DOMly - The fast template system that clones",
    description: "Make your app fly with maintainable templates the compile to createElement and cloneNode",
    date: "2014-2-27",
    tags: [
        'javascript',
        'browsers'
    ],
    image: '<div class="fullMast" style="background-image: url(images/DOMly_logo_small.png);"></div>'
}

## Flashback: The state of `innerHTML` performance in 2008

> "The most obvious conclusion of these tests is that innerHTML is faster than "real" W3C DOM methods in all browsers."

> &#8212; [Quirksmode, circa 2008][quirksmode: innerHTML]

## Newsflash: `innerHTML` is slow.

The time-honored best-practice is no longer best-practice. While you weren't looking, JavaScript engines have [doubled in performance][V8 crankshaft] multiple times, numerous [optimizations have been made][webkit patch for 82201], and it's [no longer the case][cloneNode vs createElement vs innerHTML] that `innerHTML` is the fastest way to get elements into the DOM.

<figure>
    <a href="http://jsperf.com/clonenode-vs-createelement-performance/32" title="Benchmarks on jsPerf"><img src="images/bench-createElement-cloneNode-innerHTML.png" alt="Benchmark results: cloneNode vs createElement vs innerHTML" target="_blank"></a>
    <figcaption>`innerHTML` is an order of magnitude slower than DOM methods on mobile</figcaption>
</figure>

<!-- Results for cloneNode vs createElement vs innerHTML -->
<!-- <script src="http://www.browserscope.org/user/tests/table/agt1YS1wcm9maWxlcnIRCxIEVGVzdBiAgIDUzbCvCww?o=js"></script> -->

## So why are we still using `innerHTML` based templates?

Because the tooling doesn't exist.

We haven't seen a major release of a full-featured, production ready template system that compiles to DOM nodes. [transparency] and [domjs] aren't really template systems, [pure] is magical to the point of confusion, [DOMBars] is deprecated, and [HTMLBars] is still in the works.


## Enter DOMly
<img src="images/DOMly_logo_small.png" class="right titleImage" alt="DOMly logo">

DOMly, named after [Dolly, the first mammal to be cloned], is a template system that takes advantage `createElement` and `cloneNode`.

DOMly's goal is to be approachable, fast, and lightweight.


### Fast. Very fast.

With 7x the performance of doT and Handlebars and 2x the performance of HTMLBars, **DOMly is arguably the fastest client-side templating system in existence**. Check out [the benchmarks][benchmarks on jsPerf].

Furthermore, if you use the [`handle="someName"` feature][handles feature], you'll end up with references to elements you'll need to mutate in the future -- no `querySelector` required.


### Zero client-side dependencies

DOMly has no runtime library and no dependencies. Compiled templates are simply JavaScript functions that create DOM objects with native methods.

Pre-compile your templates as part of your build process, and when you render them in the browser, you'll get a [Node] or [DocumentFragment] that you can `appendChild()` anywhere in the DOM.


### Pretty syntax

The syntax is a combination of HTML for markup and control flow, dot notation for property references, `()` for invocation, and Mustache-style `{{blocks}}` for safe variable substitution:

```html
<h1>{{data.header}}</h1>
<if data.items.length>
  <ul>
    <foreach data.items,index>
      <li if-data.current='class="current"'>
        <if data.url>
          <a href="{{data.url}}">{{index}}. {{data.name}}</a>
        <else>
          {{index}}. {{data.name}}
        </if>
      </li>
    </foreach>
  </ul>
<else>
  <p>There are no items yet.</p>
</if>
```
<figcaption class="center">A basic DOMly template</figcaption>


### Powerful (enough)

DOMly supports conditionals, loops, helpers, partials, and even raw JavaScript.

#### Partials
```html
<partial MyApp.Templates.myPartial(data)></partial>
```

#### Block helpers
```html
<helper MyApp.Helpers.myHelper(data)>
  This string is evaluated {{data.forSubstitutions}} and passed as the last argument.
</helper>
```

#### Class methods and data
```html
<if this.isFeatured(data.id,this.featured)>
  This item is featured!
</if>
```

#### Object iteration with named iterator
```html
<forin data.object,prop>
    {{prop}}: {{data}}
</forin>
```

#### Raw JavaScript
```html
<js>
    data.count += 1;
</js>
```

#### Helpers & sub-expressions
```html
{{captalize(reverse(data.name))}}
```

### Limitations

#### No room to grow syntactically

Because DOMly templates are parsable HTML, you can't use `/`, `=`, or spaces in statements.

#### Must be be compiled on the server

Although it would be possible to compile on the client, you shouldn't be doing that anyway.

#### Doesn't support arbitrary expressions

You won't be able to write `{{data.count+1}}` anywhere.

#### DOMly isn't yet battle tested

DOMly is the newest language on the block. Although it's unit tested and benchmarks, it's not battle-tested and can't be guaranteed to be bug-free. 

However, in 2014, we'll see a number of template languages switch to pure DOM methods for a performance boost, and DOMly will be there to challenge them to be the best and fastest that they can be.


## That's great, but why not base it off an existing template system?

### 1. It's an experiment

DOMly didn't set out to replace heavy hitters like Handlebars. DOMly started as an experiment to establish the performance gains of using DOM methods for templating, the feasibility of maintaining a set of these templates, and the actual amount of code required to do this from scratch.

The goal was to validate the hypothesis:

>It's both possible and simple to build a template language that takes advantage of the performance gains of native DOM methods.

### 2. Simplicity

Existing template systems are quite complex. From advanced [Jison parser tricks] to dozens of [regular expressions so complex that they've taken on a life of their own], to [complex feature sets], these projects aren't very approachable. To re-tool an existing language would be a massive time sink just to validate a hypothesis.

Many existing template systems require runtimes that handle helpers and partials. This results in an additional call on the stack for method invocation which can affect performance. They're tiny, but the size doesn't help either gzipped, Handlebar's runtime is 4kB, Underscore is 5kB.

### 3. Syntax

After years of staring at PHP and JSPs, I think we could do better than this:

```html
<h1><%- obj.header %></h1>
<% if(obj.hasItems) { %>
  <ul>
  <% _.each(obj.items, function(item) { %>
    <% if(item.current) { %>
      <li><strong><%- item.name %></strong></li>
    <% } else { %>
      <li><a href="<%- item.url %>"><%- item.name %></a></li>
    <% } %>
  <% }); %>
  </ul>
<% } else { %>
  <p>The list is empty.</p>
<% } %>
```
<figcaption class="center">A basic Underscore template</figcaption>


### Your turn. How does this make you feel?

Does the mix of markup and template code bug you, or is the best thing since sliced bread?

See [the source on Github] and the [benchmarks on jsPerf]. 



[Dolly, the first mammal to be cloned]: http://en.wikipedia.org/wiki/Dolly_(sheep)
[Node]: https://developer.mozilla.org/en-US/docs/Web/API/Node
[DocumentFragment]: https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment
[complex feature sets]: http://jlongster.github.io/nunjucks/templating.html
[regular expressions so complex that they've taken on a life of their own]: https://github.com/olado/doT/blob/master/doT.js#L15
[Jison parser tricks]: https://github.com/wycats/handlebars.js/blob/master/src/handlebars.l#L31-L50
[transparency]: http://leonidas.github.io/transparency/
[pure]: http://beebole.com/pure/
[domjs]: https://github.com/medikoo/domjs
[DOMBars]: https://github.com/blakeembrey/dombars
[HTMLBars]: https://github.com/tildeio/htmlbars
[the source on Github]: https://github.com/lazd/DOMly
[handles feature]: https://github.com/lazd/DOMly#handlehandlename
[quirksmode: innerHTML]: http://www.quirksmode.org/dom/innerhtml.html
[V8 crankshaft]: http://blog.chromium.org/2010/12/new-crankshaft-for-v8.html
[webkit patch for 82201]: https://bugs.webkit.org/show_bug.cgi?id=82201
[benchmarks on jsPerf]: http://jsperf.com/domly-vs-the-world
[cloneNode vs createElement vs innerHTML]: http://jsperf.com/clonenode-vs-createelement-performance/32
