import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import cert1 from '../../Assests/Certificates/Security+.png';
import cert2 from '../../Assests/Certificates/AWS Certified Solutions Architect - Associate.png';
import cert3 from '../../Assests/Certificates/Network Associate.png';
import cert4 from '../../Assests/Certificates/CySA+.png';
// TODO: Add your CISSP and AZ-500 certificate images to src/Assests/Certificates/
// then uncomment the two lines below:
// import cert5 from '../../Assests/Certificates/CISSP.png';
// import cert6 from '../../Assests/Certificates/AZ-500.png';

/* ─────────────────────────────────────────────────────────────
 *  CERTIFICATE DATA
 *    – add / remove / reorder freely
 * ───────────────────────────────────────────────────────────── */
interface Certificate {
  title: string;
  issuer: string;
  date: string;
  image: string;
}

const certificates: Certificate[] = [
  {
    // TODO: Once you add CISSP.png to src/Assests/Certificates/, replace cert1 below with cert5
    // and move this entry to the top — CISSP is your most prestigious cert
    title: 'CISSP – Certified Information Systems Security Professional',
    issuer: 'ISC²',
    date: 'Add your date',
    image: cert1   // <-- replace with cert5 after adding the image
  },
  {
    // TODO: Once you add AZ-500.png to src/Assests/Certificates/, replace cert1 below with cert6
    title: 'Microsoft Azure Security Engineer Associate (AZ-500)',
    issuer: 'Microsoft',
    date: 'Add your date',
    image: cert1   // <-- replace with cert6 after adding the image
  },
  {
    title: 'CySA+ – Cybersecurity Analyst',
    issuer: 'CompTIA',
    date: 'May 2023',
    image: cert4
  },
  {
    title: 'AWS Certified Solutions Architect – Associate',
    issuer: 'Amazon Web Services',
    date: 'August 2022',
    image: cert2
  },
  {
    title: 'CCNA – Cisco Certified Network Associate',
    issuer: 'Cisco',
    date: 'July 2024',
    image: cert3
  },
  {
    title: 'Security+',
    issuer: 'CompTIA',
    date: 'August 2022',
    image: cert1
  },
];

/* ════════════════════════════════════════════════════════════
 *                    3-D BACKGROUND ORBIT
 * ════════════════════════════════════════════════════════════ */
export const CertificatesSection3D: React.FC = () => {
  const { theme } = useTheme();
  const groupRef = useRef<THREE.Group>(null!);
  const plates = useRef<THREE.Mesh[]>([]);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.1;
    }

    plates.current.forEach((plate, i) => {
      const angle = (i / certificates.length) * Math.PI * 2;
      const radius = 3.5;
      plate.position.x = Math.cos(angle + clock.getElapsedTime() * 0.1) * radius;
      plate.position.z = Math.sin(angle + clock.getElapsedTime() * 0.1) * radius;
      plate.lookAt(0, 0, 0);
    });
  });

  return (
    <group ref={groupRef}>
      {certificates.map((cert, i) => (
        <mesh
          key={cert.title + i}
          ref={(el) => (plates.current[i] = el as THREE.Mesh)}
          position={[
            Math.cos((i / certificates.length) * Math.PI * 2) * 3.5,
            0,
            Math.sin((i / certificates.length) * Math.PI * 2) * 3.5
          ]}
        >
          <planeGeometry args={[2.2, 1.4]} />
          <meshStandardMaterial
            color={theme === 'dark' ? '#1e293b' : '#f1f5f9'}
            metalness={0.2}
            roughness={0.3}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
};

/* ════════════════════════════════════════════════════════════
 *                       LIGHTBOX (POPUP)
 * ════════════════════════════════════════════════════════════ */
const Lightbox: React.FC<{
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}> = ({ index, onClose, onPrev, onNext }) => {
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);
  const cert = certificates[index];

  // Focus management & body scroll lock
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const t = setTimeout(() => closeBtnRef.current?.focus(), 0);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', onKey);

    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      clearTimeout(t);
    };
  }, [onClose, onPrev, onNext]);

  const onBackdropClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onBackdropClick}
        role="dialog"
        aria-modal="true"
        aria-labelledby="certificate-title"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          ref={innerRef}
          className="relative w-full max-w-5xl rounded-2xl bg-white dark:bg-gray-900 shadow-2xl overflow-hidden"
          initial={{ scale: 0.98, opacity: 0, y: 8 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.98, opacity: 0, y: 8 }}
          transition={{ type: 'spring', stiffness: 260, damping: 24 }}
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-4 p-4 border-b border-gray-200 dark:border-gray-800">
            <div>
              <h3 id="certificate-title" className="text-xl font-semibold text-gray-900 dark:text-white">
                {cert.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{cert.issuer} · {cert.date}</p>
            </div>
            <button
              ref={closeBtnRef}
              onClick={onClose}
              className="inline-flex items-center justify-center rounded-full border border-gray-200 dark:border-gray-700 p-2 hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Image */}
          <div className="relative bg-gray-50 dark:bg-gray-800">
            <img
              src={cert.image}
              alt={cert.title}
              className="mx-auto max-h-[78vh] w-auto object-contain select-none"
              draggable={false}
            />

            {/* Prev / Next controls */}
            {certificates.length > 1 && (
              <>
                <button
                  onClick={onPrev}
                  className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 dark:bg-gray-900/90 shadow p-2 hover:bg-white dark:hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Previous"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={onNext}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 dark:bg-gray-900/90 shadow p-2 hover:bg-white dark:hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Next"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

/* ════════════════════════════════════════════════════════════
 *                    MAIN (TEXT) SECTION
 * ════════════════════════════════════════════════════════════ */
const CertificatesSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const open = (i: number) => setOpenIndex(i);
  const close = () => setOpenIndex(null);
  const prev = () => setOpenIndex((i) => (i === null ? i : (i - 1 + certificates.length) % certificates.length));
  const next = () => setOpenIndex((i) => (i === null ? i : (i + 1) % certificates.length));

  return (
    <section className="w-full flex justify-center items-start py-20">
      <motion.div
        className="max-w-5xl mx-auto z-20 p-8 rounded-xl bg-white dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-90 backdrop-blur-sm shadow-xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
          Certificates
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert, index) => (
            <motion.button
              key={cert.title + index}
              onClick={() => open(index)}
              className="text-left group rounded-xl overflow-hidden shadow-lg bg-gray-50 dark:bg-gray-700 transition-transform focus:outline-none focus:ring-2 focus:ring-blue-500"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03 }}
              type="button"
            >
              <div className="h-40 w-full overflow-hidden">
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  {cert.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">{cert.issuer}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{cert.date}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Lightbox popup */}
      {openIndex !== null && (
        <Lightbox index={openIndex} onClose={close} onPrev={prev} onNext={next} />)
      }
    </section>
  );
};

export default CertificatesSection;
