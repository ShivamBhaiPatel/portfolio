import { StructuredResume } from "./types";

export function compileToPlainText(resume: StructuredResume): string {
  const sections: string[] = [];

  // Header
  sections.push(
    [
      resume.name.toUpperCase(),
      resume.title,
      `${resume.location} | ${resume.contact.email} | ${resume.contact.github || ""} | ${resume.contact.linkedin || ""}`,
    ].join("\n")
  );

  // Summary
  sections.push(`PROFESSIONAL SUMMARY\n${resume.summary}`);

  // Skills
  sections.push(
    [
      "TECHNICAL SKILLS",
      `- Backend & Systems: ${resume.skills.backend}`,
      `- Frontend & Automation: ${resume.skills.frontend}`,
      `- Databases & Infrastructure: ${resume.skills.infra}`,
      `- Architectural Patterns: ${resume.skills.architecture}`,
    ].join("\n")
  );

  // Experience
  const expLines = ["WORK EXPERIENCE"];
  for (const exp of resume.experience) {
    expLines.push(`${exp.role} | ${exp.period}`);
    expLines.push(`${exp.company} · ${exp.location}`);
    for (const pt of exp.points) {
      expLines.push(`- ${pt}`);
    }
  }
  sections.push(expLines.join("\n"));

  // Projects
  const projLines = ["KEY PROJECTS & SYSTEMS"];
  for (const proj of resume.projects) {
    projLines.push(`${proj.name} — ${proj.role}`);
    projLines.push(proj.stack);
    for (const pt of proj.points) {
      projLines.push(`- ${pt}`);
    }
  }
  sections.push(projLines.join("\n"));

  // Education
  const eduLines = ["EDUCATION & CREDENTIALS"];
  for (const edu of resume.education) {
    eduLines.push(`- ${edu.degree} | ${edu.institution} (${edu.period})`);
  }
  sections.push(eduLines.join("\n"));

  return sections.join("\n\n");
}

export function compileToMarkdown(resume: StructuredResume): string {
  const sections: string[] = [];

  sections.push(
    `# ${resume.name}\n**${resume.title}**\n\n${resume.location} | [${resume.contact.email}](mailto:${resume.contact.email}) | [LinkedIn](https://${resume.contact.linkedin}) | [GitHub](https://${resume.contact.github})`
  );

  sections.push(`## Professional Summary\n${resume.summary}`);

  sections.push(
    `## Technical Skills\n- **Backend & Systems:** ${resume.skills.backend}\n- **Frontend & Automation:** ${resume.skills.frontend}\n- **Databases & Infrastructure:** ${resume.skills.infra}\n- **Architectural Patterns:** ${resume.skills.architecture}`
  );

  const expLines = ["## Work Experience"];
  for (const exp of resume.experience) {
    expLines.push(`### ${exp.role} — *${exp.company}*\n_${exp.period} | ${exp.location}_`);
    for (const pt of exp.points) {
      expLines.push(`- ${pt}`);
    }
  }
  sections.push(expLines.join("\n\n"));

  const projLines = ["## Key Projects & Systems"];
  for (const proj of resume.projects) {
    projLines.push(`### ${proj.name} — ${proj.role}\n*${proj.stack}*`);
    for (const pt of proj.points) {
      projLines.push(`- ${pt}`);
    }
  }
  sections.push(projLines.join("\n\n"));

  const eduLines = ["## Education & Credentials"];
  for (const edu of resume.education) {
    eduLines.push(`- **${edu.degree}**, ${edu.institution} (${edu.period})`);
  }
  sections.push(eduLines.join("\n"));

  return sections.join("\n\n");
}
