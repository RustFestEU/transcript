>> BRIAN PEARCE: I'm excited to be in Germany and Berlin for the first time.
I showed up a few days ago and I've had some time to get into some of the food, drink and history F.
anyone has a recommendation of places to G.
I've got another week here, so catch me in the hallway track.
I'd love to hear what you suggest.
I'm also flying out to Switzerland.
Switzerland has a lot of things relevant to my interest.
Watches, chocolate and I'm sure it's complete he undeniable that their flag is a bug plus.

[Laughter]

Now we're here to talk about learning to love the unfamiliar.
And what this is, is, it's kind of journey I had while learning Rusts.
It's stuff they ran into when I was unfamiliar with compiled languages.
It's use annuals and concept that is were unfamiliar to me, coming from languages like Ruby or Java script or python.
In the next 30 minutes, what I want to do is I want to help introduce people who are new to language.
To these concepts.
That way when, they hit them for the first time, it's not going to be as big of a hurdle to get over.
I want to help you kind of ease into that a little bit nicer.
My name is Brian Pearce.
Thank you for being with me this morning.



According to the Rusts survac 2016, 1 in 4 people being believe that Rusts has a steep learning curve.
I don't think there are too many people that are going to argue that.

There are a lot of new concepts, depending on where you're coming from.
Concepts that will just be new to you.
Submitted that it takes three weeks to get over this hump.
With that if mind, let's talk a little about frustration.
Within the fist three weeks, there are things that can be barriers for people.
Poor documentation or maybe the community access isn't as open or friendly as Rusts community actually is.
When you hit some of these bumps, you just might not know what to do about T.
don't know where to go, who to turn to.
You're potentially trying to achieve something you don't know how to do in another language, and you just can't work it out here.
And that gets incredibly frustrating.
When you first decide to pick up a new language, have you something in mind.
I want to build this or I want to do this thing I know how to do in another language.
Have you a single purpose you want to accomplish, when you can't accomplish T it's frustrated.



So let's take a look at an example.
When I first started learning Rusts want I wanted to port a little bit of code I had somewhere else, into Rusts.
So we're anything to look at a little bit of python code.
So what have you here are two function that is read in a time file and process the lines of that file, send it to a process funk, check to see if the line takes a pon.
If it contains a PON, you should tell a friend.
Highlighted, if highlighted, the key points in these two functions, the first highlighted lines we're going to opt file.
Second highlighted line,ityerrates over the lines of that file.
Cross choke see if it's a pun.
Tell a friend.
I want to port this over to Rusts.
So let's look at what that looks like.
So it's not too different.
Again, the key areas are highlighted and they're probably much exactly the same.
You have a file open call want you have a loop to iterate over the lines of the file and pass throughout process funk and check to see if it's a pun and again, tell a friend.
Key points highlighted other it's very similar.
It's almost what you might expect if you're coming from another language and trying to put something together.
The thing I begin to notice when I started writing more Rust were these.
The unwrap calls.
I didn't know what they were for.
I knew the compiler told them, they had to get the values that I wanted to get.
I didn't know if it was boilerplate.
I didn't know what was going on.

And I'd look at this time a file after a couple hours work and be like what, is this?
I don't understand understand it.
My code would have looked a lot nicer if these were inn here and that was frustrated.



I want to take a bit of a dive into why that is there, why we end up seeing it in a lot of places.
So Rust doesn't claim to have maybes but it does have maybe types.
Maybe is a pattern and Rust implements T via option and result.
So we're going to look at option first.
And how option works, it's an enum that contains some or none.
It contains something or nothing.
And when I first read that, that didn't seem incredibly helpful.
I'm callation function, I thought every time I call a finger, I'm going to get something, like the value I expected or a runtime function.
But I never expected to get nothing so I never really understand this as a concept.



I don't want to just try to entertain T.
I want to talk about where it should be used and Y.
so on the screen, I've got a ring.
The string contains the character 7 and we're going to convert to do an integer with a Ruby Y.
We get a 7.
Pretty much way expect.
What happens if we do it within Emoji.
If I call 2Ion an Emoji in Ruby, does anyone have any clue what's going to happen?
A nil in anyone else?
0 zero.
Exception.
You get 0.
Which is not what I was expecting.
Looked like a credit card number 2I.
You would get what is represented as a credit card number.
A malformed what, do you think you're going to get this time?
4,520, which again, is just not what I was expecting.
So now, let's look at that in Rust.
So we have a character, 7.
Again, the room has a lot people who have been doing Rusts for a long time.
What are we going to get here?
We're going to get a sum of seven.
If we do it with know Emoji.
What do you think we're going to get here?
Perfect.
So we're going to get a none.
Same thing with credit card number.
Get a whole number.
We're going to settle that number.
If we did it with a malformed credit card number, we would get none.
So this is interesting.
It's interesting because we're getting a different response or result when the conversion doesn't work.
As opposed to getting kind of like a mangled conversion that you don't necessarily know what to do with afterwards which is nice, but the thing S this isn't what I was expecting still.
When I call 2 digit on a 7, I was expecting to get a 7.
What I have is a sum of 7.
And that's not a 7.
I can't do arithmetic with a sump 7.
Depending on how you understand that sent.
See let's take this back around again.
So we now know when we call [indiscernible] we get a value of 7.
To get an actual value of 7.
We have to call [indiscernible].
This gives us the 7 value we were originally expecting and this is I didn't had to litter my code with unwrap, just to get value I was expenninging to get.
Coming from another language accident I'm not used to some things or nothings.
I'm used to get the value they expect from my function.
If we do it with the Emoji here, we get a pick.
So what this means is maybe that we are initially getting, the maybe that we are getting, was there to protect us.
If we get unwap, the code is not better than when we were getting values that we weren't expecting, bad one versions and things like that.
The unwrap will only work on positive response from the function, assuming that actually got a value I was getting the sum or none.
What I wanted was the value.
But now, I can at least see where some or none becomes important.
We're going to look at another example just to drive it home.



So here, I have a Ruby application.
It asks user at the command line to enter a number.
It uses the two integer to convert the string into a number.
Checks to see if the number is a number and if it is, bring the right number.
If it's not, we'll say that wasn't a number.
But as we have seen in the previous slides, 2Iand Ruby will convert everything to a number.
Which means, this is actually dead code.
This will never happen.
You will always have a number.



In Rust I would have originally written it something like this and called it the unwrap.
But now, we know that's bad and wean why that's bad.
And wean what we actually get is a maybe request we call a two digit.
I can begin changing this to something that looks a little more like this.

I can take the maybe and now, I can check to see if that maybe is some, did I get the conversion or is the maybe none?
That's nice.
The maybe is guaranteeing values for us.
One thing I want to point out here, this kind of if else condition really isn'tityio mattic Rusts, in a case like this we would use pattern matching.
So I'm going to change that over to pattern matching really quick.
Pattern matching in Rusts is exhaustive.
Have you to count for every case and it's incredibly powerful and used in a lot places in Rusts.
That's as much I'm going to say on pattern matching.
I want to point that out in the slide.
So in the beginning, when I first started writing Rust.
We saw all of those unwraps.
They were frustrating because I had to put them there, and I didn't understand why.
Now they can see why and see what they bring, value wise to me, it's not so frustrated anymore.
It's incredibly beneficial, and I can start using that.
Not just in Rust, but can I begin using that type of pattern in other language that is I write.



So we're going to talk a little bit about Err handling.
In other languages, there's time that is I write code, I just expects something to go long.
I'm going to call a funk and, you know, maybe I'm going to get a time-out from someone's API, or a value that I wasn't expecting.
In a lot of the languages I normally write, I use something like a rescue.
Try and catch.
Rescue crew.
We're going to look at those real quick.
So this is Java's try and catch.
If you're not familiar with Java how it works, is if you have code that you want to execute, that you're worry body, throwing exceptions, you put it between the try and the catch.
If the code throws an exception, then the between the catch and the bottom parentheses, becomes executed.
In Ruby, we have begin rescue crew end.
It works very similarly.
We begin on rescues executed.
If something goes wrong, between rescue and executed.
Python's very similar.
So the next session S what do we have in Rusts.
I I'm writing code.
I want to try and catch an exception so I'm going to hit Google and look at stack over flow.
What am I anything to find?
I'm going to find the try macro.
Now, this looks kind of nice.
It's small, simple, but approximately 50% of what every, language had.
Where Do I catch the errors in I don't understand what tow do with this.
So let's talk about frustration again.
I know what I need to achieve.
I know how to achieve it in another language.
I do a quick Google search.
This is what I get and I just don't seat direct comparison.
It doesn't immediately make sense what I need to do with this.
And it didn't really begin to make sense until I looked at combining it with the result, maybe, which was the other maybe type I mentioned.
So let's take a quick look at result before I come back to how to use try.



So much like the option, which returns some or none, the result returns okay.
If you get an okay.
You know the functions that you called was successful.
If you get an error.
Something went wrong.

We're I know something went wrong when I opt file.
If I want to do this in Rust.
I'm going to look at our readfile function again from Rusts and there's a few things here I'm going to change.
I'm going to give myself a little space.
Going to highlight the two place that is I'm going to chairman first.
First one is going to be the method signature.
Second one is going to be where I'm actually calling file open.
Method silt has a result type.
And result type is a result.
That lets, or that says that now something somewhere in this function could potentially go wrong, and I am going to return this result type, maybe.
So now, we're going to look at tri.
Tri is the second thing.
Tri macro around our file open call.
And what tri does for us, is it will execute the file open function and if something goes wrong, tell actually capture that error, put it into an error type or an error result type and then return an error funk immediately.
So it's going to capture the error.
It in the proper too much.
And return funk.
Now that lets the caller of this function decide what to do with it at that point.
Call a file, something went wrong, then can you begin to pattern match on that, much like we did on the option type.
And can you decide what you want to do with it.



You can begin mapping the error.
So you can cane it on to the initial call.
And if something goes wrong, can you turn it into something else.
Instead of just taking the panic that file open gave you, you could add text to it.
You could turn it especially a custom type.
--



Last thing that you need to D.
now that we are returnation result, under the assumption that everything actually went well, you need to return an okay.
An okay is the other type in the result and okay says that everything successfully went okay.
Like, your function did exactly what it expected you to, and now, can you return that.
So now, we're going to talk a little bit about testing.
Testing in Rust for me, was kind of like a bit of an up and down, it was a roller coaster.
Coming from languages that have a lot test frameworks and that kind of thing.
I, again, had expectations, I had how I knew how to do things in other languages, and I wanted to just like, drop into Rusts and do exactly those things, and expects it to work.
And unfortunately, it didn't quite work like that.
So some of some of the things for me, as opposed to Ruby or python or Java script, where a lot people write their test in a test directly, Rust lets you write every test in line.
So can you define the function in Rust.
In whatever file you're writing in.
And immediately use the test macro that's highlighted here and define the test.
And that works.
It's again, not necessarily idiomatic Rust a lot of people would prefer to put it in the module.
And change the sim phantom dataics how they organize that file.
And can you do this.
It's kind of nice, actually, once I got over the fact that I'm not doing it like I used to, I kind of like this now.
When I'm looking for the test of a particular function that's modifying, I just know it's in that file, as opposed to having to search through the project and finding where those things are.
Rust being one of the first compiled languages I dealt with, the other next thing that I didn't really realize at first was all of the test code, that goes in the files, and my source files is not going to be compiled in the end.
The compiler strips a lot of stuff out so you don't have to worry about it.
So now that we know, we don't have to write our unit tests inside the test directory, that's great.
But Brian, what's the deal with this test directory -- this is where can you write your integration tests.
And how the integration tests work in Rust is every file in your test directory will get compiled into its own crate.
Which is why I tried to write my tests, I had a lot hair pulling and didn't really know what was going on there.
But how it works S every file in here gets compiled into its own crate.
So if you've written a library, what you want to do is include your library into that crate.
Your test file is now consumer of your li library.
It's where anyone else that's going to pull in your library would be.
So can you test it from that point.
You only get to test what's made publicly available.
Which is nice.
It's like better, true, black box integration test.
But again, it's not necessarily what I expected.
Some of the, nice things about Rust testing is the random order testing by default want a lot of languages have that built into their frameworks now, that didn't initially run with those things beforehand.
So testing says all of your tests, instead of running in a linear process, they're just going to get randomized.
Your last one will get run first and so on and so forth.
Which is great.
It's great this dedefaults where the test you run first, runs second.



Another thing Rust has is parallel testing and parallel testing sounds great at first.
But let's talk about frustration.
So if I've got some code in Ruby and I'm going to explain this the top function does a little bit of setup.
It creates a directory that I'm going to do some writing to in my tests.
The terdown clears up that directory completely, and the tests themselves, actually just read a file, and assert to see whether weather that file exists.
So it's not doing too much, but there's a lot writing.
And in Ruby, these tests pass everything single time.
If import this over to Rust.
I'm not use anything particular framework.
So the setup is specifically in my test.
Set up does the same thing.
Makes sure that the directory exists, the teardown makes sure the directory is clear and then the test, actually just writes a file and asserts to see if a file exists.
If I have 10 tests like this.
I'm going to say 8 out of 10 of them are going to fail every single time, and they're going to fail differently.
It's not going to be consistent which once will fail bithey're going to continue failing.
When I started learning Rust.
I legitimately ran into this problem.
This exact problem and more hair was pulled.
I was sit in a hotel in Portland, like, trying to blame it on everything I could, run into code and new VM's.
The code works fine in Ruby it's going to work fine here.
And the problem leer is parallel testing is that in a ways where you're doing a lot of I.O.
or sharing resource, you're going to run into problems like this.
The problems that actually are occurring, your fist test has started to run.
It's make sure the directory exist.
Written its file, done his ashes sertion, to make sure the file exists and the second test comes along.
Make sure the directory is there.
And the assertion, fist test goes, okay I'm done can't here, let's just clear this correctly out.
And the second test S my file is not here anymore.
Everything's failed.
Everything's terrible here.
And if you don't know what's happening, if you've come from a language why things don't run in parallel by default then it's not going to come to your mind at first.
Oh.
you know, things are running if a parallel execution.
It took me a long time to realize, this was actually happening.
But now they know it's happening.
I know how to work around it.
I know how to write better tests and not share resource.
What this has done, all of my tests tar right, I'm going to think about where my code is going to run.
I don't know if my code's going tend up being run parallel.
I give it to someone, they can run it parallel.
Have I to make sure there's not going to be a detriment to that happening and I'm going to write better tests.
We're going to talk about frustration last time.
The definition of frustrate by Webster Miriam, I believe, was to --



Have I one thing to accomplish and I can't.
And that's frustrating.
In programming, frustration can frequently mean we're learning something new.
Once you have a better understanding of why those things were frustrating and you can see them clearly, you my actually find yourself applying in different places.
Can you learn to appreciate those things that were frustrate being for you, initially want so now, even if you're writing more Ruby code and your Ruby code runs linearly, you're going to think about that problem you ran into, when you were writing Rust.
I'm going to think about writation better test to make sure those things couldn't go possibly wrong.
Next time I write a function of python I'm going to think, what were the possible result types.
Like, what things can go wrong?
Am I going to get responses that are just like, I'm not expecting?
Is the conversion going to come out properly.
Can I verify that before I work with that data?
A quote from Henry Ford.
For the world was built to develop character.
We must learn that the setback which is we endure, help us in our marching onward.
That said, the unfamiliar can be challenging.
But there can be so much to learn and love, well overcoming can.
And once you have, you'll come out a better programmer than when you went in.
I'm Brian Pearce.
Thank you very much for listening and it's been a pleasure to be with you here today.
