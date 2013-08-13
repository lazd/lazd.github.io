{
    title: "Scaleable interfaces with rem units",
    description: "Responsively re-size your entire interface with a single value.",
    date: "2013-8-10",
    tags: [
        'css3',
        'mobile'
    ],
    image: '<div style="width: 100%; height: 100%; background-size: 100% auto; background-image: url(images/scales.jpg);" class="vCenter"><div id="resize">\
    <button class="button red large" id="decrease">-</button>\
    <div id="pagePixelSize">16px</div>\
    <button class="button red large" id="increase">+</button>\
    </div>\
    </div>\
    <script>\
    var fontSize = 16;\
    function setSize(amount) {\
        fontSize = (fontSize+amount);\
        document.getElementById("pagePixelSize").innerHTML=fontSize+"px";\
        document.querySelector("html").style.fontSize = fontSize+"px";\
    }\
    document.getElementById("resize").addEventListener("click", function(e) { e.preventDefault(); e.stopPropagation(); return false; }, false);\
    document.getElementById("increase").addEventListener("click", function(e) { setSize(2);\
    }, false);\
    document.getElementById("decrease").addEventListener("click", function(e) { setSize(-2);\
    }, false);\
</script>'
}

## What are rem units?

According to [W3 candidate reccomendation][rem spec], one root elastic measurement (rem) unit is equal to the `font-size` of the `<html>` element ([spec]).

## Hello rem

Let's say you've defined the `font-size` of the `<html>` element as 16 pixels, and you want a 32 pixel tall `<header>`. Basic math tells us that's 2 rem.

```
html {
    font-size: 16px;
}

header {
    height: 2rem;
}
```

## Wait, how is that different from em?

Elastic measurement units cascade ([em spec]), whereas root elastic measurement units are always relative to the root element.


## Why should we do this again?

If you have a need to dynamically scale your interface, in part or in whole, with absolute precision, rems can be useful.

1. **A mobile interface that targets iPad Mini** - You may want a slightly larger interface for the oddly sized iPad Mini display
2. **User preferences for the size of the site** - You could provide a preference to increase the size of your site for a given user across all their devices
3. **You just want things a tad bigger** - If your designers say "make everything 2 pixels bigger," you're gonna have a bad time, unlesss you're using rem units


## Execution

### But fractions are hard, what if I want 9 pixels?

If you're using a CSS preprocessor, which you should be, it's easy to create a variable that represents a pixel:

### Stylus

```
// The smallest size we want to support
$baseSize = 16

// The size of a "pixel" based on the smallest size
$px = 1 / $baseSize + 0rem

// The size of a pixel when the font-size is 1rem
$vpx = 1 / $baseSize + 0em
```

## Where you should still use px

You'll want to specify the `font-size` of the `<html>` element in pixels, but there are a few cases where you might want to use pixels elsewhere in your CSS.

* As the distance for `text-shadow` when used for a beveled effect
    * Generally, this effect looks bad for > 1px
* Elements that you do not want to scale with the rest of the page
    * Maybe you want the fine print to stay fine
    * I really can't think of a great example here

## Where you should still use em

If you want the flexibility of resizing a particular widget independently of the rest of the page, you should use a mix of em and rem:

```
button {
    font-size: 1rem;
    margin: 0.5em;
    border: 0.0625em;
    padding: 0.25em 0.75em;
}
```

Then, to make a large button:

```
button.large {
    font-size: 1.5rem;
}
```

The rest of the properties, specified in em units, will scale to be 50% larger.


## Compatibility

Where rems don't work:

 * IE 8
 * iOS 3
 * Safari 4

That said, all modern browsers support rem units. See the [caniuse tables][rem compatibilty] for details.

### Fallbacks

You can specify units in pixels above if you'd like support for older browsers (minus the scalability):

```css
width: 16px;
width: 1rem;
```

## Try it

This blog is built using rem units; click the buttons below to given rems a try.

<div id="resize">
    <button class="button large" id="decrease">-</button>
    <div id="pagePixelSize">16px</div>
    <button class="button large" id="increase">+</button>
</div>
<script>
    var fontSize = 16;
    function setSize(amount) {
        fontSize = (fontSize+amount);
        document.getElementById("pagePixelSize").innerHTML=fontSize+"px";
        document.querySelector("html").style.fontSize = fontSize+"px";
    }
    document.getElementById("resize").addEventListener("click", function(e) { e.preventDefault(); e.stopPropagation(); return false; }, false);
    document.getElementById("increase").addEventListener("click", function(e) { setSize(2);
    }, false);
    document.getElementById("decrease").addEventListener("click", function(e) { setSize(-2);
    }, false);
</script>

[em spec]: http://www.w3.org/TR/css3-values/#em-unit
[rem spec]: http://www.w3.org/TR/css3-values/#rem-unit
[rem compatibilty]: http://caniuse.com/#search=rem
