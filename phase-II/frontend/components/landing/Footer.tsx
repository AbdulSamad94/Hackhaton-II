import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-gray-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <span className="text-lg font-bold text-slate-900">TodoFlow</span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed">
              Making the world more productive, one task at a time. Designed by
              the TodoFlow Team.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <Link href="#" className="hover:text-blue-600">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-600">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-600">
                  API
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <Link href="#" className="hover:text-blue-600">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-600">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-600">
                  Careers
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <Link href="#" className="hover:text-blue-600">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-600">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">
            © 2026 TodoFlow Inc. All rights reserved.
          </p>
          <div className="flex gap-4">
            {/* Social Icons */}
            <div className="w-5 h-5 bg-slate-200 rounded-full" />
            <div className="w-5 h-5 bg-slate-200 rounded-full" />
            <div className="w-5 h-5 bg-slate-200 rounded-full" />
          </div>
        </div>
      </div>
    </footer>
  );
}
