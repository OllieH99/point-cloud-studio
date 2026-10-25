# Notices and licences

## Software (npm, versions pinned in package-lock.json)

| Package | Version | Licence |
|---|---|---|
| three | 0.186.1 | MIT |
| onnxruntime-web | 1.30.0 | MIT (Microsoft) |
| mediabunny | 1.61.6 | MPL-2.0 (unmodified library, used as a dependency) |
| fflate | 0.8.2 | MIT |
| vite, typescript, vitest | dev only | MIT / Apache-2.0 |

## Model weights

Depth Anything V2 Small, ONNX conversion by onnx-community
(https://huggingface.co/onnx-community/depth-anything-v2-small): `model_fp16.onnx` (WebGPU) and
`model_quantized.onnx` (WASM). Released under **Apache-2.0** by Lihe Yang, Bingyi Kang, Zilong Huang,
Zhen Zhao, Xiaogang Xu, Jiashi Feng and Hengshuang Zhao. Only the Small model is used; the larger
Depth Anything V2 variants have different (non-commercial) terms. SHA-256 hashes are in
`public/models/manifest.json`.

## Fonts

IBM Plex Sans and IBM Plex Mono (SIL Open Font License 1.1), served by Google Fonts.

## Sample media (Wikimedia Commons, CC0 / public domain; resized, metadata stripped)

- Portrait: "Curly hair and freckles man (Unsplash).jpg", CC0
- "Marble bust of Herodotos MET DP328506.jpg", The Met, CC0
- "Water lily on black (Unsplash).jpg", CC0
- "Bust of Germanicus, front - Getty Museum (2021.66).jpg", CC0
- "Black Cat (22553764744).jpg", CC0
- "Frangipani - Plumeria flowers on a black background.jpg", CC0
- "Siberian portrait (Unsplash).jpg", CC0
- "Fleabane With Black Background.jpg", CC0
- "Grouchy Persian cat (Unsplash).jpg", CC0
- Video: "Annabelle butterfly dance 1894.ogv" (Edison Manufacturing Co.), CC0, transcoded to H.264 MP4 at 768×576

Full source URLs are listed in `src/ui/actions.ts` (`SAMPLES`). Sample depth maps were precomputed
with the same Depth Anything V2 Small weights (`scripts/precompute-sample-depth.mjs`).

The demo beat is original: it is synthesized in the browser by `src/audio/demoTrack.ts`.
