import { fileURLToPath } from "url";

const STRAPI_URL = "http://localhost:1337";
const STRAPI_TOKEN = "e546502d212e91cb1834f700c193b18fe0774f3001e81e3c61a6952660a9712be1fa6822150409213aa65faaed228c48de7db91e8cf7b85f008cadbda323acc2935558b4119407b9a066f709617031462bb44ccd2ee775814cdcf4bef48a11819efc88db425d840a988949db0b83711e6af1c07af41da0470e70e87b12a703bf";

const headers = {
  Authorization: `Bearer ${STRAPI_TOKEN}`,
  "Content-Type": "application/json",
};

async function getFiles() {
  const res = await fetch(`${STRAPI_URL}/api/upload/files?pageSize=200`, { headers });
  const data = await res.json();
  return data;
}

async function getEntries(type) {
  const res = await fetch(`${STRAPI_URL}/api/${type}?pagination[pageSize]=100`, { headers });
  const data = await res.json();
  return data.data || [];
}

async function updateImage(type, documentId, imageId) {
  const res = await fetch(`${STRAPI_URL}/api/${type}/${documentId}`, {
    method: "PUT",
    headers,
    body: JSON.stringify({ data: { image: imageId } }),
  });
  if (!res.ok) {
    const err = await res.text();
    console.log(`    ERROR: ${err}`);
  }
  return res.ok;
}

const blogImageMap = {
  "your-interface-isnt-broken": "blog-indistinguishable",
  "why-brand-strategy-matters": "blog-1",
  "design-systems-at-scale": "blog-2",
  "seo-in-age-of-ai": "blog-3",
  "build-a-brand-people-trust": "blog-4",
  "web-performance-business-impact": "blog-5",
};

const caseImageMap = {
  "elevate-commerce-redesign": "case-study-1",
  "greenleaf-brand-identity": "case-study-2",
  "haven-health-platform": "case-study-3",
  "uplift-foundation-campaign": "case-study-4",
  "nova-fintech-launch": "case-study-5",
  "atlas-retail-experience": "case-study-6",
};

const teamImageMap = {
  "Sarah Chen": "team-1",
  "Marcus Rivera": "team-2",
  "James Park": "team-3",
  "Amara Okafor": "team-4",
};

async function main() {
  console.log("🔗 Linking images to entries...");

  const files = await getFiles();
  console.log(`Found ${files.length} files in media library`);
  console.log("Sample file:", JSON.stringify(files[0], null, 2));

  // Link blog posts
  console.log("\n📝 Blog Posts...");
  const blogs = await getEntries("blog-posts");
  console.log("Sample blog:", JSON.stringify(blogs[0], null, 2));
  
  for (const blog of blogs) {
    const imgName = blogImageMap[blog.slug];
    if (!imgName) continue;
    const file = files.find(f => f.name.includes(imgName));
    if (!file) { console.log(`  ⚠ No file found for ${blog.slug}`); continue; }
    const ok = await updateImage("blog-posts", blog.documentId, file.id);
    console.log(`  ${ok ? "✓" : "✗"} ${blog.slug} → ${file.name}`);
  }

  // Link case studies
  console.log("\n💼 Case Studies...");
  const cases = await getEntries("case-studies");
  for (const c of cases) {
    const imgName = caseImageMap[c.slug];
    if (!imgName) continue;
    const file = files.find(f => f.name.includes(imgName));
    if (!file) { console.log(`  ⚠ No file found for ${c.slug}`); continue; }
    const ok = await updateImage("case-studies", c.documentId, file.id);
    console.log(`  ${ok ? "✓" : "✗"} ${c.slug} → ${file.name}`);
  }

  // Link team members
  console.log("\n👥 Team Members...");
  const team = await getEntries("team-members");
  for (const member of team) {
    const imgName = teamImageMap[member.name];
    if (!imgName) continue;
    const file = files.find(f => f.name.includes(imgName));
    if (!file) { console.log(`  ⚠ No file found for ${member.name}`); continue; }
    const ok = await updateImage("team-members", member.documentId, file.id);
    console.log(`  ${ok ? "✓" : "✗"} ${member.name} → ${file.name}`);
  }

  console.log("\n✅ Done!");
}

main().catch(console.error);
