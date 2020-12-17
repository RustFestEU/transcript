**Learnable Programming with Rust**

**Bard:**  
Nikita makes Rust interactive  
so if learning it is your directive  
you won't need to fight  
to see what's inside  
to become a debugging detective


**Nikita:**  
Hi, I'm Nikita, and today I'm going to share with you a different approach to writing documentation and educating people about programming in Rust.
Let's start by dephenotyping the problem.

What exactly is learnable programming? It is defined by Brett Victor in essay of the same name, as a set of design principles that helps programmers to understand and see how their programs execute.
And some of the defining characteristics are of this idea are seeing the state of a running program, and giving the programmer tools to easily play with their code.
And these things have become available and important when they apply to the problems of education and writing documentation because they can help to lower the entry barriers for people who are new to programming, and, today, I'm going to show you how we can apply these ideas to Rust and systems programming in particular.
So, let's see how it it looks in action.

Let's imagine you're someone new to asynchronous programming in Rust and you want to learn more about it.
So you go to the Tokio's website, and you see they have really nice tutorials.
Before you can start experimenting with asynchronous code, you need to follow a number of steps because they have prerequisites.
You need to set up a new Rust project and then add dependencies through Cargo.
Then you can take a look at the code provided in this example, and this code connects to our Redis-like server, and sends a key to "hello with value "world" and gets the request with the same key and verifies that it has the expected volume.
Before you can run this example, you need to make sure that a mini Redis is running on your machine.

Why don't we try including all the necessary dependencies right there on the same page, so that a user can immediately run this code and see the results? This is how it might look.
I go to the same example and I click on the Run button.
This is compiled, and, on the right side, I can see a key "hello" has been set to value "world".
This gives the user an immediate context and response of what happens with their code and the state of the mini Redis server can be observed right there in the browser.

But we can take this idea a little bit further and make this code example editable, so I can change the value of the key and run this code again, and I can see that the state has also changed.
Or, I can add a new key while you pair "hey, RustFest" and you can see there is a new key now.
This approaches requires a minimal set-up so I can start exploring the Tokio API straightaway and I believe this is something we should do to make Rust more accessible to more people.
Of course, setting up a new project is also an important skill, but, the first impression to show that this whole thing is not really that complicated is also important, I think.

And, well, it's not some kind of magic, because we already can make it happen.
We are able to run the Rust code in the browser by using assembly, and the platform support is constantly expanded and improved in the compiler so we can make it work quite easily.
When you click on the Run button, the code that you have in the editor is sent to the server where it is compiled by the Rust compiler, and the model is produced as a result.
This model is then executed in your browser, and you can see the output.

This approach can be expanded way beyond Tokio or any other single library, because we can use it to enhance documentation that is produced by Rust doc automatically.
This can be used in interactive playground in which you can execute in your web browser.
And, while it already kind of works like that with the standard library documentation because if you go, for example, to the page that documents ...
we can click on the run button in any of the examples and you will be directed to the Rust playground where we can see the output.

Of course, you can also play with this code when and what I think it, but what if we make it simpler by running examples in the browser on the same page, and showing the output besides the code? This will make it easier for people to just immediately see the output without switching the context.
But there is a problem if we go beyond the standard libraries.

So the problem is how do we deal with dependencies, and especially those dependencies which won't compile? The thing is we don't really have access to dependencies on the Rust playground either, because Rust Playground has a limited set available to us because it's an isolated environment and that's an expected thing because the Rust Playground suits the code on their server, and they want to make sure that the code is not malicious, and they limit things like inputs and outputs, and loading the external dependencies.
On the other hand, this makes it harder for us, and practically impossible to run examples from codebases, or even from public crates, and it makes it harder for us to mentor and educate people through examples.
WebAssembly does not have this problem.

The sandboxed environment is not someone else's machine or server, but it's your own web browser, and this sandbox is secured by definition.
But the main problem remains: not all Rust code  compiles down yet.
Even if it don't, we can argue that this is a good thing, because if you want to add this kind of interactivity from your project, it will also incentivise you to make your code more portable, and make it compilable into a new target.

When you write tests for code that, for example, sends network requests, usually what you want to do is to - meaning your code won't really send real network requests, but instead it will pretend to do so.
So, you can test the behaviour of your code in isolation from the external environment, and that exactly the same thing that we want to do with our interactive documentation too, because we want to give the user the option to run their code independent of the external environment.
The main thing so look for here is the API performance, because we want to make sure that mock functions that we call have the exact same interface as your real code.
And while you can do this manually by using feature flags, for example, or you can use one of the many Rust libraries for automatic mocking, but the main idea remains, that you want to provide the same interface, both in your real code and in the mocked version.
And this idea of running the Playground code in the browser can go a lot further, because we have lots of techniques for visualising data.
So, for example, on this slide, you can see some code from the documentation of an HTTP client library called Request.
It sends a get request and outputs the response.

This example demonstrates only the abstract idea of sending an HTTP request, but how do we know how it actually works? And what kind of request it actually sends? In this case, we can output the HTTP request, and it is really helpful to see what kind of request gets sent when you send this code because it can help you learn more about HTTP, and, more than that, it can also help to you debug problems, because with an interactive Playground like this, you can replace the code with your own code and observe the changes, and observe its behaviour.
And the good news is that a lot of cross libraries already do something like that with tracing, and logging, but to use that, you also have to choose a logging library, and enable it to just get the log output.

With WebAssembly enabled, Playground, we just need to provide our own login library that will redirect output from the logs to a user's browser.
And the user's code can also be seen as data that we can visualise and inspect, and some of the components of the Rust compiler are already available as libraries and there are even some for creates that can be used for parsing the Rust code.
Almost all of them can be built in the WebAssembly so we can parse the code and extract the information that we can use to show hints to our user, even before they execute their code.
It can make our examples even more clear, because these hints can be shown as a user types code, and they can provide context information almost like in the case of IDs.
On this slide, you can see the request documentation again and it encodes parameters as HTTP form data, and, as you look at this code in the editor, you can see what result this or that function returns with your chosen hints because this compiler provides us with information about the function names, and types that are used there, and all the kinds of expressions, and it is really straightforward work with code as data because all expressions are actually variants of one large - so you can use pattern matching to work with this enum as you normally would do with Rust.

There is one more thing that we can do this year, and this is highlighting the code execution flow.
It can be compared to how you work with the debugger which can go through a program step by step, and while it goes through the program in this fashion, it also can show the internal state of the program at this particular point in time, and we can do the same thing for our interactive Playgrounds, because, it can really help in understanding the cases like, for example, ...
and on this side we can see an example from the Rust standard library documentation to instruct the enumerators in a functional style, and while it makes some sense, it's hard to see what kind of output we will get when, for example, we call the filter function on the third line.

But we can give a user this to go through the example line-by-line, while also showing what each function will do.
And we can also combine this technique with the others we have discussed so far, because this time, we can have access not only to the static context information that is provided by the compiler, but also to the dynamic state at the runtime.
And we can display data like local variables, or function call results, and as a user steps through the code, it becomes really easy to see how the state changes with each function call.
With asynchronous code, this approach can really make a difference in understanding how it works.

If we treat each step with its own function call, we can do an interesting thing here.
We can record each state at each step and move it forwards and backwards in time.
Since we are talking mainly about things like short snippets of code, and examples instead of, like, large codebases, it's possible to give a user a kind of a slider to go back and forth to really see the execution flow, or they can just jump straight to a point in time that is interesting to them, just by clicking on the slider.
And, again, this is not some sort of magic, because even if we don't have an immediate access to the WebAssembly execution engine in the browser, and we don't have a kind of fine-grained control over the execution, we can transform through the compilation step, and we can do that even without modifying and talking to the Rust compiler.

This transformation technique is actually pretty well known, and even the Rust compiler itself uses it for asynchronous code.
It works by basically breaking down each block into individual function that represents a single execution step.

This is known as continuation, and it means that we can continue the execution of a function from the point that we left it at.
And Rust has an unstable feature called Generators, and this is used for using the Async/Await syntax.
While it works almost exactly as you see it on the slide, so we have an struct that holds the variable state and local variables, and each block is transformed into a separate function.

So, when you want to execute this snippet, all you have to do is to call these functions one by one, and the state changes.
So these functions can be called from the browser, and we are very flexible in choosing in what order we call them, and what kind of state we record.

So far, we have discussed some implementation details for these ideas, but, overarchingly, how do we actually make it work? And how to make it accessible to everyone? And there are several problems to solve here, and not all of them are technical.
So, first of all, the Rust compiler itself cannot be built into the WebAssembly model yet, so this requires us to have a compiler service that will build arbitrary Rust code into the WebAssembly for everyone.

So we already have something like that on the Rust Playground, so it's not that big of a deal, and, well, so I tried implementing this idea in production for a systems programming course, and surprisingly, this infrastructure is not really hard to provide, and it's not expensive, because a single CPU optimised virtual machine can easily handle hundreds of thousands of compilation requests per day, but, still, we need to make sure that this infrastructure is easily available, and it should be possible to deploy it, to deploy this compilation server locally and privately.

There is another problem that we have discussed briefly.
If we start to include dependencies in our small code snippets, the compilation will take a large amount of time, and resources, and the resulting module will have a huge site easily taking up several megabytes, making it harder to scale.
While the obvious solution here is to compile these dependencies as separate assembly models instead and link the dependencies when we need them, but, this problem is made worse by the fact that there is no dynamic linking standard for the WebAssembly.

So you're basically left with the only choice of statically compiling the dependencies.
But, technically, the linking is still possible, even though there is no standard way of doing it.
It's possible to make two of the assembly models work together.
Each model consists of functions that it exports, and that would be our Rust functions, and it also has functions that are declared as imported, and these imported functions are provided by the caller, and usually they're used for calling JavaScript functions from the Rust code, and this is what makes it possible for Rust programs to interact, for example, with DOM and browser functions.

We can use this trick.
When Rust module A calls some imported function, what we are going to do is to call an exported function from Rust module B, and this works, but it works, but there is another problem with it.
Each model has its own separate memory, and this memory is not shared between the modules, and this means that if an imported Rust function tries to access its state when it is executed, it will fail because its memory reading does not contain the expected data.

What we will need to do is to basically copy memory from module A to module B before we can call an imported function.
The main disadvantage of this approach is of course that it is not standard, and can be currently, it requires manual implementation.
Ideally, the Rust compiler should take care of this for us, but for now, to make it work in the general case, we will need to find a way to automatically link Rust dependencies which are compiled as WebAssembly modules.
Now that we have covered all this, what is the conclusion? I think that it is well worth the effort to make our documentation interactive, because, it will help us to bring more people into Rust, and part of the reason why JavaScript is so popular is that it is so easy to use it and access it.
You don't need any complicated set-up.

All you have to do is open a console in your web browser, and you can start writing and experimenting with code.
With WebAssembly, we have a really good chance of bringing this simplicity into the Rust world.
But we still have a long way ahead of us, because the WebAssembly ecosystem has not matured yet.
But still, we can try our best in making this as easy as possible to have add these sort of interactive elements to any project, because we have tools like Rust Doc which can generate documentation from the source code.
What we need to do is to improve Rust Doc to automatically generate Playgrounds for our documentation, and we also need to have a tool kit to simplify building these interactive playgrounds.
The good news is that we don't have to start from scratch.
The most crucial part is, actually, the compiling of the code into WebAssembly, and the Rust compiler has got us covered there.

We just need to build the tooling around it.
I have started a project that contains the Docker image for the compiler service and some front-end components.
You can find the repository at the address you see on the slide, so, if you're interested, you can join the development effort, and help to make this a reality.
And that is all from me, and thanks for your attention, and I will be answering your questions in the chat room.

Thank you!
