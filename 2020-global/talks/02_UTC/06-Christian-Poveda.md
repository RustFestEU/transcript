**Miri, Undefined Behaviour and Foreign Functions**

**Bard:**  
Miri ist Rust's interpreter  
And Christian will gladly debate'er  
On how to bequeath  
her the stuff underneath  
so she can run until much later


**Christian:**  
Thank you.
This talk is called Miri, undefined behaviour and foreign functions.
So let me me introduce myself.
I'm Christian Poveda.
I'm Colombian.
I'm a PhD student.

Occasionally, I contribute to the Rust compiler project.
I don't work full-time, I just do it when I have free time.

So, first of all, I want to say what I want to give this talk, what I think is important somehow.
The first thing is that unsafe is a controversial topic in our community,
but, at the same time, it's something that we need something super special that Rust needs to work and be able to do the awesome stuff that it already does.
So, basically, every program you have is unsafe in one way or the other, even if you don't know it.
It is important to have awareness of the implications of what happens when you use misuse unsafe correctly, or if someone else does.

I also want to show you a super cool that can help you write better code,
because it the empower philosophy of the Rust community has of being reliability software, and at the same time, having a super helpful community with tools that helps you to build that.

This talk will have four parts, basically.
First, I'm going to show you a bit what is safe, and what is unsafe,
what is undefined behaviour and how everything works in Rust,
and then we're going to talk about Miri, which is a super cool tool I'm talking about.
Then I'm going to talk bit about functions.
If you like this, if you think this is interesting for you, I can give you some ideas at the end on how can you help contribute in all of this.

So, let's begin by talking about unsafe Rust and undefined behaviour.
Before even talking about undefined behaviour, I think it's super important to know or to discuss why people use unsafe Rust in the first place.

There are two main reasons.
The first one is that some people use unsafe because they're vested in performance,
they want their programs to run super fast,
so they are ensuring everyone of their programs is running correctly,
even if those programs don't have any check to be sure that they're running correctly, and not doing a lot of checks lets you squeeze a little bit of performance when you're writing your programs.
And there is a lot of controversy around this one.
People say yes, performance matters, but safety's first.
There are a lot of trade-offs you can do there.

But the second reason is a little less controversial in the sense that many projects we have in Rust,
you need to interact with other languages, or with your operating system, or with a bunch of resources that aren't Brian themselves in Rust,
so most likely you will have to interact with a C, or C++ library, or create that interacts with a C++ library,
and that doesn't have the same guarantees that it has about safety, and having sound programs and so on.
All those functions that interact with C libraries are unsafe too.

So, now we can discuss what unsafe can do.
Inside unsafe functions, or unsafe blocks, when you have the two, there's not much you can do, actually.
You can do only five things, not any more.
You can de-reference raw pointers, you can call functions that are marked as unsafe,
so if you have a function that is called unsafe and in general the name of the function, you need unsafe to call it.
You have to do an unsafe block or function.

There are some traits that are marked as unsafe too.
If you want to implement those traits like `Send` from the standard library, you have to use unsafe.
If you want to mutate the statics because you're sure that the program needs some sort of mutable global state, even though some people don't like it, you can use unsafe to do that.
You can use unsafe to access fields of unions.
Unions are like enumerations, but they don't have the consistent back to distinguish each variant,
so you can literally join two types in a single one, and use every value of type as any of the possible variance at the same time, so you need unsafe to access those fields.

However, for the purposes of this, we are going to focus on the first two, because those are like the more likely - one of the more demon, likely we've been exposed to this at one point.
And, the first one is the de-referencing raw pointers is worth discussing at the moment.
What are raw pointers?
Many of you, if you have already used Rust, you know that we have references, we have ampersand mute and sand mutable references, and these are like two brothers or sisters, siblings, whatever.
They are called raw pointers.
We have `*const` and `*mut`, and they exist because they don't follow the same rules as references.
They don't have this liveness constraints.

For example, you have some data, and you create a pointer to it, and you drop the data, it goes out over the scope, it's deleted.
You can have the raw pointer to it even though it is pointing to something that doesn't even exist any more.
So for these reasons, there is something else, and you can also offset those pointers using integers,
and, if you have a pointer to a particular memory area, you can add it like an integer, and you can offset it so you can read a part of the memory, and maybe you're not supposed to.
For those two reasons, those pointers might have a lot of problems and might misbehave in several reasons.
You can have null pointers that don't point to anything, really.
They can be dangling.

There are pointers that, let's say, are pointing to something that doesn't belong to us,
so if you're inside a vector, and you saw a pointer from inside the vector to access something outside the vector, that is a dangling pointer.
Also, if you have a pointer that you offset it a bit but you didn't do it correctly, i
so for example you have a pointer between, I don't know, you use 64s, you use 16 bits instead of 64 bits, you will end up reading, like, in between values - that's an unaligned pointer.

So, those are real pointers.
You can do a lot of messy stuff with them.
We're not sure why that is wrong really, right now.
We will go into that later.

But let me show you an example of how to use these raw pointers, and how to use unsafe, and so on.
Here in my terminal, I have this tiny crate.
It has a single struct called `ByteArray` which has a mutable pointer to `u8`.
You can think of this type like a slide, or if you want, like a vector, but we are we only have two simple functions.
We can only read stuff from it.
We cannot grow it or make it smaller.
We can just read stuff from it.

Usually what happens is the system, like you have these two functions, you have like the unsafe unchecked version of a function, and then you have the you have the safe version of it.
Here, we have the unsafe function called `get_unchecked`.
It receives an index, it takes this pointer, casts it to a `usize`, and then adds the index to it and casts that integer back to a pointer, and offsets a pointer by adding index to it and then we reference it.
Actually, all of this code, all of these three lines are not required to be done inside an unsafe function.
The only thing that is unsafe is reading from the pointer, calling the reference star operator.
So you can use raw pointers however you want, but the reference then, you have to use unsafe.
Then we have like the safe counterpoint of this function, so we guarantee that,
if the index you're reading is out of bounds from the length of this array, then we would return none, and if we are sure that we are in bounds, then we return "some", and then do a `get_unchecked` function.

When you run this, for example, let's say this is a crate in the Rust ecosystem, using crates.io.
They might just do something like this.
They just import our library, by type, colour function that I didn't show, but it's called zeroes.
They might need to use unsafe, because they need to go super fast with this thing.
They will just use `get_unchecked`, and, if we run this, it returns zero.
It works as intended.
Some did you might be asking if you do this, you call this function with a ...
index.
We will get to that later.
Yes, that's the demo.

And the big question now is, well, actually, what can go wrong when you use unsafe?
You might have answers if you're using it wrong, you're causing undefined behaviour, or undefined behaviour is super bad.
Anything can happen when you deliver undefined behaviour.

Let's discuss a little bit undefined behaviour.
Let's say the Rust compiler was written under the same assumption how programs work,
about the programs we write, we write programs that need to meet certain conditions so the compiler can actually compile them into what we want.
If we break any of these rules, we say we are calling undefined behaviour.

As Stefan said, this is like a way of saying if there is something that is not specified in a clear way,
if the compiler is trusting that to happen and you're breaking that rule, then you're causing undefined behaviour.
There is something super important in that undefined behaviour is different in each language.
C has a lot of rules for undefined behaviour, and those rules are not the same.

For example, whatever Stefan told you about adding an integer, and going out of bounds and adding too much to your integer
because it can feed a number too big, that's not undefined behaviour in Rust, but that's undefined behaviour in C.
Because both compilers were built with different guarantees in mind.

Actually, the list of things that was considered important rules when we are dealing with undefined behaviour is a little bit tricky, so I'm just going to mention some of them.
Your program might have undefined behaviour if you're referencing pointer that is dangling unaligned.
Also, if you try to produce a value that is incorrect for their type, so, for example, Booleans, when you look at the actual memory, let's say, Booleans are represented by bytes.
They take one byte exactly, so you have a one or a zero, but a byte has, like, eight bits, so you have a lot of values that you could use.
So, one is true, zero is false, but if you take a three, and you try put that an into a Boolean, doing that is undefined behaviour because three is not specified as a Boolean.
The Boolean should not know what to do if it sees a three, on one, or a zero.
Causing that is also undefined behaviour, and there are lots of rules that need to be taken into account here.

So what happens if you break these rules? Basically, Rust cannot work correctly.
We lose this guarantee that Rust has that of producing programs that do what we want them to do.
Rust can no longer compile that program correctly, so what this means is that, in the best case, your program might not run, maybe it pros receives them into a folder, memory out of bounds error, or something like that.
In that case, it might run, but not as you intended to, so that program might do anything.
For that reason, it's pretty common to see this kind of psychedelic image with unicorns, and a lot of colourful stuff when people discuss undefined behaviour because when we deal with undefined behaviour, we lose track of what our program is doing in the most basic level.
We don't even know any more.
So there is good gnaws for us in the Rust community.

If we are using safe Rust, if we promise never, ever, ever to use unsafe, we don't have to worry about undefined behaviours because undefined behaviours should not be happening inside Rust.
If you are super sure you're not causing undefined behaviour and you get performance benefits, or you can interact with C libraries correctly, and you've got undefined behaviour, that is also good.
There are also not such good news, and that is the super important part of our ecosystem.
If we're not causing undesirable behaviour ourselves, someone else in our dependencies might be doing.

Mere, I have interesting statistics about this.
24% of all the crates that had in crates.io uses them safe directly.
And - of those 20% crates, all those crates, 74% of them do unsafe calls to functions that are in the same crate, so our crates using unsafe to Saul function that in the standard library, or, in other crates?
If you want to get more information about this matrix, you can Google or use your favourite web-search engine to look for this paper about how do programmers use unsafe Rust?
My point is that unsafe is everywhere, not because people aren't good at doing their job, because we actually need it.
It's everywhere.

I also have good news.
There is a tool that you can use to detect undefined behaviour in our programs, called Miri.
If you want to take a look at the Miri repository now or later, this is the URL.
You can find all the coding there.

So, what is Miri? It is a virtual machine for Rust programs.
Miri doesn't compile your program, it interprets it in the same sense that the JVM interprets the other code, or byte code, or the Python interpreter runs Python, or the ...
Miri is like that but for Rust.
It has a super cool feature that none of the other interpreters has, and it is that it can detect almost cases of undefined behaviour while running code.
What is interesting is that am so.

Code used in Miri is used in the engine that does compile-time function evaluation, so, if you have any c assistant in your programs, you have a const function, part of the code is used to run.
It is used to evaluate that scant.

Yes, ...
but here we are talking as Miri is just a standalone tool outside the compiler that can interpret your programs.
So how to use Miri? You need the version of the fire to do this.
You have to install the nightly toolchain.
You can do this by running the `rustup toolchain install nightly`.
You can install the component.
You just have to do rustup - and then, after Miri installs, it takes a while compiling but you can run binaries, you can run your whole program if you want with Miri, or you can run just your test suite if you have a test.

Let's do a demo with the same code I was showing you before.
Again, we have these super tiny program using an external crate, let's say.
And maybe the person that is writing this program doesn't know about the garden at this time that that crate has to be sure that these functions don't cause undefined behaviour.
You might be attempted to do something like can I read the 11th precision of an array with ten limits? Who is stopping me? The compiler is not complaining.
It works.
It actually returns zero.
That is a perfectly good value because it returns the same as before.

If you run this with Miri, you will find this super cool error that says undefined behaviour.
Pointer to allocation was de-referenced after this allocation got freed.
It points to the part of the code that causes this undefined behaviour and is appointed a reference.
You can see more information and so on.

What we are looking for here is what it happening in the execution of Miri is that this function is creating a pointer that is dangling.
You created a pointer that is outside the actual range of the vectors, so, when the vector gets deleted because it is deleted after everyone has used it, you still have this pointer pointing to nothing.
But, for example, if we go back to the perfect case where we didn't have any undefined behaviour, we can just do cargo Miri run, and Miri won't complain and return the same as your regular program.
So that is how we can use Miri, use it to detect undefined behaviour.

But, now I want to show you, I want to, because it's a little bit how Miri works, actually.
To talk about how Miri works, we have to dig into how the Rust compiler works.
So this is like a super high-level overview of the Rust compilation pipeline.
This is like the lists that a program follows when it is getting compiled.

So we always start a source code with our .rs file and end up in machine code, or in a binary, or dynamic library, something like that.
And what happens in the middle are like four stages.

The first one is parsing.
So Rust reads the text of your source code, let's say, and parses it to produce an abstract syntax three or AST.
Then this AST is transformed and produces a high-level intermediate representation, or HIR.
In this stage, it is where the process happens, the typing happens, so a lot of types are here at this stage.

Then the HIR is lowered to another representation into the MIR presentation, but this is a mid-level representation, MIR.
This is where the borrow-checking happens.
And after that, we start interacting with LLVM, that is for compilers that Rust uses, and the LLVM project has their own intermediate representation, so we lowered MIR to the.
And finally, LLVM does the code generation to produce your binary file, or your library, and so on.

Miri works almost in this way.
The only difference is the code generation stages don't run so, we don't get to talk with LLVM.
What happens is that Miri lets the compiler run until you have the review program, and we interprets that.
When it has byte code in the JVM, Rust has MIR when running Miri.
That's why Miri is called Miri, because it's an MIR interpreter.

Here is something super important, that Miri cannot interpret programs that aren't Rust programs.
So you have a C library that you run with your Rust program.
We can't interpret that in any way.
That program doesn't have the same syntax, the compiler doesn't even understand that program.
You can't interpret that.

And there are many limitations, actually.
There are some limitation that is Miri has.
Miri is not perfect.
It's not a silver bullet for your undefined behaviour problems.

Another limitation is that Miri is slow, so, if your test or program is performance-sensitive, it consolidate can take a while to run your program, even if you can do it.
This happens because Miri has to do a lot of runtime checks about your pointers, and how memory is managed to be able to tell you when undefined behaviour is happening.
And the other important point is that Miri can only detect undefined behaviour as it is happening.
If that doesn't happen, Miri won't be of use in this case.
Miri cannot detect data races yet.
And, again, Miri can only interpret Rust programs.
This one is super important.

You might be wondering why does this matter? And it is because, well, you know, programs don't run in isolation.
We tend to use files, we tend to access files, get resources over the network, interact with databases, we need to go to the primitive of our system, whatever.
And the mechanism that Rust uses to interact with, those are for foreign functions.
That is what this last part is about, foreign functions.

Some of us might be, let's say, might be think that we don't need foreign functions at all.
Maybe we have never used external functions in our projects.
But I'm not sure - I'm sure everyone, or almost everyone, has interacted with the standard library to do standard operation reading files, whatever, and that means somehow you're using foreign functions.
For example, this is the stack trace when you call `File::open`.
It's on the library for opening files.

There are six functions here.
The first two are like Rust functions that are in the standard library.
They are platform-independent.
Then we have like four functions that are specific for Unix-like platforms, so those only run on Linux, MacOS.
And then we have this `open64` function at the end.
The only part about this `open64` function - the `open64` function it's a Rust function - it's an Linux system used to open a file.
So this is a foreign function written in C.
And it is an unsafe function, and Miri cannot interpret it, so what happens if in any of this process would be we have undefined behaviour?
Can we run that?
It can interpret the `open64` function.

The good news is that Miri can actually run your program in a particularly interesting way.
And, yes, Miri cannot interpret your foreign function, but it can intercept this call, so, when you're running your program,
if you call `open64,` meaning it will be someone calling `open64,` that's a foreign function that I don't know, that's not a Rust function, and then contributors can write whatever code they want to emulate that function.
We call the code that emulates a function an shim.
And if an shim needs to interact with the operating system, or with any of the resources that the standard library provides, we use the standard library for that.
So it is funny, because the standard library uses foreign functions, but Miri uses the standard library to emulate some of those foreign functions.

Let me show you.
We are instilling our example with a `ByteArray` crate.
We have a user that is concise with an index it wants to use from a config file.
It uses file open, so eventually, it will use `open64`.
And we are doing the same.
We're just printing something in unsafe.
If you try to run this with Miri, we will get an error, but it's not because we are causing undefined behaviour.
We have this `open`.
It's not available when isolation is enabled.
This is the `open64` function I was talking about.
Open is not available.
Please pass the flag to disable this isolation.
So if we to that, and set the Miri flags to Miri disable isolation, we can actually run.

In this case, it seems the config file is causing undefined behaviour.
It says memory access pointer must be in bounds at offset 11, but it is outside the pounds of the allocation which has size 10.
It seems like someone is reading the 11th procedure with ten 11ths.
Yes, it is really in the 10 position for the 11th if you want to think in zero, in zero-based indexes.
And that's the whole problem.

So, yes, we can use Miri to detect undefined behaviour, even in programs that use foreign functions.
That's super cool.
And, actually, the handling files can do a lot of stuff.
You can minute directories, delete files, create symbolic links, you can spawn threads, using locks and atomics, you can use it to get the current time, so run clocks inside your program,
your Rust program running Miri, you can handle environmental variables, and each of those operations is possible someone decided to write an shim for that specific foreign function.

And this has a super cool side effect, well, not so side effect.
Some people would target to get this working.
That is the std library works across many platforms.
You can use phenotype opening beneath your one to zero platform.
So this means that you can emulate foreign functions, even if you are not in the platform, the program is going to be compiled on,
so for example if you have a program that is supposed to run in Windows with you you don't have a Windows machine, you can use Miri to interpret that program as if it were a Windows program.

Let me show you.
So here we have another user of our library.
This time, it is using environment variables to set the size and index it wants to read.
Miri can emulate an environment inside it, so we can do - we can use the size environment variable to set the size of the array.
We set the index to 1 bus we want to run that, and we disable the isolation.
And I'm using a Linux machine.
I'm going to run it for a target that is windows.
I don't have Windows installed here.
And it works.

If I want to run it in anything else, I can do it.
I'm running it on my regular Linux target, and it is working.
This is super cool, because maybe you can use Miri in one situation when you're not sure these codes that you wrote specifically for Windows is working correctly.
Even if you're not using unsafe, you just want to be sure your program runs as intended.

And, yes, basically, that's like the hard content of my talk, and I want to spend the last few minutes talking about contributing to Miri.
If anything of this caught your attention, I encourage you to contribute to Miri for many reasons.
My personal reasons is that I always wanted to work in compilers because I find them super interesting.
I really like Rust and I didn't know where to start.
So I found Miri.

I say, like, okay, I could implement maybe like some foreign functions for opening files, whatever, it sounds not too hard.
It took a while while I understood tomorrow Miri-specific stuff but it helped me a lot to understand how the compiler works and get involved in other stuff that I wouldn't be able to do otherwise.
Even then, if you don't feel comfortable yet contributing, because, I don't know, you can help this project by just using it.
Maybe you want to use it because you actually write in safe, and you want to be sure you're not causing undefined behaviour.
Some of your dependencies use unsafe and you want to be sure that they don't cause any undesired behaviour.
So there is that.

You can say to yourself what a lot others, many, many heads, debugging, and how the different behaviour works.
Maybe you're expecting that Miri catches something, and it doesn't, or maybe it is the other way round.
You think this program is correct, and complaining.
You can open up - you can contact the contributors to discuss it, or from the Unsafe Working Group also.
There is something super important, and this is not like an obligation you have with the community.
If your program is running really slow in Miri, that's fine.
You don't have to give anyone coverage for this.

But if you're super interested in contributing to Miri, writing this is a super easy way to start.
Or, if you want to try it yourself, it is super cool, because what you have to learn is actually you have to read your platform specification about how would that foreign function work?
And the stuff that you need to learn about Miri is really small.
You need to know how Miri works completely to do that.
I don't know how Miri works.
Like I use some little parts here in there, and I implemented a lot of things because I like them.
Even if you don't need that shim, maybe someone else needs it, and you're not just testing the undefined behaviour, you're helping everyone write better and safe code, because a lot of people use a bunch of things.
If you want some specifics for Windows, many of the chains haven't been implemented yet, and that is fine, because you can cross-interpret like you were in Windows, in Linux, sorry.
For example, if I go back to the program that opens the file, and I try to run it with the Windows target, it will fail, but it will fail because this function createfile W hasn't been implemented yet.
Maybe one of you wants to do it.
There's a bunch of stuff that hasn't been implemented yet.

That's all, so, thank you for your time.
I hope you found this interesting, and I think we can do some questions now if you want.


**Stefan:**  
Yes, the question, so, the 11th element in the - said about receiving allocation that was freed, it was out of bounds, so I guess this is the question:
how far can it track stuff, right? E-yes, so this is not -

**Christian:**  
Yes, this is not clear for me, actually.
Sometimes, this program fails because, when Miri interprets it, it frees the memory for the array before you read the pointer.
So it complain about memory being freed, and sometimes the pointer, the array is not deleted yet, so it hasn't been dropped
So it complains about it being out-of-bounds access, even though the arrays are still there.
So the good news is that any of those are on undefined behaviour,
but Miri tries to be deterministic as much as it can, but, when you disable it in isolation.
For example, it's really hard to be deterministic, because you change your file, that might change how everything worked internally.

**Stefan:**  
So there is a second question:
when Miri's engine is used to execute comms code during calculation, does it run in fast mode with less validation, and how do I assess the difference?

**Christian:**  
I don't know a lot of ...
Miri runs without a lot of of the validations.
It runs when you're running a standalone.
In the current version, it's faster than what I showed you, but it's because they had no do less checks.
Let's say the engine is the same, the same engine but in a different car, let's say.

**Stefan:**  
We don't have dynamic evaluations in const eval.

**Christian:**  
There is a flagging ...
in Rust, that something unleashed.
You can run like, let's say, undisrupted constant evaluation, and most of the time, it breaks the compiler, but, yes, you can actually run whatever you want.
Using Miri inside the compiler.
But that is super experimental.

**Stefan:**  
So long-term, one could have a VM, like a full-functioning VM in Miri?

**Christian:**  
In principle, yes, but there are a lot of questions, like,
for example, you read a file, and you use the file to, I don't know, create some const or define a type that is generic but that makes your compilation unsound because every time you read the file,
it might change, or using random-number generators.

**Stefan:**  
Maybe I can introduce my own question here:
do you think in a very distant future, it will be possible to have Miri included in a binary to have Rust as a scripting language inside your Rust program?

**Christian:**  
Oh, would you. I have no idea!
I remember I read someone was writing an interpreter for - so you can use it like was a rebel.
I don't know what happened with that project.

**Stefan:**  
Was this the Python-like thing?

**Christian**:
No, it was a  little bit different because it didn't run Rust but Miri, you had to write the MIR of your program together with the Rust code.

**Stefan:**  
Okay. Interesting. Another question from the audience:
Would it be possible to do this kind of analysis general LLVM IR?

**Christian:**  
I'm tempted to say yes, yes, you could.
The thing is that you don't have a lot of the type of information you have when you're interpreting the MIR.
In the MIR, you have a lifetime for every single value.
I don't know if you can do that in LLVM IR.
In principle, yes, you can build, for example, a stack model for VMIR, but the inference is you can build it.

**Stefan:**  
You would have to add a lot of metadata because new types maybe conscious in ...

**Christian:**  
Yes, it's harder, but I believe it's possible to do that.

**Stefan:**  
Is there anything you would like to show off, like a final use case, or an idea, hey, if someone is bored, maybe give a shot at this project?

**Christian:**  
Yes, actually, let me ...
let me open a new Firefox window here.
If you're bored and you want to do something inside Miri, we have a lot of issues here.
But, we have this label.
There are a lot of tiny - the shims label, there are tiny problems here.
For example, Miri doesn't support custom allocators, and in the last version, now the pointer allows for a customer locator,
so it is super important now to have a way to use a customer locator for Miri to test with different allocators, for example.
If you're board, you can wrap any of those issues.

**Stefan:**  
Cool.
I'm looking forward to a stable box with customer allocatable support.
That will be very interesting.
Wonderful.
I think we have reached the end.
I don't see any more questions.
It was very well received, and great talk.
Thank you again.
Ferrous thanks you as well.

**Christian:**  
Thanks so much.
