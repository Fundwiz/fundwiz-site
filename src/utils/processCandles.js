export function generateCandlesFromTicks(ticks, frameSizeSec = 10) {
  const candles = [];
  let frame = [];
  let frameStartTime = null;

  for (const tick of ticks) {
    const tickTime = new Date(tick.Timestamp);

    if (!frameStartTime) {
      frameStartTime = tickTime;
    }

    const diffSec = (tickTime - frameStartTime) / 1000;
    if (diffSec < frameSizeSec) {
      frame.push(parseFloat(tick.LTP));
    } else {
      if (frame.length) {
        candles.push({
          time: frameStartTime.toLocaleTimeString(),
          open: frame[0],
          close: frame[frame.length - 1],
          high: Math.max(...frame),
          low: Math.min(...frame),
        });
      }
      frameStartTime = tickTime;
      frame = [parseFloat(tick.LTP)];
    }
  }

  if (frame.length) {
    candles.push({
      time: frameStartTime.toLocaleTimeString(),
      open: frame[0],
      close: frame[frame.length - 1],
      high: Math.max(...frame),
      low: Math.min(...frame),
    });
  }

  return candles;
}
