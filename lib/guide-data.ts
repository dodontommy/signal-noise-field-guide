export type VectorId =
  | "foundations"
  | "power-electronics"
  | "death-industrial"
  | "japanoise"
  | "noisecore"
  | "harsh-noise-wall"
  | "metal-noise";

export type Availability = "apple" | "off-platform" | "unknown";
export type Depth = "START" | "CORE" | "DEEP" | "ABYSS";

export type Release = {
  artist: string;
  title: string;
  year: number;
  country: string;
  vector: VectorId;
  availability: Availability;
  depth: Depth;
  intensity: 1 | 2 | 3 | 4 | 5;
  tags: string[];
  note: string;
  appleUrl?: string;
};

export type Route = {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  releaseKeys: string[];
  color: "red" | "white" | "gray";
};

export const VECTOR_META: Record<
  VectorId,
  { label: string; short: string; definition: string }
> = {
  foundations: {
    label: "Industrial foundations",
    short: "FOUNDATIONS",
    definition:
      "Tape abuse, metal percussion, musique concrète and early industrial records that supplied noise with its methods and its charming bedside manner.",
  },
  "power-electronics": {
    label: "Power electronics",
    short: "POWER ELEC.",
    definition:
      "Voice-forward confrontation: feedback, crude synth pressure, repetition and language used as another weapon.",
  },
  "death-industrial": {
    label: "Death industrial",
    short: "DEATH IND.",
    definition:
      "Power electronics slowed into a sealed room: diseased loops, synth drones, ritual weight and obsessive pathology.",
  },
  japanoise: {
    label: "Japanoise / harsh noise",
    short: "JAPANOISE",
    definition:
      "Full-spectrum electronics, violent edits, ecstatic performance and the Japanese scene’s refusal to recognize a sensible upper limit.",
  },
  noisecore: {
    label: "Noisecore / noisegrind",
    short: "NOISECORE",
    definition:
      "Hardcore and grind reduced to blast fragments, count-ins, screaming and structural vandalism.",
  },
  "harsh-noise-wall": {
    label: "Harsh noise wall",
    short: "HNW",
    definition:
      "Static treated as a monolith. Minimal change, maximal texture, and a useful test of whether your speakers have accepted death.",
  },
  "metal-noise": {
    label: "Metal / noise bridge",
    short: "METAL→NOISE",
    definition:
      "Records retaining riffs, percussion or bodily low end while importing harsh electronics, industrial process and total sonic failure.",
  },
};

const r = (
  artist: string,
  title: string,
  year: number,
  country: string,
  vector: VectorId,
  availability: Availability,
  depth: Depth,
  intensity: 1 | 2 | 3 | 4 | 5,
  tags: string[],
  note: string,
  appleUrl?: string,
): Release => ({
  artist,
  title,
  year,
  country,
  vector,
  availability,
  depth,
  intensity,
  tags,
  note,
  appleUrl,
});

export const RELEASES: Release[] = [
  // INDUSTRIAL FOUNDATIONS
  r("Throbbing Gristle", "The Second Annual Report", 1977, "UK", "foundations", "apple", "START", 2, ["industrial", "tape", "live"], "The grammar book: damaged electronics, documentary ugliness and repetition before the genre had a clean name."),
  r("NON", "Pagan Muzak", 1978, "USA", "foundations", "unknown", "DEEP", 3, ["industrial", "loops", "minimal"], "Locked-groove industrial as blunt ritual object; short on development, rich in abrasion."),
  r("SPK", "Information Overload Unit", 1981, "Australia", "foundations", "apple", "CORE", 3, ["industrial", "metal", "medical"], "Scrap-metal percussion and clinical dread. An obvious ancestor to death industrial’s institutional atmosphere."),
  r("Einstürzende Neubauten", "Kollaps", 1981, "Germany", "foundations", "apple", "START", 3, ["industrial", "percussion", "punk"], "Architecture beaten into rhythm. Still startlingly physical and a clean bridge from punk."),
  r("Maurizio Bianchi", "Symphony for a Genocide", 1981, "Italy", "foundations", "off-platform", "CORE", 3, ["industrial", "drone", "tape"], "Gray, suffocating Italian industrial whose corroded loops feed directly into the Atrax ecosystem."),
  r("Whitehouse", "Erector", 1981, "UK", "power-electronics", "off-platform", "DEEP", 5, ["feedback", "minimal", "early PE"], "Primitive high-frequency punishment: almost nothing except pressure, which is very much the point."),
  r("The New Blockaders", "Changez Les Blockeurs", 1982, "UK", "foundations", "off-platform", "CORE", 4, ["anti-music", "metal", "concrete"], "Anti-music as pileup: object noise, ruptured dynamics and a profound allergy to entertainment."),
  r("Nurse With Wound", "Homotopy to Marie", 1982, "UK", "foundations", "unknown", "DEEP", 2, ["surreal", "concrete", "collage"], "Nightmare collage with enormous negative space; less assault, more reality quietly failing."),
  r("Hunting Lodge", "Will", 1983, "USA", "foundations", "unknown", "DEEP", 3, ["industrial", "percussion", "ritual"], "American industrial built from metal, tape and repetition, balanced between factory pulse and private ceremony."),
  r("Coil", "Scatology", 1984, "UK", "foundations", "apple", "START", 2, ["industrial", "ritual", "electronic"], "A compositional route from first-wave industrial toward something richer, stranger and still fundamentally contaminated."),
  r("Ramleh", "Hole in the Heart", 1987, "UK", "power-electronics", "off-platform", "CORE", 4, ["power electronics", "drone", "guitar"], "Early power electronics opening into psychedelic guitar and bleak drones without becoming remotely welcoming."),
  r("Zoviet France", "Shouting at the Ground", 1988, "UK", "foundations", "unknown", "DEEP", 2, ["ambient industrial", "tape", "ritual"], "Loop-based ambient industrial: erosion, repetition and buried detail rather than frontal assault."),

  // POWER ELECTRONICS
  r("Whitehouse", "Great White Death", 1985, "UK", "power-electronics", "off-platform", "START", 5, ["feedback", "vocals", "classic"], "The best raw Whitehouse entry for an Atrax listener: crude feedback, repetition and absolute hostility."),
  r("Whitehouse", "Quality Time", 1995, "UK", "power-electronics", "off-platform", "DEEP", 4, ["vocals", "synth", "psychological"], "More restrained than the early records, and therefore more intimate, bizarre and threatening."),
  r("Whitehouse", "Bird Seed", 2003, "UK", "power-electronics", "off-platform", "START", 5, ["vocals", "digital", "percussion"], "The mature overview: precise digital attack, polyrhythmic percussion and some exceptionally difficult source material."),
  r("Whitehouse", "Asceticists 2006", 2006, "UK", "power-electronics", "off-platform", "CORE", 5, ["vocals", "digital", "late period"], "Lean late-period Whitehouse: short, disciplined, physical and stripped of the long spoken-word centerpiece."),
  r("Sutcliffe Jügend", "We Spit on Their Graves", 1997, "UK", "power-electronics", "apple", "ABYSS", 5, ["feedback", "serialism", "extreme"], "A four-disc endurance document of nearly featureless aggression. Approach after normal albums stop seeming inconvenient.", "https://music.apple.com/us/album/we-spit-on-their-graves/504142748"),
  r("Consumer Electronics", "Estuary English", 2014, "UK", "power-electronics", "apple", "START", 4, ["vocals", "synth", "modern PE"], "Clear, ugly and sharply written; one of the easiest modern entries into voice-led power electronics.", "https://music.apple.com/us/album/estuary-english/1056878107"),
  r("Genocide Organ", "Leichenlinie", 1989, "Germany", "power-electronics", "apple", "CORE", 4, ["samples", "industrial", "authoritarian"], "Foundational German PE: crude loops, propaganda fragments and an atmosphere of institutional violence.", "https://music.apple.com/us/album/leichenlinie-1989-2009/369816314"),
  r("Genocide Organ", "The Truth Will Make You Free", 1999, "Germany", "power-electronics", "unknown", "DEEP", 4, ["samples", "rhythmic", "industrial"], "More dynamic and rhythmically legible without losing the project’s documentary ugliness."),
  r("Con-Dom", "All in Good Faith", 1988, "UK", "power-electronics", "off-platform", "CORE", 4, ["vocals", "conceptual", "industrial"], "Classic confrontational PE with rhetoric and repetition carrying as much weight as the electronics."),
  r("Slogun", "Tearing Up Your Plans", 1994, "USA", "power-electronics", "off-platform", "DEEP", 4, ["vocals", "true crime", "American PE"], "American PE built around barked vocals and serial-killer fixation: direct, repetitive and intentionally airless."),
  r("Deathpile", "G.R.", 2003, "USA", "power-electronics", "off-platform", "CORE", 5, ["true crime", "vocals", "concept album"], "A Green River Killer concept record whose narrative focus makes it especially effective—and especially unpleasant."),
  r("Taint", "Indecent Liberties", 2006, "UK", "power-electronics", "off-platform", "DEEP", 5, ["feedback", "vocals", "harsh"], "High-pressure UK electronics with dense frequency abuse and less empty space than the early school."),
  r("Grunt", "Seer of Decay", 2006, "Finland", "power-electronics", "off-platform", "CORE", 5, ["Finnish PE", "vocals", "scrap metal"], "A key Finnish record: overloaded electronics, metal impact and vocals that sound physically cornered."),
  r("Prurient", "Black Vase", 2005, "USA", "power-electronics", "unknown", "CORE", 4, ["vocals", "feedback", "emotional"], "An exposed, personal strain of PE where cracked vocals matter as much as the frequency violence."),
  r("Prurient", "Cocaine Death", 2008, "USA", "power-electronics", "apple", "START", 4, ["vocals", "noise", "compilation"], "Compact, varied and vicious; a useful bridge between classic PE and Prurient’s more melodic later work.", "https://music.apple.com/us/album/cocaine-death/325603936"),
  r("Pharmakon", "Bestial Burden", 2014, "USA", "power-electronics", "apple", "START", 4, ["body", "vocals", "modern"], "Power electronics turned inward toward illness, flesh and physical limitation, with unusually strong album architecture.", "https://music.apple.com/us/album/bestial-burden/901421034"),
  r("Puce Mary", "The Drought", 2018, "Denmark", "power-electronics", "apple", "START", 4, ["modern", "drone", "vocals"], "Spacious, detailed and psychologically exact; modern PE that knows silence can be another form of violence.", "https://music.apple.com/us/album/the-drought/1501419710"),
  r("IRM", "Virgin Mind", 2005, "Sweden", "power-electronics", "apple", "CORE", 4, ["death industrial", "vocals", "drone"], "Long-form, theatrical Swedish electronics balanced between PE confrontation and death-industrial dread.", "https://music.apple.com/us/album/virgin-mind/310460601"),
  r("Alberich", "NATO-Uniformen", 2010, "USA", "power-electronics", "unknown", "CORE", 4, ["rhythmic", "military", "industrial"], "Massive industrial pulse and scorched electronics: disciplined enough to feel martial, damaged enough to avoid cosplay."),

  // DEATH INDUSTRIAL
  r("Atrax Morgue", "In Search of Death", 1993, "Italy", "death-industrial", "off-platform", "START", 4, ["minimal", "synth", "pathology"], "The blueprint: cheap synth pulse, processed voice and obsessive repetition forming a fluorescent pathology room."),
  r("Atrax Morgue", "Sickness Report", 1996, "Italy", "death-industrial", "off-platform", "CORE", 4, ["medical", "minimal", "synth"], "More clinical and bodily than the debut, with slow electronics that seem to monitor an organism failing."),
  r("Atrax Morgue", "Autoerotic Death", 1996, "Italy", "death-industrial", "off-platform", "DEEP", 4, ["minimal", "loops", "pathology"], "Austere, repetitive Atrax with the sound pared down until every pulse feels incriminating."),
  r("Atrax Morgue", "Slush of a Maniac", 1997, "Italy", "death-industrial", "off-platform", "START", 4, ["vocals", "synth", "varied"], "The best next Atrax record: more varied and vocal-forward while preserving the sealed-room atmosphere."),
  r("The Sodality", "Beyond Unknown Pleasures", 1987, "Italy", "death-industrial", "off-platform", "CORE", 4, ["Italian PE", "minimal", "ancestor"], "A direct Atrax ancestor: skeletal, malicious electronics from the Italian scene before death industrial cohered."),
  r("Mauthausen Orchestra", "Murderfuck", 1983, "Italy", "death-industrial", "off-platform", "CORE", 5, ["Italian PE", "metallic", "extreme"], "Dilated metallic shrieking and inhuman vocals: rawer than Atrax, but from the same national pathology ward."),
  r("Mauthausen Orchestra", "Necrofellatio", 1983, "Italy", "death-industrial", "off-platform", "DEEP", 5, ["Italian PE", "tape", "morbid"], "Early Italian power electronics with the morbid fixation and corroded sonics that later define the death-industrial lane."),
  r("Brighter Death Now", "Great Death", 1991, "Sweden", "death-industrial", "unknown", "CORE", 4, ["Cold Meat Industry", "loops", "ritual"], "Slow, repetitive and foundational: death industrial discovering how little movement it actually needs."),
  r("Brighter Death Now", "Necrose Evangelicum", 1995, "Sweden", "death-industrial", "apple", "START", 4, ["Cold Meat Industry", "drone", "vocals"], "The classic full-length entry: funereal loops, blown-out voice and a sickly sense of ceremony.", "https://music.apple.com/us/album/necrose-evangelicum/312009306"),
  r("Brighter Death Now", "Innerwar", 1996, "Sweden", "death-industrial", "unknown", "CORE", 4, ["rhythmic", "vocals", "industrial"], "More rhythmic and outwardly forceful without sacrificing the project’s grim interior weather."),
  r("Megaptera", "Beyond the Shadow", 1994, "Sweden", "death-industrial", "unknown", "CORE", 4, ["machinery", "samples", "dark ambient"], "Cavernous machinery, contaminated ambience and long forms—the industrial facility adjacent to Atrax’s clinic."),
  r("Megaptera", "The Curse of the Scarecrow", 1998, "Sweden", "death-industrial", "unknown", "DEEP", 4, ["machinery", "drone", "cinematic"], "Dense low-end industrial dread with samples and movement arranged like a horror soundtrack built from ventilation systems."),
  r("Megaptera", "Beyond the Massive Darkness", 2023, "Sweden", "death-industrial", "apple", "START", 4, ["compilation", "machinery", "dark ambient"], "A generous remixed and archival survey, and conveniently one of the rare old-school death-industrial records on Apple.", "https://music.apple.com/us/album/beyond-the-massive-darkness/1713126358"),
  r("Anenzephalia", "Ephemeral Dawn", 2003, "Germany", "death-industrial", "off-platform", "CORE", 4, ["clinical", "minimal", "German"], "Clinical German death industrial where restraint, low pulse and empty space create the pressure."),
  r("Anenzephalia", "Nohaem", 2006, "Germany", "death-industrial", "off-platform", "DEEP", 4, ["minimal", "dread", "long-form"], "Bleak, methodical and deeply unhurried; the genre as a room whose dimensions never stop shrinking."),
  r("Propergol", "Program Vengeance", 2005, "France", "death-industrial", "off-platform", "CORE", 4, ["cinematic", "samples", "rhythmic"], "Cinematic death industrial with ominous sampling and a creeping rhythmic undertow."),
  r("Skin Crime", "Traveller on the Road", 2004, "USA", "death-industrial", "off-platform", "DEEP", 4, ["American noise", "drone", "horror"], "American death ambience and noise with the pacing of a long drive toward a clearly inadvisable destination."),
  r("Controlled Death", "Symphony for the Black Murder", 2018, "Japan", "death-industrial", "off-platform", "START", 4, ["Masonna", "synth drone", "vocals"], "Maso Yamazaki turns from Masonna’s speed toward obsessive synth drones, tapes and voice. The precise Atrax/Masonna bridge."),
  r("Controlled Death", "Journey Through a Dead Body", 2019, "Japan", "death-industrial", "off-platform", "CORE", 4, ["Masonna", "MS-20", "ritual"], "Minimal MS-20 corrosion and disturbed voice moving at mortuary speed."),
  r("Controlled Death", "Black Lucifer Rising", 2020, "Japan", "death-industrial", "off-platform", "DEEP", 4, ["Masonna", "drone", "blackened"], "A blackened, funereal extension of Controlled Death’s synth-and-voice method."),
  r("Trepaneringsritualen", "Perfection & Permanence", 2014, "Sweden", "death-industrial", "apple", "START", 3, ["ritual", "rhythmic", "vocals"], "Accessible ritual death industrial: heavy loops, distorted voice and just enough pulse to feel bodily.", "https://music.apple.com/us/album/perfection-permanence/901443303"),
  r("MZ. 412", "Burning the Temple of God", 1996, "Sweden", "death-industrial", "apple", "CORE", 4, ["ritual", "martial", "black industrial"], "Blackened ritual industrial whose martial weight makes sense to metal listeners without becoming riff music.", "https://music.apple.com/us/album/burning-the-temple-of-god/504670122"),

  // JAPANOISE / HARSH NOISE
  r("Merzbow", "Material Action 2 N.A.M.", 1981, "Japan", "japanoise", "off-platform", "DEEP", 3, ["tape", "concrete", "early"], "Early Merzbow before the total-feedback identity: tape collage, objects and a visibly developing language."),
  r("Merzbow", "Batztoutai with Memorial Gadgets", 1986, "Japan", "japanoise", "unknown", "CORE", 4, ["collage", "analogue", "box set"], "A sprawling mid-80s landmark where collage, electronics and overload begin merging into the mature project."),
  r("Merzbow", "Cloud Cock OO Grand", 1990, "Japan", "japanoise", "unknown", "CORE", 4, ["analogue", "feedback", "psychedelic"], "Dense analogue noise with more movement and grotesque detail than the later digital monoliths."),
  r("Merzbow", "Venereology", 1994, "Japan", "japanoise", "apple", "START", 5, ["harsh", "analogue", "Relapse"], "Slower, uglier and more suffocating than Pulse Demon; the Merzbow record most likely to appeal to death-metal ears.", "https://music.apple.com/us/album/venereology/281802813"),
  r("Merzbow", "Pulse Demon", 1996, "Japan", "japanoise", "apple", "START", 5, ["digital", "feedback", "classic"], "The famous wall of high-speed digital abrasion. Not the whole genre, merely its most photogenic industrial accident.", "https://music.apple.com/us/album/pulse-demon/281914115"),
  r("Merzbow", "Tauromachine", 1998, "Japan", "japanoise", "unknown", "CORE", 5, ["digital", "rhythmic", "harsh"], "Hyper-detailed digital violence with strong internal motion; a better test of Merzbow’s compositional instincts."),
  r("Merzbow", "1930", 1998, "Japan", "japanoise", "unknown", "DEEP", 4, ["digital", "jazz source", "collage"], "Digital harsh noise folding appropriated jazz material into the churn without softening anything."),
  r("Merzbow", "Merzbeat", 2002, "Japan", "japanoise", "apple", "START", 3, ["rhythmic", "drums", "accessible"], "Loops and drum-derived pulse make this an unusually legible Merzbow entry without turning it into normal music.", "https://music.apple.com/us/album/merzbeat/732096520"),
  r("Masonna", "Shinsen Na Clitoris", 1990, "Japan", "japanoise", "off-platform", "CORE", 5, ["vocals", "psychedelic", "early"], "Raw early Masonna: microphone violence, pedal abuse and psychedelic speed with almost no stable ground."),
  r("Masonna", "Mademoiselle Anne Sanglante ou Notre Nymphomanie Auréolé", 1993, "Japan", "japanoise", "off-platform", "CORE", 5, ["micro-tracks", "vocals", "psychedelic"], "Thirty-one brief eruptions of electronics and vocal belching: a key bridge from noisecore pacing into harsh noise."),
  r("Masonna", "Inner Mind Mystique", 1996, "Japan", "japanoise", "off-platform", "START", 5, ["cut-up", "sci-fi", "vocals"], "Savage editing, sci-fi electronics and screaming; perhaps Masonna’s most clearly composed classic."),
  r("Masonna", "Hyper Chaotic", 1996, "Japan", "japanoise", "off-platform", "CORE", 5, ["micro-tracks", "bleak", "vocals"], "Nineteen short seizures with a darker cast than Spectrum Ripper."),
  r("Masonna", "Spectrum Ripper", 1997, "Japan", "japanoise", "apple", "START", 5, ["micro-tracks", "vocals", "fast"], "Twenty-five manic micro-eruptions. The natural first Masonna record for a Tokyo Anal Dynamite obsessive.", "https://music.apple.com/us/album/spectrum-ripper/502715016"),
  r("Masonna", "Frequency L.S.D.", 1998, "Japan", "japanoise", "apple", "START", 5, ["loops", "psychedelic", "vocals"], "Longer, loopier and more psychedelic than Spectrum Ripper, with enough structure to reveal the craft inside the tantrum.", "https://music.apple.com/us/album/frequency-l-s-d/1590606783"),
  r("Hijokaidan", "Zouroku no Kibyo", 1982, "Japan", "japanoise", "off-platform", "CORE", 4, ["live", "free noise", "punk"], "The origin storm: free jazz, hard-rock wreckage and performance chaos mutating into Japanese noise."),
  r("Hijokaidan", "Modern", 1989, "Japan", "japanoise", "off-platform", "DEEP", 5, ["feedback", "vocals", "live energy"], "A denser mature Hijokaidan statement: screaming, guitar and electronics as unstable mass."),
  r("Incapacitants", "Feedback of N.M.S.", 1991, "Japan", "japanoise", "off-platform", "CORE", 5, ["feedback", "duo", "physical"], "Ecstatic harsh noise generated with the momentum and interpersonal chaos of a free-improv duo."),
  r("Incapacitants", "As Loud as Possible", 1995, "Japan", "japanoise", "off-platform", "START", 5, ["feedback", "duo", "classic"], "A beloved high-water mark: sustained overload that remains mobile, funny and weirdly life-affirming."),
  r("C.C.C.C.", "Cosmic Coincidence Control Center", 1992, "Japan", "japanoise", "off-platform", "START", 4, ["bass", "metal percussion", "psychedelic"], "Electronics, bass, percussion and vocals producing a physical, psychedelic assault rather than a flat treble sheet."),
  r("C.C.C.C.", "Rocket Shrine", 1997, "Japan", "japanoise", "off-platform", "CORE", 5, ["long-form", "psychedelic", "improv"], "Two long improvisations where cosmic ambience is continually flattened by extreme volume."),
  r("Hanatarash", "3", 1989, "Japan", "japanoise", "off-platform", "CORE", 5, ["junk", "performance", "collage"], "Junk-metal chaos, cut-up stupidity and performance-art danger. The venue is theoretically part of the instrumentation."),
  r("Pain Jerk", "Gallon Gravy", 1997, "Japan", "japanoise", "off-platform", "CORE", 5, ["cut-up", "fast", "electronics"], "Brutally fast cut-up harsh noise with sudden edits and a perverse sense of fun."),
  r("Kazumoto Endo", "While You Were Out", 1999, "Japan", "japanoise", "off-platform", "START", 5, ["cut-up", "samples", "precision"], "Surgical editing, pop fragments and perfectly placed blasts. The harsh-noise recommendation for technical-metal brains."),
  r("Government Alpha", "Venomous Cumulus Cloud", 2007, "Japan", "japanoise", "off-platform", "CORE", 5, ["full-spectrum", "feedback", "dense"], "Full-frequency harsh noise with the density of weather and the subtlety of weather entering through a broken roof."),
  r("MSBR", "Structured Suicide", 1993, "Japan", "japanoise", "off-platform", "DEEP", 4, ["analogue", "space noise", "texture"], "Akifumi Nakajima’s textured analogue noise: less manic than Masonna, rich in shifting internal surfaces."),
  r("Violent Onsen Geisha", "Excrete Music", 1991, "Japan", "japanoise", "off-platform", "DEEP", 4, ["collage", "absurdist", "samples"], "Noise collage with pop-cultural vandalism and absurdist timing; closer to a hostile radio play than a wall."),

  // NOISECORE / NOISEGRIND
  r("The Gerogerigegege", "Tokyo Anal Dynamite", 1990, "Japan", "noisecore", "off-platform", "START", 5, ["live", "micro-songs", "hardcore"], "Seventy-five count-ins, blasts and collapses: noisecore’s perfect joke repeated until it becomes revelation."),
  r("The Gerogerigegege", "Instruments Disorder", 1994, "Japan", "noisecore", "off-platform", "CORE", 5, ["micro-songs", "noise", "absurdist"], "A still more atomized assault whose tiny tracks turn structural failure into sequencing."),
  r("Sore Throat", "Disgrace to the Corpse of Sid", 1988, "UK", "noisecore", "off-platform", "START", 4, ["grindcore", "punk", "micro-songs"], "The punk/grind side of the family tree: hundreds of fragments, contempt and badly behaved amplification."),
  r("7 Minutes of Nausea", "Our Culture Is Boring", 1989, "Australia", "noisecore", "off-platform", "CORE", 5, ["micro-songs", "grind", "lo-fi"], "The title is the thesis; the music is hundreds of short objections delivered through a damaged wall."),
  r("Anal Cunt", "88 Song E.P.", 1988, "USA", "noisecore", "off-platform", "DEEP", 5, ["noisegrind", "micro-songs", "lo-fi"], "Historically central American noisegrind: barely songs, mostly count-in and blast. The later catalog’s lyrical ugliness is another matter."),
  r("Fear of God", "As Statues Fell", 1988, "Switzerland", "noisecore", "off-platform", "CORE", 5, ["hardcore", "noisegrind", "female vocals"], "Feral Swiss hardcore collapsing into noisegrind with political force and a completely overloaded mix."),
  r("Arsedestroyer", "Teenass Revolt", 2001, "Sweden", "noisecore", "off-platform", "CORE", 5, ["noisegrind", "bass", "filth"], "Low-end-heavy Swedish noisegrind: a filthy physical smear rather than Gerogerigegege’s snap-cut joke."),
  r("Nikudorei", "Chain of Slavery", 1998, "Japan", "noisecore", "off-platform", "DEEP", 5, ["noisegrind", "Japanese", "raw"], "Japanese noisegrind with the blunt compression and speed of a demo copied far beyond its natural lifespan."),
  r("WORLD", "WORLD", 1995, "Japan", "noisecore", "off-platform", "DEEP", 5, ["noisegrind", "Japanese", "micro-songs"], "An obscure Japanese eruption of blast fragments and complete frequency saturation."),
  r("Deche-Charge", "Best of 1992–2015", 2015, "Canada", "noisecore", "off-platform", "CORE", 5, ["noisecore", "lo-fi", "micro-songs"], "A useful survey of Quebecois noisecore: endlessly crude, brief and allergic to improvement."),
  r("Sete Star Sept", "Visceral Tavern", 2013, "Japan", "noisecore", "unknown", "START", 5, ["bass-drums duo", "noisegrind", "modern"], "Bass-and-drums noisegrind with astonishing momentum and just enough groove to make the chaos hit harder."),
  r("Sedem Minút Strachu", "General Speech", 2017, "Slovakia", "noisecore", "off-platform", "DEEP", 5, ["noisecore", "improv", "modern"], "Improvised noisecore reduced to reflex: short, stupid-fast and refreshingly uninterested in polish."),

  // HARSH NOISE WALL
  r("The Rita", "Thousands of Dead Gods", 2006, "Canada", "harsh-noise-wall", "off-platform", "START", 5, ["wall", "texture", "ocean"], "A canonical wall: fixed pressure whose tiny surface changes become the entire listening experience."),
  r("The Rita", "Bodies Bear Traces of Carnal Violence", 2008, "Canada", "harsh-noise-wall", "off-platform", "CORE", 5, ["wall", "texture", "conceptual"], "Dense static examined as physical material rather than an event progressing through time."),
  r("Vomir", "Proanomie", 2006, "France", "harsh-noise-wall", "off-platform", "START", 5, ["wall", "no dynamics", "minimal"], "HNW doctrine in pure form: no development, no relief, only the static object."),
  r("Werewolf Jerusalem", "Masked Spider of the First", 2007, "USA", "harsh-noise-wall", "off-platform", "CORE", 5, ["wall", "horror", "Richard Ramirez"], "Richard Ramirez’s horror-coded wall noise: coarse, immobile and slightly less anonymous than pure Vomir."),
  r("Richard Ramirez", "The Family Doctor", 2003, "USA", "harsh-noise-wall", "off-platform", "DEEP", 5, ["wall", "death industrial", "horror"], "A grim intersection of wall texture and death-industrial atmosphere."),
  r("The Cherry Point", "Night of the Bloody Tapes", 2002, "USA", "harsh-noise-wall", "off-platform", "DEEP", 5, ["harsh noise", "wall", "analogue"], "Violent American harsh noise whose thick analogue surfaces point toward wall without becoming fully static."),
  r("Macronympha", "Pittsburgh, Pennsylvania", 1995, "USA", "harsh-noise-wall", "off-platform", "CORE", 5, ["junk noise", "American", "texture"], "Classic American junk noise: dense, filthy layers with more movement and object impact than formal HNW."),
  r("Pedestrian Deposit", "Fatale", 2006, "USA", "harsh-noise-wall", "unknown", "START", 4, ["dynamic noise", "cello", "quiet-loud"], "Not wall noise, but an ideal antidote: exquisite silence and acoustic detail detonating into overwhelming harshness."),
  r("Kevin Drumm", "Sheer Hellish Miasma", 2002, "USA", "harsh-noise-wall", "apple", "START", 5, ["digital", "guitar", "harsh"], "Digital/guitar noise with immense mass and internal detail; one of the major non-Japanese harsh-noise landmarks."),
  r("Jason Crumer", "Ottoman Black", 2008, "USA", "harsh-noise-wall", "unknown", "CORE", 5, ["dynamic noise", "narrative", "American"], "Carefully paced American noise that uses silence, field recording and extreme impact to tell a bleak story."),

  // METAL / NOISE BRIDGE
  r("Full of Hell & Merzbow", "Full of Hell & Merzbow", 2014, "USA / Japan", "metal-noise", "unknown", "START", 5, ["grindcore", "harsh noise", "collaboration"], "The obvious bridge because it works: powerviolence/grind structure flooded with Merzbow electronics."),
  r("Knelt Rote", "Alterity", 2018, "USA", "metal-noise", "unknown", "CORE", 5, ["grindcore", "death metal", "industrial"], "Death/grind repeatedly swallowed by industrial noise, with both halves made more hostile by the collision."),
  r("The Body", "I Shall Die Here", 2014, "USA", "metal-noise", "apple", "START", 4, ["doom", "electronic", "low-end"], "Doom metal deconstructed by The Haxan Cloak into sub-bass, electronics and dread."),
  r("The Body & Full of Hell", "One Day You Will Ache Like I Ache", 2016, "USA", "metal-noise", "apple", "START", 5, ["sludge", "grind", "noise"], "A very effective collision of The Body’s broken doom and Full of Hell’s blast violence.", "https://music.apple.com/us/album/one-day-you-will-ache-like-i-ache/1714902150"),
  r("Uniform", "Wake in Fright", 2017, "USA", "metal-noise", "apple", "START", 4, ["industrial metal", "drum machine", "noise rock"], "Rigid drum-machine violence and guitar abrasion with actual songs underneath, begrudgingly.", "https://music.apple.com/us/album/wake-in-fright/1180668003"),
  r("Author & Punisher", "Beastland", 2018, "USA", "metal-noise", "apple", "START", 4, ["industrial metal", "machines", "low-end"], "Custom-machine industrial metal built around physical control, huge low end and riffs crushed into mechanisms.", "https://music.apple.com/us/album/beastland/1410433917"),
  r("Gnaw Their Tongues", "All the Slaves Shall Serve", 2009, "Netherlands", "metal-noise", "apple", "CORE", 5, ["black metal", "orchestral", "noise"], "Blackened orchestral horror and harsh electronics mixed into a maximal, suffocating mass."),
  r("Sutekh Hexen", "Become", 2012, "USA", "metal-noise", "apple", "CORE", 5, ["black metal", "harsh noise", "ritual"], "Black metal reduced to buried gesture inside fifteen-minute waves of feedback and decay.", "https://music.apple.com/us/album/become/959033782"),
  r("Street Sects", "End Position", 2016, "USA", "metal-noise", "apple", "START", 4, ["industrial punk", "hardcore", "electronic"], "Hardcore panic rendered through samplers and industrial production; concise enough to remain lethal."),
  r("Street Sects", "The Kicking Mule", 2018, "USA", "metal-noise", "apple", "CORE", 4, ["industrial punk", "noise", "songwriting"], "A more varied second statement that keeps the violent electronics while making the songs more emotionally legible.", "https://music.apple.com/us/album/the-kicking-mule/1424644293"),
  r("Wolf Eyes", "Burned Mind", 2004, "USA", "metal-noise", "apple", "START", 4, ["Michigan noise", "sax", "industrial"], "American basement noise with rhythm, saxophone and ruined electronics; ugly, memorable and surprisingly approachable.", "https://music.apple.com/us/album/burned-mind/21133124"),
  r("Yellow Swans", "Going Places", 2010, "USA", "metal-noise", "apple", "START", 3, ["drone", "guitar", "emotional"], "Noise as widescreen emotional movement: distortion blooming into something nearly beautiful, the traitor."),
  r("Dreamcrusher", "Suicide Deluxe", 2015, "USA", "metal-noise", "unknown", "CORE", 5, ["nihilist queer revolt", "rhythmic noise", "live"], "Rhythmic harsh noise with punk physicality and overwhelming live energy."),
  r("Uboa", "The Origin of My Depression", 2019, "Australia", "metal-noise", "unknown", "CORE", 4, ["drone", "vocals", "experimental"], "Noise, ambient space and extreme vocals shaped into a precise album about dysphoria and psychic collapse."),
  r("Abjection Ritual", "Soul of Ruin, Body of Filth", 2018, "USA", "metal-noise", "off-platform", "CORE", 5, ["death industrial", "metal", "low-end"], "Death industrial with the physical heft and corrupted atmosphere of extreme metal."),
  r("Intensive Care", "Voyeurism", 2019, "Canada", "metal-noise", "off-platform", "CORE", 5, ["power electronics", "grind", "industrial"], "Power electronics made by people who understand hardcore and grind impact: short, percussive and blunt."),
  r("Endon", "Through the Mirror", 2017, "Japan", "metal-noise", "unknown", "CORE", 5, ["black metal", "noise", "screamo"], "Japanese extreme metal and electronics colliding at full panic, produced with unusual clarity."),
  r("White Suns", "Totem", 2014, "USA", "metal-noise", "apple", "DEEP", 4, ["noise rock", "composition", "guitar"], "Noise rock stripped of swagger and rebuilt as tense, angular composition."),
  r("The Body", "I Have Fought Against It, but I Can’t Any Longer.", 2018, "USA", "metal-noise", "apple", "DEEP", 4, ["collage", "doom", "electronic"], "The Body operating more like a noise collective than a metal band: samples, guests, sub-bass and grief.", "https://music.apple.com/us/album/i-have-fought-against-it-but-i-cant-any-longer/1342846707"),
  r("Prurient", "Frozen Niagara Falls", 2015, "USA", "metal-noise", "apple", "START", 4, ["synth", "power electronics", "melodic"], "A massive modern survey of Prurient’s vocabulary: PE, synth melody, field recording and emotional collapse.", "https://music.apple.com/us/album/frozen-niagara-falls/980409763"),
];

export const releaseKey = (artist: string, title: string) =>
  `${artist}|||${title}`;

export const ROUTES: Route[] = [
  {
    id: "atrax",
    number: "01",
    title: "THE SEALED ROOM",
    subtitle: "From Atrax Morgue into death industrial",
    description:
      "Minimal synth pulse, pathology, mortuary ambience and the slow realization that the door does not open from this side.",
    color: "red",
    releaseKeys: [
      releaseKey("Atrax Morgue", "In Search of Death"),
      releaseKey("The Sodality", "Beyond Unknown Pleasures"),
      releaseKey("Brighter Death Now", "Necrose Evangelicum"),
      releaseKey("Megaptera", "Beyond the Shadow"),
      releaseKey("IRM", "Virgin Mind"),
      releaseKey("Controlled Death", "Symphony for the Black Murder"),
      releaseKey("Anenzephalia", "Ephemeral Dawn"),
      releaseKey("Propergol", "Program Vengeance"),
    ],
  },
  {
    id: "tokyo",
    number: "02",
    title: "ELECTRICAL FIRE",
    subtitle: "From Tokyo Anal Dynamite into Japanoise",
    description:
      "Micro-songs first, then precision cut-ups, ecstatic duo overload and finally long-form full-spectrum damage.",
    color: "white",
    releaseKeys: [
      releaseKey("The Gerogerigegege", "Tokyo Anal Dynamite"),
      releaseKey("Masonna", "Spectrum Ripper"),
      releaseKey("Masonna", "Frequency L.S.D."),
      releaseKey("Pain Jerk", "Gallon Gravy"),
      releaseKey("Kazumoto Endo", "While You Were Out"),
      releaseKey("Incapacitants", "As Loud as Possible"),
      releaseKey("C.C.C.C.", "Rocket Shrine"),
      releaseKey("Government Alpha", "Venomous Cumulus Cloud"),
    ],
  },
  {
    id: "whitehouse",
    number: "03",
    title: "VOICE / WEAPON",
    subtitle: "A power electronics initiation",
    description:
      "Start with the genre’s most legible mature records, then work backward toward pure feedback and forward into modern psychic pressure.",
    color: "gray",
    releaseKeys: [
      releaseKey("Whitehouse", "Great White Death"),
      releaseKey("Whitehouse", "Bird Seed"),
      releaseKey("Consumer Electronics", "Estuary English"),
      releaseKey("Genocide Organ", "Leichenlinie"),
      releaseKey("Deathpile", "G.R."),
      releaseKey("Grunt", "Seer of Decay"),
      releaseKey("Puce Mary", "The Drought"),
      releaseKey("Pharmakon", "Bestial Burden"),
    ],
  },
  {
    id: "metal",
    number: "04",
    title: "BLAST FURNACE",
    subtitle: "Extreme metal loses structural integrity",
    description:
      "Keep percussion and low end at first; gradually remove riffs, meters and all remaining workplace protections.",
    color: "red",
    releaseKeys: [
      releaseKey("Full of Hell & Merzbow", "Full of Hell & Merzbow"),
      releaseKey("Knelt Rote", "Alterity"),
      releaseKey("The Body & Full of Hell", "One Day You Will Ache Like I Ache"),
      releaseKey("Uniform", "Wake in Fright"),
      releaseKey("Sutekh Hexen", "Become"),
      releaseKey("Abjection Ritual", "Soul of Ruin, Body of Filth"),
      releaseKey("Kevin Drumm", "Sheer Hellish Miasma"),
      releaseKey("The Rita", "Thousands of Dead Gods"),
    ],
  },
  {
    id: "merzbow",
    number: "05",
    title: "BEYOND PULSE DEMON",
    subtitle: "Merzbow as a body of work, not a meme",
    description:
      "Move from the famous digital blast toward analogue density, rhythmic experiments, collage and adjacent masters.",
    color: "white",
    releaseKeys: [
      releaseKey("Merzbow", "Pulse Demon"),
      releaseKey("Merzbow", "Venereology"),
      releaseKey("Merzbow", "Tauromachine"),
      releaseKey("Merzbow", "Merzbeat"),
      releaseKey("Merzbow", "Cloud Cock OO Grand"),
      releaseKey("MSBR", "Structured Suicide"),
      releaseKey("Incapacitants", "Feedback of N.M.S."),
      releaseKey("Kevin Drumm", "Sheer Hellish Miasma"),
    ],
  },
];

export const GLOSSARY = [
  ["HARSH NOISE", "Dense electronic sound emphasizing texture, saturation and rapid internal movement rather than melody or meter."],
  ["POWER ELECTRONICS", "Confrontational vocals over feedback, synth pressure, samples and repetition. Content is often deliberately extreme."],
  ["DEATH INDUSTRIAL", "A slower, darker cousin of power electronics built from drones, diseased loops, ritual atmosphere and low-frequency weight."],
  ["JAPANOISE", "A scene descriptor, not one sound: harsh noise, free improvisation, collage, performance art and psychedelic electronics from Japan."],
  ["NOISECORE", "Hardcore/grind reduced to tiny bursts, count-ins, blastbeats, screaming and intentional structural collapse."],
  ["HARSH NOISE WALL", "A largely static block of noise where microscopic texture replaces conventional development."],
  ["CUT-UP", "Fast, sharply edited changes between distinct noise sources; Pain Jerk and Kazumoto Endo are central examples."],
  ["JUNK NOISE", "Harsh noise incorporating amplified metal, objects and physical impact rather than electronics alone."],
  ["PE", "Power electronics. Unfortunately also physical education, which is usually quieter."],
];

export const TIMELINE = [
  ["1977–82", "Industrial prehistory", "Tape collage, metal percussion and anti-music establish the methods before noise divides into recognizable subgenres."],
  ["1980–87", "Power electronics", "Whitehouse, Consumer Electronics, Ramleh and Italian contemporaries make confrontation, feedback and voice the central materials."],
  ["1981–90", "Japanese ignition", "Hijokaidan, Merzbow and an expanding cassette network turn free noise, electronics and extreme performance into a scene."],
  ["1988–95", "Atomization", "Noisecore miniatures, Japanese cut-ups and the first death-industrial landmarks all push extremity in incompatible directions."],
  ["1995–2005", "Codification", "Pulse Demon, major Incapacitants and Masonna records, mature Whitehouse, HNW and a global PE network define durable forms."],
  ["2005–now", "Cross-contamination", "Metal, club rhythm, ambient composition and modern PE continually borrow noise methods without asking permission."],
];
