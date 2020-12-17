**Build your own (Rust-y) robot!**

**Bard:**
Aïssata Maiga lets me know  
how to make bots without Arduino  
writing Rust to move  
her bot to my groove  
Sure there will be some cool stuff to see, no?


**Aïssata:**  
Hello, I'm Aïssata Maiga, just your regular computer science student and I live in Sweden.
I discovered Rust this summer and fell in love with it.

So, let's just start.
This presentation will be about making a robot in Rust and working with no std.
It is a fun project for you to try for yourself and children.
It's also very easy.

The most intimidating part is to get started and order stuff from the internet.
I will show you the robot, and then explain everything you need to know about every part of the code, and share a lot of mistakes I've made, and then there will be a little surprise.
I used the avr-hal, and I got a lot of help.

It has great documentation, a lot of templates, how to start your own project, and of course how to use your cargo file and basic templates, but it also has many examples for every avenue of work.
For example, I'm using uno, and, if you go to "examples", you can see how to blink an LED, which is the "hello, world" of Arduino systems.
It really works great, and I would recommend it heartfully.

The components first.
With time, you will notice that all components are standard and pretty much the same, but the easiest way to get started is just to buy a kit.
Many are available online, Amazon.
If you google "smart car", you will see a bunch of suppliers that you can choose.
The cheapest start at ten or 15 euros.
If you want to assemble, it's the same.

If you just google "assembly instructions smart car Arduino", you will have a lot of good videos, and I link them in my repository.
A word of caution, and a good opportunity to share my big error number one.
In most assembly videos and on the rep on.

There are schematics that follow.
You must be careful to follow them and you must plug them as they look on the image, but the most important is to make sure that the circuit is grounded, that means that all ground cables are connected, that the circuit has a common ground.
If not, bad things will happen, and bad things also called "undefined behaviour", so if you're here and nothing is working and you're getting frustrated, just check if everything has a common ground.

Arduino is ideal to begin to kind of project.
They're relatively affordable, and there are tons of robot-making with Arduino.
What is great with the brand is the ecosystem.

All the libraries and the IDE, but we can't use that in Rust and that is where avr-hal has you covered.
We're using an eight-bit microcontroller.
One of the Uno and the Nano is to make it - it has a general-purpose input and output pins - those little holes, and all the protocols.
What do I mean by that? Is you're not programming all the board, but you are programming the microcontroller.

This one.
You can see here on this board.
There is Arduino and Arduino, as we can say, when you order your kit, it will come with a board.
It is a clone, and it works as well as a regular to show for this kind of project.

I will now tell you about the Servo motors, but also the timers which are very important in this kind of project.
I will of course show you what I mean with an animation at the end of the slide.
So the Servo motor is a simple rotating motor, but we do not need it to go all the way to the end of the rotation, so we can think about it as a light dimmer, we use something called pulse modulation.
If you have a romantic night with your partner, you need to control the light, right? This is what we are going to do.

We're going to control the duty cycle.
They're nothing mystical.
It's the fraction of time where the signal is active.

In other words, we're going to tell the microcontroller how long do we want the signal to be active? Now, all microcontrollers have an internal clock and it is 16 megahertz.
It defines a period of time of one divided by frequency.
So, one divided by 16 million is really fast, 16 nanoseconds.
We can't work with that.

Even if you multiply two of the power of eight which is the size of the timer register, it will overflow in a few milliseconds.
And now is a good time to share a big error number two, on the micro control, the timers do not all have the same size, you must make sure that you are doing the calculation with the right timer, or the right size.
If nothing working and your calculations are wrong, it might be the cause.
We are going to reduce the frequency by dividing it by 1,024, and we can then work with a cycle of 16 milliseconds.

Why do we do that? Most Servo motors have a frequency of 60 Hertz in short duty cycles.
For example, to centre it, you need to set it high for 1.5 milliseconds, so 1.5 divided by 16, times the size of the register is 24 ticks, so, let's go and look at some code.
So this is for the Servo motor.

First, the magic numbers that we calculated together.
To centre it, we define the time times the register.
Then we declare immutable timer, immutable pin.

You notice that it is prescaled with a factor of 1,024, and the pin is d3 and then we enable it.
So how do we know how to do that? We can go into the documentation.
You can see here that I just follow the documentation.

Please note that it is very important to choose them right, the pins, because they're hard wired, actually, so this is my big error number three: so timer two that I'm using it hard wired to win d3.

If you're going to use a timer for the Servo, you have to make sure you're using the right pin.
If we go back to the code, here, you see that I just have a mutable delay to make the rotation not too fast, and then we just set the duty to 24 - sorry, to 16, we wait a bit, and we centre it again, and then we wait a bit, 400 milliseconds, and then we put it to the left, and I'm going to show how it looks like.
Now the sensor.

So you can think of the sensor as a bat.
A bat sends sound waves every now and then and waits for them to return to calculate how far is it from an obstacle.
This is exactly how it works.

We need to send sound waves about every 100 milliseconds.
The sensor has a trigger and an echo.
The trigger turns it on, and senses the sound wave.

When the obstacle is met, the sound wave will bounce on it and return as the echo, and we will measure the length of it.
There are many details, but I will just cover the ones I will show in the code.

We would use a timer, and another timer, timer 1.
This one does not need as much prescaling as timer 2 that we use for the Servo, so we will just make it 64 times slower.

So, another magic number that I would like to explain is 58 that you will see in the code.
When the sound is travelling 340 metres in one second, it will bounce on an obstacle and come back, so we need to calculate 34,000 divided by 2 in milliseconds.
So, it's going to be 0.017 which is the same as one divided by 58.

Also, every tick is four milliseconds, so you will see a multiplication by four that is suspicious.
You do not need to pay attention to all those details.
I just explained the magic numbers because I know some of you are interested in them.
This is the code for the sensor.

So we are using timer 1 which is 16 bit, and we are prescaling it with a factor of 64 here.
We declare mutable trigger that I connected to pin d12 and configured into output.
All pins are input by default, and that's why you need to configure it to an output, and then you need to declare an echo.
I collected it to pin d11.

You don't need to configure it into input, because they're all input by default, and then you don't need to have it mutable, because we are just going to monitor how long it is high.
Those in the comments are commands to get your console working.

So you can get the address of your Arduino, and then, if you type "screen", then the tty, and you can see how everything is showing on the screen.
To see things on the screen, you will need the serial, so, we've a receiver, a sender, and a baud rate, so this is.
This is nothing to worry about.
This is described in the documentation.
If you just copy-paste the declaration of a serial, it's going to work.

And then, in an infinite loop, we are going to write zero to the timer, set the trigger high for ten microseconds and set the trigger low again.
This is going to send the sound wave.

Then we have to manage an eventual error with the hardware, so, if we have waited for more than 50,000 ticks, it means that we have waited for more than 200 milliseconds, so this is probably an error, so we need to use, to exit the loop, since Rust is allowing us to name loops, we continue to work, we continue with the outer loop.
If not, if we have detected something, we just write zero to the timer register, and then we monitor how long the echo is high.
It means that we don't do anything while the echo is high.

And then we get the number of ticks in the timer register divided by the magic number 58, and mull apply it by four, because the unit is four milliseconds.
And then we wait 100 milliseconds between the sound waves, so 100 milliseconds is corresponding to 25,000 ticks.
And, at last, we print on the screen how far we are from the target.

Now, I want to show the motor driver.
The first time you will see a motor move, because, you decided it, you will be hooked.

Arduino does not have enough power to move the motors, so we connect it to the driver.
And connect the logical pins to the Arduino.
Which means that you will be plugging the cable for the wheels in those two.
Those are to communicate with the battery, and this is a five-volt logical pin that I'm going to use in the demo.
There is also an enable pin to control the speed, but this will be for Rust-y 2.0.

So now it's time for the walk-through, and talking a bit about no-std.
Why do we have to work with no-std, which is Rust non-standard code? On the, there is no OS, which means we need to do it ourselves, and to indicate to the compiler that we are going to work with a no-std and no name.
We also need to build with cargo the nightly build to indicate that we are going to use Nightly.

To get the cargo from the configuration, you can again go to the documentation here, and everything is explained in 0.5.
This is what you need for your cargo file, so we can go back to the code.
So, we are going to, because we are in no-std, we are going to need to import a panic handler, and `panic_halt` here, and those two are the crates I'm importing to make it work.

Those three crates are modules that I used to separate my code when I was refactoring, because I felt that it would be more clear, and also because I was training with Rust's data structures.
To make it work, you will need some constants.

How long do you want our bot to wait between actions, the mini distance you want to have between itself and an obstacle, and what is an acceptable distance to make an alternative choice?
So this macro is an attribute macro, since we are working no-std, we have to assume that is the point of entry of the code, and the exclamation mark here is never type, which means nothing should return from this function.

So we start by downloading everything.
We download everything we have on the MCU.
And then we collapse all the pins into a single variable that we are going to use here.
This is the general timer that has been prescaled by a factor of 64 that we are going to use mostly with the sensor, but also as a general time-checker for the whole project, and then the timer2, and it is pin d3 that we are going to use for the cell.

I created the Servo unit which was to work with Rust structures.
You do not need to do that.
It's going to work fine.

But then I connected those logical pins to d7, d5, d6, and d4, and that I have them long variable names to refer to each wheel.
Then those pins can be downgraded.
Downgraded means they can be put in a mutable array that we can send to other modules to modify them.
But, wheels is still the owner of those wheels.

And then the infinite loop that is going to control the robot, it is still called outur: loop.
It starts with the Servo unit that is rotated to the front, and then the wheels are going to move forward.
We are reading the value with the sensor continuously, but if the value is smaller than the minimal distance that we decided, then we are going to stop the wheels, and I'm going to show a bit later how to stop the wheels, and then check the distance on the right.
We are going to turn the Servo to the right, get the value here, wait between to interaction and then do the same for the left, and the rest is just - if the value is bigger on the left than the right, and it's an acceptable distance, like there is not another obstacle here, then we're going to turn the wheels left and then continue to the outer, that is, go forward.
Else, if the value on the right is better than, then we are going to turn right, and then continue to the outer loop.
Else, we're just going to go backwards.
And turn right.

Going back to show the model, I think this is the only thing that I didn't show.
For we can decide the constant for how long do we want our car to turn? And moving forward, it just receiving a mutable reference to wheels.
This type seems really, really long, but you know how you do with Rust, when you don't know a type, you just declare another type, the compiler will complain and give you the right type, and you can just copy-paste it.

I did some unpacking here.
I put the wheels into a new array to make sure that I wrote it correctly, and then you just need, when you go forward, you just need to set forward the motion, the left and right forward motion high, and the right and back motion low.
To turn right, you need to stop the wheels, that is exactly the - to stop the wheels, you just need to set all the pins low, right? I just removed it from the presentation for clarity.
And to turn right, you have to set the left forward wheel high, and the right forward wheel low for an amount of time, so, if you move the left wheel, the robot is going to turn to the right.
You need to know where to find help.

Actually, if there is one thing you must get from this talk, it is where to find help.
The Rust community's very welcoming, and one of their core values is to provide a safe, friendly, and welcoming environment.
This is a community in which I felt safe and comfortable from day one.

You can ask any question on the community forum.
Overall, people have been providing me with technical consultancy as well as psychological support since the start of my adventures in Rust.
When I arrived to matrix, people realised I didn't do anything and sent me to do homework but helped me anyway.
I want to thank my mentor and avh-hal.

That's it.
Thank you very much for your attention.
All the project is on GitHub, so please don't hesitate to do whatever you want with it, and show me what you did.
You can ask me any question you like.

That's it, and thank you again, and it's time for the surprise.

**Lyrics:**  
> they see me rollin'.  
> see me riding Rust-y.  
> wanna see me riding Rust-y!  
> thinking cool to ride Rust-y. See you riding Rust-y.  
> wanna see me riding Rust-y  
> showing, moving, grooving, want to see me riding Rust-y.  
> wanna see me riding Rust-y  
> now that I'm riding Rust-y  
> want to see me - want to see me riding Rust-y.


**Pilar**:  
That was incredible! It's so good that you all could not see me during the talk, because it was just me grinning from ear to ear and clapping my hands off! I said I was excited about this talk, but, wow!

Thank you so much, Aïssata. That was an incredible talk, and, yes, like, you mentioned the community at the end, and your love for it, and your being such an integral part of it, at least to me, shows so much, because it's that spirit - like you just held our hand through all of that.
If somebody wanted to try that out, it's like I messed up here, there and, you know? Thank you so much.

That was really, really great.
And as a special treat, I mean, besides the amazing ending, Aïssata is here to join us for a live Q&A, so I'm going to add her on now, and we had a lot of questions in the chat, so we will try to get through as many of those as we can.

So, hi, you're live with us now.

**Aïssata:**  
Thank you very much. Fantastic.

**Pilar:**  
You had to watch your own talk. I don't know how you could do that.
Personally, I can't! Don't ask me to! What an amazing talk, really. I was so excited.
Absolutely called dibs on introducing, and being here for this talk.

**Aïssata:**  
I say something about the sound, and I jump from 340 to 334,000, and because, it was really weird.
It's because I was talking in metres, and then centimetres, and then I forgot to do that, to explain it? And then, oh, I don't even know what to say, and I saw that in my comments, I write something about the God bat.
That was embarrassing. Like, you know ... how to be a God bat. I meant the sensor is working like a bat, and well, let's just forget that.

**Pilar:**  
I mean, if it is fair at all, I think it was very clear. I know we are multi-cultured, and everything, and everyone might not be on the same technological or English-speaking level,
but I thought you two things you mentioned were fairly clear, but thank you for clearing that up too.

**Aïssata:**  
Speaking about the community, because, instead of thinking about the bad things, the good things, that is true, when I joined the Rust community,
it was the only time that I used my own name and my own picture on the internet, and I never do that, because, you know, you're always afraid of mean comments, and abuse, but, yes, like from day 1, it never happened.
It never happened, and that I've felt so welcomed anywhere. I think I made pull requests after a week.

**Pilar:**  
That's amazing. I know people who have been in the industry for years and years and they're too scared to make PRs to put their stuff out there, so that is really cool. It's so great that you actually went for it, and that you felt safe and comfortable to do so. I hope, you know, that's why I love your mentoring work as well, you mentioning that and sharing so much with us because you're encouraging other people to feel safe, go for it, also try it, and that is amazing.
Thank you so much.
Do you mind if I go into a couple of questions that were on the chat?

**Aïssata:**  
No, please, yes. My child is here!

**Pilar:**  
Don't worry about it. We are all at home and in it together.
I think a couple of fun ones for you first.
So, you know, there was kind the line of thinking why robots?
Is it hard to start off with something that is embedded, and what your next planned robot is?
I think people are very fascinated by the topic of embedded, and robots, so, please, like I saw how excited you are for it.

**Aïssata:**  
Yes, okay, so what I really wanted to von way with this talk was that it is not that hard.
You have to have help, and, if you have the right help, it's not that difficult, and the most difficult is really do you I start with it? This is what I wanted to show in my talk: how do I get started?
I'm pretty sure you have your own ideas and objectives, you have your own crazy stuff that you want to implement, talking robots, so I don't know.
So I just wanted to be sure.
The confidence that I'm using, how do they work, so we can put them to this. I don't know, maybe you want to have a fridge that comments if you open it at night.
This is something you can do with this stuff. But, when ...

**Pilar:**  
I like how you mention where to get things and how to spot fakes. Watching your talk, I want to do something too. I want to buy components.

**Aïssata:**  
It's easy, and it's really cool and fun and easy. Please go for it. You have to show me. I want to see.

**Pilar:**  
Thank you for that. Any future plans for more robots.

**Aïssata:**  
I've brought my robot skull. As you can see, it's not done, it can't be closed.
But this is also, you know, you can do that with whatever small board you want, and then a small sensor, and then it reacts to the sound, but also to shock.
If you turn the battery on first, because then the demo, the demo is not going to work. And you can put some LED into it, and program that thing with for loops.

**Pilar:**  
That is so cool. Thank you for bringing it! Wow! That's amazing! I hope people are tuning into the Q&A to get to see this! That's so cool! Wow. Thank you.

**Aïssata:**  
Thank you, too. I'm all sweaty, and happy!

**Pilar:**  
That's just part of being in the community, and part of getting to partake in this. So, I think I wanted to jump on to more technical questions, but I think we actually have to go to the next talk, but you showed us the next project, which is super cool. Thanks so much for joining us. Thank you for everything.

**Aïssata:**  
Thank you, everyone!

**Pilar:**  
It's been amazing. Thank you for being here. We will see you in the chat, right?

**Aïssata:**  
Yes, I will stay here. We will be in the chat.

**Pilar:**  
We will see you in the chat.
