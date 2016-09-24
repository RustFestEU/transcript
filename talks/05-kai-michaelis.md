>> KAI MICHAELIS: Hello, everybody, my name is Kai. And today, I'm here to talk about my first project I did. A cross platform. Written in Rust. So what's a disassembler? When you program in languages like Rust or C++ you write your code, in your compiler language, that's a compile tore transform this high representation into a lower representation that's executable by the CPU this transformation is combination and get out [indiscernible] language. It has not much of the features you have in your high level presentation. You can see how this looks like. It always starts with shorthand for struck. In this case, SUB. Subis the stat arc the nemonic for subtract and after comes RSP, that's symbolic name for an internal memory area in the region, there are no ifs or loops. When you do Cole Ctrl flow, you have brach instructions where I make this check and depending on the outcome. I either continue with the instruction or start at another memory address. And use some writer to transfer text presentation, on the CPU connection. This is more more or less, a one on one method. Most of the time, you're in ray situation where you have a program, and you want to know thing about the program, but you don't have the soft code. This is often times, proprietor software and with proprietary software, it has some protocol implemented and want ton how this one. Disassemble it, and try to find out from the patterns of the implication how Ts with.



Other situations, it's more how did d it get into the system, how does it spread, how did d it hide from the user and how does it get the information. So it's not the first application you can use now, roughly for under three category. Have you simple tools. These are often parts of larger compatible interests, and they are only there for analyzing the interest. And there's not much more. There's no [indiscernible] done. Then have the prototypes. Binary elements, in the selected field of research, there's a lot of research going into what can do in this binaries and these things are very impressive. But they're not really, they are to be used by nonexpert users. So they are always labbing documentation, and if you didn't read the research paper, you won't be able to use them. And then the commercial offerings. That are ate indisbetween those 2. They're easy to use. And they have parts documented. It's proprietary software. They can do some things, they can change some parts but not everything. And they cost obscene amounts of money.



Projected started in 2009. I wanted to analyze some proprietor application, and there must be millions of them, and none of them were actually useable on my machine. So there were some softwares that -- there were commercial offerings that didn't work. So I thought to myself, how hard could it be turns out, it's hard. I was told you have to throw one away. Between 2009 and 1011, dia lot research in how to build these kinds of things and analyze the stuff can you do on them and sometimes, I program myself into the Corner whericn't get out. And sometimes, these were never meant to be really extensible. So in 2011. I started with the real thing, and I start with the C++ at that time, it start to improve the standard again, and I thought, I might as well use that. Until 2015, grew to a size of around 10,000 and Rusts came and solved pretty much all of the problems I had for C++ and it took me a few months to convince myself that, again, taking all this code, I was the contributor to this problems all the type. And in writing it again, alone, was best thing to do. I'm here to convince you, this was really a great idea.



So in June, I start, and it went really good and I was surprised how fast it was. In October, I was at the point that the Rust version has the same feet feet features as C++ version. I got rid of a lot of code, mostly because Rust alluse allows me to better match, and this means have you to do computable programming, which is very hard tow use and gets [indiscernible]. So this is some boring metrics about the current state of the project. What's maybe a bit interesting is how much went up. 30%. This is not good. But it's definitely better than before. I had 50%, maybe. And this is mostly because testing in Rusts is super easy. You can put a test in line with the code. You have to remember to test all the funks, and this wasn't working for pee me at least. I have 980 Rusts points on the computer.



So what is the current state of the project? You can open up, you can open the standard format for binary systems, and instructions -- but again, a list of functions. And the functions, you get pictured here, a control for graphs so you have these, each box represents one sequence of the cord that's executed, always. So you know there are no jumps inside this box and no one coming out from the end. This really add to the flow throughout this program and analyzes. So what it can do then, is add comments to the sides Q. figure out what the funk does. Can you give it a name. For example, proprietary application. Can you read the functions of a matching number. M.O.S.6502, which is the [indiscernible]. That's pretty much it for now. So how did this conversion go? It was really fun. I have experience with C++ and comparing to them, this was really fun watching Rust and learning Rust. What I really liked in the beginning, for example. I open the book and 50%. And start to

dive dive in and you have to use something like [indiscernible] lifetimes. And program is the best way to learn, it really helped me to get over this initial bump and really got me interesting. You have this but when you compile a test, you only get the long error many.



[Laughter]



And in C++ when you have dependency to your application and people want to compile, they have done every single dependency and compilers, and you really have to go and decide if I compile it much set of pass, the binaries and this makes deployment very, very hard. So I had to think very hard about every dependency on the project. And I had no dependency. Easy to -- put dependencies in there. This way, I could reuse much of the code that was already done.



I am reimpressed how much packages are in this, compared to wop year ago. Reading ERF structure and use the code done by,s that, most of the time is written better and maintained, as opposed to the stuff that's more right on. Getting back to the application is always hard. And when I start to put in my code, I had a situation where I parted some functions and displayed the graphs. And there was some functions to do here, to remove something from that.

Way do is, remove one and so pretty straightforward. And I follow this function to Rusts as soon as possible. I have no idea what happened, but digital file. So diwell. I always do with a piece of board checker, I start exploring things more and more. At the end, I was at the point where I just copied the whole container. And this was the first time, I actually looked, and checked anything. And I realized, there was a need for the [indiscernible] problem. C++, in Rust. Plus, they are not checked or something like that.

You start incrementing until you get to the end. And muted container, these problems come from, these are rehabilitated. They are three later structures. These month Estopped being developed. If you don't do this, things will happen F. you're lucky, [indiscernible] goes up F. you're unlucky, you're like me. The Rusts, of course doesn't work because hasn't referenced others container and muted the container. This was the first time, I saw this checking thing, really finds a spot and this is something that is that is not very based and you find this all the time.



When you write and record in C++, you never know when I compiled in Rust. I know that certain box in there that can, give it encourage -- Rustsism occasions, and when you do this tract come, there is there's some part that more more or less emulates or really executes the instructions. Over flow integers are pretty complacent this is pretty annoying. I understand that my special case is probably not a general case. For pee, I'm not sure I come from C++. And in Rusts, in C++, using ate programming a lot. Duly designed to do things.











what we actually do is write them, a machine that looks for some patterns, and the first pattern T generates some structure. Now, this is the nemonic XY. This is the argument much and if you are, for example, you have thisration that's called O.I.I. immediate value. We have two arguments. For each of these operations, a CPU. You only have 100 of them. More more or less looked like the -- in the other half you see what is in the reference documentation, and can you [indiscernible] copy for reverse itch implementation and this makes it easy to check qualify these things are correct. One bit, for example, T does work. And you have a function to it. So what happens, the Rust cost function and eventually, creates all the meta data in that situation, I have cogeneration of macros, it can understand what nemonic operation actually does. This enables us to do a little bit more. And this, for example, tells you how data flows throughout implication. You need to define some kind of intermediate language. Like compiler. This is ray part that generates immediate construction that is easy to be analyzable. And uses rays. RAEIL. Kind of a standard, and I built a macro, which was more Les, the derivations for another. An assemble ler, for 6502. And it looks like the fight and applications and research papers. Again, you can just copy your stuff into the macro and then makes it easy to verify there are some things I don't like about Rust currently. Doing rough output is very hard. They are they allow to you draw if rectangle and stream. Bicomplex [indiscernible], that's hard to do. And I use QLRS this is another problem because cube K + and you can't interact C++ directly. Just makes it hard to deploy. And then -- you have to declare independency beforehand and then you use then. That's a problem. The guys have enough to solve. But for me, that means have I to wait until the problem is solved before I can try to get the official package which is really important. Because publics and so O. and one last thing about, I really like [indiscernible]. I wish they were a bit more flexible for example, tree part. I use it and I know what products but I don't really know how it works.



Why I'm really here is to tell you about my projects, and you will help me because I'm programming more or Les alone. Miurus is terrible and there's a lot of unrep in there and a lot of okay and unrep. And just returning this to an error, already sufficient to get a request in there. If interested, the website is:

And for the problems is.

Panopticon.re.

And E-mail is@ _{~cibo _ .

And that's T.
