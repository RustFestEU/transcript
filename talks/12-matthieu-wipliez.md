>> MATTHEW WIPLIEZ: So the remember title of the talk was supposed to be, Techniques for Writing concurrent applications with A synchronous. I had all the contents of the talk, for reasons, that hopefully, will be apparent later. So first, I'd like ton about you. Who has already used A synchronous I/0 in Rust. And who has used it in something other than Rust, maybe not JS. Okay. Cool. And so this talk is about I/Oin the context of networking. So I want to talk about file operations. If we do have time for questions maybe we can talk about it. I'm the author of the web framework. Called edge, and that's how I came to learn about a sequence. I help because I use the framework called hyper. Which you might be familiar W. and it actually switch Friday synchronous I/Oto Asynchronous I/O. So before we start talking about Asynchronous I/or, I think it's important to start talking about synchronous I/O. That's what you do, that's what do you in Rust, you know, out of the box. You have to trace when to read, when to write, and the typical use is you are going to revise from a stream, create response and Sundays these responses back to a writing industry. So by default, all of these are blocking. So when you want to handle multiple connections, obviously, you cannot use just one. You have to create like one connection. So the architecture of Asynchronous I/O application, one or more processes and each process will have like 1/3 the connection, right? So if you have end connections, then you're going to have end threats. So how does that look in Rust?

Plaintiff.

It looks like pretty much the way that the architecture was presented. So you have a listener, and then for each incoming connection, on the current thread, you're going to spawn a new thread and handle the connection there. What's the difference between Asynchronous I/O. You have a fix it thread and its thread, actually hands out a set of connections. So you have like, instead of sockets in the context of networking, and it is going to pull to see each socket, whether it needs to be and then tell execute these operations, using non-blocking calls. Okay. So what are the advantages of the Asynchronous I/O? So there are three main advantages in terps of reboot, the number of request for significant executes, in terps of agency, so you can respond faster and in terms of memory consumption. And it turns out, that's especially the case in web servers so some folks at dream post, actually made these bench marks to see what the difference would be and apache is traditional synchronous architecture, and despite being a point slower not that other two. It consumes much more memory. So earlier, William selects and tile, it's interesting to look a bit about the history of the synchronous. So it didn't start with JS and it's actually much, much more than I originally thought. This is one of the good things of doing the talk. So you can actually, dive deep in history. And actually, I'm not sure I was born when select, when it was implemented and later on, the system came to Linux in 1987, and something interesting that happens in 2002 for Linux, we started to get it's implementation. So for Linux, the main difference is scalability. So this is a figure so the difference is the performance of Epole will remain constant, using Asynchronous style, because we know it sounds like magic, and there's always something behind magic.



Since you're using one thread to manage many connections, and you have to enter the connection in a timely manner. So from the left you have the Asynchronous approach. You receive connections and the time it takes you to handle those connections, for instance, your handler is going to from the other side, it's going to take one second, 200 connection. But then, it's okay. Have you multiple threads,.



In Asynchronous mode, caps is that instead, the first connection is handled, the thread will like, do its thing and then only when it is processing this request, will process the second one and so on with that being said, let's see how you do Asynchronous I/O. So the good news S there's blocking with libraries. Rust is 1.9. So the deference is instead of having a block, instead, the call would return an error saying, you know, I cannot perform this operation and you told me not to plug. And the problem is that there's no pulling API. So but luckily, we saw that earlier. This is MIO, that stands for metal I/O. The way it supports is by using the underlying libraries so Epoll in Linux and windows, I/O. And it's 0 allocation and it is scrolled back.



Now when, you use it directly, this is actually, from the examples when they get the repository and that's just for an equal server and that's just handling the connection for an echo server. You get that data back. And this is only the part of care and the structure and to write data so maybe there are some spectacular cases where it's interesting to use my directly, but in practice, what I would recommend is that you use another crate on top of it that would actually take some of the pain away. Or even most of the pain away. I mentioned a few here. These two are using a cogene approach to do their arcsynchronous I/Oand last crate quite recently, this is the library I will talk about.



So why tokio? You don't need to say, hey, look, I'm interested in read events or write events or any of those. Tokio will just infer this for you. It will know you want to read later on and you want to write later O. also, it's a futures' based, Asynchronous IO Oli /O library.

The idea is it's a different computation. Means it's a piece of code that will get executed at some point, later in time. This is, I'm not sure it's in the latest branch so this one is the hyper solution, maybe, how you should define a hand ler so you would need to implement the straight and get called back when there was a request coming in and you say, okay. Now, based on, you know, if this request is a pose, I want to read from the France port. And then it will go on request. So to say, maybe I want to write a response, and it kind of, you know, gets not very natural or it's a bit clumsy. So the author didn't really have a choice because at the time, he was just wrotor and is now in with Tokiyo. So moving back to futures, like I said, this helps you go back from serving, instead of having nested coals, you have this nice, beautiful, flat structure and it kind of, it maps quite L I think to the way Rust already does, you know the [indiscernible] and stuff like that.



So the wave of the future is defined -- okay. So this method returns a result so either is an error and okay . if it's fine, you have two choices. If dataa is not ready yet. Maybe it depends on another call. Waiting from some data to arrive. Waiting from another computation to complete. Then you say, okay. I'm note ready yet. Or you can actually return results and then you return Asynch ready with a value. So there's also the [indiscernible] set for stream. A non-blocking, and the idea is that so you return either some value when you're ready to do so or known and known means it's the end of it.



So what's the relation between futures just a quick note about futures and not blocking. So futures should not block when facing I/O in general. There's a wait future, you should not call when you're inside ray future, otherwise, it will just wait and not advance in the current thread. So actually, I made that mistake once. If your program needs to do computer intensive work. Things like, maybe resulting -- then you should use a thread pool. Every time you do a blocking function, which can be a bit heavy-handed, you just submit a job as a closure, and this job will get picked up and executed by one of the threads that's available. So the notion of thread pool is outside of futures. It just turns out there's an implementtation of road pools for futures which is called future [indiscernible] poll.



The way that Tokia I want greats, you get all this low-level stuff. All the call-backs am then Tokio core takes care of registering the interest and exposing the future base. On top of that, you also have a higher level of services. Tokio proto.

It actually started in August 2014 that's a bit over two years ago. And the author MIOis also the author of tokio.

And we see in March this year, the futures are straight and then N August of this year, a number of interesting things happened. August 3, Tokio is announced. And about a week later, there's this crate called future officially is announced and yes, non-blocking calls and for computation and it actually turns out there's a crate called futures MIO talooks good for Asynchronous I/Oalso. So you know, I was in holidays at this time, and I was thinking what I'm going to say during this talk, and I was thinking about talking about all the stuff, as I had to do in my framework. And I say taactually, you know, it's changing things. It starts to look, you know, very interesting to do Asynchronous I/O.



Luckily, two weeks after future is announced, then the three authors announced together, the emerging parts of the project. So that's futures might actually become tokio core.

All right. So we go to what's called the core of the react O. I don't know if that is intended. Probably yes. To the core of the reactor is really like the heart of this.

So it creates the loop. You start listening on the IP address and port, so what's next, the incoming returns the treatment of connection. That's ray none blocking stream. For each stream, you run and the first return ace future and that future is execute on the loop. So to do actual handling of the connection, you need to put that in the call for each method and that looks like this so you get a stream. That's inIng connection. And what you're going to do, you're going to spawn the future on the loop. The loop will actually run, the future that's running a code. One of the incoming connection rides and it will also run every closure, every future that you create to handle the connection. And so, let's see, maybe let's take some action. So I've chosen in this case, just for this. The identification protocol. Which I think is I don't know if it's still used outside of IRC. So the idea is that it was originally, I think in the context of FTP or something like this. And the idea is that the clients that you connected to, want to know who you are. So they will send you a request and you will reply, the operating system and user. It's a line-base protocol, which is nice enough to, you know, maybe make some experimentation. So I think at this point, I have you can see this. So so zero. If you say okay. 1, 1, then there's no user because there's no connection from port 1 to port 1 and if you point to a connection, like this one then it returns the user IT and the breaking system. Yeah.



So how do we do this with tokio? So first, solution I'm using only tokio core. It was like higher level layers. What I want to do is just realign, you know, try. So I realign and I would process that request and get reply, and then write all the replay to the stream. And I'm not ready yet to finish because there might till be some bites available. This function returns, and tokio will see, depending F it D we'll come here again and it just looks like this, until there are no more [indiscernible] read. Asink, I'm ready with unit results. So there are just a few problems with this implementation. So the first one is that I use the perfect reader because it was the easiest solution. But it actually turns out that the reader will try to will try to fill a buffer in the fist eight kilo bites. It is not enough to fill the buffer. So Republican error, saying it will block. Also, that's probably less of an issue here, biin theory, it could also block. So right would not block. Once you use that, if you want all the response to get sent back. There are possible solutions to improve the implementation such as using buffers, so you feel the buffer. Whenever there's a line separator then you will process the request and using the same thing for the right side and you can do that perfectly. Or you can use streams so you transform the incoming bites into a stream of strings and handle this with the future.



There's another solution that uses tokio service, which is kind of higher level than this and actually, it looks like what you might want to do so the idea of the tokio service architecture Uyou no longer have data bites comeIng in. Bites coming out. You will actually parse those bites into whatever you want to do like a request, and this is transport layer and then request gets given to the service layer while you do the actual handling of data.



And the handle, turns into a response, and thence response gets sent down to the trance port layer and timely, it gets sterilized. And sent on the stream. So it's just a matter of implementing two traits. One is called parse. The other is called sterilized. You can return or not or not that structure and it is the inverse separation where it gets, where you get the structure and you get to describe how you're going to send it all right. So now, all that's left to do is do the actual service implementation. So far that, I'm using a little help or function for tokio called simple service. So the service traits I don't know if some of you use the service trait directly. And the service trait has, I think four types. Input, output, the future type, the arrow type and it's just a lot to implement like, four lines of code. So simple service what it does, it will create an instance of simple service from a closure that returns a future. It's slightly simplified, otherwise it would not fit on the screen. Implementation, the idea is like this.

To define a service as a simple service from a closure, you associate the strands port and finally, you create the service, the server, using the service and transport. Every time you get a connection, you will create a transport for that connection, create a service for that and pass it to this server, which is done by tokio itself. To conclude this talk, as we have seen at the beginning, it leads to high performance. At least it does for web servers, probably like, with low-level, time constraints, A parentally, it's a bit different using higho or high-level stuff. That is for networking. It's very interesting. And there's a rapidly evolving ecosystem, especially as I said, what happens in just in August, and so things are moving quickly. But I think that this morning, Rust is at a turning point, in the sense that look great to you and tokio. Try to play with it. You know, use a simple example, maybe use futures blocking implementations and crates. And yeah, that's T. thank you for listening and if we have time for questions yeah, feel free. Thank you.



[Applause].



>> RYAN: It is my great pleasure to announce that we have time for one question.

[speaking away from microphone]

I'm wondering can you use the same event for different acts of [indiscernible] safely. For example, can I have the same event with a couple connections and [indiscernible] connection?



>> MATTHEW WIPLIEZ: I'm not sure I understand the question.



>> AUDIENCE MEMBER: So the event,.

[speaking away from microphone]

The connection. In the same event, kind of like a different side, not just a metal connection but [indiscernible]



>> MATTHEW WIPLIEZ: I don't know, actually, you mean different protocols if the same loop?



>> AUDIENCE MEMBER: There's different type.



>> MATTHEW WIPLIEZ: So I think in theory, it's entirely possible because you know, I know that's the crate n allows you to maybe have http and htps in the same thread. I'm not sure how to do that in tokio, actually. So maybe it's possible. I really have no idea. Thank you.
