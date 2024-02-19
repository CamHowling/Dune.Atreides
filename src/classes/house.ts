export class House {
    static readonly Fremen = new House(1, "Fremen", '#ca842a', 'TBD', 0);
    static readonly Atreides = new House(2, "Atreides", '#49642b', 'TBD', 0);
    static readonly Harkonen = new House(3, "Harkonen", '#222326', 'TBD', 0);
    static readonly BeneGesserit = new House(4, "Bene Gesserit", '#1b336', 'TBD', 0);
    static readonly SpacingGuild = new House(5, "Spacing Guild", '#c3491e', 'TBD', 0);
    static readonly Emperor = new House(6, "Atreides", '#8a1d16', 'TBD', 0);

    static readonly Tleilaxu = new House(7, "Atreides", '#2c1a4', 'TBD', 1);
    static readonly Ixian = new House(8, "Atreides", '#7c7e82', 'TBD', 1);

    static readonly Choam = new House(9, "Atreides", '#CD2515', 'TBD', 2);
    static readonly Richese = new House(10, "Atreides", '#CACCBF', 'TBD', 2);

    static readonly Ecaz = new House(11, "Atreides", '#93348E', 'TBD', 3);
    static readonly Moritani = new House(12, "Atreides", '#3F95B4', 'TBD', 3);

    private constructor(
        public readonly id: number, 
        public readonly name: string, 
        public readonly colour: string, 
        public readonly icon: string, 
        public readonly expansionId: number) {
    }

    toString() {
        return this.name;
    }
}
