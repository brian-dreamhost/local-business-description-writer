import { PLATFORMS } from './descriptionTemplates'

export default function PlatformTabs({ activePlatform, onSelect }) {
  return (
    <div className="flex overflow-x-auto gap-1 pb-1 -mx-1 px-1" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}>
      {PLATFORMS.map(platform => (
        <button
          key={platform.id}
          onClick={() => onSelect(platform.id)}
          className={`shrink-0 px-3 py-2 min-h-[44px] rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-azure focus:ring-offset-2 focus:ring-offset-abyss ${
            activePlatform === platform.id
              ? 'bg-azure text-white'
              : 'bg-oblivion text-cloudy hover:text-white hover:bg-metal/30 border border-metal/20'
          }`}
        >
          {platform.shortName}
        </button>
      ))}
    </div>
  )
}
