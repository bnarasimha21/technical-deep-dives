#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR"

OUTPUT_DIR="out/nvidia-b300-deep-dive"
mkdir -p "$OUTPUT_DIR"

RAW="$OUTPUT_DIR/b300-deep-dive-raw.mp4"
BOOSTED="$OUTPUT_DIR/b300-deep-dive-boosted.mp4"
FINAL="$OUTPUT_DIR/b300-deep-dive-1.20x.mp4"

echo "=== Rendering full video ==="
npx remotion render Video1 "$RAW" --timeout=120000 --concurrency=4

echo "=== Boosting audio volume (3x) ==="
ffmpeg -y -i "$RAW" \
  -filter:a "volume=3.0" \
  -c:v copy \
  "$BOOSTED"

echo "=== Creating 1.20x speed version ==="
ffmpeg -y -i "$BOOSTED" \
  -filter:v "setpts=0.8333*PTS" \
  -filter:a "atempo=1.20" \
  "$FINAL"

rm -f "$RAW" "$BOOSTED"

echo ""
echo "=== Done ==="
echo "  Output: $FINAL"
