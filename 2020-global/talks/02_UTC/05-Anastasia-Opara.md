**Rust for Artists, Art for Rustaceans**

**Bard:**
Anastasia plays Rust like a flute  
or maybe a magical lute  
to then simulate  
things that art may create  
and this art does really compute

**Anastasia**:
Hi, and welcome to Rust for artists, art for Rustaceans.

This talk covers from multiple personality disorder like talk about similarities between art, programming, and science, and at the same time showing you complicated drawing algorithms and also has practical tips.
If you're only interested in the Rust and algorithm parts, go get yourself a coffee and come back in about ten minutes, since we are going to go through the meta part first.
Without further ado, let's start with introductions.

My name is Anastasia Opara, and I'm a procedural artist at Embark Studios, a Stockholm-based game development company.
You might be wondering what is a procedural artist? Procedural arts' distinguishing feature is that it is executed by a computer following a set of design procedures designed in code - that's why it is procedural.
As a procedural artist at Embark, I spend most of my time meditating on workflow in games from player and developer perspectives.
There is head scratching and more head banging on the wall, which is fun, exhausting, and sometimes outright terrifying, but never boring.

To give you an example, I would like to show you two of the recent projects we did at Embark.
It will be tl;dr versions, and we have separate talks about both of them if you want to learn more.

The first one is texture synthesis where I got introduced to Rust.
It's an example-based algorithm for image generation, meaning you can give it an example image and it will generate more similar-looking images.
You can also do things like guided generations, style transfer, fill in missing content and simple geometry generation.

The second project is called Kittiwake which is a game-like environment where we explore a feeling of co-creation with an example-based algorithm which is embodied into this little creature.
You create a small screen, like a dialogue, and Kittis tries to minimise the way you create by analysing how you place things and using it as an example.
One of the key similarities between these projects is that both of them heavily rely on performing some kind of search.
Both of them give an example like object arrangement in Kittiwake, or pixel image synthesis, we search for a new configuration that looks perceptually similar to the example while not being a copy.
You can think of a search process in a simplified way, that is we try a bunch of configurations, we present you with the most promising one.
From the user perspective, it can happen so fast that is might not seem like a search.

For example, in texture synthesis, you can see pixels appearing from possible neighbourhoods in the example.
In the example-based placement you can see objects magically moving around until they settle into the positions that satisfy the example.
Even though the notion of search in this project can be argued purely algorithmical, it's closer to a genuine art process than we might initially think.
It is easy to perceive the final artwork as the outcome of a linear pre-calculated path, like an artist just sits down and does art.

However, if we dig deeper, we will discover there is always an underlying network of trial and error.
For example, Picasso's famous painting The Ladies of Avignon is the result of hundreds of sketches.
You can see how earlier sketches were in a different style than the final work.
We can argue that of course this worked required a lot of exploration because of how stylised it is, therefore the search was purely about finding the stylisation and re imagining what we see into something completely different.
However, even when painting from reference, with a goal of copying reality, it is never a passive observation but active interpretation, and engineering of usual forms, which together construct a presentation.

For example, if we look at digital photo studies, we can see a process of searching for textures, colours, forms, that conjure a similar perceptual response to the target photograph.
It is a dynamic problem-solving of simplifying the object of depiction while keeping the perceptual essence.
Any painting if you look close enough is just an amorphous jumble of brushstrokes but they magically come together and make you believe what they present is real.
That I believe is any part is a search for a presentation that conveys a target experience, and the human ability to comprehend similarity between a representation and a thing that it aims to represent is an astonishing example of abstract thinking that comes to us so naturally.
And through the lens of representations, art can invite to us perceive the same object in different ways.

Like let's consider this sheep, for example.
As artists, we might emphasise the way the wool curls are repetition of a pattern that trees make when they sway, abandoning - or we might adopt a different perspective.
And explore the sheep not the way we see it, but invite to experience the concept of a sheep through its hoof marks as it walks on the canvas.
Both works aim to capture the sheep, but the outcomes or representations differ drastically.
Art is not alone in its pursuits to construct things into representations.

In programming, we are often faced with a challenge of translating the language of our thoughts into the language of implementation.
If we were asked to represent the sheep in code, we might adopt an inheritance pattern of thinking and inherit it from an animal class, or might say that animal is just one of the traits and there are other traits we are interested in such as adorable or fluffy.

In mathematics, we can transform and map it into a new space.
Even if when dealing with data, we are faced with a choice of a model or a representation that will explain it.
In the end, these are all representations.
They don't change the way the sheep is, but they change the we think about it.
And quite often, there is no-one representation that just works for a - and it becomes an iterative search for pieces needed to design a new presentation.
The pieces we minute might be different but the pieces of search in art, programming, science, are similar.
That's why arts, programming, and science are actually much closer to each other than we usually portray.

If science helps us to reason about the external world and deconstruct a problem into processing flow, I think art is about looking inward.
A self-introspection and observation of one's perceptions.
Art is not just about recreation of reality, even if you do choose to make it your focus; it's an invitation to co-experience something from your perspective, something that used to be bodiless, but you invented a representation for it, and from that perspective, I genuinely think anyone can be an artist.

Today, there are plenty of art media to choose from, and code is a particularly fascinating one as it invites to convey not just a final destination of the art process, but the author's workflow, the search itself.
It invites us artists to reverse-engineer our own thought process and deconstruct it into an algorithmical form.
Pushing back the process into the background and putting the experience of the search to be THE main art piece.
And that is what computational drawing aims to capture.

Computational drawing is my hobby project which is designed to imitate traditional drawing from reference by searching for a Deacon instruction of the target into discrete brushstrokes, inviting the experience to become of the work to its rough stages to final details.
And just like many paintings are not a faithful representation of reality, so is computational drawing not meant to be a recreation of an artist.
It was originally inspired by many implementations of genetic algorithms available on the internet.

Genetic algorithm is a search algorithm loosely inspired by natural selection.
But what was more interesting in my opinion is the way this project's objective, that is to represent a target image in a budgets of 50 Polygon slides, or hundreds like the Eiffel Tower.

It was the summer of 2017, and I finished my user the, and I had no idea about searching algorithms.
Seeing the genetic stuff really triggered me.
The process, as brute force as it was, reminded me of my own experience during life-drawing classes, having to translate what I see into a set of discrete motions with a pencil or a charcoal.
That personal experience combined with discovering an algorithmic representation I could use, I just had to try it out.
In the end, I modified the search quite a bit which actually made it redundant to frame it as a genetic algorithm and I will touch upon it later in the presentation.
So, this is a result from 2017.

At the time I was just learning Python, so this was written in Python.
And it was very slow to calculate, like a couple of hours almost to a day for one image.
It was ugly, and I never really showed it to anyone except a couple of friends.
I thought it was unsophisticated, not worth sharing, so it just kind of collected virtual dust in my hard drive, until this summer of 2020, when, thanks to Covid, there was a lot of free time, and I went through my old hard drive and rediscovered it.
And the reception was beyond my expectations.
Which motivated me to clean it up a bit and open source it.
And it was super rewarding to see people getting inspired and trying out their own versions.

And while cleaning up the Python code, I started having a lot of new ideas coming from the experience I accumulated.
So I decided to start anew, and, of course, for my sanity, I restarted the whole thing in Rust, and, yes, we are finally getting to the part when I talk about Rust! How does the algorithm work? Let's imagine we can draw a single brushstroke, which is parameterised by its scale, and value.
I like to - there are functions for rotation as well as scale and to change value, we can simply access pixel data.

So now imagine we drew this brushstroke on a canvas, and just like we thought of scale of parameters, we can think of the brush as a parameter of the canvas.
And representing our brush configuration as one dimension, it is just a mental short cut, in fact, that one dimension encapsulates five scale rotation, value, and position of x and y.
Now suppose we added a second brush, extending our brush space to be two-dimensional, and this new space encodes both brushes and thus appearance our canvas would have.
So far, it might seem like quite a redundant transformation.
Cool - but it gets more conceptually interesting as we add more brushes.
It becomes messier to visualise.

Let's imagine this 2D space is a space defined by 100 brushes, and a dot in the space represents a particular canvas appearance defined by our 100 brushes are configured.
To move in the space, all we have to do is change our canvas.
If we just take a stroll and aimlessly wander around in the space, we might discover that with just 100 brushstrokes, we can depict a lot of interesting stuff, but also a lot of random stuff.
In fact, the proportion of interesting stuff to random it insanely low.
It is very unlikely that we will just stumble upon a good painting.
So, the question becomes how do we stop and search for something interesting? We provide a target that guides our search to a space containing similar images, and the way we can define similarity is simply a difference between the pixels of the target and the pixels of the drawn images.
So, if after imitating a brushstroke our pixel difference is smaller, that means we are moving towards a space with more similar images and we should keep the mutation, and then we just do it again, again, and again.
Here, you can see the beginning of a search as brushes move around trying to position themselves in such a way that looks more like a target, and if it continues its guide the search long enough, we will eventually reach a can various configuration whose brushstroke arrangement looks similar to the target.
In general, that is pretty much it.

There are many ways one might implement this search.
It can be a genetic algorithm, gradient descent, simulated annealing.
I will show you how I approached it from my art education and incorporating it into the search.
I was greatly inspired in fine-art classes, especially when doing oil still lives, we were never taught to solve the detail frequencies is at once.
Most of the time, you will get yourself into a corner you can't solve, like a - so you deconstruct the object of depiction into big shapes first.
Only once you've got them you go into details.

I wanted to incorporate the same kind of wisdom in the way my algorithm would do the search.
Therefore, I broke it down into multiple stages, and each stage only solves a particular level of details, starting with very big brushstrokes, forcing to generalise the shape, and then applying more details.
Each of those stages is a completely separate searches, so when a first stage is done, the second stage has to just draw on top of what has been drawn before.
Here, you can see the search process happening for different stages.
And when you see a sudden jump, that's when your brushes are added, and the algorithm is using them to better approximate the target.
And during every stage, the algorithm needs to place 100 brushes, and it has to do so in 10,000 search steps.
10,000 steps might seem like a lot, but if you need to place 100 brushes, that is 8,000 parameters, and remember, the algorithm cannot remove them.
It is forced to place strokes even if it is not perfect.
And one of the reasons to limit the step number is to encourage happy accidents, mistakes, and imperfections.

If something goes bad, it can be fixed in later stages, giving a conception of continuous problem-solving in the brush layout itself.
As brushstrokes become smaller, I use a sampling mask to guide the brush placement towards places of higher frequencies.
I do so to preserve the loose brush work while giving a perception of a deliberate intent.

We're not just splattering a uniform brush texture, but have a specific thought process manifested in the way the brushes non-uniform sizes and visually interacting with each other.
There is an expression, "Don't overpad the painting" meaning don't overwork it and kill the playfulness.
That's what I'm trying to avoid by having the sampling mask.
You can notice the sampling mask is generated based on edges, and edges play a very important role in drawing.

If you have had drawing classes, you probably recognise this.
This is used as a homework to copy and learn from on how to deconstruct a 3D shape into simplified contours.
As humans, we are sensitive to sharp transitions between darker and lighter elements and a small deviation can make something look wrong.
Therefore, one of the new additions to the Rust version was using contours to guide the search.
This is done by comparing edges of target versus drawn, and computing their distance.

Here's a comparison of using versus not using edges to guide the search.
Notice how much better defined the face is, and how it looks perceptually closer to the original.
It's subtle, but I think it gives an extra push towards believability that there is an artist's thought process behind each brush placement.
Since we need to perform iteration, it needs to be fast.

Here are some comparisons of how long it takes for different edge-detection iterations available in different Rust crates.
In the end, I went with a custom implementation that uses chunks to make it parallel.
And here is a time and quality comparison for Canny versus without-edge detection.
Edge detection takes a huge bulk of the generation time going from five minutes to 20, even with 1.5 hours with Canny.
The facial features are captured so much more precisely with Canny or Sobel.
Canny gives a crisper result but comes at a four-times slower generation cost.
In case one is interested in how the parallel Sobel is done, here is a code.
Feel free to pause when this goes online.

Another way I'm moving edges is to drive the brushstroke's orientation.
Brushstrokes follow along the edges and don't cross them, because that would violate the perceptual contour border.
To guide the brushstrokes, I generate an image-gradient field.
The stronger the direction, the more influence it has on a brushstroke that might be placed in that region.

For example, here, there is almost no gradient information and therefore the brushstroke might have any orientation.
Here, closer to the edges, there is a strong directionality indicated by the length of the lines, and the brushstrokes placed here are more likely to follow along the field's direction.
The reason why I made it to the always probabilistic is I don't want to exclude any happy accidents.
Perhaps if a brushstroke is placed completely perpendicular, it might actually be a very good solution, and to the pixel and edge difference is what matters.
Computational drawing is still very much work in progress, and I hope to open source it once it's done.
One thing I still haven't gotten to is figuring out a good strategy for searching for a colour solution.
That is still on my to-do list.

Right now, I'm directly targets from the target image.
At the moment been the algorithm is running on CPU.
The code is parallelised, and drawing on CPU is quite slow, and it just so happens, recently Embark has announced Rust on GPU project.
I'm really looking forward to its development, so please go and contribute so I can do the paintings on the GPU!

We are reaching the end of the presentation now, so let's summarise:
we have talked about art as a search process for new representations and how representations can invite us to view the same object from different perspectives.
Art, science, and programming are similar in that regard.

We discussed how code as an art medium invites us to convey our search process in an algorithmic form, making it the main art piece,
and how computational drawing tries to capture that search in the context of traditional drawing from reference.

And lastly, we have covered the algorithm details as well as how we can use our artistic intent to guide the search by translating it into code.
And if you're an artist, and you are interesting getting into Rust, I really recommend that you stop considering and just do it.

First of all, the ecosystem is great, the package management is heavenly, and if you just want to get started ASAP, learning about ownership is all you really need, which is literally like reading the first four chapters of the Rust Book.
It's very rare I find myself in the need of advanced features when doing this kind of art tools.

I also can't recommend enough getting Rust Analyzer, it will show you types, tips, it is absolutely amazing.
When I prototype, I often write very messy code, and it's a breath of fresh air to have the language guarding me against stupid mistakes,
and Clippy shout at me for making a variable and never using it! Having that confidence that if my code compiles, it works.
that really frees my brain to focus exclusively on the algorithm design and logic flow, and I don't envision myself prototyping in any other language now.

Before we wrap up, a quick thought out to Thomas and Maik for dealing with my Rust programming on at that daily basis.
A lot of things I learned about Rust, I learned from them, and I would like to thank Embark giving me time to discuss this report.
I would like to thank you for listening.
I hope it was useful, and you learn something new, and, if you have any questions, write a comment if you're watching it off line, or post a message in the chat if you're watching it live.

Thank you.
Have an awesome remainder of RustFest.
