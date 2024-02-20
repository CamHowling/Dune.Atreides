
export class LocationType {
    static Locations: LocationType[] = [];

    static Deck = new LocationType(1, "Deck");
    static Player = new LocationType(2, "Player");
    static Discard = new LocationType(3, "Discard");

    private constructor(
        public readonly id: number, 
        public readonly name: string, 
        ) {
            LocationType.Locations.push(this);
    }

    toString() {
        return this.name;
    }
}
