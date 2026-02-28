import { BUSINESS_TYPES, US_STATES } from './directoryData'

export default function BusinessInfoPanel({ businessInfo, onChange }) {
  const handleChange = (field, value) => {
    onChange({ ...businessInfo, [field]: value })
  }

  const handleTypeChange = (value) => {
    const selected = BUSINESS_TYPES.find(t => t.value === value)
    onChange({ ...businessInfo, businessType: selected || null })
  }

  return (
    <div className="card-gradient rounded-2xl border border-metal/20 p-4 sm:p-6">
      <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-azure">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
        </svg>
        Business Information
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label className="block text-sm text-cloudy mb-1">Business Name <span className="text-coral">*</span></label>
          <input
            type="text"
            value={businessInfo.businessName || ''}
            onChange={(e) => handleChange('businessName', e.target.value)}
            placeholder="e.g. Smith's Plumbing & Heating"
            className="w-full bg-midnight border border-metal/30 rounded-lg px-3 py-2.5 text-white placeholder-galactic focus:outline-none focus:ring-2 focus:ring-azure focus:border-transparent transition-colors"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm text-cloudy mb-1">Business Type / Industry <span className="text-coral">*</span></label>
          <select
            value={businessInfo.businessType?.value || ''}
            onChange={(e) => handleTypeChange(e.target.value)}
            className="w-full bg-midnight border border-metal/30 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-azure focus:border-transparent transition-colors"
          >
            <option value="">Select an industry...</option>
            {BUSINESS_TYPES.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm text-cloudy mb-1">Street Address</label>
          <input
            type="text"
            value={businessInfo.streetAddress || ''}
            onChange={(e) => handleChange('streetAddress', e.target.value)}
            placeholder="e.g. 123 Main Street"
            className="w-full bg-midnight border border-metal/30 rounded-lg px-3 py-2.5 text-white placeholder-galactic focus:outline-none focus:ring-2 focus:ring-azure focus:border-transparent transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm text-cloudy mb-1">City</label>
          <input
            type="text"
            value={businessInfo.city || ''}
            onChange={(e) => handleChange('city', e.target.value)}
            placeholder="e.g. Portland"
            className="w-full bg-midnight border border-metal/30 rounded-lg px-3 py-2.5 text-white placeholder-galactic focus:outline-none focus:ring-2 focus:ring-azure focus:border-transparent transition-colors"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm text-cloudy mb-1">State</label>
            <select
              value={businessInfo.state || ''}
              onChange={(e) => handleChange('state', e.target.value)}
              className="w-full bg-midnight border border-metal/30 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-azure focus:border-transparent transition-colors"
            >
              <option value="">--</option>
              {US_STATES.map(st => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm text-cloudy mb-1">ZIP</label>
            <input
              type="text"
              value={businessInfo.zip || ''}
              onChange={(e) => handleChange('zip', e.target.value)}
              placeholder="97201"
              maxLength={10}
              className="w-full bg-midnight border border-metal/30 rounded-lg px-3 py-2.5 text-white placeholder-galactic focus:outline-none focus:ring-2 focus:ring-azure focus:border-transparent transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-cloudy mb-1">Phone Number</label>
          <input
            type="tel"
            value={businessInfo.phone || ''}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder="(555) 555-5555"
            className="w-full bg-midnight border border-metal/30 rounded-lg px-3 py-2.5 text-white placeholder-galactic focus:outline-none focus:ring-2 focus:ring-azure focus:border-transparent transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm text-cloudy mb-1">Website URL</label>
          <input
            type="url"
            value={businessInfo.website || ''}
            onChange={(e) => handleChange('website', e.target.value)}
            placeholder="https://example.com"
            className="w-full bg-midnight border border-metal/30 rounded-lg px-3 py-2.5 text-white placeholder-galactic focus:outline-none focus:ring-2 focus:ring-azure focus:border-transparent transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm text-cloudy mb-1">Year Established</label>
          <input
            type="text"
            value={businessInfo.yearEstablished || ''}
            onChange={(e) => handleChange('yearEstablished', e.target.value)}
            placeholder="e.g. 2010"
            maxLength={4}
            className="w-full bg-midnight border border-metal/30 rounded-lg px-3 py-2.5 text-white placeholder-galactic focus:outline-none focus:ring-2 focus:ring-azure focus:border-transparent transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm text-cloudy mb-1">Owner / Contact Name</label>
          <input
            type="text"
            value={businessInfo.ownerName || ''}
            onChange={(e) => handleChange('ownerName', e.target.value)}
            placeholder="e.g. John Smith"
            className="w-full bg-midnight border border-metal/30 rounded-lg px-3 py-2.5 text-white placeholder-galactic focus:outline-none focus:ring-2 focus:ring-azure focus:border-transparent transition-colors"
          />
        </div>
      </div>
    </div>
  )
}
