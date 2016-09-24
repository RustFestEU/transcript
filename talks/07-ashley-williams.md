>> ASHLEY WILLIAMS: All right there's some small tech work we need to do here here.
Start the screen recording as well.

Computers.
How do they work.
There we G.
hi.
My name is Ashley.
You may know me as GW dubs from twitter and I'm coming you to you from not exactly the Rust community, but I work at this little company called NPM, which is keened of like the cargo for no JS, which is a runtime for this language that everybody loves to him but I really love Java scrip.
Do I quite a bit television if node.
I used to be a Ruby developer and I've even dabbled in Erlang, which is a super cool language as well.

I really love programming languages.
Part of the reason I love programming languages, I really like to think about thinking.
In particular, the type of thinking that what happens people write code and this is personally, because my background is as a teacher this.

Kind of led me to influential called intermesos.
I'm going to continue to say we, because it's a collaborative project.
But it's a teaching operating system.
So intermesos is a teaching operating system.
Focused on introducing systems, programming concepts to experienced developers from other areas of programming.
We anticipate that you have probably programmed in something.
But it really doesn't matter away.

And in particular, the program of intermesos is for people whom system program suggest terribly not friendly.
Probably the best way to say it is, do you know Java script?
Why don't we write an operating system together?



The origin of this project is because somebody, who will go unnamed but who looks exactly like their twitter "Avatar" accident asked me this one night.
They said, do you want to stay in and put on some comfy pants and do a neat Colonel tutorial.
Circle yes or no.
Oh, heck yes I do, that's awesome want is like, let's get close to the metal.
That's what the real programmers D.
side bar.
Real program suggest not a thing.
So definitely don't say that.

But I was ready to get close.
This is something, and I had this immediately, I thought oh, no.
An operating system.
Like can I write an operating system and should I write an operating system.
A question we don't often ask ourselves.
And part of the reason I had this feeling is best tembest demonstrate by the this amazing website.
OSDev.org.
Has anyone been to this website?
Full disclosure.
Thing website is horrible horrible.
This is the worse website.
One of the worse pieces of Internet I've seep and there are terrible things remember and the reason I'm so mad, this is the required knowledge page for OSDev.
Let's take a look at some of things they state.
So basic computer science.
You need to be intimately familiar with hexahexades mal.
We'll see how much you know.
So no.
What intimately you know.
Programming experience.
Learning about program withing an OS problems is considered a bad idea.
I feel like this term considered a bad idea or considered harmful is done and I'm done with as well.

But last but not least, fail tower comply will make you look silly.



[Laughter]



Okay.
Now, I'm really take theming seriously.
Definitely, not.
So enter this tutorial that we happened upon on the Internet.
Writing an OS in Rusts.
And it's a series of Blog posts that take you from absolutely nothing, into an operating system that you are able Tex tend, however you'd like in Rusts.
Which is super cool.
What's important is that it's the exact opposite of OS Dev.org.
Hey, you're not stupid because you don't know this.

We are not going to continue to refer to you read books that we don't actually list on the website.
No.
We're just going to be like air, this is what this thing S.
why don't do you.
So the real title of this Doc is I can operate a system and so can you.
All right.
So this is the treat I got when I got my operating system working.
This is my hello world from Rusts in my very, very small operating system.
And what is an operating system near you telling me this thing with this tiny blue thing here, hello, world San operating system.
Yes.
Yes.
Actually, this is an operate system.
It is extremely small but it is indeed one.
So the question here is what is operate system and it's actually kind of a complicated thing, potentially, but the way I like to define it is, an operating system say program that provide ace platform for other programs.
It provides two things to these programs.
Abstractions, and isolation.
So what do we mean by abstractions in I can get pretty come byia and go continental deep.
And G everything is a distraction upon but we can talk about that at party.
For now, what I'm going to say is when you're thinking about the types of instruction that an operating system does.
That program runs on hardware A.
That's all fine and good until it turns out that we have hardware B.
So originally, a program is officially written for just hardware A.
You're not going to be able to support something like hardware B and the way you're able to support these sustick an abstraction in the middle here.
So that you can z operation system A is what we have the program for and praying A is what we're epiabled to distract.
We see other types of distraction when is we bring up the idea of a VM.
Say into the write a program, but I don't want to write the program for any specific operating system.
I want to be able to support multiple operating systems.
In this sense, we can write the program for a VM and that VM extracts the way the boundary between the program and the operators system, allowing you to support both, in a very similar pattern to the way operating system abstracts over that boundary with the hardware.
Now, we have got to have a Patter here, it's abstractions all the way down, but we'll sit with these, I guess.
The Pat certain this.

I have A.
A is written explicitly for X, but I want to support X and Y.
So I put an abstraction in the middle.
Now, you could say this this is what we're doing in allotypes of programming.
In particular, this is what we're doing in operating systems programming.
Now, the other thing that I said the operating system provide system icelation.
So isolation is a little bit more difficult to talk about, particularly, because it's very closely tied with extraction.
I stepped to think abstraction and isolation are two sides of the piece of paper.
I think the nice way to talk about T bring into the idea of intermesos title.
Conveniently, ending in an OS, intermeso meanness a light dramatic musical or other performance inserted between the angs of the play.



So as we saw before with abstraction, sort of should go in between, allowed us to be able to generalize over a lot things but additionally, it allowed us to separate things.
So these abstractions and isolations, come hand and hand in hand.
That's what we're doing when we're writing an operating system.
So the next question I have, is operating system much everybody's talking about a Colonel.
What the heck say Colonel.
And it turns out this.

Comes into the question of okay.
What kind of operating system are we talk B.
so the definition I'm going to use for now is Colonel, is just the core component of an OS.
And we can show that forever, but again, it is outside the scope of this talk.
As I said, there is this question.
Let's write an operating system.
What kind of operating system?
There's tons.
I know if I mentiond to my parents, Oh, I'm running an operating system.
They'd be like, windows or Mac.
And I'd be like, noo.
Neither.
Not anywhere close.
But it turns out when we're think going doing operating systems development as the thing to learn with, it really doesn't matter what kind of operating system.
In fact, this question is irrelevant and this is Y.
we could waste a lot of time trying to design our perfect OS.
As people who only use operating systems, I'm sure we have things we'd really like it to have.
So we can sit down and dream in the clouds any any type ofs system we'd want.
If we did this, the chances are, we would never actually build it.
With intermesos and coding in gym, the goal here is to leadership, not to make the best OS that ever exited.
The type of operating system we're making right now does not super matter.
All right.
So let's talk about intermesos.
We're actually going to dig into a little bit of the code.
So for starters, there's a few prerequisites.
And that's going to be some virtualization, so long as you're basically not using Linux.
And a couple lip you can coincidies and a couple option that is make peering when you're peering into an operates system, easier.



While program and operating system is within your grasp much debugging is very hard on and I find building that operating system feels like coding in the dark.
So for virtualization, I started to build an operating system on a chrome book pixel, so this was a somewhat hostile environment for trying to build an operating system, and I very quickly found out, I was going need some sort virtualization.
Interesting enough, nearly quell equally difficult was the Mac OS.
OSX, Macro S.
Don't quote me.
It's actually easiest to do this work on a Linux machine.
But what I use for doing the virtual situation is Vagran, development environment manager, which uses virtual box to virtualize machine and experts to forward graphics, which was one of the biggest problems, particularly when I was trying to do some of the chrome book pixel.
So this is, maybe I thought what was really amazing.
Original Philadelphia inoperative tutorial, he had written it exclusively for Linux.
My name is now in the tutorial for being like, hey, if you're stuck in one of these environments, use this lady's vagrant file because you can be running up in a second.
I'm like oh, my gosh, I'm in the big leagues, this is so neat.



Once have I an environment that's virtualized, you're going to need Linux dependencies, these are very new for me.
But Nasm is what we use as the assembler.
Took the assemble ler and put it into binary and L.D.
which was a linker, made by the other files.
Then we had grub.
Which we'll talk a little more later.
But that's the bootable ISO.
And I don't know how to pronounce that one.
Chorizo.
That's not right, but I'm going to call it that now.
Finally, you have Kimu, which I do know how to pronounce.
I call it a fake computer emulator.
Which is pretty much exactly what it does.
All right.
Then finally, we had a couple utilities.
You don't need these but they are super nice for viewing the generated code.
It's difficult to peer into some of these things, especially after assembled and compiled.
I was excite that would I'm not the first person to mention [indiscernible] today.
Did not anticipate that would come up in another talk.
We have hexadump and Ovs dump, which will allow you to view some of the code you're generating.
All right.
So one of the things I found the most tricky when think going develop ang operating system is like, I don't really, really know where to start.
I need to ask myself the question.
Okay.
What are the tasks that the operating system needs to do?
So it turns out, I really needed to answer this question .
what happen when you say turn on your computer.
And so I'm a huge fan of having a generalized journey, like, description.
To understand what's going on.

So in my mind, the way the things happen are, the hardware loads bio, which stands for your bisque input/output service.
And bios loves grub.
Grand unified boot leader.
And I million a weird cater-P-type worm with a crown on it.
That's Grub for me and finally, Grub is going to be what loads our kernel.



One of the big things was linking and that is that L.D.
utility I mentioned earlier.
What the linker does, is figures out how the sections of the input file should be matched in the output and should really the memory layout of the output file.
In intimacies on right now, the only thing you need tonight with linking is you have two things and you really need to make sure that one comes first.
So linking, just make sure the header inno no is up at the top.
And we'll show that code in a second.
So speaking of show the code, now, it's time to do the temO.
this is where I hope you all show me your hexadecimal skills.
I'm ready and excited for that.

So let's pop this open.
So I already have this.
How are we doing on slides for that?
Can everybody see?
Pretty good.
Okay.
Fantastic.
So right now, I'm here in vagrant and we have mellow -- oh.
I'm turning that off.
That's horrible.
All right.
So here are the file that is we have.
So just to talk quickly about what we have in here, the first file is multiheader.asn.
It's going to say, hey, I am something you can load with multi food.
So this is the thing that Grub needs to see to see it knows how to note T.
second thing that's important is this boot.asm.
This is going to say, okay, grub, you know I'm the best thing can you use with multi boot.
What are you going to do once I get booted?
And here, we have the linker.LD file.
That's saying in there just make surety header comes first.
If Grub doesn't know what I am.
We're already in trouble.
So what I want to point out here, let's take a look at the boot file.
So here is some very lovely assembly here.
And so what we can see is we have all of these move word statements.
So let's break down what these mean.
So move is going to be the instruction.
Word is the size and then it is next thing that comes is the pointer to where we are going to put it in memory.
Then we have this little concoction right here.
What happens here is the first two characters are going to describe the foreground and background color that we would like to display on our screen.
Then the next is going to be the character that we're showing.
So just to show you what this ends up looking like.
Turn that off.
I am so sorry.
It says off.
Can't account for T.
so what we can do here, we can say make run.
And this is going to pop this up.
And here, in the Corner, we can see that it says hello world.
This is an operating system.
Yay! This is really cool.



Now, let's go to where we can get it to say, hello RustFest.

Does anyone know off the top of their head what capital R is?
An ASCII.
Oh, want that's Borg.
Wow.
Tough crowd.
I would just like to point out that nobody is jumping to say what this character S.
so your deep knowledge of hexadesimal is make me sad.
I have this baked in my important secret speaker notes.
So these letter vs.
Changed.
But let's just take a look and see what this ends up saying.
We can say run.
So it says, hello rest fian ...
which is almost close little but it turns out writing all of this assembly, isn't, you know, I mean, it's cool.
You can wake around and say, ah, writing assembly and everyone's going to be like, I don't know what that is.
But I bet it's awesome.
But nobody really want a program like this.

And here's the deal want the level of fail I can have much I can have this cheat sheet if I type out some numbers the it'll be a mess and turns out the error immensely aren't error manies, it would just not work or it would print something random and it would be really hard to debug.
What happened was relatively complicated and we had a pretty fine grade control over what we were doing.
So we had the bioload that boot loader grub.
From the virtual hardware and boot loader read and found that multi boot header.
All right.
I can do this.
Then it copied the boot and text sections that were inside much that, to some of course specific memory addresses and it jumps to this industry point and that's when our Colonel prints the message, this is pretty cool.
Now, in order to go from this, to Rust.
Have you to do this tricky thing which is called jumping into long mode.
What we were just writing we were in 32 bit.
Without having to do quite a bit of hoop jumping, you're going to want to be in 64 bit mode.
To actual how to jump into long mode would be way to long to show next year.
Next year F someone wants to show, how to jump into long mode, thwack be a 30-minute talk.
It's not that it's hard.
It's really tedious.
You have to create this table and shifting a bunch of things over.
It's like reorganizing.
But I do think what could be interesting is to take that assembly and refactor it, using Rust so we could now have a hello world from our rust program.
And so we can jump back in and I'll click this.
And I'll go into hello Rust.
So sorry.
And similarly, we have like, well, I'll clear this here.
We have something that looks relatively similar to what we had before.
We do have a bunch of stuff that jumps us into long mode, which we haven't extracted away.

But what we can see is if we hop into our lib do the s.
This is printing hello world for us.
So let's walk through what this code is actually doing.
I should put some numbers in there for us.
I have my K name.
Inside what, I'm able to do, I'm able to grab the characters as bites by putting the B before hello world.
So this is the many I'm going to be printing right here and then I define the color I want to use here, using 1 and F.
There's actually a whole bunch of different colors can you use.
That I can quickly show.
These are the color option that is we have.
Actually, a pretty good set.
So we can play with those in a second.
But then what I do, I create a mutable array, and I just automatically fill that entire array with what I want the color to be.
And the length of that array needs to be double the size of my message because for each letter what I need to say is the foreground color, the background color, and the two-character code for what the letter S.
once I create that array, then what I do, Iityer 8 through it, and for every other in that array, I replace the color code with the character code that I would like.
Then finally, I create a buffer pointer, and I set that to the message.
And that many is an array with alternating color and character codes.
That is unsafe because we are just writing to something in memory.
And that's extremely dangerous.
Don't recommend doing it.
The computer doesn't know how to break at this point.
But it's definitely not something it would let you do.
If it knew, it would tell you, definitely don't do this.



Finally at the end, we have this loop here.
We don't want it to just immediately shut off.
We want it to stay up.
And so F we take a look here.
Make run and we can see tait says hello world here employed now, we can change this significantly easier in the Rusts code.
I don't need a cheat sheet ton what the characters are.
Instead, I can go to my passage and change it to say hello RustFest.
Whoever thought I would be doing something -- I feel like I'm doing a little CSS in Rust, which is pretty strange.
And I'm actually a big fan of the bright blue color.
It looks more like the logo.
So I am going to set that instead.
So then I can shave that.
Hop in here.
And oh.
the demo gods are not a fan of me.
Let's take a look what the heck happened.
Didn't I actual about the errors you get in doing this?
It's very fun.
All right.
Oh.
right.
Excellent.
I love teaching want it's like pair withing 200 people.
Because that's always fun.
So the character, so what's interesting is that if you make the array too big T prints like these cute triangle bus turns out F.
make the array too small T transfers a lot horrible text in your editor, when you're giving a talk in front of a whole bunch of people.
So since you're all paying so much attention.
What should the length with.



So we need it to be double.
Double the length here.
With we'll check do you want say, 42.
We'll say make run.
There we go.
Yay.
Ooh.



[Laughter]



That's fun.
This actually plays perfectly into the whole point.
Doing this is just something that's like, a fun exploration, not cute triangles this time, we have got some F's.
That's cool.
Yay.
All right.
So what just happened is this a lot things, include something whole area code mistakes.
Fundamentally, what I was doing is creating this big array and filling it up with colors, and ultimately, I would put letters in there and I put that as a piece of data, and I assigned it to the pointer and that's what made it print to the screen.
Now, something I would love to do is in that room where I'm keeping everything open, that's no reason I can't gist print tons of different things to different parts of the screen, you could have annex plosion of RustFest all over screen.
You can crash your computer doing that, but it might be really fun any way.
I was told this was way too complicated of a way of trying to do this.
If I really wanted to demonstrate T instead of doing this whole loop shenanigans, I should just have written it out one by one the way I did it in the assemble least I don't really care.
It's like, super fun to write and joy I felt whennic get N incredibly, at least what I believed, complicated set of build tools to finally print some tiny word to the screen.
I was like, okay.
This is really, really fun.



So I kind of want to leave you all with this many which is that this is from Leslie Lamp owe rt.
He wrote a presentation called "Writing for Programmers" and this cartoons, "writing nature's way of letting you know how sloppy your thinking is." and I've been in my talks before, kind of reappropriating this, to teaching is nature's way of letting you know how sloppy your understanding is.
And if anyone here has ever been a teacher, teachers in the room, not enough.
Let that be the lesson if anything.
If you ever want to know how little you know about something, try and explain thank you to somebody.
And you'll be surprised.
Beginners ask extremely difficult questions that are very hard to answer sometimes.
So what I want to say is go write some irresponsible code.
Write a tiny operating system that does something it is or could have and he go teach somebody else to do the same thing.
You're probably going to end up learn seeing much more, just from that exploration and teaching experience alone, than following any sort of terribly structured tutorial.
And even though the RustFest tutorial are good, you should stray from that and do some super goofy things.
Intermesos has gotten you out of this kind of how to get started part.
So intermesos is ready for people tow take a look at this, and extend it to Rust Bridge.
It's already started for you to have RustFest connect to T.
it's only nine months old, which is an awkward amount of time.
But any way, it's interesting.
We have 12 contributors.
233 commits and 444 GitHub stars for those who care about GitHub stars.
There's only 12 contributors but there should be more.
It's a very extensible thing.
Can you build out your own little things on it and they can all work together.



I also want to centers the fact you don't have to contribute code to contribute to intermesosF.
take a look at the book, which is the comp pannian to the Colonel's code base, we have 47 contributors with around the same number of commits.
Not as many GitHub stars.
But that's because GitHub fan boys are not really into books.
We want to contribute into intermesos and doesn't matter who you are.
We think you're really great and there's a very good chance have you something to contribute.
If you failed to comply with what the general people think a real OS developer should be, yeah, you will look silly but that's like a super good thing, I think.
So I can operate a system and so can you.
Thanks so much.
