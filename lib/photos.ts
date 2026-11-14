import { asset } from "./site";

/**
 * Every photo has two exports in public/img: `<id>.webp` (1200–1800px) and `<id>-s.webp` (900px).
 * To add a photo: export both sizes, add its dimensions to DIM, then list it where it should appear.
 */
export const DIM = {
  "beach-blur": [1200, 1800],
  "fog-embrace": [1200, 1800],
  "forehead-fog": [1200, 1800],
  "hands-fog": [1200, 1800],
  "hill-run": [1200, 1800],
  "laugh-fog": [1200, 1800],
  "motion-kiss": [1200, 1800],
  piggyback: [1800, 1200],
  ref2: [1024, 1536],
  ref3: [1024, 1536],
  ref4: [1024, 1536],
  ref5: [1024, 1536],
  ref7: [1229, 1536],
  "selfie-laugh": [1200, 1800],
  "stage-crowd": [1440, 1800],
  "stage-diptych-a": [1440, 1800],
  "stage-green": [1200, 1500],
  "stage-keys": [1200, 1500],
  "stage-lights": [1440, 1800],
  "stage-triptych": [1200, 1500],
  "valley-hands": [1200, 1800],
  "watch-hug": [1200, 1800],
  windmill: [1200, 1800],
  // bridal portraits
  "bride-gold-smile": [1200, 1800],
  "bride-bangles-bw": [1200, 1800],
  "bride-mehndi": [1200, 1800],
  "bride-veil-light": [1200, 1800],
  "bride-pillar": [1200, 1800],
  "bride-glance": [1200, 1800],
  "bride-close": [1200, 1800],
  "bride-bangles": [1200, 1800],
  "bride-saree": [1200, 1800],
  "bride-throne": [1200, 1800],
  "bride-seated": [1200, 1800],
  // engagements
  "eng-forehead": [1200, 1800],
  "eng-rings": [1800, 1200],
  "eng-hold": [1200, 1800],
  "eng-hands-bw": [1800, 1200],
  "eng-embrace": [1200, 1800],
  "eng-mist": [1200, 1800],
  "eng-portrait": [1200, 1800],
  "eng-ring-stage": [1200, 1800],
  "eng-gramophone": [1200, 1800],
  // couple shoots
  "beach-bike": [1200, 1800],
  "beach-whirl": [1200, 1800],
  "beach-dance": [1200, 1800],
  "grove-hug": [1200, 1800],
  "grove-wide": [1200, 1800],
  "grove-laugh": [1200, 1800],
  "grove-walk": [1200, 1800],
} as const satisfies Record<string, readonly [number, number]>;

export type PhotoId = keyof typeof DIM;

export type Photo = { id: PhotoId; alt: string; caption?: string };

export const small = (id: PhotoId) => asset(`/img/${id}-s.webp`);
export const large = (id: PhotoId) => asset(`/img/${id}.webp`);
export const srcSet = (id: PhotoId) => `${small(id)} 900w, ${large(id)} ${DIM[id][0]}w`;

/* ---------- featured story ---------- */
export type StoryShape = "tall" | "mid" | "wide" | "up";

export const STORY: (Photo & { shape: StoryShape; sizes: string })[] = [
  { id: "fog-embrace", shape: "tall", alt: "Couple embracing on a foggy trail", caption: "In the fog", sizes: "(max-width:899px) 72vw, 30vw" },
  { id: "laugh-fog", shape: "mid", alt: "Bride laughing with her head thrown back", caption: "The laugh", sizes: "(max-width:899px) 72vw, 24vw" },
  { id: "piggyback", shape: "wide", alt: "Bride riding piggyback, both laughing", caption: "Piggyback", sizes: "(max-width:899px) 86vw, 46vw" },
  { id: "hill-run", shape: "up", alt: "Couple running hand in hand up a hill path", caption: "Up the trail", sizes: "(max-width:899px) 72vw, 22vw" },
  { id: "windmill", shape: "tall", alt: "A tiny couple running beside a wind turbine", caption: "Wind farm", sizes: "(max-width:899px) 72vw, 30vw" },
  { id: "motion-kiss", shape: "mid", alt: "Motion-blurred close-up of the couple", caption: "Motion", sizes: "(max-width:899px) 72vw, 24vw" },
  { id: "watch-hug", shape: "up", alt: "Close crop of a hug, her hand on his arm", caption: "Details", sizes: "(max-width:899px) 72vw, 22vw" },
  { id: "valley-hands", shape: "tall", alt: "Couple holding hands looking over a green valley", caption: "The valley", sizes: "(max-width:899px) 72vw, 30vw" },
];

/* ---------- portfolio grid ---------- */
export type Kind = "bridal" | "engagement" | "couple" | "stage";

/* The grid fills column by column, so each column is a run of this list: keep kinds alternating so every
   column (2, 3 or 4 of them) opens on a different kind of shot and none is all one category. */
export const GRID: (Photo & { kind: Kind })[] = [
  { id: "beach-dance", kind: "couple", alt: "Dancing in the surf" },
  { id: "eng-forehead", kind: "engagement", alt: "Foreheads together, rings on" },
  { id: "bride-veil-light", kind: "bridal", alt: "Light through the veil" },
  { id: "stage-lights", kind: "stage", alt: "Under the rig" },
  { id: "selfie-laugh", kind: "couple", alt: "Rain-soaked and grinning" },
  { id: "eng-rings", kind: "engagement", alt: "The ring exchange" },
  { id: "bride-bangles-bw", kind: "bridal", alt: "Bangles and a grin, in black and white" },
  { id: "grove-walk", kind: "couple", alt: "Walking through the grove" },
  { id: "hands-fog", kind: "couple", alt: "Promise" },
  { id: "eng-embrace", kind: "engagement", alt: "Held close at the engagement" },
  { id: "bride-glance", kind: "bridal", alt: "A glance back in silk and gold" },
  { id: "stage-crowd", kind: "stage", alt: "Into the crowd" },
  { id: "beach-whirl", kind: "couple", alt: "A blur of joy on the beach" },
  { id: "eng-mist", kind: "engagement", alt: "Final touches in the mist" },
  { id: "grove-laugh", kind: "couple", alt: "Cake, and the laugh after" },
  { id: "bride-pillar", kind: "bridal", alt: "Bride by the carved pillar" },
  { id: "eng-hands-bw", kind: "engagement", alt: "Hands, rings, black and white" },
  { id: "ref3", kind: "couple", alt: "Held close" },
  { id: "stage-triptych", kind: "stage", alt: "Phones up" },
  { id: "bride-close", kind: "bridal", alt: "Jasmine, jewels and a smile" },
  { id: "beach-bike", kind: "couple", alt: "Shoreline ride" },
  { id: "eng-portrait", kind: "engagement", alt: "Bride-to-be portrait" },
  { id: "bride-throne", kind: "bridal", alt: "Seated in the glow" },
  { id: "ref7", kind: "couple", alt: "Shya & Mounica" },
  { id: "grove-hug", kind: "couple", alt: "Among the trees" },
  { id: "eng-hold", kind: "engagement", alt: "Under the flower canopy" },
  { id: "bride-gold-smile", kind: "bridal", alt: "Bride smiling in warm golden light" },
  { id: "laugh-fog", kind: "couple", alt: "The laugh" },
  { id: "stage-diptych-a", kind: "stage", alt: "Two moments" },
  { id: "eng-gramophone", kind: "engagement", alt: "Portrait with the gramophone" },
  { id: "bride-bangles", kind: "bridal", alt: "Bangles and mehndi" },
  { id: "grove-wide", kind: "couple", alt: "Small in a big landscape" },
  { id: "beach-blur", kind: "couple", alt: "Shoreline" },
  { id: "bride-saree", kind: "bridal", alt: "Silk, gold and mehndi" },
  { id: "ref4", kind: "couple", alt: "Into the hills" },
  { id: "eng-ring-stage", kind: "engagement", alt: "Rings on stage" },
  { id: "valley-hands", kind: "couple", alt: "The valley" },
  { id: "ref5", kind: "couple", alt: "Almost" },
  { id: "bride-seated", kind: "bridal", alt: "Bride seated by the lamp" },
  { id: "ref2", kind: "couple", alt: "Monsoon hug" },
  { id: "watch-hug", kind: "couple", alt: "Details" },
  { id: "motion-kiss", kind: "couple", alt: "Motion" },
];

/* ---------- bridal feature ---------- */
export const BRIDAL: (Photo & { sizes: string })[] = [
  { id: "bride-gold-smile", alt: "Bride smiling in warm golden light", sizes: "(max-width:979px) 100vw, 40vw" },
  { id: "bride-bangles-bw", alt: "Bride laughing behind her bangles, black and white", sizes: "(max-width:979px) 50vw, 32vw" },
  { id: "bride-mehndi", alt: "Mehndi hands and glass bangles", sizes: "(max-width:979px) 50vw, 24vw" },
];

/* ---------- concerts ---------- */
export const STAGE: (Photo & { sizes: string })[] = [
  { id: "stage-lights", alt: "A performer under a rig of white stage lights", sizes: "(max-width:979px) 100vw, 40vw" },
  { id: "stage-green", alt: "Performer at a keyboard with red stage visuals", sizes: "(max-width:979px) 50vw, 32vw" },
  { id: "stage-keys", alt: "Performer at a keyboard under truss lights", sizes: "(max-width:979px) 50vw, 24vw" },
];

/* ---------- services ---------- */
export const SERVICES: { title: string; text: string; img: PhotoId }[] = [
  { title: "Weddings", text: "Every ritual from haldi to reception, told as one continuous story.", img: "bride-gold-smile" },
  { title: "Pre-wedding & couples", text: "A slow afternoon somewhere that means something to the two of you.", img: "hands-fog" },
  { title: "Engagements", text: "The ring, the families, the nervous first dance.", img: "eng-embrace" },
  { title: "Concerts & events", text: "Live coverage for artists, organisers and brands.", img: "stage-crowd" },
];
