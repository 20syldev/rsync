import { ReactNode } from 'react';

interface BadgeProps {
    children: ReactNode;
    variant?: 'default' | 'outline' | 'secondary' | 'accent';
}

/**
 * Composant de Badge style Shadcn
 */
export const Badge = ({ children, variant = 'default' }: BadgeProps) => {
    const variants = {
        default: 'bg-zinc-900 text-zinc-50 dark:bg-zinc-50 dark:text-zinc-900',
        outline: 'border border-zinc-200 text-zinc-950 dark:border-zinc-800 dark:text-zinc-50',
        secondary: 'bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50',
        accent: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400',
    };

    return (
        <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:ring-offset-2 ${variants[variant]}`}
        >
            {children}
        </span>
    );
};
