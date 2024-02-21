import { Treachery } from "./treachery";

export class CardGroup {
    public readonly name: string;
    public readonly colour: string
    public readonly cards: Treachery[]


    public constructor(
        name: string, 
        colour: string, 
        cards: Treachery[]) {
            this.name = name;
            this.colour = colour;
            this.cards = cards;
    }

    toString() {
        return this.name;
    }
}
