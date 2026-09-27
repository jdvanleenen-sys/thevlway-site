---
title: 'Claude + Airtable: Build a Painting Quote on Your Phone'
description: 'Claude + Airtable for business owners: connect them on the free plans, give Claude your shop rules, and say a job into your phone. Airtable does the math.'
pubDate: 2026-09-26
keyword: 'claude airtable'
youtubeId: 'wA-0Hr_s2Ww'
draft: false
---

[![Watch: Claude + Airtable, build a painting quote on your phone](/blog/claude-airtable/video-thumbnail.png)](https://www.youtube.com/watch?v=wA-0Hr_s2Ww)

*This video sets up Claude and Airtable from scratch on a demo painting shop, then quotes a job from a phone. Every step in this post is on screen in it.*

Claude + Airtable is the simplest way I know for a trades owner to quote a job from the site.

You connect Claude to Airtable. You give Claude the rules of your shop. Then you say the job into your phone, and every line lands in Airtable, priced off your own price list.

Claude picks the item and how much of it. Airtable does the math. You check it before anyone sees a number.

Here's the whole setup.

## The problem is the gap between the notes and the prices

The customer asks, can you give me a price today?

Usually that means scribbled notes, a coffee stain, and a quote built tonight.

When I was building houses and doing rentals, I'd walk through and take notes. Then later, it took more time to sit down and quote it.

For a painter it's the same. The job is in the notes, and the prices are somewhere else. Moving everything into the right place by hand is the part that eats the evening.

## What you need

- Claude on your phone. The free plan works.
- A free Airtable account.
- A base to connect to. I use a demo, Summit Coat Painting, a made-up painting shop. It isn't real, and its prices are made up.

Claude's own help pages say [connectors are available on every plan](https://support.claude.com/en/articles/11176164-use-connectors-to-extend-claude-s-capabilities), and that [free accounts can make up to 5 Projects](https://support.claude.com/en/articles/9517075-what-are-projects).

## Step 1: copy the demo into your Airtable

Open the Summit Coat link and copy the base into your own Airtable. Now you have your own copy, with the price list already in it.

Every rate lives in 1 place. Change a price there and every new quote uses it.

## Step 2: connect Claude to Airtable

In Claude, open settings, then connectors, then Airtable. Sign in and give it access to your Summit Coat base.

No codes to copy. You just sign in.

It works on your phone too, because the connection belongs to your Claude account, not your computer.

## Step 3: give Claude the context of your shop

This is the step most setups skip, and it's the one that matters.

In the video I asked the same thing twice: "Test job, 1 Test St, 403-555-0199."

In a plain chat, Claude connected to Airtable just fine. It made the customer and the job. But it didn't read anything back, and it never asked for an email.

Connecting isn't the same as knowing your shop.

So I made a Claude Project. A project is a folder in Claude that holds your rules. I pasted in the instructions: how to take a job down, and what it must never do, like never type a dollar amount and never send anything. Then I uploaded 4 files about the shop: what it does, how it prices, and the jobs it turns down.

Same request again, inside the Project. This time Claude read the name, address and phone back before it created anything. It flagged that "Test job" looked like a voice-to-text slip. And it asked for the email.

Same connection, better answer, because now it knows your shop.

## Step 4: quote a job from your phone

I opened Claude on my phone, and the Project was already there. Then I just said the job:

> A 2,000 square foot house, walls in Benjamin Moore Calm. 1 feature wall in Hale Navy. 42 feet of wood railing, and 16 feet of shelves.

It asked about anything it couldn't be sure of. My phone heard "Calm" as "Com", so it asked for the colour. The price list has 2 kinds of closet shelving, so it asked which one I meant.

Each piece landed in Airtable as its own line, and each line pulled its rate from the price list:

| Line | Amount |
|---|---|
| Walls, 2,000 floor square feet | $5,500.00 |
| Feature wall | $225.00 |
| Wood railing, 42 feet | $1,596.00 |
| Closet shelving, 16 feet | $224.00 |

Subtotal $7,545.00. GST $377.25. Total $7,922.25.

Claude picked the item and how much of it. It never typed a dollar amount into Airtable. Airtable did the math.

## Step 5: check it

I opened the job in Airtable on my phone and read every line and the total. If something's wrong, you fix it before you tick the box.

Then I ticked Owner checked. Until you do, the job says NOT READY, and nothing goes to the customer.

So, can you give me a price today? Yes, and it's checked, not guessed.

## Get the same setup

The Summit Coat demo and a setup guide are free in my Skool community, [See It, Build It, Own It](https://www.skool.com/see-it-build-it-own-it). The guide walks you through the copy, the connection and the Project, with a prompt that sets up the emails and approval links for your own copy.

Swap the demo prices for your own before you quote a real job.

If you want to see what happens after the quote, the [AI for painting business](/blog/ai-for-painting-business/) post walks the same demo shop from the quote all the way to getting paid.

I'm in Your Corner. Now, Go Own It.
