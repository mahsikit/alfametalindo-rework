"use client";

import Link from "next/link";
import { MoveLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-center px-4">
      <h1 className="text-9xl font-bold text-[#0B3D91] opacity-20 mb-4">404</h1>
      <h2 className="text-3xl font-bold text-slate-900 mb-4">Page Not Found</h2>
      <p className="text-slate-600 mb-8 max-w-md mx-auto">
        We couldn't find the page you were looking for. It might have been moved or doesn't exist.
      </p>
      <Link
        href="/en"
        className="inline-flex items-center gap-2 bg-[#F97316] hover:bg-orange-600 text-white px-6 py-3 rounded-md font-medium transition-colors"
      >
        <MoveLeft className="h-4 w-4" />
        Return to Homepage
      </Link>
    </div>
  );
}
