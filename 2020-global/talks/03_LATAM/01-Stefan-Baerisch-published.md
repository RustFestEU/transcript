**Learning Rust with Humility and in Three Steps**

**Bard:**  
Stefan gives us three steps to learn Rust  
Not saying that follow you must,  
but if humble you are  
with Rust you'll go far  
as you learn the compiler to trust


**Stefan:**  
Okay. Can you hear me now?

**Stefan (@dns2utf8):**  
Yes.

**Stefan:**  
You should be able to hear me now. Hello? Okay. So, as long as I'm not hearing anything, just assume...

**Stefan:**  
Okay. So, can you hear me now? Because we had some technical difficulties.

**Stefan (@dns2utf8):**  
Yes.

**Stefan:**  
Okay.

**Stefan (@dns2utf8):**  
Do you mind restarting quickly?

**Stefan:**  
Yeah, sure. Sorry for that. But you see, we have more to learn, if it's only the mute button. Okay. Rust with humility in three easy ideas. So, what I tried to do, learning Rust, was to learn at the desktop applications. Because honestly, I like desktop applications. And I didn't start out with Rust directly, but I went through different technologies which gave me the opportunity to, well, see how... what made it difficult to learn different things.

And so, the first idea of learning Rust... learning anything, really, is why do you think it might be hard? Why do you feel it's hard? Know your challenge. So, the background was basically I had my desktop application, I started out with Qt. Qt is a C++ framework and it's rather big. So, I had to learn, or refresh a lot of C++ which is tricky, and I had to learn Qt, which is extremely large as a framework goes. And I also had to deal with quite a lot of surprises. So, I had to learn a build system. And I had to learn how different compilers and different platforms worked. Which took a lot of time. Next attempt was to switch over to web technology and Electron. Which was not hard to learn, which, again, was much to learn. And a few things were, once again, unexpected.

So, dependencies between the many other packages that I used were really hard to figure out. And signing the code to submit it to app stores was, well, not really nice. Which is... finally I switched over to another architecture which worked. And that was based on, well, Swift, JavaScript and Rust in the backend.

So, what I came up with is basically VueJS which I had to learn. Swift, which I didn't use before, and Rust, which I didn't use before. So, well, many different things. And finally, I realized that Rust, so it was in certain parts the hardest one to learn because of making sync. Was also quite quick to learn because it was not too much to learn. And everything that was there was rather, well, transparent and expected. There were few surprises.

So, if you struggle with a language, the first tip, the first idea is, be aware that in learning Rust as in each technology, you have to look at different things. You have to wonder, is it just hard to learn? So, are there some concepts that I don't know yet? Or is this also much to learn? Do I have to learn a lot of libraries, a lot of language contents, a lot of syntax? Are there a lot of things I need to learn package manager, build systems, et cetera? Each language has different degrees of difficulties. Different things that you have to keep in mind. And the thing with Rust is that the language itself, the concepts, et cetera, are quite challenging to learn. Especially if you haven't worked with a system programming language. But it is... once you have done it, it gets easier quite quickly.

So, it is worthwhile not to get discouraged if you run into this steep learning curve at the beginning. Because everything else will be easier and it will be easier to get along. However, you can do yourself run large favor and try not to do too much at the beginning. Because when you learn concepts with a language like Rust, you will have to face many new things just when you start. And you'll have to have some basic understandings of the model, for example, for the syntax, in order to accomplish even the first steps with the language. That means, give yourself some time. And once you start learning, focus on the language. Go over these. First a step here. And then slowly work yourself up with the ecosystem, learn the different libraries. Learn the context of the language. So, simple application domain. And try not to change too much.

Rust is extremely powerful. So, there can be many things that you would like to learn that would potentially be useful for your project. But give yourself time and focus on this first step. And, well, learning should be easier. When I did my little project, I basically started out with doing word counting application. Had a word X, et cetera. And only then slowly moved on to more work and more complex things that I needed for my application backend. And even there was, well, I choose the most boring and maybe even inefficient architectures that could possibly work.

Related to that is the second idea, practice. I have seen... well, I'm gonna say it. The personal weakness to read a lot about languages before I use them. Especially if I have the impression that they are where we   when a new and interesting concept in the language. And this can be a difficult�   it can be difficult in languages where you can potentially be overwhelmed if you tried too much at once. I'm living here in Munich, we have quite a lot of mountains. And I always saw that the difference is between trying to think about a hiking trip on a map and seeing it in real life. Because in real life, things are always slightly more complex. Which means that if you chose for your project all the features that you could potentially want. And if you wanted to use the most elegant syntax and don't repeat yourself. And also, in quite good idiomatic code. Then it's quite likely that it will work out. But in practice, you run into slight things that hold you back. Might have a problem with one particular syntax feature that you haven't grasped as much as you would like to. And this will hold you back.

So, it's often at least for somebody like me, a better approach to do very, very small things and practice them than do something else again. This will enable you to have, well, a lot of certainty, a lot of practice, when you finally move on to harder and more complex topics. So, what did I do?
The first things that hi learned is just ownership and basic syntax. Once I had the roughest idea about what copy type was. I just moved into just pushingso structs around and then using clone a lot. And after I did that I started to work more with references. And then slowly worked over to smart pointers. So, in essence, I just tried to get myself to the same knowledge level that I would have in other languages. For example, Go, Java, Python, where I do more programming. And that gave me a rough idea on how I would have to move along. Only then did I look at my application domain. There was this little backend for this time I had. And I sort of said, which features do I actually need? Which collections would be useful? How are those collections used?
I think I need multithreading and maybe a library. And to handle some internal requests. And after I edit each of the features, practiced a little bit, did some perfection, did some changes, and in this way, I was always able to slowly move along. So, I always went through this planning doing phase which allowed me to, well, get some things to work.

Which brings me to the third and for me, at least, the most important idea in learning something that is... not is   but can be challenging like Rust. Be humble. I think we as software developers, architects, we always like to�   not to be honest, to feel clever. To feel good about ourselves because we have grasped and mastered the features of our language because we write good code. The most idiomatic code, the safe code, all the most performant code. And sometimes in order to get to this point where we, well, write the best code we could possibly think about, we challenge ourselves too much. We start running and basically decide that within 2 months you want to run a marathon. So, take it slow. And Rust actually allows you to start slow.

It allows you to be even bored with what you're working on. And then slowly move to more ambitious things. Which gives you the confidence that you will need to move on with your personal project without being slightly overwhelmed all the time. Or without staring at a wall of compiler errors that you don't really understand because you decided to use the most advanced... the most advanced user system traits and the type system.

This also has... has an advantage that you can actually build higher in terms of knowledge. My personal idea of programming languages, about learning in general, was always that you always build the concepts on the easier concepts that you have grasped before. So, in order to get a good idea, for example, about ownership, I think it helps not only to think about ownership, but while it's not necessary to have somebody about pointer management, memory management works, for example, in C or what reference counting means in other languages like Python.

And this gives you doing many differences and gives you this broad basis that you can put all the things that you need to do into context. You're not only know, okay, I have seen in this book that I need to do this in the following way and know the rough concepts. But you can also relate it to other concepts that you ever related before. This can only happen if you can be humble and do small little steps which ultimately allow you to ascend faster. If you always work with the most difficult thing that you can possibly grasp, and this is the most clever code you can possibly write, it will be quite hard for you to debug this code or refactor this code or even to come back to this code if you, for example, move to something else for a couple of months.

So, doing simple things anddoing them often ultimately leads to mastering I would argue quicker than if you tried to challenge yourself too much. There's an old saying that shortcuts make for long delays. And I think this applies to learning programming languages. Well, I can only remember that when I started to learn Rust, the first program I wanted to write was a word counter. I always use a little thing wherever I go of a couple of hundred files on my file systems and counts of words and give me the most frequent ones. Which is usually a couple of minutes or maybe an hour in different programming languages. In Rust, it took a little bit longer. Mostly because I started out assuming I could just assume one to one from the C++ program. I couldn't. I had to do these baby steps to slowly ramp up. And I tried to just allow myself to be less clever with my code. And I came up with six things. I think some of you might disagree. But even if you disagree, maybe just think about it.

So, first of all, simple code is okay. You don't necessarily need to do pattern matching or complex programs or nice patching if you can just go for refills. You may end up with screens on screens of not nice if/else statements, but then you can end up with a program that you can refactor. It is okay to limit yourself. So, Rust makes the design decision to have many things that are useful but are not in the standard library. They have many good grades for error handling, for better error types, better concurrency, abstractions, et cetera. And I always have to stop myself looking at crate io and look for the most suitable and interesting crate andwrite a simple solution. Even if the simple solution means my error value is a string. And the code is maybe less nice, less idiomatic than it could be. Because it allows me to focus on some basics and at least know what I don't know about my code.

Inefficient code is okay. Rust can produce very fast programs. And with support, also very fast servers. The thing with especially sync, things get complicated quickly. Allow your first version of your code to be inefficient. Do some memory copies, do some clones. Write in the same server. And later on, if you realize that you need something faster, you can always move there.

Now to change tone a little bit. Unsafe code is not okay. So, first of all, it's unlikely that you will succeed in tweaking the checker going forward on unsafe code, and it makes things harder. Because one of the nice things about Rust is you don't have to worry too much about shooting yourself in the foot or to make, well, mistakes that you wouldn't know about it. For example when I wrote about a Rust program what I worked with them and had to reallocate some memory. The cadence is much harder than it would be in Go. But thinking about it in this particular corner case, when I would do this in Go, my... yeah, I would most likely do a copy where I wouldn't really want a copy. The safety benefits of Rust help you learn. The compiler is your tutor in a way.

Boring code is okay. Many nice macros. That can help us. Macro programming is quite interesting. Nightly has many features, meet nightly. I would not necessarily go there at the beginning. Stay with the boring old stable world and move along. And to repeat myself, small steps in your code are okay. So, if you find yourself writing boring short functions, you're quite likely on the right track. Yeah. And that's almost all of the talk. So, the summary is quite easy. There's always this idea of computer science and management and everywhere of improvement loops. Doing something to improve it. Well, almost embarrassingly, it's the same as learning programming language. The only thing that's different with Rust is you should keep your steps. You have learned something, you're motivated to learn something more, write some code, look at the code. Refactor it, think, okay, which additional feature could I... would I want to use? Maybe how   I do allow myself to use this particular�   this one crate that I will then learn about.

And research, you can stay motivated. You don't overburden yourself and you make slow progress. Things that start slow concern quite quick. For practical things, if some of you are just getting started with Rust or have, well, done some initial learning, I can just give you some hints from me. I'm a reader. So, I learn mostly by reading and some but doing. Ironically, I don't work particularly well with videos.

But for me, what brought me first was starting with the Rust book. Which was quite nice because it explains a lot. Then you have some code. Then do some exercises and then go back to Rust by example where you have more code. So, maybe you don't need so much... so many explanations anymore. And you can just read the code, take the code, change the code and do some more experiments. And maybe start. Do some relatively simple things. So, lead code or presenter code or just porting your commandline.a simple commandline tool is something that is, well, limited in scope and that gives you a feeling of success when you run. And after that, what I find quite interesting is just select some books and then go to the GitHub repository. Often you find there example code online even if you don't want to buy the book. And then just go over the example of code. Read the example code and wonder, okay, what are they doing here? Which features are they using? And maybe play around with this example code a little more.

This maybe then could be a step forward for your complex project. Or even to move to an existing application and see how they are working with on Rust source code. Maybe just download it, make some changes and see if it still compiles.

Okay. Yeah. That's my personal experience with writing my first Rust program. So, a couple of... I think it's about solid lines of Rust code. Working messages around a desktop application. It took me longer than I initially would have thought, but it was fun and I would say ultimately it felt good writing Rust because even if I at times was quite challenged learning it, I always felt that the code that I was writing would actually work and that I would actually be able to change it in a couple of months� time. So, that's all that I have to say now. Thanks for listening in. If there were any questions, I would be happy to answer.

**Inaki:**  
Thank you, Stefan, for that very validating talk. As I'm sure everyone will agree, it's very rough at the beginning for everyone. Very, very good pointers.


**Stefan:**  
Thanks. It's not so much, I think what you have to refrain from, and that's what I think, I write a lot of Python. And with Python, it's always... say programming language is easy mode because you have, well, you have a garbage collector, you have a reference counting, you have a syntax. And Python is extremely good at hiding complex libraries from the user. Rust has to expose some of these complexities. And just can be different. But I think what I really like to express, don't be discouraged. There is this bump at the beginning where you have to learn the concept. Unfortunately, there's no way around it. things will get easier. Rust will get easier.

**Inaki:**  
We have one question from the public. Based on the experience you've had with previous languages, what was the most difficult thing to grasp?

**Stefan:**  
Actually, access web. This is not so much... two things. Access tries to use what advanced traits in how you would use the library. And they are moving quite fast. So, I ended up with finding a lot of different or outdated documentation that it was quite a bit of trial and error. And since I'm on the trait system, I couldn't just go and see, okay, this is how this is supposed to work. But I had to slowly work myself up. And yeah. That's actually the one reason where the compiler couldn't help me. The compiler and extremely good, especially with error messages. Okay, ownership is not working. This needs other to be cloned or it's somewhere else. Or the trait's missing. There I got a lot of trait, but I couldn't really at the beginning understand it.

That's why it changes one of the things and why I would advise to start with the standard where you have more stability, simpler code. Even if it means that the performance and the features are not necessarily optimal.

**Inaki:**  
And what would you say is the best point on the learning curve to start interacting with existing projects in your experience?

**Stefan:**  
I think when you have a skin in the project. If you start a project and they start throwing about you have to work with this particular trait or you have... now, okay. I may not have grasped this now. But I now because I read this chapter in the book and I can sync. I can figure out how it works. So, is that   you don't read a sentence and you have the feeling that you have to look up every second word. And then really�   depends on the project that you want to work with. I've really found it a good middle point is, well, example source code from books. Because especially if you go into the later features, you can just say, okay. I know this concept. I know this concept, I know this concept. But it's not the code that I've written before or that I have written my exercises in.

And then you can maybe use, well, start on commandline tools. Maybe. I basically looked at the applications, the direct application. Maybe just go to GitHub and Google for commandline tool, look for commandline tool. Easy application domain, nothing too challenge. And see if you understand it or not. And if you don't understand it, move on to something else. Or dig in. Whatever ends up    it depends on what keeps you motivated. Don't get frustrated. That's the most important thing.

**Inaki:**  
Yeah. The most important. If you do get stuck, what place do you turn for help? Any particular website or place?

**Stefan:**  
Not really. I usually go... Rust, for example, is   Rust by Example is quite nice in terms of book. I still find the old O'Reilly book quite nice. They have a subscription service. But they have the Mastering Rust, the second one, is quite good. And the source code is also on GitHub. Which at least allows you to search by keyword and see how this is used in context. It depends so much. If you're struggling with a library, like my access, for example, it's not that it's related, I just didn't use a library. You need example code to make it work. If you're struggling with concepts that usually pop from book to book and try to work with the simplest possible example that I can make up and, well, play around with either Rust Playground or local code and see if you can make it work.

**Inaki:**  
Great. All righty, I think that's about it for questions.