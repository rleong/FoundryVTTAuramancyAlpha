export const AURAMANCY = {};

/**
 * The set of Attribute Scores used within the sytem.
 * @type {Object}
 */
 AURAMANCY.attributes = {
  "str": "AURAMANCY.AttributeStr",
  "dex": "AURAMANCY.AttributeDex",
  "con": "AURAMANCY.AttributeCon",
  "int": "AURAMANCY.AttributeInt",
  "wil": "AURAMANCY.AttributeWil",
  "agi": "AURAMANCY.AttributeAgi",
  "per": "AURAMANCY.AttributePer",
  "cha": "AURAMANCY.AttributeCha"
};

AURAMANCY.attributeAbbreviations = {
  "str": "AURAMANCY.AttributeStrAbbr",
  "dex": "AURAMANCY.AttributeDexAbbr",
  "con": "AURAMANCY.AttributeConAbbr",
  "int": "AURAMANCY.AttributeIntAbbr",
  "wil": "AURAMANCY.AttributeWisAbbr",
  "agi": "AURAMANCY.AttributeAgiAbbr",
  "per": "AURAMANCY.AttributePerAbbr",
  "cha": "AURAMANCY.AttributeChaAbbr"
};

AURAMANCY.reserveDice = {
  4: "d4",
  6: "d6",
  8: "d8",
  10: "d10",
  12: "d12"
};

AURAMANCY.damageDice = {
  4: "d4",
  6: "d6",
  8: "d8",
  10: "d10",
  12: "d12",
  20: "d20"
};

AURAMANCY.minHp = {
  4: 10,
  6: 15,
  8: 20,
  10: 25,
  12: 30
};

AURAMANCY.sizeCategories = {
  "mni": "Miniscule",
  "tny": "Tiny",
  "sml": "Small",
  "med": "Medium",
  "lrg": "Large",
  "hge": "Huge",
  "enm": "Enormous"
};

AURAMANCY.sizeCategoryMovement = {
  "mni": 15,
  "tny": 20,
  "sml": 25,
  "med": 30,
  "lrg": 35,
  "hge": 40,
  "enm": 45
};

AURAMANCY.sensories = {
  "blindsight": "Blindsight",
  "darkvision": "Darkvision",
  "echolocation": "Echolocation",
  "greaterdarkvision": "Greater Darkvision",
  "infravision": "Infravision",
  "nightvision": "Night Vision",
  "seismicsense": "Seismic Sense",
  "truesight": "Truesight"
};

AURAMANCY.movementUnits = {
  "ft": "Feet",
  "mi": "Miles",
  "m": "Meters",
  "km": "Kilometers"
};

AURAMANCY.movementOptions = {
  "burrowing": "Burrowing",
  "climbing": "Climbing",
  "crawling": "Crawling",
  "flying": "Flying",
  "freeform": "Freeform",
  "gliding": "Gliding",
  "swimming": "Swimming",
  "walking": "Walking"
};

AURAMANCY.movementEnhancements = {
  "hover": "Hover",
  "spiderclimb": "Spiderclimb"
};

AURAMANCY.damageTypes = {
  "none": "",
  "energy": "Energy",
  "magical": "Magical",
  "mental": "Mental",
  "miasmic": "Miasmic",
  "physical": "Physical"
};

AURAMANCY.sensitivities = {
  "silver": "Silver Weakness",
  "sunlight": "Sunlight Sensitivity"
};

AURAMANCY.damageSubtypes = {
  "all": "All",
  "aero": "Aero",
  "arcane": "Arcane",
  "bludgeoning": "Bludgeoning",
  "cold": "Cold",
  "corrosive": "Corrosive",
  "cryo": "Cryo",
  "disease": "Disease",
  "electro": "Electro",
  "geo": "Geo",
  "heat": "Heat",
  "hydro": "Hydro",
  "necrotic": "Necrotic",
  "piercing": "Piercing",
  "poison": "Poison",
  "psionic": "Psionic",
  "psychic": "Psychic",
  "pyro": "Pyro",
  "radiant": "Radiant",
  "radiation": "Radiation",
  "shock": "Shock",
  "slashing": "Slashing",
  "sonic": "Sonic",
  "void": "Void"
};

AURAMANCY.favoredEnemies = {
  "aberration": "Aberration",
  "aethereal": "Aethereal",
  "animal": "Animal",
  "archon": "Archon",
  "beast": "Beast",
  "construct": "Construct",
  "daemon": "Daemon",
  "diarkin": "Diarkin",
  "draconic": "Draconic",
  "ekretoid": "Ekretoid",
  "electronic": "Electronic",
  "elemental": "Elemental",
  "empyrean": "Empyrean",
  "esterian": "Esterian",
  "faunis": "Faunis",
  "fey": "Fey",
  "floris": "Floris",
  "fungus": "Fungus",
  "goliath": "Goliath",
  "grymkier": "Grymkier",
  "hominid": "Hominid",
  "humanoid": "Humanoid",
  "merfolk": "Merfolk",
  "monstrosity": "Monstrosity",
  "plant": "Plant",
  "remnant": "Remnant",
  "shapeshifter": "Shapeshifter",
  "undead": "Undead"
};

AURAMANCY.entityTags = {
  "aberration": "Aberration",
  "animal": "Animal",
  "archon": "Archon",
  "astral": "Astral",
  "beast": "Beast",
  "celestial": "Celestial",
  "companion": "Companion",
  "construct": "Construct",
  "daemon": "Daemon",
  "diarkin": "Diarkin",
  "draconic": "Draconic",
  "ekretoid": "Ekretoid",
  "electronic": "Electronic",
  "elemental": "Elemental",
  "empyrean": "Empyrean",
  "esterian": "Esterian",
  "exalted": "Exalted",
  "faunis": "Faunis",
  "fey": "Fey",
  "floris": "Floris",
  "fungus": "Fungus",
  "goliath": "Goliath",
  "grymkier": "Grymkier",
  "hominid": "Hominid",
  "humanoid": "Humanoid",
  "infernal": "Infernal",
  "intangible": "Intangible",
  "legendary": "Legendary",
  "lycanthrope": "Lycanthrope",
  "lunar": "Lunar",
  "merfolk": "Merfolk",
  "monstrosity": "Monstrosity",
  "mount": "Mount",
  "mythic": "Mythic",
  "plant": "Plant",
  "primordial": "Primordial",
  "remnant": "Remnant",
  "shapeshifter": "Shapeshifter",
  "undead": "Undead",
  "unit": "Unit",
  "vampire": "Vampire",
  "voidling": "Voidling",
  "weakspot": "Weakspot"
};

AURAMANCY.favoredTerrain = {
  "arctic": "Arctic",
  "canyon": "Canyon",
  "cliff": "Cliff",
  "coast": "Coast",
  "deepocean": "Deep Ocean",
  "desert": "Desert",
  "forest": "Forest",
  "fungalforest": "Fungal Forest",
  "grassland": "Grassland",
  "highskies": "High Skies",
  "hills": "Hills",
  "iferos": "Iferos",
  "itheros": "Itheros",
  "jungle": "Jungle",
  "lake": "Lake",
  "lunar": "Lunar",
  "mountain": "Mountain",
  "ocean": "Ocean",
  "plains": "Plains",
  "riverland": "Riverland",
  "savannah": "Savannah",
  "subterranea": "Subterranea",
  "swamp": "Swamp",
  "tundra": "Tundra",
  "urban": "Urban",
  "valley": "Valley",
  "volcanicwasteland": "Volcanic Wasteland",
  "volcano": "Volcano"
};

AURAMANCY.comfortableClimates = {
  "dry": "Dry",
  "normal": "Normal",
  "wet": "Wet",
};

AURAMANCY.comfortableTemperatures = {
  "cold": "Cold",
  "extremecold": "Extreme Cold",
  "extremeheat": "Extreme Heat",
  "hot": "Hot"
};

AURAMANCY.characteristicsBackgrounds = {
  "acolyte": "Acolyte",
  "actor": "Actor",
  "anthropologist": "Anthropologist",
  "archaeologist": "Archaeologist",
  "athlete": "Athlete",
  "charlatan": "Charlatan",
  "courtesan": "Courtesan",
  "courtier": "Courtier",
  "criminal": "Criminal",
  "entertainer": "Entertainer",
  "fisher": "Fisher",
  "gamer": "Gamer",
  "hermit": "Hermit",
  "merchant": "Merchant",
  "noble": "Noble",
  "pirate": "Pirate",
  "sailor": "Sailor",
  "smutwriter": "Smut Writer",
  "soldier": "Soldier",
  "theologian": "Theologian",
  "urchin": "Urchin"
};

AURAMANCY.characteristicsCultures = {
  "allorish": "Allorish",
  "amorian": "Amorian",
  "arkhazian": "Arkhazian",
  "balerian": "Balerian",
  "deraiyu": "Deraiyu",
  "durskarian": "Durskarian",
  "dwelmverheimer": "Dwelmverheimer",
  "eremese": "Eremese",
  "fellhavener": "Fell Havener",
  "geldstrotan": "Geldstrotan",
  "hestaphoroi": "Hestaphoroi",
  "illinean": "Illinean",
  "kazantharian": "Kazantharian",
  "kestovian": "Kestovian",
  "kietzdalian": "Kietzdalian",
  "levaustrian": "Levaustrian",
  "lyorlan": "Lyorlan",
  "mercadian": "Mercadian",
  "merexian": "Merexian",
  "meriton": "Meriton",
  "ourdellian": "Ourdellian",
  "ouseki": "Ouseki",
  "saharian": "Saharian",
  "sailem": "Sailem",
  "solmyran": "Solmyran",
  "svalic": "Svalic",
  "telmarian": "Telmarian",
  "terinbergese": "Terinbergese",
  "tydonal": "Tydonal",
  "tyrchonnelan": "Tyr Chonnelan",
  "tyvemgarish": "Tyvemgarish",
  "valruzzian": "Valruzzian"
};

AURAMANCY.characteristicsTraits = {
  "abrasive": "Abrasive",
  "ascetic": "Ascetic",
  "butterfingers": "Butterfingers",
  "calm": "Calm",
  "daredevil": "Daredevil",
  "diva": "Diva",
  "drunkard": "Drunkard",
  "earlybird": "Early Bird",
  "empath": "Empath",
  "epicurean": "Epicurean",
  "gambler": "Gambler",
  "goodnatured": "Good Natured",
  "hoarder": "Hoarder",
  "hotheaded": "Hot Headed",
  "kenmind": "Keen Mind",
  "lonewolf": "Lone Wolf",
  "masochist": "Masochist",
  "nightowl": "Night Owl",
  "outlander": "Outlander",
  "phobia": "Phobia",
  "psychopath": "Psychopath",
  "pyromaniac": "Pyromaniac",
  "shyintrovert": "Shy Introvert",
  "stickyfingers": "Sticky Fingers",
  "torturedartist": "Tortured Artist",
  "tough": "Tough",
  "wimp": "Wimp"
};

AURAMANCY.proficiencyLevel = {
  0: "None",
  1: "Proficient",
  2: "Expertise"
};

AURAMANCY.proficiencyWeapons = {
  "mbalanced": "(Melee) Balanced",
  "mdualwield": "(Melee) Dual-Wield",
  "mheavy": "(Melee) Heavy",
  "moffhand": "(Melee) Offhand",
  "mreach": "(Melee) Reach",
  "mrthrown": "(Melee & Ranged) Thrown",
  "mtwohand": "(Melee) Two-Hand",
  "mvariant": "(Melee) Variant",
  "mversatile": "(Melee) Versatile",
  "oexplosives": "(Other) Explosives",
  "oimprovised": "(Other) Improvised Weapon",
  "otraps": "(Other) Traps",
  "rarrow": "(Ranged) Ammunition (Arrow)",
  "rbolt": "(Ranged) Ammunition (Bolt)",
  "rbullet": "(Ranged) Ammunition (Bullet)"
};

AURAMANCY.proficiencyTools = {
  "alchemy": "Alchemy Kit",
  "apothecary": "Apothecary Kit",
  "art": "Art Supplies",
  "brewing": "Brewing Kit",
  "carpenters": "Carpenter’s Tools",
  "cartographers": "Cartographer’s Tools",
  "cobblers": "Cobbler’s Tools",
  "cooks": "Cook’s Utensils",
  "cosmetics": "Cosmetics Kit",
  "enchantment": "Enchantment Kit",
  "glassblowers": "Glassblower’s Tools",
  "herbalism": "Herbalism Kit",
  "jewelers": "Jeweler’s Tools",
  "leatherworkers": "Leatherworker’s Tools",
  "masons": "Mason’s Tools",
  "navigators": "Navigator’s Tools",
  "poisoners": "Poisoner’s Kit",
  "terminal": "Portable Terminal",
  "potters": "Potter’s Tools",
  "scribes": "Scribe’s Kit",
  "sculptors": "Sculptor’s Tools",
  "smiths": "Smith’s Tools",
  "thieves": "Thieves’ Tools",
  "tinkers": "Tinker’s Tools",
  "weavers": "Weaver’s Tools",
  "woodcarvers": "Woodcarver’s Tools"
};

AURAMANCY.proficiencyInstruments = {
  "brass": "Brass",
  "electronic": "Electronic",
  "keyboard": "Keyboard",
  "percussion": "Percussion",
  "strings": "Strings",
  "vocals": "Vocals",
  "woodwind": "Woodwind"
};

AURAMANCY.proficiencyVehicles = {
  "advancedair": "Advanced Air",
  "advancedland": "Advanced Land",
  "advancedwater": "Advanced Water",
  "basicair": "Basic Air",
  "basicland": "Basic Land",
  "basicwater": "Basic Water"
};

AURAMANCY.proficiencyInstruments = {
  "brass": "Brass",
  "electronic": "Electronic",
  "keyboard": "Keyboard",
  "percussion": "Percussion",
  "strings": "Strings",
  "vocals": "Vocals",
  "woodwind": "Woodwind"
};

AURAMANCY.proficiencyLanguages = {
  "ancientaztan": "Ancient Aztan (Meritonese)",
  "aztan": "Aztan (Meritonese)",
  "bakhwa": "Ba’khwa (Serenese)",
  "chianhwa": "Chianhwa (Serenese)",
  "common": "Common (Elorish)",
  "durskarian": "Durskarian (Durskarian)",
  "elorish": "Elorish (Elorish)",
  "etferum": "Etferum (Iferosii)",
  "geonhwa": "Geonhwa (Serenese)",
  "goyohwa": "Goyohwa (Serenese)",
  "highelorean": "High Elorean (Elorish)",
  "jinhwa": "Jinhwa (Serenese)",
  "kharic": "Kharic (Alkherrech)",
  "kolkharic": "Kolkharic (Alkherrech)",
  "lowelorean": "Low Elorean (Elorish)",
  "neweldskarish": "New Eldksarish (Eldskarish)",
  "oldeldskarish": "Old Eldskarish (Eldskarish)",
  "oldspeak": "Oldspeak (Aosithe)",
  "orlandish": "Orlandish (Ourdellian)",
  "sedarian": "Sedarian (Sedari)",
  "telmarian": "Telmarian (Telmarian)",
  "ulkgharish": "Ulkgharish (Merexian)",
  "viertryz": "Viertryz (Vertrullian)",
  "yamakhwa": "Yama’khwa (Serenese)"
};

AURAMANCY.ancestries = {
  "arisen": "Arisen",
  "azori": "Azori",
  "cyborg": "Cyborg",
  "dedari": "Dedari",
  "dryad": "Dryad",
  "dwarf": "Dwarf",
  "elf": "Elf",
  "esterian": "Esterian",
  "fairy": "Fairy",
  "geruta": "Geruta",
  "gnome": "Gnome",
  "goblin": "Goblin",
  "guiyen": "Guiyen",
  "halfling": "Halfling",
  "ikairi": "Ikairi",
  "ishtal": "Ishtal",
  "jotunn": "Jotunn",
  "lycanthrope": "Lycanthrope",
  "moribi": "Moribi",
  "mutant": "Mutant",
  "mycota": "Mycota",
  "noros": "Noros",
  "orc": "Orc",
  "shade": "Shade",
  "sidhe": "Sidhe",
  "soulforged": "Soulforged",
  "succubusincubus": "Succubus / Incubus",
  "torlahng": "Torlahng",
  "vampire": "Vampire",
  "vishaar": "Vishaar",
  "xyphid": "Xyphid",
  "yojin": "Yojin",
  "mixed": "Mixed Ancestry",
  "custom": "Custom Ancestry"
};

AURAMANCY.abilityCategories = {
  "feature": "Feature",
  "action": "Action",
  "attack": "Attack",
  "reaction": "Reaction"
};

AURAMANCY.abilityPrefixes = {
  "none": "None",
  "exalted": "Exalted",
  "legendary": "Legendary",
  "mythic": "Mythic"
};

AURAMANCY.abilitySources = {
  "default": "Default",
  "ancestry": "Ancestry",
  "augmentation": "Augmentation",
  "combination": "Combination",
  "cultivation": "Cultivation",
  "domain": "Domain",
  "metamagic": "Metamagic",
  "path": "Path",
  "perk": "Perk",
  "other": "Other"
};

AURAMANCY.magicSchools = {
  "none": "None",
  "abjuration": "Abjuration",
  "alteration": "Alteration",
  "chronomancy": "Chronomancy",
  "conjuration": "Conjuration",
  "divination": "Divination",
  "enchantment": "Enchantment",
  "evocation": "Evocation",
  "illusion": "Illusion",
  "necromancy": "Necromancy",
  "restoration": "Restoration",
  "uncategorized": "Uncategorized"
};

AURAMANCY.spellTiers = {
  "": "None",
  0: "0",
  1: "1",
  2: "2",
  3: "3",
  4: "4",
  5: "5",
  6: "6",
  7: "7",
  8: "8",
  9: "9",
  10: "10"
};

AURAMANCY.magicComponents = {
  "verbal": "Verbal",
  "somatic": "Somatic",
  "material": "Material"
};

AURAMANCY.attackTypes = {
  "areal": "Areal",
  "melee": "Melee",
  "ranged": "Ranged"
};

AURAMANCY.shapes = {
  "circle": "Circle",
  "cone": "Cone",
  "cube": "Cube",
  "cylinder": "Cylinder",
  "dome": "Dome",
  "line": "Line",
  "prism": "Prism",
  "rectangle": "Rectangle",
  "sphere": "Sphere",
  "square": "Square"
};

AURAMANCY.magicalOptions = {
  "no": "No",
  "yes": "Yes",
  "varies": "Varies"
};

AURAMANCY.objectTagsRobustness = {
  "fragile": "Fragile",
  "standard": "Standard",
  "sturdy": "Sturdy"
};

AURAMANCY.objectTagsSubstance = {
  "adamantine": "Adamantine",
  "bone": "Bone",
  "cloth": "Cloth",
  "crystal": "Crystal",
  "fiber": "Fiber",
  "glass": "Glass",
  "ice": "Ice",
  "mithril": "Mithril",
  "orichalcum": "Orichalcum",
  "rope": "Rope",
  "stone": "Stone",
  "wood": "Wood",
  "hardmetals": "Hard Metals",
  "hardplastic": "Hard Plastic",
  "paper": "Paper",
  "softmetals": "Soft Metals",
  "softplastic": "Soft Plastic"
};

AURAMANCY.objectTagsSpecial = {
  "controllable": "Controllable",
  "illusion": "Illusion",
  "indestructible": "Indestructible",
  "intangible": "Intangible",
  "item": "Item",
  "magical": "Magical",
  "sentient": "Sentient",
  "structure": "Structure",
  "vehicle": "Vehicle"
};

AURAMANCY.objectTagsTraits = {
  "ammunition": "Ammunition",
  "arcanefocus": "Arcane Focus",
  "automatic": "Automatic",
  "balanced": "Balanced",
  "bulwark": "Bulwark",
  "comfortable": "Comfortable",
  "dualwield": "Dual Wield",
  "finesse": "Finesse",
  "flexible": "Flexible",
  "heavy": "Heavy",
  "loud": "Loud",
  "misfire": "Misfire",
  "offhand": "Offhand",
  "reach": "Reach",
  "reload": "Reload",
  "scatter Fire": "Scatter Fire",
  "silvered": "Silvered",
  "special": "Special",
  "thrown": "Thrown",
  "twohanded": "Two-Handed",
  "variant": "Variant",
  "versatile": "Versatile",
};

AURAMANCY.objectTagsMisc = {
  "ammo": "Ammo",
  "armor": "Armor",
  "attunement": "Attunement",
  "binding": "Binding",
  "comfort": "Comfort",
  "consumable": "Consumable",
  "electronic": "Electronic",
  "equipment": "Equipment",
  "explosive": "Explosive",
  "gourmet": "Gourmet",
  "ingested": "Ingested",
  "mundane": "Mundane",
  "shield": "Shield",
  "sustenance": "Sustenance",
  "telephony": "Telephony",
  "tool": "Tool",
  "trap": "Trap",
  "weapon": "Weapon",
  "instrument": "Musical Instrument"
};

AURAMANCY.objectTags = {
  ...AURAMANCY.objectTagsRobustness,
  ...AURAMANCY.objectTagsSubstance,
  ...AURAMANCY.objectTagsSpecial,
  ...AURAMANCY.objectTagsTraits,
  ...AURAMANCY.objectTagsMisc
};

AURAMANCY.releases = {
  "artifice": "Artifice",
  "augmentation": "Augmentation",
  "causal_manipulation": "Causal Manipulation",
  "martial_techniques": "Martial Techniques",
  "psionics": "Psionics",
  "spellcasting": "Spellcasting",
  "thoughtscape": "Thoughtscape",
  "weapon_art": "Weapon Art"
};

AURAMANCY.cultivation = {
  "meridian_core": "Meridian Core",
  "affinity": "Affinity",
  "devotion": "Devotion",
  "phenomenon": "Phenomenon",
  "patronage": "Patronage",
  "symbiosis": "Symbiosis"
};

AURAMANCY.cultivationAll = {
  ...AURAMANCY.cultivation,
  "artificial_biocore": "Artificial Biocore"
};

AURAMANCY.paths = {
  "assassin": "Assassin",
  "barbarian": "Barbarian",
  "clairvoyant": "Clairvoyant",
  "displacer": "Displacer",
  "doppelfighter": "Doppel Fighter",
  "fablewright": "Fablewright",
  "gourmand": "Gourmand",
  "hemomancer": "Hemomancer",
  "inquisitor": "Inquisitor",
  "kabukon": "Kabukon",
  "mesmer": "Mesmer",
  "necromancer": "Necromancer",
  "ranger": "Ranger",
  "sawbones": "Sawbones",
  "senterian": "Senterian",
  "songstriker": "Songstriker",
  "soulbinder": "Soulbinder",
  "spellsword": "Spellsword",
  "stargazer": "Stargazer",
  "thearsenal": "The Arsenal",
  "thekeeper": "The Keeper",
  "timekeeper": "Timekeeper",
  "tinkerer": "Tinkerer",
  "vates": "Vates"
};

AURAMANCY.rarity = {
  "trivial": "Trivial",
  "common": "Common",
  "uncommon": "Uncommon",
  "rare": "Rare",
  "veryrare": "Very Rare",
  "legendary": "Legendary"
};

AURAMANCY.quality = {
  "poor": "Poor",
  "standard": "Standard",
  "fine": "Fine",
  "high": "High",
  "superb": "Superb",
  "flawless": "Flawless"
};

AURAMANCY.conditions = {
  "bleeding": "Bleeding",
  "blinded": "Blinded",
  "bloodthirsty": "Bloodthirsty",
  "charmed": "Charmed",
  "concentrated": "Concentrated",
  "confused": "Confused",
  "cursed": "Cursed",
  "dazed": "Dazed",
  "depleted": "Depleted",
  "deafened": "Deafened",
  "encumbered": "Encumbered",
  "enlarged": "Enlarged",
  "fatigued": "Fatigued",
  "frightened": "Frightened",
  "grappled": "Grappled",
  "hasted": "Hasted",
  "hidden": "Hidden",
  "incapacitated": "Incapacitated",
  "inebriated": "Inebriated",
  "insane": "Insane",
  "inspired": "Inspired",
  "invisible": "Invisible",
  "lethargic": "Lethargic",
  "muted": "Muted",
  "nullified": "Nullified",
  "paralyzed": "Paralyzed",
  "petrified": "Petrified",
  "prone": "Prone",
  "restrained": "Restrained",
  "shrunken": "Shrunken",
  "staggered": "Staggered",
  "stunned": "Stunned",
  "surprised": "Surprised",
  "taunted": "Taunted",
  "unconscious": "Unconscious",
  "wounded": "Wounded"
};

AURAMANCY.pool1Options = {
  "cultivation": "Cultivation Technique",
  "release": "Release Technique",
  "path": "Path Advancement",
  "perk": "Pool 1 Perk",
  "attribute": "Attribute Improvement"
};

AURAMANCY.pool2Options = {
  "attribute": "Attribute Improvement",
  "hitdice": "Hit Dice Improvement",
  "proficiency": "Learn Proficiency",
  "expertise": "Proficiency Improvement",
  "well": "Aether Well Improvement",
  "reserve": "Aether Reserve Improvement",
  "release": "Release Progression",
  "perk": "Pool 2 Perk"
};

AURAMANCY.level1Options = {
  "cultivation": "Cultivation",
  "release": "Release",
  "path": "Path",
  "perk": "Perk"
};

AURAMANCY.proficiencySubjects = {
  "equipment": "Equipment",
  "unarmed": "Unarmed",
  "riding": "Riding",
  "crafting": "Crafting",
  "operating": "Operating",
  "languages": "Languages"
};

AURAMANCY.equipmentProficiencies = {
  "melee": "Melee Weapons",
  "ranged": "Ranged Weapons",
  "improvised": "Improvised Weapons",
  "oversized": "Oversized Weapons",
  "shield": "Shields"
};

AURAMANCY.meleeExpertise = {
  "blunt": "Blunt",
  "edged": "Edged",
  "flail": "Flail",
  "flexible": "Flexible",
  "pointed": "Pointed",
  "polearm": "Polearm"
};

AURAMANCY.rangedExpertise = {
  "firearm": "Firearm",
  "leverage": "Leverage",
  "pneumatic": "Pneumatic",
  "tension": "Tension",
  "throwable": "Throwable"
};

AURAMANCY.craftingProficiencies = {
  "alchemy": "Alchemy",
  "artistry": "Artistry",
  "blacksmithing": "Blacksmithing",
  "brewing": "Brewing",
  "carpentry": "Carpentry",
  "cooking": "Cooking",
  "enchanting": "Enchanting",
  "handicrafting": "Handicrafting",
  "masonry": "Masonry",
  "programming": "Programming",
  "scribing": "Scribing",
  "tailoring": "Tailoring"
};
