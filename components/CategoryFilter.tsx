import { ToolCategory } from '@/lib/tools';

interface CategoryFilterProps {
  categories: ToolCategory[];
  activeCategory: ToolCategory | 'All';
  onSelect: (category: ToolCategory | 'All') => void;
}

const sortCategories = (cats: ToolCategory[]) =>
  [...cats].sort((a, b) => a.localeCompare(b));

export function CategoryFilter({
  categories,
  activeCategory,
  onSelect
}: CategoryFilterProps) {
  const ordered = sortCategories(categories);

  return (
    <div className="filter-bar">
      <button
        type="button"
        className={`chip ${activeCategory === 'All' ? 'chip-active' : ''}`}
        onClick={() => onSelect('All')}
      >
        All tools
      </button>
      {ordered.map((category) => (
        <button
          key={category}
          type="button"
          className={`chip ${activeCategory === category ? 'chip-active' : ''}`}
          onClick={() => onSelect(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
