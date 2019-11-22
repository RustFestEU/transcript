>> HANNELI TAVANTE: Fun time.
Is the connector safe?
Should we borrow another one?
Don't panic.
(Pause).

Okay .

Hi, I'm Hanneli.
I'm from Brazil, I'm a software developer and as our friend told us, I started the Rust in Sao Paulo care.
Today, we have about 300 members, which is something.
We have been running the meetups for around a career and we can proud a meetup almost every month, and some are happy to see we are growing and usually, we have some volunteers front some interesting topics, such as implementing genetic alrhythms with Rust, implementing the basic concept of the language with pokeman.
We had this talk.
So I'm happy to see this community growing.
During my free time, I like to do these things here.
I like pokeman.
So if you're playing pokeman go, we can walk around the city to catch some pokeman.



So this presentation is about rewriting code in a talk called octave F.
you're not familiar with octave, I'm going to talk about this in the further slides.
But as a bonus, even if you are not working directly with Rust, I expect that by the end of the talk, you have an idea of transforming some math concepts into your code.
In ray very expressive way I'm going on show you step by step, how we started building some codes in Rust for active.
So this is going to be, kind of, you know, addressed so there is some code that actually doesn't run.
In the last slide I'll leave you with reference so can you get the code from GitHub and run it.
I think nobody is requesting to be scared about the math that there is this presentation and to help us to keep firm until the dinner time.
Let's start taking about some training tools and science.
Training tool in science are becoming very popular probably has consequence, some of these tools, based on Corcera.
Everybody here didn't know what scorecera?
Doesn't.
It's very popular.
EDX is another popular, too.
people who are develop developers, people who do not have a background, it's pretty exciting.
This is like bringing topics like data analysis, big data, to people who are not connected with research.
Which is pretty interesting.
I was talking to some students, that graduated maybe last year.
And they were telling me, they use some of the tools to help them with mathematics.
So one is octane and it can help you, if you are for example, electrical engineer trying to solve some crazy and differential equations for very difficult and you need hands on software to provide support.
I pretty much like Coctave.
But I had difficult times, during my under grad year when is I was doing research.
I usually had a problem to resolve, low frequency inverseer, trying to figure out how to implement that I would spend a lot time on things that have nothing to do with the Ochave.
For example, I was getting a tangle or I forget to reallocate memory and everything blowup want that was kind of frustrating to me.
I'm not saying like, this happens to everybody.
But you know, very hard and difficult time.
And pretty much, all the other tools were open source would provide meet same problem.
I had trouble to extend the functionalities of the tool.
And I was surprised because when I ask the students if they like it, they say yes.
But we have trouble to express mathematics, with C and C++.
That's the case you end upping a lot of time or something else, rather than spending time with your problem.
Then I started to think about the possibilities that we could adapt to resolve it.
I was studying Rust at that time.
Version 1.0 was just released.
I spoke about Rust and they accepted to try the language and see if it could help them with the problems that they were facing.
So Octave if you're not familiar with the two is pretty much useful for machine learning for data analysis.
For maybe, something, some calculations that it needs to do with computer vision and things like this.
It's useful for example, operations with matrices, body charts, statistics, and several other areas that have some heavy population sets, you know, you don't want to resolve everything by hand.
A good point about Ochave is it is open source.
And open source is pretty good.
It usually extends the existing libraries and things like this.



This is what usually happens when you're doing research.
There's a point when you need to add your code to an existing, too.
For example, there are lots of external publics that people bell for Octave and they are available on GitHub or any other source repo.
Then can you easily, you know, add your contribution to the tool.
Which is amazing.
But sometimes it's not easy to handle.
A very famous data structure is this one.
It's very likely that's one date.
At any point of your life, you receive this spreadsheet.
And a spreadsheet is a table.
So we have to handle tables or better, matrices, in several scenarios, several distinct scenarios, right?
Why matrices are so important.
Everybody Sundays me spreadsheets.
No.
Not only because of that.
Matrices, they can represent us in several different areas, and sometimes you're not aware that you can represent something with a matrice.
But you actually can.
So, I guess one of the first context taw had with matrices, was in high school.
But not sometimes, not even in mathematics, math classes, was something else.
To remember this law here?
Ohm's law.
You have this, you have the voltage and then have you this relation, other resistance in the voltage.
And then, you can make this even more sophisticated.
I'm happy because it talks about [indiscernible] today.
So, I guess it's scared of this.
Even if you failed in physics class, you might remember something like a circuit with voltages for the resistance.
By the way, those are the [indiscernible] flaws.
You have a bunch of equations and find a value for every variable that you V and involve it in the system.
So there's some work and figure out what the value is for, the resistance 1, 2 and so on.
But for linear systems, there is an alternative representation, rather than this one with the curly brackets.
You can represent with matrix.
And there are advantages of representing linear systems as matrices.
We can apply several different rules.
For example, there is what you call the turn -- several different reduce of finding properties of a linear system.
So understanding a little bit about matrices helps us a lot to resolve linear systems.
And linear systems, they are a structure which is, which you can find in several different areas.
For example, electrical engineering.
Environmental initialing, healthy environments, behaves in things like this this is part of the code you have to represent an array or a matrix in compiler.
This is the code base for array and a class called matrix.
This is a very expensive code.
It has around 500 lines, something like that.
And it's pretty much plate coderation.



So those students that were talking last year, I asked them what, is the most frequent structure that you use in octave.

How would you build a matrix in Rust?
Vector.
But a vector, how would you build your own?
Come on.
You know that truck.
Let's build this truck called matrix.
Makes sense.
Makes a lot of sense.
So tell me, what's going to be.
Think about a matrix.
Think about this matrix here that you were on the right side of the screen.
You have rules.
You have goals.
And there is something inside the matrix, which are the matrix elements.
That makes sense.
And this is simple.
This is the very first step that you have, in trying to build a representation a matrix.
Makes a lot of sense.



We started discussing something else.
So for example, you can remember your math classes, when you multiply matrixes, can you multiply any matrix with any other matrix if no, there's a rule.
So on the right side, you have a matrix with two rows and on the left side, a matrix, with three rows and 4 columns.
Can we multiply this matrix tricks?
Yes.
The number of column equals the number of row in the second matrix.
So yes, we can multiply this.
What's going to be the dimension of the output matrix we have some rules, based on the matrix.
Interesting.
We have to keep checking.
Did I mention, every time but this is what you do in C++ because of the template.
You have to keep checking all the time.
This is not very convenient.
How can we prove this code?
We want to add some behavior.
Structure.
So this is a bad representation.
Don't do that.



Instead, create a trade.
Call dimension.
That makes sense.
You can ask all the behavior, based on the dimension of a matrix inside this code and this is going to be much more explicit when you give Rust to matrix you don't have chief Pence trying to, you know, perform an operation with matrix, with dimensions that did not match.
This is pretty interesting.
I was reading something on the Internet.
So there is a link, at the bottom of the page.
And he suggested that we should use phantom data, when we were presenting a matrix and that makes sense.
Can you picture in your head, a matrix without any element?
Doesn't make much sense.
Is this kind of thing doesn't exist.
And this author was saying something like, you should have elements representation.
Which you can do by using phantom data or you can create your own type of matrix elements.
Kind of doesn't matter.
But this presentation of a matrix is kind of much better.
And much more well structured than our nation presentation where we had rows, columns and something pretty vague for data this is how the end yearis I.
implemented.
Any kind of array has been mentioned, as elements.



Next challenge.
Can you think of codes to represent clear matrices?
Does it make sense to have a code for matrices, in terps of the common and most used mathematical properties that have for matrices in yes, makes sense to utilize squared matrix.
Base on the matrix itself.
You can fix the dimensions.
So the dimensions are always equal want and then you can derive a bunch of code from this initial code.
So its pretty convenient for us.
And with that.
I hope you had a very quick overview of why linear is important and why matrix are important.
And I really hope you can follow the main idea of how we get a mathematical concept and we apply this to Rust.
That was our very first attempt in the final codes, that we're using, was pretty much like this one.
And everybody's kind of happy with that.
Another important structure that students research this a lot.
Complex numbers.
If you come from an initialing backgrounds, you're very likely to have seen a lot complex numbers.
Do you know why there is a reason for people to keep using complex numbers.
Do you know why?
I mean, a good explanation, because they like T.
there's there's an imaginary part that's a school.
This is not a good good, you know, this is not a good point.
For example, computer, which is a very nice subject.
Everything is based on complex numbers.
It's easier to differentiate.
That is one point.
But you can differentiate different numbers as well.
Of minus 1.
So there is a more generic reason to use that.
Let's talk about this.
This is kind of the off-topic moment of this lecture.
But I hope that after it session, you share with everybody why you use those numbers.
There's a single mathematical reason for this eqivalence.
Why doesn't it exist?
This is true.
This is true that makes everything much more simple.
Let's talk about this.



Let's start from the beginning.
Integers.
I'm happy because of the very fist keynote of this morning, we were talking about integers, and real numbers.
But we didn't reach the complex numbers, which are so important.
So when you add an integer to another, what is the output?
Anent jer.
Glad glad it's an integer.
So when you're talking about the operation, the output equals input.
To the type.
But that's not true.
When you're talking about division.
If you divide an integer by an integer, what happens?
You may not have an integer as a result.
May not.
There is a chance it is, but there's a chance it's not.
I added the letters that correspond to each set by hand.
It's pretty August ugly.
I'm sorry about that there is a set.
Which if you're not familiar of the other sets.
You can easily copy this concept from the keynote headed this morning.
What is the most inclusive set that can be using.
They're real numbers want okay.
Cool the numbers.
0 is annex collusion.
Don't consider that.

There is something even more generic than divided by 0.
Is there any other operation you can think of, somebody already told the answer.
Yes.
There is an operation you provide input and you might not end up with this one as the output when you're looking for a square root of a number.
If you're look for example a square root of -4.
The result is not going to be a minor number.
So this is sad.
So the thing here is like, complex numbers we say they are closed for the most common operations.
So if somebody says that this operation is closed, you can be sure that staying put is going to be as the same type of the output.
And this is convenient for functional programming if you're talking about types you weren't sure of the output, the type of the output, and you can, you know, dereef lots of things about that.
Can we express this property with code?
Yes.
It's not difficult.
For example, you can have this structure here, called complex number, that has the real and imaginary parts and all the mathematical operations are going to result in a complex.
Something like this.
This is pretty much straightforward and convenience.
Maybe sure the existing types are closed operations in a certain scope.
Which is very convenient for several operations and initialing.
Sometimes engineering, want to be sure that the output is going to be equal to input.
This is much true.
Think about T.
Rust is very powerful.
You cannot have the behavior.
Even for existing types.
There's probably somebody doing that.
Because the biggest tools you have for initialing, they still using using imperative programming or if some language, that sometimes you cannot have this level.
It just create ace trait, and that's to an existing type.



The complex numbers are already part.
So you do not have excuses to keep usings open stats for your most common operations.
I think I still have time.
I don't know who's counting the time.
But some lessons learned.
There are really great skills to help mathematics, in terms of engineering and general science.
But I don't know about you, but I've been struggling with the tools for a long time.
Besides math lab and compiler, for example, we have VHDL.
It's the language that describes harbor.
If you think about VH -- couldn't we be using Rust to strike hardware.
Based on the sessions to date, yes.
But could Rust become a substitute for VHDL?
Maybe, yes.
I had a very hard time with trouble that I couldn't, I simply could not represent that and maybe with Rust, we could improve over the system in general.
For me, it was pretty sad to change my focus.
I was trying to solve a problem.
How can I optimize the trails of the circuits and I should resolve this and this and this.
Trying to solve dangly pointers or something I did in the middle of the code.
Then it was not very productive to me.
It was kind of time consuming from my research is something that should be training my time of that research.
I had a very difficult time and sometimes I wanted to add behavior, an existing type, so I had to create another class with another set of descriptions, and things like this and with Rust, I don't have this problem anymore.
When I learned highway to program, the examples were like with animal.
Class animal.
And nobody taught me how -- nobody tells me, hey, here's, I don't know a differential equation.
Now you get this equation, and transform this.
People voter to say, now you use numerical methods.
Of course they can represent that.
I was just using the wrong language, but there is a way to represent the mathematical structures in a more natural and straightforward way.
One last, but not least point I was so happy, the compiler was telling me something, that something was wrong before I'd run T.
something very frustrating to me is like, compiler can be slow for some operations and I was writing an operation in compiler and boom.
.
I wanted to cry.
I lost 10 minutes to get a runtime error.
I was really sad with that and some of the problems can be avoid for us.
With the certain types, the Rust compiler can tell you, hey, don't do that because it's wrong.
I don't have the responsibility anymore.
I just 38 throw the responsibility to the compilers in certain cases.
Connecticut collusion I took from there talk to the students is like, why don't you have many people join that.
So we have concepts and mind sets, based on the thought that can be applyd to other areas.
For example, a mathematical concept, but we can apply that to, I don't know, maybe payment.
Think about it.
So maybe you can maybe if you can describe mathematical property, more easily and more trait forward in a programming language, maybe we can start using laws of mathematical concepts, on a daily base.
Sometimes I see lots of young people asking, why do you have to study Calculus.
Sometimes it's not obvious.
How can you be applying these concepts in real-life problems and maybe problems of what developments or I don't know, payments or products and things like this.
But if we had a more convenient way to describe mathematics, into programming, maybe we can spread this knowledge across, you know, other areas of the industry.
And maybe you can make them more popular.
Well, that happens.
So I share the good parts and I'm going to share the things that went wrong or almost wrong.
So request I started learning about Rust I said oh.
there's this thing called unsafe and I'll probably never use that.
If you need to integrate Rust with another language.
Sometimes you need to use unsafe and I found myself, like every time I had a problem, I'd type this mag call word at the beginning.
Sometimes yes F you're doing a full baggage of language, C or python, there is, you can have your unsafe methods or your unsafe function but you should not expose that so you have something else safe.
Let the method handle the possible problems that it might end up W.
I'm telling this, because I was aware of this but you know, my body refused to do it.
It was much more convenient to type them safe, until somebody uses the library and says, Oh, everything is broken.
Why.
It works on my machine.
So make things safer, it's good advice.



There was another example.
Safe and unmute F.
it's not working, just add mute and everything will be fine.
You have fun time, which gates signal, which represents on time, and you opt with that as a signal of frequency.
And the same for the case, you have a signal frequency, and back to signal time.
So I was use something libraries, because mine was not working so I decided to [indiscernible] mutable aces.
I was happy with that.
In terp in terms of concept, you're settling something mutable.
Once you have the sampling of a signal, it's never going to change.
So it doesn't make sense in terms of code.
So I was writing a convenient code in terms of programming but it's a code that doesn't make sense at all.
In terps of presentation.
So when you're going to write.
When you're going to write, think about this.A oh.
wait.
Does it make sense.
It doesn't make sense to represent a mutable signal with mute, for obvious reasons.
Actually handle your construct into the perfect way.
So I'd like to use some references here.
The tool for linear algebra, and I was reading the source code.
You can actually find some structures that are pretty much the same as the once we saw at the beginning of this presentation.
You're going to see that inside of phantom data, they have, a bump of interesting approaches to handle any kind of array of end dimensions.
There are also some papers about Rust types and how can like how these types can help you or science tools.
It's the FTP link you see there.
And of course, some well known references like the nome.
Like the dots.
And there is one very interesting and probably also well known one.
I don't know if you edit here.
No.
Didn't.
I can edit later.
It's a tool about FFT in Rust.
So some special thanks to Florian.
I'd like to add, no, no more [indiscernible].
Bruno is also help being the Brazilian community, and thoughtworks has been hosting most of our meetups.
For my mentor, Daniel.
And for these people who provide me gifts and of course, for the Brazilian Rust community.
Thank you and I don't know if I have time for questions.
We don't have time for questions.
Ty.
