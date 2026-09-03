export interface TokenizedResume {
  raw: string;
  lines: string[];
  words: string[];
  emails: string[];
  urls: string[];
  bulletCount: number;
}

export function tokenizeResumeText(rawText: string): TokenizedResume {
  const sanitized = rawText.replace(/\r\n/g, "\n");
  const lines = sanitized.split("\n").map((l) => l.trim()).filter(Boolean);
  const words = sanitized.split(/\s+/).filter(Boolean);

  const emails = Array.from(
    new Set(
      sanitized.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g) || []
    )
  );

  const urls = Array.from(
    new Set(
      sanitized.match(
        /(https?:\/\/[^\s|]+|linkedin\.com\/[^\s|]+|github\.com\/[^\s|]+|[a-zA-Z0-9-]+\.(?:com|org|io|dev|in)[^\s|]*)/gi
      ) || []
    )
  );

  const bulletCount = (sanitized.match(/^[\s]*[-•*]/gm) || []).length;

  return {
    raw: sanitized,
    lines,
    words,
    emails,
    urls,
    bulletCount,
  };
}
