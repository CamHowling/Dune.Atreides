import { House } from "./house";
import { LocationType } from "./locationType";

export class UnknownTreachery {
    public readonly id: string;
    public readonly name: string;
    public player?: House;
    public banner: string;
    public originHouse?: House;
    public locationType: LocationType;
    public hasAuctionMarker: boolean;
    public hasChoamMarker: boolean;

    public constructor(id: string, name: string, banner: string, location: LocationType, player?: House, originHouse?: House) {
        this.id = id;
        this.name = name;
        this.player = player;
        this.banner = banner;
        this.originHouse = originHouse;
        this.locationType = location;
        this.hasAuctionMarker = false;
        this.hasChoamMarker = false;
    }

    toString() {
        return this.name;
    }   
}