import { isDevelopment } from '@/lib/env';

/**
 * Structured logging — a thin, dependency-free abstraction.
 *
 * Why an abstraction (not console directly): logging is an observability seam.
 * Today it writes structured JSON to stdout (which Vercel ingests). Swapping in
 * a hosted log sink or wiring Sentry breadcrumbs later is a change to THIS file
 * only — call sites never change. Constitution: "Projections are disposable";
 * the same applies to infrastructure adapters.
 */

type Level = 'debug' | 'info' | 'warn' | 'error';

type LogContext = Record<string, unknown>;

const LEVEL_WEIGHT: Record<Level, number> = { debug: 10, info: 20, warn: 30, error: 40 };
const MIN_LEVEL: Level = isDevelopment ? 'debug' : 'info';

function emit(level: Level, message: string, context?: LogContext): void {
  if (LEVEL_WEIGHT[level] < LEVEL_WEIGHT[MIN_LEVEL]) return;

  const entry = {
    level,
    message,
    time: new Date().toISOString(),
    ...context,
  };

  // In dev, pretty single-line; in prod, structured JSON for machine ingestion.
  if (isDevelopment) {
    console[level === 'debug' ? 'log' : level](`[${level}] ${message}`, context ?? '');
  } else {
    console[level === 'debug' ? 'log' : level](JSON.stringify(entry));
  }
}

export const logger = {
  debug: (message: string, context?: LogContext) => emit('debug', message, context),
  info: (message: string, context?: LogContext) => emit('info', message, context),
  warn: (message: string, context?: LogContext) => emit('warn', message, context),
  error: (message: string, context?: LogContext) => emit('error', message, context),
  /** Create a child logger that stamps every line with shared context. */
  child(base: LogContext) {
    return {
      debug: (m: string, c?: LogContext) => emit('debug', m, { ...base, ...c }),
      info: (m: string, c?: LogContext) => emit('info', m, { ...base, ...c }),
      warn: (m: string, c?: LogContext) => emit('warn', m, { ...base, ...c }),
      error: (m: string, c?: LogContext) => emit('error', m, { ...base, ...c }),
    };
  },
};

export type Logger = typeof logger;
