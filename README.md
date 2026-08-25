# CP Roadmap

Interactive visualizations of the Chulalongkorn University Computer Engineering curriculum.

## Pages

- **`dag_roadmap.html`**: DAG (directed acyclic graph) view of all courses and their prerequisite chains. Built with [Cytoscape.js](https://js.cytoscape.org/) + dagre layout. Click any course node to see its description, prerequisites, and dependents.
- **`semester_courses.html`**: Semester-by-semester grid view of the same curriculum, organized by year.

## Data: one source of truth

Both pages read all of their content from **`curriculum.js`**. There is no course data hardcoded in the HTML files anymore — edit `curriculum.js` once and both pages update.

### To change a course number or name

1. Open `curriculum.js` and find the course in the `courses` array (search by its `key`, current `code`, or `name`).
2. Change its `code` and/or `name` (and `abbr` if you want a different short label).
3. **Do not change its `key`.** Save. Both pages update automatically.

Course numbers change from time to time, so every relationship in the file is wired to a course's permanent `key`, never its number. That means renaming or renumbering a course is a one-line edit that can never break a prerequisite link.

### Other common edits (all in `curriculum.js`)

| I want to…                        | Edit this                                              |
|-----------------------------------|-------------------------------------------------------|
| Move a course to another term     | its `year` / `sem`                                    |
| Change a course color             | its `color` (must be one of `palette`)                |
| Change a prerequisite             | the `edges` array (uses `key`s, and `type`)           |
| Show/hide a course in the graph   | its `dag: true` / `false` flag                        |
| Add a brand-new course            | add an object to `courses` with a **new unique `key`**|

Full field-by-field documentation is in the comment block at the top of `curriculum.js`.

## Features

- Color-coded categories (core CP, math/science, general education, etc.)
- Three edge types: hard prerequisites, recommended flow, and corequisites
- DAG track tabs (Software, Hardware, Math, Language) and per-semester filtering
- Click-through links to CU Get Reg for every course with a real course number
- Cross-links between the graph and grid views
- Single-file HTML per page; just open in a browser

## Progress tracking (graph view)

Each course node's info panel has a **Learning Checklist** — the topics that make up that course. Tick them as you learn them and:

- each node fills up left-to-right to show how far through the course you are, and turns green when complete;
- the header bar shows your **overall %**, courses completed, and the current view's %;
- once a course's prerequisites are all complete, its dependents highlight with a dashed cyan **"Ready"** border.

Your progress is saved in the browser (localStorage), so it persists between visits on that browser. Use **Export** to save it to a file (handy for backup or moving to another computer/browser), **Import** to load it back, and **Reset** to clear everything.

### Editing the checklists

The topic lists live in `curriculum.js` under `courseTopics`, keyed by course `key`. Add, remove, or rename topics freely — each is one checkbox. Topics were seeded from CU Get Reg course-content overviews; the courses listed in `topicsToVerify` had no page available and were seeded from standard syllabi, so they show a "verify" note in their panel until confirmed.

## Usage

Open either `.html` file directly in any modern browser. `curriculum.js` must sit in the same folder (it does by default). An internet connection is needed for the graph libraries and web fonts (loaded from CDNs).
