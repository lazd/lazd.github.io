{
  title: "Macinpi: A new old computer",
  description: 'A friend-shaped, portable "Mac Classic" built with love and spare parts.',
  date: "2022-2-1",
  tags: [
      'retro computing',
      'hardware',
      'raspberry pi',
      'macintosh'
  ],
  imageURL: 'images/macinpi.png',
  image: "<div class='fullMastWide' style='background-image: url(images/macinpi.png);'></div>"
}

<img class="prettyPicture" src="images/macinpi-side.jpg" alt="Macinpi in the garden">

My first truly personal computer -- not the family computer, but _mine_ -- was a Macintosh SE. My Aunt Joanie gifted it to me after upgrading to a PowerMac, and though it was already 10 years old, it was brand new to 10 year old me.

Coming from DOS machines, the elegance and simplicity of the Macintosh completely enthralled me. There was no `autoexec.bat`, no `config.sys`, no SoundBlaster and no IRQs to set. You flip a switch and it _just worked_.

And the interface, wow. You were greeted by a friendly chime and the happiest little face on the happiest little computer every time you turned it on. Everything was where you thought it should be. The dialog boxes were helpful, the icons friendly, and the applications simple, yet powerful. The Macintosh hooked me right away, and I used it _constantly_.

My little machine that could do tricks. I power it on. It smiles. I smile.

I collected software, arranged my icons, dragged and resized windows in the Finder so they opened just a couple pixels under one another, fixed it, broke it, and fixed it again. I played games on it, scanned pictures, used Graphic Converter and BBEdit, created MOD music. It was my escape from reality, where I could control everything and get lost in a world of creativity. Where I could design a house, then fly a paper airplane through it. A portal to another world.

I visited my first website on a Macintosh. I _wrote_ my first website on a Macintosh.

<hr>

Fast forward 25 years.

I'm back home during the COVID-19 pandemic, and life is complicated, scary. America is divided. Friends are getting sick, and family members have passed away. Nostalgia for a simpler time is strong.

I've pulled out all my old Macintoshes, my old disks. The same ones 12 year old me had in plastic disk folio when a bully pushed me over, causing them to spill on the steps of the portable classroom. Simpler times, maybe, but not perfect.

But I have my little escape. My little [Performa 200](https://everymac.com/systems/apple/mac_performa/specs/mac_performa_200.html) (aka Mac Classic II). A black and white, 9" display. A clicky mechanical keyboard. One mouse button.

I plug it in. I power it on. Checkerboard background, a sign of damaged components.

I clean the electrolytic capacitor juice off the components with isopropyl. I replace the PRAM battery [with a fresh 14250 cell](https://amzn.to/3rjI7QG). It was old, but luckily hadn't ruptured.

I power it on. A question mark blinks inside of a disk icon.

I remove the cover from the hard drive, exposing its platters. I flick the drive's magnetic head to get it going again. It's old and not moving like it used to.

I power it on. It smiles. I smile. A long lost friend.

I back up its hard drive using an external SCSI enclosure and another, internet-connected Mac. I back up every single floppy disk from the plastic disk folio. Every byte of data I could read, I saved. All my old high scores. My collection of MOD music. My earliest essays and short stories.

I relive the experience of it all. I relive the wonder. I'm taken back to a time when a black and white screen could show you all the color in the world, as long as you used your imagination.

As old hardware begins to fail and spare parts become scarce, pieces of the experience fall away. It's not the same to use old software on a sleek, new MacBook; the feeling just isn't there. 

I never want to lose the ability to go back to that time when things were simpler, to feel the wonder I felt when I was a kid, so I built Macinpi; a new computer with the charm of an old computer, and a few new tricks behind its screen.

## Hardware

No working computers were gutted in the making of this machine. Some of the pieces were leftover bits from someone else's simpler time, some new.

### Case

It started with the case. Amidst a pile of computer parts -- buyer must take all -- a Macintosh Classic case. It was in pretty decent condition with a working fan, and it had only a handful of scuffs and scars.

<figure>
  <img src="images/macinpi-pile-of-computers.jpg" alt="An empty Mac Classic case admist a pile of computers">
  <figcaption>Spotted! An empty Mac Classic case</figcaption>
</figure>

I asked about it. Why just the case? What happened to the rest? The owner explains an Amiga fell on the picture tube, crushing it. The motherboard was donated, the last missing piece to someone else's Classic. The power supply board was sold and shipped, bringing another Mac back to life. They can't find the screws or the cover for the display adjustments, but it's mine for $10 -- and a classic double from Arby's, if it's not too much trouble.

So I drop off the Arby's, send my $10, and pick up the case.

It's very friend-shaped; it just needs something to fill the hole where its display used to be.

### Display

I think this little computer deserves a little color in its life. It's got a rainbow logo on the front of it after all, certainly black and white wouldn't suit it.

I choose the [Pimoroni 10" display](https://shop.pimoroni.com/products/hdmi-10-lcd-screen-kit-1024x768) after seeing that it fit the front bezel perfectly [in PepPi's build](https://forums.raspberrypi.com/viewtopic.php?t=306474), and was wide enough that no ugly bezels would be visible. And the wiring is clean, I like that. $99 later, it starts to look like a computer again.

<figure>
  <img src="images/macinpi-pimoroni-display.jpg" alt='Pimoroni 10" display'>
  <figcaption>Pimoroni 10" display</figcaption>
</figure>

### CPU

There's a [Raspberry Pi 4 2GB](https://amzn.to/3om7gYV) lying around I had bought to build another RetroPie box with. $45, at at the time at least. It would plug right into the display, and with an emulator, could paint a smile on the screen and load all the my old Mac applications.

Perfect.

<figure>
  <img src="images/macinpi-raspberry-pi4.jpg" alt='Raspberry Pi 4'>
  <figcaption>Raspberry Pi 4</figcaption>
</figure>

### Keyboard & Mouse

An [Apple Adjustable Mechanical Keyboard](https://en.wikipedia.org/wiki/Apple_Adjustable_Keyboard) popped up on Craigslist. It's missing the numeric keypad, but who needs that? I chat with the seller for over an hour. We talk about everything from space exploration, to forgotten anniversaries, to what it was like for him growing up in Compton as a black man in the 70s. We shake hands. $100.

<figure>
  <img src="images/macinpi-keyboard.jpg" alt="Apple Adjustable Keyboard">
  <figcaption>Apple Adjustable Keyboard</figcaption>
</figure>

I have an Apple mouse from the old days, just one button, rectangular and angular.

But these won't work with the Pi, they don't have USB, but ADB (Apple Desktop Bus), Apple's proprietary serial connector.

[TMK](https://github.com/tmk/tmk_keyboard) with [adb_usb](https://github.com/tmk/tmk_keyboard/tree/master/converter/adb_usb) on an old [Arduino Pro Micro clone](https://amzn.to/3rmDnJU) is the answer. I [download](http://www.tmk-kbd.com/tmk_keyboard/editor/unimap/?adb_usb_rev1) and [flash](https://deskthority.net/viewtopic.php?f=7&t=8448&start=) the firmware. I pull a 1kΩ resistor from my electronics box. 10 year old me categorized it wrong, or maybe it slipped under the dividers in the drawers, but I found it. An old s-video cable, which has the same 4 pin mini-DIN connector as ADB, is chopped up [and wired in according to the schematic](https://geekhack.org/index.php?topic=14290.0). Everything works the first try, $5 later.

<figure>
  <img src="images/macinpi-adb2usb.jpg" alt="ADB2USB using an Arduino Pro Micro Clone">
  <figcaption>ADB2USB using an Arduino Pro Micro Clone</figcaption>
</figure>

### Connectivity

The vacant holes on the rear of the machine where the old ports used to be need to be put to good use. A friend of mine helps me weld a steel plate back there, I trace out holes crudely with a pencil, make a few markings, drill a few holes, and route out some ports with my Dremel.

2x [panel mount USB-A 3.0](https://amzn.to/3unrLsb). 1x [panel mount USB-C](https://amzn.to/3gnn5dH). 1x [panel mount 4 pin mini-DIN](https://www.ebay.com/itm/274516442073). Some M2 and M3 screws.

$30 or so.

<figure>
  <img src="images/macinpi-ports.jpg" alt="Rear ports">
  <figcaption>Rear ports</figcaption>
</figure>

A little bit of trimming, and it fit nicely in the case. The Performa's power button happened to be exactly the same size as the headphone port, so I slid it over the switch and glued it into place.

<figure>
  <img src="images/macinpi-rear.jpg" alt="Rear ports">
  <figcaption>Connectivity, right where it used to be</figcaption>
</figure>

### Supporting electronics

Though I can power the display directly from the Pi, adding any other peripherals means the voltage begins to drop and the Pi flashes its little yellow lightning bolt.

A [USB-C PD trigger](https://amzn.to/34uZAwm) lets me use any decent USB-C power supply, such as a MacBook charger, and get a solid 9V 3A out of it. 5 for $10, so $2. Now I can power that fan!

But the Pi needs power too. [Pololu 5V 5A regulator](https://amzn.to/3Hqcvys) to the rescue. It's not cheap, but it's quality and will provide plenty of clean power. $25.

An old Quadra 610 case in the attic provides the speaker. I harvest its power button as well, maybe it'll come in handy. $0.

<figure>
  <img src="images/macinpi-speaker.jpg" alt="The speaker, shoved into the air intake">
  <figcaption>The speaker, shoved into the air intake</figcaption>
</figure>

A Raspberry Pi can't drive a speaker directly. It needs an amplifier. A [3-12V mono LM316 amplifier module](https://amzn.to/3Go6lxi), two for $9, will do the trick nicely. $4.50.

But since the amplifier and fan are powered from 9V, they stay on when the Pi shuts down. We'll have to fix this.

After a little lesson on basic electrical engineering from some new friends on Discord, a schematic is drawn up. A [100kΩ resistor](https://amzn.to/3HsvVTa) takes the Pi's 3.3V signal to a [2N3904 NPN transistor](https://amzn.to/3LgUGUW), [1N4007 flyback diode](https://amzn.to/3oHrRYb), and a [470µF 35V filter capacitor](https://amzn.to/3AWPrVr) that bring the fan to life when the Pi powers up.

<figure>
  <img src="images/macinpi-fan-schematic.jpg" alt="Fan schematic">
  <figcaption>Fan schematic</figcaption>
</figure>

Two 1.2kΩ resistors help me [combine the left and right stereo channels into a single mono signal](https://electronics.stackexchange.com/questions/549289/why-are-two-1-k%CE%A9-resistors-used-for-this-additive-stereo-to-mono-conversion-fo), and a 2N3904 NPN/2N3906 PNP transistor stack with a 1kΩ resistor between them switches the positive of the amplifier when the Pi comes on, because the Pi's headphone ground keeps the amp on if we try to switch the negative using a single NPN.

<figure>
  <img src="images/macinpi-amp-schematic.jpg" alt="Amplifier schematic">
  <figcaption>Amplifier schematic</figcaption>
</figure>

All of this is placed on a [prototype PCB](https://amzn.to/3rmmLSA), with a mess of jumper wires underneath, acting as traces.

<figure>
  <img src="images/macinpi-pcb.jpg" alt="Complete Macinpi board">
  <figcaption>Complete Macinpi board</figcaption>
</figure>

A momentary switch is wired between the Pi's `GLOBAL_EN` and `J2` pins to [reset the Pi from a halted state](https://forums.raspberrypi.com/viewtopic.php?f=29&t=24682&p=1491661&hilit=GLOBAL_EN#p1491661).

The hardware is ready.

<figure>
  <img src="images/macinpi-inside.jpg" alt="Macinpi internals">
  <figcaption>Macinpi internals</figcaption>
</figure>

## Software

I start with a GUI-free [Raspberry Pi OS Lite image](https://www.raspberrypi.com/software/operating-systems/#raspberry-pi-os-32-bit) on a [32GB SD card](https://amzn.to/3sdqrFB).

The display has a 1024ⅹ768 resolution, and its 10" display is larger than the hole in the front of the case. To correct this, I arrive at 928ⅹ672 with 48 left and right overscan, 32 top, and 64 bottom to get it fitting nicely. I edit these values into `/boot/config.txt`. The display is perfectly centered and has just the right amount of black border around the edges.

I [compile Basilisk II without X11](https://djdarien.github.io/macpi/). I set the resolution and upload a disk image with System 7.5.3 and my backed up files.

I add [`initiramfs-splash`](https://forums.raspberrypi.com/viewtopic.php?t=276545) to show a [happy Mac start up screen](images/macsplash.png) the second the machine powers up. I `touch .hushlogin` and `sudo truncate -s 0 /etc/motd` to quiet things down.

<figure>
  <img src="images/macinpi-smiles.jpg" alt="It smiles">
  <figcaption>It smiles</figcaption>
</figure>

I make sure to [set `POWER_OFF_ON_HALT=1` in the EEPROM configuration](https://www.raspberrypi.com/documentation/computers/raspberry-pi.html#updating-the-eeprom-configuration) so it shuts down completely when its off, instead of entering a low-power mode.

Autologin takes me straight to a shell, and `.bashrc` takes it from there. `aplay` plays a familiar chime, and `BasiliskII` launches.

## Macinpi lives

It's a sunny winter afternoon. I plug in [a USB-C PD powerbank](https://amzn.to/34ipKmi) and take it outside. I sit at the table in the memorial garden I built for my mom. I remember simpler times.

I power it on. All my old files are there. My old games. My old high scores. The first short stories I ever wrote. My MOD music.

It smiles. I smile.

<img class="prettyPicture" src="images/macinpi-in-the-garden.jpg" alt="Macinpi in the garden">

<hr>

## Parts list

* System
  * [Raspberry Pi 4 2GB](https://amzn.to/3om7gYV)
  * [Pimoroni 10" display](https://shop.pimoroni.com/products/hdmi-10-lcd-screen-kit-1024x768)
  * [Arduino Pro Micro clone for TMK adb_usb](https://amzn.to/3rmDnJU)
* Panel connectors
  * [USB-A 3.0](https://amzn.to/3unrLsb)
  * [USB-C](https://amzn.to/3gnn5dH)
  * [4 pin mini-DIN](https://www.ebay.com/itm/274516442073)
* Control and power supply board
  * [Prototype PCB](https://amzn.to/3rmmLSA)
  * [LM316 Audio amplifier module](https://amzn.to/3Go6lxi)
  * [1kΩ, 1.2kΩ, 100kΩ Resistors](https://amzn.to/3HsvVTa)
  * [2N3904/2N3906 Transistors](https://amzn.to/3LgUGUW)
  * [1N4007 Diode](https://amzn.to/3oHrRYb)
  * [Capacitor](https://amzn.to/3AWPrVr)

## Scripts and config files

See [lazd/macinpi](https://github.com/lazd/macinpi) for the scripts and config files I used to build Basilisk and configure the system.
