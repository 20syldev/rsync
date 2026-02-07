import { CodeBlock } from '../CodeBlock';
import { Badge } from '../Badge';
import { Lightbulb } from 'lucide-react';

export const InstallSection = () => {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                    Installation
                </h2>
                <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                    Rsync est préinstallé sur la plupart des distributions Linux et macOS. Voici
                    comment l'installer ou le mettre à jour.
                </p>
            </div>

            <div className="mt-6">
                <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 mb-2">
                    Debian / Ubuntu
                </h3>
                <CodeBlock
                    title="Terminal"
                    code={`# Installer rsync
sudo apt update
sudo apt install rsync

# Vérifier l'installation
rsync --version`}
                />

                <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 mb-2 mt-8">
                    RHEL / CentOS / Fedora / AlmaLinux
                </h3>
                <CodeBlock
                    title="Terminal"
                    code={`# Fedora / RHEL 9+
sudo dnf install rsync

# CentOS 7 / RHEL 7
sudo yum install rsync

# Vérifier l'installation
rsync --version`}
                />

                <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 mb-2 mt-8">
                    Arch Linux
                </h3>
                <CodeBlock title="Terminal" code={`sudo pacman -S rsync`} />

                <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 mb-2 mt-8">
                    macOS
                </h3>
                <CodeBlock
                    title="Terminal"
                    code={`# Rsync est préinstallé sur macOS mais souvent en version ancienne (2.6.x)
# Pour obtenir la dernière version (3.2+) :
brew install rsync

# Vérifier la version
rsync --version`}
                />

                <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 mb-2 mt-8">
                    Windows (WSL)
                </h3>
                <CodeBlock
                    title="Terminal"
                    code={`# Dans WSL (Windows Subsystem for Linux)
sudo apt install rsync

# Ou via Cygwin / MSYS2 sous Windows natif`}
                />
            </div>

            <div className="mt-8">
                <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 mb-4">
                    Versions et fonctionnalités
                </h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left border-collapse">
                        <thead>
                            <tr className="border-b border-zinc-200 dark:border-zinc-800">
                                <th className="py-3 px-4 font-semibold text-zinc-900 dark:text-zinc-100">
                                    Version
                                </th>
                                <th className="py-3 px-4 font-semibold text-zinc-900 dark:text-zinc-100">
                                    Nouveautés clés
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-zinc-600 dark:text-zinc-400">
                            <tr className="border-b border-zinc-100 dark:border-zinc-800/50">
                                <td className="py-3 px-4">
                                    <Badge variant="default">3.0.x</Badge>
                                </td>
                                <td className="py-3 px-4">
                                    Protocole incrémental, ACL et xattr support
                                </td>
                            </tr>
                            <tr className="border-b border-zinc-100 dark:border-zinc-800/50">
                                <td className="py-3 px-4">
                                    <Badge variant="default">3.1.x</Badge>
                                </td>
                                <td className="py-3 px-4">
                                    Transfert incrémental récursif,{' '}
                                    <code className="bg-zinc-100 dark:bg-zinc-800 px-1 rounded">
                                        --info
                                    </code>{' '}
                                    et{' '}
                                    <code className="bg-zinc-100 dark:bg-zinc-800 px-1 rounded">
                                        --debug
                                    </code>{' '}
                                    flags
                                </td>
                            </tr>
                            <tr className="border-b border-zinc-100 dark:border-zinc-800/50">
                                <td className="py-3 px-4">
                                    <Badge variant="accent">3.2.x</Badge>
                                </td>
                                <td className="py-3 px-4">
                                    Compression zstd et lz4 (
                                    <code className="bg-zinc-100 dark:bg-zinc-800 px-1 rounded">
                                        --compress-choice
                                    </code>
                                    ), checksum xxhash, améliorations de sécurité
                                </td>
                            </tr>
                            <tr>
                                <td className="py-3 px-4">
                                    <Badge variant="accent">3.3.x</Badge>
                                </td>
                                <td className="py-3 px-4">
                                    Optimisation des performances, correctifs de sécurité, support
                                    renforcé des liens
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="p-4 rounded-lg border border-blue-200 dark:border-blue-800/50 bg-blue-50 dark:bg-blue-900/10 mt-6">
                <p className="text-sm text-blue-800 dark:text-blue-300">
                    <strong>
                        <Lightbulb size={16} className="inline mr-1" /> Conseil :
                    </strong>{' '}
                    Vérifiez votre version avec{' '}
                    <code className="bg-blue-100 dark:bg-blue-800/30 px-1 rounded">
                        rsync --version
                    </code>
                    . Pour profiter de la compression zstd et des checksums xxhash, vous avez besoin
                    de rsync 3.2.3 ou supérieur sur les <strong>deux</strong> machines (source et
                    destination).
                </p>
            </div>
        </div>
    );
};
