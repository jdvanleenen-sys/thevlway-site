---
title: 'How to Create a Claude Skill (and Catch What It Misses)'
description: 'How to create a Claude skill for the report you rebuild by hand. 4 steps, a made-up test, and the check that caught 40 homes in 1 place and 42 in another.'
pubDate: 2026-11-23
keyword: 'how to create a claude skill'
draft: false
youtubeId: 'JWLsWbeXDAg'
videoUploadDate: 2026-11-11
---

*This is the video behind the post. Watch the report that looks done in the first 20 seconds. Then watch step 4 find the number that was wrong in it.*

How to create a Claude skill comes down to 4 steps. Say what done looks like. Let the Skill Creator build it. Test it on made-up numbers. Check the report against what went in.

Step 4 is why this post exists.

Our report looked done. 1 part said 40 homes. Another part said 42.

The skill didn't flag it. The check did.

The building project in this post is made up. So are its report and its numbers. They're there so you can watch the whole thing work.

## You built a report once. Now you rebuild it by hand

You built a report once. Now you rebuild it every quarter, by hand. ([0:20 in the video](<https://www.youtube.com/watch?v=JWLsWbeXDAg&t=20s>))

Same layout every quarter. New numbers every quarter.

What if Claude rebuilt it for you, in the same layout?

Claude is an AI assistant. I use it because it follows written instructions well.

Save the job as a skill, and Claude can reuse it.

I sat down with a teammate to build our first skill together. Our example is a quarterly report for a building project's investors. ([0:35](<https://www.youtube.com/watch?v=JWLsWbeXDAg&t=35s>))

It has to be right, because it goes to people who put money in.

## What a Claude skill is

A skill is a set of written instructions that Claude keeps and reuses. ([0:52](<https://www.youtube.com/watch?v=JWLsWbeXDAg&t=52s>))

For our report, it holds the layout, the brand guide and the steps.

Its main file is plain text. You can open it and read every word.

To use it, ask for it by name. Then check what it gives you.

## Where your Claude skills live

Your skills live in Claude under Customize, then Skills. ([1:19](<https://www.youtube.com/watch?v=JWLsWbeXDAg&t=79s>))

In Settings, turn on Create and edit files first. Anthropic, the company that makes Claude, covers both in its [help page on using skills](https://support.claude.com/en/articles/12512180-use-skills-in-claude).

Claude has a built-in helper called the Skill Creator. It builds skills with you.

You can also upload someone else's skill as a zip file. A zip file is 1 file that carries a whole folder. Read it first and trust the source.

We used the Skill Creator. Here it is, in 4 steps.

## How to create a Claude skill in 4 steps

### Step 1: Say what done looks like

This step tells Claude what a finished report looks like. ([1:44](<https://www.youtube.com/watch?v=JWLsWbeXDAg&t=104s>))

In a chat full of files, my teammate typed "help me create a skill."

Claude guessed the job from those files, and guessed wrong. It offered to build a warranty-reply skill. Nobody asked for that.

It's like telling a new hire to handle the reports, then walking away.

So we wrote the job out in full.

- Here's last quarter's report. Add the new numbers, keep the same layout.
- Here's our brand guide, with our colours and fonts.
- Change only the words, the numbers and the dates.
- Highlight anything missing, so a person fills it in.

That's your finished-report checklist. Add to it as you test.

### Step 2: Let the Skill Creator build it

This step turns your checklist into a skill you can run again. ([2:28](<https://www.youtube.com/watch?v=JWLsWbeXDAg&t=148s>))

Start a new chat. Upload those files and ask for a skill from your checklist.

It asks you questions. Answer them the way you'd brief a new hire.

It writes the rules and the steps into the skill file for you.

Give it a plain name and save it. Then make sure it's turned on.

### Step 3: Test it on made-up numbers

This step helps you spot mistakes before the real work. ([2:52](<https://www.youtube.com/watch?v=JWLsWbeXDAg&t=172s>))

Next quarter's real numbers didn't exist yet. So in a fresh chat, we had Claude make up next quarter's numbers.

Then we asked Claude to use the skill on those numbers.

The report came back looking just like last quarter's. New dates, same layout.

It looked done. But looking done is not the same as being right.

### Step 4: Check the report against what went in

This step helps you catch a wrong number before an investor does. ([3:19](<https://www.youtube.com/watch?v=JWLsWbeXDAg&t=199s>))

Start a new chat. Give Claude the new report, the old one, the numbers and the checklist.

Ask it to list every mismatch and every missed checklist item, in a table.

It found 1. The home count said 40 in 1 place and 42 in another.

The made-up numbers disagreed with each other. The skill didn't flag it.

So we went back to our numbers by hand. The right count was 40.

Then we added a checklist line. Flag any home count that isn't 40.

We put that rule into the skill, saved it and tested again.

Now the skill knows 1 more rule, and we still run the check.

## A person still signs off

Say what done looks like. Build it. Test it. Check it. ([4:02](<https://www.youtube.com/watch?v=JWLsWbeXDAg&t=242s>))

A person still reads the report before it goes out, every time.

Your next skill can be the checker itself. ([4:14](<https://www.youtube.com/watch?v=JWLsWbeXDAg&t=254s>)) It does the first pass. You still sign off.

Want your team on it? Share skills on Team or Enterprise plans, or send teammates the zip file.

## The free prompt for your own report

Copy everything in the box into Claude. It walks you through the same steps on your own report, 1 question at a time.

```text
I run a small trades business. I just watched how to build a Claude skill in 4 steps:
say what done looks like, let the Skill Creator build it, test it on made-up numbers,
then check the report against what went in.

Help me do it for 1 report I rebuild by hand. Ask me 1 question at a time and wait
for my answer. Use plain words. No tech talk.

Step 1. Ask me which report I rebuild by hand every week, month or quarter. If I'm not
sure, ask what I copy from last time and change the numbers on. Help me pick 1.

Step 2. Help me write what done looks like, as a short checklist. Ask me, 1 at a time:
- Where does last time's version live, and what file type is it?
- Where do the new numbers come from?
- What has to stay the same? The layout, the logo, the colours, the fonts.
- What is allowed to change? Usually only the words, the numbers and the dates.
- What should happen when a number is missing? Default: highlight it in yellow so a
  person fills it in.
- Is there a number that should never change from 1 report to the next? A home count,
  a contract total, a square footage. Name it.
Then show me my finished-report checklist, 4 to 6 lines, in my own words.

Step 3. Write me the message to paste into a NEW chat with Claude's Skill Creator. It
should say: help me create a skill from this checklist, then list my checklist. Tell me
which files to attach: last time's report, and my brand guide if I have 1. Remind me
to answer its questions the way I'd brief a new hire, give the skill a plain name, save
it, and check it's turned on under Customize, then Skills.

Step 4. Write me a test. Give me a message for a fresh chat that asks Claude to make up
next period's numbers for this report as test numbers only. Then the line to run my
skill on them. Tell me what to look for: same layout, new dates, gaps highlighted.

Step 5. Write me the check. Give me a message for another new chat: compare the new
report with the old one, the numbers that went in and my checklist, and list every
mismatch and every missed checklist item in a table. Tell me that when it finds
something, I fix it by hand, add a checklist line so the skill catches it next time,
and put that line into the skill.

Rules for you:
- Use only what I tell you. Don't make up my numbers, my prices or my file names.
- A person still reads the report before it goes out. Say so once, at the end.
- Keep every answer short. I'm busy.
```

## Your move today

Pick 1 report you rebuild by hand. Write its checklist today.

Not sure how to write a line an AI can follow? I wrote about the [4 lines that work](/blog/sop-for-small-business/). And if a long chat starts losing track of your details, here's how the [Claude context window](/blog/claude-context-window/) fills up.

Want help with this? See the [2 ways to start](#start) below.

I'm in Your Corner. Now, Go Own It.
