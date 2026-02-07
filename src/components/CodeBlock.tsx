import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CodeBlockProps {
    code: string;
    language?: string;
    title?: string;
}

/**
 * Composant utilitaire pour les blocs de code avec coloration syntaxique simulée
 * et bouton de copie.
 */
export const CodeBlock = ({ code, language = 'bash', title }: CodeBlockProps) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="my-6 rounded-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden bg-zinc-950 text-white shadow-sm">
            {title && (
                <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800 bg-zinc-900/50 text-xs text-zinc-400 font-mono">
                    <span>{title}</span>
                    <span>{language}</span>
                </div>
            )}
            <div className="relative group">
                <button
                    onClick={handleCopy}
                    className="absolute right-4 top-4 p-2 rounded-md bg-zinc-800/50 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-zinc-700 focus:opacity-100"
                    aria-label="Copier le code"
                >
                    {copied ? (
                        <Check size={14} className="text-emerald-400" />
                    ) : (
                        <Copy size={14} className="text-zinc-300" />
                    )}
                </button>
                <pre className="p-4 overflow-x-auto text-sm font-mono leading-relaxed">
                    <code>{code}</code>
                </pre>
            </div>
        </div>
    );
};
