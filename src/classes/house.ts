import { atreides, beneGesserit, choam, ecaz, emperor, fremen, harkonen, ixian, moritani, richeseGrey, spacingGuild, tleilaxu } from "@/settings/colours";

export class House {
    static Houses: House[] = [];

    static Fremen = new House(1, "Fremen", fremen, 'fremen.png', 0, false, 4, 1);
    static Atreides = new House(2, "Atreides", atreides, 'atreides.png', 0, true, 4, 1);
    static Harkonen = new House(3, "Harkonen", harkonen, 'harkonen.png', 0, false, 8, 2);
    static BeneGesserit = new House(4, "Bene Gesserit", beneGesserit, 'bene gesserit.png', 0, false, 4, 1);
    static SpacingGuild = new House(5, "Spacing Guild", spacingGuild, 'spacing guild.png', 0, false, 4, 1);
    static Emperor = new House(6, "Emperor", emperor, 'emperor.png', 0, false, 4, 1);

    static Tleilaxu = new House(7, "Tleilaxu", tleilaxu, 'tleilaxu.png', 1, false, 4, 1);
    static Ixian = new House(8, "Ixian", ixian, 'ixian.png', 1, false, 4, 1);

    static Choam = new House(9, "Choam", choam, 'choam.png', 2, false, 5, 1); 
    static Richese = new House(10, "Richese", richeseGrey, 'richese black.png', 2, false, 4, 1);

    static Ecaz = new House(11, "Ecaz", ecaz, 'ecaz.png', 3, false, 4, 1);
    static Moritani = new House(12, "Moritani", moritani, 'moritani.png', 3, false, 4, 1);

    private constructor(
        public readonly id: number, 
        public readonly name: string, 
        public readonly colour: string, 
        public readonly icon: string, 
        public readonly expansionId: number,
        public readonly alwaysActive: boolean,
        public readonly maximumHandSize: number,
        public cardsInHand: number
        ) {
            House.Houses.push(this);
    }

    toString() {
        return this.name;
    }

    isHandFull(): boolean {
        return this.cardsInHand >= this.maximumHandSize;
    }
}
