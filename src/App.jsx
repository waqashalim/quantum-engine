import React, { useMemo, useState } from "react";

const modules = [
  {
    id: "detector",
    title: "Detector & CERN Open Data Basics",
    level: "Beginner",
    summary:
      "Learn what ATLAS/CMS open data contains, how detector objects are represented, and why event selection matters.",
    concept:
      "Collision events are reconstructed into physics objects such as photons, electrons, muons, jets, and missing transverse energy.",
    task: "Inspect a simplified event record and identify two photons that could form a Higgs candidate.",
    dataset: "ATLAS 2012 8 TeV / CMS Open Data",
    quiz: {
      question: "Which reconstructed objects are central to the H → γγ channel?",
      options: ["Two photons", "Two muons", "Four jets", "Missing energy only"],
      answer: 0,
    },
  },
  {
    id: "classification",
    title: "ML for Physics Classification",
    level: "Intermediate",
    summary:
      "Use classical machine learning ideas to separate signal-like and background-like events.",
    concept:
      "Classification models learn patterns in labelled examples, but physics validation is required before trusting model output.",
    task: "Compare simple features such as invariant mass, transverse momentum, and isolation variables.",
    dataset: "H → γγ inspired sample",
    quiz: {
      question: "Why is physics validation needed after ML classification?",
      options: [
        "Because high accuracy alone may hide biased or unphysical behavior",
        "Because ML never works on physics data",
        "Because labels are irrelevant",
        "Because plots are optional",
      ],
      answer: 0,
    },
  },
  {
    id: "gnn",
    title: "Graph Neural Networks for Collision Events",
    level: "Advanced",
    summary:
      "Represent collision events as graphs where particles or detector objects become nodes and relationships become edges.",
    concept:
      "GNNs are useful when relationships between event constituents carry important information.",
    task: "Build a toy collision graph and reason about how message passing can capture event structure.",
    dataset: "Toy particle-flow graph",
    quiz: {
      question: "In a collision-event graph, what can nodes represent?",
      options: [
        "Particles or reconstructed objects",
        "Only papers",
        "Only detector buildings",
        "Only conference posters",
      ],
      answer: 0,
    },
  },
  {
    id: "quantum",
    title: "Quantum ML: VQC & QSVM",
    level: "Advanced",
    summary:
      "Explore hybrid quantum-classical learning ideas and where they might intersect with LHC analysis workflows.",
    concept:
      "Variational quantum classifiers and quantum support vector machines are hybrid methods that encode classical data into quantum circuits.",
    task: "Map simplified event features into a toy quantum feature space and compare with classical ML framing.",
    dataset: "Reduced LHC feature table",
    quiz: {
      question: "What does a variational quantum classifier usually combine?",
      options: [
        "A parameterized quantum circuit and classical optimization",
        "Only handwritten notes",
        "Only detector hardware",
        "A spreadsheet with no model",
      ],
      answer: 0,
    },
  },
];

const ragSnippets = [
  {
    title: "CERN Open Data",
    text:
      "Public collision datasets, documentation, examples, and educational resources. In this MVP, they are represented as curated learning cards.",
  },
  {
    title: "RAG Grounding",
    text:
      "Retrieval-augmented generation grounds tutor responses in selected reference material instead of relying on generic answers.",
  },
  {
    title: "SWAN/ROOT Sandbox",
    text:
      "A full version could connect notebook-style code execution to SWAN and ROOT. This MVP simulates the execution loop safely.",
  },
  {
    title: "Quantum-Ready Workforce",
    text:
      "Learners build fluency across classical ML, open-data analysis, and emerging hybrid quantum-classical techniques.",
  },
];

const defaultCode = `# Simplified H → γγ style event selection\n# MVP simulation only\n\nphotons = [45.2, 38.7, 12.4]\nselected = [p for p in photons if p > 25]\n\nprint("Selected photons:", selected)\nprint("Candidate event:", len(selected) >= 2)`;

function tutorReply(question, module) {
  const q = question.toLowerCase();
  if (!q.trim()) {
    return "Ask the AI tutor about the selected module, code task, dataset, misconception, RAG, ROOT, VQC, or QSVM.";
  }

  if (q.includes("higgs") || q.includes("gamma") || q.includes("photon") || q.includes("γ")) {
    return "For H → γγ, the learning goal is to understand how two energetic photons can be selected and used to reconstruct a candidate invariant-mass distribution. In a real analysis, selection quality and background modelling matter a lot.";
  }

  if (q.includes("rag") || q.includes("source") || q.includes("document")) {
    return "The RAG layer retrieves relevant CERN Open Data or CERN Document Server material before generating an answer. That makes the tutor more trustworthy than a generic chatbot.";
  }

  if (q.includes("quantum") || q.includes("vqc") || q.includes("qsvm")) {
    return "The quantum-ready module introduces hybrid workflows: classical LHC features are encoded into quantum circuits or kernels, then interpreted alongside classical ML baselines.";
  }

  if (q.includes("code") || q.includes("root") || q.includes("swan")) {
    return "The sandbox workflow lets learners generate code, run it, inspect outputs, and correct mistakes. This MVP simulates that loop; a full version would connect to SWAN/ROOT or a secure backend.";
  }

  if (q.includes("misconception") || q.includes("wrong") || q.includes("error")) {
    return "A common misconception is that AI-generated answers are automatically correct. The pedagogical engine should require source grounding, code execution, and physics validation.";
  }

  return `${module.title}: ${module.concept} Suggested next step: ${module.task}`;
}

function runCodeSimulation(code) {
  const lower = code.toLowerCase();
  const mentionsPhotons = lower.includes("photon");
  const mentionsPrint = lower.includes("print");
  const mentionsSelection = code.includes(">") || lower.includes("selected");

  if (!mentionsPrint) {
    return {
      status: "Needs revision",
      output: "No output detected. Add a print statement so the learner can inspect the result.",
      score: 40,
    };
  }

  if (mentionsPhotons && mentionsSelection) {
    return {
      status: "Successful",
      output:
        "Selected photons: [45.2, 38.7]\nCandidate event: True\nPhysics check: event passes simplified two-photon selection.",
      score: 92,
    };
  }

  return {
    status: "Partial",
    output:
      "Code ran, but the physics intent is unclear. Try including photon selection or candidate-event logic.",
    score: 65,
  };
}

function runSelfTests() {
  const tests = [];

  const noPrint = runCodeSimulation("photons = [1, 2, 3]");
  tests.push({
    name: "Code without print asks for revision",
    pass: noPrint.status === "Needs revision" && noPrint.score === 40,
  });

  const goodCode = runCodeSimulation(defaultCode);
  tests.push({
    name: "Default photon-selection code succeeds",
    pass: goodCode.status === "Successful" && goodCode.score >= 90,
  });

  const partialCode = runCodeSimulation('print("hello")');
  tests.push({
    name: "Generic printed code returns partial physics validation",
    pass: partialCode.status === "Partial" && partialCode.score === 65,
  });

  const ragAnswer = tutorReply("How does RAG work?", modules[0]);
  tests.push({
    name: "Tutor responds to RAG questions",
    pass: ragAnswer.toLowerCase().includes("retrieves") || ragAnswer.toLowerCase().includes("rag"),
  });

  const quantumAnswer = tutorReply("Explain VQC and QSVM", modules[3]);
  tests.push({
    name: "Tutor responds to quantum ML questions",
    pass: quantumAnswer.toLowerCase().includes("quantum") || quantumAnswer.toLowerCase().includes("hybrid"),
  });

  return tests;
}

export default function App() {
  const [activeModuleId, setActiveModuleId] = useState("detector");
  const [question, setQuestion] = useState("");
  const [code, setCode] = useState(defaultCode);
  const [runResult, setRunResult] = useState(null);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [survey, setSurvey] = useState({ before: 2, after: 4, clarity: 5, usefulness: 5 });
  const [showTests, setShowTests] = useState(false);

  const activeModule = useMemo(
    () => modules.find((module) => module.id === activeModuleId) || modules[0],
    [activeModuleId]
  );

  const completedQuizzes = Object.values(quizAnswers).filter((answer) => answer !== undefined).length;
  const avgBefore = survey.before;
  const avgAfter = survey.after;
  const improvement = Math.max(0, Math.round(((avgAfter - avgBefore) / Math.max(avgBefore, 1)) * 100));
  const currentAnswer = quizAnswers[activeModule.id];
  const tests = runSelfTests();
  const passedTests = tests.filter((test) => test.pass).length;

  return (
    <>
      <style>{styles}</style>
      <main className="app-shell">
        <aside className="sidebar">
          <div className="brand">
            <div className="brand-icon">⚛</div>
            <div>
              <h1>QuantumCollider</h1>
              <p>AI Learning Engine</p>
            </div>
          </div>

          <nav className="nav-list" aria-label="Main navigation">
            <a href="#dashboard">Dashboard</a>
            <a href="#modules">Learning Path</a>
            <a href="#tutor">AI Tutor</a>
            <a href="#sandbox">Code Sandbox</a>
            <a href="#results">Results</a>
          </nav>

          <section className="progress-card">
            <p>Prototype Progress</p>
            <strong>{completedQuizzes}/4 quizzes</strong>
            <div className="progress-track" aria-label="Quiz completion progress">
              <div style={{ width: `${(completedQuizzes / 4) * 100}%` }} />
            </div>
          </section>
        </aside>

        <section className="content">
          <header className="hero" id="dashboard">
            <div>
              <p className="eyebrow">AI-powered · Data-driven · Quantum-ready</p>
              <h2>AI-Native Pedagogical Engine for HL-LHC Workforce Development</h2>
              <p>
                A working MVP that simulates how early researchers can learn CERN Open Data workflows,
                AI-assisted analysis, ROOT-style code correction, and quantum-ready machine learning concepts.
              </p>
            </div>
            <div className="hero-badge">
              <span>Level 4</span>
              <strong>HL-LHC Ready</strong>
            </div>
          </header>

          <section className="metric-grid" aria-label="Prototype metrics">
            <article>
              <span>Modules</span>
              <strong>{modules.length}</strong>
              <p>Open-data learning units</p>
            </article>
            <article>
              <span>Quiz Score</span>
              <strong>{completedQuizzes}/4</strong>
              <p>Concept checks completed</p>
            </article>
            <article>
              <span>Code Runs</span>
              <strong>{runResult ? "1" : "0"}</strong>
              <p>Sandbox attempts</p>
            </article>
            <article>
              <span>Confidence Gain</span>
              <strong>{improvement}%</strong>
              <p>Self-rated improvement</p>
            </article>
          </section>

          <section className="main-grid">
            <div className="panel large" id="modules">
              <div className="panel-heading">
                <div>
                  <p className="eyebrow">Learning path</p>
                  <h3>{activeModule.title}</h3>
                </div>
                <span className="pill">{activeModule.level}</span>
              </div>

              <div className="module-buttons">
                {modules.map((module) => (
                  <button
                    type="button"
                    key={module.id}
                    className={module.id === activeModuleId ? "active" : ""}
                    onClick={() => {
                      setActiveModuleId(module.id);
                      setQuestion("");
                    }}
                  >
                    <span>{module.title}</span>
                    <small>{module.summary}</small>
                  </button>
                ))}
              </div>

              <div className="info-card">
                <h4>Concept</h4>
                <p>{activeModule.concept}</p>
              </div>

              <div className="two-col">
                <div className="info-card">
                  <h4>Dataset</h4>
                  <p>{activeModule.dataset}</p>
                </div>
                <div className="info-card">
                  <h4>Hands-on task</h4>
                  <p>{activeModule.task}</p>
                </div>
              </div>
            </div>

            <div className="panel" id="tutor">
              <p className="eyebrow">RAG-style AI tutor</p>
              <h3>Ask the engine</h3>
              <div className="chat-box">
                <p>{tutorReply(question, activeModule)}</p>
              </div>
              <input
                value={question}
                onChange={(event) => setQuestion(event.target.value)}
                placeholder="Ask about H→γγ, RAG, ROOT, VQC, QSVM..."
              />
            </div>
          </section>

          <section className="main-grid">
            <div className="panel" id="sandbox">
              <p className="eyebrow">Sandboxed execution</p>
              <h3>SWAN/ROOT-style code lab</h3>
              <textarea value={code} onChange={(event) => setCode(event.target.value)} />
              <button className="primary" type="button" onClick={() => setRunResult(runCodeSimulation(code))}>
                Run simulation
              </button>
              {runResult && (
                <div className="result-box">
                  <strong>Status: {runResult.status}</strong>
                  <pre>{runResult.output}</pre>
                  <p>Validation score: {runResult.score}/100</p>
                </div>
              )}
            </div>

            <div className="panel">
              <p className="eyebrow">Assessment</p>
              <h3>Concept quiz</h3>
              <p className="question">{activeModule.quiz.question}</p>
              <div className="answers">
                {activeModule.quiz.options.map((option, index) => {
                  const selected = currentAnswer === index;
                  const correct = activeModule.quiz.answer === index;
                  return (
                    <button
                      type="button"
                      key={option}
                      className={selected ? (correct ? "correct" : "wrong") : ""}
                      onClick={() => setQuizAnswers({ ...quizAnswers, [activeModule.id]: index })}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
              {currentAnswer !== undefined && (
                <div className="feedback">
                  {currentAnswer === activeModule.quiz.answer
                    ? "Correct. This supports the module learning outcome."
                    : "Not quite. Review the concept card and try again."}
                </div>
              )}
            </div>
          </section>

          <section className="main-grid" id="results">
            <div className="panel">
              <p className="eyebrow">Pilot survey simulator</p>
              <h3>Learner confidence and usability</h3>
              {[
                ["before", "Confidence before using engine"],
                ["after", "Confidence after using engine"],
                ["clarity", "Explanation clarity"],
                ["usefulness", "Usefulness for HL-LHC preparation"],
              ].map(([key, label]) => (
                <label className="slider-row" key={key}>
                  <span>
                    {label}: {survey[key]}/5
                  </span>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={survey[key]}
                    onChange={(event) => setSurvey({ ...survey, [key]: Number(event.target.value) })}
                  />
                </label>
              ))}
            </div>

            <div className="panel">
              <p className="eyebrow">Poster-ready output</p>
              <h3>Results statement</h3>
              <div className="highlight-number">+{improvement}%</div>
              <p>
                In this MVP simulation, learner confidence increased from {avgBefore}/5 to {avgAfter}/5 after
                interacting with the AI-native pedagogical engine. Learners rated explanation clarity at {survey.clarity}/5
                and usefulness for HL-LHC preparation at {survey.usefulness}/5.
              </p>
              <p className="note">
                Replace these simulated values with your actual hackathon or survey results. Report sample size,
                participant type, limitations, and ethics/consent details.
              </p>
            </div>
          </section>

          <section className="panel references">
            <p className="eyebrow">Grounding references for poster</p>
            <div className="reference-grid">
              {ragSnippets.map((item) => (
                <article key={item.title}>
                  <h4>{item.title}</h4>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="panel tests">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">Developer checks</p>
                <h3>Built-in MVP tests</h3>
              </div>
              <button className="secondary" type="button" onClick={() => setShowTests(!showTests)}>
                {showTests ? "Hide tests" : "Show tests"}
              </button>
            </div>
            <p>
              {passedTests}/{tests.length} tests passing. These checks verify the code simulator and tutor-routing logic.
            </p>
            {showTests && (
              <ul className="test-list">
                {tests.map((test) => (
                  <li key={test.name} className={test.pass ? "pass" : "fail"}>
                    {test.pass ? "✓" : "✗"} {test.name}
                  </li>
                ))}
              </ul>
            )}
          </section>
        </section>
      </main>
    </>
  );
}

const styles = `
  :root {
    color-scheme: light;
    font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    background: #eef4ff;
    color: #0b1740;
  }

  * { box-sizing: border-box; }

  body {
    margin: 0;
    background:
      radial-gradient(circle at top right, rgba(100, 59, 255, 0.18), transparent 34rem),
      linear-gradient(135deg, #f8fbff 0%, #eaf1ff 45%, #f7fbff 100%);
  }

  button, input, textarea { font: inherit; }

  .app-shell {
    min-height: 100vh;
    display: grid;
    grid-template-columns: 280px minmax(0, 1fr);
  }

  .sidebar {
    position: sticky;
    top: 0;
    height: 100vh;
    padding: 24px;
    background: linear-gradient(180deg, #06173e 0%, #07112d 100%);
    color: white;
    border-right: 1px solid rgba(255, 255, 255, 0.12);
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 34px;
  }

  .brand-icon {
    width: 48px;
    height: 48px;
    display: grid;
    place-items: center;
    border-radius: 18px;
    background: linear-gradient(135deg, #6d4aff, #00b8ff);
    font-size: 26px;
    box-shadow: 0 18px 40px rgba(0, 0, 0, 0.28);
  }

  .brand h1 {
    margin: 0;
    font-size: 18px;
    line-height: 1.1;
  }

  .brand p {
    margin: 4px 0 0;
    color: #a9b8df;
    font-size: 13px;
  }

  .nav-list {
    display: grid;
    gap: 10px;
  }

  .nav-list a {
    color: #dce8ff;
    text-decoration: none;
    padding: 12px 14px;
    border-radius: 14px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.08);
  }

  .nav-list a:hover {
    background: rgba(109, 74, 255, 0.45);
  }

  .progress-card {
    margin-top: 30px;
    padding: 16px;
    border-radius: 18px;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.12);
  }

  .progress-card p { margin: 0 0 8px; color: #b9c7e8; }
  .progress-card strong { font-size: 24px; }

  .progress-track {
    margin-top: 12px;
    height: 10px;
    background: rgba(255, 255, 255, 0.14);
    border-radius: 999px;
    overflow: hidden;
  }

  .progress-track div {
    height: 100%;
    background: linear-gradient(90deg, #00d4ff, #8d5cff);
  }

  .content {
    padding: 28px;
    display: grid;
    gap: 22px;
  }

  .hero, .panel, .metric-grid article {
    background: rgba(255, 255, 255, 0.84);
    border: 1px solid rgba(89, 117, 174, 0.18);
    box-shadow: 0 22px 70px rgba(18, 39, 91, 0.08);
    backdrop-filter: blur(10px);
  }

  .hero {
    border-radius: 28px;
    padding: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 22px;
  }

  .eyebrow {
    margin: 0 0 8px;
    color: #6544e8;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    font-weight: 800;
    font-size: 12px;
  }

  .hero h2 {
    margin: 0;
    font-size: clamp(30px, 5vw, 58px);
    line-height: 0.98;
    max-width: 940px;
    letter-spacing: -0.05em;
  }

  .hero p:not(.eyebrow) {
    max-width: 760px;
    color: #4b587c;
    font-size: 17px;
    line-height: 1.65;
  }

  .hero-badge {
    min-width: 180px;
    border-radius: 24px;
    padding: 18px;
    color: white;
    background: linear-gradient(160deg, #081946, #6d4aff);
    text-align: center;
  }

  .hero-badge span { display: block; color: #b6c8ff; }
  .hero-badge strong { font-size: 24px; }

  .metric-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 16px;
  }

  .metric-grid article {
    border-radius: 22px;
    padding: 20px;
  }

  .metric-grid span {
    color: #596682;
    font-weight: 700;
  }

  .metric-grid strong {
    display: block;
    margin-top: 8px;
    font-size: 34px;
    color: #16266b;
  }

  .metric-grid p { margin: 6px 0 0; color: #697697; }

  .main-grid {
    display: grid;
    grid-template-columns: minmax(0, 1.35fr) minmax(320px, 0.65fr);
    gap: 18px;
  }

  .panel {
    border-radius: 24px;
    padding: 22px;
  }

  .panel.large { min-height: 420px; }

  .panel-heading {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 16px;
  }

  h3 {
    margin: 0;
    color: #10205a;
    font-size: 24px;
    letter-spacing: -0.02em;
  }

  h4 { margin: 0 0 8px; color: #10205a; }

  .pill {
    padding: 8px 12px;
    border-radius: 999px;
    background: #eef0ff;
    color: #5638cf;
    font-weight: 800;
    white-space: nowrap;
  }

  .module-buttons {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
    margin-bottom: 16px;
  }

  .module-buttons button,
  .answers button {
    cursor: pointer;
    text-align: left;
    border: 1px solid #d8e1f7;
    background: white;
    border-radius: 18px;
    padding: 14px;
    color: #17234e;
  }

  .module-buttons button.active {
    color: white;
    background: linear-gradient(135deg, #6544e8, #1e8fff);
    border-color: transparent;
  }

  .module-buttons span {
    display: block;
    font-weight: 850;
  }

  .module-buttons small {
    display: block;
    margin-top: 5px;
    line-height: 1.35;
    opacity: 0.82;
  }

  .info-card, .chat-box, .result-box {
    border-radius: 18px;
    padding: 16px;
    background: #f5f8ff;
    border: 1px solid #dfe7fb;
  }

  .info-card p, .chat-box p, .result-box p { margin: 0; line-height: 1.55; color: #445172; }

  .two-col {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
    margin-top: 12px;
  }

  input, textarea {
    width: 100%;
    border: 1px solid #cbd8f2;
    border-radius: 16px;
    padding: 13px 14px;
    outline: none;
    background: #ffffff;
    color: #0c1742;
  }

  input:focus, textarea:focus {
    border-color: #6544e8;
    box-shadow: 0 0 0 4px rgba(101, 68, 232, 0.12);
  }

  .chat-box { margin: 16px 0; min-height: 170px; }

  textarea {
    min-height: 260px;
    font-family: "SFMono-Regular", Consolas, "Liberation Mono", monospace;
    font-size: 14px;
    line-height: 1.5;
    resize: vertical;
  }

  .primary, .secondary {
    margin-top: 12px;
    border: 0;
    border-radius: 16px;
    padding: 12px 16px;
    font-weight: 850;
    cursor: pointer;
  }

  .primary {
    color: white;
    background: linear-gradient(135deg, #6544e8, #00a3ff);
  }

  .secondary {
    color: #4224ad;
    background: #eef0ff;
  }

  .result-box {
    margin-top: 14px;
    background: #f4fff8;
    border-color: #bdeacb;
  }

  pre {
    white-space: pre-wrap;
    overflow-x: auto;
    color: #10301f;
  }

  .question {
    font-weight: 800;
    color: #243160;
    line-height: 1.5;
  }

  .answers {
    display: grid;
    gap: 10px;
  }

  .answers button.correct {
    background: #ecfff4;
    border-color: #35b86f;
  }

  .answers button.wrong {
    background: #fff1f1;
    border-color: #e15b5b;
  }

  .feedback {
    margin-top: 14px;
    border-radius: 16px;
    padding: 14px;
    background: #eef4ff;
    color: #243160;
    font-weight: 700;
  }

  .slider-row {
    display: grid;
    gap: 8px;
    margin: 16px 0;
    color: #2d3a68;
    font-weight: 800;
  }

  input[type="range"] {
    padding: 0;
    accent-color: #6544e8;
  }

  .highlight-number {
    margin: 18px 0;
    font-size: 68px;
    line-height: 1;
    font-weight: 950;
    color: #10a36d;
    letter-spacing: -0.06em;
  }

  .note {
    color: #6f7893;
    font-size: 14px;
    line-height: 1.55;
  }

  .references, .tests {
    margin-bottom: 10px;
  }

  .reference-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 14px;
  }

  .reference-grid article {
    background: #f5f8ff;
    border: 1px solid #dfe7fb;
    border-radius: 18px;
    padding: 14px;
  }

  .reference-grid p {
    margin: 0;
    color: #52607f;
    line-height: 1.5;
  }

  .test-list {
    margin: 12px 0 0;
    padding: 0;
    list-style: none;
    display: grid;
    gap: 8px;
  }

  .test-list li {
    padding: 10px 12px;
    border-radius: 12px;
    font-weight: 800;
  }

  .test-list .pass {
    color: #0b7046;
    background: #ecfff4;
  }

  .test-list .fail {
    color: #a62b2b;
    background: #fff1f1;
  }

  @media (max-width: 980px) {
    .app-shell { grid-template-columns: 1fr; }
    .sidebar {
      position: relative;
      height: auto;
    }
    .main-grid, .metric-grid, .reference-grid, .module-buttons, .two-col {
      grid-template-columns: 1fr;
    }
    .hero { flex-direction: column; align-items: flex-start; }
  }
`;
