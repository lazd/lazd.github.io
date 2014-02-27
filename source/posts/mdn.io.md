{
    title: "mdn.io - Passive URL shortening for MDN",
    description: "The \"I'm feeling lucky\" URL shortener for the Mozilla Developer Network",
    date: "2013-8-13",
    tags: [
        'resources',
        'javascript',
        'node.js'
    ],
    image: '<div class="fullMast" style="background-image: url(images/mdn_promo.png); padding-top: 0.625rem"><button class="button red">I\'m feeling MDNy</button></div>'
}

<img src="/images/mdn.png" class="left" alt="MDN" style="width: 128px">
Whenever you need to look something up on the [Mozilla Developer Network], you usually end up typing something like `mdn defineproperty` into the search bar and clicking the first link.

We've taken that already simple process and made it simpler with mdn.io, the "I'm feeling lucky" URL shortener for MDN.

<div class="clear"></div>

## How do I use it?

Simply type something like this in your address bar:

> <a href="http://mdn.io/defineproperty" target="_blank">mdn.io/defineproperty</a>

You can even include spaces:

> <a href="http://mdn.io/css%20transitions" target="_blank">mdn.io/css transitions</a>

Or hashes:

> <a href="http://mdn.io/array#Methods_of_Array_instances" target="_blank">mdn.io/array#Methods_of_Array_instances</a>


## Why?

MDN URLs are quite long:

> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#Methods_of_Array_instances

We needed a way to keep them short so they could be directly included in places we would otherwise say "search for ____."

### Code reviews
Let's say you're doing a code review and you need to link a peer to the documentation for the Array object:

```
// Array has an inbuilt forEach method, see mdn.io/array
```

### Comments
If you're writing JavaScript code that relies on some interesting in-built functionality others aren't familar with, it might be helpful to link to the documentation for it:


```
// See mdn.io/defineproperty
Object.defineProperty(obj, 'constant', {
	writeable: false,
	enumerable: true
})
```

### Common questions
Sometimes you just get asked the same question so many times you wish your chat client would auto-reply with the URL to the FM:

> **friend:** hey dude, is it call or apply that takes an array?

> **you:** RTFM mdn.io/apply


## What is this sorcery?

mdn.io isn't *really* a URL shortener. There's no need to create an entry for each page you want to link to; mdn.io simply redirects to a Google "I'm feeling lucky" search for your query + `site:developer.mozilla.org`, which in turn redirects you to the first result.

Simple and hands off, like it should be. Check out [the source on Github] for more details.


## A big thanks

[Blake Embrey](http://blakeembrey.me/) and I collaborated on this project and he continues to support it by hosting mdn.io. Thanks, Blake!<br>


[the source on Github]: https://github.com/lazd/mdn.io
[Mozilla Developer Network]: https://developer.mozilla.org/en-US/docs/Web/JavaScript
