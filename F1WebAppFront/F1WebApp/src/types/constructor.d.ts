export interface MRData {
    xmlns: string;
    series: string;
    url: string;
    limit: string;
    offset: string;
    total: string;
    ConstructorTable: ConstructorTable;
}

export interface ConstructorTable {
    season: string;
    Constructors: Constructor[];
}

export interface Constructor {
    constructorId: string;
    url: string;
    name: string;
    nationality: string;
}


export interface ConstructorStandings {
    position: string;
    positionText: string;
    points: string;
    wins: string;
    Constructor: Constructor;
}
