import { acceptedSchema } from "./mock-analysis";
import type { CsvValidationResult, EvidenceCategory } from "./types";

const identifiableFieldPatterns = ["patient", "name", "email", "phone", "address", "dob", "birth", "mrn", "ic", "nric"];
const validEvidenceCategories: EvidenceCategory[] = ["Strong", "Moderate", "Emerging", "Exploratory"];

function parseCsvLine(line: string): string[] {
  const values: string[] = [];
  let current = "";
  let insideQuotes = false;

  for (const character of line) {
    if (character === '"') {
      insideQuotes = !insideQuotes;
    } else if (character === "," && !insideQuotes) {
      values.push(current.trim());
      current = "";
    } else {
      current += character;
    }
  }

  values.push(current.trim());
  return values;
}

export function validateCsvDataset(content: string): CsvValidationResult {
  const lines = content.split(/\r?\n/).filter((line) => line.trim().length > 0);
  if (lines.length === 0) {
    return { rowCount: 0, validRows: 0, missingColumns: acceptedSchema, identifiableFields: [], errors: ["File is empty."] };
  }

  const headers = parseCsvLine(lines[0]).map((header) => header.toLowerCase());
  const missingColumns = acceptedSchema.slice(0, 6).filter((column) => !headers.includes(column));
  const identifiableFields = headers.filter((header) => identifiableFieldPatterns.some((pattern) => header.includes(pattern)));
  const errors: string[] = [];
  let validRows = 0;

  for (const [index, line] of lines.slice(1).entries()) {
    const row = parseCsvLine(line);
    const rowByHeader = new Map(headers.map((header, headerIndex) => [header, row[headerIndex] ?? ""]));
    const gene = rowByHeader.get("gene") ?? "";
    const variant = rowByHeader.get("variant") ?? "";
    const evidence = rowByHeader.get("evidence_category") ?? "";

    if (!gene || !variant) {
      errors.push(`Row ${index + 2}: gene and variant are required.`);
      continue;
    }

    if (!validEvidenceCategories.includes(evidence as EvidenceCategory)) {
      errors.push(`Row ${index + 2}: evidence_category must be Strong, Moderate, Emerging, or Exploratory.`);
      continue;
    }

    validRows += 1;
  }

  return {
    rowCount: Math.max(0, lines.length - 1),
    validRows,
    missingColumns,
    identifiableFields,
    errors
  };
}