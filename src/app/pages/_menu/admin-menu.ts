import { NbMenuItem } from '@nebular/theme';

export const ADMIN_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'nb-home',
    link: '/pages/dash',
    home: true,
  },
  {
    title: 'Startups',
    icon: 'nb-lightbulb',
    link: '/pages/startups',
  },
  {
    title: 'Corporations',
    icon: 'nb-power',
    link: '/pages/corporations',
  },
  {
    title: 'Portfolio',
    icon: 'nb-flame-circled',
    link: '/pages/portfolio',
  },
  {
    title: 'Dealflows',
    icon: 'nb-loop',
    link: '/pages/dealflowlists',
  },
  {
    title: 'Top 20',
    icon: 'nb-grid-a-outline',
    link: '/pages/top20lists',
  },
  {
    title: 'Top 100',
    icon: 'nb-grid-b-outline',
    link: '/pages/top100lists',
  },
];
