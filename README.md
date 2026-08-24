# CP Roadmap

Interactive visualizations of the Chulalongkorn University Computer Engineering curriculum.

## Pages

- **`dag_roadmap.html`**: DAG (directed acyclic graph) view of all courses and their prerequisite chains. Built with [Cytoscape.js](https://js.cytoscape.org/) + dagre layout. Click any course node to see its description, prerequisites, and dependents.
- **`semester_courses.html`**: Semester-by-semester grid view of the same curriculum, organized by year.

## Data: one source of truth

Both pages read all of their content from **`curriculum.js`**.
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

- Color-coded categories (core CE, math/science, general education, etc.)
- Three edge types: hard prerequisites, recommended flow, and corequisites
- DAG track tabs (Software, Hardware, Math, Language) and per-semester filtering
- Click-through links to CU Get Reg for every course with a real course number
- Single-file HTML per page; just open in a browser

## Usage

Open either `.html` file directly in any modern browser. `curriculum.js` must sit in the same folder (it does by default). An internet connection is needed for the graph libraries and web fonts (loaded from CDNs).
