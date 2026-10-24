---
title: 'Why Does AI Make Things Up? Usually It Read the Wrong File First'
description: 'Why does AI make things up? Often it read the wrong file first and was sure about it. 2 steps fix that: put the right file first, and send a helper into the mess.'
pubDate: 2026-10-23
keyword: 'why does ai make things up'
youtubeId: 'Jhtpy2YoeFs'
draft: true
---

[![Watch: Bip's First Day, the robot intern who was confident and wrong](/blog/why-does-ai-make-things-up/video-thumbnail.png)](https://www.youtube.com/watch?v=Jhtpy2YoeFs)

*This is the video behind the post, a 1:46 Short. My robot intern says "Confident!" 3 times. He's wrong twice, and both times he read the wrong file first.*

Why does AI make things up? A lot of the time, it isn't making anything up. It read the wrong thing first, and it was sure about it.

That's what happens to Bip, my robot intern. He grabs the first answer on his path and hands it in. Confident! But wrong.

The fix isn't a smarter AI. It's 2 steps in how you set up your files.

## Why does AI make things up? 2 different problems

2 different problems both get called making things up.

The first one is what people mean by AI hallucination. The AI fills a gap with a guess that sounds right. OpenAI's own researchers found that the way these models are trained and tested rewards a confident guess over "I don't know" ([OpenAI, 2025](https://openai.com/index/why-language-models-hallucinate/)).

The second one shows up more in a small business. The right answer is in your files. The AI just read something else first.

Bip has the second problem. Mrs. Ramirez's cell number is on her customer card. He found the office phone list first, so he handed in the office line.

## What Bip's files are

Here's his folder, the same way your AI sees yours.

- **admin/** is the office folder. It holds phone-directory.md, the office phone list. It's the first file on Bip's path.
- **clients/** is the customer folder. ramirez-mrs.md is her card, with her cell number on it.
- **specs/** is the paperwork for a repaint job. In the story it's a pile. The approved materials total is in there, $1,200. So is a rough guess, $1,800.

The .md on the end means a plain text file. It's the kind of file your AI can open and read.

Bip reads admin/ first, so the office number is the one he grabs. Later he wades into specs/ and grabs the $1,800 guess. Both times he says "Confident!" ([0:20 in the video](https://www.youtube.com/watch?v=Jhtpy2YoeFs&t=20s))

![3 moments from the video: Bip says Confident but wrong at the office phone list, Confident but wrong with the 1,800 dollar guess, then Confident and right with 1,200 dollars](/blog/why-does-ai-make-things-up/confident-3-times.png)

Sounding sure is not the same as being right. Your AI sounds sure every time.

## Step 1: Put the right file first

In the video, I move her card to the front door. That's the first place Bip looks. He reads it first and gets her number right. ([Step 1](https://www.youtube.com/watch?v=Jhtpy2YoeFs&t=29s))

Your AI works the same way. Whatever it reads first, it trusts. So the file it should trust goes where it starts.

I use Claude for this. Claude is the AI assistant I work with, and it works right inside my folders. Anthropic makes Claude, and its own guide says the same thing. Give it the documents. Tell it to answer only from them ([Anthropic](https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations)).

## Step 2: Send a bit into the mess

Some folders are a pile and always will be. Job paperwork is like that.

So Bip doesn't go in. I send in a bit, a small helper robot. The bit reads the whole pile and hands back 1 line: approved materials, $1,200. Bip's head stays clear. ([Step 2](https://www.youtube.com/watch?v=Jhtpy2YoeFs&t=58s))

In my setup, a bit is a second AI with 1 job. "Read the specs folder and give me the approved materials total." It reads the mess, so the main one doesn't have to.

This time Bip says "$1,200. Confident!" And he's right. ([1:13](https://www.youtube.com/watch?v=Jhtpy2YoeFs&t=73s))

## How to stop your AI from making things up

1. **Find out what it reads first.** Open the folder your AI works from. What's at the top?
2. **Put 1 source of truth where it starts.** 1 card per customer, in 1 place.
3. **Don't make it wade through piles.** Send a helper with 1 question.
4. **Let it say "I don't know."** Anthropic's guide says giving Claude that permission cuts down wrong answers.

It's the same idea behind how I [set up a small business system](/blog/small-business-systems). And it's the bridle from my post on [how to come up with video ideas](/blog/how-to-come-up-with-video-ideas). The power is in the AI. The direction comes from your folders.

## Play it yourself

Bip comes from Robo-Intern, a small game I built where you set up the folders and Bip does the job. [Play it here](/play/). The longer version of the story is [Bip's First Day](https://youtu.be/qAa70yzIrnU).

I teach this step by step in my Skool community. Skool is where my community lives. It's called [See It, Build It, Own It](https://www.skool.com/see-it-build-it-own-it).

Open your AI's folder tonight and look at what it reads first.

I'm in Your Corner. Now, Go Own It.
