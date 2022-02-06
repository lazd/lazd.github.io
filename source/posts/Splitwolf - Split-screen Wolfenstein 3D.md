{
  title: "Split-screen Wolfenstein 3D on RetroPi",
  description: "Splitwolf on RetroPie lets you kill Nazis with your friends!",
  date: "2019-1-24",
  tags: [
      'gaming',
      'raspberry pi',
      'programming',
      'retro computing'
  ],
  image: "<div class='fullMast' style='background-image: url(images/splitwolf.png);'></div>"
}

Wolfenstein was the first 3D game I ever played, and of course, the first FPS I ever played. I fondly remember going upstairs and booting up DOS on our old 386. I'd type `wolf`, and after a few seconds and a couple memory checks, I'd be greeted with that triumphant, patriotic, MIDI theme song.

<figure>
  <img src="images/wolf3d-startscreen.png" alt="Wolf3D start screen" onmouseover="music.play()" onmouseout="music.pause()">
  <figcaption>
    Wolf3D start screen<br>
    <audio id="music" controls src="images/wolf3d-horst-wessel-lied.mp3"></audio>
  </figcaption>
</figure>

I'd press the any key to continue and select `Bring 'em, on`, then instantly be launched into an exciting 3D world unlike anything I'd ever seen.

I remember spending hours as a kid finding my way through the mazes of Castle Wolfenstein, pushing against walls to find secrets and trying to beat bosses. Sure, I was young and it was violent for the time, but you get to kill Hitler, and killing Nazis is an all-ages activity.

<figure>
  <img src="images/wolf3d-hitler.jpg" alt="The only good Nazi is a dead Nazi">
  <figcaption>The only good Nazi is a dead Nazi</figcaption>
</figure>

But you couldn't play it with friends, like Super Mario Brothers and Sonic the Hedgehog. My friends and I would take turns, switching off after every level or death, cooperatively making our way through Castle Wolfenstein, hunting down Hitler and his goons. Though this was fun, and left plenty of time for snacking while the other person played, it was a "multiplayer" experience that could be improved upon.

## The RetroPie Renaissance

I've often gone back and replayed old games, but when I found [RetroPie](https://retropie.org.uk/), it was like I was a kid all over again. I could play anything, all the games I fondly remembered, and some I never got to play. Everything from any platform, with any release date.

Naturally I installed Wolfenstein, bought a [copy of the game on Steam](https://store.steampowered.com/app/2270/Wolfenstein_3D/) to get the full game files, and loaded it up.

Though the keyboard controls worked exactly how I remembered them, the gamepad controls left a lot to be desired. First, there was no way to bind strafe to an axis -- the control stick could only rotate you.

Additionally, when moving with the stick, it was all or nothing. Wolfenstein was designed in an era when gamepads only had a D-pad, and that meant pushing the stick forward on a modern gamepad just moved you forward at full speed. There's no way to creep up behind Nazis real slow and stab them in the back, which of course, is a hard requirement.

Next, there was no way to bind more than 4 buttons on the gamepad. Modern gamepads have tons of buttons, and using trigger to shoot and L1/R1 to cycle through weapons was a must. Again, because Wolfenstein was released when the Gravis Gamepad was the only option around, assumptions were made about the number of possible buttons.

But Wolfenstein's source code has been released to the public, certainly I could fix all of this and have the awesome, Wolf3D experience with modern gamepad controls, right? I had found [a thread showing how to manually remap game controllers in Wolf4SDL](https://retropie.org.uk/forum/topic/8695/wolfenstein3d-wolf4sdl-remapping), so it must be possible!

## Let's fork it!

The [Wolf4SDL](https://github.com/11001011101001011/Wolf4SDL) project uses the modern SDL library to draw to the screen, get user input, etc. This made it a great candidate to base my work off of. However, it used the older SDL1 library, which doesn't have great support for gamepads. I looked around a bit and saw ichera had moved things over to SDL2 [in a branch on Bitbucket](https://bitbucket.org/ichera/wolf4sdl/src/sdl2/), so I [forked that and started in](https://github.com/lazd/wolf4sdl/commits/sdl2remap).

After a [little cleanup](https://github.com/lazd/wolf4sdl/commit/82ee70f94679272784e6f5cd401d6ff0d817ded1) and instructing [the linker to use sdl2](https://github.com/lazd/wolf4sdl/commit/5507123f21fce0666b3a36f74ff0e106cb0cdde6), I had it launching.

The next step was easy -- I simply [hardcoded the controls I wanted](https://github.com/lazd/wolf4sdl/commit/2ea4cd4f63aa628f3343d4aeed23025c34e87218) into the game code, and I was off and away! Wolf3d with modern FPS controls, woohoo!

But of course I couldn't stop there, it would feel incomplete to leave this hardcoded. I [made it possible to remap all the buttons](https://github.com/lazd/wolf4sdl/commit/2a245e784bd4470808b15734e9a8718eec6b2dd4), and also added [support for mapping pause, escape, previous weapon, and next weapon.](https://github.com/lazd/wolf4sdl/commit/ffe416de74a5ccdf01682d0d0a0d6b7024cbf928)

<figure>
  <img src="images/wolf3d-gamepad-customization.png" alt="Gamepad mapping UI">
  <figcaption>Gamepad mapping UI</figcaption>
</figure>

Next, it was back to menu code to add support for [customizing gamepad sensitivity](https://github.com/lazd/wolf4sdl/commit/77207ebdc25d8216dc323d182f350b8a07af1283). Working on old video game codebases is a trip; there's no layout engine, so you're left to position controls, handle state, and even play menuing sounds all manually within your code. Coming from the world of web development where layout is a core and automatic aspect, this manual way of drawing controls is a bit tedious, but presents a fun challenge and makes building UI feel quite rewarding.

<figure>
  <img src="images/wolf3d-gamepad-sensitivity.png" alt="Gamepad sensitivity UI">
  <figcaption>Gamepad sensitivity UI</figcaption>
</figure>

After a few fixes for things I broke along the way, I wondered -- could I add support for any gamepad, not just the XBox controller I was using? A quick google found [SDL_GameControllerDB](https://github.com/gabomdq/SDL_GameControllerDB), a community sourced database of game controller mappings. [Adding this in](https://github.com/lazd/wolf4sdl/commit/0aa465768d4b53a2bbb30a1d0202bb78294eb216) made all the other gamepads I tried instantly work, except those with only one stick. A [quick fix](https://github.com/lazd/wolf4sdl/commit/090c8438a81aa6189ab9b34356ce00d5fb79ef09) that checks how many axes the controller has and maps accordingly got things working nicely, even on my old NES USB controller, ironically the thing that most closely resembles the good old Gravis Gamepad.

I added a menu option to [disable moving with the mouse](https://github.com/lazd/wolf4sdl/commit/e54d9320bf41d81c9947e0e5bbda9728db90f2d6) and [the ability to bind strafe left/right and previous/next weapon on the keyboard](https://github.com/lazd/wolf4sdl/commit/2035f7c0dfe80ed5f3158561c90a018f72d40b38) and called it done!

<figure>
  <img src="images/wolf3d-keyboard-customization.png" alt="Keyboard mapping UI">
  <figcaption>Keyboard mapping UI</figcaption>
</figure>

But it doesn't stop there, didn't I mention Splitwolf?

## Making it multiplayer

While surfing the web and looking for others that had worked on Wolf4SDL on RetroPie, I found [this thread on the TeamRaycast development forum](http://raycast.teamforum.ru/viewtopic.php?f=8&t=952&st=0&sk=t&sd=a&hilit=lazd), discussing how it's not possible to remap controllers to do things as simple as exit the game in Wolf4SDL. I [posted back](http://raycast.teamforum.ru/viewtopic.php?p=32486#p32486) with a link to my code, showing how I got controller support working for Wolf4SDL, but then I saw another reply:

> linuxwolf wrote:
>
> It would be cool if SplitWolf worked with two separate controllers.

What's Splitwolf?!

## Splitwolf

Splitwolf is a modification of the Wolf4SDL codebase that effectively makes Wolfenstein 3D a split-screen multiplayer co-op game. If you dig into how it was done, [it's absolutely magical](https://bitbucket.org/linuxwolf6/splitwolf/src/f6c00044cdef00a31c66307d8b7cb1fb4ddf8c67/wl_game.cpp#lines-1614:1617). The original structure of the code was kept intact, but [methods were added](https://bitbucket.org/linuxwolf6/splitwolf/src/scrubbed/id_lwmp.cpp) that allow routines to be ran multiple times for each player, and code to stitch it all together was layered on top. Other features were added as well; the menu system was modified to allow customization of controls for multiple players, a map was added showing the location of the other players you're playing with, and of course the ability to draw the other player(s).

<figure>
  <img src="images/splitwolf-map.png" alt="Splitwolf map">
  <figcaption>Splitwolf map</figcaption>
</figure>

But it doesn't stop there. Splitwolf adds several new gamemodes like Capture the Flag, Instagib, Defuse, and more, as well as respawn, new gore, and even TANKS. There's tons of new art to support all of this, and even new weapons.

<figure>
  <img src="images/splitwolf-tank.png" alt="Splitwolf tank">
  <figcaption>Splitwolf tank</figcaption>
</figure>

After seeing everything Splitwolf had to offer, I posted back and asked for a link to the code, promising I could make this work with multiple controllers. linuxwolf replied with [the Bitbucket repository](https://bitbucket.org/linuxwolf6/splitwolf/src/scrubbed/) and this message:

> linuxwolf wrote:
>
> You're about to make wolf3d history if you manage to pull this off.

## Bring it on!

DoomJedi is a master pixel artist from Israel, responsible for the art necessary to make Splitwolf work. Things like new player sprites so you can view BJ from the side, the gore, weapons, the vehicles, etc. linuxwolf is a clever and talented programmer from Australia, responsible for not only the magic that makes Splitwolf even work, but the code that layers on the new game modes, respawn, the HUD -- everything. 

Me? I'm just here to kill Nazis on my couch with an XBox controller.

So I got to work. After a bit of a struggle getting things to run and [a fight with gdb on macOS](http://raycast.teamforum.ru/viewtopic.php?p=32496#p32496), I got Splitwolf up and running. There were [a segfaults right off the bat](http://raycast.teamforum.ru/viewtopic.php?p=32497#p32497) that luckily, all had to do with controls and were fixed by [remapping things to use the right scan names for SDL](https://bitbucket.org/lazd/split_wolf4sdl_pr/commits/69b1fa65f098a9732515d282d23e258517720a1f).

Since I'd already been in the code, it was pretty easy to get [get things working on SDL2](https://bitbucket.org/lazd/split_wolf4sdl_pr/commits/940bacf363a3b6106b01c953981779154b018a87), and I started pulling in changes from the other repository, making rapid progress.

I fixed up a little menu code along the way, and got the basics up and running. We started to collaborate on discord, working out details and fixing issues as they came up. Internet magic made it possible for 3 people all thousands of miles away from each other to collaborate in real time. I learned things along the way, both by reading linuxwolf's code and asking questions, and DoomJedi was there every step of the way to test, give direction, and provide art as needed.

Everything was working, and we even fixed a couple bugs along the way. The next step was to make it turnkey in RetroPie.

<figure>
  <img src="images/splitwolf-deployable.png" alt="Dead Nazi and deployable machine gun">
  <figcaption>O-o-o-overkill</figcaption>
</figure>

## Make it RetroPie-ready

RetroPie uses a collection of shell scripts to download, compile, and install games. This streamlines the usual step-by-step how tos into a one-click, turnkey operation that makes it accessible to anyone. RetroPie is the perfect platform for a game like Splitwolf to be distributed, so now we just had to write a little bash.

Because there are so many versions of Wolfenstein, from different publishers to different missions, it's necessary to match on the MD5 sum of the game files, choosing the correct binary to launch based on which game is to be played. Luckily, this technique was already implemented in [the Wolf4SDL port](https://github.com/RetroPie/RetroPie-Setup/blob/master/scriptmodules/ports/wolf4sdl.sh), so it was easy enough to do the same thing.

With [the script ready](https://github.com/RetroPie/RetroPie-Setup/blob/master/scriptmodules/ports/splitwolf.sh), I sent [the pull request](https://github.com/RetroPie/RetroPie-Setup/pull/2532).

This was most definitely not the easy part. joolswills of RetroPie is a master of all things shell script, and my code was not up to snuff. We went back and forth for over a month, with joolswilis requesting several changes to [share code with the Wolf4SDL script](https://github.com/RetroPie/RetroPie-Setup/pull/2532#issuecomment-440711782), correct [issues with how I handled variables in bash](https://github.com/RetroPie/RetroPie-Setup/pull/2532#discussion_r235546122), and [change the way we installed binaries](https://github.com/RetroPie/RetroPie-Setup/pull/2532#issuecomment-440873665).

In the process, I modified the Wolf4SDL port to download the Spear of Destiny demo files, and exposed a `add_ports_wolf4sdl` function so I could [share code between the two ports](https://github.com/RetroPie/RetroPie-Setup/pull/2532#issuecomment-439535347). Their data files should live in the same place, after all, so it was natural to share the install code.

I had to go deep into bash, and joolswilis wanted everything to be done right. I learned quite a bit, and in mid-January, a full 2 months and 59 comments later, the script was finally merged and released in [Version 4.5 on July 3rd, 2019](https://retropie.org.uk/docs/Changelogs/#version-45-july-3-2019). 

<figure>
  <img src="images/splitwolf-doublebj.png" alt="The more BJs, the better">
  <figcaption>The more BJs, the better</figcaption>
</figure>

## Ready to kill Nazis with your friends?

If you already own Wolf3D or Spear of Destiny, dump all the files directly into `roms/ports/wolf3d/` (no sub-folders), then:

1. Run RetroPie Setup
2. Select "Update RetroPie-Setup Script"
3. Select "Manage Packages"
4. Select "Manage experimental Packages"
5. Select "splitwolf"
6. Select "Install from Binary"

Then get in there and waste some Nazi scum with your friends!

<center>
<iframe width="560" height="315" src="https://www.youtube.com/embed/DOBheJbU9fk?start=46" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</center>

See [the thread on the RetroPie forum for more details](https://retropie.org.uk/forum/topic/20976/splitwolf-2-4-player-co-op-wolfenstein-3d-on-retropie/2).

## Credits

None of this would be possible without the hard work of the following people:

* **Multiplayer framework, new game modes**: LinuxWolf
* **Gamepad support, configuration UI, and RetroPie implementation**: lazd
* **Additional art**: DoomJedi, Untrustable, Atina, PSTrooper, ArmanAhmadi
* **Title Screen**: Atina
* **Title Screen Font**: Tormentor667
* **SDL Port**: [Moritz "Ripper" Kroll](http://www.chaos-software.de.vu)
* **SDL2 Update**: Ioan Chera
* **Original Wolfenstein 3D**: id Software (http://www.idsoftware.com)
* **RetroPie**: Jools Wills (@BuZz) and the rest of the RetroPie contributors
