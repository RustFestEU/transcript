>> TIM CAMERON RYAN: Oh. hold on. The Internet of things involves setting up monitors. So if you can seat state of the Internet of things right now. Hi, everywhere. I love being the talk before lunch because it ends in lurch, which means my talk always has a good ending to it. So hopefully, you're all psyched for that.

Thank you for letting me talk here today.



My name is Tim Ryan, I'm a developer from the U.S., I've lived in San Francisco worry two careers, and then, most recently, moved to Boston and that entire time, I've been working on developer tools, specifically, developer tools for devices for drones, for basically any problem where a software developer would say, hey, I want to sense that or talk to that or move that around. Anything outside of the confines of what a computer or a phone can do, I've been interested in and I know that the talk has Sirvo in the tideel which is the name of an experimental web browser. Unfortunately, I'm to the knot going to talk about it at all. So sorry about the disappointed. So things one the Rusts talks, like the hobbyist motor. Hopefully, in the future, I'll make it up to you and talk about Servo talk to the browser.



How does Rusts interact with hardware and circuits? So the biggest problem in hardware, I have information or there's something I want to accomplish. How Do I want to talk to it. Million you have a laptop and temperature sensor, which could look like this or you just have the idea that I want to go ahead and see what the temporary in the room is essentially, some of these can you plug into your laptop via USB. But most likely they can talking some embedded protocol. You need to build a circuit on the other hand them and what is the standard in Rusts in order to want to circuits, is it just like reading to a file system, talking to a web server? A lot of software developes probably don't van an log for what this looks like, evening if they go and develop the circuits. Especially because Rusts is built around developing laptops right now. Let's say I even solve this problem. I have Rust code and I'm talking to a sensor and this is happening at my home and I am now, 3,000 miles away.

And I would love to know from my mobile phone what, temporary is in Boston, pass mass and my house. Is it really cold right now. Is my house burning down. I don't know. These will be great questions finding out. This is the other problem of Internet of things, which is connectivity. A micro controller board is a breakout board with its own CPU on it. You plug it into a computer and you develop for that target. And that is what communicates to a device. A lot of these board vs. Different pins on them. Basically, little ports, that say can you wire this to a circuit and these pins do various functions, sometimes specializized, sometimes not. There are a lot of common once you might be familiar with. For example, at one end of the spectrum is micro controllers. Here I have have eighteensy board, it's a micro controller, uses one from free scale. It has 32 pins on T. it may have a few hundred kill bites of memory. It is a completely different programming model than what you're use touchdown it's probably single threaded. You don't really have to worry about memory races. You're not really maintaining orship. It's actually just one somewhere space. You don't need a lot of the guarantee that is Rusts provides U. and we'll talk about that later it's a very exotic programming model. At the other end of the spectrum, you have micro processors. The raspberry pie. In an embedded computer. And it can do high-level tasks. Say it is ruppation python science library or a GPU. The micro processor, has its open GPIOpeps, which is to say, it can talk to a circuit. The biggest difference is on the micro controller side. Reliability is keep the predict ability is key. You're doing things as fast as a processor can do things O. the micro processor, when running Linux, you have a scheduler. Things are competing for miles an hour, compete for example time. You can't do real-time things most often on a micro processor, when you're doing something built on a standard raspberry pie distribution.



For the past few years, I've been working on a prejudice called teasesel, another micro controller board. I've been excited about T. because it's fully open source hardware and for our particular example, it tile has a hi crow processor and a micro controller. We can get the best of both world I've been working on it since 1013, originally, it was a company and now issue it's an open source group with a small steering committee, and accepts open source contributions.



Originally, we targeted OJS. All of our libraries are written in OJS. Our command lines, et cetera. And more recently, because Rusts reached maturity, with 1.0. We've been excited to say, let's develop an environment caring oh, Rusts C, et cetera and bring them into a platform that's really easy so we found a lot of low-level C code. Imported it on to Java script and are now porting it to Rusts.A each time, learning a lot of other cell system like, wow, we were really young programmers back then. Another interesting thing about this, it's in the wild use of target, developing for teases cell actually, stretch happening the bound easier quaff my knowledge is about Rusts and how it cross compiles so it's been exciting to say, well, take all the features and all the extensibility of Rusts. Marry it to the development we have built out and see if we can't get the best of both worlds.



The basic hello world example is a blinging example. This is a combination of command line tools to make it real easy to get started on it. And the cardioecosystem. We can create a directory. We can say, the target language has been rust and this will create a sample repository. We can teach you rup and specify the name of the file and your tesla lights are blinking. The entire point is that we leverage the entire ecosystem. From here on out can you do same dependencies that you're using, add your own source code. You can build it into your existing system. That is out of the way.



Let's go back to basics Q. you're talking about signal says and sevos we're talking about circuits. How many of you have circuit experience? About 50% of the room. Maybe a little lower. We're talking mostly about digital logic. Means there are high and low values and they're being interpreted in some way. If I have a circuit and say, the voltage is 3.3. That is what I declare as a high voltage. Any it is high, I want to turn the light O. similarly, say, when the circuit is 0 volts, I want to turn the light off. You can get close to 3.3, get close to zero volts. Everywhere just sort of agrees when, you're close enough to these, these will be represented as those values. But this match is really cleanly to binary values. So a high voltage might be one and a low might be zero. One thing about this, is that you can actually look at this as a power source, not just as a small. I can switch it from high to low and send out a square wave, which would switch on for equal parts. And now, this is happening over time. So if I stretch out any of those signals, the light will be on for longer. Light will be on for a shorter amount time. If I blink it fast enough there are a lot of fun things can you do with that.



To what we might want to say San imperative way of generating that same signal. So we have a few lines of set up in the beginning to say, we want to get a port. We want tow know it's there so we unrap wrap it and select, IN0 and it'll loop. We want to turn the pin high. Sleep for a second. We want to turn pin low want sleep for okay second. This will generate same signal we just saw of the notoriety now, this is spiral synchronous, it's putting the thread to sleep while we're doing this.

Because we're on a bed of platform, it's okay we're doing this.



So kissed could be inputs as well as an output. An inpit pins, is this value high or low. So if I have a wire, which is connected to a high voltage and then a switch in the middle, that switch is going to break theet. So when I press down on the button, I'm literally, saying here's the material, I'll know conditioning the circuit. And in the same way, we can say, we want to turb on an LED with the switch. Can you do this with a circuit. If you were going to say, all right. There's pin 0 and pin one and we're going to select them and call them LED and switch. And then in our same loop, every time we read the switch, we say, is it switch on, turn the LED. If -- what if when the switch goes down, I make a post request to tweet that I'm home. Thats, hey, everyone, I'm home, I'm lonely, give me friends. That is the magic of hardware. We can do complexing like sensors. A sensor is basically a small IK or a chip which is able to talk some sort communication protocol. And this uses the same basics as what we were using before. Input and output values. The sensor itself, although it has a lot of pins, including power and round to GIOpence. We care about the data and clock signal. These two in combination, allows for talking to the micro controller and malicious something in -in-the- out world.



Those two things, data and clock pin, can be wire to the protocol, I2C, which is a protocol dating back 30 years. And this is an agreement between the two processors about how the signal oncer New Mexico same way that your web browser Uyour smart watch, pacemaker, all of these understand http. Eveno though it's just plain text, it's sort of similar to this.

There's two signals and the way they modulate each other. That is what determines what the signal S. everything time it goes up, you might measure a data on the value line.



The basic agreement here is when the data lines go low, the processer will emit clock fixing. The I.C., will write back and say good. And then we'll write over a bit another over to T. the key point to notice about this is that it's happening at 100 kill Hertz. So if you member human can measure hurts. A hundred kill -- your PC is probably running --



When you were trying to to these perfect communication protocols you're not going to be sitting there, flippation switch on and off in order to say what the sensor should read. It's going to be handled by something at a lower level. They exist with your USB controllers, the way the lap talk talks to your screen. We're going to tell the what to do. Do some black magic and then give us a result, whether it's the input that we wantd to read over the output. So what do we do when we have a low level protocol that we want to wrap in a high-level system? We write an A.P.I. for T. here's the came example. This is using all the lower level primitives we want. We fist do a transfer to the address, 0X1D. Can you please send me back the registered value. Woe say, this is our handshake value. We know we're talking to an accelerator rate.



What it boils down to is we now have a two fold of 3D success aleration factors, depending on which way we we angle T we will get different values here and that was gist four teamlip of codes in arbitrary I.C. and started talking to it you might look at that and say, pretty ugly. Let's make it nicer, creatan accelerometer. Expect that it is actually connecteds to and read the acceleration. And you can go do Ohio right now.



One key thing about Rusts here is that we actually have a very strong advantage of using Rusts over any other system language that I've used. Especially if we're using Java script in this case, let's million I was trying to write at the same time, at the same time. I have an LED and I want to suspected it high or low but I have the ports upon. It happeneds to send its signals Q. we have apITC port, we can write some data if we want to accidentally send a high value because we want to turn LED on. But we do it on the wrong pen, we can say, Rust Bridge will prevent this from doing

.



Basically, in designing this, we realize that Rusts provides high level objection extraction for things, and allows us to do it in a way that's really approachable. Really, you would want to encourage anyone to be able to talk to an arbitrary crimp. To do the logic. And this, the quote I read from Rusts camp last year, do programming in place you were afraid to do it before.



Another way of phrasing is have without fear. This is also the quote they used last year to sort summarize the Rusts methodology. So I actually started hacking away at things. Power words, in order to fake a few demos. On the left, you see the two leads pointing out. You definitely shouldn't plug this in and touch the bolt at the same time or either of them. But they do plug into a circle really well. On the left Othe right here is a warning that I actually stripped off of the power strip saying, specifically, don't do this. So given that there are no more warns. We can go ahead and produce a demo. So over the past pretty much, the past two weeks, we went shopping. Bought a bunch of sensors and came up with five different crate that is exemplified different sensors, blue tooth energy. Climate sensor. And so for the first example, I want to go back to the accelerometer demo. I want to check the temporary of our home. If it's too hot, I'm going want to to up the temperature sensor. For the, one, I want to say, pick a relay, a very high-powered switch and write to it saying hi High to turn on the switch or low to turn off the switch.



I'm using a web server, host on the teasesel and I'm going to hit start cooling button. So can you seat temporary dropping inside the Tessle itself. But you believe me any way. We're actually reading life temperature data can you imagine if I was a mile away, in Berlin, we tried to measure this at my house. I want to be able to go home, turn on the air conditioner, 30 minutes before I arrive. So a very simple example, using a micro controller and a few sensors. Next one I want to show you, an actual use of the Servo. A hobby motor that can turn from 0 to 180 diagnose. And best part about a Servo, is it can turn to a fixed point. Unleak a motor where you're saying, go forward, go backwards at a certain speed. Servo can have certain positions on them. And this one is actually very similar to the demo that we saw earlier today. Where it's turn on light automatically when you walk into a room. This can also scale to, I want to unlock my door when I approach my door. But we're going to start with the Servo crate and a blue tooth low-energy model and do a low quality version of this. So easy approach the front door, a sensor inside is reading blue tooth ID's and servo is noon turn the light O. when it detects the blue tooth ID of my phone, as I look proudly over my domain that.

Took 20 lines of code.

[Applause].



Entirely Rusts code, that is doing things, with sensors, in Servas, that is very like, applicable to our daily lives, like, we are developing companies around these I.O.T. Connecticut septs. Buying new products around. So in true Rusts fashion we have been to ask ourselves is, are we I.O.T. yet? I don't want to give a definitive answer yes. I'm just one developer in a full of you. I want you to borrow.

Problems is security, reliability and power. A few years ago, we had the shellshocked bug, was bug that allowed to you do a buffer overrun in a router so essentially F sent a malformed http to a router, it would run past the buffer it allocate forward that. And you could get repot code execution on T. remote code execution isn't a big deal itself. But the idea you have a router in your home, in millions of homes and you can't update those, that's how many. You really have to get security right the first time by make sure you have all these guarantees. It happens at the O.S. level and S.E. left Lynn crux. But Rust Bridge is the final defense for what puts into your program and what you're going to be able to do.



Second one is reliability. And I don't mean this in the way that my blue tooth is suddenly not working. Or my app crashed. Rep liability means we are going to continue to put these on our diss, to protect our children, to protect us while we're driving cars. Technology ising so many cop com.s of our lives. IOT gets a Pat blah. Even though every system has its own trail tee, when you do these embedded system, thank you really see that a lot are M. so when we're talking about explicit error handling or the ability to not have your program crash at random. Like, the extreme wop day, this might be it'll save you time money if you're not dedugging these things. So Rusts does a real investment.



The last one is power. We talk about zero cost allocation and these are hugely important when you're doing bench marks biit's very important when all you have is like a few kill bites of memory to spare, and I think what julia ef ABC said off our Rust Bridge conf, if there's going to be a new generation of I.O.T. developes, they're going to rup into these problems. D.



Most month, an embedded sen aryear, it's a cost between answer trust transaction and doing safely and hope it works I'm going to leave I off with some goals. Cross compilation has been like air, goal standard for rust right now. We also have my A which sets the baseline for working out all these different operating systems. Upon why ph why you're watchation a bear is nice to have. But there are more platforms than that. As it becomes more popular. We should really think about what is it going to be, this constant scheme uphill. Is it something we maintain.



The second question is can we have a goal of combining real time and non-rel time systems. Basically what, this boils down to for embedded. Is, can I provide synchronous and A sinks in system. Zero allocation -- sorry. Zero allocation on computers, possible, which is an amazing boom for anybody anyone writing high performance code F. you look at a low embedded system. You may not have the option to use threads. So as we moving forward. Being able to target low, embedded platforms. It's still something.



Another goal is to see Rusts at its lower level. There are a lot of embedded presence, including Skink and Talk and there are hardware problems in Rust Bridge. Specifically typed to do what I was demonstrated today to, talk to circuits. There's more. In the server, the sensorily bear they wrote today, currently only work on one platform K. we design a foundation that brings all these things together. If we're able to do that. I think Rusts, where previously, we would pick C++ for robotics. C for embedded systems, and maybe Java strict for system like servers and browsers. We make rush wop of the prelanguages of the Internet of I thinks. I hope you share with the credit. Thank you very much for let ming talk today. Can you see any of the code demos at Ruststest 2016 and see what I'm working on at Tessleel Rusts. Go enjoy your lunch.
