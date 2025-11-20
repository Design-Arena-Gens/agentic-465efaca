import { Tool } from '@/lib/tools';
import Link from 'next/link';

interface ToolCardProps {
  tool: Tool;
  index: number;
}

export function ToolCard({ tool, index }: ToolCardProps) {
  return (
    <article
      className="tool-card"
      style={{ animationDelay: `${index * 60}ms` }}
      aria-label={`${tool.name} study tool`}
    >
      <header>
        <h3>{tool.name}</h3>
        <p className="headline">{tool.headline}</p>
      </header>
      <p className="description">{tool.description}</p>
      <ul className="feature-list">
        {tool.features.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>
      <div className="tag-grid">
        {tool.categories.map((category) => (
          <span key={category} className="tag">
            {category}
          </span>
        ))}
      </div>
      <div className="card-footer">
        <div>
          <span className="pricing">{tool.pricing}</span>
          <span className="best-for">
            Best for: {tool.bestFor.join(' • ')}
          </span>
        </div>
        <Link href={tool.url} className="cta" target="_blank">
          Explore →
        </Link>
      </div>
    </article>
  );
}
