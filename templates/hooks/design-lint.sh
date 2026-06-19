#!/usr/bin/env bash
# pre-commit.design — run design-manual lint on DESIGN.md changes.
# Installed by init-design.sh. Skips gracefully if harness is unavailable.
set -e

HARNESS="${DESIGN_HARNESS_ROOT:-$HOME/projects/design-manual}"
LINT="$HARNESS/scripts/lint/index.js"

if git diff --cached --name-only | grep -q '^DESIGN.md$'; then
  if [[ -f "$LINT" ]]; then
    node "$LINT" "./DESIGN.md" || {
      echo "DESIGN.md lint failed. Fix issues or amend (see .design/lint.json)." >&2
      exit 1
    }
  else
    echo "[design-lint] harness not found at $HARNESS — skipping (set DESIGN_HARNESS_ROOT to override)" >&2
  fi
fi
