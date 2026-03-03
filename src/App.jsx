import { useState, useEffect, useCallback } from 'react'
import BusinessInfoPanel from './BusinessInfoPanel'
import DescriptionBuilder from './DescriptionBuilder'
import PlatformTabs from './PlatformTabs'
import PlatformOutput from './PlatformOutput'
import NAPStandardizer from './NAPStandardizer'
import DirectoryChecklist from './DirectoryChecklist'

const STORAGE_KEY = 'local-biz-description-writer'

function loadFromStorage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) return JSON.parse(saved)
  } catch {
    // Ignore parse errors
  }
  return null
}

function saveToStorage(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {
    // Ignore storage errors
  }
}

const DEFAULT_BUSINESS_INFO = {
  businessName: '',
  businessType: null,
  streetAddress: '',
  city: '',
  state: '',
  zip: '',
  phone: '',
  website: '',
  yearEstablished: '',
  ownerName: '',
}

export default function App() {
  const saved = loadFromStorage()

  const [businessInfo, setBusinessInfo] = useState(saved?.businessInfo || DEFAULT_BUSINESS_INFO)
  const [sentences, setSentences] = useState(saved?.sentences || ['', '', '', '', ''])
  const [activePlatform, setActivePlatform] = useState('google-business-profile')
  const [directoryStatuses, setDirectoryStatuses] = useState(saved?.directoryStatuses || {})
  const [activeSection, setActiveSection] = useState('builder')

  // Save to localStorage whenever data changes
  useEffect(() => {
    saveToStorage({
      businessInfo,
      sentences,
      directoryStatuses,
    })
  }, [businessInfo, sentences, directoryStatuses])

  const handleStatusChange = useCallback((directoryId, status) => {
    setDirectoryStatuses(prev => ({
      ...prev,
      [directoryId]: status,
    }))
  }, [])

  const fillTestData = () => {
    setBusinessInfo({
      businessName: 'Evergreen Plumbing & Heating',
      businessType: { value: 'plumbing', label: 'Plumbing' },
      streetAddress: '742 Maple Avenue',
      city: 'Portland',
      state: 'OR',
      zip: '97205',
      phone: '(503) 555-0147',
      website: 'https://www.evergreenplumbingpdx.com',
      yearEstablished: '2008',
      ownerName: 'Mike Thornton',
    })
    setSentences([
      'Evergreen Plumbing & Heating has been serving Portland and the surrounding area since 2008.',
      'We specialize in residential plumbing repairs, water heater installation, and drain cleaning services.',
      'Our team is known for same-day service and transparent, upfront pricing with no hidden fees.',
      'Licensed, bonded, and insured with over 500 five-star reviews from happy homeowners.',
      'Call (503) 555-0147 or visit evergreenplumbingpdx.com to schedule your appointment today.',
    ])
    setDirectoryStatuses({
      'google-business-profile': 'claimed',
      'yelp': 'claimed',
      'facebook': 'needs-update',
    })
  }

  const handleReset = () => {
    if (window.confirm('This will clear all your business info, descriptions, and checklist progress. Are you sure?')) {
      setBusinessInfo(DEFAULT_BUSINESS_INFO)
      setSentences(['', '', '', '', ''])
      setDirectoryStatuses({})
      localStorage.removeItem(STORAGE_KEY)
    }
  }

  const sections = [
    { id: 'builder', label: 'Description Builder' },
    { id: 'platforms', label: 'Platform Outputs' },
    { id: 'nap', label: 'NAP Standardizer' },
    { id: 'checklist', label: 'Directory Checklist' },
  ]

  return (
    <div className="min-h-screen bg-abyss bg-glow bg-grid">
      <div className="relative z-10 max-w-[1600px] mx-auto px-4 py-8 sm:py-12 animate-fadeIn">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-galactic">
          <a href="https://seo-tools-tau.vercel.app/" className="text-azure hover:text-white transition-colors">Free Tools</a>
          <span className="mx-2 text-metal">/</span>
          <a href="https://seo-tools-tau.vercel.app/local-business/" className="text-azure hover:text-white transition-colors">Local Business Tools</a>
          <span className="mx-2 text-metal">/</span>
          <span className="text-cloudy">Local Business Description Writer</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">
            Local Directory Listing Manager
          </h1>
          <p className="text-cloudy text-base sm:text-lg max-w-3xl">
            Create consistent, correctly-formatted descriptions and NAP info for 10+ directories from a single set of inputs. Build once, adapt everywhere.
          </p>
        </div>

        {/* Fill Test Data */}
        <div className="flex justify-end mb-4">
          <button
            type="button"
            onClick={fillTestData}
            className="px-3 py-1.5 text-xs font-mono bg-prince/20 text-prince border border-prince/30 rounded hover:bg-prince/30 transition-colors focus:outline-none focus:ring-2 focus:ring-prince focus:ring-offset-2 focus:ring-offset-abyss"
          >
            Fill Test Data
          </button>
        </div>

        {/* Section Navigation */}
        <div className="flex overflow-x-auto gap-1 mb-6 pb-1 -mx-1 px-1" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {sections.map(section => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`shrink-0 px-4 py-2 min-h-[44px] rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-azure focus:ring-offset-2 focus:ring-offset-abyss ${
                activeSection === section.id
                  ? 'bg-azure text-white'
                  : 'bg-oblivion text-cloudy hover:text-white hover:bg-metal/30 border border-metal/20'
              }`}
            >
              {section.label}
            </button>
          ))}
        </div>

        {/* Business Info Panel - always visible */}
        <div className="mb-6">
          <BusinessInfoPanel businessInfo={businessInfo} onChange={setBusinessInfo} />
        </div>

        {/* Active Section Content */}
        {activeSection === 'builder' && (
          <div className="mb-6 animate-fadeIn">
            <DescriptionBuilder
              businessInfo={businessInfo}
              sentences={sentences}
              onSentencesChange={setSentences}
            />
          </div>
        )}

        {activeSection === 'platforms' && (
          <div className="mb-6 animate-fadeIn">
            <div className="card-gradient rounded-2xl border border-metal/20 p-4 sm:p-6">
              <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-azure">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                </svg>
                Platform-Adapted Descriptions
              </h2>
              <p className="text-sm text-galactic mb-4">
                Your description, automatically adapted for each platform's character limits and tone expectations.
              </p>
              <div className="mb-4">
                <PlatformTabs activePlatform={activePlatform} onSelect={setActivePlatform} />
              </div>
              <PlatformOutput
                activePlatform={activePlatform}
                businessInfo={businessInfo}
                sentences={sentences}
              />
            </div>
          </div>
        )}

        {activeSection === 'nap' && (
          <div className="mb-6 animate-fadeIn">
            <NAPStandardizer businessInfo={businessInfo} />
          </div>
        )}

        {activeSection === 'checklist' && (
          <div className="mb-6 animate-fadeIn">
            <DirectoryChecklist
              businessType={businessInfo.businessType?.value || 'other'}
              statuses={directoryStatuses}
              onStatusChange={handleStatusChange}
            />
          </div>
        )}

        {/* Reset button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-4 py-2 min-h-[44px] text-sm text-galactic hover:text-coral border border-metal/20 rounded-lg hover:border-coral/30 transition-colors focus:outline-none focus:ring-2 focus:ring-coral focus:ring-offset-2 focus:ring-offset-abyss"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182" />
            </svg>
            Reset All Data
          </button>
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-6 border-t border-metal/30">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-galactic">
            <p>
              Built by{' '}
              <a href="https://www.dreamhost.com" target="_blank" rel="noopener noreferrer" className="text-azure hover:text-white transition-colors">
                DreamHost
              </a>
            </p>
            <p>Your data is saved locally and never leaves your browser.</p>
          </div>
        </footer>
      </div>
    </div>
  )
}
