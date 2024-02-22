import { House } from "./house";

export class UnknownTreachery {
    static UnknownTreacheryCards: UnknownTreachery[] = [];

    public readonly id: string;
    public readonly name: string;
    public player: House;
    public banner: string;
    public isRevealed: boolean;
    public isDiscarded: boolean;
    public originHouse?: House;

    public constructor(id: string, name: string, player: House, banner: string, isDiscarded: boolean, originHouse?: House) {
        this.id = id;
        this.name = name;
        this.player = player;
        this.banner = banner;
        this.isRevealed = false;
        this.isDiscarded = false;
        this.originHouse = originHouse;

        UnknownTreachery.UnknownTreacheryCards.push(this)
    }

    toString() {
        return this.name;
    }   
}