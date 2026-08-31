// Word lists for generating random, easy-to-say-out-loud room codes,
// e.g. "silent-jumping-tiger". Loaded as a plain script (no bundler),
// so it just defines globals on window.
const ADJECTIVES = [
  "quiet", "silent", "brave", "clever", "gentle", "happy", "lucky", "swift",
  "bold", "calm", "eager", "fuzzy", "jolly", "kind", "lively", "mighty",
  "noble", "proud", "quick", "rusty", "shiny", "spicy", "witty", "zesty",
  "cheerful", "curious", "daring", "elegant", "friendly", "graceful",
  "humble", "icy", "jumpy", "keen", "loyal", "merry", "nimble", "odd",
  "playful", "rowdy", "sleepy", "tidy", "upbeat", "vivid", "wild", "young",
  "ancient", "breezy", "chilly", "dusty", "epic", "fancy", "golden",
  "hollow", "iron", "jagged", "lazy", "misty", "neat", "orange", "purple",
  "quirky", "royal", "salty", "tiny", "urban", "velvet", "warm", "amber",
  "bright", "crimson", "dizzy", "electric", "frosty", "giant", "hidden",
  "inky", "jade", "khaki", "lemon", "magic", "navy", "olive", "polar",
];

const VERBS = [
  "jumping", "running", "flying", "diving", "climbing", "dancing", "singing",
  "dashing", "gliding", "hopping", "racing", "sliding", "spinning",
  "swimming", "trotting", "walking", "zooming", "bouncing", "chasing",
  "creeping", "drifting", "exploring", "floating", "galloping", "hiding",
  "jogging", "kicking", "leaping", "marching", "nesting", "orbiting",
  "painting", "quacking", "rolling", "sailing", "skating", "sneaking",
  "sprinting", "stomping", "surfing", "twirling", "wandering", "waving",
  "whistling", "wobbling", "zigzagging", "blinking", "cruising", "darting",
];

const NOUNS = [
  "tiger", "otter", "eagle", "panda", "wolf", "fox", "hawk", "lion", "bear",
  "deer", "owl", "shark", "whale", "dolphin", "falcon", "rabbit", "koala",
  "lynx", "moose", "raven", "badger", "beaver", "camel", "cobra", "crane",
  "dragon", "ferret", "gecko", "heron", "ibex", "jaguar", "kite", "llama",
  "mantis", "newt", "orca", "panther", "quail", "raccoon", "seal", "tapir",
  "urchin", "viper", "walrus", "yak", "zebra", "comet", "meadow", "canyon",
  "harbor", "island", "meteor", "nebula", "prairie", "quarry", "river",
  "summit", "tundra", "valley",
];

function pick(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function generateRoomCode() {
  return `${pick(ADJECTIVES)}-${pick(VERBS)}-${pick(NOUNS)}`;
}
