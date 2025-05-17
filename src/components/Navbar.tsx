"use client";

import Link from "next/link";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";
import { useUser } from "@clerk/nextjs"; // client-side hook
import { useEffect } from "react";
import { syncUser } from "@/actions/user.action";
import { motion } from "framer-motion";

function Navbar() {
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      syncUser(); // POST, make sure this is safe to call on client
    }
  }, [user]);

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 80, damping: 15 }}
      className="sticky top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Artically logo on the left */}
          <motion.div
            whileHover={{
              scale: 1.08,
              boxShadow: "0 4px 24px 0 rgba(128,0,255,0.15)",
            }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Link
              href="/"
              className="text-xl font-bold font-mono tracking-wider bg-gradient-to-r from-purple-700 via-purple-400 to-fuchsia-500 bg-clip-text text-transparent transition-all duration-300 hover:scale-110 hover:drop-shadow-2xl"
              style={{
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Artically
            </Link>
          </motion.div>
          {/* Navbars on the right */}
          <div className="flex items-center gap-x-8">
            <motion.div whileHover={{ scale: 1.06, boxShadow: "0 2px 12px 0 rgba(128,0,255,0.10)" }}>
              <DesktopNavbar />
            </motion.div>
            <motion.div whileHover={{ scale: 1.06, boxShadow: "0 2px 12px 0 rgba(128,0,255,0.10)" }}>
              <MobileNavbar />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
export default Navbar;
