#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

branch=$(git rev-parse --abbrev-ref HEAD)
remote=origin

echo "[autopush] Watching for changes on branch $branch..."

while true; do
	if ! git diff --quiet || ! git diff --cached --quiet; then
		msg="chore: autopush $(date -u +"%Y-%m-%dT%H:%M:%SZ")"
		git add -A
		git commit -m "$msg" || true
		git push "$remote" "$branch" || true
	fi
	sleep 5
done


