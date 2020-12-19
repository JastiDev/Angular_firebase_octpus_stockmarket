import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'item',
        icon: 'dashboard',
        url: '/app/dashboard'
    },
    {
        id: 'flows',
        title: 'Flows',
        type: 'item',
        icon: 'assistant',
        url: '/app/flows'
    },
];
