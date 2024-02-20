import { Expansion } from "./expansion";
import { TreacheryCategory } from "./treacheryCategory";

export class Treachery {
    //Names to be updated
    static readonly ProjectileWeapon1 = new Treachery(1, "NAME", TreacheryCategory.WeaponProjectile, [Expansion.BaseGame.id]);
    static readonly ProjectileWeapon2 = new Treachery(2, "NAME", TreacheryCategory.WeaponProjectile, [Expansion.BaseGame.id]);
    static readonly ProjectileWeapon3 = new Treachery(3, "NAME", TreacheryCategory.WeaponProjectile, [Expansion.BaseGame.id]);
    static readonly ProjectileWeapon4 = new Treachery(4, "NAME", TreacheryCategory.WeaponProjectile, [Expansion.BaseGame.id]);
    static readonly ProjectileWeapon5 = new Treachery(5, "NAME", TreacheryCategory.WeaponProjectile, [Expansion.TleilaxuAndIxian.id]);

    static readonly PoisonWeapon1 = new Treachery(6, "NAME", TreacheryCategory.WeaponPoison, [Expansion.BaseGame.id]);
    static readonly PoisonWeapon2 = new Treachery(7, "NAME", TreacheryCategory.WeaponPoison, [Expansion.BaseGame.id]);
    static readonly PoisonWeapon3 = new Treachery(8, "NAME", TreacheryCategory.WeaponPoison, [Expansion.BaseGame.id]);
    static readonly PoisonWeapon4 = new Treachery(9, "NAME", TreacheryCategory.WeaponPoison, [Expansion.BaseGame.id]);
    static readonly PoisonWeapon5 = new Treachery(10, "NAME", TreacheryCategory.WeaponPoison, [Expansion.TleilaxuAndIxian.id]);

    static readonly PoisonTooth = new Treachery(11, "Poison Tooth", TreacheryCategory.WeaponPoisonSpecial, [Expansion.TleilaxuAndIxian.id]);

    static readonly Lasgun = new Treachery(12, "Lasgun", TreacheryCategory.WeaponSpecial, [Expansion.BaseGame.id]);
    static readonly ArtilleryStrike = new Treachery(13, "Artillery Strike", TreacheryCategory.WeaponSpecial, [Expansion.TleilaxuAndIxian.id, Expansion.ChoamAndRichese.id]);
    static readonly WeirdingWay = new Treachery(14, "Weirding Way", TreacheryCategory.WeaponSpecial, [Expansion.TleilaxuAndIxian.id]);
    static readonly PoisonBlade = new Treachery(15, "Poison Blade", TreacheryCategory.WeaponSpecial, [Expansion.TleilaxuAndIxian.id]);

    static readonly ProjectileDefense1 = new Treachery(0, "NAME", TreacheryCategory.DefenseProjectile, [Expansion.BaseGame.id]);
    static readonly ProjectileDefense2 = new Treachery(0, "NAME", TreacheryCategory.DefenseProjectile, [Expansion.BaseGame.id]);
    static readonly ProjectileDefense3 = new Treachery(0, "NAME", TreacheryCategory.DefenseProjectile, [Expansion.BaseGame.id]);
    static readonly ProjectileDefense4 = new Treachery(0, "NAME", TreacheryCategory.DefenseProjectile, [Expansion.BaseGame.id]);
    static readonly ProjectileDefense5 = new Treachery(0, "NAME", TreacheryCategory.DefenseProjectile, [Expansion.TleilaxuAndIxian.id]);

    static readonly PoisonDefense1 = new Treachery(0, "NAME", TreacheryCategory.DefensePoison, [Expansion.BaseGame.id]);
    static readonly PoisonDefense2 = new Treachery(0, "NAME", TreacheryCategory.DefensePoison, [Expansion.BaseGame.id]);
    static readonly PoisonDefense3 = new Treachery(0, "NAME", TreacheryCategory.DefensePoison, [Expansion.BaseGame.id]);
    static readonly PoisonDefense4 = new Treachery(0, "NAME", TreacheryCategory.DefensePoison, [Expansion.BaseGame.id]);
    static readonly PoisonDefense5 = new Treachery(0, "NAME", TreacheryCategory.DefensePoison, [Expansion.TleilaxuAndIxian.id]);



    private constructor(
        public readonly id: number, 
        public readonly name: string, 
        public readonly category: TreacheryCategory,
        public readonly expansionIds: number[]
        ) {
    }

    toString() {
        return this.name;
    }
}
