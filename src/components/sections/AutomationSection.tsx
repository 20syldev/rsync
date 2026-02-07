import { CodeBlock } from '../CodeBlock';
import { Lightbulb, Settings, FileText } from 'lucide-react';

export const AutomationSection = () => {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                    Automatisation
                </h2>
                <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                    Automatisez vos sauvegardes rsync avec cron, systemd, et des scripts de backup
                    professionnels.
                </p>
            </div>

            {/* Cron */}
            <div className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 shadow-sm">
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
                    ⏰ Planification avec cron
                </h3>
                <CodeBlock
                    title="Terminal"
                    code={`# Éditer la crontab
crontab -e`}
                />
                <CodeBlock
                    title="crontab"
                    code={`# Sauvegarde quotidienne à 2h du matin
0 2 * * * /usr/bin/rsync -avh --delete /home/user/data/ /backup/daily/ >> /var/log/rsync-daily.log 2>&1

# Sauvegarde hebdomadaire le dimanche à 3h
0 3 * * 0 /usr/bin/rsync -avh --delete /home/user/ /backup/weekly/ >> /var/log/rsync-weekly.log 2>&1

# Synchronisation toutes les 6 heures vers un serveur distant
0 */6 * * * /usr/bin/rsync -avhz -e "ssh -i /home/user/.ssh/id_rsync" /var/www/ user@backup.srv:/backup/www/ >> /var/log/rsync-www.log 2>&1`}
                />
                <div className="p-4 rounded-lg border border-blue-200 dark:border-blue-800/50 bg-blue-50 dark:bg-blue-900/10 mt-3">
                    <p className="text-sm text-blue-800 dark:text-blue-300">
                        <strong>
                            <Lightbulb size={16} className="inline mr-1" /> Conseil :
                        </strong>{' '}
                        Utilisez toujours le chemin complet vers rsync (
                        <code className="bg-blue-100 dark:bg-blue-800/30 px-1 rounded">
                            /usr/bin/rsync
                        </code>
                        ) dans les crontabs. Redirigez stdout et stderr vers un fichier de log pour
                        le diagnostic.
                    </p>
                </div>
            </div>

            {/* systemd timer */}
            <div className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 shadow-sm mt-6">
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
                    <Settings size={20} className="inline mr-2" /> Planification avec systemd timer
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                    Alternative moderne à cron avec journalisation intégrée, gestion des
                    dépendances, et rattrapage des exécutions manquées.
                </p>

                <h4 className="font-medium text-zinc-900 dark:text-zinc-100 mb-2">
                    Fichier service
                </h4>
                <CodeBlock
                    title="/etc/systemd/system/rsync-backup.service"
                    code={`[Unit]
Description=Sauvegarde rsync quotidienne
After=network-online.target
Wants=network-online.target

[Service]
Type=oneshot
User=root
ExecStart=/usr/bin/rsync -avh --delete \\
    --exclude-from=/etc/rsync-excludes.txt \\
    -e "ssh -i /root/.ssh/id_rsync" \\
    /home/ backupuser@backup.srv:/backup/homes/
# Notification en cas d'échec (optionnel)
ExecStartPost=/bin/bash -c 'if [ $EXIT_STATUS -ne 0 ]; then echo "Rsync backup failed" | mail -s "Backup Error" admin@example.com; fi'
StandardOutput=journal
StandardError=journal`}
                />

                <h4 className="font-medium text-zinc-900 dark:text-zinc-100 mb-2 mt-6">
                    Fichier timer
                </h4>
                <CodeBlock
                    title="/etc/systemd/system/rsync-backup.timer"
                    code={`[Unit]
Description=Timer pour sauvegarde rsync quotidienne

[Timer]
# Tous les jours à 2h du matin
OnCalendar=*-*-* 02:00:00
# Rattraper les exécutions manquées (machine éteinte)
Persistent=true
# Ajouter un délai aléatoire pour éviter les pics (0-30 min)
RandomizedDelaySec=1800

[Install]
WantedBy=timers.target`}
                />

                <h4 className="font-medium text-zinc-900 dark:text-zinc-100 mb-2 mt-6">
                    Activation et gestion
                </h4>
                <CodeBlock
                    title="Terminal"
                    code={`# Recharger la configuration systemd
sudo systemctl daemon-reload

# Activer et démarrer le timer
sudo systemctl enable --now rsync-backup.timer

# Vérifier l'état du timer
systemctl status rsync-backup.timer
systemctl list-timers | grep rsync

# Voir les logs
journalctl -u rsync-backup.service --since today

# Lancer manuellement (pour tester)
sudo systemctl start rsync-backup.service`}
                />
            </div>

            {/* Script de backup complet */}
            <div className="mt-6">
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
                    <FileText size={20} className="inline mr-2" /> Script de sauvegarde incrémentale
                    complet
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                    Ce script crée des sauvegardes incrémentales quotidiennes avec rotation
                    automatique. Grâce à{' '}
                    <code className="bg-zinc-100 dark:bg-zinc-800 px-1 rounded">--link-dest</code>,
                    chaque snapshot apparaît complet mais ne consomme que l'espace des fichiers
                    modifiés.
                </p>
                <CodeBlock
                    title="backup.sh"
                    code={`#!/bin/bash
set -euo pipefail

# ============================================================
# Configuration
# ============================================================
SOURCE="/home/"
BACKUP_BASE="/backup/snapshots"
EXCLUDE_FILE="/etc/rsync-excludes.txt"
LOG_FILE="/var/log/rsync-backup.log"
RETENTION_DAYS=30          # Nombre de jours de rétention
DATE=$(date +%F_%H-%M)     # 2026-02-07_02-00
SSH_KEY="/root/.ssh/id_rsync"

# ============================================================
# Fonctions
# ============================================================
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*" | tee -a "$LOG_FILE"
}

cleanup() {
    log "Nettoyage des sauvegardes de plus de $RETENTION_DAYS jours..."
    find "$BACKUP_BASE" -maxdepth 1 -type d -mtime +$RETENTION_DAYS -exec rm -rf {} + 2>/dev/null || true
    log "Nettoyage terminé."
}

# ============================================================
# Exécution
# ============================================================
log "=== Début de la sauvegarde ==="
log "Source : $SOURCE"
log "Destination : $BACKUP_BASE/$DATE"

# Créer le dossier de base si nécessaire
mkdir -p "$BACKUP_BASE"

# Trouver le snapshot le plus récent pour --link-dest
LATEST=$(find "$BACKUP_BASE" -maxdepth 1 -type d -not -name "$(basename $BACKUP_BASE)" | sort -r | head -1)

LINK_DEST_OPT=""
if [ -n "$LATEST" ] && [ -d "$LATEST" ]; then
    LINK_DEST_OPT="--link-dest=$LATEST"
    log "Link-dest : $LATEST"
else
    log "Pas de sauvegarde précédente trouvée (backup complet)"
fi

# Lancer rsync
rsync -avh --delete \\
    --exclude-from="$EXCLUDE_FILE" \\
    $LINK_DEST_OPT \\
    "$SOURCE" "$BACKUP_BASE/$DATE/" \\
    >> "$LOG_FILE" 2>&1

EXIT_CODE=$?

if [ $EXIT_CODE -eq 0 ]; then
    log "SUCCESS: Sauvegarde réussie : $BACKUP_BASE/$DATE"
elif [ $EXIT_CODE -eq 24 ]; then
    log "WARNING: Sauvegarde terminée avec des fichiers disparus (code 24 — normal)"
else
    log "ERROR: Erreur rsync (code $EXIT_CODE)"
    exit $EXIT_CODE
fi

# Rotation des anciennes sauvegardes
cleanup

log "=== Fin de la sauvegarde ==="`}
                />
                <CodeBlock
                    title="Terminal"
                    code={`# Rendre le script exécutable
chmod +x /usr/local/bin/backup.sh

# Tester manuellement
sudo /usr/local/bin/backup.sh

# Vérifier les snapshots créés
ls -la /backup/snapshots/
# 2026-02-05_02-00/
# 2026-02-06_02-00/
# 2026-02-07_02-00/

# Vérifier l'espace disque utilisé (grâce aux hardlinks)
du -sh /backup/snapshots/*/
# 15G   /backup/snapshots/2026-02-05_02-00/  ← backup complet
# 200M  /backup/snapshots/2026-02-06_02-00/  ← seulement les diffs
# 150M  /backup/snapshots/2026-02-07_02-00/  ← seulement les diffs`}
                />
            </div>

            {/* Fichier d'exclusion */}
            <div className="mt-6">
                <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 mb-2">
                    Fichier d'exclusion recommandé
                </h3>
                <CodeBlock
                    title="/etc/rsync-excludes.txt"
                    code={`# Fichiers temporaires et caches
*.tmp
*.swp
*~
.cache/
.thumbnails/

# Node.js / Python / Dev
node_modules/
__pycache__/
.venv/
.tox/
dist/
build/

# Système
/proc/
/sys/
/dev/
/run/
/tmp/
/mnt/
/media/
lost+found/

# Logs volumineux (sauvegardés séparément si nécessaire)
*.log

# Corbeille
.Trash-*/
.local/share/Trash/`}
                />
            </div>

            {/* Logrotate */}
            <div className="mt-6">
                <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 mb-2">
                    Rotation des logs rsync
                </h3>
                <CodeBlock
                    title="/etc/logrotate.d/rsync-backup"
                    code={`/var/log/rsync-backup.log {
    weekly
    rotate 12
    compress
    delaycompress
    missingok
    notifempty
    create 640 root root
}`}
                />
            </div>

            <div className="p-4 rounded-lg border border-blue-200 dark:border-blue-800/50 bg-blue-50 dark:bg-blue-900/10 mt-6">
                <p className="text-sm text-blue-800 dark:text-blue-300">
                    <strong>
                        <Lightbulb size={16} className="inline mr-1" /> Architecture recommandée :
                    </strong>{' '}
                    Combinez le script{' '}
                    <code className="bg-blue-100 dark:bg-blue-800/30 px-1 rounded">backup.sh</code>{' '}
                    avec un timer systemd pour une solution robuste. Le timer gère la planification
                    et le rattrapage, le script gère la logique de sauvegarde et rotation, et
                    journald conserve les logs.
                </p>
            </div>
        </div>
    );
};
