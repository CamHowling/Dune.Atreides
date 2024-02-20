export class TreacheryCategory {
    static readonly WeaponProjectile = new TreacheryCategory(1, "Weapon - Projectile", 'TBD');
    static readonly WeaponPoison = new TreacheryCategory(2, "Weapon - Poison", 'TBD');
    static readonly WeaponPoisonSpecial = new TreacheryCategory(3, "Weapon - Poison - Special", 'TBD');
    static readonly WeaponSpecial = new TreacheryCategory(4, "Weapon - Special", 'TBD');
    static readonly DefenseProjectile = new TreacheryCategory(5, "Defense - Projectile", 'TBD');
    static readonly DefensePoison = new TreacheryCategory(6, "Defense - Poison", 'TBD');
    static readonly DefenseSpecial = new TreacheryCategory(7, "Defense - Special", 'TBD');
    static readonly DefenseWeaponSpecial = new TreacheryCategory(8, "Defense - Weapon- Special", 'TBD');
    static readonly Special = new TreacheryCategory(9, "Special", 'TBD');
    static readonly SpecialLeader = new TreacheryCategory(10, "Special - Leader", 'TBD');
    static readonly SpecialStorm = new TreacheryCategory(11, "Special - Storm", 'TBD');
    static readonly SpecialMovement = new TreacheryCategory(12, "Special - Movement", 'TBD');
    static readonly SpiceBlow = new TreacheryCategory(13, "Spice Blow - Special", 'TBD');
    static readonly WorthlessCard = new TreacheryCategory(14, "Worthless Card", 'TBD');
    static readonly RicheseSpecial = new TreacheryCategory(15, "Special", 'TBD');
    static readonly RicheseSpecialMovement = new TreacheryCategory(16, "Special - Movement", 'TBD');
    static readonly RicheseDefensePoison = new TreacheryCategory(17, "Defense - Poison", 'TBD');
    static readonly RicheseWeaponSpecial = new TreacheryCategory(18, "Weapon - Special", 'TBD');

    static RicheseCategories: TreacheryCategory[] = [
        TreacheryCategory.RicheseSpecial, 
        TreacheryCategory.RicheseSpecialMovement, 
        TreacheryCategory.RicheseDefensePoison, 
        TreacheryCategory.RicheseWeaponSpecial
    ]

    private constructor(
        public readonly id: number, 
        public readonly name: string, 
        public readonly icon: string) {
    }

    toString() {
        return this.name;
    }
}
