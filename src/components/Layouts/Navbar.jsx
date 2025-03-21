import React from "react";
import { useAtom } from "jotai";
import { globalState } from "../../jotai/globalState";
import { User, LogOut, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { useTheme } from "../theme-provider";
import { Loader2, Moon, Sun } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

function Navbar() {
  const [user, setUser] = useAtom(globalState);
  const { setTheme } = useTheme();

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-backdrop-blur:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="font-bold text-xl md:text-2xl">WACspace</span>
        </div>

        {/* Right side items container */}
        <div className="flex items-center gap-2">
          {/* Mobile Menu */}
          <div className="md:hidden mr-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64">
                <div className="flex flex-col space-y-4 pt-6">
                  {user ? (
                    <>
                      <div className="flex flex-col items-center p-4">
                        <Avatar className="h-16 w-16 mb-2">
                          {user.picture ? (
                            <AvatarImage src={user.picture} alt={user.name} />
                          ) : (
                            <AvatarFallback>
                              <User className="h-8 w-8" />
                            </AvatarFallback>
                          )}
                        </Avatar>
                        <h3 className="font-medium text-lg">{user.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                      <Button
                        variant="destructive"
                        onClick={handleLogout}
                        className="flex items-center gap-2"
                      >
                        <LogOut className="h-4 w-4" />
                        Logout
                      </Button>
                    </>
                  ) : (
                    <div className="flex items-center justify-center p-4">
                      <p className="text-muted-foreground">No user logged in</p>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop User Menu */}
          <div className="hidden md:flex items-center">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2 p-1 px-2 h-auto"
                  >
                    <Avatar className="h-8 w-8">
                      {user.picture ? (
                        <AvatarImage src={user.picture} alt={user.name} />
                      ) : (
                        <AvatarFallback>
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <span className="font-medium">{user.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="px-2 py-1.5">
                    <p className="text-sm text-muted-foreground break-words">
                      {user.email}
                    </p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-destructive focus:text-destructive cursor-pointer"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="outline" className="mr-2">
                Sign In
              </Button>
            )}
          </div>

          {/* Theme Selector - Always visible on both mobile and desktop */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="ml-2">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => setTheme("light")}
                className="cursor-pointer"
              >
                Light
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setTheme("dark")}
                className="cursor-pointer"
              >
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setTheme("system")}
                className="cursor-pointer"
              >
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
