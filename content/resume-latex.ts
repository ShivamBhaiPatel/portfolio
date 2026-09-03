export const RESUME_LATEX_CODE = `%-------------------------
% Resume in LaTeX (Standard Single-Column Article Format)
% Author : Shivam Bhai Patel
% License : MIT
% ATS-Optimized: Glyphtounicode enabled for 100% parseable text layers
%------------------------

\\documentclass[letterpaper,10pt]{article}

\\usepackage{latexsym}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}
\\usepackage{marvosym}
\\usepackage[usenames,dvipsnames]{color}
\\usepackage{verbatim}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage{fancyhdr}
\\usepackage[english]{babel}
\\usepackage{tabularx}

% Ensure that generated pdf is machine readable/ATS parsable
\\input{glyphtounicode}
\\pdfgentounicode=1

\\pagestyle{fancy}
\\fancyhf{} % clear all header and footer fields
\\fancyfoot{}
\\renewcommand{\\headrulewidth}{0pt}
\\renewcommand{\\footrulewidth}{0pt}

% Adjust margins
\\addtolength{\\oddsidemargin}{-0.5in}
\\addtolength{\\evensidemargin}{-0.5in}
\\addtolength{\\textwidth}{1in}
\\addtolength{\\topmargin}{-.5in}
\\addtolength{\\textheight}{1.0in}

\\urlstyle{same}

\\raggedbottom
\\raggedright
\\setlength{\\tabcolsep}{0in}

% Sections formatting
\\titleformat{\\section}{
  \\vspace{-4pt}\\scshape\\raggedright\\large
}{}{0em}{}[\\color{black}\\titlerule \\vspace{-5pt}]

% Custom commands
\\newcommand{\\resumeItem}[1]{
  \\item\\small{
    {#1 \\vspace{-2pt}}
  }
}

\\newcommand{\\resumeSubheading}[4]{
  \\vspace{-2pt}\\item
    \\begin{tabular*}{0.97\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
      \\textbf{#1} & #2 \\\\
      \\textit{\\small#3} & \\textit{\\small #4} \\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeProjectHeading}[2]{
    \\item
    \\begin{tabular*}{0.97\\textwidth}{l@{\\extracolsep{\\fill}}r}
      \\small#1 & #2 \\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeSubHeadingListStart}{\\begin{itemize}[leftmargin=0.15in, label={}]}
\\newcommand{\\resumeSubHeadingListEnd}{\\end{itemize}}
\\newcommand{\\resumeItemListStart}{\\begin{itemize}}
\\newcommand{\\resumeItemListEnd}{\\end{itemize}\\vspace{-5pt}}

%-------------------------------------------
%%%%%%  RESUME STARTS HERE  %%%%%%%%%%%%%%%%%%%%%%%%%%%%

\\begin{document}

%----------HEADING----------
\\begin{center}
    \\textbf{\\Huge \\scshape Shivam Bhai Patel} \\\\ \\vspace{1pt}
    \\textbf{\\small Senior Systems \\& Full-Stack Engineer} \\\\ \\vspace{2pt}
    \\small Prayagraj, India $\\cdot$ \\href{mailto:shivambhaipatel1997@gmail.com}{\\underline{shivambhaipatel1997@gmail.com}} $\\cdot$ 
    \\href{https://linkedin.com/in/shivambhaipatel}{\\underline{linkedin.com/in/shivambhaipatel}} $\\cdot$
    \\href{https://github.com/ShivamBhaiPatel}{\\underline{github.com/ShivamBhaiPatel}}
\\end{center}

%-----------PROFESSIONAL SUMMARY-----------
\\section{Professional Summary}
\\small{Senior Systems and Full-Stack Engineer with 4+ years of experience engineering autonomous developer tooling, distributed data ingestion pipelines, and enterprise JVM backends. Proven track record refactoring enterprise retail workforce systems at Zebra Technologies, building self-healing browser automation engines across 50+ Oracle ERP entities, and architecting multi-agent SDLC orchestration platforms.}

%-----------TECHNICAL SKILLS-----------
\\section{Technical Skills}
 \\begin{itemize}[leftmargin=0.15in, label={}]
    \\small{\\item{
     \\textbf{Backend \\& Systems}{: Java (8/11/17/21), Spring Boot 3, Spring Security, Microservices, JVM Tuning \\& Profiling, REST APIs, WebSockets, Node.js.} \\\\
     \\textbf{Frontend \\& Automation}{: Next.js 15/16, React, TypeScript, JavaScript, Playwright, Chrome Extensions (Manifest V3), Electron, Tailwind CSS.} \\\\
     \\textbf{Databases \\& Infra}{: PostgreSQL, MySQL, SQLite (WAL mode), Redis, BullMQ, Docker, Jenkins CI/CD, AWS (S3, EC2), Flyway, Linux/Bash.} \\\\
     \\textbf{Architecture}{: Multi-Agent Orchestration, Event-Driven Architecture, Task DAGs, Self-Healing Automation, Monolithic vs Distributed Design.}
    }}
 \\end{itemize}

%-----------EXPERIENCE-----------
\\section{Work Experience}
  \\resumeSubHeadingListStart

    \\resumeSubheading
      {Independent Systems \\& Software Consultant}{Apr 2024 -- Present}
      {Self-Employed}{Remote (Prayagraj, India)}
      \\resumeItemListStart
        \\resumeItem{Architected \\textbf{SyntraFlow}, an enterprise browser automation and regression execution engine deployed across 50+ business entities at a single client for FirstCron Services Pvt Ltd.}
        \\resumeItem{Engineered a three-tier execution system (Chrome MV3 extension + desktop daemon + Playwright replay engine) with self-healing DOM selector heuristics, reducing test maintenance overhead by 40\\%.}
        \\resumeItem{Diagnosed database execution bottlenecks and refactored Spring Boot query paths for SamMegh Technologies, cutting endpoint latency from $\\sim$800ms to $<$300ms.}
        \\resumeItem{Integrated role-based access control (RBAC), deterministic DOM state capture, and automated PDF audit report generation for enterprise compliance.}
      \\resumeItemListEnd

    \\resumeSubheading
      {Software Engineer}{Nov 2021 -- Mar 2024}
      {Reflexis Systems (Zebra Technologies)}{Pune, India}
      \\resumeItemListStart
        \\resumeItem{Maintained and scaled high-throughput workforce management and store operations platforms serving 150K+ daily retail workers across 400+ enterprise store locations.}
        \\resumeItem{Refactored legacy monolithic services into domain-aligned microservices with isolated persistence boundaries and clean REST contracts.}
        \\resumeItem{Overhauled automated Jenkins CI/CD deployment pipelines, cutting production release cycles from bi-weekly to under 2 days.}
        \\resumeItem{Conducted JVM profiling, heap dump analysis, and garbage collection tuning, boosting peak transaction throughput by 30\\%.}
      \\resumeItemListEnd
  \\resumeSubHeadingListEnd

%-----------PROJECTS-----------
\\section{Key Projects \\& Systems}
    \\resumeSubHeadingListStart
      \\resumeProjectHeading
          {\\textbf{Workflow Studio} $|$ \\emph{TypeScript, Node.js, SQLite, Atlassian APIs}}{Autonomous SDLC Orchestrator}
          \\resumeItemListStart
            \\resumeItem{Engineered an autonomous task decomposition engine that ingests unstructured PRDs and computes dependency-ordered task DAGs.}
            \\resumeItem{Implemented an isolated Git branch provisioner, automated reviewer gate, and bidirectional Jira/Bitbucket webhook synchronizers.}
            \\resumeItem{Enforced strict package isolation behind \\texttt{@workflow-studio/core}, eliminating UI symbol leaks via Node-only tsconfig.}
          \\resumeItemListEnd
      \\resumeProjectHeading
          {\\textbf{PracharFlow} $|$ \\emph{Java 21, Spring Boot 3, Skija (Skia), PostgreSQL, Telegram API}}{Parametric Composition Engine}
          \\resumeItemListStart
            \\resumeItem{Designed a deterministic graphic rendering engine replacing generative diffusion for Indian regional languages (Devanagari/Gujarati).}
            \\resumeItem{Achieved deterministic font layout rendering in under 150ms per creative asset on GPU/raster surfaces.}
          \\resumeItemListEnd
      \\resumeProjectHeading
          {\\textbf{DealDekho} $|$ \\emph{Next.js 15, TypeScript, PostgreSQL, Redis, BullMQ}}{Price Tracking \\& Telemetry Engine}
          \\resumeItemListStart
            \\resumeItem{Architected multi-aggregator product search and price tracking paired with verified client telemetry from the ShopLens extension.}
          \\resumeItemListEnd
    \\resumeSubHeadingListEnd

%-----------EDUCATION-----------
\\section{Education \\& Credentials}
  \\resumeSubHeadingListStart
    \\resumeSubheading
      {CDAC Pune}{2021}
      {Post Graduate Diploma in Advanced Computing (PG-DAC)}{Pune, India}
    \\resumeSubheading
      {M.J.P. Rohilkhand University}{Aug 2016 -- Nov 2020}
      {Bachelor of Technology (B.Tech) in Electrical Engineering}{Bareilly, India}
  \\resumeSubHeadingListEnd

%-------------------------------------------
\\end{document}
`;
