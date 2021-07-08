**Rust for Freshmen**

**Bard:**  
Colton Donelly takes Rust to school  
to show freshmen the language is cool  
and capable, fun  
great to fail or to run  
all in all it's a great teaching tool


**Colton:**  
Hello, and welcome to RustFest Global 2020. Colton Donnelly and this is Rust for Freshmen. First, a little bit of background, I'm a fourth year student at Northeastern University studying computer science and business administration. I first started learning Rust in the spring of 2019 while I was taking computer systems, a course taught in C. After I heard about Rust memory guarantees, I decided to look into it. When�asked my instructors what they thought about it, my professor gave a very encouraging response. And so, I looked more into the language and started writing projects in it. I even joined the community and earlier this year I became an editor for this week in Rust.

My goal here is to design a freshman level computer science course taught in Rust. I want to enable students with Rust's powerful tooling and ecosystem. Things that they can take advantage of for the rest of their career. Rust's error messages are better than any other language's error messages. They give students a great way to have feedback about their code and know exactly what's going wrong with it.

For testing and documentation, Rust supports these as first class citizens. Which is great. Because students don't have to worry about adding extra dependencies or adding extra libraries in order to get their code working. I want to avoid teaching some out of scope topics. Stack and heap allocations and threads are things taught in later courses so they're not really in scope for this course. Lifetimes are difficult for every Rust to learn. So, students not having to learn about these gives them a lot of time to focus on the other parts of Rust that are even more important in these early days. Macros are great at reducing redundant code. But unfortunately, they hide a lot of implementation details. And so, I want to reduce the amount of macros that we use as much as possible. I also want to limit the use of cargo since dependencies and compiler configuration options are not really necessary for students first learning how to code.

I'm going to be basing this course on fundamentals of computer science II. Affectionately called fundies2 by the students. It's taught in racket, and then 2 is taught in Java and introduces students to object oriented program. The instructors want students to walk away from the courses with good habits. Naming conventions, documentation and unit testing are important no matter what language you're using. But encapsulation is something that students haven't encountered before. And so, they must learn how to respect it in object oriented programming.

Instructors don't introduce null yet, so I'm not really worried about that for now. Homework is typically submitted as library files. A testing library runs all of the students' unit tests while an animation library executes their code.

The first thing you want to do when you introduce students to a new programming language is to teach them... teach them the very basics. There are numbers, booleans and strings. For numbers in Java, the instructors usually teach students to use int while double is used for floating point precision near terms. For integers, we're going to be using the i32 type. While we're using f32 for doubles. This is simply to keep a little bit of consistency even though double's exact translation would be an f64. For data types, we're going to use C style structs. And for implementation blocks, we're going to keep it classic with instructors and methods. We're going to allow students to use functions, something they can't currently do in Java since that provides a lot of great functionality for programs. We also have to introduce students to references since Rust is very dependent on manual path business reference.

So, this is a great first step for teaching students how to read Rust programs. We have the dog struct which has fields that use all of the different basic data types that we talked about earlier. That the constructer which constructs the dog. And we also have the method available that accepts the dog by reference and returns a string.

Now we want to introduce students to abstraction. In fundies2, this is done with Java interfaces. So, in Rust, we're going to use traits to introduce students to the idea of defining shared behavior.

We now want to add the cat struct. So, in order to reduce the amount of inconsistent behavior between dog and cat, we're going to consolidate all of their behavior into a trait. We create the animal trait which has the sound method which dog will now implement instead of the bark method. That, of course, also implements this.

The next thing the instructors usually introduce is Java abstract classes. Rust doesn't have a one to one equivalent of this, so, we're going to break it up into two different parts. Abstract classes allow... allow for defining default behavior instead of just shared behavior between types. So, in Rust, this is actually available to us within the trait... the trait types. We define the default speak implementation in the declaration for the animal trait. And, of course, down below you can see I had unit tests to make sure everything works as properly. Something that students will have to get used to.

The next part of abstract classes is defining shared data. Again, Rust doesn't have a great way of... of handling this. And so, we have to implement our own object which will allow us to do this ourselves. So, we have the animal shared structs that we've now introduced that dog and cat can both contain instances of. This animal shared object contains name and weight as public data fields since dog and cat will be the only ones that will be able to access them anyways. This allows students to reduce the amount of redundant code they have and to have this common data.

Next, we're gonna have dynamic dispatch to allow students to act on shared behavior between different types. As you can see, this is a very simple dynamic dispatch example. But it's enough to show it's possible. You have the tell animal to speak function which dynamically dispatches on an animal reference. And returns a string. Again, I checked to make sure that all of this is done properly with my unit tests.

Next, we're gonna look at generics. Since they're... understand they allow programmers to contain different kinds of data in their types. I have a problem with this, though. Typically when the instructors introduce generic types, they introduce it by reimplementing the functional monad lists. We have the IList interface and the Cons and classes that implement the interfaces. This effectively serves as a linked list. This won't work in Rust. Rust actually has monads, and this is not the proper way to define them. So, we must obey Rust's rules for defining things that are similar.

There's also the issue of recursive data definitions which you can see in the ConsList class. This is something that Rust doesn't allow and so, we must find a way around it.

So, in my implementation, I came... I used an enum to define a list which now works as a... as a monad. The first and the rest for the Cons while empty doesn't have any data available. We have the Cons and Empty functions available to students since they're typically what they're used to coming from Racket. We also have the count method which is available which iterates over all of the items in the list and counts how many items there are. As you can see, we use a match expression. Something that I was not anticipating teaching to students.

Racket does have match expressions, but this is something that wasn't introduced during fundies�1. And so, there's not really... and so, students aren't already familiar with this idea. So, this is another thing that we have to teach students how to use and how to use properly.

We also must use heap allocation. As you can see, I get around the recurrence of data definition by using a shared pointer... a smart pointer for the rest of the list in my Cons. This is, again, something that I didn't want to teach students. And so, this is something that we'll have to find a work around for later.

Next, we want to introduce function objects to add to existing behavior of types. With list, this is easy to demonstrate. We have the filter method now which accepts a predicate which as you can see at the very top of the file is a type alias to a function that accepts a reference and returns a boolean. And the filter method, we have the same thing as count, except first we check to see if the predicate is satisfied by the first in the list.

Next, we're gonna look at error handling. This is the next part of the instructor's plan and it's a great way to introduce students to the results type of Rust. Currently, the instructors use Java Exceptions to teach students how to properly handle errors. This, of course, is one of the things that Rust decided not to do and was one of the decisions that created a lot of difference between Rust and a lot of other low level languages.

Instructors teach students how to throw exceptions, when to throw exceptions, which exceptions to use, and how to catch the exceptions. With Rust, of course, all of this goes away. You really only have to act on the results type which you can use by checking whether or not it's okay or an error. And then returning the error if needed. It also has the future advantage of giving students a better understanding of the monadic style of Rust. So, that they can better understand how to use the option type later on when we decide to introduce non existent data. So, as you can see, we have the animal shared implementation from earlier and we also have the dog implementation from earlier. For both of these constructers, we changed the results type. Yeah, we changed the result type to be a result where the okay is an animal shared object while the error is the string for the animal shared constructer.

For the dog constructer, it's nearly identical. It returns a dog in the okay case and a string in the error case. And the animal shared implementation, we have to check to make sure that the weight is non negative. Animals simply cannot weigh negative weight. While in dog, we check to see if the animal shared constructer returned an okay. If it was an error, we returned the error. We also checked to see that the age in dog years of the dog is valid and we returned the error if not. Students will use this to have a great understanding of how to properly handle errors. And since Rust doesn't really allow any work arounds for error handling, students always must handle this. Which gives a great habit for students as they move on in their career.

Lastly, we're gonna look at sameness of data. In the course, students are taught that data is the same when it's reflexive, symmetric and transitive. This is what an example might look like. We have the abstract animal class. And this has the same dog and same cat methods which are gonna be used to check to make sure that... that instances of those type are the same. In the dog class, we have the same animal method which is inherited from the animal interface. And you see that we have the instance of keyword being used. This is a problem. This simply does not have... have an equivalent in Rust. You cannot check the type of an object. In fact, Rust erases the type of an object when you upcast it into a trait object. So, this part simply does not exist. Which could be a problem.

Except I'm not sure it is. It could in fact be an advantage and it could help students to build better habits. Programmers should only be able to use what they need. And they should be... and they should be avoiding downcasting for specific behavior whenever possible. In fact, they should only be checking equality between two objects when they know those go objects are of the same type. This introduces a lot of good habits to students and ensures that they walk away with a lot of great skills and understanding of how to properly handle the sameness of data. Now we're gonna try to look at how to fix our problems. Earlier we talked about the monadic behavior of Rust. I didn't want to introduce the enum since this isn't even introduced for Java in fundies�2. But if we wanted to talk about monadic implementations of Rust, this is what we'll have to introduce.

We also looked at the same said of trait objects. It's not exactly clear whether or not that's a good or a bad thing. Lastly, we... some of the recursive definitions. And the only way to work around that easily was to introduce heap allocation. Something that I did not want to introduce into the course. How can we fix this? I think with a simple crate that looks like this.

But this crate has its own problem. It has too much magic in and of itself. As of right now, in fundies�2, students don't have to depend on external libraries for anything except for the animations and for unit testing. There are also some honorable mentions. Some topics that I didn't get to cover in this presentation such as loops, mutability and algorithms. These shouldn't be too hard to replicate in Rust so I'm gonna leave that alone.

Another problem that I didn't mention was the animation library. Currently Rust has an immature GUI ecosystem. Which means that there's got to be a lot of work done before we have the ability to have an animation library sufficient enough for the course. There is the possibility of using WebAssembly and having students run their Rust code in the browser. This, of course, is very flexible and could actually be something that could be used in a course like this. There's also the problem of cargo. Right now cargo is the easiest way to run Rust code.

Without cargo, you don't really have anything else that you can use that students would be able to pick up quickly. You could use the rustc CLI, but that has a lot of extra stuff in and it ultimately is too complicated for students to learn how to pick up. So, there might be room for a custom tool to be used which would run all of the compilation and testing for students without them having to learn anything extra.

And lastly, there are some topics that I'm leaving out for future classes such as lifetimes. Lifetimes could be introduced in the next course. While threads are definitely introduced in a later course. Unsafe is also something that students should learn how to use in Rust, but they should only learn how to use it properly. I think this would be best used alongside the thread lessons.

So, is this course viable? Ultimately, it has a lot of advantages and a lot of disadvantages. For advantages, it forces a lot of good habits within students simply by using Rust as the language of choice. And all of the habits that students learn with Rust are applicable to other programs languages. Giving them a lot of skills that they can use throughout the industry.

Furthermore, future concepts will enforce good habits within students who also have the option type, lifetimes and mutability and�thread safety and all of these things which are included in Rust either in the standard library or in the core library or as a language feature which students will be able to take advantage of.

And lastly, a helpful compiler gives students a lot of great feedback about what exactly is going wrong in their programs. Unfortunately, there are still some disadvantages to this course. A lot of work must be done to make sure that the student experience is still great. The animation library, for example, again, must have a lot of work in order to make sure that it runs as efficiently and smoothly as the Java implementation runs. We also have to figure out whether or not we're gonna replace Cargo since students don't really need to learn how to manage dependencies. But they will still have to use the animation library to run their code.

Enums are also unavoidable. Simply because Rust does it differently. Enums in other object oriented programming languages don't have the same kind of enum values as Rust. For example, you can't have one enum value with an integer data field and another one with a boolean data field. Lastly, right now fundies�2 takes advantage of Java's pass by reference by default in order to avoid having to teach students how to properly manage scoping of variables. This is something that we must work around in Rust. But, again, this is a good habit that students must be able to develop anyways. So, this could actually be another advantage.

Ultimately, this was a great way to think about how an introductory... introductory computer science course written... taught in Rust might look like. Thank you, guys, so much for reasoning. And I really appreciate you being here.


**Inaki:**  
Excellent. All right. Very interesting. We've also often considered here in Latin America starting... actually, there are several universities teaching Rust in several courses. But none in basic courses. So, for example, like you were saying, concurrency threading should be in advanced courses. They are taught that in advanced courses, but not as a first programming language. So, a lot to think about.

**Colton:**  
Yeah. I do think that there's a lot about that kind of stuff that's a little bit more complicated for students to learn, especially in their first year of learning computer science. And the instructors do a great job of making sure they only learn that later on in their education. I think that's a good plan.

**Inaki:**  
Right. So, one of our questions is, would Rust be a better put for such a course? Or do you think we should introduce the things first through a more basic language like Go to ease into resource management?

**Colton:**  
I mean, I also write Go and I think it's a great language. Ultimately, there are some issues with Go still. You have issues with the linter making sure people check their error returns. But you still have the possibility of if you don't have the linter, then you may not be checking to make sure that error is nil. And so, with Rust monadic option type and result type, I think that that's a great way to kind of make sure that students are always building that habit. And they don't really have any work arounds.

**Inaki:**  
Right. Another suggestion/question was, why not teach students how memory actually works from the start? Why shield them from the complications and not understand the difference between stack and key, for example?

**Colton:**  
So, right now in the curriculum for the computer science students, that's just simply how it is. You don't really learn the ideas of stack and heap until computer systems, the course that I was talking about. And I think that that's good. Especially when you get into like threading and posing style programming and manual stack versus heap. Right now the introductory courses are taught in Racket and Java and you don't really have to work about the stack versus the heap in there. So, I think that it's good to still wait until later to worry about stack versus heap.
But unfortunately, because of Rust's still manual memory management, that's got to be something that has to be worked around.

**Inaki:**  
Right. Not to put my own commentary. But I guess it's the difference in two schools. One is teaching programming from the machine up and the other from programming concepts down.

**Colton:**  
Right. That's exactly the approach that the instructors at my school take. They want to make sure that the students have the fundamental ideas of computer science first. Implementing algorithms. Making sure that their code works properly, all of their logic and then eventually they get deeper into the machine level ideas.

**Inaki:**  
Cool. What missing teaches... Rust feature... do you think would most improve teachability?

**Colton:**  
It's the manual... manual memory management I think that's the biggest problem. So, I think that is what ultimately hurts the teachability of Rust from the start. You can get around lifetimes, you can get around reference passing. But having to have, for example, like I showed the recursive data definitions. Having those is so hard to avoid teaching about stack versus the heap. When right now, again, that's taught later in the curriculum.
So, I think that that's the part that hurts the teachability most.

**Inaki:**  
Right. Memory, can't live with it, can't live without it.

**Colton:**  
Seriously.

**Inaki:**  
All right. Well, Colton, thank you so much for your talk.

**Colton:**  
Thank you so much. I really appreciated being here.

**Inaki:**  
Likewise. And if you want to answer more questions, you can hang around in the chat.

**Colton:**  
All right. Sounds good. Thank you, guys.

**Inaki:**  
Until later!
