>> WILLIAM LIGHT: So about two hours ago, hi to patch my presentation software because it wasn't working.
We're going to hope everything holding it.
My name is will.
My background is ins C.
Lo level stuff.
You probably don't know anything about me but if you do, it's because of this thing right here.
This is a monup grid 28.
I've been developing and maintaining the drivers for this for the past 5 years.
We're talking about drivers today.
Normally, when people been drivers, they think about drivers and the driver handles low level details of hardware and it hosts up to a higher level of abstraction.
Presenting some sort of protocol by thes from some source.
And then translates to into a high level inner face a lot of time keyboard or mouse will send some bites and kernel will interpret it and output it on the input subsystem if we're talking about Linux.
The benefit here, of course is that you can abstract away some of the underlying transport.
US BS2 track pad.
Whatever.
But drivers don't have to exist in the cerne.
We're going took talking about drivers and unit space.
Still doing rough lite same thing, but since we're if user space, we don't have to worry about causing kernel panics.
We don't have to worry about breaking the system if we happen to hit a South East g fault which we won't be doing today.
The performance is absolutely lower.
We can't dip in and do real-time stuff.
We need to move a lot of audio, for example, that's kind of my background.
That's going to be a little more difficult tow D.
but we don't have quite as steep a leadership curve.
So we're going to be writation user space driver for this thing right here.
A native instruments machine micro mark 2.
It has these 16 pressure-sensitive Pats here for like, finger drumming, tough like that.

A bunch of buttons, screen, everything lights up.
So this is kind of purpose-built hardware.
Service shift solve software, and I don't have any cuter that is do windos or MAC.
So I wanted to figure our how to make it work.
First we're going to cover the table of contents, materially.
We're going to figure out how to reverse fortunately this thing.
We're going to write the driver and then we're going to kind of revisit, and see how far we have come and how much we have grown as people.
Let's touch on the concept of USB interface devices.
USB is a fairly complex protocol.
We're just moving bites around.
So human interface devices.
Vee communicate via reports just a message.
I snagged this one from a USB mouse.
So the first bite is called the report number, basically, just a message I.D.
so in the case of mice, report number 0 is motion.
Report number one is left button then it goes from there.
And the rest are just bites.
So human interface devices class specify what each of these bites are for much so in the caves bite.
X displacement, Y displatement and I don't know what the fourth one is for.
Linux cerne doesn't seem to know either.
So we don't have to care about that.
USB HID devices can be raw.
So I'm really rushing through this right now.
I thought this was going to take longer beautiful okay.
We're on a behind California.
Get us back on track.
So a number of different ways we can reverse engineer T.
there's the easy but complete way.
We can get slightly Dodgy.
Look at way professionals do it and look at kind of a really fun hat I didn't know you could do.
So the easy way to do this, is we're going to create a little Rust Bridge program that, just opens the device and dumps data from it and then we're going to fidel around with the device and see what device comes out.
We're going on use NIX want this is low level any way.
We're going to read bites off the report.
The rest of the bites, and then so we're going to have some very bountiful output here because that is the wrong monitor.
So here's what our device lookses like when we open tup.
This caught me by surprise.
You'll notice F we start pressing down whoa get some of these bites that start to change.
And you now, as we go down the line.
This has a whole bump of lights on on it.
The method I use, which I don't necessarily recommend because I don't know how well hardware will deal with it.
You throw as much data as you can.
When I ran this, all the lights lit up.
I was like, all right.
Cool.
So we're done here.
And then, I literally, just put a sleep in, and I had it next to my computer.
I would run T.
when the lights came Oi'd stop it is there, and restart it and just narrow it down.
I found out afterwards, during USB enumeration, HID devices are required to specify what respects they receive and how long the report S.
that's note as much fun.
So let's just do it this way.
But if you remember, there's a screen here and we're not likely to figure out how to run that, just by throwing bites at it.
So let's move on.

By citing more proper methods of reversing.
Proper translates to expensive.
This is USB1.
This is USB2.
And this is USB3.
From what I understand, total phase, which makes the eagle.
These are top of the line products and they're fantastic.
But that, I'm not going to drop, you know, we only need this one.
So we only need to drop 1400.
I don't have that for a weekend project.
This is like, 300.
So, really what we need, we need a computer that communicates with a device, using the official software and we need some way of sniffing T.
since we live in the future.
We can run a computer inside of our computer, and man in the middle USB connection from there.
So that's exactly what we're going to do.
We're going to open up a windows VM virtual box and then we're anything to do this move.
Linux is a Colonel interface that lets you tap each individual USB bus, using wire shark.

[Laughter]

I'm serious.
I'm serious.
I took these screen shots on Thursday.
I just made a filter, I guess protection so we can make sure we have goat the right one.
And let's go back and take a look at this.
So this is what the button many looks like.
Every time you press a button, it Sundays you a bit map with each button being one bit then it just communicates the whole state at one time.
We can go and locate that.
So here's USB if.
Wire shark doesn't decode the HID pay load itself.
But as you can see, 01, BOO6.
It's ate a little different.
O1B80 womp we have got the 84 there.
I wassing to lipping a button on and off want we get the same one here.
And then what we need is we need the response to this, lights up the button from the official software, and here, we have it.
Then we have okay one and unfortunately, the light I want is obscured by this seam in the screen.
But can you see, we have got that on and off.
So let's just pretend that we have gone throughout rest of these steps and we have reconstructed the messages we need to know to the device and let's get on to the actual driver.

The inputs and outputs, we're going to be listening to a UDP socket.
There's this open sound control protocol that's used for like, be spoke interfaces between multiI media software and hardware.
Then the outputs are, we're going to send MIDI.
Super old school communication between sequenceers and synthesizers, and then it just got used on computers because it was there.
And we've been stuck with it every since.
Output MIDIand output C.
Quick not on OSC, it is absolutely resty looking but the serial formation is, it's really cool, it just kind of sucks as interprocess communication, which seems to be all that but anybody ever uses it for.
You use what you have.



So let's start building the driver.
Let's revisit, opening the devices.
So we're hoping our HID device and using stock standard net UDP socket.
And then we're going to dip into 96 and construct a pole loop.
So this is one of my first things about doing this on Linux.
In the beginning, I said shift a driver are f are that blinky box thing.
That runs on MAC OS and Linux, it's so natural to wait on multiple types of file descripters, in the same pole call.
So here, we're going to be pole polling over a raw HID device and raw UDCP socket.
We're also going to construct a timer here, because we don't want to send LED responses to the device quite so fast.
We end up kind of overloading it and things start to lag and it's not as much fun.
Pretty straightforward.
Pole-type loop here so can I leave it here and everything else is protocol-specific.
But I thought that was going to take 5 minutes longer so I'll get into talking about buttons.
There are a couple of alrhythms I stumbled on upon here.
Since we have a bit map of buttons and we just need to know what's set and what's not in each button report.
I have kind a look up array here trailing zeros, can I use that to skip through a bit field and find all of the 1's.
If there are no 1's, if guff just got 0's in the bit field it becomes a no-opF.
you ever need to cache the dirty state of a set, if you can stuff it into a bit field, you can trail 0's, find the 1, trailing 0 after the accident find the 1, trailing 0's, find the 1.



The pads are a little bit more complicated.
We just get raw pressure value from the device.
And even worse than that it's not debounced very L.
I'm just going to start up the actual program I used here.
Cool.
So now, we have got the actual program.
Can you kind of see it lighting up a little bit.
If I shake it around a lot.
And it's difficult to see if this light.
If you shake it around.
Can you see, these are very sense tive pads so we have to do some sort of filtering of the data, in order to work with it.
When you think about this from a pliability perspective.
As a finger programmer, trying to program beats.
You're going to want to set a threshold.
You obviously, don't want a step to trigger if you press it too lightly.
And then you want a pretty decent pressure gradient, up to the maxxum that you're going to touch.
And linear exponential.
That's usually, configurable.
So what I ended up doing and reason I've implemented it the way that I did.
I wanted to make it so that if you pressed two faintly, you couldn't trigger a note by pressing layer.
Even if you press too faintly, and you press harder, it still tracks that.
So we end up with the threshold state and otherwise, we end up in the press the above threshold state and we send a mini-after touch, which is kind of inside of a note, can you vary the pressure up and down.



Let's see.
That's just about that there.
So future work.
There's this screen on it and I figured out how to make it worth I ended up Dutching protocol.
This picture is a die issue the program that's put on there is written in C.
So yeah, bring it.
Come on.
Come on.

I'm good.
I wanted to do this in Rust.
But I wanted to have like a nice graphics APIfor doing that.

I looked at GFRX.
So I couldn't find one that had a backing store.
I could draw lines and accomplice stuff O.
so I gave up and put it on the back burner.
So I'll pick that up at some point.
So some parting thoughts.
There's actually, so, besides the low-level binding to the Linux mini-sequenceer interface.
There's one block of unsafe code in this entire user space driver.
Because I was too lazy, I just wanted to take this.
If you remember when we saw that huge block of pressure values, they're little Indian U-16's so I'll treat 'em like T.
too lazy.
I know they're slice Friday all parts but Wyatt the time.
So I kind of left this in.
So something originally, I was using Amayo for this, I figured it would Abe good chance to get a feel for the Rust Bridge asynch landscape.
When I upgrated and rewrote the API, I got an additional 15 to 25 seconds of latency, this could be a problem for these type of applications.
10 millisecond citizen maximum you can have for a person to consider the response to be action as being the same action.
Beyond 10 milliseconds, you can perceive the delay.
And really, you want close tore 5-7 milliseconds.
I haven't measured how quickly the pad reports come in, but I've ballparked T but you know, one, to two, to three milliseconds.
So having an additional 15 to 25 seconds of latency is kind of unacceptable.
I reported the bug, they thought it was because of TCP node alay.
I don't know, something to continue investigating I'm sure.



So I wanted to come back it this.
Can I do a retrospent specksive of the code.
The driver is called serial osque.
It's actually a USB serial device, and outputs open sound control, kind of bidirectionally, and you write application that is consume and produce open sound control.
So when I originally wrote this I used the low level, loop primitives for all the operative systems.
I was using pole on Linux, collect on OS10.
Wondering why didn't I just use poll on both.
On Linux, you can't select on a USB serial device and on OS10, you can't pole on one.
Welcome to cross platform low-level programming.



About a year and a half ago, I tried to factor this.
And it worked fine on Linux and broke entirely on windows and OS10.
And if you're going to be writing code at this level.
I think that it pace off to actually know it is API's that you're sitting on top of.
I went and took a look.
Serial osqu is code -- most of the platform is windows, of course, the most special of all of the platforms.
And then there's not actually a whole a lot code for Darwin and Linux.
It just comes down to if the code breaks on an OS update or in somebody's special case, it's one thing to be able to go to MIOand, you you know, file a report and drill down.
But if you're shipping production software, that kind of, that bug has to stop with you.
Basically, I think much the hard part is not writing the code.
The hard part is understanding the underlying API's and documentation can be sparse sometimes.
I believe that is all that I have prepared want for ya'll.

[Applause].

So yeah, first talk.
I think we may have time for questions for once.
Do we if.

>> This is the first, I wasn't prepared for this.

Yes, we do have time for questions.

[Laughter]

[Applause].

I am recently on the job market.
So looking for cool projects.
Come see pee, I'll be around.
Also, while I have you all here, there's a particular RFC, allows field and traits and values can we please have this? Can we please have this.
Police.
I bolted single inheritance on to C and don't want to olt Bolton it on to Rust as well.

Okay am cool.
Questions now?

>> RYAN: We have time.

>> WILLIAM LIGHT: We have time.

>> AUDIENCE MEMBER: User space, except for easier development?



>> WILLIAM LIGHT: Well, so two reasons.
 A, there was no real reason to do it in kernel space.
There's a previous generation of this device, was not just -- so it was vepdor-specific entirely.
It wasn't like a human interface device.
It was vendor specific and I would have had to use lib USB.
And that's his own special brand of hatred.
That's in the Linux Colonel now, which is cool.
But yeah.
A, there was no real reason to do that and B, one of the things it is create a network socket so program consist communicate with it.
I don't feel like loading a Colonel module should open up some user, and then have you to deal with, how do you set the port.
For me, Colonel module shouldn't be opening up network ports.
That speaks to their not being the right Colonel interface for that, I suppose.
In the case of the mononly stuff.
The reason yet user space is so we can standardize on one API across platforms.
There's a port running.
You you communicate with it that way.
Can you run the same application on windows mac or Linux.
So that's why user space.
If that makes sense.
Does that make sense? Okay .
cool.
Any other questions? are we set if 'sup, Tim? I'm chillin'.
You know.



>> AUDIENCE MEMBER: Do you think Rust is a good language or environment for writing future sinsizeer drivers or pad drivers, and do you think it would be easy for someone to pick up a different brand of pad and start trying to write a driver for T.
are we going to see a renaissance in Rust of these drivers?



>> WILLIAM LIGHT: L here's the thing.
 It's been a while in the consumer interface, since I've seen a piece of input hardware, that's really vendor-specific and kind of locked down.
Usually F you go out and buy a mouse or keyboard.
You plug it in with your machine and it's going to work.
As you get to more niche areas like production, they'll have these custom controller type things or 3D modeling, there's all of these really specific pieces of hardware and I think that people should be able to crack those open and do whatever they want to with them.
Things really important.
And that's why I had so much content dedicated to find a USB device and here's how can you figure out what it's doing.
I would like for more people to do it in Rust, and that's why I'm giving talk here.
While lib UV and MIO, Crone if this is necessarily their foreat a and if they should be dealing with this low-level thing.
I know there's a Lib UV, Dev type of handle.
But I think there's an Avenue here to maybe start building libraries, crates to, do this on a more cross platform base.
I think there's an opportunity to open up some hardware.
If that makes sense.
Thank you.
Pleasure to be here.
