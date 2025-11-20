'use client';

import { useMemo, useState } from 'react';
import { CategoryFilter } from '@/components/CategoryFilter';
import { SearchBar } from '@/components/SearchBar';
import { ToolCard } from '@/components/ToolCard';
import type { Tool, ToolCategory } from '@/lib/tools';
import { tools } from '@/lib/tools';

function filterTools(
  items: Tool[],
  query: string,
  category: ToolCategory | 'All'
) {
  const normalizedQuery = query.trim().toLowerCase();
  return items.filter((tool) => {
    const matchesCategory =
      category === 'All' || tool.categories.includes(category);
    if (!matchesCategory) {
      return false;
    }

    if (!normalizedQuery) {
      return true;
    }

    const haystack = [
      tool.name,
      tool.headline,
      tool.description,
      tool.bestFor.join(' '),
      tool.categories.join(' ')
    ]
      .join(' ')
      .toLowerCase();

    return haystack.includes(normalizedQuery);
  });
}

const allCategories = Array.from(
  new Set(tools.flatMap((tool) => tool.categories))
) as ToolCategory[];

const quickWins = [
  {
    title: 'Capture smarter notes',
    tools: ['Notion AI', 'Mindgrasp'],
    tip: 'Turn lecture recordings into structured notes you can query later.'
  },
  {
    title: 'Review in half the time',
    tools: ['Quizlet Q-Chat', 'Mindgrasp'],
    tip: 'Let AI auto-generate flashcards and adapt practice to your weak spots.'
  },
  {
    title: 'Master complex readings',
    tools: ['Explainpaper', 'Perplexity', 'Genei'],
    tip: 'Combine summaries with citation tracking so you never lose sources.'
  }
];

export default function HomePage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<ToolCategory | 'All'>('All');

  const filteredTools = useMemo(
    () => filterTools(tools, query, category),
    [query, category]
  );

  return (
    <main>
      <section className="hero">
        <div className="container hero-content">
          <div className="hero-copy">
            <span className="pill">AI Study Toolkit</span>
            <h1>
              Learn 10x faster with the smartest AI study assistants at your
              side.
            </h1>
            <p>
              Curated apps that summarize dense readings, generate flashcards,
              coach deep work, and explain tough concepts instantly. Mix and
              match to build your personalized learning autopilot.
            </p>
            <div className="hero-actions">
              <SearchBar value={query} onChange={setQuery} />
              <CategoryFilter
                categories={allCategories}
                activeCategory={category}
                onSelect={setCategory}
              />
            </div>
            <p className="result-count">
              Showing {filteredTools.length} of {tools.length} tools
            </p>
          </div>
          <div className="hero-panel">
            <div className="panel-card">
              <h2>Build your AI study stack</h2>
              <ol>
                <li>
                  <strong>Capture &amp; condense:</strong> Turn lectures and
                  readings into bite-sized notes.
                </li>
                <li>
                  <strong>Understand deeply:</strong> Interrogate concepts with
                  AI tutors.
                </li>
                <li>
                  <strong>Practice smarter:</strong> Generate quizzes, flashcards
                  and personalized study loops.
                </li>
              </ol>
            </div>
            <div className="panel-card secondary">
              <h3>Need a fast recommendation?</h3>
              <ul className="recommendations">
                {quickWins.map((item) => (
                  <li key={item.title}>
                    <span className="rec-title">{item.title}</span>
                    <span className="rec-tools">{item.tools.join(' • ')}</span>
                    <p>{item.tip}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="tool-grid container" aria-label="AI study tools">
        {filteredTools.map((tool, index) => (
          <ToolCard key={tool.name} tool={tool} index={index} />
        ))}
        {filteredTools.length === 0 && (
          <div className="empty-state">
            <h3>No tools found</h3>
            <p>
              Try removing a filter or searching for a broader skill like
              &ldquo;flashcards&rdquo; or &ldquo;notes&rdquo;.
            </p>
          </div>
        )}
      </section>

      <section className="playbook">
        <div className="container playbook-inner">
          <div>
            <h2>Create your 10x learning loop</h2>
            <p>
              Combine AI tools intentionally and you will reclaim hours each
              week. Start by letting AI capture raw material, then retell the
              ideas back to yourself through active recall and spaced practice.
            </p>
          </div>
          <div className="loop-grid">
            <div className="loop-card">
              <span className="step">1</span>
              <h3>Capture</h3>
              <p>
                Use Mindgrasp or Notion AI to ingest lectures, slides, and long
                readings. Highlight confusing sections for follow-up.
              </p>
            </div>
            <div className="loop-card">
              <span className="step">2</span>
              <h3>Clarify</h3>
              <p>
                Send dense paragraphs to Explainpaper or Perplexity to simplify
                jargon and pull citations you can trust.
              </p>
            </div>
            <div className="loop-card">
              <span className="step">3</span>
              <h3>Practice</h3>
              <p>
                Generate adaptive quizzes with Quizlet Q-Chat or Kaizen Flow to
                drill concepts on your schedule.
              </p>
            </div>
            <div className="loop-card">
              <span className="step">4</span>
              <h3>Create</h3>
              <p>
                Showcase what you learned with Gamma slides or Notion playbooks
                to reinforce knowledge by teaching others.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="container footer-inner">
          <p>
            Made for ambitious learners who want to leverage AI responsibly.
            Always fact-check and blend tools with deliberate practice.
          </p>
          <a
            href="https://vercel.com"
            className="footer-link"
            target="_blank"
            rel="noreferrer"
          >
            Deploy your own AI toolkit on Vercel →
          </a>
        </div>
      </footer>
    </main>
  );
}
