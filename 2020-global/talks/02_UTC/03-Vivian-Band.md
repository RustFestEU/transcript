**Rust for Safer Protocol Development**

**Bard:**  
Vivian wants us to be safe  
and our code on the web to behave  
use Rust to generate  
code that will validate  
risky inputs, no need to be brave


**Vivian:**  
Hello, my name is Vivian Band.
I'm a second-year PhD at Glasgow University studying network security.
I was on the safer protocol development project.

So, improving protocol standards: the Internet Engineering Task Force standardises network protocols.
These are initially presented as drafts to working groups and then become official standards after further review.
However, even after all of this peer review from several different sources, mistakes still sometimes appear in these documents.

For example, in the image on the right, the ASCII diagram shows the option real port is 13 bits long and 19 bits long, but the text description says these should be 16 bits in length.
These create ambiguity for people implementing protocols.

What the improving protocols standard aims to do is to provide a machine-readable ASCII format to detect these inconsistencies much more easily.
These are minimally different from the format using existing diagrams with authors using consistent label names and certain specific stock phrases in their descriptions.
These machine-readable documents allow us to build a typed model of protocol data.

We call this custom typed system developed as part of our project, network packet representation.
Network packet representation is program-agnostic.

I had used Rust earlier to implement a bear-bones version of the protocol a few years ago on my final-year undergrad project and I was impressed how much safety it added to the system's programming.
Our first automatically generated libraries would be rainfalls files because we wanted resulting is have a good level of type safety.

Okay, so, first of all, let's take a step back and take a look at which types we need to describe network protocols.
Before we can start building parsers and parser combinators.

I use a lot of analogies when learning new concepts, so I like to think of these basic types like Lego bricks.
There are several basic types that we can identify from protocol standard documents and we will take a TCP header to demonstrate this.
Fields which contain raw data can be modelled, so source port is just 16-bit unsigned integer.
That's just raw data.

Fields which could contain one or more of the same element could be modelled as an array.
Some fields only appear under certain conditions, and rely on values from other fields within the same protocol data unit, in this case, the TCP header, to establish whether we're using that or not.
We can call these constraint types since they need to be checked.

Some fields require information not contained within this packet, like an encryption key, or a value from another data unit somewhere in this draft.
We can hold this information in a context-data type which can be received by other protocol data units which also feature in this draft if required.
A field which can take on one of a limited possible set of values can be modelled as an enum, indicated in each drafts with the stock phrase, a TCP option is one of, so "is one of" is the key phrase we need to use in the modified standard documents.

Packets and protocol units as a whole can be considered as structure-like types given they contain field type as constituent type members.
One that doesn't feature in TCP is the function data type.
These are required to form congresses between different data unit, in this case, encryption and decryption of packet headers.

We've got seven types in total in our network packet representation system.
Bit strings, arrays structs - arrays, contexts, and functions.

Let's get to the fun stuff.
Automatic Rust parser generation.

We've got our basic building blocks sorted out.
How can they be used for the complex combinators in Rust?

Let's go to the bit string when we were explaining our custom types.
We can automatically generate this as a wrapper under an unsigned 16-bit integer in a Rust output file easily.
Immediately after that, we can generate a nom-based parser for that type.
This is a little bit more difficult to generate.

There is a lot going on here, so we will highlight a few key details.
Our first argument for all our parser functions is an input tuple. The first element of this tuple is a borrowed array of bytes, which for protocol testing would be an incoming packet of some sort.
Our parsers work at the bit level so the second tuple element is an integer which tracks how many bits we've read in the current byte.

Our second argument is a mutable borrow from the context instance since we might want to update this, aw well as we [?]. Our outputs are non-specific result type containing the remaining bytes left to be parsed, an updated bit counter, instantiated with the correct value read from the byte array.
We also return mutable reference to our possibly updated context.

The parser function itself takes a defined number of bits from the input byte array, in this this case, it will take 16 bits, and then assigns the value of those taken bits to the custom Rust type as needed.

The order in which we generate these custom types and parsers in the Rust output file is determined by depth-first search.
We generate a custom type and... We generate a custom type and parser whenever we reach a leaf node and generate a parser combinator for the parent nodes when there are no more leaf nodes found for that parent.
So let's walk through parsing a TCP header. The overall protocol data unit is a TCP header which is a struct type in our custom network packet representation system. So this is the root of the depth-first search search tree, and will generate the parser combinator for this last, after we generated all the required dependent parsers and parser combinators.

So the first parser will be for source port. This is a 16 long, 16-bit long bit string, that was the parser that we walked through earlier.
Bit strings are leaf nodes so we move to the next child of the raw TCP header node, destination port.
This is also a bit string and therefore a leaf node so we write a custom type and a 16-bit parser for this.

The first non-bit string we encounter in TCP header is Options, which is an array type.
The elements which could be present in the options array are TCP options.
TCP options is an enum type with a limited range of possible choices.
Each of these enum variants are described in their own small ASCII diagrams in another section of the same document.
This makes each enum variant a struct type in our network packet representation system in this case EOL option is a struct.

The value of the field in this ASCII diagram is a bit string.
This means we are finally reached the leaf node and we can write a custom Rust-type definition and a nom parser, and a Rust-type definition and a parser for its parent node, EOL option.
We find that there are more TCP option variants so we repeat this process for each one.
Once we have written parsers for all of the variants, we can write the Rust type definition and parser combinator for the parent nodes, TCP Option, and TCP then Options.
The last field in the packet is the payload, which we can process relatively easily as a stripped-out bit string.

Finally, we write the Rust-type definition for the TCP Header struct, and the parser combinator to process the entire protocol data unit in one function call.
We also create a context object which all parser functions have access to.

So, to recap the system that we developed in this project. We have the machine-readable protocol document at stage one with our minimal changes to ASCII diagrams and text descriptions.
We have the custom protocol typing system developed in stage 2, our network packet representation language. In stage 3, we have the results of my internship work, a Rust library file containing correct, usable parser functions, automatically generated from the information we have in stage 2.

Remember earlier when I mentioned that I think of these basics types and parsers as building blocks? To go further with that analogy a TCP header is a lot like this Lego block dinosaur here.
It contains many different complex elements, and is difficult to build manually without making mistakes.

Our generated parser libraries are not only a manual explaining how this data should be parsed, they also allow protocol developers to build the struct with extracted values with a single function call.
This is ideal for protocol testing.
The picture on the left is a genuine sample of our generated TCP parser code from our modified TCP document.

So, conclusions: initially, I decided on Rust as our first parser output language, because I enjoyed Rust for systems programming on a previous project.
Using parser combinators turned out to be an ideal fit since assigning them to network protocols both used depth of search.
Parsers can be difficult to write manually and are prone to containing errors.

Automatically generating parsers minimises the chance of some of these errors occurring, for example, the number of bits being read will always match the specification.
The typing guarantees offered by Rust will help us ensure we get the machine-readable specification document, and in our network packet representation system.
If there are errors, the Rust compiler will alert us to this.

The next steps: this project is still ongoing, and there are more directions that this research can go in.
We are aiming to show our system to the IIETF.
We need to put in more work on function types so we can create encryption and decryption functions for protocols like QUIC which heavily rely on this.
We would like to use the Rust libraries for protocol and error correction to support more protocol languages in the future.
Resources for this project can be found at these links.
We have a peer-reviewed publication which goes into more detail about our network packet representation typing system and a GitHub repository containing the codes for all automatic Rust parser generator.

Thank you for your time, and I would be happy to answer any questions.


**Vivian:**  
That was brilliant. Loved it! [Laughter]. Thanks so much.

**Stefan:**  
Thank you.
I know we have 25 to 40 second-delay to the stream, so, just to get ahead of time, I have two questions if you don't mind.
The first one is, there is a push for native implementation of the networking type, so the Rust standard library doesn't Lewis LIPSE any more but directly operates with system calls. Do you think that will affect you in any way like in developing new types?

**Vivian:**  
Potentially.
So, the whole point of us developing the network packet representation system was to have something that was completely agnostic of any programming languages, or output libraries we want to use in the actual parser fields themselves, so it should be fairly easy for us to adopt to these things, I think.
I think we could maybe have to consider, like, how we can convert from network packet representation to different codes - different types featured in the output code, but that's relatively straightforward, I think.

**Stefan:**  
Wonderful. So, this feeds into my other question: so, I guess you can use the higher level parsers for TCP, UDP, what not, regardless of the underlying types of IPV4 versus version 6?

**Vivian:**  
Yes, so what we are aiming to do is have these run through a single protocol specified in a draft.
It's very rare that you would have an RFC that specifies multiple protocols, so if you wanted to make an IPV6 generator, go ahead, run it on the RFC.
We are aiming to introduce our machine-readable ASCII format to feature IETF drafts and hopefully we will see more adoption of that so we can see automated testing going forward.
What we've done for showing the TCP example, we've gone through an older RFC, and made minimal changes to it to generate parsers, so, if you wanted to do that with protocols, that's absolutely fine as well.
So, again, in answer to your question: sorry, the question was about multiple protocols nested?

**Stefan:**  
Yes, if you can use the parser coming out of the RTC for PC6, and what the -

**Vivian:**  
Yes, we can use this for all sorts of different patrols Coles. The nice thing about parser combinators, you can have a ... if you like. Maybe one day in the future.

**Stefan:**  
Yes. Cool. Wonderful. There is also a question from the audience: how do you deal with non-bite aligned structures, so, if like a five-bit word crosses the eight -bit alignment?

**Vivian:**  
So, we had - so I think I had a small file for test when that I was doing the internship about what if this happens and non-bite aligned words was one of them.
What we found was with the bit-level parsers, it tends to go straight into the next byte if you happen to - if the counter exceeds seven, so it will just run forwards happily.
We haven't found any issues with that so far. It's been very good to us.

**Stefan:**  
Yes, it has been released. Version 6 has been out since Tuesday, I think?

**Vivian:**  
Yes, I haven't had time to update that yet, and this was written on five, so we will see if it works with six and see if there is anything that needs changed.

**Stefan:**  
Wonderful. If this were a physical conference, we would probably meet Jeffrey who wrote the thing.

**Vivian:**  
Sure, we would love to.

**Stefan:**  
Wonderful. Do you want to precise something, or say this is something that came to mind just now?

**Vivian:**  
No, I think I've kind of said everything that I want to say in the presentation, mostly.
So what we've - it's mostly a proof-of-concept at the moment.
So I posted a link to the repository and our paper explaining our system in the conference room chat, so if people want to take a look at our library and have a play about it, see how the generated Rust code looks,
we will happily take feedback if people want to improve our parsers, so I consider myself a novice at Rust.
We used using num functions as opposed to macros so we knew what was going on. If people want to talk how to optimise that, make it cleaner or more improvements, that would be great. We would love that.

**Stefan:**  
Wonderful. So, to the lovely people in the stream, this is about the last chance you get to ask more questions. Has the IETF been receptive to the machine-readable diagram format?

**Vivian:**  
So, the problem with the IETF is there are so many different groups, it's impossible to get a group consensus for the whole organisation, so what we've got at the moment is a small side meeting at the formal descriptions technique and side groups, I think, which is aiming to say, okay, how can we deploy this?
So Stephen and Paul Perkins, two people involved in this project are heavily involved with the IETF, so I think they're having discussions to see how we can get this deployed.
So it's been past attempts about okay, we can have custom tooling to do this and this, all singing and dancing, but we tried to make something relatively simple and unintrusive that could work for multiple workflows.

**Stefan:**  
Cool.

**Vivian:**  
So the answer with somebody haven't published using it yet, but watching this space.

**Stefan:**  
I guess you will be trying to investigate like the correctness of the middle boxes and what-not, or maybe try to circumvent them?

**Vivian:**  
Yes. So one of the examples that we are working on at the moment is QUIC. QUIC being high-profile, and a complex protocol, I think. If we can successfully parse this, and we can successfully use it for testing, then we think that's quite a good promotion, I suppose.

**Stefan:**  
Definitely. Having an actually correct implementation that is done when the specification is finished ...

**Vivian:**  
This was one of the main motivations. You get protocols that are becoming increasingly more complex, like QUIC. It's not surprised, and there will be flows with it. Say you got a package generated by C, and we fed it through our Rust parsers, we could potentially find - so it is written in other languages, we just need the output that they generate.

**Stefan:**  
So tools like cargoes, expand, the generated code, and maybe check out the state machine that has been generated to see ...

**Vivian:**  
Yes.

**Stefan:**  
To see if the specified behaviour makes any sense, right? Or if there is, like, obvious flaws in the -

**Vivian:**  
Yes, to catch the subtle bugs, which, okay, you know, essentially, what our parsers are testing is your output on the wire correct, doing what you think it's doing? We could maybe come up with more advanced testing, and automated error correction later on possibly, but that's going to take some time to develop.

**Stefan:**  
Yes. Looks like a long ongoing project.

**Vivian:**  
For sure. Hopefully, yes!

**Stefan:**  
Wonderful. So, I'm currently not seeing any more questions. I hope I haven't missed any.

**Vivian:**  
It seems like that's all of them.

**Stefan:**  
Wonderful. Thank you again very much.

**Vivian:**  
Thank you for having me.

**Stefan:**  
Yes, you're welcome.
