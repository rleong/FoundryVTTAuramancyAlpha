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

AURAMANCY.sizeCategories = {
  "mni": "Miniscule",
  "tny": "Tiny",
  "sml": "Small",
  "med": "Medium",
  "lrg": "Large",
  "hge": "Huge",
  "enm": "Enormous"
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

AURAMANCY.damageTypes = {
  "none": "",
  "energy": "Energy",
  "magical": "Magical",
  "mental": "Mental",
  "miasmic": "Miasmic",
  "physical": "Physical"
};

AURAMANCY.sensitivities = {
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
  "soulfire": "Soulfire",
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
  "aethereal": "Aethereal",
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
  "legendary": "Legendary",
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
