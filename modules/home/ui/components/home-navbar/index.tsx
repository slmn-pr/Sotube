import { SidebarTrigger } from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";
import SearchInput from "./search-input";
import AuthButton from "../../../auth/ui/components/auth-button";

export default function HomeNavbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 h-16 flex items-center px-2 pr-5 z-50 bg-white">
      <div className="flex items-center gap-4 w-full">
        {/* Menu and logo */}
        <div className="flex items-center shrink-0">
          <SidebarTrigger />
          <Link href="/">
            <div className="p-4 flex items-center gap-1">
              <Image src="/logo.svg" width={32} height={32} alt="Logo" />
              <p className="text-xl font-semibold tracking-tight">Sotube</p>
            </div>
          </Link>
        </div>

        {/* Search bar */}
        <div className="flex-x flex justify-center max-w-[720px] mx-auto">
            <SearchInput />
        </div>
        <div className="flex shrink-0 items-center gap-4">
            <AuthButton />
        </div>
      </div>
    </nav>
  );
}
