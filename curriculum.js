/* =============================================================================
 *  CURRICULUM.JS — SINGLE SOURCE OF TRUTH
 *  Chulalongkorn University · B.Eng. Computer Engineering · Curriculum 2024
 * =============================================================================
 *
 *  Both dag_roadmap.html and semester_courses.html read from this ONE file.
 *  Edit here once and both pages update.
 *
 *  ---------------------------------------------------------------------------
 *  HOW TO EDIT  (the common case: a course number or name changed)
 *  ---------------------------------------------------------------------------
 *  1. Find the course in the `courses` array below (search by its `key` or its
 *     current `code`/`name`).
 *  2. Change ONLY its `code` and/or `name` (and `abbr` if you like).
 *     -> Do NOT change its `key`. The `key` is the internal, permanent handle.
 *  3. Save. Done. Both pages pick up the change automatically.
 *
 *  WHY `key` EXISTS:
 *    Course numbers at CU change from time to time. The prerequisite
 *    relationships (`edges`) and the DAG track lists (`tracks`) all reference
 *    the stable `key`, NEVER the number. So renaming/renumbering a course is a
 *    one-line edit and never breaks a relationship.
 *
 *  OTHER EDITS:
 *    - Move a course to a different term:   change its `year` / `sem`.
 *    - Change its color:                    change its `color` (see `palette`).
 *    - Change a prerequisite:               edit the `edges` array (uses keys).
 *    - Add a whole new course:              add an object to `courses` with a
 *                                           new unique `key`, then (if it has
 *                                           prerequisites) add `edges`, and (if
 *                                           it should appear in the graph) set
 *                                           `dag: true` and add it to a track.
 *
 *  FIELD REFERENCE for a course object:
 *    key      (string)  Permanent internal id. Never reuse or change.
 *    code     (string)  Official course number, e.g. "2110101".
 *                       Use a non-numeric placeholder (e.g. "2110xxx", "xxx")
 *                       for slots with no fixed number (electives, gen-ed).
 *                       Only purely-numeric codes get a CU Get Reg link.
 *    name     (string)  Full course name (shown in the DAG info panel).
 *    abbr     (string)  Short label (shown on grid cards and DAG nodes).
 *    credits  (number)  Credit hours.
 *    year     (1-4)     Academic year.
 *    sem      (1-2)     Semester within the year.
 *    color    (string)  Display color name -> see `palette` keys.
 *    bucket   (string)  Graduation-requirement category -> see `buckets` keys.
 *    dag      (boolean) true = appears in the prerequisite graph.
 *                       false = grid-only (electives, gen-ed, standalone).
 *    desc     (string)  One-line description (DAG info panel). Optional.
 * ===========================================================================*/

window.CURRICULUM = {

  /* ---- Program metadata ---------------------------------------------------*/
  meta: {
    university:     'Chulalongkorn University',
    program:        'B.Eng. Computer Engineering',
    programTh:      'วิศวกรรมศาสตรบัณฑิต สาขาวิชาวิศวกรรมคอมพิวเตอร์',
    curriculumYear: '2024',
    getRegBase:     'https://cugetreg.com/S/courses/',
  },

  /* ---- Color palette: NAME only. Each page maps names to its own hex. ------
   * (dag_roadmap uses bright tones on dark; semester_courses uses muted tones
   * on light. Only the NAME is shared data; the hex values live in each page.)
   */
  palette: [
    'purple', 'teal', 'blue', 'pink', 'red',
    'olive', 'light-green', 'dark-purple', 'orange', 'grey',
  ],

  /* ---- DAG color legend: what each graph color means ----------------------*/
  dagCategories: {
    'purple': 'Core · Theory & Algorithms',
    'teal':   'Core · Systems & Applied',
    'blue':   'Math & Science Foundation',
    'pink':   'Engineering Foundation',
    'red':    'Information Technology',
    'olive':  'Language & Communication',
  },

  /* ---- Requirement buckets (graduation categories) ------------------------
   * `label` is the tooltip text shown on grid cards.
   */
  buckets: {
    'gen-ed':         { label: 'ศึกษาทั่วไป (30)' },
    'gen-ed-lang':    { label: 'ศึกษาทั่วไป (30) - หมวดภาษา' },
    'math-sci':       { label: 'พื้นฐานคณิต-วิทย์ (21)' },
    'eng-foundation': { label: 'พื้นฐานวิศวกรรม (11)' },
    'core-major':     { label: 'แกนระดับสาขาวิชา (39)' },
    'it':             { label: 'เทคโนโลยีสารสนเทศ (6)' },
    'century21':      { label: 'ทักษะสำหรับศตวรรษที่ 21 (6)' },
    'elective':       { label: 'วิชาเลือก (18)' },
    'free-elective':  { label: 'วิชาเลือกเสรี (6)' },
  },

  /* ---- Grid legend bar: which rows to show, and their color chips ---------*/
  gridLegend: [
    { bucket: 'gen-ed',         colors: ['light-green'] },
    { bucket: 'math-sci',       colors: ['blue'] },
    { bucket: 'eng-foundation', colors: ['pink'] },
    { bucket: 'core-major',     colors: ['purple', 'teal', 'red'] },
    { bucket: 'it',             colors: ['red'] },
    { bucket: 'century21',      colors: ['dark-purple'] },
    { bucket: 'elective',       colors: ['orange'] },
    { bucket: 'free-elective',  colors: ['grey'] },
  ],

  /* ---- Optional per-semester credit-label overrides ----------------------
   * Key is "year-sem". If absent, the label is the auto-summed credit total.
   * (3-2 is special: Engineering Practice's 2 credits are shown separately.)
   */
  semesterLabels: {
    '3-2': '15+2',
  },

  /* =========================================================================
   *  COURSES  —  ***THE place to edit a course number or name***
   * =======================================================================*/
  courses: [
    /* ── Year 1 · Semester 1 ─────────────────────────────────────────────*/
    { key: 'comp_prog', code: '2110101', name: 'Computer Programming', abbr: 'COMP PROG',
      credits: 3, year: 1, sem: 1, color: 'purple', bucket: 'core-major', dag: true,
      desc: 'Programming fundamentals with Python and C/C++: data types, control flow, functions, and basic OOP.' },
    { key: 'expl_eng_world', code: '2100111', name: 'Exploring Engineering World', abbr: 'EXPL ENG WORLD',
      credits: 3, year: 1, sem: 1, color: 'pink', bucket: 'eng-foundation', dag: false,
      desc: 'Introduction to the breadth of engineering disciplines and the engineering mindset.' },
    { key: 'calc1', code: '2301107', name: 'Calculus I', abbr: 'CALCULUS I',
      credits: 3, year: 1, sem: 1, color: 'blue', bucket: 'math-sci', dag: true,
      desc: 'Limits, continuity, differentiation, integration, and applications of algebraic and transcendental functions.' },
    { key: 'gen_phys1', code: '2304103', name: 'General Physics I', abbr: 'GEN PHYS I',
      credits: 3, year: 1, sem: 1, color: 'blue', bucket: 'math-sci', dag: true,
      desc: "Classical mechanics, Newton's laws, energy, momentum, rotation, fluid mechanics, and thermodynamics." },
    { key: 'gen_phys_lab1', code: '2304183', name: 'General Physics Lab I', abbr: 'GEN PHYS LAB I',
      credits: 1, year: 1, sem: 1, color: 'blue', bucket: 'math-sci', dag: true,
      desc: 'Experiments in mechanics, fluid dynamics, oscillations, sound, and thermal properties.' },
    { key: 'exp_eng1', code: '5500111', name: 'Experiential English I', abbr: 'EXP ENG I',
      credits: 3, year: 1, sem: 1, color: 'olive', bucket: 'gen-ed-lang', dag: true,
      desc: 'Integrated English skills: reading comprehension, vocabulary, paragraph writing, listening, and speaking.' },

    /* ── Year 1 · Semester 2 ─────────────────────────────────────────────*/
    { key: 'prog_meth1', code: '2110215', name: 'Programming Methodology I', abbr: 'PROG METH I',
      credits: 3, year: 1, sem: 2, color: 'purple', bucket: 'core-major', dag: true,
      desc: 'OOP principles: classes, inheritance, polymorphism, interfaces, exception handling, and design patterns (Java/C++).' },
    { key: 'com_eng_ess', code: '2110221', name: 'Computer Engineering Essentials', abbr: 'COM ENG ESS',
      credits: 3, year: 1, sem: 2, color: 'pink', bucket: 'eng-foundation', dag: true,
      desc: 'Overview of hardware, software, algorithms, networks, AI, embedded systems, and cybersecurity.' },
    { key: 'calc2', code: '2301108', name: 'Calculus II', abbr: 'CALCULUS II',
      credits: 3, year: 1, sem: 2, color: 'blue', bucket: 'math-sci', dag: true,
      desc: 'Sequences, series, Taylor expansion, vectors in 3D, multivariable calculus, and intro to differential equations.' },
    { key: 'gen_phys2', code: '2304104', name: 'General Physics II', abbr: 'GEN PHYS II',
      credits: 3, year: 1, sem: 2, color: 'blue', bucket: 'math-sci', dag: true,
      desc: 'Electrostatics, electric circuits, electromagnetism, waves, optics, and modern physics.' },
    { key: 'gen_phys_lab2', code: '2304184', name: 'General Physics Lab II', abbr: 'GEN PHYS LAB II',
      credits: 1, year: 1, sem: 2, color: 'blue', bucket: 'math-sci', dag: true,
      desc: 'Lab experiments in circuits, semiconductors, lenses, diffraction, polarization, and electromagnetic induction.' },
    { key: 'gen_chem', code: '2302127', name: 'General Chemistry', abbr: 'GEN CHEM',
      credits: 3, year: 1, sem: 2, color: 'blue', bucket: 'math-sci', dag: true,
      desc: 'Stoichiometry, atomic theory, states of matter, equilibrium, kinetics, bonding, and periodic trends.' },
    { key: 'gen_chem_lab', code: '2302163', name: 'General Chemistry Lab', abbr: 'GEN CHEM LAB',
      credits: 1, year: 1, sem: 2, color: 'blue', bucket: 'math-sci', dag: true,
      desc: 'Qualitative analysis, gas diffusion, crystal structures, equilibrium, acid-base titrations, and pH measurement.' },
    { key: 'exp_eng2', code: '5500112', name: 'Experiential English II', abbr: 'EXP ENG II',
      credits: 3, year: 1, sem: 2, color: 'olive', bucket: 'gen-ed-lang', dag: true,
      desc: 'Advanced English skills: synthesizing information, structured presentations, and analytical writing.' },

    /* ── Year 2 · Semester 1 ─────────────────────────────────────────────*/
    { key: 'discrete', code: '2110200', name: 'Discrete Structures', abbr: 'DISCRETE STRUCT',
      credits: 3, year: 2, sem: 1, color: 'purple', bucket: 'core-major', dag: true,
      desc: 'Sets, relations, proofs, combinatorics, recurrence relations, graph theory, trees, and number theory.' },
    { key: 'data_struct', code: '2110211', name: 'Intro to Data Structures', abbr: 'INTRO DATA STRUCT',
      credits: 3, year: 2, sem: 1, color: 'teal', bucket: 'core-major', dag: true,
      desc: 'Arrays, stacks, queues, linked lists, trees (BST, AVL, B-tree), sorting algorithms, and hash tables.' },
    { key: 'stats', code: '2603284', name: 'Statistics for Physical Science', abbr: 'STAT PHYS SCIENCE',
      credits: 3, year: 2, sem: 1, color: 'blue', bucket: 'math-sci', dag: true,
      desc: 'Probability theory, random variables, distributions, statistical inference, ANOVA, and regression.' },
    { key: 'dig_logic', code: '2110251', name: 'Digital Computer Logic', abbr: 'DIG LOGIC',
      credits: 3, year: 2, sem: 1, color: 'teal', bucket: 'core-major', dag: true,
      desc: 'Boolean algebra, logic gates, Karnaugh maps, combinational and sequential logic, flip-flops, and counters.' },
    { key: 'dig_logic_lab', code: '2110263', name: 'Digital Logic Lab I', abbr: 'DIG LOGIC LAB I',
      credits: 1, year: 2, sem: 1, color: 'teal', bucket: 'core-major', dag: true,
      desc: 'Hands-on with digital logic ICs, breadboards, combinational circuits, flip-flops, and state machines.' },
    { key: 'gened_y2s1', code: 'xxx', name: 'General Education', abbr: 'GENERAL ED',
      credits: 3, year: 2, sem: 1, color: 'light-green', bucket: 'gen-ed', dag: false },

    /* ── Year 2 · Semester 2 ─────────────────────────────────────────────*/
    { key: 'ce_math1', code: '2110201', name: 'Comp Engineering Math I', abbr: 'COMP ENG MATH I',
      credits: 3, year: 2, sem: 2, color: 'teal', bucket: 'core-major', dag: true,
      desc: 'Linear algebra: matrices, eigenvalues/eigenvectors, SVD, vector spaces, and orthogonality.' },
    { key: 'algo', code: '2110327', name: 'Algorithm Design', abbr: 'ALGO DESIGN',
      credits: 3, year: 2, sem: 2, color: 'purple', bucket: 'core-major', dag: true,
      desc: 'Complexity analysis, divide & conquer, greedy, dynamic programming, graph algorithms, and NP-completeness.' },
    { key: 'db_sys', code: '2110322', name: 'Database Systems', abbr: 'DB SYS',
      credits: 3, year: 2, sem: 2, color: 'teal', bucket: 'core-major', dag: true,
      desc: 'Relational model, SQL, ER modeling, normalization (1NF–BCNF), transactions, and B+ tree indexing.' },
    { key: 'os', code: '2110313', name: 'Operating Systems', abbr: 'OS',
      credits: 3, year: 2, sem: 2, color: 'red', bucket: 'it', dag: true,
      desc: 'Processes, threads, scheduling, synchronization, deadlocks, memory management, and file systems.' },
    { key: 'com_sys_arch', code: '2110352', name: 'Computer System Architecture', abbr: 'COM SYS ARCH',
      credits: 3, year: 2, sem: 2, color: 'teal', bucket: 'core-major', dag: true,
      desc: 'ISA (RISC-V), datapath design, pipelining, cache architecture, virtual memory, and multiprocessor systems.' },
    { key: 'hw_syn_lab', code: '2110363', name: 'Hardware Synthesis Lab I', abbr: 'HW SYN LAB I',
      credits: 1, year: 2, sem: 2, color: 'teal', bucket: 'core-major', dag: true,
      desc: 'Verilog/VHDL on FPGA: simulation, synthesis of pipelined CPU components and peripheral interfaces.' },
    { key: 'com_pres', code: '5500208', name: 'Communication & Presentation Skills', abbr: 'COM PRES SKIL',
      credits: 3, year: 2, sem: 2, color: 'olive', bucket: 'gen-ed-lang', dag: true,
      desc: 'Professional English presentations, technical pitching, visual aid design, and workplace discourse.' },

    /* ── Year 3 · Semester 1 ─────────────────────────────────────────────*/
    { key: 'ce_math2', code: '2110203', name: 'Comp Engineering Math II', abbr: 'COM ENG MATH II',
      credits: 3, year: 3, sem: 1, color: 'teal', bucket: 'core-major', dag: true,
      desc: 'Optimization, linear/integer programming, stochastic processes, estimation, and hypothesis testing.' },
    { key: 'se_lab', code: '2110xxx', name: 'Software Engineering Lab', abbr: 'SE LAB',
      credits: 1, year: 3, sem: 1, color: 'teal', bucket: 'core-major', dag: false,
      desc: 'Applied software engineering lab work accompanying the Software Engineering course.' },
    { key: 'software_eng', code: '2110423', name: 'Software Engineering', abbr: 'SOFTWARE ENG',
      credits: 3, year: 3, sem: 1, color: 'teal', bucket: 'core-major', dag: true,
      desc: 'Software design tools, modular design, testing, reliability models, cost estimation, and maintenance.' },
    { key: 'dist_sys', code: '2110318', name: 'Distributed Systems Essentials', abbr: 'DIS SYS',
      credits: 1, year: 3, sem: 1, color: 'red', bucket: 'it', dag: true,
      desc: 'Client-server, message passing, clock sync, distributed transactions, replication, and web services.' },
    { key: 'comp_net', code: '2110471', name: 'Computer Networks', abbr: 'COMP NETWORK',
      credits: 3, year: 3, sem: 1, color: 'red', bucket: 'it', dag: true,
      desc: 'Network architectures, protocols, LAN/WAN, client-server/P2P, security, and wireless computing.' },
    { key: 'embedded_lab', code: '2110366', name: 'Embedded System Lab', abbr: 'EMBEDDED SYS LAB I',
      credits: 1, year: 3, sem: 1, color: 'teal', bucket: 'core-major', dag: true,
      desc: 'Firmware on microcontrollers, interfacing buses, sensors, actuators, serial/Wi-Fi communication.' },
    { key: 'elective_y3s1', code: '2110xxx', name: 'Elective', abbr: 'ELECTIVE',
      credits: 3, year: 3, sem: 1, color: 'orange', bucket: 'elective', dag: false },
    { key: 'gened_y3s1', code: 'xxx', name: 'General Education', abbr: 'GENERAL ED',
      credits: 3, year: 3, sem: 1, color: 'light-green', bucket: 'gen-ed', dag: false },

    /* ── Year 3 · Semester 2 ─────────────────────────────────────────────*/
    { key: 'approved_elec_y3s2', code: '2110yyy', name: 'Approved Elective', abbr: 'APPROVED ELEC.',
      credits: 3, year: 3, sem: 2, color: 'orange', bucket: 'elective', dag: false },
    { key: 'century21_y3s2', code: '2100xxx', name: '21st Century Skills', abbr: '21st Century',
      credits: 3, year: 3, sem: 2, color: 'dark-purple', bucket: 'century21', dag: false },
    { key: 'free_elec_y3s2', code: 'xxx', name: 'Free Elective', abbr: 'FREE ELECTIVE',
      credits: 3, year: 3, sem: 2, color: 'grey', bucket: 'free-elective', dag: false },
    { key: 'elective_y3s2', code: '2110xxx', name: 'Elective', abbr: 'ELECTIVE',
      credits: 3, year: 3, sem: 2, color: 'orange', bucket: 'elective', dag: false },
    { key: 'tech_writ', code: '5500308', name: 'Technical Writing for Engineering', abbr: 'TECH WRIT ENG',
      credits: 3, year: 3, sem: 2, color: 'olive', bucket: 'gen-ed-lang', dag: true,
      desc: 'Technical essays, engineering reports, research writing, and experimental result documentation.' },
    { key: 'eng_practice', code: '2100301', name: 'Engineering Practice', abbr: 'ENG PRACTICE',
      credits: 2, year: 3, sem: 2, color: 'teal', bucket: 'core-major', dag: false,
      desc: 'Supervised engineering practice (junior standing).' },

    /* ── Year 4 · Semester 1 ─────────────────────────────────────────────*/
    { key: 'cap_proj1', code: '2110488', name: 'Capstone Project I', abbr: 'CAP PROJ I',
      credits: 1, year: 4, sem: 1, color: 'purple', bucket: 'core-major', dag: true,
      desc: 'Problem definition, project proposal, system design, architectural modeling, and initial implementation.' },
    { key: 'approved_elec_y4s1', code: '2110xxx', name: 'Approved Elective', abbr: 'APPROVED ELEC.',
      credits: 3, year: 4, sem: 1, color: 'orange', bucket: 'elective', dag: false },
    { key: 'elective_y4s1_a', code: '2110xxx', name: 'Elective', abbr: 'ELECTIVE',
      credits: 3, year: 4, sem: 1, color: 'orange', bucket: 'elective', dag: false },
    { key: 'elective_y4s1_b', code: '2110xxx', name: 'Elective', abbr: 'ELECTIVE',
      credits: 3, year: 4, sem: 1, color: 'orange', bucket: 'elective', dag: false },
    { key: 'gened_y4s1', code: 'xxx', name: 'General Education', abbr: 'GENERAL ED',
      credits: 6, year: 4, sem: 1, color: 'light-green', bucket: 'gen-ed', dag: false },

    /* ── Year 4 · Semester 2 ─────────────────────────────────────────────*/
    { key: 'cap_proj2', code: '2110489', name: 'Capstone Project II', abbr: 'CAP PROJ II',
      credits: 3, year: 4, sem: 2, color: 'purple', bucket: 'core-major', dag: true,
      desc: 'Full implementation, testing, evaluation, final thesis report, and project defense/presentation.' },
    { key: 'century21_y4s2', code: '2100xxx', name: '21st Century Skills', abbr: '21st Century',
      credits: 3, year: 4, sem: 2, color: 'dark-purple', bucket: 'century21', dag: false },
    { key: 'elective_y4s2_a', code: '2110xxx', name: 'Elective', abbr: 'ELECTIVE',
      credits: 3, year: 4, sem: 2, color: 'orange', bucket: 'elective', dag: false },
    { key: 'elective_y4s2_b', code: '2110xxx', name: 'Elective', abbr: 'ELECTIVE',
      credits: 3, year: 4, sem: 2, color: 'orange', bucket: 'elective', dag: false },
    { key: 'free_elec_y4s2', code: 'xxx', name: 'Free Elective', abbr: 'FREE ELECTIVE',
      credits: 3, year: 4, sem: 2, color: 'grey', bucket: 'free-elective', dag: false },
  ],

  /* =========================================================================
   *  EDGES  —  prerequisite / recommended / corequisite relationships.
   *  These reference course `key`s, so renaming a course never touches them.
   *    type: 'prereq'      hard prerequisite (solid arrow)
   *    type: 'recommended' recommended curriculum flow (dashed arrow)
   *    type: 'coreq'       corequisite, taken together (dotted, two-headed)
   * =======================================================================*/
  edges: [
    /* ── Hard Prerequisites ──────────────────────────────────────────────*/
    // CU Get Reg lists NO formal prerequisite for Programming Methodology I,
    // so this is a recommended flow (take Computer Programming first), not a hard gate.
    { from: 'comp_prog',     to: 'prog_meth1',   type: 'recommended' },
    { from: 'comp_prog',     to: 'data_struct',  type: 'prereq' },
    { from: 'data_struct',   to: 'algo',         type: 'prereq' },
    { from: 'discrete',      to: 'algo',         type: 'prereq' },
    { from: 'data_struct',   to: 'db_sys',       type: 'prereq' },
    { from: 'data_struct',   to: 'os',           type: 'prereq' },
    { from: 'com_eng_ess',   to: 'os',           type: 'prereq' },
    { from: 'os',            to: 'dist_sys',     type: 'prereq' },
    { from: 'com_eng_ess',   to: 'comp_net',     type: 'prereq' },
    { from: 'dig_logic',     to: 'com_sys_arch', type: 'prereq' },
    { from: 'dig_logic_lab', to: 'hw_syn_lab',   type: 'prereq' },
    { from: 'dig_logic_lab', to: 'embedded_lab', type: 'prereq' },
    { from: 'calc1',         to: 'calc2',        type: 'prereq' },
    { from: 'exp_eng1',      to: 'exp_eng2',     type: 'prereq' },
    { from: 'exp_eng2',      to: 'com_pres',     type: 'prereq' },
    { from: 'com_pres',      to: 'tech_writ',    type: 'prereq' },
    { from: 'cap_proj1',     to: 'cap_proj2',    type: 'prereq' },

    /* ── Recommended / Curriculum Flow ───────────────────────────────────*/
    { from: 'calc2',         to: 'ce_math1',     type: 'recommended' },
    { from: 'calc2',         to: 'stats',        type: 'recommended' },
    { from: 'gen_phys1',     to: 'gen_phys2',    type: 'recommended' },
    { from: 'gen_phys_lab1', to: 'gen_phys_lab2',type: 'recommended' },
    { from: 'comp_prog',     to: 'discrete',     type: 'recommended' },
    { from: 'ce_math1',      to: 'ce_math2',     type: 'recommended' },
    { from: 'prog_meth1',    to: 'software_eng', type: 'recommended' },

    /* ── Corequisites ────────────────────────────────────────────────────*/
    { from: 'dig_logic',     to: 'dig_logic_lab', type: 'coreq' },
    { from: 'com_sys_arch',  to: 'hw_syn_lab',    type: 'coreq' },
    { from: 'gen_phys1',     to: 'gen_phys_lab1', type: 'coreq' },
    { from: 'gen_phys2',     to: 'gen_phys_lab2', type: 'coreq' },
    { from: 'gen_chem',      to: 'gen_chem_lab',  type: 'coreq' },
  ],

  /* =========================================================================
   *  TRACKS  —  curated groupings for the DAG's tab bar.
   *  `keys` lists the course keys in each track. The "Complete Map" tab is
   *  built automatically from every course with `dag: true`, so it is not
   *  listed here.
   * =======================================================================*/
  tracks: {
    software: {
      label: 'Software & Algorithms',
      subtitle: 'Programming → Data Structures → Algorithms, Databases, OS, Networking, Distributed Systems, and Software Engineering',
      keys: ['comp_prog', 'prog_meth1', 'discrete', 'data_struct', 'algo', 'db_sys',
             'os', 'dist_sys', 'com_eng_ess', 'comp_net', 'software_eng', 'cap_proj1', 'cap_proj2'],
      rankSep: 80, nodeSep: 45,
    },
    hardware: {
      label: 'Hardware & Architecture',
      subtitle: 'Digital logic design → Computer architecture, FPGA synthesis, and embedded systems',
      keys: ['dig_logic', 'dig_logic_lab', 'com_sys_arch', 'hw_syn_lab', 'embedded_lab'],
      rankSep: 100, nodeSep: 60,
    },
    math: {
      label: 'Math & Science',
      subtitle: 'Calculus, physics, chemistry, statistics, and computer engineering mathematics',
      keys: ['calc1', 'calc2', 'gen_phys1', 'gen_phys2', 'gen_phys_lab1', 'gen_phys_lab2',
             'gen_chem', 'gen_chem_lab', 'stats', 'ce_math1', 'ce_math2'],
      rankSep: 75, nodeSep: 40,
    },
    language: {
      label: 'Language',
      subtitle: 'English language skills from experiential learning to technical engineering writing',
      keys: ['exp_eng1', 'exp_eng2', 'com_pres', 'tech_writ'],
      rankSep: 100, nodeSep: 60,
    },
  },

  /* ---- The "Complete Map" tab config (courses come from dag:true) ---------*/
  completeTrack: {
    label: 'Complete Map',
    subtitle: 'All courses with prerequisite, recommended, and corequisite relationships across the 4-year curriculum',
    rankSep: 65, nodeSep: 35,
  },

  /* =========================================================================
   *  COURSE TOPICS  —  the learning checklist shown in each course's panel.
   *  Keyed by course `key`. Seeded from CU Get Reg course-content overviews.
   *  Edit freely: add / remove / rename topics; each is one checkbox.
   *
   *  NOTE: a checkbox's saved "learned" state is keyed by the TOPIC TEXT
   *  (per course). Renaming a topic later starts it fresh; reordering is safe.
   *
   *  Courses in `topicsToVerify` had no CU Get Reg page available and were
   *  seeded from standard syllabi — worth confirming against the real outline.
   * =======================================================================*/
  // Topics NOT taken from a CU Get Reg content overview (seeded from official CU
  // sources or standard syllabi) — worth confirming against the real outline.
  topicsToVerify: ['algo', 'db_sys', 'os', 'com_sys_arch', 'hw_syn_lab', 'cap_proj1', 'cap_proj2', 'gen_phys_lab2'],

  // Courses with NO CU Get Reg page (the link 404s). The UI disables the
  // "View on CU Get Reg" button and shows a "not available" indicator instead.
  getRegUnavailable: ['algo', 'db_sys', 'os', 'com_sys_arch', 'hw_syn_lab', 'gen_phys_lab2'],

  courseTopics: {
    // ── Year 1 ──
    comp_prog:     ['Computer System Concepts', 'Data Types And Operators', 'Statements And Control Structures', 'Coding Conventions', 'Debugging Techniques', 'Program Design', 'Engineering Applications'],
    calc1:         ['Limits', 'Continuity', 'Derivatives', 'Differentiation Rules', 'Applications Of Derivatives', 'Integration', 'Techniques Of Integration', 'Improper Integrals'],
    gen_phys1:     ['Math For Physics', 'Kinematics', 'Newtonian Mechanics', 'Work And Energy', 'Kinetic Theory Of Gases', 'Thermodynamics', 'Heat Transfer', 'Properties Of Matter'],
    gen_phys_lab1: ['Measurement And Precision', 'Statistical Analysis', 'Simple Harmonic Motion', 'Rotational Motion', 'Wave Phenomena', 'Sound', 'Heat', 'Fluid Mechanics'],
    exp_eng1:      ['Reading Strategies', 'Skimming And Scanning', 'Making Inferences', 'Paragraph Structure', 'Narrative Writing', 'Opinion Writing', 'Group Presentations', 'Listening Comprehension'],
    prog_meth1:    ['Object-Oriented Programming', 'Event-Driven Programming', 'Concurrent Programming', 'Exception Handling', 'Using APIs', 'Programming Tools', 'Programming Style And Practice'],
    com_eng_ess:   ['Computer Engineering Overview', 'Hardware And Software', 'Logic Circuits And Processors', 'Algorithms And Programs', 'Databases', 'Networks And Internet', 'AI And Embedded Systems', 'Security And Ethics'],
    calc2:         ['Mathematical Induction', 'Sequences And Series', 'Taylor Series', 'Numerical Integration', 'Vectors And 3D Geometry', 'Vector-Valued Functions', 'Multivariable Calculus', 'Differential Equations'],
    gen_phys2:     ['Electrostatics', 'DC Circuits', 'AC Circuits', 'Electromagnetism', 'Magnetic Materials', 'Waves And Sound', 'Electromagnetic Waves', 'Modern Physics'],
    gen_phys_lab2: ['Electrical Measurement', 'AC Circuits', 'Semiconductor Devices', 'Lenses And Mirrors', 'Diffraction And Interference', 'Light Polarization', 'Electromagnetic Induction', 'Radioactivity'],
    gen_chem:      ['Stoichiometry', 'Atomic Structure', 'Chemical Bonding', 'States Of Matter', 'Thermochemistry', 'Chemical Equilibrium', 'Acid-Base Chemistry', 'Redox And Kinetics'],
    gen_chem_lab:  ['Qualitative Analysis', 'Gas Diffusion', 'Crystal Structures', 'Chemical Equilibrium', 'Indicators', 'Acid-Base Titration', 'pH Measurement', 'Hydrolysis'],
    exp_eng2:      ['Reading For Detail', 'Analyzing Sources', 'Synthesizing Information', 'Problem-Solution Paragraphs', 'Cause-Effect Paragraphs', 'Roleplay Dialogues', 'Speaking Practice', 'Oral Presentation'],

    // ── Year 2 ──
    discrete:      ['Sets And Relations', 'Functions', 'Theorems And Proofs', 'Counting And Combinatorics', 'Recurrence Relations', 'Generating Functions', 'Graphs And Trees', 'Number Theory'],
    data_struct:   ['Arrays & Linear Allocation', 'Stacks & Queues', 'Linked Lists', 'String & Pattern Matching', 'Trees & Traversal', 'AVL & B-Trees', 'Searching Algorithms', 'Sorting Algorithms', 'Heaps & Hashing'],
    stats:         ['Uses Of Statistics', 'Probability Principles', 'Random Variables', 'Probability Distributions', 'Statistical Inference', 'Analysis Of Variance', 'Regression And Correlation', 'Statistical Quality Control'],
    dig_logic:     ['Number Systems', 'Logic Gates & Boolean Expressions', 'Boolean Algebra & Karnaugh Maps', 'Combinational Logic Circuits', 'Encoders, Decoders & Multiplexers', 'Gate Implementation & Timing', 'Sequential Circuits & Flip-Flops', 'Counters & Registers'],
    dig_logic_lab: ['Logic Gates & ICs', 'Breadboard Circuit Construction', 'Combinational Circuit Testing', 'Sequential Circuit Implementation', 'Flip-Flops & Registers', 'Circuit Debugging'],
    ce_math1:      ['Vectors And Matrices', 'Systems Of Equations', 'Matrix Factorization', 'Vector Spaces And Subspaces', 'Rank, Basis & Dimension', 'Orthogonality And Projection', 'Eigenvalues And Eigenvectors', 'Singular Value Decomposition'],
    algo:          ['Algorithm Analysis', 'Divide And Conquer', 'Greedy Algorithms', 'Dynamic Programming', 'Graph Algorithms', 'Complexity Classes', 'NP-Completeness'],
    db_sys:        ['Database Concepts', 'Entity-Relationship Modeling', 'Relational Model', 'SQL Queries', 'Normalization', 'Transaction Management', 'Indexing And Storage'],
    os:            ['OS Structure', 'Process Management', 'CPU Scheduling', 'Concurrency And Synchronization', 'Deadlocks', 'Memory Management', 'File Systems', 'System Programming'],
    com_sys_arch:  ['Performance Metrics', 'CPU Datapath Design', 'Control Unit & Microprogramming', 'Pipelining', 'Superscalar & ILP', 'Memory Hierarchy', 'Disk Arrays & Storage', 'Emerging Architectures'],
    hw_syn_lab:    ['HDL Fundamentals', 'Combinational Circuit Design', 'Sequential Circuit Design', 'Simulation & Testing', 'FPGA Synthesis', 'VGA Display Interfacing', 'Final Hardware Project'],
    com_pres:      ['Social Communication', 'Interview Skills', 'Meeting Discussion', 'Presentation Structure', 'Delivering Presentations', 'Engineering Topics', 'Listening Comprehension', 'Q&A Handling'],

    // ── Year 3 ──
    ce_math2:      ['Linear Optimization', 'Integer Optimization', 'Probability Theory', 'Stochastic Processes', 'Sampling Distributions', 'Estimation', 'Hypothesis Testing', 'Correlation And Regression'],
    software_eng:  ['Top-Down Modular Design', 'Design Tools And Techniques', 'Software Reliability Models', 'Debugging Techniques', 'Test Data Creation', 'Cost Estimation', 'Project Management', 'Software Maintenance'],
    dist_sys:      ['Distributed System Models', 'Message Passing & Marshaling', 'Remote Invocation', 'Clock Synchronization', 'Group Communication', 'Transactions & Concurrency', 'Consensus & Replication', 'Web Services'],
    comp_net:      ['Networking Overview', 'Network Architecture & Protocols', 'LAN And WAN', 'Client-Server & P2P', 'Data Security & Integrity', 'Wireless & Mobile Computing'],
    embedded_lab:  ['Microcontroller Firmware', 'Interfacing Circuit Design', 'Standard Bus Communication', 'Memory Interfacing', 'Sensor & Relay Control', 'Serial & WiFi Interfaces'],
    tech_writ:     ['Paraphrasing And Summarizing', 'Technical Definitions', 'Describing Processes', 'Writing Abstracts', 'Writing Introductions', 'Methods And Results', 'Discussion And Conclusions', 'Experiment Reports'],

    // ── Year 4 ──
    cap_proj1:     ['Topic Selection', 'Literature Review', 'Requirements Analysis', 'Project Proposal', 'System Design', 'Project Planning', 'Proposal Presentation'],
    cap_proj2:     ['Implementation', 'System Integration', 'Testing And Validation', 'Documentation', 'Final Report', 'Project Demonstration', 'Final Presentation'],
  },

  /* ---- Footer note: what the DAG intentionally leaves out -----------------*/
  dagOmittedNote: 'General Ed · Electives · Free Electives · 21st Century Skills · Exploring Engineering World · Engineering Practice · Software Engineering Lab',
};
