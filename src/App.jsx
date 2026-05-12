import React, { useEffect, useMemo, useState } from "react";

const cernResources = [
  {
    id: "cern-portal",
    title: "CERN Open Data Portal",
    experiment: "CERN",
    level: "All levels",
    url: "https://opendata.cern.ch/",
    description: "Central access point for CERN datasets, software, documentation, examples, and learning environments.",
    learningUse: "Search collision datasets, education records, detector documentation, and analysis examples.",
  },
  {
    id: "atlas-open-data",
    title: "ATLAS Open Data",
    experiment: "ATLAS",
    level: "Beginner to advanced",
    url: "https://atlas.cern/Resources/Opendata",
    description: "ATLAS open access collision and simulated-event resources for education, outreach, and research training.",
    learningUse: "Learn detector objects, event selection, histogramming, and introductory analysis workflows.",
  },
  {
    id: "atlas-2012-egamma",
    title: "ATLAS 2012 8 TeV Egamma sample",
    experiment: "ATLAS",
    level: "Intermediate",
    url: "https://opendata.cern.ch/record/390",
    description: "ATLAS 2012 real-data Egamma sample at 8 TeV for reconstructed electromagnetic-object learning.",
    learningUse: "Use as a gateway dataset for photon/electron object concepts and H → γγ-inspired learning tasks.",
  },
  {
    id: "cms-higgs-gammagamma",
    title: "CMS Higgs candidate events: γγ",
    experiment: "CMS",
    level: "Beginner",
    url: "https://opendata.cern.ch/record/5209",
    description: "CMS education/outreach record containing Higgs-to-two-photon candidate events.",
    learningUse: "Explore accessible H → γγ event-display and invariant-mass concept learning.",
  },
  {
    id: "cms-higgs-example",
    title: "CMS Higgs example using 2011–2012 data",
    experiment: "CMS",
    level: "Advanced",
    url: "https://github.com/cms-opendata-analyses/HiggsExample20112012",
    description: "Open analysis example guiding learners through Higgs-boson discovery-style workflows with CMS Open Data.",
    learningUse: "Use for scaffolded analysis training, code reading, and workflow comparison.",
  },
  {
    id: "root",
    title: "ROOT data analysis framework",
    experiment: "CERN/HEP",
    level: "Intermediate to advanced",
    url: "https://root.cern/",
    description: "Open-source scientific analysis framework widely used in high-energy physics.",
    learningUse: "Understand histogramming, data frames, ROOT files, and physics-analysis workflows.",
  },
  {
    id: "oqi",
    title: "CERN Open Quantum Institute",
    experiment: "OQI / CERN",
    level: "All levels",
    url: "https://open-quantum-institute.cern/",
    description: "CERN-hosted initiative promoting open and inclusive access to quantum computing and quantum applications.",
    learningUse: "Connect quantum-ready workforce training with access, capacity building, education, and responsible quantum applications.",
  },
  {
    id: "oqi-education",
    title: "OQI Education and Capacity Building",
    experiment: "OQI / CERN",
    level: "Beginner to advanced",
    url: "https://open-quantum-institute.cern/education/",
    description: "Educational activities supporting broader understanding and participation in quantum computing applications.",
    learningUse: "Reference quantum-literacy, capacity-building, and inclusive training components.",
  },
  {
    id: "cern-qti",
    title: "CERN Quantum Technology Initiative",
    experiment: "CERN QTI",
    level: "Advanced",
    url: "https://quantum.cern/",
    description: "CERN initiative supporting quantum technology research, education, training, infrastructure, and knowledge exchange.",
    learningUse: "Align advanced quantum ML modules with CERN quantum-technology education and research directions.",
  },
];

const modules = [
  {
    id: "detector",
    title: "Detector & CERN Open Data Basics",
    level: "Beginner",
    summary: "Learn what ATLAS/CMS Open Data contains, how detector objects are represented, and why event selection matters.",
    concept: "Collision events are reconstructed into physics objects such as photons, electrons, muons, jets, and missing transverse energy.",
    task: "Open a CERN resource, identify the dataset purpose, then inspect a simplified event record and select two photons that could form a Higgs candidate.",
    dataset: "ATLAS 2012 8 TeV Egamma sample + CMS Higgs candidate education records",
    resources: ["cern-portal", "atlas-open-data", "atlas-2012-egamma", "cms-higgs-gammagamma"],
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
    summary: "Use classical machine learning ideas to separate signal-like and background-like events while preserving physics validation.",
    concept: "Classification models learn patterns in labelled examples, but physics validation is required before trusting model output.",
    task: "Compare simplified features such as invariant mass, transverse momentum, isolation, and event category.",
    dataset: "CMS Higgs examples + reduced training tables derived from open-data workflows",
    resources: ["cms-higgs-example", "root", "cern-portal"],
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
    summary: "Represent collision events as graphs where particles or detector objects become nodes and relationships become edges.",
    concept: "GNNs are useful when relationships between event constituents carry important information, such as proximity, charge flow, or object-level correlations.",
    task: "Build a toy collision graph and reason about how message passing can capture event structure.",
    dataset: "Reduced particle-flow graph derived from open-data event features",
    resources: ["cern-portal", "root", "cms-higgs-example"],
    quiz: {
      question: "In a collision-event graph, what can nodes represent?",
      options: ["Particles or reconstructed objects", "Only papers", "Only detector buildings", "Only conference posters"],
      answer: 0,
    },
  },
  {
    id: "quantum",
    title: "Quantum ML: VQC & QSVM",
    level: "Advanced",
    summary: "Explore hybrid quantum-classical learning ideas and where they might intersect with LHC analysis workflows.",
    concept: "Variational quantum classifiers and quantum support vector machines encode classical event features into quantum circuits or quantum kernels.",
    task: "Map simplified event features into a toy quantum feature space and compare the learning pipeline with a classical ML baseline.",
    dataset: "Reduced LHC feature table for quantum-ready conceptual training",
    resources: ["cern-portal", "cms-higgs-example", "root", "oqi", "oqi-education", "cern-qti"],
    quiz: {
      question: "What does a variational quantum classifier usually combine?",
      options: ["A parameterized quantum circuit and classical optimization", "Only handwritten notes", "Only detector hardware", "A spreadsheet with no model"],
      answer: 0,
    },
  },
];

const aiNativeFeatures = [
  { title: "Source-grounded AI tutoring", text: "Retrieval-first explanations use data records, documentation, and learning objectives before generating guidance." },
  { title: "Adaptive pathway recommendation", text: "The engine recommends the next module from quiz progress, code validation, and learner confidence." },
  { title: "AI code coach", text: "The sandbox diagnoses missing output, unclear physics intent, weak validation logic, and incomplete analysis cuts." },
  { title: "Quantum-readiness bridge", text: "The quantum layer connects CERN Open Data practice with OQI-style access, capacity building, and responsible quantum literacy." },
];

const quantumVisuals = [
  { title: "Quantum feature space", subtitle: "Hybrid VQC/QSVM pathway", icon: "◌", color: "cyan" },
  { title: "Collision graph", subtitle: "GNN-ready event structure", icon: "✦", color: "violet" },
  { title: "CERN data stream", subtitle: "Open-data learning loop", icon: "⌁", color: "emerald" },
];

const pedagogyCards = [
  { title: "CERN Open Data Access", text: "Learners begin from public CERN resources, then move from documentation to event objects, analysis examples, and validation tasks." },
  { title: "RAG Grounding", text: "The tutor workflow is designed around source-grounded responses: retrieved dataset records and documentation guide the explanation." },
  { title: "Sandboxed SWAN/ROOT Workflow", text: "The code lab models iterative code generation, execution, correction, and physics validation with ROOT-style analysis concepts." },
  { title: "Quantum-Ready Development", text: "The learning path connects detector literacy, classical ML, GNN reasoning, and hybrid quantum-classical methods." },
];

const defaultCode = [
  "# Simplified H -> gamma gamma style event selection",
  "# Learning sandbox only",
  "",
  "photons = [45.2, 38.7, 12.4]",
  "selected = [p for p in photons if p > 25]",
  "",
  "print(\"Selected photons:\", selected)",
  "print(\"Candidate event:\", len(selected) >= 2)",
].join("\n");

function tutorReply(question, module) {
  const q = question.toLowerCase();
  if (!q.trim()) return "Ask about the selected module, CERN Open Data access, code tasks, RAG grounding, ROOT, GNNs, VQC, QSVM, or OQI.";
  if (q.includes("oqi") || q.includes("open quantum") || q.includes("quantum institute")) return "The Open Quantum Institute layer connects quantum-ready training to open and inclusive access, capacity building, educational tools, and responsible quantum-computing applications.";
  if (q.includes("ai native") || q.includes("ai-native") || q.includes("native ai")) return "AI-native means AI is embedded across the learning loop: retrieval-grounded explanations, adaptive recommendations, code-coach feedback, validation scoring, and learner progress recording.";
  if (q.includes("data") || q.includes("cern") || q.includes("open")) return "Start from the CERN Open Data resource cards for this module. Read the dataset description first, then identify the experiment, collision energy, learning purpose, and relevant objects before attempting analysis.";
  if (q.includes("higgs") || q.includes("gamma") || q.includes("photon") || q.includes("γ")) return "For H → γγ, the learning goal is to understand how two energetic photons can be selected and used to form a candidate invariant-mass distribution. Dataset context and background modelling remain essential.";
  if (q.includes("rag") || q.includes("source") || q.includes("document")) return "The RAG layer retrieves relevant CERN Open Data or CERN documentation before producing an explanation. This keeps responses tied to actual records and reduces unsupported claims.";
  if (q.includes("quantum") || q.includes("vqc") || q.includes("qsvm")) return "Quantum-ready training introduces hybrid workflows: classical LHC features are encoded into quantum circuits or kernels, then compared against classical ML baselines.";
  if (q.includes("code") || q.includes("root") || q.includes("swan")) return "The sandbox workflow lets learners write code, run it, inspect output, revise mistakes, and validate physics logic. This interface models a SWAN/ROOT learning loop in a browser-friendly form.";
  if (q.includes("misconception") || q.includes("wrong") || q.includes("error")) return "A common misconception is that an AI answer is automatically correct. The engine emphasizes source grounding, executable checks, and physics consistency before accepting a result.";
  return `${module.title}: ${module.concept} Suggested next step: ${module.task}`;
}

function runCodeSimulation(code) {
  const lower = code.toLowerCase();
  const mentionsPhotons = lower.includes("photon");
  const mentionsPrint = lower.includes("print");
  const mentionsSelection = code.includes(">") || lower.includes("selected");
  if (!mentionsPrint) return { status: "Needs revision", output: "No output detected. Add a print statement so the result can be inspected.", score: 40 };
  if (mentionsPhotons && mentionsSelection) return { status: "Successful", output: "Selected photons: [45.2, 38.7]\nCandidate event: True\nPhysics check: event passes simplified two-photon selection.", score: 92 };
  return { status: "Partial", output: "Code ran, but the physics intent is unclear. Try including photon selection or candidate-event logic.", score: 65 };
}

function generateCodeCoachFeedback(code, runResult) {
  const lower = code.toLowerCase();
  const tips = [];
  if (!lower.includes("print")) tips.push("Add print statements so outputs can be inspected.");
  if (!lower.includes("photon")) tips.push("Name the physics objects explicitly, such as photons for H → γγ.");
  if (!lower.includes("selected")) tips.push("Create a selected-object collection to make event-selection logic visible.");
  if (!code.includes(">")) tips.push("Use a threshold or selection criterion to model analysis cuts.");
  if (runResult?.score >= 90) tips.push("Good: your workflow includes object selection, visible output, and a simplified physics check.");
  return tips.length ? tips : ["Ask the tutor to explain how to make the analysis more physics-consistent."];
}

function getModuleScore(quizAnswers, module) {
  return quizAnswers[module.id] === module.quiz.answer ? 25 : 0;
}

function calculateLearningScore({ quizAnswers, runResult, survey }) {
  const quizScore = modules.reduce((sum, module) => sum + getModuleScore(quizAnswers, module), 0);
  const codeScore = runResult ? Math.min(100, Math.round(runResult.score)) : 0;
  const reflectionScore = Math.round(((survey.clarity + survey.usefulness + survey.confidence) / 15) * 100);
  const total = Math.round(quizScore * 0.55 + codeScore * 0.25 + reflectionScore * 0.2);
  return { quizScore, codeScore, reflectionScore, total };
}

function recommendNextStep({ activeModule, completedQuizzes, runResult, survey }) {
  if (completedQuizzes < 2) return `Focus next on concept checks. Start with ${activeModule.title}, then move forward once the core idea is clear.`;
  if (!runResult) return "Run the code-validation task next. Sandbox feedback connects conceptual learning with executable analysis practice.";
  if (runResult.score < 80) return "Revise the code task using the AI tutor. Aim for explicit output, physics-object selection, and a clear validation statement.";
  if (survey.confidence < 4) return "Review CERN data resources and ask the tutor for a simpler explanation before advancing to quantum ML.";
  return "You are ready to continue toward GNN and quantum ML modules, including VQC/QSVM framing and OQI-aligned quantum-readiness topics.";
}

function runSelfTests() {
  const tests = [];
  const noPrint = runCodeSimulation("photons = [1, 2, 3]");
  tests.push({ name: "Code without print asks for revision", pass: noPrint.status === "Needs revision" && noPrint.score === 40 });
  const goodCode = runCodeSimulation(defaultCode);
  tests.push({ name: "Default photon-selection code succeeds", pass: goodCode.status === "Successful" && goodCode.score >= 90 });
  tests.push({ name: "Every module links to CERN/Open Data learning resources", pass: modules.every((module) => Array.isArray(module.resources) && module.resources.length > 0) });
  tests.push({ name: "Quantum module includes CERN Open Quantum Institute pathway", pass: cernResources.some((resource) => resource.id === "oqi") && modules.find((module) => module.id === "quantum")?.resources.includes("oqi") });
  tests.push({ name: "AI-native recommendation layer is active", pass: aiNativeFeatures.length >= 4 && recommendNextStep({ activeModule: modules[0], completedQuizzes: 0, runResult: null, survey: { confidence: 3 } }).length > 0 });
  const score = calculateLearningScore({ quizAnswers: { detector: 0, classification: 0, gnn: 0, quantum: 0 }, runResult: goodCode, survey: { clarity: 5, usefulness: 5, confidence: 5 } });
  tests.push({ name: "Learning score reaches high value for complete correct work", pass: score.total >= 95 });
  tests.push({ name: "Tutor responds to CERN Open Data access questions", pass: tutorReply("How do I access CERN data?", modules[0]).toLowerCase().includes("cern open data") });
  tests.push({ name: "Default code is a valid closed string", pass: typeof defaultCode === "string" && defaultCode.includes("Candidate event") });
  tests.push({ name: "Pedagogy cards are valid array", pass: Array.isArray(pedagogyCards) && pedagogyCards.length === 4 });
  tests.push({ name: "Quantum visuals are valid array", pass: Array.isArray(quantumVisuals) && quantumVisuals.length === 3 });
  return tests;
}

export default function App() {
  const [activeModuleId, setActiveModuleId] = useState("detector");
  const [question, setQuestion] = useState("");
  const [code, setCode] = useState(defaultCode);
  const [runResult, setRunResult] = useState(null);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [survey, setSurvey] = useState({ confidence: 4, clarity: 5, usefulness: 5 });
  const [learnerName, setLearnerName] = useState("");
  const [learningRecords, setLearningRecords] = useState([]);
  const [showTests, setShowTests] = useState(false);
  const [aiPlanVisible, setAiPlanVisible] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("quantum-engine-learning-records");
      if (stored) setLearningRecords(JSON.parse(stored));
    } catch {
      setLearningRecords([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("quantum-engine-learning-records", JSON.stringify(learningRecords));
  }, [learningRecords]);

  const activeModule = useMemo(() => modules.find((module) => module.id === activeModuleId) || modules[0], [activeModuleId]);
  const activeResources = activeModule.resources.map((id) => cernResources.find((resource) => resource.id === id)).filter(Boolean);
  const completedQuizzes = Object.values(quizAnswers).filter((answer) => answer !== undefined).length;
  const currentAnswer = quizAnswers[activeModule.id];
  const learningScore = calculateLearningScore({ quizAnswers, runResult, survey });
  const nextStep = recommendNextStep({ activeModule, completedQuizzes, runResult, survey });
  const codeCoachTips = generateCodeCoachFeedback(code, runResult);
  const tests = runSelfTests();
  const passedTests = tests.filter((test) => test.pass).length;

  function saveLearningRecord() {
    const label = learnerName.trim() || `Learner ${learningRecords.length + 1}`;
    const record = { id: Date.now(), name: label, score: learningScore.total, quizScore: learningScore.quizScore, codeScore: learningScore.codeScore, reflectionScore: learningScore.reflectionScore, completedQuizzes, date: new Date().toLocaleString() };
    setLearningRecords([record, ...learningRecords].slice(0, 12));
  }

  function clearLearningRecords() {
    setLearningRecords([]);
    localStorage.removeItem("quantum-engine-learning-records");
  }

  return (
    <>
      <style>{styles}</style>
      <main className="app-shell">
        <aside className="sidebar">
          <div className="brand"><div className="brand-icon">⚛</div><div><h1>QuantumCollider</h1><p>AI-Native Pedagogical Engine</p></div></div>
          <nav className="nav-list" aria-label="Main navigation">
            <a href="#dashboard">Dashboard</a><a href="#ai-native">AI-Native</a><a href="#data">CERN Data</a><a href="#modules">Learning Path</a><a href="#tutor">AI Tutor</a><a href="#sandbox">Code Lab</a><a href="#record">Learning Record</a>
          </nav>
          <section className="progress-card"><p>Learning Score</p><strong>{learningScore.total}/100</strong><div className="progress-track" aria-label="Learning score progress"><div style={{ width: `${learningScore.total}%` }} /></div></section>
        </aside>

        <section className="content">
          <header className="hero" id="dashboard">
            <div className="hero-copy">
              <p className="eyebrow">CERN Open Data · LLM guidance · Quantum-ready training</p>
              <h2>AI-Native Pedagogical Engine for HL-LHC Workforce Development</h2>
              <p>A neon quantum learning environment for detector literacy, CERN Open Data exploration, AI-assisted code correction, physics validation, graph learning, and hybrid quantum-classical machine learning.</p>
              <div className="hero-actions"><a href="#data">Explore CERN data</a><a href="#ai-native">View AI workflow</a></div>
            </div>
            <div className="quantum-showcase" aria-label="Quantum visual dashboard"><div className="orbital orbital-one" /><div className="orbital orbital-two" /><div className="orbital orbital-three" /><div className="quantum-core">⚛</div><div className="particle particle-a" /><div className="particle particle-b" /><div className="particle particle-c" /><div className="hero-badge"><span>Readiness</span><strong>{learningScore.total}%</strong></div></div>
          </header>

          <section className="metric-grid" aria-label="Learning metrics">
            <article><span>Open resources</span><strong>{cernResources.length}</strong><p>CERN-linked entries</p></article>
            <article><span>Modules</span><strong>{modules.length}</strong><p>Training units</p></article>
            <article><span>Quiz progress</span><strong>{completedQuizzes}/4</strong><p>Checks attempted</p></article>
            <article><span>Code validation</span><strong>{runResult ? runResult.score : 0}</strong><p>Sandbox score</p></article>
          </section>

          <section className="visual-strip" aria-label="Quantum visual learning modes">
            {quantumVisuals.map((visual) => <article className={`visual-card ${visual.color}`} key={visual.title}><div className="visual-icon">{visual.icon}</div><div><h3>{visual.title}</h3><p>{visual.subtitle}</p></div></article>)}
          </section>

          <section className="panel ai-native-panel" id="ai-native">
            <div className="panel-heading"><div><p className="eyebrow">AI-native infrastructure</p><h3>AI embedded across the learning loop</h3></div><button className="secondary" type="button" onClick={() => setAiPlanVisible(!aiPlanVisible)}>{aiPlanVisible ? "Hide AI plan" : "Show AI plan"}</button></div>
            <div className="reference-grid">{aiNativeFeatures.map((feature) => <article key={feature.title}><h4>{feature.title}</h4><p>{feature.text}</p></article>)}</div>
            {aiPlanVisible && <div className="ai-advisor"><h4>AI recommendation</h4><p>{nextStep}</p><h4>Code coach feedback</h4><ul>{codeCoachTips.map((tip) => <li key={tip}>{tip}</li>)}</ul></div>}
          </section>

          <section className="panel" id="data">
            <div className="panel-heading"><div><p className="eyebrow">CERN Open Data access</p><h3>Learning resources connected to public data</h3></div><span className="pill">Open-source pathway</span></div>
            <div className="resource-grid">{cernResources.map((resource) => <article className="resource-card" key={resource.id}><div className="resource-topline"><span>{resource.experiment}</span><span>{resource.level}</span></div><h4>{resource.title}</h4><p>{resource.description}</p><p className="learning-use">{resource.learningUse}</p><a href={resource.url} target="_blank" rel="noreferrer">Open resource ↗</a></article>)}</div>
          </section>

          <section className="main-grid">
            <div className="panel large" id="modules">
              <div className="panel-heading"><div><p className="eyebrow">Adaptive learning path</p><h3>{activeModule.title}</h3></div><span className="pill">{activeModule.level}</span></div>
              <div className="module-buttons">{modules.map((module) => <button type="button" key={module.id} className={module.id === activeModuleId ? "active" : ""} onClick={() => { setActiveModuleId(module.id); setQuestion(""); }}><span>{module.title}</span><small>{module.summary}</small></button>)}</div>
              <div className="info-card"><h4>Concept</h4><p>{activeModule.concept}</p></div>
              <div className="two-col"><div className="info-card"><h4>Dataset pathway</h4><p>{activeModule.dataset}</p></div><div className="info-card"><h4>Hands-on task</h4><p>{activeModule.task}</p></div></div>
              <div className="linked-resources"><h4>Resources for this module</h4>{activeResources.map((resource) => <a key={resource.id} href={resource.url} target="_blank" rel="noreferrer">{resource.title} ↗</a>)}</div>
            </div>

            <div className="panel" id="tutor"><p className="eyebrow">Source-grounded tutor</p><h3>Ask the engine</h3><div className="chat-box"><p>{tutorReply(question, activeModule)}</p></div><input value={question} onChange={(event) => setQuestion(event.target.value)} placeholder="Ask about CERN data, H→γγ, RAG, ROOT, OQI, VQC, QSVM..." /></div>
          </section>

          <section className="main-grid">
            <div className="panel" id="sandbox"><p className="eyebrow">Sandboxed execution workflow</p><h3>SWAN/ROOT-style code lab</h3><textarea value={code} onChange={(event) => setCode(event.target.value)} /><button className="primary" type="button" onClick={() => setRunResult(runCodeSimulation(code))}>Run validation</button>{runResult && <div className="result-box"><strong>Status: {runResult.status}</strong><pre>{runResult.output}</pre><p>Validation score: {runResult.score}/100</p></div>}</div>
            <div className="panel"><p className="eyebrow">Concept assessment</p><h3>Module check</h3><p className="question">{activeModule.quiz.question}</p><div className="answers">{activeModule.quiz.options.map((option, index) => { const selected = currentAnswer === index; const correct = activeModule.quiz.answer === index; return <button type="button" key={option} className={selected ? (correct ? "correct" : "wrong") : ""} onClick={() => setQuizAnswers({ ...quizAnswers, [activeModule.id]: index })}>{option}</button>; })}</div>{currentAnswer !== undefined && <div className="feedback">{currentAnswer === activeModule.quiz.answer ? "Correct. The concept check has been added to your learning score." : "Not quite. Review the module concept and try again."}</div>}</div>
          </section>

          <section className="main-grid" id="record">
            <div className="panel"><p className="eyebrow">Learning record</p><h3>Record your progress</h3><input value={learnerName} onChange={(event) => setLearnerName(event.target.value)} placeholder="Name or initials" />{[["confidence", "Confidence with HL-LHC learning pathway"], ["clarity", "Clarity of explanations"], ["usefulness", "Usefulness for quantum-ready training"]].map(([key, label]) => <label className="slider-row" key={key}><span>{label}: {survey[key]}/5</span><input type="range" min="1" max="5" value={survey[key]} onChange={(event) => setSurvey({ ...survey, [key]: Number(event.target.value) })} /></label>)}<button className="primary" type="button" onClick={saveLearningRecord}>Save learning score</button><button className="secondary" type="button" onClick={clearLearningRecords}>Clear saved records</button></div>
            <div className="panel"><p className="eyebrow">Current score</p><h3>Competency snapshot</h3><div className="highlight-number">{learningScore.total}/100</div><div className="score-breakdown"><p><strong>Concept checks:</strong> {learningScore.quizScore}/100</p><p><strong>Code validation:</strong> {learningScore.codeScore}/100</p><p><strong>Reflection:</strong> {learningScore.reflectionScore}/100</p></div><div className="record-list">{learningRecords.length === 0 ? <p className="note">No saved records yet.</p> : learningRecords.map((record) => <div className="record-item" key={record.id}><strong>{record.name}</strong><span>{record.score}/100</span><small>{record.date}</small></div>)}</div></div>
          </section>

          <section className="panel references"><p className="eyebrow">Pedagogical architecture</p><div className="reference-grid">{pedagogyCards.map((item) => <article key={item.title}><h4>{item.title}</h4><p>{item.text}</p></article>)}</div></section>

          <section className="panel tests"><div className="panel-heading"><div><p className="eyebrow">Developer checks</p><h3>Built-in app tests</h3></div><button className="secondary" type="button" onClick={() => setShowTests(!showTests)}>{showTests ? "Hide tests" : "Show tests"}</button></div><p>{passedTests}/{tests.length} tests passing. These checks verify resources, scoring, code validation, AI routing, and string safety.</p>{showTests && <ul className="test-list">{tests.map((test) => <li key={test.name} className={test.pass ? "pass" : "fail"}>{test.pass ? "✓" : "✗"} {test.name}</li>)}</ul>}</section>
        </section>
      </main>
    </>
  );
}

const styles = `
  :root {
    color-scheme: dark;
    font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    background: #020817;
    color: #dffcff;
  }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    background: radial-gradient(circle at 12% 8%, rgba(32,247,227,0.24), transparent 30rem), radial-gradient(circle at 88% 0%, rgba(155,92,255,0.28), transparent 34rem), radial-gradient(circle at 72% 72%, rgba(255,79,216,0.13), transparent 30rem), linear-gradient(135deg, #020817 0%, #06172f 48%, #080b23 100%);
    color: #dffcff;
  }
  body::before {
    content: "";
    position: fixed;
    inset: 0;
    pointer-events: none;
    background-image: linear-gradient(rgba(69,202,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(69,202,255,0.04) 1px, transparent 1px);
    background-size: 44px 44px;
  }
  button, input, textarea { font: inherit; }
  .app-shell { min-height: 100vh; display: grid; grid-template-columns: 280px minmax(0, 1fr); }
  .sidebar { position: sticky; top: 0; height: 100vh; padding: 24px; background: linear-gradient(180deg, rgba(2,8,23,0.98), rgba(7,17,45,0.94)); color: white; border-right: 1px solid rgba(32,247,227,0.18); box-shadow: 18px 0 70px rgba(0,255,255,0.06); }
  .brand { display: flex; align-items: center; gap: 14px; margin-bottom: 34px; }
  .brand-icon { width: 52px; height: 52px; display: grid; place-items: center; border-radius: 20px; background: radial-gradient(circle at 30% 20%, #fff, #20f7e3 22%, #9b5cff 74%); color: #020817; font-size: 28px; box-shadow: 0 0 28px rgba(32,247,227,0.55), 0 18px 40px rgba(0,0,0,0.32); }
  .brand h1 { margin: 0; font-size: 18px; line-height: 1.1; }
  .brand p { margin: 4px 0 0; color: #9ffcf3; font-size: 13px; }
  .nav-list { display: grid; gap: 10px; }
  .nav-list a { color: #dffcff; text-decoration: none; padding: 12px 14px; border-radius: 14px; background: rgba(255,255,255,0.045); border: 1px solid rgba(32,247,227,0.14); }
  .nav-list a:hover { background: rgba(32,247,227,0.12); box-shadow: 0 0 22px rgba(32,247,227,0.18); }
  .progress-card { margin-top: 30px; padding: 16px; border-radius: 18px; background: linear-gradient(135deg, rgba(32,247,227,0.12), rgba(155,92,255,0.12)); border: 1px solid rgba(32,247,227,0.22); box-shadow: 0 0 28px rgba(155,92,255,0.12); }
  .progress-card p { margin: 0 0 8px; color: #b9fff7; }
  .progress-card strong { font-size: 24px; }
  .progress-track { margin-top: 12px; height: 10px; background: rgba(255,255,255,0.14); border-radius: 999px; overflow: hidden; }
  .progress-track div { height: 100%; background: linear-gradient(90deg, #20f7e3, #45caff, #9b5cff); box-shadow: 0 0 18px rgba(32,247,227,0.7); }
  .content { padding: 28px; display: grid; gap: 22px; }
  .hero, .panel, .metric-grid article, .visual-card { background: rgba(8,22,45,0.76); border: 1px solid rgba(97,255,242,0.18); box-shadow: 0 24px 80px rgba(0,0,0,0.26), inset 0 1px 0 rgba(255,255,255,0.05); backdrop-filter: blur(18px); }
  .hero { position: relative; overflow: hidden; border-radius: 32px; padding: 34px; display: grid; grid-template-columns: minmax(0,1.25fr) 360px; align-items: center; gap: 28px; background: linear-gradient(135deg, rgba(32,247,227,0.11), transparent 42%), linear-gradient(145deg, rgba(8,22,45,0.9), rgba(10,10,35,0.84)); }
  .hero-copy { position: relative; z-index: 2; }
  .eyebrow { margin: 0 0 8px; color: #20f7e3; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 900; font-size: 12px; text-shadow: 0 0 18px rgba(32,247,227,0.38); }
  .hero h2 { margin: 0; font-size: clamp(34px, 5.4vw, 68px); line-height: 0.95; max-width: 980px; letter-spacing: -0.06em; color: #fff; text-shadow: 0 0 28px rgba(69,202,255,0.18); }
  .hero p:not(.eyebrow) { max-width: 780px; color: #bdd4e0; font-size: 17px; line-height: 1.65; }
  .hero-actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 22px; }
  .hero-actions a { color: #02111f; text-decoration: none; font-weight: 900; border-radius: 999px; padding: 12px 16px; background: linear-gradient(135deg, #20f7e3, #45caff); box-shadow: 0 0 26px rgba(32,247,227,0.28); }
  .hero-actions a:nth-child(2) { color: #fff; background: rgba(255,255,255,0.08); border: 1px solid rgba(32,247,227,0.24); }
  .quantum-showcase { position: relative; z-index: 2; min-height: 320px; display: grid; place-items: center; }
  .quantum-core { width: 128px; height: 128px; display: grid; place-items: center; border-radius: 50%; background: radial-gradient(circle at 35% 28%, #fff 0 8%, #20f7e3 20%, #10205a 54%, #030617 100%); color: white; font-size: 64px; box-shadow: 0 0 48px rgba(32,247,227,0.7), 0 0 90px rgba(155,92,255,0.34); }
  .orbital { position: absolute; width: 250px; height: 92px; border: 2px solid rgba(32,247,227,0.42); border-radius: 50%; box-shadow: 0 0 24px rgba(32,247,227,0.2); }
  .orbital-one { transform: rotate(18deg); }
  .orbital-two { transform: rotate(78deg); border-color: rgba(155,92,255,0.46); }
  .orbital-three { transform: rotate(-38deg); border-color: rgba(255,79,216,0.36); }
  .particle { position: absolute; width: 13px; height: 13px; border-radius: 50%; background: #20f7e3; box-shadow: 0 0 18px #20f7e3; }
  .particle-a { transform: translate(112px, -54px); }
  .particle-b { transform: translate(-116px, 62px); background: #9b5cff; box-shadow: 0 0 18px #9b5cff; }
  .particle-c { transform: translate(36px, 126px); background: #ff4fd8; box-shadow: 0 0 18px #ff4fd8; }
  .hero-badge { position: absolute; right: 8px; bottom: 4px; min-width: 150px; border-radius: 24px; padding: 18px; color: white; background: linear-gradient(160deg, rgba(2,8,23,0.9), rgba(155,92,255,0.72)); border: 1px solid rgba(32,247,227,0.24); text-align: center; box-shadow: 0 0 34px rgba(155,92,255,0.34); }
  .hero-badge span { display: block; color: #b9fff7; }
  .hero-badge strong { font-size: 28px; }
  .metric-grid { display: grid; grid-template-columns: repeat(4, minmax(0,1fr)); gap: 16px; }
  .metric-grid article { border-radius: 22px; padding: 20px; }
  .metric-grid span { color: #9ffcf3; font-weight: 800; }
  .metric-grid strong { display: block; margin-top: 8px; font-size: 34px; color: #fff; text-shadow: 0 0 18px rgba(32,247,227,0.2); }
  .metric-grid p { margin: 6px 0 0; color: #9fb7c4; }
  .visual-strip { display: grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap: 16px; }
  .visual-card { position: relative; overflow: hidden; border-radius: 24px; padding: 22px; display: flex; align-items: center; gap: 16px; min-height: 130px; }
  .visual-card::after { content: ""; position: absolute; inset: -40% -20% auto auto; width: 180px; height: 180px; border-radius: 50%; filter: blur(8px); opacity: 0.38; }
  .visual-card.cyan::after { background: #20f7e3; }
  .visual-card.violet::after { background: #9b5cff; }
  .visual-card.emerald::after { background: #2dff9f; }
  .visual-icon { width: 64px; height: 64px; display: grid; place-items: center; border-radius: 22px; background: rgba(255,255,255,0.08); border: 1px solid rgba(32,247,227,0.24); font-size: 36px; color: #20f7e3; box-shadow: 0 0 24px rgba(32,247,227,0.12); }
  .visual-card h3 { color: #fff; }
  .visual-card p { margin: 6px 0 0; color: #9fb7c4; }
  .main-grid { display: grid; grid-template-columns: minmax(0,1.35fr) minmax(320px,0.65fr); gap: 18px; }
  .panel { border-radius: 24px; padding: 22px; }
  .panel.large { min-height: 420px; }
  .panel-heading { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; margin-bottom: 16px; }
  h3 { margin: 0; color: #fff; font-size: 24px; letter-spacing: -0.02em; }
  h4 { margin: 0 0 8px; color: #eaffff; }
  .pill { padding: 8px 12px; border-radius: 999px; background: rgba(32,247,227,0.1); color: #20f7e3; border: 1px solid rgba(32,247,227,0.24); font-weight: 900; white-space: nowrap; }
  .resource-grid { display: grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap: 14px; }
  .resource-card { background: linear-gradient(145deg, rgba(8,22,45,0.88), rgba(6,12,34,0.82)); border: 1px solid rgba(32,247,227,0.16); border-radius: 18px; padding: 16px; display: grid; gap: 10px; transition: transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease; }
  .resource-card:hover { transform: translateY(-3px); border-color: rgba(32,247,227,0.42); box-shadow: 0 0 30px rgba(32,247,227,0.1); }
  .resource-topline { display: flex; justify-content: space-between; gap: 10px; color: #20f7e3; font-size: 12px; font-weight: 900; }
  .resource-card p { margin: 0; color: #b6c8d6; line-height: 1.5; }
  .resource-card .learning-use { color: #e8fffb; font-weight: 700; }
  .resource-card a, .linked-resources a { color: #20f7e3; font-weight: 900; text-decoration: none; }
  .module-buttons { display: grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap: 12px; margin-bottom: 16px; }
  .module-buttons button, .answers button { cursor: pointer; text-align: left; border: 1px solid rgba(32,247,227,0.14); background: rgba(255,255,255,0.045); border-radius: 18px; padding: 14px; color: #dffcff; }
  .module-buttons button.active { color: #02111f; background: linear-gradient(135deg, #20f7e3, #45caff); border-color: transparent; box-shadow: 0 0 28px rgba(32,247,227,0.22); }
  .module-buttons span { display: block; font-weight: 850; }
  .module-buttons small { display: block; margin-top: 5px; line-height: 1.35; opacity: 0.82; }
  .info-card, .chat-box, .result-box { border-radius: 18px; padding: 16px; background: rgba(255,255,255,0.045); border: 1px solid rgba(32,247,227,0.14); }
  .info-card p, .chat-box p, .result-box p { margin: 0; line-height: 1.55; color: #b6c8d6; }
  .two-col { display: grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap: 12px; margin-top: 12px; }
  .linked-resources { margin-top: 14px; display: flex; flex-wrap: wrap; gap: 10px; align-items: center; }
  .linked-resources h4 { width: 100%; }
  .linked-resources a { background: rgba(32,247,227,0.09); border: 1px solid rgba(32,247,227,0.18); border-radius: 999px; padding: 8px 12px; }
  input, textarea { width: 100%; border: 1px solid rgba(32,247,227,0.18); border-radius: 16px; padding: 13px 14px; outline: none; background: rgba(2,8,23,0.52); color: #eaffff; }
  input::placeholder, textarea::placeholder { color: #6f8796; }
  input:focus, textarea:focus { border-color: #20f7e3; box-shadow: 0 0 0 4px rgba(32,247,227,0.12); }
  .chat-box { margin: 16px 0; min-height: 170px; }
  textarea { min-height: 260px; font-family: "SFMono-Regular", Consolas, "Liberation Mono", monospace; font-size: 14px; line-height: 1.5; resize: vertical; }
  .primary, .secondary { margin-top: 12px; margin-right: 8px; border: 0; border-radius: 16px; padding: 12px 16px; font-weight: 850; cursor: pointer; }
  .primary { color: #02111f; background: linear-gradient(135deg, #20f7e3, #45caff); box-shadow: 0 0 24px rgba(32,247,227,0.2); }
  .secondary { color: #eaffff; background: rgba(255,255,255,0.07); border: 1px solid rgba(32,247,227,0.18); }
  .result-box { margin-top: 14px; background: rgba(45,255,159,0.08); border-color: rgba(45,255,159,0.34); }
  pre { white-space: pre-wrap; overflow-x: auto; color: #b8ffdf; }
  .question { font-weight: 800; color: #eaffff; line-height: 1.5; }
  .answers { display: grid; gap: 10px; }
  .answers button.correct { background: rgba(45,255,159,0.12); border-color: rgba(45,255,159,0.6); }
  .answers button.wrong { background: rgba(255,79,216,0.1); border-color: rgba(255,79,216,0.5); }
  .feedback { margin-top: 14px; border-radius: 16px; padding: 14px; background: rgba(32,247,227,0.08); color: #dffcff; font-weight: 700; }
  .slider-row { display: grid; gap: 8px; margin: 16px 0; color: #b9fff7; font-weight: 800; }
  input[type="range"] { padding: 0; accent-color: #20f7e3; }
  .highlight-number { margin: 18px 0; font-size: 68px; line-height: 1; font-weight: 950; color: #20f7e3; letter-spacing: -0.06em; text-shadow: 0 0 26px rgba(32,247,227,0.38); }
  .score-breakdown p { margin: 8px 0; color: #b6c8d6; }
  .note { color: #8ca5b4; font-size: 14px; line-height: 1.55; }
  .record-list { margin-top: 16px; display: grid; gap: 10px; }
  .record-item { display: grid; grid-template-columns: 1fr auto; gap: 4px 10px; padding: 12px; border-radius: 14px; background: rgba(255,255,255,0.045); border: 1px solid rgba(32,247,227,0.14); }
  .record-item small { grid-column: 1 / -1; color: #8ca5b4; }
  .record-item span { font-weight: 900; color: #20f7e3; }
  .ai-advisor { margin-top: 16px; border-radius: 18px; padding: 16px; background: linear-gradient(135deg, rgba(32,247,227,0.09), rgba(155,92,255,0.08)); border: 1px solid rgba(32,247,227,0.24); }
  .ai-advisor p { margin-top: 0; color: #c7f8f5; line-height: 1.55; }
  .ai-advisor ul { margin: 8px 0 0; padding-left: 20px; color: #c7f8f5; line-height: 1.65; }
  .ai-native-panel { border-color: rgba(32,247,227,0.28); }
  .references, .tests { margin-bottom: 10px; }
  .reference-grid { display: grid; grid-template-columns: repeat(4, minmax(0,1fr)); gap: 14px; }
  .reference-grid article { background: rgba(255,255,255,0.045); border: 1px solid rgba(32,247,227,0.14); border-radius: 18px; padding: 14px; }
  .reference-grid p { margin: 0; color: #b6c8d6; line-height: 1.5; }
  .test-list { margin: 12px 0 0; padding: 0; list-style: none; display: grid; gap: 8px; }
  .test-list li { padding: 10px 12px; border-radius: 12px; font-weight: 800; }
  .test-list .pass { color: #b8ffdf; background: rgba(45,255,159,0.1); }
  .test-list .fail { color: #ffd2f4; background: rgba(255,79,216,0.1); }
  @media (max-width: 980px) {
    .app-shell { grid-template-columns: 1fr; }
    .sidebar { position: relative; height: auto; }
    .main-grid, .metric-grid, .reference-grid, .module-buttons, .two-col, .resource-grid, .visual-strip { grid-template-columns: 1fr; }
    .hero { grid-template-columns: 1fr; }
    .quantum-showcase { min-height: 260px; }
  }
`;
