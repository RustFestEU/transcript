**RFC: Secret Types in Rust**

**Bard:**
Daan and Diane get us to the hype  
Of keeping secrets in a type  
Disallowing creation  
of some optimization  
that just might tell the feds what you type

**Daan:**
Hello, everybody.
I'm here with Diane Hosfelt, and we will be talking about secret types in Rust.
So the main gist of this talk will be that some of you may know that cryptographic engineers tend to write a lot of their code in assembly,
and there is a good reason for that, and I will explain why that is, but, as a cryptographic engineer, or aspiring cryptographic engineer, I have to write it in Rust instead.
Because of some of the compilation quirks in Rust, that's not always a good idea, and what needs to be done to make Rust programming language we can use for cryptographic code.
Both Diane and me are here in the at a conference and in the chat, so feel free to ask any questions at the end of the talk, or put them in the chat during the talk, and we will take care of them.

**Diane:**
Hi, I'm Diane Hosfelt, and this is Batman.
Before we get started, I have a short disclaimer.
All of this work was done while I was a Mozilla employee and it in no way reflects Apple's views.

**Daan:**
First, we will talk about timing side channels work, what they are, why are they dangerous,
and then we will talk about how Rust is not suitable to write code that is actually - that actually prevents these channels.
We will look at a couple of hacks that we could use to prevent some of these channels in Rust,
but then we will go more in depth and look at the RSC on secret types to see how we could make Rust for suitable for such code.

So, first, ...

**Diane:**
A side channel is any attack based on information gained from the implementation of a crypto system, not a weakness in the system itself.
In this case, we are concerned about timing side chapels which occur when attackers analyse the tame taken to execute a a cryptographic algorithm, which can be seen as an implicit output.
Imagine it takes less time to execute part of the code when a bit is zero than when it does when a bit is one.
That difference is measurable, and it lead to key recovery attacks.
These attacks are a threat in the post-spectre world, primarily used to attack secrets that are long-lived and extremely valuable if compromised,
where each bit compromised provides incremental value and the confidential shalt of compromise is desirable.
The fix is constant time code, or to be more precise, data invariant code, with the time it takes to execute the code doesn't depend on the input.

**Daan:**
Let me explain to you why at this point it's really hard for us to guarantee that the compiler is constant time.
So this is - this story will be true for basically any programming language that is compiled.
There are some exceptions.
But we are at a Rust conference, so let's focus on Rust.

So the main problem here is that compilers are in some sense problematic.
They are allowed to optimise thinking they feel does not change the program.
And the behaviour, like, or the runtime of a program, or stuff like that is not considered to change the program in the view of a compiler, so, the compiler might actually optimise stuff that we don't think would be - should be possible.
And so, for example, there is this thing that LVM could do which is eliminate any conditional moves that may load.
Let me show you an example of this.
Okay.

So what you see here on the left is I have written this nice little CMOV function, so if this conditional value is true, what it should do is that it should move the value in B into A.
And if this conditional value is false, then A should just remain the same value and B should just be dropped by the way.
But the important thing here is that the conditional value is secret.

We don't want to leak any information about the secret value, so the runtime of this function should be always the same length, the same duration, like depending on the value of this conditional value.
So what we do first is we generate a mask from its conditional value and the value that will come out of this mask will be something like either only once, or if the conditional value is true, sorry,
if the conditional value was false, it will be a mask of only zeros.
And then we will use this mask.

So the first line here, what this does is, if this mask is only once - so if the conditional was true - then it will x, or the value in A - this will set the value in A to zero.
Then only if this conditional value was true, it will x again with b.
A will become - A will get the value of B.
And then, if this conditional value was false and then this mask would be all zeros,
then both of these end operations will make sure that this value with zero, and this value was zero, and both of these operations would be a no-op, and then A keeps the same value.

What we see when LLVM compiles this, Rust compiles it, that the compiler is smart.
The compiler sees, this behaviour of this function completely depends on this conditional value,
so first what it does is that it checks if this conditional value is actually zero, so is it false?
And if it is - if it sees that the conditional value is true, it jumps to this instruction, so it skips this complete instruction.
And if this conditional value was false, then it just does instruction and then moves under the instruction, and that's it.

Basically, in one of the two cases, it's skipped its instruction, and the important thing to see here is that depending on this value,
depending on the value of the conditional, the runtime of the algorithm changes, and so here we have a case where the compiler introduced a side channel which would be a side channel.
The interesting thing is that if we only look at the source code in Rust, it looks like something that, like, it looks like code that feels completely like this could be, or should be implemented in constant time.
We have these operations, and you don't even see them in the compiled code because LLVM is smart enough to see that they're not needed.
And this is actually a pretty big danger for us.
So that is what we mean when we say compilers are problematic.

**Diane:**
Obviously, we're at RustFest, so we've all bought into Rust, but the question remains if we can do secret invariant programming with assembly, why do we need to do it in Rust at all?
Writing cryptographic in high-level languages like Rust is attractive for numerous reasons.

First, they're generally more rateable and accessible to developers and reviewers, leading to higher quality, more secure code.
Second, it allows the integration of cryptographic code with the rest of an application without the use of FFI.
Finally, we are motivated to have a reference implementation for algorithms that is portable to architectures that might not be supported by highly optimised assemble implementations.

**Daan:**
So, then why do we focus on Rust?
Why don't we just, if we can't write secure code, why do we want to use Rust in the first place?

That is obviously everybody here has their idea of why they would use Rust, and in our case, it's kind of the same.
We want to use Rust.
The reason we want to use Rust is we have all these types, and all these nice checks in the compiler that allow us to make our code that is easier to write secure code.
And we want to utilise these checks and these tools as much as possible because writing just plain assembly is really hard and super error-prone, and then there's the other thing that if we only write assembly, then you've written an assembly for an Intel processor.

When you want to run the same code on an ARM processor, you have to rewrite the whole code.
We don't want to do that, because it also allows you to make more mistakes, and we want our crypto code to be really secure, so we would like to use a high-level language if that is at all possible.
So it is not all that bad.
So there is some way how Rust can be in a wayside-channel resistant.
And this, like, a couple of these, so, in Rust been make these new-type style references around integers, a struct that only has some integer type and implement some operations on that that are presumably in constant time.

There are two main examples in the wild.
The first one is the subtle crate which if ever you need to do some stuff in constant time, use this crate.
This is the current state of the art that we have.
This is probably what you should use, and we don't have anything better at the moment, and the other example that I would like to mention is the secret-integers crate which is a bit more academic of nature.
What it does is looks at what if we would replace all of the integer types that is constant time integer type, would that work,
and what the secret-integer crate provides side-channel resistance on the language level, so, on the language level, you're sure that your code looks like something that should be side channel resistant, but it does not actually prevent these compiler optimisations.
The subtle crate does that, and that's why I recommend that crate.

Both of those crates, they are only a best effort, they're only best effort, and they don't guarantee all of the - they don't fix all of the compiler optimisation issues.
So, it is the language level.
We can also look at like more at the compiler level, what do we need to do in a compiler to actually do it right? It turns out we need to add some kind of optimisation barrier for the secret data.

Let me go back to the example really quickly.
So it turns out that the problem here is that LLVM seems to be able to completely eliminate this mask variable, so this mask variable is secret, because it directly depends on this conditional value which we said was secret.
And then because LLVM can just analyse through this mask variable, it can do this really nice optimisation of adding a branch, and then just eliminating all these bitwise operations.
We need to add an optimisation barrier to this mask variable.

And there are a couple of ways that we can add optimisation barriers, and the first example is that we can add an optimisation barrier which adding an empty assembly directive.
We construct an assembly directive which dates this mask value as an input and also takes this mask value as an output.
Then LLVM is not able to reason about what happens inside of an assembly directive.

We know that nothing happens inside an assembly directive, but LLVM cannot reason about that.
Because it will actually keep this mask value completely intact and it will not be able to optimise through that variable,
and so, the assembly directive doesn't work on stable Rust because, for the assembly derive, you need to have a nightly Rust version to compile, so that is not really optimal.

And so the other trick that we can use is to do a volatile read of secret data,
and what this does is guarantees that at some point this mask value would have existed on the stack,
and because of that LLVMs are not able to optimise through this read.

Both tricks kind of work in 90% of the cases.
They do not have like 100% success rate for all our cases.
I won't go into why that is at this moment, but it's important to know that they don't always work.
They're best-effort tricks.

The most important part is that although these tricks might work at the moment, they are not guarantees,
and the compiler might change in the future,
so perhaps in five years the compiler is actually able to look into this assembly directive and see that nothing happens,
and it might eliminate that assembly directive completely and we don't know, we don't have any guarantee that this kind of stuff won't happen in the future,
so it might be that, in a couple of years, a completely secure version of some software now might actually be insecure with a new compiler version which I find very scary.
So, yes, we like to have guarantees, and we don't want to have just hacks.
So, for the next part, I will give the floor to Diane, and she will be talking how we can use secret types in Rust to make our lives a little bit better.

**Diane:**
Why aren't these language-level protections good enough?
The compiler and instructions.
it turns out that the general purpose instructions on various platforms take a variable number of cycles,
so for us to truly have secret independent runtimes, we need to eliminate the problematic instructions.
This can only be done at a compiler level.

Enter RFC, this, 2859.
This defines secret primitive types and the instructions that should be defined for each type.
For all the extra types, we implement all of the normal acceptable operations.
When we know that a value is safe, we can use the declassify version to put it back to a public value.

For example, a secret key may be an array of secret u8 bytes and keep us secure by disallowing any Rust code that would result in insecure binary code.
For example, we don't allow indexing based on secrets, we don't allow using secret boll and if statements,
and we don't allow division which is a non-constant time algorithm, and we don't allow printing of secret values,
and we say that every time we combine a public value with a secret value, it is also a secret.

To give you an example of how this would work, here's a mock-up error message of what would happen if we broke one of these rules.
Here, the programmer chose to branch on a secret_bool.
In this case, the compiler should give us an error because that is not allowed.

There are two parts to this problem: an LLVM part and a Rust part.
There has been some work in that LLVM realm to propose a similar RFC to this one that what we've worked together on at Hacks 2020.
We're not sure what the status of that work is at the moment, but what LLVM needs to do is to make sure that our constant time Rust code is also compiled safely,
so LLVM needs to make sure to guarantee that what we wrote down in the code is safe in the emitted binary, that means no branching on secrets, no branching with secret indices, and no variable time instructions.
At the moment, zeroing memory is out of scope, but when we have this information about public and secret values, then we've laid the groundwork to support that as well.

Thank you so much for your attention.
If you have any questions, feel free to ask us.
While this is a recorded talk, we are currently present and ready to answer questions.

**Pilar:**
All right.
Thank you so much, Daan and Diane.
We're lucky enough to have you both here for a Q&A.
All right, so you've been joined by your friend too! [Laughter].

**Diane:**
Batman came back.

**Pilar:**
Entirely ignored during the day.
We do have a couple of questions from the audience, which is great.
The first one we've got is that this is all very complex.
And how do you discover these kinds of problems, and how do you even begin to think of a solution?
Very broad, but I think it would be great to hear your insight on this.

**Diane:**:
So there are tools that you can use, verification tools, that can determine if on different inputs, there are different runtimes, so that is one of the ways that you can determine is if a program has non-secret independent runtimes. For part of it. Daan?

**Daan:**
Yes, the way we discover these kinds of issues is, like, at some point, sometimes, write a piece of assembly,
and the first thing I do before I write it is just program it in C or Rust and see what the compiler tells me to do,
and then these are the moments that I stumble on, these, "Wait, if I would do this, this would not be secure."
And that's when I first discovered this for myself, so, yes.

**Pilar:**
Cool. You said that you gave us an insight you go with what the compiler says first and then you can discover it.
Be curious about what the compiler tells you, not just like, all right.
Someone has asked if there is a working group working on it on a solution?

**Diane:**
There isn't a working group.
There is just the RFC, which has been a little bit stale, because, you know, life gets busy.
So if anyone's interested in commenting on the RFC, and trying to help me bring it back to life, you know, that is definitely welcome.

**Pilar:**
If there is interesting for a working group, then, yes, someone will hop on from the audience.

**Diane:**
That would be great.
One of the things that needs to happen on the Rust side and on the LLVM side, we are going to have to eventually do some implementation work.
You know, it's not enough just to define what has to happen. We have to implement these instructions on the secret types, so that will actually be a lot of work.

**Pilar:**
So we have very little time left, but there was a lot of chatter in the chat room, so, I guess people can find you in there, and we can get a few more questions.
There were lots of questions, and we just didn't have enough time, but thank you so much for joining us.
It was great to have you here.
She's asleep. She's melted into a puddle!

**Diane:**
Say bye to your new friend.

**Pilar:**
See you both. Thank you for joining us.

**Diane:**
Thanks so much!
