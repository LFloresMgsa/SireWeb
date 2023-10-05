export interface MenuItem {
    label: string;
    url: string;
    parent: number;
    roles: string;
    tabOrder: number;
    children: MenuItem[];
}

