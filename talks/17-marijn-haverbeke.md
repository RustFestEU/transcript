MARIJN: Here I'm glad so many people still showed up at the very end of the conferencement I'm going to be talking about mostly a number of features that were part of the rust language at some point but no longer are and why this is the case and usually why this is a good thing.
So as Ryan said I'm Marijn Haverbeke, if you are into JavaScript you might have seen my name before, and so Rust has been under development for about 10 years I think first one stretch was working in isolation and who knows what kind of ideas and experience that were done at that point there's not even like a repository from that time public so it is like the pre-history, and then at some point MOZILA adopted the project and assembled the team from a little before that point we do have GIT history and at that point everything was discussed in issues and mailing lists and there's lots of records.
I was part of this pretty much the initial team where we moved from the original compiler to a Rust based compiler got a bunch more people involved in the language, this was a period of like the first real experience at the language and a bunch of people from different back grounds giving their opinions on the language and trying to push it into their favorite direction and we had a lot of experiments and overalls and false starts and just lots of CHURN have a good morning off in the afternoon, because it was only one code base we fixed everything right away and people could continue working.
There was some trick can Iness with actually getting a compiler that compiles the current code after you make a breaking change so you first change the compiler upload the snapshot and change the code and everyone could proceed with the new snapshot and then of course a year and a half ago I think the team cuts version 1.0 and then the process changed entirely, so now LTS like everything stays backwards compatible it's impressive how serious the backward compatibility, and experiments move like our Cs moves very slowly and there has to be a wide consensus and fit within the current code base.

So that's a whole different stage, again.

I'm going to be mostly talking about the period where I was part of the team, which was 2011 and 2012, and which was probably the largest period of features cut and change, stuff like that, so it may seem a bit ridiculous that we put so much time into so many complicated features and dropping them again but I think that's an essential part of get ago complex design like a program language right that unless you're a super general YUS you won't see in advance what the implications and interactions between the various parts of the system are and you have to try it and see how well you can make it work and how well it fits into the system and sometimes you later have to just abandon it again.

I think that's part ave healthy design process for like mere MORT TALS who need to actually see how something works before they can evaluate it, I'm stretching this talk around a number of visions that were part of the language and then dropped again, and I'll try to explain why I think in every case it was a real good decision to drop them, but it's still interesting to see what the original visions were and what we did end up with.

So these are type state, a structural type system, and light-weight processes, finally garbage collection.
Let's start with type state.
Type state is -- it was actually an important point initial announcements of the language and people were very excited about it, what type state does is basically allow you to -- allow the compiler to know more about the value than just the type, so an example would be this is something of type circuit but we also happen to know that it's open or this is something of type array that we happen to know our vector in the current terminology we know it's not empty.
Something like that, allowing you to add more safety to your program, more static guarantees.

So when you're programming you usually have a mental model why this thing you are doing right now is valid, is not going to crash, if you're not just making random changes and seeing the test pass you will have some mental model of your program.
To a certain degree, depending on the language, you can tell the compiler about this model and the compiler can check whether you are applying your model consistently, so in simple cases just types you're actually passing the type that you think you are passing somewhere and if you don't instead of finding out at run time you find out at compile time, this is nice, basically kind of a this computer does not have the fonts that my computer had, but imagine arrow heads on both sides, there's a spectrum on which languages fall in terms of how much can you actually communicate through the compiler, so on the one side JavaScript synthetically correct let's go ahead and run it, then on the way other side there's language requires you to actually construct a formal proof that your program does what it's supposed to do, that it does so in bounded time and bounded space, which means you're making a lot less mistakes but on the other hand it's like a major project to write a small program in such a language.

There's a reason that not everyone is writing their web servers in cork or whatever, and risk kind of falls in the middle it does have quite a bit of static guarantees and it helps quite a lot but aims to be easy to program, where you don't have to spend too much time working on these things.
One way to see the history of programming language is kind of one aspect of this at least that we've been finding better and better VOE cab BLAER to describe the things we know about our program to the compiler in way that's actually convenient so if you have a really terrible type system that's often worse than no type system at all if you have to choose to write something in java or JavaScript I'll take JavaScript, thank you very much.

We're getting better in this Rust is making a big contribution, making a system program space and ownership model is I think really good.
I unfortunately wasn't on the team when this was introduced so I can't take credit for it but I think it's the most XOOITing part of Rust and it's this kind of thing where the compiler knows what you're trying to do and tells you when you're violating your model.

So back to type state, it looks somewhat like this, you could define predicates, which is this pure function at the top, and the extra information that L the compiler had about your values came in the form of this predicate holds but these were just predicates written in normal Rust codes that were supposed to be pure, there was a problem with the affect system at that point that's gone now, they took a value and said I hold or I don't hold.

And then you could define for your functions pre conditions and post conditions, so you could say, for example, this function lost, here, demands that it's first arguments has the not empty predicates holding on it, because you can't take the last element from an empty array, and then before you could file such a value to such a function you have to convince the compiler that this predicate held at this point.
And for some things this worked well, the compiler was very clever in propagating its information through the flow graph and taking it from the post conditions of the function, but you have an example create an array and pass it through lost, but that's not okay, I first have to check that it's not empty, and this actually is the same check would insert a run time test called to the predicates and then panic if it failed.

So we're actually I mean this array isn't empty this is very easy to prove because the compiler only saw these predicates as opaque pieces of code it couldn't actually reason about them, it could only take what you told it, like if you check the recurrence of check one was a just believe me just hold, so it might also have been appropriate here because I'm sure this array is not empty, and then there was one version that ensure that the compiler already aesthetically knew that it was something else, it was an' SERGS of okay I must know this at this point, but don't insert a run time check, I want to have aesthetic error if it's not provable.

But it in my experience the affect of this system was that you would be littering your code with check statements and they would also panic at run time, so the aesthetic, amount of aesthetic guarantees wasn't very great because often usually the compiler couldn't really help a lot with reasoning about when they actually held and when they didn't.

It was in the compiler for a long time still but eventually it was dropped because it was not pulling its weight so in terms of experiments in good expressive ways to express these kinds of things I think this was a failed experiment, but existed some research languages before but it's never really made it into a big mainstream type language, for good reason, I think.

So so much for that.

Next topic is structural typing so in typing systems you have two concepts where structural typing is say you have a function type, which has a few argument types and a return type and you want to compare it to another function type so you're just going to look at the fields and the function does it have the same amounts of arguments, are its arguments of compatible types, is it return type of compatible type, and that's structural.

On the other hand there's nominal typing where you just say where is this type declared what's the name of this type and it has to be the same so Rust currently works this way as do ENOMS are only compatible if they're actually instances of the things that are of the same points in the code.

Initially structure -- structural type so this currently brace this thing there is syntax for STRUKT type with two fields X and Y of type flow and the type decorations defines an alias for that type this is a name for the type record with two float fields and so if I define a function which takes an argument of this point I can call it with just a record constructed on the fly without any record name involved, records themselves don't have a name just a structure and a system and it's kind of nice and light weight and minimal and that's often you don't even bother to give your record a name if you only use it a few times, so you -- well you would now probably use it you can use TD record nice descriptive field names, I kind of liked it for programming with, but I'll come back later to why this part was removed another object of this was object type whereas structure types were only come pattedible if they had the XX same fields and in the same order, they weren't reordered because see compatibility and they had to be the exit same to be able to compile it efficiently, because then all codes are then DREKTSD with such a record knew how it was laid out in memory, objects were more dynamic feature and here any object type that has a subset of the fields, fields are always mattered so they're always functioned that this object type has it's compatible, so I could if I define the type a collection of T with these two is probably not a very great fraction but bear with me with a length and an item access or method you could take any objects that had I don't know what kind of methods but also these two and you could treat it as a collection of T.

So these were both the types of the concrete objects and roll of interfaces in terms of how much concept you need in terms of programming and could you also use it as a kind of checks duct typing where you define your function and just say I'm only going to call length on this thing that I'm getting, and then anything that had a length method could be passed in you don't even need to formally define an inter face name it's all structural by name.

So one implication of this was that because code that used didn't know their side they had to be garbage collected and any calls to them will be going through dispatch table a V table.
So they're somewhat more heavy weight compared to the rest of the language, and we were finding that in the compiler we were SHIEG away from them unless we actually needed polymorphism because there were more heavy weight than necessary in many situations, and then at some point well there was also a lot of machinery involved in actually doing this like up costing to a type with less methods because then you needed to locate a new V table preferably aesthetically which create a wrapper, it was conceptually simple but not terribly simple to implement and then at some point we got more high school people on the team and all started agitating for a type class kind of implementation inter face thing that we ended up now and because no one really likes these objects very much we migrated to that, and I think they just fit with the language much better, they don't require you to put something on the heap, they don't require indirect calls unless you actually are using polymorphism, so I think that's a win.

But now that we had implementations, which affects a specific type, structural records also become problematic because if you're using a record that happens to have the same shape and two completely independent contacts and they both define a two-string implementation of it then these will clash even though they have actually nothing to do with each other they'll try to implement the same inter faces trait with it that doesn't work no one cared that much about structural records either so they became nominal for this reason, at that point.

And now of course people send functions are still structural they don't make much sense in any other way but heavy emphasis on structural typing was abandoned, again for good reasons.

And then so some -- we saw talk about asing chron news and synchronous programming yesterday, and there are languages like let go and erline which solve this in a different way, where they look synchronous that is like a slight of hand they're programmed sing cruise newsly but you don't pay for I don't know how many threads, it's more live than operating system threads that was part of Rust's initial vision so you don't need to mess with futures or reactors or anything you just spawn a bunch of tasks which for example each circuit or you could even if you are writing a calendar spawn a task for each task on the calendar or something, and they run as independent pro

esses but because they're designed to be cheap you don't have to worry about allocating the lens of them it just works.

Now it's not designed with this in mind they come from a period where people were not considering the lens of thread a reasonable thing to do and usually their internal data structures as well as the minimal overhead on a thread is too much to use to operate every circuit on your rep server.

So what you have to do then is you create your own tread pool in the language run time and you have your own task threads are picking up tasks running them for awhile when they block or time runs out they put them aside and take another task, they do their own scheduling which is also not reveal and of course even if you do this you still have the problem that that's simple opinion code has this conception of a stack where it can allocate stuff in like last in first out manner where it's gross during function calls and shrinks again when you return and that depends on infinite stag being there, they're not actually infinite of course but they're usually big enough to allow reasonably occurred programs to run without overflowing your stack.
But that means big enough is quite a bit, you're going to not want your minimum stack to be half a kilobyte because then every program will overflow it.

So we got away from this simple stack model and introduced segmented stacks which are stacks where each function that once allocate on the stacks first checks where there is enough stack and if there's not enough stack it allocates a new piece of stack and kind of links that to the current stacking and runs on that and when that function returns it will throw away this piece of stack and return to its all stack.

O that's not good can you give me a cable?

(Laughter).

MARIJN: Got one.
I hope there's a power thing, here.
There we go.

...(APPLAUSE)...

MARIJN: The reason we don't just like grow the stack and copy all stuff onto the new stack is that would involve moving values in memory and that's a whole different can of worms and all the code has to be able to locate every pointer to rewrite it examine if it's held by some C code then who knows where it should be rewritten, so that's why we actually preserve the old piece of stack and then continue on a new piece.
That's actually like quite a magic trick, but it works.
It went for awhile this way but it does have some drawbacks, the biggest one is that if you have like an inter loop which is going to be running very often and that is exactly at the point where you're crossing to a new stack segment it's going to be allocating and throwing away so many stack segments like some of our BEFRMG marks I think it happened only once with our bench marks but it was ridiculously flow because of this like the stack switch happened exactly at the part of the benchmark that was running millions of time.
So that's not a great obstruction it's kind of leaky it also has issues if you called C code it won't be managing segment of stack so you have to provide it with a big stack so we have a pool of big stacks and whenever you made a phone call you would get a big stack and then column that stack, there's lots of complexity if you want to call Rust code from C you have to arrange for the stacks to be in the right shape it worked but it wasn't great, and so this whole ambition was given up in terms of we don't want to pay that much run timely BRAER complexity we don't have all these problems like our own stack problem all these checks inserted into the code to make sure there's enough stack that's allocated there, and there the call was made to just not do that, so that we could be the kind of language that you can just link into a C program without pulling in I don't know what kind of obstructions and problematic factors, the kind of thing that you can write an operating system and that would also be a lot more challenging if the language depended on a big run time.

So no go, like light weight truss and it's cool to see the kind of solutions that are being found as in Tokyo and these kind of cheap futures.

The next one is kind of a similar story, so we start out with garbage collection because most of us were coming from garbage collected languages as a kind of in terms of okay this is what good language looks like, and we felt that you can't really provide an ergonomic language if you DOINT provide GAR GAJ collection.
We did have a model that you only use garbage collection when you wanted it was opt in most values would be on the stack and you could have I think unique pointers at the time just what the box does now and you could WRIELT whole programs without ever using garbage collector but at the time the REFRJS counted garbage collector that was cycle breaker but there were plans to make it more a modern style of garbage collector but again this has a cost that is a bunch of run time complexity that you're pulling in, you have to deal with, like, what if C code gets a hold of such a pointer how do you know that we can't garbage collect it, so again, the complexity was doing too much this was quite awhile after I left and then Patrick Walton announced we could get rid of the garbage collector and my initial reaction was no, that's ridiculous, but then he explained, like, and it finally clicked for me that we could really be in the same niche as C++ is which I think the hugeest thing which is the reason why Rust is successful it can be run time without any complex machinery around it so it's capitulating to the simple mind that's programming model that we've been using for ages as a kind of baseline which is a shame in a way because it's not perfect but it's for systems programming it's the best we have and enabling allowing this language to be dropped in where you would normally use C++ is probably its biggest selling point and I got it and it was like okay this is a future that I can be excited about and I think it was actually relatively painless because you can swap in a reference pointr and have to be a bit more careful about cycles and that's all research work being done about integrating with garbage collectors and other systems but I don't think it's moving that well and, I don't know, I think we landed on a -- on a really good place, here, in terms of how bare bones the language should be.

Yeah, this was an example from the book that I wanted to show, it's not entirely painless not having a garbage collector returning a closure looks like this and it's not exactly half skull, but yeah, okay, I mean it's a compromise we have to make and I think it's worth it.
Yeah, thanks for listening, I hope we still -- I think we still have time for a few questions.

So yeah, let's hear --

...(APPLAUSE)...

>> We have two minutes for questions, so does anybody have a question? I saw your hand in the back, first.

>> Audience member: Not that I would encourage someone to do that, but wouldn't the structural type kind of thing work like a template or like a generic would work that you could like generate a specific implementation for a certain type and then work without a V table?

MARIJN: Yes, you can, actually.
And I think LOV somebody is clever enough to do this for us where they can see it was always the same V table and in line it but you're still paying a conceptual cost for it and I think it's easier to have a model where you don't generate this complex code and optimize it back where you rely on these clever opt Tim Ms.
SGLAGS contribution.

>> One more question?  I saw you.

>> Audience member: Hi so recently I saw either an RFC or Rust internal red where someone was proposing these anonymous struts like you had in your --

MARIJN: Okay.

>> Audience member: You didn't touch that much on why they were removed I wanted to know why that would be a good thing to add into the language my personal opinions is fairly favorable I think that would be a good idea.

MARIJN: So the main reason as I remember if for removing them at least at that point I think we saw it do we make the structure we have nominal or structural the reason for move to go nominal was they worked terribly with trades, you can't have this coherency where you're guaranteed even if you link multiple modules together you don't end up with the modules together with the same trait same type that's the reason for that.

>> We do have now we can make trade implementations for these large too poles but it's not generic integers.

MARIJN: You have to do that in the trite that defines the trait, you can't do that anywhere else and that's a restriction that, yeah, it could work of course you would wrap your struts in some other type and define it on that if you're ready to define a trait in a different trait it's not very easy or convenient.

>> Thank you.

>> Unfortunately, we're out of time.

MARIJN: All righ
