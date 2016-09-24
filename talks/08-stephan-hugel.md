>> STEPHAN HUGEL: So sorry about this, everyone.
(Pause).

Yes, okay.
I think it's working.
Okay.
Hello, everyone.
It's lovely to be here.
As Ryan said, this is my first-ever talk about programming, and you are my first-ever actual real develop audience and so try to go easy on me.

-

[Applause].



>> STEPHAN HUGEL: And so I'm just going to start off with a little bit about me.
I'm a fourth-year Ph.D.
student.
I should not be here.
I should be writing somewhere.
I mostly work on something called smart cities, which is a terrible concept about making cities better with technology.
I'm sort of interesting about write birthday history and policy that shapes them, the future and I'm note a programmer.
Programming is not my job.
I have an English degree.
Do I data analysis and visualization as a kind of productive procrastination because of where I work.
I work play lap and everyone I work with is a physics Ph.D.
or an architect.
So you get sucked into things by virtue of being there.
I work on Python, Matplotlib, and I make a lot of maps, and this is the cycle analysis in London and some very basics special analysis.
More lovely Data Viz and this is a prom, a colleague, this is building the London as tweets arrive from those buildings.
So that problems is the thing that actually, that's kind of the reason I'm here today.
And I suppose, before I say anything else, I should say, I planned to transcribe my slides into German, but unfortunately ...



[Laughter]



I'm really, really sorry.
I know.
I probably found that so much funnier than any of you.
Okay.
So, why Rust?
I came to Rust by a series of weird coincidences.
I had a friend that worked at Mozilla.
And he tweeted about it, and it in a interstated way and this new thing called Rust, it's going to be really great and that was 5 years ago, the day Rust appeared, when it was, you know, unrecognizable to what it is today.
I lookedda at it, didn't understand anything about it and I've gone on with my life until last year.
So last year I went on holiday, it was also very boring.
It was also great.
And I thought, I'll have a look at this and see what it looks like.
And it looked wonderful, obviously, I don't need to sell you on it.
You're here.
And so when I came back thirty one.
I thought, okay.
What is the best way to teach yourself anything pick something you actually want to do and work on it.
As I said, one of the things I do is work with maps a lot.
We're going to find out about those in a second.
And there's really an excellent tool for converting.
It's called PROJ.4.
And it's been around since the 80's.
The first realty + was 90 19New Mexico it's really high quality library, really well-mained and there's a python wrapper which is really fast.
It's wonderful.
So I decided, can I write something that's as fast because Rust is excellent.
Something can you easily achieve.
And I was very wrong.
But not to worry.
Okay.
So I'm going to just briefly, talk about coordinate reference systems and so a coordinate reference system is a way of describing location on the planet Earth.
They have two components.
They have got a datum and the actual coordinate system.
The datum describes how the reference is related to the physical Earth.
So you've got a position of the recently, a scale factor and a Geoid.
Which is this, it's kind of an idealized representation of the Earth.
And coordinate system describes how the coordinates are expressed.
They can be expressed in Cartesian coordinates.
So have you Lambda u and u.
And projected coordinates in transes verse -- and so the big reference system that is used everywhere is WGS 84.
Everyone uselesses it for everything now.
Datum is a point of the center of the Earth want that's where all its coordinates are measured from.
And they have reckoned they have got it correct to within one meter.
I use the WGS 84Ellipsoid.
It's the only reliable way to do T.
it's designed to be Globally consis within one meter.
It covers the entire Earth.
And can give you an accurate position.
GPS can't, but the system, mathematically can.
There's an off shoot, ETRS 89.
It's mostly used for surveying in Europe.



[Laughter]



There's a historical reason for this.
And so the U.K.
uses something called "The National Grid" and use coordinates OSGB36.
The 36 comes from the year that someone first invented it, so there was no GBS36.

So the national "Gridiron Gang" is used on UK maps and shaped files what suicided for making maps.



It's not actually Airy, the ellipseid here.
It's called an Airyellipsoid.
It's named after this incredible math my metations,.

So WGBS is great.
Malicious the sea level more accurately.
Which is agreement you have an Ecoordinate and an N coordinate.
In order to transform between EG WGBS34 and OSGB36.
You need three things.
The data can differ in three ways.
The position of the origin can differ.
The orientation of the coordinate axes can differ and size and shape of the reference ellipsoid can deliver and thus, we're not going to dwell on T.
can you avoid the trick iest one.
If you convert all of your coordinates to 3D Cartesian coordinates and it's reasonably forward straightforward to do this mathematically.
There's a link to the equation at the end you need 3 parameters to describe a 3D translation.
Three parameters to describe the 3D rotation between the coordinations of the coordinate axes and you also need a scale factor.
The whole thing can be bundled up into a linear formula that looks like this.
And so if you imagine that here, A, X1, this is your X can coordinate.
This is your Y coordinate and altitude we're not going to worry about that at all.
So can you basically plug your 6, your 7 values in here.
And do some fairly straightforward.
Matrix algebra, and you're done.
This is the last one of these, by the way, and that slide is not supposed to go there.
And I'm going to give this talk at the flat Earth society next week.

[Laughter]

[Applause].



It's going to be next week is going to be much, much shorter as can you imagine.
Okay.
Any way, the thing to note here, essentially, the whole coordinate transforms to one piece of linear algebra, with seven terms, it's quite straightforward and you're kind of done am the problem S when you carry out that conversion, you introduce error into your coordinates and it can be up to three meters a coordinate that you got off your mobile phone will only guarantee to be abrate within 15-meters so it's no big deal.
And if you happen to be using differential GPS.
You see them on both.
It's like a large professional GPS.
You can get all the way down to 10-centimeters, which is really good, it's also not good for surveying.
In the U.K.
usurp vague carried out, using the GBS36 system.
So they need aid way to very, very accurately, transform within WGS34 and OSGB36.
And they have dreamed up a transform that is accurate between 1.1-millimeters, which is more accuracy than you need B.
it's good enough.
Up in the last week, there was only one.
OST02.
And as of last one, they announced a new one, OSTN 15.



These are so-called, riber sheet transforms which means they can operate in 3 dimensions.
Can you have a longitude shift, latitude shift and a height shift.
Essentially, what it is.
It's a bilinear transformation, using a grid shift.
So have you huge amount of the physical measurements of how you correct like, the wrong inaccurate result of your matrix algebra and that gives you the correct coordinate.
Last week, [indiscernible] was 15.
Which works the same way.
But it's accurate due to the measurements.
So how does the transform work?
You go from W SH to -- have you error in your transformation.
You get your grid shift parameters for the kilometer grid you happen to be in.
Then you [indiscernible] your turblation, and that give us you your precise card nates and add those on to your [indiscernible] coordinates.
And you have accord fates.
So on to the actual Rust.
I managed to write the initial initial conversion in Rust on my own.
It's literally, a set of transformations.
Can you do it in any programming language.
You can do in paper.
But I have no idea how FFI works.
Stack over flow.
Hello, I want to know how I can transform, you know, an array of point by leads.
I want to interface, please.
I got this like, incredibly thorough and wonderful succinct answer.
I don't remember but they're incredible and thank you if you get the audience to remember this.
So essentially, what you got is, you've got a C compatible instruct called array.
It's got the data, and it's got the the number of values and then you've got a float -- and we have got something that converts incoming FFI values into a slice.
And then, we have also something that converts going factors of transform values back into a void pointer.
So that's back and now, we have got a function to drop this.
So you've got an incoming transformation ad going, and dropping again.
That's how do you FFI in Rust.



So the implementation of the actual transform was really easy.
Nothing Rust-specific about it so I'm not going to dwell on it and there's a coordinates check to make sure you haven't given it a longitude and latitude outside of the transformation.
This transformation only works for the U.K.
If you use value that is way offshore, it won't work right.
So have you to have that in the chain.
And the look-up was fairly straightforward at the time.
I decided if anything went wrong, rather than trying to deal with T I'd just return a man value.
They're easy to check for F.
you give the transform like, 10 coordinates and coordinate number 7, it's easy to check for.
So I just kind of left it.
Another thing I found, while I was doing it.
This is like this wonderful crate called terrible lent and for those of us who are not mathematically inclined, obviously when you're doing felting point operations, it's easy to get a little wrong.
And multiplying like a tiny value by large value.
Suddenly, nothing works anymore.
So the University of Washington wrote this, it's a tanned-alone tool and one I rather excellently posted and the quiet version.
And it will look at your code, and tell look at any floating point operations in your code that are potentially unstable and it will suggest improvements.
And it's really, really useful because it's quick.
You have to switch it's okay.
It's kind of like a floating [indiscernible]



So then the next step is integrating the actual accurate adjustments.
There are 876,000 and each adjustment is three point float values.
[indiscernible] value and other altitude value which we don't care about.
It exists.
At the time, they're in sequel I.D.
so that was not going to be quick enough because you know, if you need convert a million values, you can't be doing a million calls.
I mean, you can and it's not super slow.
But it's also not as fast as I wanted.
After stack over flow.
Excellent.
So for those I don't know, PHF give ace compile time static maps.
It's got a really, really easy example, which I copied word for word, basically.
And there is a binding for us.
[indiscernible] QLS and I tried to build.
It took like two thundershowers build on this thing and took another two hours to compile.
Move all that stuff into a crate and never worry about it again.
Test once and compile quickly.
So the O ST02PF equation is available on caring O.
if case anyone need T.
it's good to know tait's there.
Back to my primary concern here, I want this to be fast.
And so this would being like, July or August last year accident, I guess.
There was no sign of cross [indiscernible] at this point.



I managed over a space of days, write this horrendously all of function, which takes in two slices, combines them into a vector thens yes, a vector -- I'm sorry.
I'm like, reliving things dilast year and it's really uncomfortable.
And it goes on and on and on.
And this is the non-scope thread so you've got this thing here.
You've got to move and reallocate.
You're finally getting to happen your element here so needless to say, this is not great.
It worked.
Don't get me wrong.
This is like, you write the thing, and if the compiler doesn't crash, it's probably working.
I was like, extremely proud of myself.
But it just is not great.
We have hire coded the number of threads.
Casting back and forth between floats.
And then you're calling to own on the thing and it's allocating again and there's obstruction code in there.
I know.
I know.
It was a long time ago.
And someone read T.
why are you [indiscernible].
Just like, forego all this.
That's good advice.
And I put my Rust coat away, and went and tried finish my Ph.D.
for okay 6 months.
Then I had some time over Christmas.
Okay.
Let's see if we can do better.
In ababstract sort of way, we have a sequence of values.
Eastern or northern values the length of sequence isn't going to change, we're just transforming them.
And type of values isn't going to change.
I read this back, and it says, please carry out all operations until the precision floating point.
It's F64N -- 64 end, but that's fine.
So the solution, we just use mutable slices and also, some time has past.
Threading libraries exist.
And also, we can be generic in terms of our threat dysfunction.
So we can write a function that exempts, two sequences of mutually barrowed 64 values and we can pass in a function that implements copy traits.
Just keeps the compiler happy.
I figured this out, by the way, leaving them out then compiling.
No, you need to have a could you please.
I was like, okay.
Cool.
But copying.
No, you need to have send.



So you put those two traits in your function definition, use it the sequences together.
If you imagine you've got sequence of longitudes and latitudes and really, what you want is kind of one of each to give you a point, and so you've got to zip them together.
Split the rut into mute I can't believe chunks so&those chunks retain actual coordinates.
For each chunk, apply the conversion funk, and then you're done.
This has a nice slide effect.
I was able to make the library, much cleaner.
So you have a function for each type of conversion.
So WGS84, to OSGP36.
Come back again.
And then you can define an FFI funk for each of the top level and move everything into his own maddual.
We have got conversions, which is where all the boring mats are.
FFI module and then we have got Lib where the top level generics live.
And we have got utilities, other boring stuff.
So interlude.
It took me a long time to figure out the chunks and chunks trend slices.
Tack me days.
I know I had to do this.
This is what it looked like when I was writing down in my notebook.
This is totally wrong.
What do you get back when you called churches.
Low and behold, it was a slice.



This predictive clarity and momentum P.R.
which altered two words and it got instantly emerged.
So thank you, Steve F you're here somewhere.
So on to the fancy threat of function.
Take 2.
Now, we have got a lifetime specifyer.
We'll talk about that in a second.
We have got our function here.
I'm going to give you back the result.
And implement copy.
And then, I work at how many threads can I spawn, based on how many CPU's there are.
There's really quite useful CPU's.
And then, I spawn like, an appropriate number of threads apply my conversion funk here F.
I get back an okay.
And you take the value, and you take it into now.
That's pretty much it.
There's a little bit of right away drift.
But it's not too bad.
And then send.
This is rayon.
It's considerably similar.
Instead of spawns and scopes, you've literally, got part of muge.
So obviously, because I'm curious.
Reneed a lifetime specifyer.
I'm talking about as if I know what's going on.

So I started off, using a separate one for each slice.
But actually, you can just use one.
Reading signatures, so, so -ful.
I've got a link to it at the end for those who might want to, you know, feel inspired.
Any way, okay.
So I then compared the speed of cross beam and rail.
So first of all, so the purple D.O.T.s are at this ancient two core here.
And on the left, you've got crossing and on the right you've got rayon.
So essentially, what happens is, no threads.
You know, two threads, which is the number of CPU's.
You've got an instant and drop in the time it takes.
What's going on.
It says I've got 19% battery left.
As soon always turn on threading, essentially and get a huge speed increase.
And it stays pretty much constant, then starts to get a little quicker as you add loads of threads.
This is the fastest one here, which is like, one per CPU.
And well, that didn't work.
Oh, no.
Talk among yourselves all right.
Where are we.
I'm like, lost on my last talk.
This is disastrous.
Okay.
You have domes like this, sometimes.
The reality is so much worse.
Measuring speed.
When you're using cross beam, what you note is, using the number of CPU's on your system, number of threads is what will give you the quickest run.
Here it is on two on a two-CPU system and here, on an 8-CPU system.
I don't know what the error bars are so gigantic on the CPU-2 system.
Anyway, they're much smaller here much these are the error bars.
So adding threads, really does nothing, then it starts to degrade performance ever so slightly as you have loads and loads.
It essentially gets it right first time, because it is embarrassing parallel.
And it just science equally to everything and does everything.
Then if you start tinkering with the way, you start getting ever so slightly worse performs and that's on both systems.
So that was interesting.
I have no idea why I took those.
I decided, which is better and turns out.
It makes no difference in the end for this.



Okay.
So next thing I tried tow build python builds, and my python wheel is just this piece of code, which is siphon code.
I don't know whether any of you use siphon and I don't want to bad mouth things because we're positive people here.
Siphon just assumes you know HedraC.
I had like a lot of help in making worth and it works.
Converts them to memory views.
Sundays them into the FFIfunction.
And then copies them back out into URA's, it's pretty compact.
And it worked perfectly.
So I don't worry about it too much.
And in order to actually make this usable on three major platforms.
I used the Rust everywhere, which give us you Travis and scrips for everything.
So if your approach approach is run some tests.
If the condition is true.
Publish them F do you want integrate bits of travel car coverage, you can do that.



I first of ology, built my Rust dynamic libraries on each platform.
And push a tag, you end up with artifact if your releases.
I've got artifacts for 64OSX and for Linux and then for windows, 62 bit and 32 bit and it works almost out of the box instantly, when Trava is not there.
So difficulties.
You have to understand what link or arguments.
I just spent two days.
What is this?
And then eventually, it worked.
And began, I just forgot about T.
I know that's really all of, but you know, sometimes you just, you have to deal deal with the world as you find T.
just a note on building Linux on python and there's an agreed-standard called Linux 1.
The Linux build for compatible.
Can you get it as a docker image.
And you will have to build your dynamic libraries inside docker image, if you want them to be Linux compatible and that is definitely something you do want to do.
Project for windows another autos not available for python 3.5, it works really well for everything else.
Scientific computing community.
So they do a lot stuff with num pie and there's a thing called multi build, that will allow to you build for a variety with micro S versions.



So the real reason for here.

[Laughter]



Who knows what's going to happen next.
Apparent he, I have some juice left in this thing.
So in order to bench mark.
Convert, I generated 10 million round of points within the boundary.
I'm going to convert them to OSGB36.
And the way diit was, C4 which is the computerized optimized systems.
You were in the same bench mark program for each of three configurations.
Now, three configurations are, Rust dynamic library and C-types, which is an easy way of interfacing with dynamic library.



So this is the X instance so here we're talking about 7 seconds B you only 9 seconds.
So we're at 58% slower and 24% slower.
But then, the two by X large instance, even using C types, which is the sort of toy version.
We're at 6.5% faster and then, we have got a 30% decrease, instantly and on the 16 processing machine, we're down to 30% slow or C-types and 60% slower -- or faster.
Oh, my God.
Faster, it's so much faster when I do it.
60% speed decrease and finally, on gigantic, processor, you're down do -73%.
So it's so much faster, the more processing you have.
So I'm basically done.
I'm just going to talk very briefly about, special computing and there is an organization, it's in active development.
There's a few of us.
We're basically aiming to provide geo spatial primitives.
We have got like point types.
Line stream types.
Pole gone types and multiple versions of that, and we have distance algorithms going.
We have [indiscernible] algorithms going.
There are Rust libraries for reading Jason, WP.
Polelip line, they're all stable and very few people working and I know that geo developers are difficult.
But if you think you might like to be one or if you're just good at maps if a way that I'm not, definitely find us.
.
This talk is all true, but it's also mistitled and it's really asking a lot questions and getting incredible answers.
As you know, some parts are really, really difficult, especially when you're starting out.
And the community is so helpful.
I know it's getting better every day.
And it's not just helpfulness.
That community is so supportive and it's so encouraging.
Loads of programming which communities are helpful.
But sometimes, there is like, if not contempt, there's an assumption that you will just get on with it on your own and Rust is not like that.

So I watch you helping people and I watch you being patient and I watch you being kind to one another.
When people sexual harassment very, very simple, starting out.
And it's very, very inspiring and it's what's what keeps me and I should just be writing normal words.
So thank you.
