{
	title: "And so it began",
    description: 'We all started somewhere. This is where I started.',
    date: "2013-7-1",
    tags: [
        'programming',
        'commodore',
        'c64',
        'basic'
    ],
    imageURL: 'images/commodore.png',
    imageAlt: 'A BASIC program written on a Commodore 64',
    image: '<pre class="code c64 c64_width animate noMargin small">\
<div class="center">\
**** COMMODORE 64 BASIC V2 ****\n\
64K RAM SYSTEM  38911 BASIC BYTES FREE</div>\
READY.\n\n\
10 PRINT "LARRY"\n\
20 GOTO 10\n\
RUN\
<span class="c64_cursor"></span>\
</pre>'
}

I turned the knob to channel 4 and flicked the switch to `ON`. A  blue screen faded in as the old Zenith TV warmed up.

<pre class="code c64 c64_width fade animate">
<div class="center">
**** COMMODORE 64 BASIC V2 ****
64K RAM SYSTEM  38911 BASIC BYTES FREE</div>
READY.
<span class="c64_cursor"></span>
</pre>

A white block blinked below.

I picked up [the book][1]. It was spiral bound with a colorful cardboard cover decorated with graphs and a photo of the machine. It looked a bit cheesy even to my 10-year-old self, but I was curious and itching to learn what it had to offer.

I leafed through the pages. `PRINT`, `GOTO`, `BASIC`. It was Greek to me, but there was a section in black and white that looked like a screenshot. I carefully typed the contents, substituting my name for the text between the quotes.

<pre class="code c64 c64_width">
10 PRINT "LARRY"
20 GOTO 10
RUN
</pre>

I pressed `RETURN` eagerly. The screen filled with my name as the machine executed the first computer program I ever wrote.

<pre class="code c64 c64_width">
LARRY
LARRY
LARRY
LARRY
LARRY
LARRY
LARRY
LARRY
LARRY
LARRY
LARRY
LARRY
LARRY
LARRY
LARRY
LARRY
LARRY
LARRY
LARRY
LARRY
LARRY
LARRY
LARRY
LARRY
<span class="c64_flash">LARRY</span>
</pre>

All I had really done was instruct the computer to print <code>LARRY</code> in an infinite loop, but I felt empowered. It was as if I could instruct this little machine to work miracles and it would instantly oblige, in capital letters, of course.

That book had opened the door to a new world. I pressed the `RUN/STOP` key.

<pre class="code c64 c64_width animate">
BREAK IN 10
READY.
<span class="c64_cursor"></span>
</pre>

A white block blinked below. And so it began.

<hr>

Flip a switch and start coding. Using a computer meant writing code, and a casual user could become a hobbyist programmer in an afternoon with no additional equipment or materials.

As computing became more common place, graphical user interfaces gave us clickable icons in place of the commands we used to type. Computing became accessible to everyone as the workings of the machine were hidden by layer upon layer of abstraction. This transformation was amazing and beautiful, but it came at a cost: The machine transformed from a playground that encouraged tinkering to an appliance that forbade it.

Eventually, computers began to ship with no development environment and no casual path for a user to transition to a hobbyist.

## The renaissance

JavaScript is everywhere. Nearly every device we own is capable of running human-readable JavaScript code. Hit Command + Option + i *right now* and you'll drop to the console. Type this and hit enter:

```javascript
alert('Hello world!');
```

You just wrote your first computer program.

Things are different now. You won't have to leaf through the dusty pages of an old spiral bound user's guide. Thousands of tutorials and resources are available for free, and you have the most powerful knowledge search system mankind has ever created beneath your fingertips, ready to find them.

Your journey begins <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide" target="_blank">here</a>.

[1]: http://www.commodore.ca/manuals/c64_users_guide/c64-users_guide.htm
