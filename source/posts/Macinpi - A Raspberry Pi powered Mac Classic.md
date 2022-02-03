{
  title: "Macinpi: A Raspberry Pi based Mac",
    description: 'A friend-shaped, portable Mac built with love and spare parts.',
    date: "2022-2-1",
    tags: [
        'retro computing',
        'hardware',
        'raspberry pi',
        'macintosh'
    ],
    image: "<div class='fullMastWide' style='background-image: url(images/macinpi.png);'></div>"
}

My first truly personal computer -- not the family computer, but _mine_ -- was a Macintosh SE. My Aunt Joanie gifted it to me after upgrading, and though it was already 10 years old, it was amazing to 10 year old me.

Coming from DOS machines, the elegence and simplicity of the Macintosh really enthralled me. There was no `autoexec.bat`, no `config.sys`, no SoundBlaster and no IRQs to set. You flip a switch and it _just worked_.

And the interface, wow. You were greeted by a friendly chime and the happiest little face on the happiest little computer every time you turned it on. Everything was where you thought it should be. The dialog boxes were helpful, the icons friendly, and the applications simple, yet powerful. The Macintosh hooked me right away, and I used it _constantly_.

My little machine that could do tricks. I power it on. It smiles. I smile.

I collected software, customized everything, arranged my icons, dragged and resized my windows so they opened just a couple pixels under one another, fixed it, broke it, and fixed it again. I played games on it, scanned pictures, used Graphic Converter and BBEdit, created MOD music. It was my escape from reality, where I could control everything and get lost in a world of creativity. Where I could design a house, then fly a paper airplane through it. A portal to another world.

I loaded my first webpage on a Macintosh. I _wrote_ my first webpage on a Macintosh.

Fast forward 25 years.

I'm back home during the COVID-19 pandemic, and life is complicated, scary. America is divided. War with Russia looms. The stock market crashes. Family members die. Nostalgia for a simpler time is strong.

I've pulled out all my old Macintoshes, my old disks. The same disks I had in a plastic disk folio in 6th grade when a bully pushed me over, causing them to spill on the steps of the portable. Simpler times, maybe, but not perfect.

But I have my little escape. My little Performa 200 (aka Mac Classic II). A black and white, 9" display. A clicky mechanical keyboard. One mouse button.

I plug it in. I power it on. Checkerboard background. A sign of damaged components.

I clean the electrolytic capacitor juice off the components with isopropyl. I remove the PRAM battery; swollen, but not yet ruptured.

I power it on. A question mark blinks in a disk icon.

I remove the screws from the hard drive, flicking the drive's head to get it going again. It's old and not moving like it used to.

I power it on. It smiles. I smile. A long lost friend.

I back up its hard drive using an external SCSI enclosure and a PowerBook 1400C with PCMCIA ethernet card. I back up every single floppy disk from the plastic disk folio. Every byte of data I could read, I saved. All my old high scores. My collection of MOD music. My earliest essays and short stories.

I relive the experience of it all. I relive the wonder. I'm taken back to a time when a black and white screen could show you all the color in the world, as long as you had your imagination.

I never want to lose the ability to go back there. To that time, when things were simpler. Not perfect, but simpler.

So I built Macinpi.

## Hardware

Some of the pieces were leftover bits from someone else's simpler time, some new. No Macs were unceremoniously gutted in the making of this machine.

### Case

It started with the case. Amidst a pile of computer parts -- buyer must take all -- a Macintosh Classic case. It was in pretty decent condition with a working fan, and it had only a handful of scuffs and scars.

I asked about it. Why just the case? What happened to the rest? The owner explains an Amiga fell on the picture tube, crushing it. The motherboad was donated, the last missing piece to someone else's Classic. The power supply board was sold and shipped, bringing another Mac back to life. He can't find the screws or the cover for the monitor adjustments, but it's mine for $10 -- and a classic double from Arby's, if it's not too much trouble.

So I dropped off the Arby's, sent my $10, and picked up the case.

It was very friend shaped, it just needed something to fill that hole in the front where its monitor used to be.

### Display

I thought this little computer deserved a little color in its life. It's got a rainbow logo on the front of it afterall, certainly black and white wouldn't suit it.

I chose the Pimoroni 10" display after seeing that it fit the front bezel perfectly, and was wide enough that no ugly bezels would be visible. And the wiring is clean, I like that. $99 later, things are taking shape.


### Computer

I had a Raspberry Pi 4 2GB lying around I had bought to build another RetroPie box with. $45. It would plug right into the display, and coupled with an emulator, could paint a smile on the screen and load all the old applications.

Perfect.

### Keyboard

An Apple Adjustable Mechanical Keyboard popped up on Craigslist. It's missing the numpad, but who needs that? I chat with the seller for over an hour. We talk about everything from space exploration, to forgotten anniversaries, to what it was like growing up in Compton as a black man in the 70s. We shake hands. $100.

But this won't work with the Pi, it's far too old and has the ADB (Apple Desktop Bus) connector on it.

TMK on an old Arduino Pro Micro clone is the answer. I pull a 1k ohm resistor from my electronics box. 10 year old me categorized it wrong, or maybe it slipped under the dividers in the drawers, but I found it. An old s-video cable, which has the same 4 pin mini DIN connector as ADB, is chopped up and soldered in. Everything works the first try, $5 later.

### Sound

An old Quadra 610 case in the rafters provides the speaker. I harvest its power button as well, maybe it'll come in handy. $0.

### Connectivity

The vacant holes on the rear of the machine where the old ports used to be need to be put to good use. A friend of mine helps me weld a steel plate back there, I trace out holes crudly with a pencil, make a few markings, drill a few holes, and route out some ports with my Dremel.

2x USB-A 3. 1x USB-C. 1x ADB.

$25.

### Supporting electronics

Though I can power the display directly from the Pi, adding much more means the voltage begins to drop and the Pi flashes its little yellow lightning bolt.

A USB-C PD trigger lets me use any decent USB-C power supply, such as a MacBook charger, and get a solid 9V 15A out of it. 5 for $10, so $2. Now I can power that fan!

But the Pi needs power too. Pololu to the rescue, with a 5V 5A regulator. It's not cheap, but it's quality and will provide plenty of clean power. $25.

A Raspberry Pi can't drive a speaker directly. It needs an amplifier. A 5-12V mono LM316 module is available, two for $9. $4.50.

But the amplifier is mono, the Pi is stereo. Since they're powered from 9V, the fan and the amplifier stay on when the Pi shuts down.

After a little lesson on basic electrical engineering from some new friends on Discord, a schematic is drawn up. A 100k ohm resisitor takes the Pi's 3.3v signal to a NPN transistor, flyback diode, and a filter capacitor that bring the fan to life when the Pi powers up.

Two 1.2k ohm resisitors help me combine the left and right stereo channels into a single mono signal, and a PNP/NPN stack switches the positive of the amplifier when the Pi comes on, because the Pi's headphone ground keeps the amp on if we try to switch the negative using a single NPN.

All of this is thrown on a prototype PCB, with a mess of jumper wires underneath, acting as traces.

A power switch is wired between the Pi's `GLOBAL_EN` as `J2` pins.

## Macinpi lives

Starting with a Raspbian Lite image, the software starts to take shape. I compile Basilisk II without X11. I tweak settings until it have it working right.

The Pimoroni has a 1024x768 10" display, and I arrive at 928x672 with 48 left and right overscan, 32 top, and 64 bottom. The display is perfectly centered and uses just the right amount of that empty space in the case.

I add `initiramfs-fb` to show a happy Mac icon the second the machine powers up.

I make sure to set `POWER_OFF_ON_HALT=1` in the EEPROM configuration so it shuts down completely when its off, instead of entering a low-power mode.

Autologin takes me straight to a shell, and `.bashrc` takes it from there. `aplay` plays a familiar chime, and `BasiliskII` launches.

All my old files are there. My old games. My old high scores. The first short stories I ever wrote. My MOD music.

I plug in a USB-C powerbank and take it outside. I sit at the table in the memorial garden I built for my mom.

I remember simpler times. I press the power switch. It smiles. I smile.
