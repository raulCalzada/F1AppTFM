import { Circuit } from './circuit';
import { Constructor } from './constructor';
import { Driver } from './driver';

export interface Time {
    millis: string;
    time: string;
}

export interface Result {
    number: string;
    position: string;
    positionText: string;
    points: string;
    Driver: Driver;
    Constructor: Constructor;
    grid: string;
    laps: string;
    status: string;
    Time?: Time;
}

export interface Race {
    season: string;
    round: string;
    url: string;
    raceName: string;
    Circuit: Circuit;
    date: string;
    Results: Result[];
}

export interface RaceTable {
    season: string;
    Races: Race[];
}

export interface MRData {
    xmlns: string;
    series: string;
    url: string;
    limit: string;
    offset: string;
    total: string;
    RaceTable: RaceTable;
}

export interface ApiResponse {
    MRData: MRData;
}

export interface Result {
    number: string;
    position: string;
    positionText: string;
    points: string;
    Driver: Driver;
    Constructor: Constructor;
    grid: string;
    laps: string;
    status: string;
    Time?: Time;
}
