export class TreacheryCategory {
    static readonly WeaponProjectile = new TreacheryCategory(1, "Weapon - Projectile", 'TBD');
    static readonly WeaponPoison = new TreacheryCategory(2, "Weapon - Poison", 'TBD');
    static readonly WeaponPoisonSpecial = new TreacheryCategory(3, "Weapon - Poison - Special", 'TBD');
    static readonly WeaponSpecial = new TreacheryCategory(4, "Weapon - Special", 'TBD');
    static readonly DefenseProjectile = new TreacheryCategory(5, "Defense - Projectile", 'TBD');
    static readonly DefensePoison = new TreacheryCategory(6, "Defense - Poison", 'TBD');
    static readonly DefenseSpecial = new TreacheryCategory(7, "Defense - Special", 'TBD');
    static readonly Special = new TreacheryCategory(8, "Special", 'TBD');
    static readonly WorthlessCard = new TreacheryCategory(9, "Worthless Card", 'TBD');

    private constructor(
        public readonly id: number, 
        public readonly name: string, 
        public readonly icon: string) {
    }

    toString() {
        return this.name;
    }
}
