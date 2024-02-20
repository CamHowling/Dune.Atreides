export class Expansion {
    static Expansions: Expansion[] = [];

    static readonly BaseGame = new Expansion(0, "Base Game", 'TBD');
    static readonly TleilaxuAndIxian = new Expansion(1, "Tleilaxu and Ixian", 'expansion 1.png');
    static readonly ChoamAndRichese = new Expansion(2, "Choam and Richese", 'expansion 2.png');
    static readonly EcazAndMoritani = new Expansion(3, "Ecaz and Moritani", 'expansion 3.png');

    private constructor(
        public readonly id: number, 
        public readonly name: string, 
        public readonly icon: string) {
            Expansion.Expansions.push(this);
    }

    toString() {
        return this.name;
    }
}
