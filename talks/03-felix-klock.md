This is the first time I've given a first talk at a conference, which means I get to pay attention to all the other talks.
First time in my life, I've been able to do that.

I'm looking forward to everyone else's talk.
This talk, all the slides are online, so if people want to take a photo.
Can you go to this link here [this URL](http://bit.ly/2cMFbYB) is not on any other slide so this is the time to do that.



I was invited to give a talk about a technology talk, and that was a challenge.
This thing about technology.
Clark has this third law, is indistinguishable from magic.
That's something interesting we'll talk about and this important second law, which is that the way to actually discover limits possible, to push the bound easier until you hit the impossible.
That has lots of interpretations.
Here, we'll explore this by learning what the limits are about the technology in Rust, by trying things out and seeing where do we break things.
Where does the compiler stop accepting our program.
There is there's also a first law, but it's something about impossible statements and elderly people.
So there's a lot things I could have talked about.
The borrow checker and the trait system, and how traits interact with dynamic dispatch.
There's destructors, which I'm easily obsessed about.
And then there's match, which you wouldn't think is all that interesting.
But there's some interesting detail there is.
So all of those can look like magic.
But subtype suggest a really interesting thing.
It's more like a magic show in that, everyone knows what subtyping is.
If you know what it is, it's easy to get fooled and see interesting things happen that you didn't expect.



So a little comment about magicians.
Who have heard of Penn and Teller.
So he's the one who speaks between Penn and Teller.
And so Penn talks about when he first started learning magics as a young child or young adult, I should say, he actually had a turning point where he came to hate magicians.
He realized, these people are up there on stage lying and he's devoted telling the truth.
He said I can't do this.
I can't lie to my audience and he tributes James Randi, giving him the idea of a turning point you don't have to lie.
Can be honest the whole time and still be a magician.
Can you lie as entertaiment and still be moral.
Penn Californias the truth the whole time he's talking -- Penn tells the truth the whole time and lets the audience lie.
Usually, the trick is going to be getting you in your heads to make you lie to yourselves.
So this is a magic show.
I'm obliged to let you know, there's nothing up my sleeves.
There's something up my back.
But nothing up my sleeve.
A quick poll so I can understand what the audience is like.
Raise your hand if you know what the playground is.
So how about if you know the difference between a slice and a Vec of T.
Raise your hand for that.
And finally, do you know what phantom data of T is?
Oh.
wow.
More than I expected.
What is subtyping any way?
The important thing about subtyping another meant to be this thing where if you don't have subtyping, if your compiler insists your expected type, matches the exact of type of expression you're giving you, the required things always match, compiler will reject programs that seem obviously well-behaved.



So there's intuition that items into play about the provided type, somehow being compatible with the expected time.
We can think of examples in Rust where this comes up.
If I have a mutable reference to a vector but I want a slice, those seem like they might be compatible.
Or have I a string.
Or I need to return an error.
My function itself, returns results with a parse error.
And the interesting thing is, in Rusts.
You find out if you get that kind of compatibility.
If this thing seems like a subtype of another.
It's all about trying out things, that happen to work.
Whenever there's blue in may talk.
It means there's a link to a playground session.
Usually, you can try it out yourself if you're following along on your phones or whatever.
There's a phase compiler so phase 1, we get the text and produce MIR, and take the MIR and produce output.
There's possible phase 1 and 2 errors.
If I can compose these work things, can I do that and have an EndToEndErr.
Can you run this code, it'll compile and be just fine.
This seems continued be subtyping.
Maybe Phase1Err and Phase2Err are subtypes.
For an EndToEndErr.
I mentioned before, vectors and slices.
Also, kind of looks like subtyping.
We have a vector.
We need to have a slice of T.
So what happens then, so I have a specific program here.
Where it's this dummy little rotate program that takes slice of integers, and saves the first one, then shifts all the other once up, and stash that is first one at the very end.
So really, just rotating the whole slice by one element.



And can you just try this out.
See if this compiles.
Make a vector.
Try passing it in.
And in fact, this doesn't compile.
But it doesn't compile because of some incompatibility.
You've probably had this experience of trying something out.
Turns out Oh, there's some small change I need to make.
I had to actually, you know, grab a mutable reference by doing ampersand V.
Still we're seeing phenom nan.
Can I take a mutable vector and pass it to a context that's expecting a mutable slice.
That's interesting you may have noticed, it took me a while to explain the rotating func and we're going to focus on subtyping.
We're going to try to reduce ourselves to a model to explore want so here, I'm going to try to always strip my examples with this minimalist form.
Where in this case, I talk B I have something I want to provide to somebody else.
I have a mutable reference to a vector.
That's what the provide function has.
I want to pass it to a context that's expecting something else.
A mutable reference to a slice of integers.
So have I that up here.
That's the kind of code that's really presenting the idea of these things being compatible.
And also pictorial form with taking a mutable reference to a vector and passing into the function and over all idea is if these things compile, they work.



If you try to run this code, you'll get an Err because there's the unimplemented macro in there.
So of course you're going to get a runtime error.
The whole point is to see if this compiler instance code.
That's the name of the game.
Another example where you might see some compatibility relationship.
Is when you have a mutable reference to some type and you need an immutable reference to T.
So maybe a compatibility relationship there.
You can try and see, and use the skeletal, strip-down form I showed we're providing a mutable reference to some slice of integers and we're going to pass it to an immutable reference.
Again this compiles.
Now examples involving methods.
So methods in Rusts.
If you have the key word self or capital Self.
You're talking about some sort of method.
I want to talk about all the possible combinations of taking by value or taking something by reference or by mutable reference and see if you can combine these things.
And we're going to look at methods by char arrays.
If you have a built-in type like char do you want add methods to do it.
You can do that in Rusts by making a trait.
I'm trying to add this increment to all chars.
It increments itself by one unit.
So for example, take the letter A.
So the way it's implemented for char.
This code here.
Doesn't matter the details of that.
This sort of works.
I've had a test here showing they start with A.
I get out B.
I'm just reviewing how method extension works to add new methods to a type.
So having said that I want to show you a different trait where again, the whole point is just to focus in on, can I pass one thing into another place that's expecting something else?



So I've made this dummy trait receiver, awl I'm trying to do is demonstrate three different kinds of methods.
There's a method where you take self by reference, by mutable reference and a method where you take self by value.
See different kinds of selves there.
Ampersand mut self.
And by value with no ampersand at all.
I've got the implementation of the method trait, for char.
We're going to print out which case we're in.
And then it's going to try to modify the second element of the array for the cases where we can do not.
Here's a sanity check first, just to make sure we understand what this trait does, where I'm just going to show you.
I create three different char ashes express I create a char array A, that's just the array itself, being passed around by value.
No references at all.
B, reference to a char array and C.
And I call A by val, C by char.
There's no interesting compatibility issue here.
It's just inputs and outputs and request we run this, you get exactly what you expects.
I called val, by ref and mut, and I obviously, have these three arrays again.
May not be obvious why that's the case, but that's not really the important thing here.
The important thing is that these cases are compatible.
And you may notice the very interesting layout for this code where it's got this diagonal going across.
There's not just three cases to consider.
There's nine cases to consider.
I want to try every possible input, valuable mutable reference W every possible expected input.
So that's a 3 by 3 grid which looks like this, and the interesting thing here if we were to fill in all the elements of this grid, it wouldn't compile.
If you remove one element of the grid.
I've got that comment,that cell at bottom where there's a middle column and something is missing.
This now compiles.
Only case rejected by the compiler B by mut.
It seems like can you go from an immutable reference, to a mutable one.
That's disallowed, but for some reason, going from a value to a mutable reference is allowed and perhaps even more strangely, going from a reference to a value is allowed and so on.

All those other cases are allowed.
You might ask yourself, wait, how is that happening here?
What is going on?
Are these things subtyping at all.
What are we talking about in so a person with experience, doing the job of runtime hacking or hacking for other kinds of dynamic languages, you might say look.
The representation of these two types a vec is represented by the three words, directly inline, embedded in your stack frame and slice is represent by the two words, and the layouts aren't even compatible with each other.
So how can these things possibly be subtypes of each other.
If you're think going the runtime representations and how things work.
That doesn't make any sense at all.
You can't just pass in a slice or you can't pass in a vec with three words and expect a two-word slice.
That doesn't make any sense at all.
But have I to take a moment here and I, myself, had that initial reaction, and I started reading text book, the text books and subtype.
No.
There's other semantics, where you talk about coercion and that's considered subtyping.
It's coercion based semantics.
Let's wonder for a second here.
Is this subtyping?
I just spent a little while, talking about those samples and I'm going to put them aside.
We'll come back to them.
To first explore this text book notion of subtyping.
So a classic example of subtype negligent text book.
They'll talk about anonymous records and say, if I've got 17 fields and I want to pass it somewhere to a place that expects just two fields but they have the right name and it is right types.
They are compatible.
If I had three elements and passed it to a place that has the first two does that work?
The answer is no, it doesn't.
This does not compile.
There's something questions as to why that might not compile.



Another example of textbook subtyping, the fundamental one for the academics is what happens when you have functions.
If you start off with assumptions, that you're going to have integers and reals.
I mean real like supporting, represent things like pi, exactly, you know, being able to generate pi to whatever precision you want, et cetera.
So there's interesting questions when you have that kind of subtyping where you say, okay.
I have a function.
That's a type real Err and I want one that takes real to real.
Is or a function that takes int to int.



If I have a function that takes integers to integers, and I want to pass it to a place that takes reals to real estate.
Is that going to work?
It won't work because the integer-to-integer function, it assumes it's input type is always integer.
So you're going to break things you pass to clients, that want a real function because they might pass in a real number.
So here, I have an example where we have a `twice` function that applies its first argument twice to some input.
And there's a `num_divisors` function want it's going to give the number of devisers for that integer.
I can give you some example inputs and results for that function.
The point is, if you try to point to divisors, you get `num_divisors` to 2.3 and there doesn't make sense.
I can't talk about the number of divisors a sensible way so the point here, definitely, no matter what, there's another example.
If I have an example of real to int and I want one that takes reals to real, does that not work?
So in this case, this works out.
Something where you can have a function and pass it to something that wants reals to reals.
I give an example of passation ceiling function.
This modified ceiling function and it all works out, you plug the types together.
And there's no errors along the way.
And this makes sense.
If we ignore about runtime representations mathematically, this seems like it makes sense.
The client is saying, I handle any real number.
So if you give me something I'll give a real number and a.m.v I'm going to handle any real number back if I felt give a function that is guaranteed to turn reals into integers, that's fine.
The client is able to handle integers.
I can handle a real they get out.
It's obviously fine to narrow that to just integers, in terms of the function I hand to it.
So how about this example?
I had a function in my hand that takes real integers, and I want one that takes real to reals.
I wanted to show you what this looks like in Java.
You can encode this by vague class real, and method.
You then have a subclass int.
Can you have methods, Java compiler, compile this is just fine.
And actually, if I want to encode this more accurate.
Have fun, that turns real to reals and but actually, the interesting thing here is that Sun didn't really originally support this code T.
only add it in 2004 with covariant return types.
We'll talk about that in a little bit.



So to try to reason about these kinds of relationships, to be able to argue why int-arrow-int and int-arrow-real are not subtypes but these, are.
Type theorists use deduction rules.
They write a precondition and post-condition with a line between them.
So, for example, of one of these would be, hey, if A is true and B is true, then the statement A and B is also true.
That's the kind of reasoning you can use.
So a rule for function values is if I can prove Y, the subtype of X.
I should be able to prove A arrow Y is a subtype of A arrow X.
The A arrow is covariant with respect to its return type.
If int is a subtype of real, then real-arrow-int is a subtype of real-arrow-real.
Get out an X component functions.
It's safe to narrow it and say, I'm going to give you you a Y.
And they can handle Y's.
And Y say subtext of X.



What about if I have a real-arrow-int and I want a function that takes ints to ints.
The client isation, I will feed integer into the function.
If you give me something that can handle reals as well.

That's gravy.
Not all languages support this.
The example before the covariance, you try to encode this example, it won't work.
Java has overloading its input types.
Doesn't work out the same way in terms of these things and subtyping.
This is what the type theorists will write down.



Co Senator and contra eventer, with respect to archetype.
And again, this is me repeating myself.
The idea is the caller can feed in a specific Y and get out more general X and it's more liberal N providing a function that request accept any at all, generalizing the potential inputs and narrowing the potential outputs as to why if you want to have Y arrow C and X arrow -- think about that for a little bit.
Now, we might ask the question, does Rust have these properties and it kind of variance property I've been describing?
We can try plugging in those types I just showed at the very beginning.
Here, I have a reference to a vector and integer, and I showed how on the left-hand side of this picture, how these things are compatible.
But if I try to generalize that to this Senator type stuff N terms of functions, and make a function type that rather than vector and pass it to a thing that want ace function that returns an integer slice T turns out this doesn't compile.
Rust compiler rejects this there's something funny going on here.
The left side compiles but the right-hand side does not.
Another one of my examples, where I talked about a mutable reference to a slice and passed into a context that hasn't immunable torch a slice.
The higher order of generalization, I made these function that is return a mutable reference and wants a function that returns an immutable reference.
Code does not compile.



So from these examples, sounds like we might conclude that Rust does not have variance.
Doesn't have covariant types.



Simon is here now, we'll see if he remembers this.
He said I have code that doesn't compile and I don't understand why.
I worked on it on my own and reduced the code down to a minimal thing.
I came up with this minimal example that used the library type cell.
I still didn't understand why it didn't compile.
I don't understand the source code but can I look over it quickly.
I'll make my own version.
Maybe that will help me understand why this doesn't compile.
So Simon made his own version of cell.
When he did that, the problem within away.
So let's try this ourselves.
Let's make the standard library cell or cells.
Here, we have MyCell.
It has some type T.
Stores T.
Embedded directly.
And you can create a cell.
All have you to do is call new, in passing one of these T's want can you get the value from the cell.
You get and copy out value within the cell itself and makes a copy of it.
The interesting thing is the set method.
And what the set method does, is use a little bit of unsafe code strike let's grab the reference to the embedded value, and use the Corner to write in the new value.
This is some code that seems to behave the way that cells should.
And a fundamental question right now is, is this sound?
Is this use of unsafe sound?
And the answer is that this is actually completely and totally broken.
Please do not do this and take this code and use it in your own projects.
It does not work.
It is bad, bad, bad.
There are many reasons for this.

One reason is that there is secret information that the compiler makes use of, that the standard library cell knows about and this code does not.
That can expose brokeness, with respect to parallel execution.
That's one reason.
In the single threaded case, it's still broken and that's what we're going to be talking about right.
So there's another subtle reason.
So let's talk about this.
Here is some code.
Now, don't panic.
This is complicated code and I don't expect to you understand it immediately, although I do have a link to it as usual.
So follow the don't panic link to the code.
But the important thing, I want to point outlooks two printout statements.
There's a printout statement where we print out the value of the execution where it's step 1 and we print out the value at the end.
So we do that twice.
There are two interesting numbers.
The number 10 at the top.
Redefine the variable X and number 13 that occurs when we have it local variable val in sidestep 1Q.
we run this code T prints out 13 for the value of step 1.
On my machine, it pinned 28,672 for the value of the int.
When you see this kind of thing, this is usually a sign that something terrible has happened, when you have random numbers just pass up.
You see garbage like this.
That's a sign, something is very wrong.



I want to explain how this is happening.
This is the same code but I reduce today a bit to fit fit on the slide.
We're going to create this my cell thing and call it step 1.
We're creatation reference, with the initial let cell = call, with a reference to X next line, we're going to call step 1 so there's a new stack frame now.
Below it on the stack and it passes in a reference to the cell.
So took a reference to the cell.
That's what `r_c1` is.
and there's a reference to the cell itself as well as value we create on the stack frame.
The value, 13.
Then step 2 with a reference to the value.
So now, we have another stack frame that points to the val.
And another reference to the cell.
`rc_2`.
Then we call set with our Val so we move the pointer so the cell points to Val on the stack frame.
We pop the stack once and we ask hey, `rc_1`, what do you hold?
Oh.
I told 13 much that's the first line and we have a pointer.
This is the kind of bug that Rust is supposed to stop.
We're not supposed to have daily pointers anymore.
Either my cell is broken or the Rusts compiler or Rusts language is broken.
You know where my belief is here.
So the question here is then okay.
Is cell also broken?
And the easy way to test this is plug in cell into that same code again.
We plug in cell into the same code, the exact same code I showed you, the compiler rejects it.
Tell you no, no.
We're not allowed to take into account reference to Val.
When you take step one.
Doesn't live long enough.
It has to live as long as lifetime A and value of borrowing doesn't live that long.
Compiler smart enough to reject this when you use cell.
Why is this happen something what is the difference between my cell and cell?
I can't to the source code found outlook.
My cell says it has a value.
And cell says it has an unsafe cell and unsafe cell says it has a value.
What's the difference here isn't difference is that there's some special unsafe cell, the compilerness about why are we accepting the my cell code.
The answer is subtyping variance, that thing I tried.
So Rust does have subtyping.
It arises from references, and arises from the region relationship between lifetimes.
So it's the crucial place where the language developers realized, we need subtyping in the language.
So here's an example of a place where subtype suggest put into play.
This pick function is going to take two references.
One say reference that has lifetime A.
And another is another reference tahas static lifetime.
It's going to return a reference tahas lifetime A.
But we can pass back why.
This is a place where we can pass back Y, this thing with static lifetime, as the return value.
Or can you pass back.
Either one works.



This is a place where there's that compatibility but in a deeper level, in terms of what the compiler knows about.
So the whole big idea here is the static reference, that's something where we know that it's safe to pass that back.
And pretend something has a reference of lifetime A.
When you say a reference has a certain lifetime.
You're not making any statements when it will die.
You're saying it will live at least this long.
You're not make anything guarantees it will expire.
So yeah.
This is May repeat myself.
So references, able to return and there's the tin tax in the lifetime.
One lifetime out lives another.
By writing down lifetime, Cole and other lifetime.
And static lifetime out lives lifetime A.



What about the other direction.
We try to take a reference of lifetime A, and pass it back.
And that's definitely rejected by the compiler.
The compiler rejects that, because it would to the be sound to take short lifetime and act like it has a longer lifetime.
This is how you would get pointers.
So the crucial thing here is to see for any tight T and lifetime A.
Clearly a reference of static lifetime T should be valid anywhere that a reference of a lifetime A of T is so we can make that strip down example like I've been shog before.
Where we pass in a static reference into a place that expects a nonstatic reference or write down, and say, if the static lifetime out lives the lifetime A.
Static reference should be ray subtype of a reference with lifetime A.
More generally, we can not talk about static at all and say, if you have two lifetimes, and V out lives A.
Then there's a subtyping relationship between the two references, the one where the reference of lifetime B is a subtype of the reference of subtype A.
We have already established the static lifetime, a reference of static lifetime say subtype of lifetime A.
What if we go a little further.
What if we have a reference to a reference?
Should a reference of lifetime A that points to static data be a subtype of a reference of two references of lifetime A?
I don't know.
But intuitively, all you can do, when you have an immunable reference is read the data by that intuition, by the same logic, all can you do is call them and read the return types.
So you're getting something out.
Same intuition applies here.
All can I do is pull things out of them.
I can't store new things in, in principal, and thus, that's what leads to an argument if Y say subtype of X.
Then in fact, yes air, reference to Y say subtext of X, which allows us to include this question mark up here above is the reference to static data, reference to a reference of static lifetime, a subtype a reference to a reference and they are.
A way of saying this is a reference to X is a covariant.
Okay much that's immutable references.
What about mutable once?
Should a mutable reference to a static reference be a subtype?
You can take that same example from before.
Except now, we don't have my cell.
We take that same example and use static data and make a reference to a reference.
One of static lifetime and one with nonstatic lifetime and the compilery rejects this.
If the compiler allowed this, we can use the same picture and same stack layout, in terps of the dangling pointer you'll get.
So it's important to compiler reject this.

Therefore, it's important that when you have this kind of situation, then when you have a reference, a mutable reference to some data X, it's something where you can't have a subtype.
You cannot use a subtype Y in that place.
And to here.

The intuition behind this once you allow mutation, once have you talevel and direct to allow mutable referencetation.
The type has to remain fixed.
You can't start trying to narrow the type at that point.
And the easiest way for me to see this is by looking at other languages, like Java here's some code in JaA.
quick show of hands.
Who thinks this code compiles in this is an array of numbers and I'm storing in a new float they create from.



Who thinks this compiles?
Interesting.
Okay.
It does compile.Y and also, Java race are covariant.
With respect to T.
Which means can you actually create this function that creates an array of integers J and passes it into the modifier, which takes the array of dismembers stores float into the A array of numbers, which is secretly an array of integers.
Now you have an a ray of integers which has a float in T.
it is bad.
Java compile this is code, but gives you a runtime exception when you run T.
the potentially infamous array store section.
This is the Java.
When Rust Bridge, we say panic.
In Java they say runtime exception.
This is an old historical artifact of Java, for date that is support generics, they have better ways to deal with these kinds of problems.
Going back to our earlier question then, that test that I was using, talking about variance and using examples and saying, does covariance apply here.
This example is not compiling, this example is not compiling.
But now, in this situation with this subtyping relationship.
With a reference to none static data can you plug in the return type, and plug in one function to another.
And the compiler accept T.
you see covariance of a return type when we pass these high order functions.
This compiles.
Can you follow the link to prove T.
and Rusts functions are contra variant.
That's kind of interesting.
The reason that this one, for Rusts and Rusts can support this, we don't have method overloading.
So the same conflict that comes up for languages like Java where it conflicts two have that language feature so there's no conflict here.
I want to dive in and explain this variance thing.
Where does it come from?
The compiler deduces by traversing the structure of your types.
Here, I van example of this outer in-line data.
It has two fields, it infers, ah, these are both covariant, with respect to T.
And it is sound to do this.
If you do something like add a mutable reference, then things change so I've changed things so the outer ref, stores mutable reference to T.
Interstill has an immunable reference to T.
Now the compiling says, there's mutation happening through this reference, we are invariant with respect to T.
While interref is covariant.
So there are something interesting things that happen.
You may not even realize the compiler doing this analysis fur, to ensure we don't get those dangling pointer examples I showed you earlier.
And okay detail here, that the people raise their hand for phantom data might already know.
If the compiler see ace phantom data, a 0-size type.
Doesn't occupy space in the structure itself.
It's just there to pretend like you had an instance to this data, in order to get the variance relationships you want.
That's one reason it's there.
It's for variance relationship and also for stuff with distributors.
Which you can come talk to me afterwards.
If you care.
There's details with destructs and forcing them to run at the long times so going back to our cell and unsafe cell.
It's a language item.
The compilerness about it so it treat its especially and says, this is invariant with respect to T.
Because of that, that appropriate bubbles out when it descends into cell.



Versus my cell, where the structural definition alone the compiler inferred it was covariant, with respect to T, and the set method breaks the rules associated with that.
So that was the fundamental problem.
The set method was to the sound want it was an incorrect use of unsafe.
Because the structure definition has implications for the relationship between T and pie cell, that are not preserved by the set method want because the structure should be imposing an invariant relationship.
My cell should be invariant, with respect to T, with the same wait cell data type S.
so one solution is to use phantom data, and input a function from T to T.
Remember earlier I was talking about, what if have you a Y arrow Y and what is the relationship that it's a subtype of X arrow X.
Y has to equal X.
They have to be equal.
So a function from T to T is a way of saying this thing has to be invariant.
So that's one way to accomplish this.
But forget I said that.
If you get nothing else out of this talk.
I need to be careful about this.
If you remember nothing else from this talk much it is don't do the my cell example the way I showed you.
Use unsafe cell.
It's going get it right.
It's really important to think about that ahead of time.
Once you start using unsafe code, you need to think hard about Do I start using unsafe cell, so now, I want to go back to the examples I showed at the beginning.
I talked about all these examples that seem like they might be subtyping.
There's duck typing where if it walks like a duck and quacks like a duck, it must be a duck.
Here, I'm saying, yeah, those walks and quacks like subtyping relationship.
They're not because they Miss That would crucial variance thing how functions are handled.
What are they if they're not subtyping.
What's going on?
So here is where I show you the secret behind the magic and what's going on behind the scenes.
There's a whole collection of different technologies that are interacting to get those effects I showed you earlier this is a reason -- who here has programmed in C++ or C for that matter?
Okay.
Good so there's a distinction between the dot operator and err operator.
Other times you do Y arrow F and that always bugged the heck out of me, before I understand the difference in what they were expressing.
Rust doesn't need the two syntaxes.
It's magically using dot all the time and figuring on the, oh.
where you needed to have an arrow, I'll let you use dot and I'll put in the D reference and melt pell D reference.
There's a document that shows how this links pretty well.
That phenomenon of in automatic borrowing or the referencing, explains the grid.
The fact that we were able to pass in a value, that want ace mutable reference, that's explained by the fact that we'll automatically borrow and like wise, the fact we're able tow pass in a reference, something that wants a value.
That's explained by the factor that will automatic dereference.
This particular coercion applies to the receiver -- the dot is special there.
If you have argument that occurs somewhere else in the argument list, they don't get this particular treatment.
And the main argument for why that's the case and why we attempt to do automatic deborrowing reference, basically, there are case where is you don't want to infer it.
You don't want to be borrowing things because one, the err many you get when you can't find an appropriate reference, become pretty bad.
So it's hard to make the compiler error manies and a lot of people prefer to have the borrower be explicit.
You see in the code oh.
I'm actually taking the reference here.
For some reason, I don't quite have a good argument for this.
For some reason, this is a disconnect where people want to see, the explicit borrows on arguments.
For some reason, it doesn't quite apply to receivers.
And I don't hundred percent understand the psychology here.
I agree with T like my own self.
So maybe in 50 years, we'll do cognitive assignments and figure this O.



Another kind of coercion, if I have a reference to a Y and I can dereference Y to get an D out.
Compiler will automatically reference a W two an X, by automatically inserting D reference operations.
That is what explain the ability to go from Vec to a slice.
If you pass a mutable reference into an expression contest, that's also expectation reference, the compiler will insert a reborrow and a D reference.
It it inserts these in lots of places, just based on the fact there's annex packeted reference hire.
Let's go head and reborrow it here.



The reason it does this, lots of times when you pass a torcha T you you don't want to move away.
You'd rather have it be a new reference that has a shorter lifetime.
So can you go ahead and modify the T.
Modify the reference afterwards identity function, where it writes down the function that takes a value, takes T and return ace T.
And you would think that's a silly function.
What you use this for want but points out, there's an issue here, where it causes an interesting effect and interacts with this phenomenon.
I recommend reading that post if you haven't already.
Then we have protocols.
Things like the phase 1, phase 2 where I was turning in a phase -- we good an end to end error.
We have two different kinds of errors.
Phase 1, phase two.
We compose the two functions and got end to end err.
Phase 1 and 2er error error.
The answer is no.
the answer in this case, the magic all hidden behind the tri macro, particular.
The tri macro, actually expands into this little match expression and part that have match expression calls this standard convert from function.
So Oh, and there's this question mark form that's in the nightly compiler.
It behaves same as tri.
Can I shout macro expansion of tri.
Question mark does the same thing in this case.
The important thing is that there's a convection thing inserted so the err gets converted automatically, base on the context.



So in this case, we have that particular arm we got an err and had the conversion there.
That, combined with these things I didn't show you.
I didn't show you the from implementation for the two kinds of errors for phase 1 and phase 2 error.
This is the magic sauce that's allowings to just compose those two functions without any extra effort.
There's a process section and gets it.
Process 2, it's generalized.
It says, I take any input ought all.
For a slice, for, you know, for an unsized array of I-32 and reject this is bottom case.
Even these two things look like they should both work in principle.
The reason this doesn't work.
L the first case is obvious.
Reference to a strengthor can be coerced into a reference for a slice.
But the second case the compiler has to decide what is the type-Iit must be selected by 32.
It commits early on and says, I must be effective I-32.
Once it decide that is.
It says, let me go find an implementation of the input trade traits.
And that's why that can fail.
Here you have to add it like an add slice call.
In order to get that effect.
Okay.
I'll take questions in a moment.
What's the relationship between these references here?
81s.
Is the static reference of a subtype of lifetime A.
What about a reference to a reference, and what about a mutable tortious a static?
Well, one answer is that how often do you actually ask this question?

[Laughter]

Maybe you shouldn't worry about it too much.
Subtyping in Rusts doesn't to be at the forefront of your mind.
I have arguments why subtyping can't be that important in Rust.
But I won't talk about it here.
In case you're curious of the answers, it's yes, yes, no.
Okay.



And what about this variance thing?
Get being covariance and variance right matters a lot I showed you the example of a dangling pointer.
But you don't need to think about it, unless you're writing unsafe code.
So if you don't have any unsafe code.
It's the compiler's job to get this.
The compiler inferring the type.
You don't have to think about variance if you're not doing unsafe.
In fact, turns out, I'd argue, you don't need to think about variance accident even if you are doing unsafe, as long as not unsafe for generics.
It's when you start mixing unsafe for generics, you have the reference types getting thrown in there secret --



Receive the book, I don't know Steve efficients book cover this is topic in that much detail.
Can you look there designed out.
And the [indiscernible] does delve deeply.
But I did notice, it has a to-do for the thing about how method dismatch goes and other item borrows and reborrows and D references.
So, not only look at them, but contribute back to them.
See if you can find a way to express these properties and give back to the community.
Finally, so yeah, sort of the theme of this talk is to ask questions the whole time.
Wonder about subtyping.
You don't explore through code.
But make sure you do the remember experiments proper least don't just assume you know what's going on.

Try small variations, like I said, with the second Clark you need to push the boundaries or discover what the impossible things are.
The magic in Rust.
It's as real as you want it to be.
Go ahead and learn about the compiler and how everything's implemented but it's okay to believe in magic.
You don't have to know how the compiler works.
Can you trust the magic underneath the hood.
That's all.
