
export class LocationType {
    static Locations: LocationType[] = [];

    static Deck = new LocationType(1, "Deck");
    static Player = new LocationType(2, "Player");
    static Discard = new LocationType(3, "Discard");
    static Removed = new LocationType(4, "Removed");
    static Revealed = new LocationType(5, "Revealed");
    static PlayerUnknown = new LocationType(6, "Player Unknown");
    static DiscardUnknown = new LocationType(7, "Discard Unknown");


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
