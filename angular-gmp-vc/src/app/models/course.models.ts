export interface IAuthor {
    id: number;
    name: string;
    disabled?: boolean;
}

export interface ICourseItem {
    id: number;
    name: string;
    date: Date;
    length: number;
    description: string;
    topRated: boolean;
    authors?: IAuthor[];
}
