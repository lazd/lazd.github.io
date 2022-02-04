{
  title: "Gamepad enhancements in yquake2",
    description: 'Getting better control with a little math and a little UI',
    date: "2020-12-12",
    tags: [
        'gaming',
        'programming',
        'retro computing'
    ],
    image: "<div class='fullMast' style='background-image: url(images/yquake2.png);'></div>"
}

A recent obsession with retro gaming on Raspberry Pi using [RetroPie](https://retropie.org.uk/) led me to play through a few old favorites, starting of course with Wolfenstein 3D (and my subsequent work on [Splitwolf](./splitwolf-split-screen-wolfenstien-3d-on-raspberry-pi.html)).

After making my way through history with Doom and Quake I, it was only natural that I load up Quake II...

## A bug right out of the gate

RetroPie ships with support for the yquake2 engine, so it was easy to get up and running. However, I found moving the sticks made my head spin uncontrollably in circles! After a little poking around, I realized yquake2 was interpreting gamepad input as both joystick and mouse events. I found that setting the `sensitivity` cvar to `0` fixed it, but realized there was no way to set it to `0` using the UI.

Time to fork and clone! A [one line fix](https://github.com/yquake2/yquake2/pull/632/commits/693803c7640708c7a2da27d9119c44f48c593d38) made it possible to use the sliders in the UI to set `sensitivity` to `0`.

## Stick feel is everything

Once I got the controls working, I found that gamepad aiming didn't have a precise feel like I was used to in modern shooters. From my experience with FPV drones, I knew that a little "expo" can go a long way.

"Expo" makes gamepad stick input non-linear, such that small movements on the stick are less pronounced. This enables both precise and fast movements, even at higher sensitivity levels, and is part of the reason why gamepad controls in modern shooters feel more precise. It's called expo because it simply raises the gamepad input value to the specified power, or exponent.

The value of a joystick axis is a floating point number between `0` and `1`. Linear joystick input with no expo results in a graph that looks like this:

<figure>
  <img src="images/yquake2-graph-linear.jpg" alt='Linear gamepad input'>
  <figcaption>Linear gamepad input</figcaption>
</figure>

However, if we apply some expo, say `2`, we get a graph that looks more like this:

<figure>
  <img src="images/yquake2-graph-exponential.jpg" alt='Exponential gamepad input'>
  <figcaption>Exponential gamepad input</figcaption>
</figure>

This means small joystick inputs result in _very_ small movements, but slamming the stick all the way still results in the same movement as without any expo at all. Just by looking at the graphs, you can tell how this will help make aiming on a gamepad way more precise.

With this in mind, I set about adding a new cvar, `joy_expo`, with a default value of `2`. With the new cvar, it was simple to [apply `joy_expo` to gamepad input](https://github.com/yquake2/yquake2/pull/632/commits/aafc2eb4f92693aee0fe0e14fd33c6f28f160c33).

## UI is... also everything

Expo made aiming feel quite a bit better, but I needed to tweak a few more settings to get it dialed in. I realized the gamepad controls in yquake2 could only be customized by manually setting cvars in the console, which means quick changes aren't quick and easy.

I set about adding a new menu in the yquake2 UI to enable customizing yaw, pitch, forward, side, and up sensitivity -- and of course, expo. I also took the opportunity to move the haptic controls to the same submenu, bringing everything together in one place.

In old game engines, this usually involves manually calculating the position of controls -- there's no layout system, so you increment a variable like `y` to store where the next control in the UI is drawn. It's no flexbox, but it gets the job done, and after a little tinkering, I got a nice menu system in place:

<figure>
  <img src="images/yquake2-menu.jpg" alt='yquake2 "customize joystick" menu'>
  <figcaption>yquake2 "customize joystick" menu</figcaption>
</figure>

## Fork it, push it, quick PR it

With all these changes in place on my local branch, the next step was to [send a pull request](https://github.com/yquake2/yquake2/pull/632). After a little insight from a fellow contributor, everything was buttoned up and ready to ship.

In the next release of yquake2, I was happy to find my changes released, and I hope others have found that it enhanced their retro Quake II experience just as much as it did for me.
