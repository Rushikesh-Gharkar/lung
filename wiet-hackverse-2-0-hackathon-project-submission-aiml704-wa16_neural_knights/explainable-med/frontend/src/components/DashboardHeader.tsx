export interface DashboardHeaderProps {
  isAuthenticated: boolean;
  isAuthPage?: boolean;
  userName?: string | null;
  onSignin?: () => void;
  onSignup?: () => void;
  onLogout?: () => void;
}

import {
  Activity,
  LogIn,
  UserPlus,
  LogOut,
  User as UserIcon,
  Lightbulb,
} from "lucide-react";

export function DashboardHeader({
  isAuthenticated,
  isAuthPage,
  userName,
  onSignin,
  onSignup,
  onLogout,
}: DashboardHeaderProps) {
  return (
    <header className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between shadow-sm sticky top-0 z-50">
      <div className="flex items-center gap-8">
        {/* LOGO WITH GRADIENT */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md">
            <Activity className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 tracking-tight leading-none">
              MediSense
            </h1>
            <p className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold mt-0.5">
              XAI Diagnostic Dashboard
            </p>
          </div>
        </div>

        {/* NEW BULB HINT NAV ITEM */}
        {!isAuthenticated && !isAuthPage && (
          <a
            href="#how-it-works"
            className="hidden md:flex items-center gap-1.5 text-sm font-bold text-slate-400 hover:text-blue-600 transition-colors"
          >
            <Lightbulb className="w-4 h-4" />
            How MediSense Works
          </a>
        )}
      </div>

      <div className="flex items-center gap-3">
        {!isAuthenticated ? (
          !isAuthPage && (
            <>
              <button
                onClick={onSignin}
                className="text-sm font-bold text-slate-600 hover:text-blue-600 px-4 py-2 transition-colors flex items-center gap-2"
              >
                <LogIn className="w-4 h-4" />
                Sign In
              </button>
              {/* GRADIENT SIGN UP BUTTON */}
              <button
                onClick={onSignup}
                className="text-sm font-bold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-5 py-2 rounded-xl transition-all shadow-lg shadow-blue-600/20 flex items-center gap-2 active:scale-95"
              >
                <UserPlus className="w-4 h-4" />
                Sign Up
              </button>
            </>
          )
        ) : (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-xl">
              <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                <UserIcon className="w-3.5 h-3.5 text-blue-600" />
              </div>
              <span className="text-xs font-bold text-slate-700">
                {userName || "Medical Professional"}
              </span>
            </div>
            <button
              onClick={onLogout}
              className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
              title="Sign Out"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
