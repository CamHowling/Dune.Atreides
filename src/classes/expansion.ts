export class Expansion {
    static readonly BaseGame = new Expansion(0, "Base Game", 'TBD');
    static readonly TleilaxuAndIxian = new Expansion(1, "Tleilaxu and Ixian", 'TBD');
    static readonly ChoamAndRichese = new Expansion(2, "Choam and Richese", 'TBD');
    static readonly EcazAndMoritani = new Expansion(3, "Ecaz and Moritani", 'TBD');

    private constructor(
        public readonly id: number, 
        public readonly name: string, 
        public readonly icon: string) {
    }

    toString() {
        return this.name;
    }
}
