import { Treachery } from "./treachery";
import { UnknownTreachery } from "./unknownTreachery";

export class CardGroup {
    public readonly name: string;
    public readonly colour: string;
    public readonly cards?: Treachery[];
    public readonly unknownCards?: UnknownTreachery[];


    public constructor(
        name: string, 
        colour: string, 
        cards?: Treachery[],
        unknownCards?: UnknownTreachery[]
        ) {
            this.name = name;
            this.colour = colour;
            this.cards = cards;
            this.unknownCards = unknownCards;
    }

    toString() {
        return this.name;
    }
}
