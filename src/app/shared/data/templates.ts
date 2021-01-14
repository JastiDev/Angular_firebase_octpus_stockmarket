import * as fafa from '@fortawesome/free-solid-svg-icons';

export const STEP_TEMPLATES = [
  {
    type: 'buy',
    icon: fafa.faShoppingBasket,
    color: 'orange',
    title: 'Buy',
    description: 'This step adds a note to a conversation. Notes can be seen directly on Inbox, Conversations, and available via API, but aren\'t visible to the recipient of the conversation.',
  },
  {
    type: 'sell',
    icon: fafa.faMoneyBill,
    color: 'green',
    title: 'Sell',
    description: 'This step adds a note to a conversation. Notes can be seen directly on Inbox, Conversations, and available via API, but aren\'t visible to the recipient of the conversation.',
  },
  {
    type: 'signal',
    icon: fafa.faMapSigns,
    color: 'blue',
    title: 'Signal',
    description: 'This step adds a note to a conversation. Notes can be seen directly on Inbox, Conversations, and available via API, but aren\'t visible to the recipient of the conversation.',
  },
];
