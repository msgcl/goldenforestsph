import fs from "node:fs/promises";

// The public page source, rather than the legacy data schema, determines which
// fields the admin may offer. Removed sections stay removed from the editor.
const pages = {
  home: "Home", about: "About", compliance: "Compliance", technology: "Technology",
  impact: "Impact", mangoProgram: "MangoProgram", agarwoodLifeCycle: "AgarwoodLifeCycle",
  ecotourism: "Ecotourism", contact: "Contact", nursery: "Nursery", plantation: "Plantation",
  management: "Management", photoGallery: "PhotoGallery",
};
const fields: Record<string, string[]> = {};
for (const [key, file] of Object.entries(pages)) {
  let source = await fs.readFile(`client/src/pages/${file}.tsx`, "utf8");
  if (key === "nursery") source += await fs.readFile("client/src/components/UpcomingInventory.tsx", "utf8");
  fields[key] = [...new Set([...source.matchAll(/\bcopy\.([A-Za-z]\w*)/g)].map(match => match[1]))].sort();
}
await fs.writeFile("client/src/lib/editableSiteCopyFields.ts", `// Generated from public page source by script/generate_editable_copy_fields.ts.\nexport const editableSiteCopyFields: Record<string, readonly string[]> = ${JSON.stringify(fields, null, 2)};\n`);
