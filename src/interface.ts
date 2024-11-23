export interface Room {
    sleeps: number
    number: number
    price: number
}

export type Hotel = Record<string, Room>

export type Result = { rooms: string, total: number, guestsRest: number };

export type RecursiveResult = { rooms: string[], guestsRest: number };
