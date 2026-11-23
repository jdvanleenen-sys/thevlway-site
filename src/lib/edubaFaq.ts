import { EDUBAWARE_FOUNDING_SEATS, EDUBAWARE_PRICE, EDUBAWARE_REFUND_DAYS } from '../consts';

// One source for the visible questions and the search data, so they can never disagree.
export const EDUBAWARE_FAQ = [
  {
    q: 'Do I need to be technical?',
    a: 'No. You click, type and read. The lessons use plain words, and you never have to write code.',
  },
  {
    q: 'What if I am not in Clief Notes yet?',
    a: 'You can still start here. Clief Notes is a free place to learn the method from Jake, and the link is on this page.',
  },
  {
    q: 'Why pay when Clief Notes is free?',
    a: 'Clief Notes teaches the method. You pay me to look at your own work, sit in your chat and give you one fix each week.',
  },
  {
    q: 'Should I understand it or build it?',
    a: 'Start free if you are still working out what this is. Take a founding seat if you have a task and want it running.',
  },
  {
    q: 'Is the school finished?',
    a: `Not yet. The first lessons are ready, and I finish the last three with the first group. That is why this is the founding price, ${EDUBAWARE_PRICE} a month.`,
  },
  {
    q: 'What kind of task works best?',
    a: 'Something you repeat every week with mostly the same steps, like quotes, invoices, job notes or follow-up emails.',
  },
  {
    q: 'How much of your time do I get?',
    a: `This is a school, not private coaching. The AI coach is there whenever you work. I read your work, give you one fix each week and join your chat when you need a person. That is why I am keeping it to ${EDUBAWARE_FOUNDING_SEATS} founding seats.`,
  },
  {
    q: 'What if it is not for me?',
    a: `Email me within ${EDUBAWARE_REFUND_DAYS} days of your first payment and I refund it in full. After that, you can cancel any time.`,
  },
] as const;
