---
title: 'Why Does AI Make Things Up? Usually It Read the Wrong File First'
description: 'Why does AI make things up? Often it read the wrong file first and was sure about it. Two steps fix that: put the right file first, and send a helper into the mess.'
seoTitle: 'Why Does AI Make Things Up? It Read the Wrong File'
seoDescription: 'Why does AI make things up? Often it read the wrong file first. Two steps fix that: put the right file first, and send a helper into the mess.'
pubDate: 2026-10-23
keyword: 'why does ai make things up'
youtubeId: 'Jhtpy2YoeFs'
draft: false
videoUploadDate: 2026-10-23
---

*This is the 1:46 animated video behind the post. An AI says "Confident!" three times. It's wrong twice, and both times it read the wrong file first.*

Why does AI make things up? A lot of the time, it isn't making anything up. It read the wrong thing first, and it was sure about it.

Here's how that looks in a small office. The AI grabs the first answer on its path and hands it in. Confident, and wrong.

The fix isn't a smarter AI. It's two steps in how you set up your files.

## Why does AI make things up? 2 different problems

Two different problems both get called making things up.

The first one is what people mean by AI hallucination. The AI fills a gap with a guess that sounds right. OpenAI's own researchers found that the way these models are trained and tested rewards a confident guess over "I don't know" ([OpenAI, 2025](https://openai.com/index/why-language-models-hallucinate/)).

The second one shows up more in a small business. The right answer is in your files. The AI just read something else first.

Our example has the second problem. Mrs. Ramirez's cell number is on her customer card. The AI found the office phone list first, so it handed in the office line.

## What the AI's files are

Here's the folder, the same way your AI sees yours.

- **admin/** is the office folder. It holds phone-directory.md, the office phone list. It's the first file on the AI's path.
- **clients/** is the customer folder. ramirez-mrs.md is her card, with her cell number on it.
- **specs/** is the paperwork for a repaint job. In the story it's a pile. The approved materials total is in there, $1,200. So is a rough guess, $1,800.

The .md on the end means a plain text file. It's the kind of file your AI can open and read.

The AI reads admin/ first, so the office number is the one it grabs. Later it wades into specs/ and grabs the $1,800 guess. Both times it says "Confident!" ([0:20 in the video](https://www.youtube.com/watch?v=Jhtpy2YoeFs&t=20s))

Sounding sure is not the same as being right. Your AI sounds sure every time.

## Step 1: Put the right file first

In the video, I move her card to the front door. That's the first place the AI looks. It reads the card first and gets her number right. ([Step 1](https://www.youtube.com/watch?v=Jhtpy2YoeFs&t=29s))

Your AI works the same way. Whatever it reads first, it tends to trust. So the file it should trust goes where it starts.

I use Claude Code for this. Claude Code is the AI assistant I work with, and it works right inside my folders. Anthropic makes it, and its own guide says the same thing. Give it the documents. Tell it to answer only from them ([Anthropic](https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations)).

## Step 2: Send a helper into the mess

Some folders are a pile and always will be. Job paperwork is like that.

So the main AI doesn't go in. I send in a helper. The helper reads the whole pile and hands back one line: approved materials, $1,200. The main AI's head stays clear. ([Step 2](https://www.youtube.com/watch?v=Jhtpy2YoeFs&t=58s))

In my setup, a helper is a second AI with one job. "Read the specs folder and give me the approved materials total." It reads the mess, so the main one doesn't have to.

This time the AI says "$1,200. Confident!" And it's right. ([1:13](https://www.youtube.com/watch?v=Jhtpy2YoeFs&t=73s))

## Why the two fixes work: your folders are the instructions

The AI didn't get smarter between the wrong answers and the right one. Its folders changed.

That's the whole idea behind the folder system I use. Your AI doesn't learn your business by being told over and over. It learns it by reading your folders, in the order you lay them out. So the way you set up your folders is the instructions.

It's the difference between training a new hire out loud every week and handing them a binder that already runs the job. Your AI reads the binder every time you start. It reads the pages in order, though, and it tends to trust the first page that looks like an answer.

When the binder is a mess, the AI still answers. It answers from whatever it found first, and it sounds sure. In a small business, that's often what making things up really is.

## How to set up a folder system so your AI stops making things up

Each step below is a piece of the folder system. Each one says what it would change in our example office.

**1. Give it a front door.** One short page at the top of your folders that your AI loads at the start. It holds no answers. It only says where the answers live. "Customer phone numbers are in clients/. The office line is in admin/." Mine is a file called CLAUDE.md, because Claude Code loads that page every time it starts.

*In our example:* the front door sends the AI to clients/ for a customer's number. It never grabs the office line.

**2. Name your folders for the work.** admin/, clients/, specs/. Use the words you already say out loud. The folder's name tells the AI what's inside before it opens a single file.

*In our example:* "Find Mrs. Ramirez's number" and clients/ are the same idea. The name points the way.

**3. Put a short note in each folder, named CLAUDE.md.** One page that says what's in this folder, what to trust and what to skip. Claude Code loads a folder's CLAUDE.md when it works in that folder. "One card per customer. Cell number on the card." "The approved materials total is on the signed quote. Rough guesses are not approved." The note is where you also tell your AI it's allowed to say "I don't know." Anthropic's guide says that permission cuts down wrong answers.

*In our example:* the note on clients/ sends the AI straight to her card. The note in specs/ tells it the $1,800 is a guess before it picks it up.

**4. Give every fact one home.** Her cell number lives on her card, and only there. The office line lives in the phone list, and only there. When a fact lives in two places, someday they disagree, and the AI may go with either one. So the second place keeps a pointer, not a copy: "Ramirez: see her card in clients/."

*In our example:* there's only one number that belongs to her, so there's only one number the AI can bring back.

**5. Give the messy folders a helper with one job.** Some folders stay a pile. So a helper reads just that folder and hands back just the line you need. Your main AI only ever sees the answer, never the pile.

*In our example:* the helper reads specs/. The main AI gets one line: approved materials, $1,200.

**6. Check the path.** Every answer comes from files you can open. When an answer is wrong, ask what it read. Then fix the wrong fact, or the note that wasn't clear. These pages guide your AI. They don't lock it, and that's why this step is here.

*In our example:* the first wrong number shows you the problem right away. The office line was first on the AI's path.

The two steps in the first video are steps 1 and 5 in action. The other four steps are what keep them working after the video ends.

[The second video](https://www.youtube.com/shorts/Eq9hj96V_lE) shows all six, in order. The AI does the same job twice, and the second time you watch each step as a stop on its path.

It's the same idea behind how I [set up a small business system](/blog/small-business-systems). And it's the bridle from my post on [how to come up with video ideas](/blog/how-to-come-up-with-video-ideas). The power is in the AI. The direction comes from your folders.

The method has a name. It's called Interpretable Context Methodology, ICM for short, made by Jake Van Clief and David McDermott. You can read [their paper](https://arxiv.org/abs/2603.16021). I just call it the folder system.

## The 4 files your AI receptionist needs before it picks up the phone

The first two videos show the second problem. The third one shows the first.

The owner is up a ladder. His phone buzzes. He can't get to it. By the time he calls back, they've booked someone else.

So he does the smart thing. AI can answer the phone now. He sets it up himself, and the AI takes the calls.

He skips one part. The folder. The AI receptionist's folder is empty.

The phone rings. The caller asks four things. Do you do bathroom re-tile? Can you match my old tile? What's your deposit? How soon can you start?

The AI answers anyway. "We do everything!" "Exact match!" "50% up front." "Monday!" Every answer is a guess, and every guess sounds sure.

The caller hangs up 40 seconds in. The job is gone. ([Watch the call](https://www.youtube.com/shorts/av49NJTgzxA))

Nothing was in the wrong place this time. There was nothing there at all. That's the gap the OpenAI researchers describe. The AI fills it with a confident guess.

The fix isn't a better AI. It's four files in one folder, set up before the AI answers anyone. If an AI tool answers your phone, these go in the instructions box in its settings. If you use Claude, Anthropic's AI assistant, put them in a Project. A Project holds the notes Claude reads at the start of every chat.

Copy this and fill in your own:

```
receptionist/
  the-business.md   What we do. What we don't. Where we work.
  prices.md         Deposit: [your deposit] to book.
  calendar.md       How soon we start: about [your lead time] out.
  get-a-person.md   Not in here? Don't guess. Take a message for the owner.
```

Why each file is there:

1. **The business.** The AI says yes to your jobs, and no to the ones you don't do. And no to a town you don't drive to.
2. **Prices.** The AI quotes your deposit, not a number that sounds normal.
3. **Calendar.** The AI promises a date you can keep.
4. **When to get you.** The rule against guessing. Anything that isn't in the folder gets a message for you, not a made-up answer.

Each fact lives in one file, the same rule as the folder setup above. When your deposit changes, you change one line in one file.

In the video, the next caller asks the same things. The AI reads the folder. Re-tile, yes. 10% to book. About three weeks out. She asks to book, and asks about matching her old tile. That isn't in the folder, so the AI doesn't guess. It takes a message for the owner. The job books.

The money in the video is made up. The move isn't.

The four files are the start. A full AI receptionist needs a few more: who it is, what a good call does, and how you test it before it takes a real call.

## Your move today

Open your AI's folder tonight and look at what it reads first.

Want help with this? See the [two ways to start](#start) below.

I'm in Your Corner. Now, Go Own It.
