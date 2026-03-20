'use client';

import { useState } from 'react';

const SERVICE_OPTIONS = [
  'Sprinkler Systems',
  'Sod Roller Installation',
  'Irrigation Pumps',
  'Other / Not Sure',
];

export default function ContactForm({ formspreeId }) {
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [fields, setFields]  = useState({
    name: '', email: '', phone: '', service: '', message: '',
  });

  const handleChange = (e) =>
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');

    const endpoint = formspreeId
      ? `https://formspree.io/f/${formspreeId}`
      : 'https://formspree.io/f/YOUR_FORM_ID';

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(fields),
      });
      if (res.ok) {
        setStatus('success');
        setFields({ name: '', email: '', phone: '', service: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-10 text-center h-full flex flex-col items-center justify-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h4 className="text-xl font-bold text-green-800 mb-2">Message Received</h4>
        <p className="text-green-700">Thanks for reaching out. We&apos;ll be in touch soon.</p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-6 text-sm text-brand-blue underline underline-offset-2 hover:text-brand-blue-dark"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="name">
            Full Name <span className="text-brand-red">*</span>
          </label>
          <input
            id="name" name="name" type="text" required
            value={fields.name} onChange={handleChange}
            placeholder="John Smith"
            className="form-input"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="phone">
            Phone Number
          </label>
          <input
            id="phone" name="phone" type="tel"
            value={fields.phone} onChange={handleChange}
            placeholder="(555) 000-0000"
            className="form-input"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="email">
          Email Address <span className="text-brand-red">*</span>
        </label>
        <input
          id="email" name="email" type="email" required
          value={fields.email} onChange={handleChange}
          placeholder="john@example.com"
          className="form-input"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="service">
          Service Needed
        </label>
        <select
          id="service" name="service"
          value={fields.service} onChange={handleChange}
          className="form-input bg-white"
        >
          <option value="">Select a service…</option>
          {SERVICE_OPTIONS.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="message">
          Message <span className="text-brand-red">*</span>
        </label>
        <textarea
          id="message" name="message" required rows={5}
          value={fields.message} onChange={handleChange}
          placeholder="Describe your project or ask us anything…"
          className="form-input resize-none"
        />
      </div>

      {status === 'error' && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          Something went wrong. Please try again or call us directly.
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="btn-primary w-full py-4 text-base disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'submitting' ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  );
}
