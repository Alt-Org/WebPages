export enum GroupType {
    GameDesign = 'Pelisuunnittelu',
    Graphic = "Grafiikka",
    LogoGraphic = 'Grafiikka, logo',
    GameGraphic = 'Grafiikka, peli',
    GameAnimation= 'Grafiikka, animaatio',
    GameCode = 'Koodi: peli',
    APICode = 'Koodi: API',
    WebPagesCode = 'Koodi: nettisivut',
    Sound = 'Äänisuunnittelu',
    Comics = 'Sarjakuva',
    Prod = 'Tuotanto',
    OthersGame = 'Pelinkehityksessä mukana',
    OthersComics = 'Sarjakuvassa  mukana',
    Others = 'Erityiskiitokset',
}

export enum MemberStatus{
    voluntary = 'vapaaehtoinen',
    worker = 'työntekijä',
    intern = 'työharjoittelija'
}

export interface GroupWithMember {
    group: GroupType,
    workers: Member[]
}

export interface Member {
    id: number;
    name: string;
    imgSrc?: string;
    role?: string;
    email?: string;
    phone?: string;
    github?: string;
    discord?: string;
    trello?: string;
    status?: MemberStatus;
    workPeriod?: string;
    site?: string;
    linkedin?: string
}
