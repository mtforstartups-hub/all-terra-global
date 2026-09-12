const fs = require('fs');
const path = require('path');

function mdToJsx(text) {
    let lines = text.split('\n');
    let jsxLines = [];
    let inList = false;
    
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i].trim();
        if (!line) continue;
        
        if (line.startsWith('### ')) {
            if (inList) { jsxLines.push('</ul>'); inList = false; }
            let text = line.substring(4);
            jsxLines.push(`<h3 className="font-semibold text-[#1C5244] mt-6 mb-2 font-heading">${text}</h3>`);
            continue;
        }
        
        if (line.startsWith('- ')) {
            if (!inList) { jsxLines.push('<ul className="list-disc pl-5 space-y-1 mb-4">'); inList = true; }
            let text = line.substring(2);
            text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
            jsxLines.push(`<li>${text}</li>`);
            continue;
        } else {
            if (inList) { jsxLines.push('</ul>'); inList = false; }
        }
        
        line = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        line = line.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" className="text-[#1C5244] hover:text-[#F8AB1D] transition-colors underline">$1</a>');
        line = line.replace(/\\:/g, ':'); // fix markdown escaping mailto\:
        
        jsxLines.push(`<p className="mb-4">${line}</p>`);
    }
    if (inList) { jsxLines.push('</ul>'); }
    
    return `<div className="text-gray-600 leading-relaxed text-sm">\n${jsxLines.map(l => '        ' + l).join('\n')}\n      </div>`;
}

function processFile(inputFile, pageTitle, pageDescription, heroImage, outputFile) {
    const mdText = fs.readFileSync(inputFile, 'utf-8');
    const lines = mdText.split('\n');
    let introLines = [];
    let sections = [];
    let currentSection = null;

    for (let line of lines) {
        if (line.startsWith('## ')) {
            if (currentSection) {
                sections.push(currentSection);
            }
            currentSection = {
                title: line.replace(/^## \d*\.?\s*/, '').trim(),
                content: []
            };
        } else if (currentSection) {
            currentSection.content.push(line);
        } else {
            introLines.push(line);
        }
    }
    if (currentSection) sections.push(currentSection);
    
    let sectionsJsx = `const sections = [\n`;
    for (let sec of sections) {
        sectionsJsx += `  {\n    title: ${JSON.stringify(sec.title)},\n    content: (\n      ${mdToJsx(sec.content.join('\n'))}\n    ),\n  },\n`;
    }
    sectionsJsx += `];\n`;
    
    let effectiveDate = "10 March 2026";
    for (let line of introLines) {
        if (line.includes('**Effective Date:**')) {
            let date = line.replace('**Effective Date:**', '').trim();
            if (date && date !== '[DATE OF PUBLICATION]') effectiveDate = date;
        }
    }
    
    let introJsxLines = [];
    for (let line of introLines) {
        let t = line.trim();
        if (!t || t.startsWith('# ') || t.startsWith('**Effective Date:**')) continue;
        t = t.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        t = t.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" className="text-[#1C5244] hover:text-[#F8AB1D] transition-colors underline">$1</a>');
        t = t.replace(/\\:/g, ':');
        introJsxLines.push(`<p>${t}</p>`);
    }

    const template = `import type { Metadata } from "next";
import PageHero from "@/components/shared/PageHero";

export const metadata: Metadata = {
  title: "${pageTitle} | All Terra Global",
  description: "${pageDescription}",
};

${sectionsJsx}

export default function ${pageTitle.replace(/\s+/g, '')}() {
  return (
    <>
      <PageHero
        label="Legal"
        title="${pageTitle}"
        description="${pageDescription}"
        backgroundImage="${heroImage}"
        imageAlt="${pageTitle}"
      />

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Last Updated */}
          <div className="mb-12 pb-8 border-b border-gray-100">
            <div className="inline-flex items-center gap-2 bg-[#1C5244]/5 border border-[#1C5244]/20 rounded-full px-4 py-2">
              <svg
                className="w-4 h-4 text-[#1C5244]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="text-sm text-[#1C5244] font-medium">
                Last Updated: ${effectiveDate}
              </span>
            </div>
            <div className="mt-4 text-gray-600 leading-relaxed space-y-4">
              ${introJsxLines.join('\n              ')}
            </div>
          </div>

          {/* Sections */}
          <div className="space-y-12">
            {sections.map((section, idx) => (
              <div key={idx} className="group">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#1C5244] text-white font-bold text-sm shrink-0 font-heading">
                    {idx + 1}
                  </div>
                  <h2 className="text-2xl font-bold text-[#333333] font-heading">
                    {section.title}
                  </h2>
                </div>

                <div className="ml-14 space-y-6">
                  <div className="border-l-2 border-[#F8AB1D]/40 pl-5 text-gray-600 leading-relaxed text-sm">
                    {section.content}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer CTA */}
          <div className="mt-16 p-8 bg-[#1C5244] rounded-2xl text-white text-center">
            <h3 className="text-xl font-bold mb-3 font-heading">
              Have Questions About Our Policies?
            </h3>
            <p className="text-white/80 mb-6 text-sm">
              Our team is here to help you understand how your data is used and protected.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#F8AB1D] text-[#333333] font-semibold px-6 py-3 rounded-lg hover:bg-[#d99310] transition-colors"
            >
              Contact Us
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
`;
    
    fs.mkdirSync(path.dirname(outputFile), { recursive: true });
    fs.writeFileSync(outputFile, template);
}

processFile(
    'public/legal-docs/All Terra Global Privacy Policy.md', 
    'Privacy Policy', 
    'Your privacy is important to us. This policy outlines how we collect, use, and protect your personal information.',
    'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=2000&q=80',
    'app/(main)/privacy-policy/page.tsx'
);

processFile(
    'public/legal-docs/All Terra Global Cookie Policy.md', 
    'Cookie Policy', 
    'Learn about how we use cookies and similar technologies to improve your experience.',
    'https://images.unsplash.com/photo-1550565118-3a14e8d0386f?auto=format&fit=crop&w=2000&q=80',
    'app/(main)/cookie-policy/page.tsx'
);

console.log("Done");
