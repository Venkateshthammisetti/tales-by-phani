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
export type Kind = "couple" | "stage";

export const GRID: (Photo & { kind: Kind })[] = [
  { id: "selfie-laugh", kind: "couple", alt: "Rain-soaked and grinning" },
  { id: "stage-lights", kind: "stage", alt: "Under the rig" },
  { id: "ref3", kind: "couple", alt: "Held close" },
  { id: "hands-fog", kind: "couple", alt: "Promise" },
  { id: "ref7", kind: "couple", alt: "Shya & Mounica" },
  { id: "stage-crowd", kind: "stage", alt: "Into the crowd" },
  { id: "beach-blur", kind: "couple", alt: "Shoreline" },
  { id: "ref4", kind: "couple", alt: "Into the hills" },
  { id: "laugh-fog", kind: "couple", alt: "The laugh" },
  { id: "stage-triptych", kind: "stage", alt: "Phones up" },
  { id: "ref5", kind: "couple", alt: "Almost" },
  { id: "valley-hands", kind: "couple", alt: "The valley" },
  { id: "ref2", kind: "couple", alt: "Monsoon hug" },
  { id: "stage-diptych-a", kind: "stage", alt: "Two moments" },
  { id: "watch-hug", kind: "couple", alt: "Details" },
  { id: "motion-kiss", kind: "couple", alt: "Motion" },
];

/* ---------- concerts ---------- */
export const STAGE: (Photo & { sizes: string })[] = [
  { id: "stage-lights", alt: "A performer under a rig of white stage lights", sizes: "(max-width:979px) 100vw, 40vw" },
  { id: "stage-green", alt: "Performer at a keyboard with red stage visuals", sizes: "(max-width:979px) 50vw, 32vw" },
  { id: "stage-keys", alt: "Performer at a keyboard under truss lights", sizes: "(max-width:979px) 50vw, 24vw" },
];

/* ---------- services ---------- */
export const SERVICES: { title: string; text: string; img: PhotoId }[] = [
  { title: "Weddings", text: "Every ritual from haldi to reception, told as one continuous story.", img: "selfie-laugh" },
  { title: "Pre-wedding & couples", text: "A slow afternoon somewhere that means something to the two of you.", img: "hands-fog" },
  { title: "Engagements", text: "The ring, the families, the nervous first dance.", img: "ref7" },
  { title: "Concerts & events", text: "Live coverage for artists, organisers and brands.", img: "stage-crowd" },
];
