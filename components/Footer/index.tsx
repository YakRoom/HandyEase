"use client";

import { FC, memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Facebook from "@/public/images/facebook.svg";
import Twitter from "@/public/images/twitter.svg";
import Linkedin from "@/public/images/linkedin.svg";

const noFooterRoutes = [
  "/edit-profile",
  "/auth/login",
  "/auth/sign-up",
  "/auth/otp-verification",
  "/auth/add-name",
  "/auth/policy",
  "/auth/provider-details",
  "/auth/sign-up/credentials",
];

interface FooterLink {
  href: string;
  label: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

const footerSections: FooterSection[] = [
  {
    title: "Resources",
    links: [
      { href: "/help", label: "Visit Help Center" },
      { href: "/mission", label: "Learn more about company's mission" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/offerings", label: "Our offerings" },
      { href: "/newsroom", label: "Newsroom" },
      { href: "/blog", label: "Blog" },
      { href: "/faq", label: "Questions" },
    ],
  },
  {
    title: "Product",
    links: [
      { href: "/customer", label: "Customer" },
      { href: "/handyman", label: "Handyman" },
      { href: "/cleaner", label: "Cleaner" },
      { href: "/unicorn", label: "Unicorn" },
    ],
  },
];

const socialLinks = [
  { icon: Facebook, label: "Facebook", href: "https://facebook.com" },
  { icon: Twitter, label: "Twitter", href: "https://twitter.com" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
];

const Footer: FC = () => {
  const pathname = usePathname();

  if (noFooterRoutes.includes(pathname)) {
    return null;
  }

  return (
    <footer className="bg-neutral-900 text-neutral-200" aria-label="Site footer">
      <div className="max-w-screen-xl mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-white">Handymate</h2>
            <p className="text-sm text-neutral-400 max-w-sm">
              Your trusted platform for finding skilled handymen and service providers.
            </p>
          </div>

          {footerSections.map((section) => (
            <div key={section.title} className="space-y-4">
              <h3 className="text-lg font-semibold text-white">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-neutral-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-neutral-800">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-white transition-colors"
                  aria-label={`Follow us on ${social.label}`}
                >
                  <Image
                    src={social.icon}
                    alt={social.label}
                    height={24}
                    width={24}
                    className="opacity-80 hover:opacity-100 transition-opacity"
                  />
                </Link>
              ))}
            </div>

            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 text-sm text-neutral-400">
              <span> {new Date().getFullYear()} Handymate</span>
              <div className="flex items-center gap-4">
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy
                </Link>
                <Link href="/accessibility" className="hover:text-white transition-colors">
                  Accessibility
                </Link>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default memo(Footer);
