export class TreacheryCategory {
    static readonly WeaponProjectile = new TreacheryCategory(1, "Weapon - Projectile", 'projectile weapon.png', 'red large.png');
    static readonly WeaponPoison = new TreacheryCategory(2, "Weapon - Poison", 'poison weapon.png', 'red large.png');
    static readonly WeaponPoisonSpecial = new TreacheryCategory(3, "Weapon - Poison - Special", 'poison weapon.png', 'red large.png');
    static readonly WeaponSpecial = new TreacheryCategory(4, "Weapon - Special", 'special weapon.png', 'red large.png');
    static readonly DefenseProjectile = new TreacheryCategory(5, "Defense - Projectile", 'projectile defense.png', 'blue large.png');
    static readonly DefensePoison = new TreacheryCategory(6, "Defense - Poison", 'poison defense.png', 'blue large.png');
    static readonly DefenseSpecial = new TreacheryCategory(7, "Defense - Special", 'special defense.png', 'blue large.png');
    static readonly DefenseWeaponSpecial = new TreacheryCategory(8, "Defense - Weapon- Special", 'special defense.png', 'blue large.png');
    static readonly Special = new TreacheryCategory(9, "Special", 'special.png', 'green large.png');
    static readonly SpecialLeader = new TreacheryCategory(10, "Special - Leader", 'special.png', 'green large.png');
    static readonly SpecialStorm = new TreacheryCategory(11, "Special - Storm", 'special.png', 'green large.png');
    static readonly SpecialMovement = new TreacheryCategory(12, "Special - Movement", 'special.png', 'green large.png');
    static readonly SpiceBlow = new TreacheryCategory(13, "Spice Blow - Special", 'special.png', 'green large.png');
    static readonly WorthlessCard = new TreacheryCategory(14, "Worthless Card", 'worthless.png', 'tan large.png');
    static readonly RicheseSpecial = new TreacheryCategory(15, "Special", 'richese.png', 'silver large.png');
    static readonly RicheseSpecialMovement = new TreacheryCategory(16, "Special - Movement", 'richese.png', 'silver large.png');
    static readonly RicheseDefensePoison = new TreacheryCategory(17, "Defense - Poison", 'richese.png', 'silver large.png');
    static readonly RicheseWeaponSpecial = new TreacheryCategory(18, "Weapon - Special", 'richese.png', 'silver large.png');

    static WeaponCategories: TreacheryCategory[] = [
        TreacheryCategory.WeaponProjectile,
        TreacheryCategory.WeaponPoison,
        TreacheryCategory.WeaponPoisonSpecial,
        TreacheryCategory.WeaponSpecial,
    ];

    static DefenseCategories: TreacheryCategory[] = [
        TreacheryCategory.DefenseProjectile,
        TreacheryCategory.DefensePoison,
        TreacheryCategory.DefenseSpecial,
        TreacheryCategory.DefenseWeaponSpecial,
    ];

    static SpecialCategories: TreacheryCategory[] = [
        TreacheryCategory.Special,
        TreacheryCategory.SpecialLeader,
        TreacheryCategory.SpecialStorm,
        TreacheryCategory.SpecialMovement,
        TreacheryCategory.SpiceBlow,
    ];

    static WorthlessCategories: TreacheryCategory[] = [
        TreacheryCategory.WorthlessCard,
    ];

    static RicheseCategories: TreacheryCategory[] = [
        TreacheryCategory.RicheseSpecial, 
        TreacheryCategory.RicheseSpecialMovement, 
        TreacheryCategory.RicheseDefensePoison, 
        TreacheryCategory.RicheseWeaponSpecial
    ]

    private constructor(
        public readonly id: number, 
        public readonly name: string, 
        public readonly icon: string,
        public readonly banner: string
        ) {
    }

    toString() {
        return this.name;
    }

    
}
