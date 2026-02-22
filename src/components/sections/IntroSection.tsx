import { Badge } from '../Badge';
import { CodeBlock } from '../CodeBlock';
import { Zap, FolderSync, Shield, ArrowRightLeft, Lightbulb } from 'lucide-react';

export const IntroSection = () => {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <Badge variant="accent">v3.2+</Badge>
                <h1 className="mt-2 text-4xl font-extrabold tracking-tight lg:text-5xl text-zinc-900 dark:text-zinc-50">
                    Guide Rsync
                </h1>
                <p className="mt-4 text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Le guide complet de <strong>rsync</strong>, l'outil de référence pour la
                    synchronisation rapide et incrémentale de fichiers sous Linux, macOS et Windows
                    (WSL).
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                <div className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 shadow-sm">
                    <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4">
                        <Zap size={20} />
                    </div>
                    <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                        Algorithme Delta
                    </h3>
                    <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                        Ne transfère que les différences entre source et destination, économisant
                        bande passante et temps de transfert.
                    </p>
                </div>
                <div className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 shadow-sm">
                    <div className="h-10 w-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-4">
                        <FolderSync size={20} />
                    </div>
                    <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                        Polyvalent
                    </h3>
                    <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                        Fonctionne en local, via SSH, ou en mode daemon. Idéal pour les sauvegardes,
                        déploiements et migrations.
                    </p>
                </div>
                <div className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 shadow-sm">
                    <div className="h-10 w-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 mb-4">
                        <Shield size={20} />
                    </div>
                    <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                        Préservation
                    </h3>
                    <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                        Conserve permissions, timestamps, liens symboliques, propriétaires et
                        groupes grâce au mode archive (<code>-a</code>).
                    </p>
                </div>
                <div className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 shadow-sm">
                    <div className="h-10 w-10 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400 mb-4">
                        <ArrowRightLeft size={20} />
                    </div>
                    <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                        Reprise de transfert
                    </h3>
                    <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                        Reprend les transferts interrompus sans tout recommencer grâce à l'option{' '}
                        <code>--partial</code>.
                    </p>
                </div>
            </div>

            <div className="prose dark:prose-invert max-w-none">
                <h3>Pourquoi rsync ?</h3>
                <p>
                    Rsync est l'outil standard de synchronisation de fichiers sous Unix/Linux depuis
                    plus de 25 ans. Il surpasse <code>cp</code> et <code>scp</code> dans de nombreux
                    scénarios :
                </p>
                <ul className="list-disc pt-3 pl-6 space-y-2 text-zinc-600 dark:text-zinc-400 marker:text-zinc-400">
                    <li>
                        <strong>Économie de bande passante</strong> — L'algorithme delta ne
                        transfère que les blocs modifiés, pas les fichiers entiers.
                    </li>
                    <li>
                        <strong>Reprise automatique</strong> — Un transfert interrompu reprend où il
                        s'est arrêté avec <code>--partial</code> ou <code>-P</code>.
                    </li>
                    <li>
                        <strong>Transport sécurisé</strong> — SSH est le transport par défaut,
                        aucune configuration supplémentaire nécessaire.
                    </li>
                    <li>
                        <strong>Dry-run</strong> — Testez vos commandes sans risque avec
                        <code> -n</code> avant de les exécuter.
                    </li>
                    <li>
                        <strong>Sauvegardes incrémentales</strong> — Créez des snapshots quotidiens
                        avec <code>--link-dest</code> sans dupliquer l'espace disque.
                    </li>
                    <li>
                        <strong>Filtrage puissant</strong> — Excluez ou incluez des fichiers par
                        pattern avec <code>--exclude</code> et <code>--include</code>.
                    </li>
                </ul>
            </div>

            <div className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/30">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-3">
                    Syntaxe générale
                </h3>
                <code className="bg-zinc-100 dark:bg-zinc-800 px-4 py-3 rounded-lg text-sm block font-mono text-zinc-800 dark:text-zinc-200">
                    rsync [OPTIONS] SOURCE... DESTINATION
                </code>
                <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
                    La source et la destination peuvent être des chemins locaux ou distants (
                    <code>user@host:chemin</code>). Consultez les sections suivantes pour des
                    exemples détaillés.
                </p>
            </div>

            {/* Première commande */}
            <div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-3">
                    Votre première commande rsync
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">
                    Voici un exemple complet avec ce que rsync affiche réellement dans le terminal :
                </p>
                <CodeBlock
                    title="Terminal"
                    code={`rsync -avh ~/Documents/ /media/disque-externe/Documents/`}
                />
                <CodeBlock
                    title="Sortie terminal"
                    code={`sending incremental file list
rapport-Q4.pdf
factures/
factures/2026-01.pdf
factures/2026-02.pdf
photos/
photos/anniversaire.jpg

sent 47,23M bytes  received 1,12K bytes  9,45M bytes/sec
total size is 47,23M  speedup is 1,00`}
                />
                <ul className="mt-3 space-y-2 text-sm text-zinc-600 dark:text-zinc-400 list-disc pl-5">
                    <li>
                        <code className="bg-zinc-100 dark:bg-zinc-800 px-1 rounded">
                            sending incremental file list
                        </code>{' '}
                        — rsync liste les fichiers à transférer en temps réel ("incremental" signifie
                        qu'il construit la liste pendant le transfert, pas avant).
                    </li>
                    <li>
                        Les lignes de fichiers — chaque élément transféré est affiché. Les dossiers
                        se terminent par{' '}
                        <code className="bg-zinc-100 dark:bg-zinc-800 px-1 rounded">/</code>.
                    </li>
                    <li>
                        <code className="bg-zinc-100 dark:bg-zinc-800 px-1 rounded">
                            speedup is 1,00
                        </code>{' '}
                        — lors d'une première copie, tous les fichiers sont transférés. Lors des
                        synchros suivantes, ce chiffre sera bien supérieur à 1 (ex: 45 signifie que
                        rsync n'a transféré que 1/45e de la taille totale).
                    </li>
                </ul>
                <div className="p-4 rounded-lg border border-blue-200 dark:border-blue-800/50 bg-blue-50 dark:bg-blue-900/10 mt-4">
                    <p className="text-sm text-blue-800 dark:text-blue-300">
                        <strong>
                            <Lightbulb size={16} className="inline mr-1" /> Bonne pratique :
                        </strong>{' '}
                        Ajoutez{' '}
                        <code className="bg-blue-100 dark:bg-blue-800/30 px-1 rounded">-n</code>{' '}
                        pour simuler sans rien modifier :{' '}
                        <code className="bg-blue-100 dark:bg-blue-800/30 px-1 rounded">
                            rsync -avhn ~/Documents/ /media/disque-externe/Documents/
                        </code>
                    </p>
                </div>
            </div>
        </div>
    );
};
