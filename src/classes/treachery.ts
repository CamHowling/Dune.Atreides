import { Expansion } from "./expansion";
import { House } from "./house";
import { LocationType } from "./locationType";
import { TreacheryCategory } from "./treacheryCategory";

//TODO move class instances
export class Treachery {
    static TreacheryCards: Treachery[] = [];

    static readonly Crysknife = new Treachery(1, "Crysknife", TreacheryCategory.WeaponProjectile, [Expansion.BaseGame.id]);
    static readonly HunterSeeker = new Treachery(2, "Hunter Seeker", TreacheryCategory.WeaponProjectile, [Expansion.TleilaxuAndIxian.id]);
    static readonly MaulerPistol = new Treachery(3, "Mauler Pistol", TreacheryCategory.WeaponProjectile, [Expansion.BaseGame.id]);
    static readonly SlipTip = new Treachery(4, "Slip Tip", TreacheryCategory.WeaponProjectile, [Expansion.BaseGame.id]);
    static readonly Stunner = new Treachery(5, "Stunner", TreacheryCategory.WeaponProjectile, [Expansion.BaseGame.id]);    

    static readonly BasiliaWeapon = new Treachery(6, "Basilia Weapon", TreacheryCategory.WeaponPoison, [Expansion.TleilaxuAndIxian.id]);
    static readonly Chaumas = new Treachery(7, "Chaumas", TreacheryCategory.WeaponPoison, [Expansion.BaseGame.id]);
    static readonly Chaumurky = new Treachery(8, "Chaumurky", TreacheryCategory.WeaponPoison, [Expansion.BaseGame.id]);
    static readonly EllacaDrug = new Treachery(9, "EllacaDrug", TreacheryCategory.WeaponPoison, [Expansion.BaseGame.id]);
    static readonly GomJabbar = new Treachery(10, "Gom Jabbar", TreacheryCategory.WeaponPoison, [Expansion.BaseGame.id]);

    static readonly ArtilleryStrike = new Treachery(11, "Artillery Strike", TreacheryCategory.WeaponSpecial, [Expansion.TleilaxuAndIxian.id, Expansion.ChoamAndRichese.id]);
    static readonly Lasgun = new Treachery(12, "Lasgun", TreacheryCategory.WeaponSpecial, [Expansion.BaseGame.id]);    
    static readonly PoisonBlade = new Treachery(13, "Poison Blade", TreacheryCategory.WeaponSpecial, [Expansion.TleilaxuAndIxian.id]);
    static readonly PoisonTooth = new Treachery(14, "Poison Tooth", TreacheryCategory.WeaponPoisonSpecial, [Expansion.TleilaxuAndIxian.id]);
    static readonly WeirdingWay = new Treachery(15, "Weirding Way", TreacheryCategory.WeaponSpecial, [Expansion.TleilaxuAndIxian.id]);

    static readonly Shield1 = new Treachery(16, "Shield", TreacheryCategory.DefenseProjectile, [Expansion.BaseGame.id]);
    static readonly Shield2 = new Treachery(17, "Shield", TreacheryCategory.DefenseProjectile, [Expansion.BaseGame.id]);
    static readonly Shield3 = new Treachery(18, "Shield", TreacheryCategory.DefenseProjectile, [Expansion.BaseGame.id]);
    static readonly Shield4 = new Treachery(19, "Shield", TreacheryCategory.DefenseProjectile, [Expansion.BaseGame.id]);
    static readonly Shield5 = new Treachery(20, "Shield", TreacheryCategory.DefenseProjectile, [Expansion.TleilaxuAndIxian.id]);

    static readonly Snooper1 = new Treachery(21, "Snooper", TreacheryCategory.DefensePoison, [Expansion.BaseGame.id]);
    static readonly Snooper2 = new Treachery(22, "Snooper", TreacheryCategory.DefensePoison, [Expansion.BaseGame.id]);
    static readonly Snooper3 = new Treachery(23, "Snooper", TreacheryCategory.DefensePoison, [Expansion.BaseGame.id]);
    static readonly Snooper4 = new Treachery(24, "Snooper", TreacheryCategory.DefensePoison, [Expansion.BaseGame.id]);
    static readonly Snooper5 = new Treachery(25, "Snooper", TreacheryCategory.DefensePoison, [Expansion.TleilaxuAndIxian.id]);

    static readonly ShieldSnooper = new Treachery(26, "Shield Snooper", TreacheryCategory.DefenseSpecial, [Expansion.TleilaxuAndIxian.id]);
    static readonly Chemistry = new Treachery(27, "Chemistry", TreacheryCategory.DefenseWeaponSpecial, [Expansion.TleilaxuAndIxian.id]);

    static readonly Baliset = new Treachery(28, "Baliset", TreacheryCategory.WorthlessCard, [Expansion.BaseGame.id]);
    static readonly JubbaCloak = new Treachery(29, "Jubba Cloak", TreacheryCategory.WorthlessCard, [Expansion.BaseGame.id]);
    static readonly Kulon = new Treachery(30, "Kulon", TreacheryCategory.WorthlessCard, [Expansion.BaseGame.id]);
    static readonly LaLaLa = new Treachery(31, "La, La, La", TreacheryCategory.WorthlessCard, [Expansion.BaseGame.id]);
    static readonly TripToGamont = new Treachery(32, "Trip To Gamont", TreacheryCategory.WorthlessCard, [Expansion.BaseGame.id]);
    static readonly KullWahad = new Treachery(33, "Kull Wahad", TreacheryCategory.WorthlessCard, [Expansion.TleilaxuAndIxian.id]);

    static readonly CheapHero1 = new Treachery(34, "Cheap Hero", TreacheryCategory.SpecialLeader, [Expansion.BaseGame.id]);
    static readonly CheapHero2 = new Treachery(35, "Cheap Hero", TreacheryCategory.SpecialLeader, [Expansion.BaseGame.id]);
    static readonly CheapHeroine = new Treachery(36, "Cheap Hero", TreacheryCategory.SpecialLeader, [Expansion.BaseGame.id]);
    static readonly Karama1 = new Treachery(37, "Karama", TreacheryCategory.Special, [Expansion.BaseGame.id]);
    static readonly Karama2 = new Treachery(38, "Karama", TreacheryCategory.Special, [Expansion.BaseGame.id]);
    static readonly Truthtrance1 = new Treachery(39, "Truthtrance", TreacheryCategory.Special, [Expansion.BaseGame.id]);
    static readonly Truthtrance2 = new Treachery(40, "Truthtrance", TreacheryCategory.Special, [Expansion.BaseGame.id]);
    static readonly Hajr = new Treachery(41, "Hajr", TreacheryCategory.SpecialMovement, [Expansion.BaseGame.id]);
    static readonly TleilaxuGhola = new Treachery(42, "Tleilaxu Ghola", TreacheryCategory.Special, [Expansion.BaseGame.id]);
    static readonly FamilyAtomics = new Treachery(43, "Family Atomics", TreacheryCategory.SpecialStorm, [Expansion.BaseGame.id]);
    static readonly WeatherControl = new Treachery(44, "Weather Control", TreacheryCategory.SpecialStorm, [Expansion.BaseGame.id]);

    static readonly Thumper = new Treachery(45, "Thumper", TreacheryCategory.SpecialStorm, [Expansion.TleilaxuAndIxian.id]);
    static readonly Harvester = new Treachery(46, "Harvester", TreacheryCategory.SpecialStorm, [Expansion.TleilaxuAndIxian.id]);
    static readonly Amal = new Treachery(47, "Amal", TreacheryCategory.Special, [Expansion.TleilaxuAndIxian.id]);

    static readonly Reinforcements = new Treachery(48, "Reinforcements", TreacheryCategory.Special, [Expansion.EcazAndMoritani.id]);
    static readonly Recruits = new Treachery(49, "Recruits", TreacheryCategory.Special, [Expansion.EcazAndMoritani.id]);
    static readonly HarassAndWithdraw = new Treachery(50, "Harass And Withdraw", TreacheryCategory.Special, [Expansion.EcazAndMoritani.id]);

    static readonly SemutaDrug = new Treachery(51, "Semuta Drug", TreacheryCategory.RicheseSpecial, [Expansion.ChoamAndRichese.id]);
    static readonly JuiceOfSapho = new Treachery(52, "Juice Of Sapho", TreacheryCategory.RicheseSpecial, [Expansion.ChoamAndRichese.id]);
    static readonly NullentropyBox = new Treachery(53, "Nullentropy Box", TreacheryCategory.RicheseSpecial, [Expansion.ChoamAndRichese.id]);
    static readonly ResidualPoison = new Treachery(54, "Residual Poison", TreacheryCategory.RicheseSpecial, [Expansion.ChoamAndRichese.id]);
    static readonly Distrans = new Treachery(55, "Distrans", TreacheryCategory.RicheseSpecial, [Expansion.ChoamAndRichese.id]);
    static readonly Karama3 = new Treachery(56, "Karama", TreacheryCategory.RicheseSpecial, [Expansion.ChoamAndRichese.id]);

    static readonly Ornithopter = new Treachery(57, "Ornithopter", TreacheryCategory.RicheseSpecialMovement, [Expansion.ChoamAndRichese.id]);

    static readonly MirrorWeapon = new Treachery(58, "Mirror Weapon", TreacheryCategory.Special, [Expansion.ChoamAndRichese.id]);
    static readonly StoneBurner = new Treachery(59, "Stone Burner", TreacheryCategory.Special, [Expansion.ChoamAndRichese.id]);

    static readonly PortableSnooper = new Treachery(60, "Portable Snooper", TreacheryCategory.Special, [Expansion.ChoamAndRichese.id]);

    public readonly id: number;
    public readonly name: string;
    public readonly category: TreacheryCategory;
    public readonly expansionIds: number[];
    public locationType: LocationType;
    public player: House | undefined;
    public isDiscarded: boolean;

    private constructor(id: number, name: string, category: TreacheryCategory, expansionIds: number[]) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.expansionIds = expansionIds;

        this.locationType = LocationType.Deck;
        this.isDiscarded = false;

        Treachery.TreacheryCards.push(this)
    }

    toString() {
        return this.name;
    }    
}
