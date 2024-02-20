import { atreides, beneGesserit, choam, ecaz, emperor, fremen, harkonen, ixian, moritani, richeseGrey, spacingGuild, tleilaxu } from "@/settings/colours";

export class House {
    static Fremen = new House(1, "Fremen", fremen, 'fremen.png', 0, false);
    static Atreides = new House(2, "Atreides", atreides, 'atreides.png', 0, true);
    static  Harkonen = new House(3, "Harkonen", harkonen, 'harkonen.png', 0, false);
    static BeneGesserit = new House(4, "Bene Gesserit", beneGesserit, 'bene gesserit.png', 0, false);
    static SpacingGuild = new House(5, "Spacing Guild", spacingGuild, 'spacing guild.png', 0, false);
    static Emperor = new House(6, "Emperor", emperor, 'emperor.png', 0, false);

    static Tleilaxu = new House(7, "Tleilaxu", tleilaxu, 'tleilaxu.png', 1, false);
    static Ixian = new House(8, "Ixian", ixian, 'ixian.png', 1, false);

    static Choam = new House(9, "Choam", choam, 'choam.png', 2, false);
    static Richese = new House(10, "Richese", richeseGrey, 'richese black.png', 2, false);

    static Ecaz = new House(11, "Atreides", ecaz, 'ecaz.png', 3, false);
    static Moritani = new House(12, "Atreides", moritani, 'moritani.png', 3, false);

    private constructor(
        public readonly id: number, 
        public readonly name: string, 
        public readonly colour: string, 
        public readonly icon: string, 
        public readonly expansionId: number,
        public readonly alwaysActive: boolean) {
    }

    toString() {
        return this.name;
    }
}
