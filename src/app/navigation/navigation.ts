import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id: 'makeflow',
        title: 'NEW STRATEGY',
        type: 'item',
        icon: 'add',
        url: '/editor',
    },
    {
        id: '',
        title: 'Home',
        type: 'item',
        icon: 'home',
        url: '/home/dashboard',
    },
    {
        id: 'dashboard',
        title: 'Discover',
        type: 'item',
        icon: 'dashboard',
        url: '/home/discover',
    },
    {
        id: 'flows',
        title: 'Strategies',
        type: 'item',
        icon: 'assistant',
        url: '/home/strategies',
    },
    {
        id: 'myapps',
        title: 'My Apps',
        type: 'item',
        icon: 'apps',
        url: '/home/myapps',
    },
];
