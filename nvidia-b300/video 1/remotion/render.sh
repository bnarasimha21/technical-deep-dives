#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR"

OUTPUT_DIR="out/nvidia-b300-deep-dive"
mkdir -p "$OUTPUT_DIR"

RAW="$OUTPUT_DIR/b300-deep-dive-raw.mp4"
NORMAL="$OUTPUT_DIR/b300-deep-dive-1x.mp4"
FAST="$OUTPUT_DIR/b300-deep-dive-1.05x.mp4"

echo "=== Rendering full video ==="
npx remotion render Video1 "$RAW"

echo "=== Boosting audio volume ==="
ffmpeg -y -i "$RAW" \
  -filter:a "volume=3.0" \
  -c:v copy \
  "$NORMAL"

echo "=== Creating 1.05x speed version ==="
ffmpeg -y -i "$NORMAL" \
  -filter:v "setpts=0.9524*PTS" \
  -filter:a "atempo=1.05" \
  "$FAST"

rm -f "$RAW"

echo ""
echo "=== Done ==="
echo "  Normal:  $NORMAL"
echo "  1.05x:   $FAST"
