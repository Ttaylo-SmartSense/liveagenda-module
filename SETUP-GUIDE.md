# LiveAgenda Module — HubSpot Setup Guide

Local source of truth: `LiveAgenda.module/`  
HubSpot path: `2026/LiveAgenda.module`

Live page reference: https://info.smartsense.co/live26-agenda

---

## Status

Module built from the current LIVE26 agenda HTML. Defaults match the live page (Wed / Thu / Fri sessions + breakout tracks). Marketing can edit everything in the page editor sidebar.

---

## Part 1: Upload / update via CLI (recommended)

From this project root:

```bash
hs cms upload LiveAgenda.module "2026/LiveAgenda.module"
```

That uploads `fields.json`, `meta.json`, `module.html`, `module.css`, and `module.js` together.

### Design Manager (manual paste)

1. Go to **Marketing → Files & Templates → Design Manager**
2. Open `2026/LiveAgenda.module` (must end in `.module`)
3. Paste into each tab / file as needed, then **Save** and **Publish**

Do **not** paste `fields.json` into a non-`.module` coded file folder.

---

## Part 2: Add the module to the agenda page

1. Open the LIVE26 Agenda page in the **Page Editor**
2. **Add module** → search `LiveAgenda`
3. Place it below the global header (header/footer stay as global modules)
4. Publish the page

---

## Part 3: Editing the agenda (no coding)

In the page editor, click the module. Sidebar fields:

### Page-level

| Field | Notes |
|---|---|
| Hero Background | Solid color or uploaded image |
| Hero Headline / Subtext / Dates / Venue | Same pattern as LiveSpeakers |
| Default Day Tab | Which tab is selected on load (`Wednesday` by default) |
| CTA Headline / Buttons / URLs | Bottom “Join us” band |

### Agenda Days

Add one **Agenda Days** group per event day (tabs + headers only). Drag to reorder tabs.

| Field | Notes |
|---|---|
| Day Key | Must be `wed`, `thu`, or `fri` to match the schedule lists below |
| Tab Label | Text on the day tab |
| Day Header / Subtitle | Header above that day’s schedule |
| Legend toggles | Color key (General, Food Service, Healthcare, K12, Break, Social) |

### Schedule lists (one per day)

| Sidebar group | Shows on |
|---|---|
| **Wednesday Schedule** | Wednesday tab |
| **Thursday Schedule** | Thursday tab |
| **Friday Schedule** | Friday tab |

Each row has a **List Label** (sidebar name) and an **Item Type**:

| Item Type | Use for |
|---|---|
| **Full-width session** | Plenary, keynote, meal, break, social |
| **Section label** | e.g. “Breakout Sessions — 12:30 PM to 3:45 PM” |
| **Breakout track headers** | Food Service / Healthcare / K12 column headers |
| **Breakout track row** | One time slot across the three tracks |

For breakout rows:

- Fill Food / Healthcare / K12 title + meta
- Check **Empty / TBD** for open slots
- Check **Full-width break** for a break that spans all tracks

---

## Notes

- The original page embedded a large hero image as base64. Upload a hero image in the module fields instead (or keep the solid `#04416c` color).
- Day filtering (“All Days” + per-day tabs) works via `module.js` — no inline `onclick` needed.
- Class names are prefixed (`la-` / `.live26-agenda`) so this won’t clash with LiveSpeakers on the same site.

---

## Related modules

| Page | Status |
|---|---|
| Speakers (`LiveSpeakers.module`) | Done |
| Agenda (`LiveAgenda.module`) | Ready to upload |
| Event overview (Apex-style) | After agenda |
