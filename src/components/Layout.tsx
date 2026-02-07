import { useState, useEffect, ReactNode } from 'react';
import { Menu, X, Moon, Sun, ChevronRight } from 'lucide-react';

interface NavigationItem {
    id: string;
    title: string;
    icon: ReactNode;
}

interface LayoutProps {
    navigation: NavigationItem[];
    activeSection: string;
    onSectionChange: (sectionId: string) => void;
    children: ReactNode;
}

export const Layout = ({ navigation, activeSection, onSectionChange, children }: LayoutProps) => {
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Gestion du thème
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    const toggleTheme = () => setIsDarkMode(!isDarkMode);

    const activeItem = navigation.find(item => item.id === activeSection);

    return (
        <div
            className={`flex h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 transition-colors duration-300 font-sans`}
        >
            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-zinc-50 dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800 transform transition-transform duration-200 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}
            >
                <div className="h-full flex flex-col">
                    <div className="h-16 flex items-center px-6 border-b border-zinc-200 dark:border-zinc-800">
                        <span className="text-lg font-bold flex items-center gap-2">
                            <div className="w-6 h-6 bg-zinc-900 dark:bg-white rounded-md flex items-center justify-center">
                                <span className="text-white dark:text-zinc-900 text-xs font-bold">
                                    R
                                </span>
                            </div>
                            Guide
                            <span className="text-zinc-400 text-sm font-normal mt-1">Rsync</span>
                        </span>
                        <button className="ml-auto lg:hidden" onClick={() => setSidebarOpen(false)}>
                            <X size={20} />
                        </button>
                    </div>

                    <nav className="flex-1 overflow-y-auto py-2 px-3 space-y-1">
                        {navigation.map(item => (
                            <button
                                key={item.id}
                                onClick={() => {
                                    onSectionChange(item.id);
                                    setSidebarOpen(false);
                                }}
                                className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                                    activeSection === item.id
                                        ? 'bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-white'
                                        : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-white'
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    {item.icon}
                                    {item.title}
                                </div>
                                {activeSection === item.id && (
                                    <ChevronRight size={14} className="opacity-50" />
                                )}
                            </button>
                        ))}
                    </nav>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="h-16 flex items-center justify-between px-6 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
                    <div className="flex items-center">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="p-2 -ml-2 lg:hidden"
                        >
                            <Menu size={20} />
                        </button>
                        <span className="font-semibold ml-2 lg:ml-0">
                            {activeItem ? activeItem.title : 'Guide Rsync'}
                        </span>
                    </div>
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-500 transition-colors"
                        aria-label="Changer de thème"
                    >
                        {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                    </button>
                </header>

                {/* Scrollable Content Area */}
                <div className="flex-1 overflow-y-auto">
                    <div className="max-w-7xl mx-auto px-6 py-12 lg:px-12">
                        {children}

                        <footer className="mt-20 pt-8 border-t border-zinc-200 dark:border-zinc-800 flex justify-between text-sm text-zinc-500">
                            <p>2026 Rsync Documentation</p>
                            <div className="flex gap-4">
                                <a
                                    href="https://github.com/RsyncProject/rsync"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-zinc-900 dark:hover:text-zinc-200 cursor-pointer"
                                >
                                    GitHub
                                </a>
                                <a
                                    href="https://rsync.samba.org"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-zinc-900 dark:hover:text-zinc-200 cursor-pointer"
                                >
                                    rsync.samba.org
                                </a>
                            </div>
                        </footer>
                    </div>
                </div>
            </main>
        </div>
    );
};
