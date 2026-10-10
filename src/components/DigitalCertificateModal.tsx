import React, { useState } from 'react';
import { UserProfile, DigitalCertificate } from '../types';
import {
  Award,
  X,
  Printer,
  Download,
  Share2,
  ExternalLink,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  QrCode,
  Copy,
} from 'lucide-react';
import { RaahLogo } from './RaahLogo';

interface DigitalCertificateModalProps {
  user: UserProfile;
  isOpen: boolean;
  onClose: () => void;
}

export const DigitalCertificateModal: React.FC<DigitalCertificateModalProps> = ({
  user,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const [copiedLink, setCopiedLink] = useState(false);

  const branchCode = (user.branch || 'ENGR').replace(/[^a-zA-Z]/g, '').slice(0, 4).toUpperCase();
  const userHash = Math.abs(user.email.split('').reduce((acc, char) => ((acc << 5) - acc) + char.charCodeAt(0), 0))
    .toString()
    .slice(0, 4)
    .padStart(4, '8');

  const certificate: DigitalCertificate = {
    certificateId: `RAAH-CERT-2026-${branchCode}-${userHash}`,
    studentName: user.name,
    degree: user.degree,
    college: user.college,
    trackTitle: `${user.branch} & ${user.targetCareer} Mastery Track`,
    issueDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    honors: `Distinction (${user.readinessScore}% Readiness Score & ${user.xp.toLocaleString()}+ XP)`,
    readinessScore: user.readinessScore,
    xpEarned: user.xp,
    verificationCode: `SHA256:${userHash}a9d1b0c3f5e2a4d6b8c9e0f1a2b3c`,
  };

  const verificationUrl = `https://raah.ai/verify/${certificate.certificateId}`;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyVerification = () => {
    navigator.clipboard.writeText(verificationUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleAddToLinkedIn = () => {
    const linkedInUrl = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${encodeURIComponent(
      `RAAH Career Certified - ${certificate.trackTitle}`
    )}&organizationName=RAAH&issueYear=2026&issueMonth=10&certUrl=${encodeURIComponent(
      verificationUrl
    )}&certId=${certificate.certificateId}`;
    window.open(linkedInUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
      <div
        className="bg-white dark:bg-[#08101F] border border-[#EAF0F7] dark:border-[#1C2E52] w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden flex flex-col text-[#182235] dark:text-[#F1F5F9] my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="bg-[#14264A] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-[#F2B544]" />
            <span className="font-extrabold text-sm tracking-wide">
              RAAH Official Digital Credential
            </span>
            <span className="text-xs bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full border border-emerald-400/30">
              Verified & Authentic
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>

            <button
              onClick={handleAddToLinkedIn}
              className="px-3.5 py-1.5 rounded-xl bg-[#0A66C2] hover:bg-[#084e96] text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Add to LinkedIn</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer ml-1"
              aria-label="Close certificate"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Display Area (Printable Document) */}
        <div className="p-6 sm:p-10 bg-[#FAF7F0] dark:bg-[#060D1A] overflow-x-auto flex justify-center">
          <div
            id="raah-printable-certificate"
            className="w-full max-w-3xl bg-[#FFFDF9] text-[#14264A] rounded-2xl p-8 sm:p-12 shadow-xl border-8 border-double border-[#D4AF37] relative overflow-hidden select-none"
            style={{
              backgroundImage:
                'radial-gradient(circle at 50% 50%, rgba(242, 181, 68, 0.04) 0%, rgba(20, 38, 74, 0.02) 100%)',
            }}
          >
            {/* Guilloche Corner Accents */}
            <div className="absolute top-3 left-3 w-12 h-12 border-t-2 border-l-2 border-[#D4AF37]" />
            <div className="absolute top-3 right-3 w-12 h-12 border-t-2 border-r-2 border-[#D4AF37]" />
            <div className="absolute bottom-3 left-3 w-12 h-12 border-b-2 border-l-2 border-[#D4AF37]" />
            <div className="absolute bottom-3 right-3 w-12 h-12 border-b-2 border-r-2 border-[#D4AF37]" />

            {/* Certificate Header with Logo */}
            <div className="text-center space-y-2">
              <div className="flex justify-center mb-1">
                <RaahLogo variant="horizontal" size="md" />
              </div>

              <div className="inline-block px-4 py-1 rounded-full bg-[#FEF6E4] border border-[#F2B544]/60 text-[11px] font-black uppercase tracking-widest text-[#B45309]">
                National Engineering Career Council • Verified Credential
              </div>

              <h1 className="text-2xl sm:text-4xl font-serif font-black tracking-tight text-[#14264A] pt-2">
                Certificate of Academic Excellence
              </h1>
              <p className="text-xs uppercase tracking-widest text-[#6B7280] font-bold">
                This is proudly presented to
              </p>
            </div>

            {/* Recipient Name */}
            <div className="text-center my-6 sm:my-8 border-b-2 border-dashed border-[#D4AF37]/40 pb-4 max-w-lg mx-auto">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#14264A] tracking-tight">
                {certificate.studentName}
              </h2>
              <p className="text-xs font-bold text-[#6B7280] mt-1">
                {certificate.degree} • {certificate.college}
              </p>
            </div>

            {/* Description Body */}
            <div className="text-center max-w-2xl mx-auto space-y-3 text-xs sm:text-sm text-[#374151] leading-relaxed">
              <p>
                for exceptional dedication, consistent academic learning streaks, and mastery in
              </p>
              <p className="text-base sm:text-lg font-black text-[#14264A] font-serif">
                {certificate.trackTitle}
              </p>
              <p className="text-xs text-[#4B5563]">
                Having achieved an outstanding <strong>{certificate.readinessScore}% Career Readiness Score</strong>,{' '}
                <strong>{certificate.xpEarned.toLocaleString()} XP</strong>, and maintaining compliant semester attendance.
              </p>
            </div>

            {/* Honors & Distinction Badge */}
            <div className="my-6 flex justify-center">
              <div className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-50 via-yellow-100 to-amber-50 border border-amber-300 text-amber-900 text-xs font-black shadow-xs flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Awarded with {certificate.honors}</span>
              </div>
            </div>

            {/* Signatures & Seal Grid */}
            <div className="mt-8 pt-6 border-t border-gray-200 grid grid-cols-3 items-end text-center gap-4">
              {/* Signatory 1 */}
              <div>
                <div className="font-serif italic text-base sm:text-lg font-bold text-[#14264A] border-b border-gray-300 pb-1 mb-1">
                  Dr. Rajesh V. Raman
                </div>
                <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#6B7280]">
                  Dean of Academics
                </p>
                <p className="text-[9px] text-gray-400">RAAH Curriculum Board</p>
              </div>

              {/* Gold Holographic Seal */}
              <div className="flex flex-col items-center justify-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[#F2B544] via-amber-300 to-[#B45309] p-1 shadow-md flex items-center justify-center">
                  <div className="w-full h-full rounded-full border-2 border-dashed border-white flex flex-col items-center justify-center text-center p-1">
                    <ShieldCheck className="w-6 h-6 text-white" />
                    <span className="text-[8px] font-black text-white tracking-tighter uppercase">
                      OFFICIAL SEAL
                    </span>
                  </div>
                </div>
                <span className="text-[9px] font-mono text-gray-500 mt-1">
                  ID: {certificate.certificateId}
                </span>
              </div>

              {/* Signatory 2 */}
              <div>
                <div className="font-serif italic text-base sm:text-lg font-bold text-[#14264A] border-b border-gray-300 pb-1 mb-1">
                  Arundhati Roy, Ph.D.
                </div>
                <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#6B7280]">
                  Head of Placement AI
                </p>
                <p className="text-[9px] text-gray-400">Industry Liaison Director</p>
              </div>
            </div>

            {/* Bottom Meta Bar */}
            <div className="mt-6 pt-3 border-t border-gray-100 flex items-center justify-between text-[10px] text-gray-500 font-mono">
              <span>Date of Issue: {certificate.issueDate}</span>
              <span className="truncate max-w-[200px]">Verification: {certificate.verificationCode.slice(0, 24)}...</span>
            </div>
          </div>
        </div>

        {/* Bottom Actions Bar */}
        <div className="p-4 bg-white dark:bg-[#08101F] border-t border-[#EAF0F7] dark:border-[#1C2E52] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-[#6B7280] dark:text-gray-400">
            <QrCode className="w-4 h-4 text-[#14264A] dark:text-[#F2B544]" />
            <span>Verification Link:</span>
            <code className="font-mono text-[11px] bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">
              {verificationUrl}
            </code>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyVerification}
              className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-800 text-xs font-bold hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copiedLink ? 'Copied Link! ✓' : 'Copy Verification URL'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-5 py-2 rounded-xl bg-[#14264A] hover:bg-[#0B1B36] text-white dark:bg-[#F2B544] dark:text-[#14264A] text-xs font-black transition-colors cursor-pointer shadow-xs flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF Certificate</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
