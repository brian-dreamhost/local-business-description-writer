import { useState } from 'react'

const ABBREVIATIONS = {
  'Street': 'St',
  'Avenue': 'Ave',
  'Boulevard': 'Blvd',
  'Drive': 'Dr',
  'Lane': 'Ln',
  'Road': 'Rd',
  'Court': 'Ct',
  'Place': 'Pl',
  'Circle': 'Cir',
  'Highway': 'Hwy',
  'Parkway': 'Pkwy',
  'Terrace': 'Ter',
  'Trail': 'Trl',
  'Way': 'Way',
  'Suite': 'Ste',
  'Apartment': 'Apt',
  'Building': 'Bldg',
  'Floor': 'Fl',
  'North': 'N',
  'South': 'S',
  'East': 'E',
  'West': 'W',
  'Northeast': 'NE',
  'Northwest': 'NW',
  'Southeast': 'SE',
  'Southwest': 'SW',
}

// Reverse map: abbreviation -> full word
const EXPANSIONS = {}
for (const [full, abbr] of Object.entries(ABBREVIATIONS)) {
  EXPANSIONS[abbr] = full
}

function standardizePhone(phone) {
  if (!phone) return ''
  const digits = phone.replace(/\D/g, '')
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
  }
  if (digits.length === 11 && digits[0] === '1') {
    return `(${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`
  }
  return phone
}

function abbreviateAddress(address) {
  if (!address) return ''
  let result = address
  for (const [full, abbr] of Object.entries(ABBREVIATIONS)) {
    // Match full words only (case insensitive), replace with abbreviated form + period
    const regex = new RegExp(`\\b${full}\\b`, 'gi')
    result = result.replace(regex, `${abbr}.`)
  }
  // Clean up double periods
  result = result.replace(/\.\./g, '.')
  return result
}

function expandAddress(address) {
  if (!address) return ''
  let result = address
  // Remove trailing periods from abbreviations first
  for (const [abbr, full] of Object.entries(EXPANSIONS)) {
    const regex = new RegExp(`\\b${abbr}\\.?\\b`, 'g')
    result = result.replace(regex, full)
  }
  return result
}

export default function NAPStandardizer({ businessInfo }) {
  const [useAbbreviated, setUseAbbreviated] = useState(true)
  const [copied, setCopied] = useState(false)

  const { businessName, streetAddress, city, state, zip, phone } = businessInfo

  const standardizedPhone = standardizePhone(phone)
  const standardizedAddress = useAbbreviated
    ? abbreviateAddress(streetAddress)
    : expandAddress(streetAddress)

  const napBlock = [
    businessName || '[Business Name]',
    standardizedAddress || '[Street Address]',
    `${city || '[City]'}, ${state || '[ST]'} ${zip || '[ZIP]'}`,
    standardizedPhone || '[Phone]',
  ].join('\n')

  const hasData = businessName || streetAddress || city || phone

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(napBlock)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      const textarea = document.createElement('textarea')
      textarea.value = napBlock
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="card-gradient rounded-2xl border border-metal/20 p-4 sm:p-6">
      <h2 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-azure">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
        </svg>
        NAP Standardizer
      </h2>
      <p className="text-sm text-galactic mb-4">Name, Address, Phone — standardized for consistent directory listings.</p>

      {/* Toggle */}
      <div className="flex items-center gap-3 mb-4">
        <span className={`text-sm ${!useAbbreviated ? 'text-white font-medium' : 'text-galactic'}`}>Full</span>
        <button
          onClick={() => setUseAbbreviated(!useAbbreviated)}
          className="relative p-2 -m-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-azure focus:ring-offset-2 focus:ring-offset-abyss"
          role="switch"
          aria-checked={useAbbreviated}
          aria-label="Toggle abbreviated address format"
        >
          <span className={`relative inline-flex w-11 h-6 items-center rounded-full transition-colors ${
            useAbbreviated ? 'bg-azure' : 'bg-metal/50'
          }`}>
            <span
              className={`inline-block w-5 h-5 bg-white rounded-full transition-transform ${
                useAbbreviated ? 'translate-x-[22px]' : 'translate-x-[2px]'
              }`}
            />
          </span>
        </button>
        <span className={`text-sm ${useAbbreviated ? 'text-white font-medium' : 'text-galactic'}`}>Abbreviated</span>
      </div>

      {/* NAP Block */}
      <div className="relative bg-midnight border border-metal/30 rounded-xl p-4 mb-3">
        <pre className="text-cloudy font-mono text-sm leading-relaxed whitespace-pre-wrap">
          {hasData ? napBlock : 'Enter your business info above to see your standardized NAP.'}
        </pre>
        {hasData && (
          <button
            onClick={handleCopy}
            className="absolute top-2 right-2 flex items-center gap-1.5 px-3 py-2 min-h-[44px] bg-azure text-white text-sm rounded-lg hover:bg-azure-hover transition-colors focus:outline-none focus:ring-2 focus:ring-azure focus:ring-offset-2 focus:ring-offset-abyss"
          >
            {copied ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
                Copied
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9.75a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
                </svg>
                Copy
              </>
            )}
          </button>
        )}
      </div>

      {/* Warning */}
      <div className="flex items-start gap-2 p-3 rounded-lg bg-tangerine/10 border border-tangerine/20">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-tangerine shrink-0 mt-0.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
        </svg>
        <p className="text-sm text-cloudy">
          <strong className="text-tangerine">Important:</strong> Use this EXACT format everywhere. Even small differences (St. vs Street) can hurt local SEO by creating inconsistent citations across directories.
        </p>
      </div>
    </div>
  )
}
