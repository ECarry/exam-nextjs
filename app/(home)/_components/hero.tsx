"use client";

import ShimmerButton from "@/components/shimmer-button";
import Link from "next/link";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 pb-40">
      <div className="flex flex-col items-start xl:px-0 px-8 gap-8">
        <motion.div
          initial={{ opacity: 0.0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.4,
            ease: "easeInOut",
          }}
        >
          <span className="block text-xs md:text-sm text-indigo-500 font-medium">
            Better every day
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0.0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            ease: "easeInOut",
          }}
          className="flex flex-col gap-4"
        >
          <h1 className="text-3xl md:text-7xl font-bold text-left dark:text-zinc-100 text-zinc-700 max-w-4xl">
            Get Ready to Embrace Challenges!
          </h1>
          <h2 className="text-sm md:text-xl text-zinc-700 tracking-wide text-left max-w-2xl antialiased">
            Explore our vast collection of quizzes and simulated exams, designed
            to help you conquer challenges and excel in your academic journey.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0.0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: "easeInOut",
          }}
        >
          <Link href={"/main"}>
            <ShimmerButton label="Ready to Challenge" />
          </Link>
        </motion.div>
      </div>
      <div></div>
    </div>
  );
};

export default Hero;