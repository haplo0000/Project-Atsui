# Project Atsui — Production Layer Manifest

Checklist of every production layer required for the layered sprite renderer and future Live2D rig.

**Status key:** `[ ]` TODO · `[~]` In progress · `[x]` Done · `[—]` Not applicable

Update this file when a layer is exported to `Exports/Runtime/`.

---

## Base body

| Status | Layer ID | File name | PSD group | Notes |
|--------|----------|-----------|-----------|-------|
| [ ] | body | `atsui_body.png` | Body | Torso/base silhouette |
| [ ] | head | `atsui_head.png` | Head | Face base without features |
| [ ] | neck | `atsui_neck.png` | Neck | Connects head to torso |

---

## Hair

| Status | Layer ID | File name | PSD group | Notes |
|--------|----------|-----------|-----------|-------|
| [ ] | hair_back | `atsui_hair_back.png` | Hair/Back | Behind head and ears |
| [ ] | hair_front | `atsui_hair_front.png` | Hair/Front | Bangs and front strands |
| [ ] | hair_side_l | `atsui_hair_side_l.png` | Hair/Side_L | Optional side lock left |
| [ ] | hair_side_r | `atsui_hair_side_r.png` | Hair/Side_R | Optional side lock right |

---

## Eyes

| Status | Layer ID | File name | PSD group | Notes |
|--------|----------|-----------|-----------|-------|
| [ ] | eyes_white_l | `atsui_eyes_white_l.png` | Eyes/White_L | Sclera left |
| [ ] | eyes_white_r | `atsui_eyes_white_r.png` | Eyes/White_R | Sclera right |
| [ ] | eyes_open | `atsui_eyes_open.png` | Eyes/Open | Combined open state (sprite fallback) |
| [ ] | eyes_closed | `atsui_eyes_closed.png` | Eyes/Closed | Blink frame |

---

## Pupils

| Status | Layer ID | File name | PSD group | Notes |
|--------|----------|-----------|-----------|-------|
| [ ] | pupil_l | `atsui_pupil_l.png` | Pupils/Left | Left iris+pupil |
| [ ] | pupil_r | `atsui_pupil_r.png` | Pupils/Right | Right iris+pupil |
| [ ] | pupil_highlight_l | `atsui_pupil_highlight_l.png` | Pupils/Highlight_L | Specular left |
| [ ] | pupil_highlight_r | `atsui_pupil_highlight_r.png` | Pupils/Highlight_R | Specular right |

---

## Eyelids

| Status | Layer ID | File name | PSD group | Notes |
|--------|----------|-----------|-----------|-------|
| [ ] | eyelid_upper_l | `atsui_eyelid_upper_l.png` | Eyelids/Upper_L | |
| [ ] | eyelid_upper_r | `atsui_eyelid_upper_r.png` | Eyelids/Upper_R | |
| [ ] | eyelid_lower_l | `atsui_eyelid_lower_l.png` | Eyelids/Lower_L | |
| [ ] | eyelid_lower_r | `atsui_eyelid_lower_r.png` | Eyelids/Lower_R | |
| [ ] | eyelash_l | `atsui_eyelash_l.png` | Eyelids/Lash_L | Optional |
| [ ] | eyelash_r | `atsui_eyelash_r.png` | Eyelids/Lash_R | Optional |

---

## Mouth

| Status | Layer ID | File name | PSD group | Notes |
|--------|----------|-----------|-----------|-------|
| [ ] | mouth_neutral | `atsui_mouth_neutral.png` | Mouth/Neutral | Default closed/neutral |
| [ ] | mouth_open | `atsui_mouth_open.png` | Mouth/Open | Speech shape |
| [ ] | mouth_smile | `atsui_mouth_smile.png` | Mouth/Smile | Expression variant |

---

## Limbs

| Status | Layer ID | File name | PSD group | Notes |
|--------|----------|-----------|-----------|-------|
| [ ] | arm_l | `atsui_arm_l.png` | Arms/Left | |
| [ ] | arm_r | `atsui_arm_r.png` | Arms/Right | |
| [ ] | hand_l | `atsui_hand_l.png` | Hands/Left | |
| [ ] | hand_r | `atsui_hand_r.png` | Hands/Right | |
| [ ] | leg_l | `atsui_leg_l.png` | Legs/Left | |
| [ ] | leg_r | `atsui_leg_r.png` | Legs/Right | |
| [ ] | foot_l | `atsui_foot_l.png` | Feet/Left | |
| [ ] | foot_r | `atsui_foot_r.png` | Feet/Right | |

---

## Features

| Status | Layer ID | File name | PSD group | Notes |
|--------|----------|-----------|-----------|-------|
| [ ] | ears | `atsui_ears.png` | Ears | Cat ears pair |
| [ ] | tail | `atsui_tail.png` | Tail | Full tail default pose |
| [ ] | bell | `atsui_bell.png` | Bell | Collar bell accessory |

---

## Outfits — base

| Status | Layer ID | File name | PSD group | Notes |
|--------|----------|-----------|-----------|-------|
| [ ] | bikini_top | `atsui_bikini_top.png` | Outfit/Bikini/Top | |
| [ ] | bikini_bottom | `atsui_bikini_bottom.png` | Outfit/Bikini/Bottom | |

---

## Outfits — mode accessories

| Status | Layer ID | File name | Mode | App mode |
|--------|----------|-----------|------|----------|
| [ ] | glasses | `atsui_glasses.png` | Analyst | `ANALYST` |
| [ ] | hoodie | `atsui_hoodie.png` | Sleep | `SLEEP` |
| [ ] | raincoat | `atsui_raincoat.png` | Professional | `PROFESSIONAL` |
| [ ] | bowtie | `atsui_bowtie.png` | Professional | `PROFESSIONAL` |
| [ ] | headphones | `atsui_headphones.png` | Gaming | `GAMING` |
| [ ] | helmet | `atsui_helmet.png` | Overheated | `OVERHEATED` |

---

## HUD accessories

Overlay elements rendered by the app HUD, not the avatar rig (optional art refs).

| Status | Layer ID | File name | Notes |
|--------|----------|-----------|-------|
| [ ] | hud_ring | — | App-rendered; optional ref in `Master/References/` |
| [ ] | hud_data_lines | — | Analyst mode decoration ref |
| [ ] | hud_neural_pulse | — | AI Processing mode decoration ref |
| [ ] | hud_warning_stripe | — | Overheated mode decoration ref |
| [ ] | hud_mode_icon_idle | `atsui_hud_icon_idle.png` | Optional icon set |
| [ ] | hud_mode_icon_analyst | `atsui_hud_icon_analyst.png` | |
| [ ] | hud_mode_icon_professional | `atsui_hud_icon_professional.png` | |
| [ ] | hud_mode_icon_gaming | `atsui_hud_icon_gaming.png` | |
| [ ] | hud_mode_icon_battle | `atsui_hud_icon_battle.png` | |
| [ ] | hud_mode_icon_ai_processing | `atsui_hud_icon_ai_processing.png` | |
| [ ] | hud_mode_icon_sleep | `atsui_hud_icon_sleep.png` | |
| [ ] | hud_mode_icon_overheated | `atsui_hud_icon_overheated.png` | |

---

## Render order (bottom → top)

Reference for engineering — matches target layered renderer:

1. hair_back
2. tail
3. body / neck / legs / feet
4. bikini
5. arms / hands
6. ears
7. head
8. eyes / pupils / eyelids
9. mouth
10. hair_front
11. bell
12. glasses / hoodie / raincoat / bowtie / headphones / helmet

---

## Sign-off

| Milestone | Layers complete | Approved by | Date |
|-----------|-----------------|-------------|------|
| M2 placeholder | N/A (generated) | — | — |
| M7 production sprites | 0 / — | | |
| Live2D rig v1 | 0 / — | | |
