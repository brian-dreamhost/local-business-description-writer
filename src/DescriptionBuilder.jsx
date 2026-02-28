import { useState, useEffect } from 'react'
import {
  DIFFERENTIATORS,
  TRUST_FACTORS,
  CTA_TEMPLATES,
  buildSentence1,
  buildSentence2,
  buildSentence3,
  buildSentence4,
  buildSentence5,
} from './descriptionTemplates'

export default function DescriptionBuilder({ businessInfo, sentences, onSentencesChange }) {
  const [services, setServices] = useState(['', '', ''])
  const [differentiator, setDifferentiator] = useState('')
  const [trustFactor, setTrustFactor] = useState('')
  const [ctaTemplate, setCtaTemplate] = useState('')

  // Auto-build sentences from template inputs
  useEffect(() => {
    const s1 = buildSentence1(businessInfo)
    const s2 = buildSentence2(services)
    const s3 = buildSentence3(differentiator)
    const s4 = buildSentence4(trustFactor)
    const s5 = buildSentence5(ctaTemplate, businessInfo)

    // Only update if the auto-generated text differs from current custom text,
    // or if the sentence hasn't been manually edited
    const newSentences = [s1, s2, s3, s4, s5]
    const updated = sentences.map((current, i) => {
      // If current is empty or matches a previous auto-generated value, use new auto-generated
      if (!current || current === sentences[i]) {
        return newSentences[i]
      }
      return current
    })

    // Always update with auto-generated for unedited fields
    onSentencesChange(newSentences)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [businessInfo, services, differentiator, trustFactor, ctaTemplate])

  const handleServiceChange = (index, value) => {
    const updated = [...services]
    updated[index] = value
    setServices(updated)
  }

  const handleSentenceEdit = (index, value) => {
    const updated = [...sentences]
    updated[index] = value
    onSentencesChange(updated)
  }

  return (
    <div className="card-gradient rounded-2xl border border-metal/20 p-4 sm:p-6">
      <h2 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-azure">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
        </svg>
        Description Builder
      </h2>
      <p className="text-sm text-galactic mb-5">Build your description sentence by sentence. Select from templates, then customize the text below.</p>

      <div className="space-y-5">
        {/* Sentence 1: Intro */}
        <div>
          <label className="block text-sm font-medium text-cloudy mb-1">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-azure/20 text-azure text-xs font-bold mr-1.5">1</span>
            Introduction
          </label>
          <p className="text-xs text-galactic mb-2 ml-7">Auto-generated from your business info above.</p>
          <textarea
            value={sentences[0] || ''}
            onChange={(e) => handleSentenceEdit(0, e.target.value)}
            rows={2}
            className="w-full bg-midnight border border-metal/30 rounded-lg px-3 py-2.5 text-white placeholder-galactic focus:outline-none focus:ring-2 focus:ring-azure focus:border-transparent transition-colors text-sm resize-none"
          />
        </div>

        {/* Sentence 2: Services */}
        <div>
          <label className="block text-sm font-medium text-cloudy mb-1">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-azure/20 text-azure text-xs font-bold mr-1.5">2</span>
            Services / Specialties
          </label>
          <p className="text-xs text-galactic mb-2 ml-7">Enter your top services. The sentence will be built automatically.</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-2">
            {services.map((service, i) => (
              <input
                key={i}
                type="text"
                value={service}
                onChange={(e) => handleServiceChange(i, e.target.value)}
                placeholder={`Service ${i + 1}`}
                className="w-full bg-midnight border border-metal/30 rounded-lg px-3 py-2 text-white placeholder-galactic focus:outline-none focus:ring-2 focus:ring-azure focus:border-transparent transition-colors text-sm"
              />
            ))}
          </div>
          <textarea
            value={sentences[1] || ''}
            onChange={(e) => handleSentenceEdit(1, e.target.value)}
            rows={2}
            className="w-full bg-midnight border border-metal/30 rounded-lg px-3 py-2.5 text-white placeholder-galactic focus:outline-none focus:ring-2 focus:ring-azure focus:border-transparent transition-colors text-sm resize-none"
          />
        </div>

        {/* Sentence 3: Differentiator */}
        <div>
          <label className="block text-sm font-medium text-cloudy mb-1">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-azure/20 text-azure text-xs font-bold mr-1.5">3</span>
            Differentiator
          </label>
          <p className="text-xs text-galactic mb-2 ml-7">What makes your business stand out?</p>
          <select
            value={differentiator}
            onChange={(e) => setDifferentiator(e.target.value)}
            className="w-full bg-midnight border border-metal/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-azure focus:border-transparent transition-colors text-sm mb-2"
          >
            <option value="">Select a differentiator...</option>
            {DIFFERENTIATORS.map(d => (
              <option key={d} value={d}>{d.charAt(0).toUpperCase() + d.slice(1)}</option>
            ))}
          </select>
          <textarea
            value={sentences[2] || ''}
            onChange={(e) => handleSentenceEdit(2, e.target.value)}
            rows={2}
            className="w-full bg-midnight border border-metal/30 rounded-lg px-3 py-2.5 text-white placeholder-galactic focus:outline-none focus:ring-2 focus:ring-azure focus:border-transparent transition-colors text-sm resize-none"
          />
        </div>

        {/* Sentence 4: Trust factor */}
        <div>
          <label className="block text-sm font-medium text-cloudy mb-1">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-azure/20 text-azure text-xs font-bold mr-1.5">4</span>
            Trust Factor
          </label>
          <p className="text-xs text-galactic mb-2 ml-7">Why do customers choose you?</p>
          <select
            value={trustFactor}
            onChange={(e) => setTrustFactor(e.target.value)}
            className="w-full bg-midnight border border-metal/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-azure focus:border-transparent transition-colors text-sm mb-2"
          >
            <option value="">Select a trust factor...</option>
            {TRUST_FACTORS.map(t => (
              <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
            ))}
          </select>
          <textarea
            value={sentences[3] || ''}
            onChange={(e) => handleSentenceEdit(3, e.target.value)}
            rows={2}
            className="w-full bg-midnight border border-metal/30 rounded-lg px-3 py-2.5 text-white placeholder-galactic focus:outline-none focus:ring-2 focus:ring-azure focus:border-transparent transition-colors text-sm resize-none"
          />
        </div>

        {/* Sentence 5: CTA */}
        <div>
          <label className="block text-sm font-medium text-cloudy mb-1">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-azure/20 text-azure text-xs font-bold mr-1.5">5</span>
            Call to Action
          </label>
          <p className="text-xs text-galactic mb-2 ml-7">How should people reach you?</p>
          <select
            value={ctaTemplate}
            onChange={(e) => setCtaTemplate(e.target.value)}
            className="w-full bg-midnight border border-metal/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-azure focus:border-transparent transition-colors text-sm mb-2"
          >
            <option value="">Select a call to action...</option>
            {CTA_TEMPLATES.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <textarea
            value={sentences[4] || ''}
            onChange={(e) => handleSentenceEdit(4, e.target.value)}
            rows={2}
            className="w-full bg-midnight border border-metal/30 rounded-lg px-3 py-2.5 text-white placeholder-galactic focus:outline-none focus:ring-2 focus:ring-azure focus:border-transparent transition-colors text-sm resize-none"
          />
        </div>
      </div>

      {/* Full Preview */}
      <div className="mt-6 p-4 bg-midnight/50 rounded-xl border border-metal/20">
        <h3 className="text-sm font-medium text-galactic mb-2">Full Description Preview</h3>
        <p className="text-cloudy text-sm leading-relaxed">
          {sentences.filter(s => s && s.trim()).join(' ') || 'Fill in the fields above to preview your description.'}
        </p>
      </div>
    </div>
  )
}
