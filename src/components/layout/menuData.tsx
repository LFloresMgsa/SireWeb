// MenuData.tsx
import { MenuItem } from "./menuDatatypes";


export const menuData: MenuItem[] = [
    {
        label: 'Inicio',
        url: 'home',
        parent: 1,
        roles: ' Root, All, Administrator, User',
        tabOrder: 1,
        children: [
            {
                label: 'Página principal',
                url: '/home',
                parent: 2,
                roles: ' Root, All, Administrator, User',
                tabOrder: 1,
                children: [],
            },            
        ],
    },
    {
        label: 'RVIE',
        url: '/rvie',
        parent: 1,
        roles: ' Root, Administrator, User',
        tabOrder: 2,
        children: [
            {
                label: 'Descarga',
                url: '/rvie/descarga',
                parent: 2,
                roles: ' Root, Administrator, User',
                tabOrder: 2,
                children: [],
            },
            {
                label: 'Comparativo',
                url: '/rvie/comparativo',
                parent: 2,
                roles: ' Root, Administrator, User',
                tabOrder: 2,
                children: [],
            },
            {
                label: 'Reemplazo',
                url: '/rvie/reemplazo',
                parent: 2,
                roles: ' Root, Administrator, User',
                tabOrder: 2,
                children: [],
            },

        ],
    },
    {
        label: 'RCE',
        url: '/rce',
        parent: 1,
        roles: ' Root, Administrator, User',
        tabOrder: 3,
        children: [
            {
                label: 'Descarga',
                url: '/rce/descarga',
                parent: 2,
                roles: ' Root, Administrator, User',
                tabOrder: 3,
                children: [],
            },
            {
                label: 'Comparativo',
                url: '/rce/comparativo',
                parent: 2,
                roles: ' Root, Administrator, User',
                tabOrder: 3,
                children: [],
            },
            {
                label: 'Reemplazo',
                url: '/rce/reemplazo',
                parent: 2,
                roles: ' Root, Administrator, User',
                tabOrder: 3,
                children: [],
            },
        ],
    },

    // {
    //     label: 'Salida',
    //     url: '/home',
    //     parent: 1,
    //     roles: ' All, Administrator, User',
    //     tabOrder: 4, 
    //     children: [
    //         {
    //             label: 'Salir del Sistema',
    //             url: '/home',
    //             parent: 2,
    //             roles: ' All, Administrator, User',
    //             tabOrder: 4, 
    //             children: [],
    //         },
    //     ]
    // },
];