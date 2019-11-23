Amp Up Web Audio Applications with Rust and WebAssembly

Live captioning by White Coat Captioning

NIKLAS:  Hello?  Good morning.  Thanks for having me here.  I'm Niklas, working for the local research and development centre of Catalonia, Eurecat, and my job is making audio software, nowadays still in C++, and I'm fairly new to Rust but very well related to Claudia Saxer's talk yesterday.  My journey was pretty similar in the first few months.  Today I'm going to talk about the web audio and how Rust can be used for this but also a little bit why Rust might be a good option for audio software in general.
So why would you want to put complex web audio, or complex audio applications on the web in the first place?  I'm part of a community that does music with code.  I don't know - who does not know live coding here?  Everybody knows it, I'm surprised.  Small programming languages, with domain-specific languages, and one of the problems that this community has is that workshops often end up being installation workshops and after two or three hours people manage to their things which is kind of sad because the stuff is fairly easy to use and it's a lot of fun to use and might be educational, a lot of people might get interested in the programming but if you need two days just to install, I don't know, whatever weird environment people develop the languages on, it might discourage.  So if you can put it on the web you just need to load a website, you don't need a lot of computer literacy and it may just lower the boundary for people to use your stuff and might make it more fun for more people.
I went on a journey to try to put my own stuff to the web and I'm still fairly early in that process, but I was looking for the perfect web audio stack, so what are the requirements for audio software in general?  You need a deterministic way of working for the audio thread itself.  That means you don't - you shouldn't allocate memory in the audio thread.  You shouldn't lock, you shouldn't wait on conditional variables and all those kind of things, and it is inherently multi-threaded because you always have the audio, the realtime thread and some control thread at least to either set parameters or schedule stuff, sequencing stuff, and so on, and so on.  Out of personal preference what would be nice to have not only for the within but for audio in general, memory safety is a thing because you suddenly get random memory contents pumped directly into your ear, what at work we affectionately call noise from hell, then memory safety becomes very important suddenly, just to be able to keep on working and not being deaf.
Portability is a thing because for me, if at some point I would not be happy with the web performance anymore and want to have a native programme, it would be nice if it would be easy to port.  Small footprint.  I don't like bloaty software, and the easier it is to use, the better.
So options here, eked go with pure JavaScript but it's not that portable, I'm not an expert in JavaScript, but I think compiling it to a native executable is something different.  It's a dynamic scripting language.  That means it has probably something like garbage collection which in some languages can easily stop the audio for a second, you get glitches, and it gets easily bloaty.  I don't want to chime into JavaScript bashing here, I like JavaScript, but I don't think it's the best for this kind of purpose.  You could just compile C++ with emscripten but that's neither very convenient or very comfortable, I don't know.
So I came across Rust and WebAssembly and that seemed to be a fairly good option.  Why?  Well, so first of all I looked around and tried to find something that has already been done and I came across this little synthesiser that's not made by me but by some person from Japan and that was the proof of concept that showed me: okay, it's actually working.  It's like a little TV303 simulation, kind of funny.  [Music]
Even though it's still lacking sample playback and precise timing and all things that need to be done, but apart from that everything that's written about it is in Japanese, which is a beautiful language of which I have very little command unfortunately, so I need to put some effort into that.  So yes, why use Rust for audio applications in the first place?  And for web audio applications in particular?  So the memory aspect, memory safety aspect I already lost a few words about that, why you would want to have that in audio software.  Rust boasts itself of fearless concurrency so for multi-threading applications it might actually be pretty good.  It's a deterministic systems programming language.  Gives you stable results.  You don't have any garbage collection to deal with and don't have to expect glitches.  You can port it to the web or if you are not happy with the web audio software anymore you could easily compile it to a native executable.  The WebAssembly integration is very seamless, compared to C++ or other languages where you have to struggle with emscripten or whatever.  For Rust you just set a different target and there you go.  And last but not least the performance.  I only did some very casual profiling in the developer console but looking at the numbers the main audio processing method needed roughly 15, 20% less than the native JavaScript applications to test sample playback and to work around, in general get used to working in Rust and WebAssembly.  This usually needs headphones so it doesn't do a lot on a single speaker but it's a very simple sample player and for profiling the stuff I did the same thing in pure JavaScript and it seems to be more reliable with Rust and WebAssembly.
So what are the ingredients of an application made with Rust?  First of all you need a module compiled to a WebAssembly module.  Bindgen doesn't really work that well in that context, so it's a raw library that you compile to WebAssembly.  You need the Audio Worklet that is part of the Web API that allows you to do custom processes that can use a WebAssembly model.  You need some setup and control script, obviously the main thread, the user interaction.  If you want to do any scheduling, any time-based stuff, you need some additional WebWorker thread for sequencing and these kind of things and ideally some pure Rust DSP crates that easily comply to WebAssembly as opposed to bindings, like if you want to do some advanced transform libraries like FFTW or whatever, it's probably harder, but with the pure Rust crate that works pretty well.
What are the challenges of making a web audio application with Rust?  The Audio Worklet and WebWorker stuff is a little bit tricky because you cannot load the models directly.  You have to fetch them in the main thread and then post them using the message system, but once you've got through that, once you've got the setup done, it's fairly easy.  Setting up the shared memory between the WebAssembly and the main JavaScript is a little bit tricky, and as I already said, it was the bindgen for the worklet part itself, exactly because of the limitations of the Audio Worklet that you cannot load the module directly in the work that you have to post it there in binary data.
What's already there?  Crates that support or that help you creating audio software with Rust?  There's chfft, a pure Rust library if you want to do convolutions.  I use that followed by normalisation of this part, like for the simulation of the 3D impression, and this if you want to check this out with headphones and play around with it a bit, the current version is still time-based convolution but the new version that I might upload soon is based on actual fast convolutions.
There's an alternative called Rust FFT but I haven't had a lot of luck with that.  Basic.dsp crate which I wasn't very happy with, it's a very vector-based way of thinking and it's a little bit too detailed maybe but anyway it exists so you might want to check it out if you are into dsp and want to do some audio software with Rust.
What's New York working all that well yet?  I haven't managed to do any threading directly from Rust, so in the sense that I want to spawn a thread to do scheduling tasks, so scheduling music events, so you still have to rely on the WebWorkers I think, unless somebody knows something more, and I'm willing to learn because as I said I'm still fairly new to that in the first place.  Debugging is a bit tricky, as we already learned in the talk yesterday.  You should test your dsp code well to make sure it runs because to debug it directly in the WebAssembly part is fairly annoying.  And unfortunately Audio Worklet is not yet available in Firefox.  So far it only works in Chrome and Opera, which is a bit sad and I hope it will be implemented in a proper way in the future in Firefox as well, but we are not there yet.  So what is to be done?
One of my future tasks in general is to do some general benchmarking because I want to know how the Rust software on the web in particular but also in general compares to my C++ stuff which I haven't done yet, especially regarding fast Fourier transforms which is a central thing in my daily work.  To do past convolutions crate, to be able to do re-works on the web and other things, and in general I had hoped maybe somebody would be inspired to do audio software and we can sharpen Rust's profile as an audio language in general, so I can avoid in the future having random memory contents pumped into my ear directly.  As I already mentioned, that's not a very pleasant experience.  So yes, some resources, there's a Rust audio forum, this discourse group.  The Rust audio environment is actually bigger than you might think.  There is a VST crate that you can use to do plugins for audio work stations, which I haven't used so far but I know it exists, so if you want to look for any resources, that's where you would go.  This is for some examples, if you want to learn from that, especially with the WebAssembly part.  There is this original seminal example that I already presented.  It's all in Japanese, if you speak Japanese, there's stuff written about that.  If not, I did the sample player.  It's well commented so it might be a nice starting point for your own applications if you want to check that.  And last but not least, a more complex example that I made and as you say in my native language  [German language] I might give you a little demo of that, what life coding means and what you can do with Rust audio so put the microphone away and I will give you a little impression of that.  [Music]
[Applause] 
Thank you for listening.  I don't know if there's time for questions, or anything else?  All of this is running in a web browser.  It doesn't need any server backend, it just needs a web page and there you go.
>>  Hi, an amazing talk and demonstration, thank you very much.  Last time I checked for web audio in Firefox I think there was a limitation of 256 milliseconds on latency.  I don't know how it is now but, depending on which kind of application, latency is important.  Also what is the difference between Audio Worklet and web audio?
NIKLAS:  I would assume it's getting less and less.  250 milliseconds sounds quite a lot.  I must admit I'm not - my own work is mostly based just on output, not on input.  I don't do live processing where this would be very important, but I've seen applications that do guitar effects on a web page and they are fast enough so that you can play it with the recent advances.  I don't know if I could find it but there are guitar effects that run on the browser that are at least fast enough to test them and not completely bring you out of the rhythm when you bring guitar, so I assume that would be better now.
>>  Hi, a great talk by the way.
NIKLAS:  Thank you.
>>  In the Ruffbox play-through there was a sort of scripting language that you typed and it made the music.
NIKLAS:  Yes.
>>  What is it?
NIKLAS:  That is just a very, very simple pattern, basically a sequencer that I made to test it.  It doesn't have big functionality.  That's my next project basically, to make an actual more complex language for the synthesiser to use it more productively, or to port, I don't know, my existing stuff to these kind of things, and maybe other stuff.  There's a lot of nice live coding languages, so that's a future project.
>>  Good luck.
NIKLAS:  Thank you.
>>  Final question.  Raise your hand.
>>  I'm curious if it would be technically possible to do this kind of audio processing with the main web audio without Audio Worklet and if you can explain why this needs Audio Worklet maybe it would help motivate implementation.
NIKLAS:  There's always multiple ways to do things, but yes, one of the reasons for me is that, for example, if the performance isn't enough, I can use it natively as well and in different contexts, which might not be that great with pure JavaScript.  Of course, everything of that could be done in pure JavaScript or with different text apps but I think the Web API itself and the nodes it currently provides, it's not that flexible.  For example, all the timing stuff you saw here is done in the Rust part.  The precise time, the scheduler, the pattern language only gives out very coarse events and they are requeued and re-ordered in the Rust part, and so on, and so on, so I think the complexity might just be easier to handle if you have a systems programming language there instead of the basic web audio API facilities, but of course that's all personal preference, so there are of course different ways to do it, and whatever suits your needs, you can use it.
>>  Thank you, Niklas.  Give him a round of applause.  [Applause]