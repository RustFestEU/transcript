**Rust as a foundation in a polyglot development environment**

**Bard:**  
Gavin and Matthijs show how one might  
a large project in Rust rewrite  
start out small, let it grow  
until stealing the show  
from whatever was there before, right?


**Gavin:**  
That's an excellent introduction.

I'm Gavin Mendel-Gleason, the CTO for TerminusDB, and I wanted to talk a little bit today about Rust as a foundation in a polyglot environment.
First, I'm going to give a little outline of the talk with the motivation, challenges and solution.
 - and why we used Rust as a foundation in our environment.

First, you have to know about our problem, we are an in-memory, revision control graph database, and we have slightly unusual features which has driven some of the tool chain requirements we have.
Our software is a polyglot house, so we have clients written in JavaScript and in Python.
We have Rust, and we have prolog which is somewhat unusual in the modern day.
There is also C involved there as well.

Some of the unusual features that drive our design requirements, so we're an in-memory database which enables faster query.
It's also simpler to implement, and I have some experience in implementing on ACID databases and so I know a lot about the difficulties that you can encounter when trying to page in.

We chose this time to leave it in memory for the simplicity of design and performance.
We are, however, also ACID, so we use backing store.
We actually write everything to disk, but we leave things in memory.

We also use succinct data structures which approach the information theoretic minimum size whilst allowing query in the data structure.
This allows us to get large graphs in memory simultaneously, but this requires a lot of bit-twiddling.
They're relatively complicated data structures, and they're compact but not so transparent to the developer, so you really need to be able to do effective bit-twiddling, which, of course, is Rust comes in.

We have a bunch of git-like features like revision control, push, pull, clone, and all of the things that you know from git.
We do those on databases.
So that also drives a lot of our requirements.

We have a data log query engine, and we also have complex schema constraint management.
So, first, why did we look into Rust in the first place? So, we were not initially a Rust house.
We didn't have any Rust in our development at all.
I didn't come from a Rust background and although I have a lot of experience in different programming languages, Rust was not one of those programming languages.
Our earlier prototype is actually in Java.

It was hard to write, and it had mediocre performance, and so I started prototyping in prolog.
Because prolog was very logical, especially the schema-checking parts of it, it was extremely fast for us to write it in prolog, but however it had poor performance, so obviously it is not the best for bit-twiddling.

Later, we moved to Library and C++ called HDT, and we used that as our storage layer which radically improved the performance of the application.
However, we had a lot of trouble with this, and it was a persistent source of pain, so C++ was crashing regularly, and this is partly because we needed - we had requirements that we had to be multithreaded for performance reasons, because we were dealing with very, very large databases in the billions of nodes, and the code was not re-entrant, although it was supposed to be written with the intent of being re- entrant but it wasn't in practice and this would come up with the server crashed.

It was really, really hard to find the source of these crashes, and that was a persistent source of problems for us.
So then there was a secondary problem which is that HDT was not designed for write-transactions.
It was really designed for datasets and not databases so we were using orchestration logic on top of it where we would journal transactions and stuff like that.
It wasn't designed that way.
So we had feelings about what the interface should be for a library, HDT wasn't it, and it also had these crashing problems, and we were finding it hard to find the source of them.
Matthijs off his own bat went out and wrote a prototype in Rust of the succinct data structures that we needed to replace HDT and like a simple library around it, and it looked really very promising.
I had heard of Rust, but I had not written anything in Rust.
This drove me to take a look at Rust.

I know a lot of languages have learned Kam, C++, Haskell, prolog, Lisp, I've been through the gamut of all of these, and I don't try to learn a new language unless there is something peculiar that drives it as something you might need in your tool kit.
Rust had this kind of incredible aspect to it which is this ability to avoid memory problems whilst still being extremely low-level programming language.

So thread safety was one of our major headaches.
We were getting segfaults and we were finding it difficult to time-consuming to sort it out.

This library was exhibiting none of these problems, and this was really promising.
We decided we were just going to take the plunge and rewrite the foundations of our system in Rust.

So, it also gave us the chance to re-engineer our data structure, simplify code, improve fitness for purpose, change the low-level primitives, and cater to write-transactions in particular, but also enabled us to do some performance enhancements that we would like to have done but were afraid to do because in C++ there is kind of a fear factor where, if you had anything new, you might add something that causes it to crash.

So, of course, in terms of challenges, I'm sure everyone in the Rust community knows about challenges of FFI, but I don't want to belabour the point.
We had - we had a comfortable interaction with C stack, and this is annoying, because if we're interfacing with Rust, we're actually interfacing it through a C FFI, and that kills some of the nice guarantees you get from Rust, but at least they're isolated to the interaction surface rather than completely.
So, we also ended up trampolining through a light C shim which is not the best approach.
We are evaluating a more direct approach currently.

I didn't want to tell everybody we've done it right, we've done some things right, but we can improve a lot here.
Now, what we would really like, though, is a Rust prolog because then we could have a nice clean Rust FFI, and everything would be beautiful and perfect.
There's some progress being made on Scryer prolog which has cool features that you should look at if you're interested in a Rust prolog project.

Then some of the challenges that we ran into, I would like to go through really quickly.
So we initially expected to write a lot more of the product in Rust, so we started off replacing the HDT layer,
and then we expected to write a lot more from the ground up, so it's essentially like we had this building,
we went in, we replaced the foundations, and then we were going to start replacing the walls, so, unfortunately, developer-time constraints has favoured a different approach for us, so we're doing rapid prototyping in prolog.
We essentially rewrite the kind of feature that we are interested in there, and then instead of just immediately going to Rust from there, we actually wait, so, we're much more selective about what we put into Rust than we had initially imagined.

Partly this is due to the learning curve of thorough checking semantics meaning there is a difficulty in getting our developers to understand how this stuff works, so that takes some time.
And there is a higher front cost here, and you win it back, and, if you're replacing C++, you win it back very quickly.
You win it back very quickly because seeking out those bugs dominates in terms of time, so that upfront learning cost is nothing compared to the cost of some horrible seg fault that you can't find.
But, if you're replacing prolog, the sort of amortized costs are more important, so you have to worry about where you replace it, and you have to be more careful about that.

Once you've gotten the knack of the checker, things go a lot faster but they're still writer than writing prolog, because it's a lower-level language which is why we use it, but it's also why we don't always use it.
So, our solution has been a late optimisation approach, and the way that we do this is we developed the low-level primitives in Rust for our low-level storage layer, and then we designed the orchestration of these in prolog.
When we find a performance bottleneck, we think about how to press that orchestration, or what unit of that orchestration, to press down, and try to find good sort of boundaries, module boundaries, essentially, so that we can press it down into Rust to improve performance.

We have really been performance-driven on this, so the things that get pressed into Rust are those things that need performance enhancements.
So we started with this storage layer in Rust and have extended this to several, like operations that have proved to be slow when they were in prolog and needed to be faster.
These include things like, you know, patch application, and squash operations, things of that nature.
So these are larger orchestrated - they're not as low-level, so they have logic in them.

We also have done some bulk operations that, for instance, in csc loading has been written completely in Rust as well,
because, if you have hundreds of thousands of rows in your csv, we get a ten- to 20-times speed-up going from prolog to Rust using the same algorithm because there's some kind of constant time that you can imagine expanding out,
but the cost of these operations,
and for hundreds of thousands of lines, that becomes a really significant time sink, so csv load has now been moved completely into Rust and we imagine large-scale bulk operations will all have to be moved into Rust eventually.

So there are some features that we know we're going to add directly to the Rust library, so we have specific feature enhancements that we are never going to even bother trying to do in prolog.
They generally have to do with low-level manipulation.
It would be silly to write them.
There's no point in prototyping them even there.

However, there's a lot of features that we expect will end up in Rust as we move forward, and they really, it's going to be a slow replacement strategy,
and it's not clear that we will ever replace all of prolog, although we may,
but there is even like in the ACID future where this product is well developed, ten years from now, and very solid,
we can imagine that probably some of the schema checking, et cetera, will be done in prolog, even though it will be perhaps prolog embedded in Rust, or using Scryer for prolog or something along those lines.

One of the things, though, that we ran into was the unexpected bonus, and we kind of knew this was here, but are amazingly impressed with it.
This is the unexpected bonus round.
We got data parallelism from switching to Rust at a very low cost, using Rayon, and it really blew our minds.
We had things we hardly changed at all.

We had the logic written there, and we used these magic incantations into_par, and others, and everything is way, way faster,
and we didn't have to think about it the hard way, and I love that, because I'm lazy!
So anything that can reduce the amount of time we spend writing things while also improving performance, it's a huge win.
I can't impress upon people enough how awesome this is, and how much we need other people to start using it.
So the borrow-checker, there is a cost but huge benefits that come from it - not just safety, but also potentially speed.
So, if you're interested in an open-source solution, you should give TerminusDB a try.
And that's it!


**Jeske:**  
Yes thank you so much for the talk. That was really interesting.

**Gavin:**  
Thank you. Let me check the chat. I don't think there are open questions yet. I have a question. You always build a release mode, or is there speed-up and debug mode also good enough?

**Matthijs:**  
No, debug is definitely not fast enough.
Well, I mean, it is fast enough, it's fast enough when we're just testing out things,
and it's great sometimes to be able to use a debugger, or something, but like an actual general use, also when we are developing and not developing the low-level library,
we definitely build a release bug always, and it is a tremendous speed-up between them.

**Jeske:**  
Cool. Thank you so much.
I see a lot of clapping hands in the chat right now.
Thank you for joining in.
Matthijs, is there a last thing that you would like to add because we have a few minutes also still left?

**Matthijs:**  
Wow, no. [Laughter]. I don't know if I could add anything to that!

**Gavin:**  
People should try Rayon is definitely one thing.

**Matthijs:**  
Rayon was a great thing to try.
We were scared to try it, because oh, data parallelism, scary, but it's literally just replacing a few calls, and it just works.
We got so much speed out of it, so, yes, Rust's ecosystem is just amazing. We love it.

**Jeske:**  
There is a warming community, I have to say, also.

**Matthijs:**  
It's really great. It's a good community.

**Jeske:**  
I see a question happening. Do you have any idea what hinders productivity in Rust beside the borrow-checker?

**Gavin:**  
Well, like, types just introduce extra overhead.
In prolog, you don't have to worry about garbage collection or how you allocate things.
It's just a few things to worry about.
It costs you later in terms of performance but it's really helpful in terms of developer time, and lots of things, it doesn't matter what the constant time cost is, because it's just glue.
Most software is just glue code, and, if you're just writing glue, you don't want to be worried about lots of details, I think.

**Matthijs:**  
There is another thing here, which is to compare with prolog.
In prolog, you would have a running instance, and then you do live recompilation of parts of that program, so it is a very short loop between writing your code and seeing it in action.
With Rust, you have to compile, and then you can run the unit tests, and I mean it's not a big thing, but it is a thing. So having that kind of repo experience, that really does help development.

**Jeske:**  
Thank you. There are some questions popping up for use cases and what applications of use of TerminusDB at the moment? Can you elaborate a little bit on that?

**Gavin:**  
It's like machine learning where you need to have revision control of your data sets and there is any kind of large-scale graph manipulation if you want to - if you want to keep revisions, and be able to pipeline your data, that's where we would use it.
We scale up to quite large graphs. You would be able to stick something large in there if you would like.

**Jeske:**  
I think we are running out of time. Will you both be active in the chat to help around? I see already Matthijs you're in the chat as well.

**Matthijs:**  
Yes.

**Jeske:**  
We had some technical difficulties sometimes which one does with this online experience, I would say, also, it's kind of fun experiences now, I have to say.
I want to thank you both so much for your time, and interesting presentation, and please do check out the chat.
And then I see that in eight minutes would be will he start the next speaker already. Please also, for the people watching their live streams, stick around for that. We will be back in eight minutes, I would say. Thank you so much, again, Gavin and Matthijs.

**Gavin:**  
Thanks for having us.

**Jeske:**  
See you in the chat.

**Matthijs:**  
Thank you for having us. I'm looking forward for the rest of the talks.

**Jeske:**  
Ciao!

**Matthijs:**  
Bye-bye!
