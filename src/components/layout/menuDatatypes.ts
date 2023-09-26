export interface MenuItem {
    label: string;
    url: string;
    parent: number;
    children: MenuItem[];
}

