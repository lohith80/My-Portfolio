import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Github, Linkedin, Mail } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

/* ─────────────────────────────────────────────────────────────
 *  Replace with your own Formspree ID
 *  Example:  const FORMSPREE_ENDPOINT = "https://formspree.io/f/xqkwyajb";
 * ───────────────────────────────────────────────────────────── */
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xjgpzzzj";

/* ════════════════════════════════════════════════════════════
 *  3D FLOATING FORM OUTLINE (unchanged)
 * ════════════════════════════════════════════════════════════ */
export const ContactSection3D = () => {
  const { theme } = useTheme();
  const formRef = useRef<THREE.Group>(null!);
  const formFields = useRef<THREE.Mesh[]>([]);

  useFrame(({ clock }) => {
    if (formRef.current) {
      formRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.2) * 0.1;
    }

    formFields.current.forEach((field, i) => {
      const t = clock.getElapsedTime();
      if (field) {
        field.position.y = Math.sin(t * 0.5 + i * 0.5) * 0.05;
        field.position.z = Math.sin(t * 0.3 + i * 0.5) * 0.05;
      }
    });
  });

  return (
    <group ref={formRef} position={[0, 0, 0]}>
      {/* Container */}
      <mesh position={[0, 0, -0.1]}>
        <boxGeometry args={[3, 2, 0.1]} />
        <meshStandardMaterial
          color={theme === "dark" ? "#1e293b" : "#f1f5f9"}
          metalness={0.2}
          roughness={0.3}
        />
      </mesh>

      {/* Floating field planes */}
      {[0, 1, 2].map((i) => (
        <mesh
          key={i}
          ref={(el) => (formFields.current[i] = el as THREE.Mesh)}
          position={[0, 0.5 - i * 0.5, 0]}
        >
          <planeGeometry args={[2.5, 0.3]} />
          <meshStandardMaterial
            color={theme === "dark" ? "#334155" : "#e2e8f0"}
            metalness={0.1}
            roughness={0.6}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
};

/* ════════════════════════════════════════════════════════════
 *                    MAIN CONTACT SECTION
 * ════════════════════════════════════════════════════════════ */
const ContactSection: React.FC = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  /* ───────────── Input handlers */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  /* ───────────── Form submit */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");
    setIsSubmitted(false);

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });

      if (res.ok) {
        setIsSubmitted(true);
        setFormState({ name: "", email: "", message: "" });

        // Auto-hide success state after 3 s
        setTimeout(() => setIsSubmitted(false), 3000);
      } else {
        const data: any = await res.json().catch(() => null);
        setSubmitError(
          data?.errors?.[0]?.message ||
            "Something went wrong. Please try again."
        );
      }
    } catch {
      setSubmitError("Network error – please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ───────────── Animations */
  const inputVariants = {
    initial: { opacity: 0, y: 10 },
    animate: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5 },
    }),
    hover: {
      scale: 1.02,
      boxShadow: "0px 3px 10px rgba(0,0,0,0.1)",
      transition: { duration: 0.2 },
    },
  };

  const buttonVariants = {
    initial: { opacity: 0, y: 10 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { delay: 0.4, duration: 0.5 },
    },
    hover: {
      scale: 1.05,
      boxShadow: "0px 5px 15px rgba(0,0,0,0.1)",
      transition: { duration: 0.2 },
    },
    tap: { scale: 0.95 },
    submitting: {
      scale: [1, 1.05, 1],
      transition: { duration: 0.8, repeat: Infinity },
    },
  };

  /* ───────────── JSX */
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
          Contact Me
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* ───────────── FORM */}
          <div>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                {/* Name */}
                <motion.div
                  variants={inputVariants}
                  initial="initial"
                  whileInView="animate"
                  whileHover="hover"
                  custom={0}
                  viewport={{ once: true }}
                >
                  <label
                    htmlFor="name"
                    className="block text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting || isSubmitted}
                    placeholder="Your Name"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </motion.div>

                {/* Email */}
                <motion.div
                  variants={inputVariants}
                  initial="initial"
                  whileInView="animate"
                  whileHover="hover"
                  custom={1}
                  viewport={{ once: true }}
                >
                  <label
                    htmlFor="email"
                    className="block text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting || isSubmitted}
                    placeholder="your.email@example.com"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </motion.div>

                {/* Message */}
                <motion.div
                  variants={inputVariants}
                  initial="initial"
                  whileInView="animate"
                  whileHover="hover"
                  custom={2}
                  viewport={{ once: true }}
                >
                  <label
                    htmlFor="message"
                    className="block text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting || isSubmitted}
                    rows={4}
                    placeholder="Your message..."
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </motion.div>

                {/* Error / success banner */}
                {submitError && (
                  <div className="p-3 rounded-lg bg-red-100 text-red-700 text-sm">
                    {submitError}
                  </div>
                )}
                {isSubmitted && (
                  <div className="p-3 rounded-lg bg-green-100 text-green-700 text-sm">
                    Thank you for your interest. You Message has been sent sucessfully!!
                  </div>
                )}

                {/* Submit button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  className={`w-full px-6 py-3 rounded-lg text-white font-medium transition-colors shadow-lg ${
                    isSubmitted
                      ? "bg-green-500 hover:bg-green-600"
                      : "bg-blue-500 hover:bg-blue-600"
                  } disabled:opacity-60`}
                  variants={buttonVariants}
                  initial="initial"
                  whileInView="animate"
                  whileHover={!isSubmitting && !isSubmitted ? "hover" : undefined}
                  whileTap={!isSubmitting && !isSubmitted ? "tap" : undefined}
                  animate={isSubmitting ? "submitting" : undefined}
                  viewport={{ once: true }}
                >
                  {isSubmitting
                    ? "Sending..."
                    : isSubmitted
                    ? "Message Sent!"
                    : "Send Message"}
                </motion.button>
              </div>
            </form>
          </div>

          {/* ───────────── CONTACT DETAILS / SOCIALS */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Get in Touch
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                I'm currently looking for new opportunities. Whether you have a
                question or just want to say hi, I'll get back to you as soon as
                possible!
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Connect With Me
              </h3>

              <div className="flex space-x-4">
                {[
                  {
                    href: "https://github.com/lohith80/",
                    label: "GitHub Profile",
                    icon: Github,
                  },
                  {
                    href: "https://www.linkedin.com/in/indu-lohith-narisetty/",
                    label: "LinkedIn Profile",
                    icon: Linkedin,
                  },
                  {
                    href: "mailto:lohithchowdary80@gmail.com",
                    label: "Email Contact",
                    icon: Mail,
                  },
                ].map(({ href, label, icon: Icon }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="p-3 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Icon className="w-6 h-6" />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default ContactSection;
