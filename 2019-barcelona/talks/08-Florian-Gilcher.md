async/await with async-std

Live captioning by White Coat Captioning

FLORIAN:  Okay, here we go.  Yes, so hello and welcome.  This is a very special talk to me because that means I'm so out of organising this conference that they are letting me give talks, so just as an illustration there.  So who am I?  I'm Florian, you can find me on Twitter and GitHub.  I own two companies, one that has nothing to do with programming languages and the other one that does just Rust many I do programme Rust since 2013, I do train it since 2015, and since then I am a team member.  I also formed a couple of community things.  I'm part of the community team, I founded this conference, I founded another conference based on embedded subjects, so I have been active.
Today I'm going to present the async-rs/async-std project and we decided to call it async-std because that's what it is.  It is a port of the Rust standard library into the async world.  It takes the whole interface of libstd or anything that might do thread blocking, then puts it on top of an executor and the rest of the interface is based on the futures-rs library, which is the abstract interface for working with futures.  
The futures trade that was stabilised within Rust is a very, very minimal one, to allow libraries on top of it, write extensions to it.  It really has the bare minimum interface of this is what a future is and all the operations that you can do on top of them are provided by the futures-rs library.  Async-std is not new.  The people who kicked it off were first of all Stjepan Glavina who is also known as the maintainer of Crossbeam and used to work on Tokio, and Yoshua who works on tide and surf.  It's a community project with a lot of the development nowadays being done by community contributors.  
So why are we building async-std?  First of all, stability.  We believe that the Rust async ecosystem has been in flux for far too long and we don't want to reiterate further.  We want to collect the knowledge of the last few years and put it in a library in a stable fashion that you can rely on.  Ergonomics: it should be easy and consistent to use and we figured out that the standard library interfaces aren't actually bad.  There is a lot of work that has already been done around ergonomics so we have adopted them instead of coming up with our own again, again not doing research.  It should be accessible, it comes with a book and full API docs so we have extensive API documentation.  It fully integrates with the wider Rust ecosystem, mostly with futures-rs which it uses as its interface, and speed.  Speed should come out of the box and we believe it's the best library to get started with async/await.  I want to give a personal motivation to the first point.  As a trainer I found it quite interesting that over the last two years I have seen more and more people not be interested in async Rust training, particularly to the point where last year people have said: can you just skip the async part?  We are not going to use this for the next two years.  This is too much in flux.  So this is the state we are in, just to be clear.  It has a couple of additional properties.  It has a very small dependency tree.  It is not overly generic which means it compiles fast and does not expose you to an end application, or does not contribute to an end application that compiles from it.
Let's talk about async.  So this is a synchronous function.  It takes a path, returns an io result, takes a file and by opening and reading it through a buffer, we provide the capability of doing this, basically adding async-std, but you have to add the prelude and then you put async in front of the function and every operation here becomes an awaitable future operation, so file open will notify you once it's done and then you can continue and the same goes for reading.
Yes, and yesterday someone, particularly Pascal, met me here and said: yes, we used it internally and it really works that way.  We took our code, put async on top of every sync port and it worked.  It exports all types necessary for async programming including some types of standard library type so if you are talking about io result here that's the same result as the standard library has.  Why are we doing this?  The standard library has the habit of at some points actually being subtly blocking, for example standard path: path has blocking function, particularly that exists for metadata and all of these functions, so if ever there's a type within async-std that is also in std, you should use the async.
But talking more about what async functions represent, so this is a manual desugaring of what the async keyword does.  It does a little more.  For example, it activates the compiler mode in which again you are allowed to use await within a function block but most importantly it returns the return type of a function into impl future item and the result that we have stated there.  That also gives an interesting insight in what those functions do.  They generate futures.  They don't actually do work.  We will come back to what that means in a second.
But what does the await mean?  The await means that at all of these points there's an operation where this task has to wait for something to complete, so it will indicate actively: I register interest in a certain event, in the first case I want to open a file, please tell me when you are done.  This is what await - the active indication that you are waiting for.  It's also called completion base, so await is the moment where you wait for something.
If you call this function, we get a nice compiler warning which is: futures do nothing unless you await or poll them.  That's what I mean by async functions are generating futures.  The return type of this is this is a future that will open this file.  It kind of moves the thinking in the future, that's where the name comes from.  You are asking for: please set up my program so that it can now open this file and tell me when you are done.  And what do you need to run them?  Futures run using a task, and that one is important.  There's multiple ways to get to a task.  Those mostly differentiate in blocking, non-blocking, blocking in the background - I come to that in a second.  The important thing is multiple futures can run in the same task currently.  Tasks themselves may run in parallel.  This is depending on the execution strategy.  I will come back to that in a couple of slides.  As a differential for this talk, this is a really, really rough comparison but concurrent means multiple processes run in a group, yielding to each other when they need to wait, usually called corporate scheduling, so any of those operations will go until they need to wait for something again and then actively indicate: I'm waiting, someone else can run.  While parallel means: multiple of these things run next to each other, usually on multiple threads.  
When we talk about blocking, in this case blocking, sadly, as many IT terms, is not sharply defined but for this presentation when I say something blocks, it is blocking the thread that it's currently on, which means, if you have additional concurrent tasks on this thread, they will be blocked as well, and that is a huge problem and this is something to avoid.  This is why we choose how to run our futures task.  This is the task block on interface in async-std.  You will pretty often see that in examples for the reason - yes - for the reason that you need to block the main thread as the same goes for any kind of example that does threading, you need to block the main thread to make sure that your program doesn't exit while something runs in the background, so all examples pretty often use task block on because the definition of task block on is it blocks the thread you are currently on and instead runs the task that you are passing, so in this case for example reading the file.  The nice thing about block on is it actually gives you the results back like if you had called a normal function.  Because you can do that, you are completely blocking the thread until it's done and then you can collect the result and immediately put it into a variable.
The second interface is spawn.  Spawn runs a background task concurrently and waits for its completion.  Sorry, no, it doesn't wait for its completion.  It gives you a JoinHandle back and block on.  You can then call block on, on the JoinHandle, blocking the main thread.  The semantics here are: spawn spawns the future that does the operation and it gives you a JoinHandle back, exactly like the threading API in the normal standard library.  It gives you a JoinHandle back that is in itself a future and the operation that this future represents is: wait for the background task and then take the result back.  But these are two different kinds of operations.  It's always important to understand what is the thing that I'm actually waiting for?  In this case, first of all I'm waiting for the file to be read.  Second, I'm waiting for the background task to complete.
JoinHandles, much like the JoinHandles in the standard library, will give you the result back, the past result.
JoinHandles are similar to standard thread JoinHandles.  They are allocated together with the task that they spawn in one go.  This is a single allocation and they also provide you a back channel to the spawner and the JoinHandle resource.
There's a second function and I am mixing up my slides.  This should be spawn blocking up there.  It's a second function called spawn blocking.  The body is correct.  This is the old standard lib API so this is opening a file and the way the standard library works is it will block the current thread until the file is opened, until the kernel wakes up that thread again, but spawn blocking indicates through the runtime: by the way I am aware that there's blocking things in this task, which will make the runtime put the task on a single thread on its own thread, to avoid blocking other concurrent processes.
It behaves exactly the same.  It gives you a JoinHandle back, so what is possible, for example, is having blocking and non-blocking tasks resulting in the same type of result, mixing them, for example putting them all in a vector and waiting for all of them so our model unifies these things on the level of the spawn.
There's two patterns on futures that I would like to introduce you, the first being racing, the second being joining.  What does racing mean?  Racing means I take two operations and await for the first to complete.  As an example here, I use the surf HTTP client and I am trying to get the index of two mirrors, for example, and trying to work out which one answers fastest.  What I can do then is say take the first future, race, with the second, await.  We will get the first back and the second will be dropped and removed and potentially the request aborted.  So this is racing.  Sometimes in the futures crate there is also a macro that will have similar behaviour but not quite, but you may have seen that one.
What's important here is, when we are talking about concurrency where there's parallelism, these two are concurrent because I'm taking two of these, putting them on a concurrent - merging them into the same future and then I'm run them both on the same task.  What I can also do is I can spawn both of them, which may run them in parallel because now the runtime is free to do so, and then race for the completion of the task.  So this means I will - the spawner will say: let's join the JoinHandles together and wait for one of them to return, so this is a similar kind of execution behaviour.  A different kind of execution behaviour.
The next that I would like to present is joining.  Joining is important in the sense of: I have two operations and I want to execute them both and I don't want to continue until they are both complete.  In this case, I want to make multiple requests to a backend and I want to wait until the outcome.
The next concept I need to talk about is streams.  Streams are a fundamental abstraction around items arriving concurrently into any kind of part of my programme.  In async-std they take the place of the iterator trait so basically standard iterator is replaced by async-std stream so they can be split, merged, iterated over, all these kind of things.  The classic example that you will probably have seen if you have ever had a look at async code is the TCPListener so new connections are arriving to my program.  I don't know when, I don't know how many and I don't know how many at once and streams give you the ability to work on this one-by-one, so the TCPListener on the standard lib has a sync liberator, we have a sync incoming stream and in now Rust 1.39.0 the recommended way of iterating over that is by calling incoming next, stream.next.  This is the future because we don't know approximate there's something there yet or if it might come in the future so this will lay the task sleeping until something is coming in and we are awaiting on it.  There's no integration into four loops currently in the language.  Then we spawn for each of those connections, we spawn a concurrent task that works on them.  Process is some function that processes this.
One important operation on streams is merging them.  There's a couple of other operations, but I could give a whole talk on streams.  Here is an example that listens both on an ipv4 and an ipv6 interface so I can use two TCPListeners, bind them, get the incoming stream for both and then I say ipv4 merge to ipv6 and then just continue because they are returning exactly the same things.  They are giving me a TCP socket with a TCP connection so I can merge them and start iterating over them.
We have a sync module exactly like standard sync.  It comes with async/await ready versions of standard lib structures.  It is important to understand that a lot of standard lib structures, if they put you waiting, like for example you are trying to lock a Mutex, they will lock the current thread.  What it gives you is they will lay the current task waiting.  So it comes with Mutex, Barrier, read write locks, all that.
This is what the code looks like, almost exactly like the standard Mutex example that you already have.  The example here ... wake me up when it's my go.  So it is important to use future aware data structures in future code.
One interesting thing is we have the Arc here, this is just an export from the standard library to make sure that you don't have a mix of std and async-std types.  Almost all types that async-std exports are either exported because they have a relationship to another one, or because we need to make changes.  Arc is the small exception and we don't want people to be too confused by having these small exceptions of maybe 1%, 2% of the interface.
We have a channel implementation, async-std channels are based on crossbeam channels but in an async version.  They are multiple producer, multiple consumer channels.  They are always bounded.  We think that unbounded channels are an anti-pattern.  You will run into problems with bounded anyways.  What that means is they can - bounder channels can only hold a certain number of items at once otherwise trying to write into them will lay your task sleeping, and they are very fast.  They are faster than crossbeam channels.  These are the ones used in Servo in the browser.  Because they are multiple producer multiple consumer channels, they should cover all your generic use cases, so that also means they cover one-to-one, they cover one-to-multiple, they cover multiple-to-one, just by virtue of covering end to end.  Channels are currently unstable for API discussions.  A little.  We want to fix that in the next a couple of weeks so you need to activate the unstable feature flag if you want to play around with them.
As a short example, they work much like the stuff that I introduced.  Specifically, the receiving end of a channel is a stream, so it can generically be seen as a stream, so the while-at-some pattern applies.  If you send, sending becomes a future operation because if the channel is full you will have to wait until the channel has capacity.  This is a ping pong example of two tasks or two futures that will ping pong each other through a channel, or through two channels, and you spawn both of them and they will stop playing ping pong until kingdom come.
Understanding tasks and streams in my opinion is far more important than understanding futures because streams, channels and tasks are the things - tasks are the things that communicate.  Streams and channels, streams being the abstract version of channels, not everything - almost all channels are streams.  Not every stream is a channel.  Those are the things, how tasks communicate.  This is, if you have a problem, how do you get some piece of data from A to B between two concurrent tasks?  The answer is almost always: use a channel.  So even if you are talking about I want to work on a futures-based system, it is important that you have that in mind.
So as a summary, async-std provides a known and familiar interface of the Rust standard library with appropriate changes for async.  It avoids pitfalls by providing a full API surface around all async-critical modules.
It is fully based on futures-rs so it integrates through the ecosystem very well.  We fully embrace the futures-rs library so if you want to use async-std in an abstract fashion without relying on async-std types, you can take a step up and rely on the futures-rs interface traits.  Because all types expose the relevant interfaces from futures-rs, so futures, obviously futures, but async-std streams are always also futures streams and everything that is read write, async read write, is also futures async read write.
If you want to have the full interface of futures-rs then you can also on top of that load a futures-rs library.  One note about the futures-rs library, it has recently been rearchitected to a core and an util and a couple of additions and from core to util to some of the remote additions it becomes more experimental, so when I say we export the futures-rs library, specifically we rely on the core types where we know that they are going to be stable and probably not subject to churn.  But if you want to opt into any of the more experimental types, you can totally do so by just loading the futures-rs library on top and using it.
Particularly of interest are the async read, async write, async seek traits.  A lot of the criticism that we got is you are not compatible with the ecosystem, particularly like Tokio.  The problem there is a lot of libraries are written on top of Tokio which don't implement the futures async read, write, seek traits unless you use - they use Tokio, which are different, and also subject to change, making them incompatible with the rest of the ecosystem.  I think it's okay.  Their view on this is we still want to experiment on this and we would like to iterate on that interface, but that very much collides with our view that we should get stuff stabilised and that we have researched those traits for three years, so addressing the common question why async stood, it's pretty simple: fundamental mission goal.  That's as deep as it is.
Our view and vision for using std is applications should use async-std directly because application development is far less abstract.  You want to pick a couple of libraries solving your needs, use them and then the abstraction level is usually pretty low.  You want to get stuff done.
Libraries should use futures-rs as their interface.  As an example, we have a TLS library under our own organisation, and this one operates completely on top of async read and write, but you can use it on all async-std TCP socket and so on types that expose read and write, so to make this more concrete, if you are in an application it is okay to take an async-std net TCP socket directly.  If you are in a library I would highly recommend you to instead use futures io async read so that doesn't expose users to your choice of base runtime.
Because there are other runtimes around, and this is something - there's currently a binary discussion happening around async-std versus Tokio.  I don't want to have this discussion because there's a number of executables in our ecosystem.  Particularly Google Fuchsia is a big one.  There's bass I do not know.rs which is: this thing never crashes, under no conditions.  There's wasm-bindgen-futures which is a particularly built executor for WASM, and there's a number of company internal ones, that those companies sometimes speak about but pretty rarely speak about in public.
And async-std is meant for writing compatible libraries, so if you are writing a library you can use async-std as your test bed.  Probably you should avoid binding to it directly, which brings me to speed.  It's something we have been asked about a lot.  There's a problem there.  We also believe there's a hyperfocus on benchmarks in the Rust community at the cost of ergonomics and barring stabilisation.  The biggest problem with benchmarks is they are often changing and we don't really want to be a part of the benchmark race so probably I will present these benchmarks and in two weeks they will look very, very different and I don't believe you should choose software by benchmarks alone which also doesn't mean you shouldn't factor it in.
On reading async-std is 1.56 faster than Tokio.  You can look at that repository.  That's only on reading a 256K file.  If your application has a different read write behaviour your benchmarks might be different.  There's a fair warning.
Our Mutex is fast, up to nine times faster.  There is futures intrusive.  We are nine times as fast as the futures implementation at that.  This also gives an interesting insight of should I use futures lock Mutex?  These types are mostly implemented for making sure people can use them and run with them so these were for the implementation phase of futures and they are still shipped, so that people that rely on them can still use them.  They are good.  They are just not built towards they should be fast.  So this is Mutexs on the contention so actually Mutexs, there's frequent locking.  There we are up to two times faster than the fastest one and we are the fastest one under contention.  Mutexs without contention, and that is interesting, also have a speed task so Mutexs that are rarely actually a challenge, and there we are around roughly the same speed.  Why do I say the same speed?  When we run those benchmarks, they are highly variant in the sense the results will remain clear.  The implementations don't change spot but on the other hand some of those numbers change up and down.
Finally, how fast is task spawning?  These are the Tokio ten times benchmarks.  We are as fast.
There is another benchmark where we are slower, the channel ring benchmark that tests single threaded executors where you put up a number of nodes and connect them in a ring and then send a message around as fast as possible multiple times, and there we are 0.9 times slower than Tokio and roughly three times faster than actix.
Yes, notice, for risks and side effects of synthetic benchmark please consult your active keynoter.
It is an innovative space.  I want to mention that again.  JoinHandles were built by async-std and already adopted by others.  Single allocation tasks were invented in async-std and adopted by others.  You can both innovate and commit to stability.  Be aware what you - which thread should you use.
Our roadmap 1.0 will be released on Monday, so tomorrow, which will be a stable release with all base functionality and runtime concerns.  Ongoing, stabilisation of currently unstable library API.  Most importantly channels.  Also designing features that make async-std usable without the runtime.  I think this is particularly interesting.  What if I want all those features but actually don't want the runtime?  We want to provide additional libraries with similar guarantees, access compatibility, one onus.  And just to be clear, it is clear that we will have 2.0 at some point because there's new language features arriving and some of those might lead to breaking interface changes, not only in base grades but for example there is an asynchronous four loop coming and that might need some changes to integrate well with that and when these changes are coming down the line we will release 2.0 plus update guides on how to do that.
We would like you to hack with us in the next few days, so getting started writing more libraries on top or porting libraries to work with multiple executors.  We want you to challenge our benchmarks because all benchmarks are wrong, and let's figure out how.  If you want, we can get started writing an application and we would like to get a lot of feedback on our unstable API because we want to stabilise, and that means we need a couple of ibots.
Finally, async-std is currently completely funded by Ferrous Systems and we have started offsetting for all those projects.  We are also hosting Rust analyser and open collective so if you agree with all those goals and would like to give us some more time to work on it, thank you.  [Applause]
>>  Thank you, Florian.  We have time for two questions.  Hands, please?
>>  Hello, thank you for the great talk.  Do you think there are ever any use cases in which Tokio should be preferred to async standard?
FLORIAN:  Sure.  No, seriously, there's at least six executors that I know of around, all of them with different tuning settings, different kinds of APIs, so yes, there's reasons for all of them.  Tokio currently has a better API for fine grain control of placing of a runtime which is a very, very detailed thing to do and needs a lot of knowledge on how to actually place runtimes correctly and this is something that we currently don't provide at all.  So, yes, definitely.
>>  You mentioned that racing and selecting aren't quite the same thing.  Could you elaborate on that?
FLORIAN:  [Laughing] So the select macro of the futures crate is a pretty, pretty big beast that works on top of a library called proc-macro-hack which implements by itself a way of doing - basically implements its own match statement along with two different kinds of operations, how to react to an event happening on each of the branches.  So yes, what I was hinting at is this select in Rust isn't a very well-defined term, while racing is pretty clearly: there's two futures giving you the same results and that's also the other thing.  The select macro in the futures crate allows you to use two futures that return different kinds of results and react differently on whether the one resolves or the other one resolves where racing is: I expect the same back and I wait for the first.  So it's a vastly simpler operation.
>>  Thank you, Florian.  [Applause]