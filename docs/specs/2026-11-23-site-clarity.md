# Site clarity pass: 2026-11-23

## Done means
A person who has never heard of ICM or EdubaWare can tell, from any main page, that they get a
real teacher and can work with their crew and an AI coach in the same live chat, and no two
pages disagree about the offer.

## Decisions from Jeff
- Many people can work in the same chat at the same time. This is the main advantage.
- The two free EdubaWare lessons are the first free door. Clief Notes stays as the source.

## The 11 fixes
1. Say the same-chat advantage on the home, EdubaWare, About and Teams pages.
2. Put the teacher in the home page hero.
3. Make "free" mean the two free lessons on every door.
4. Stop promising Jeff in the chat on the free tier.
5. Say on the home page that the last three lessons are still being finished.
6. State the same paid offer everywhere: $30 USD per person, per month, five founding seats.
7. Back up "you keep what you build" with the download step.
8. Remove retired course names from the blog.
9. Explain how the four stages fit with the six folders.
10. Remove the promise of a Week 2 page that does not exist.
11. Replace the broken Get Cyber Safe link.

## Standard words
| Thing | Word |
|---|---|
| The AI inside EdubaWare | AI coach |
| One person's place | workspace |
| A team's place | shared workspace |
| Where people talk | chat |
| What you bring | weekly job |
| ICM, on first use | a way of setting up folders and notes that show AI where to look |

Room stays only in lesson names and the shop scenes on the home page.

## The loop
- **Checks:** `scripts/check-site-clarity.mjs`, run on the built site. Pass or fail, and each
  fail names its page.
- **Rule:** all pass, stop. Any fail, change only what failed and run every check again.
- **Budget:** three attempts.
- **Fixed target:** every attempt is judged against this list, never the last attempt.
- **Marginal:** if an attempt turns no fail into a pass, stop and keep the best attempt.
- **Gate:** nothing merges to `main` or goes live without Jeff's go.

## Must not change
Prices, refund terms, the affiliate disclosure, the exact Masters credit, and post URLs.
No claim that EdubaWare replaces another AI subscription, and no return-on-investment claim.
