/**
 * Utility functions for working with Unix timestamps in SQLite
 */

/**
 * Convert a Date object to Unix timestamp (milliseconds)
 */
export const dateToUnixTimestamp = (date: Date): number => {
    return date.getTime();
};

/**
 * Convert Unix timestamp (milliseconds) to Date object
 */
export const unixTimestampToDate = (timestamp: number): Date => {
    return new Date(timestamp);
};

/**
 * Get current Unix timestamp
 */
export const getCurrentUnixTimestamp = (): number => {
    return Date.now();
};

/**
 * Format Unix timestamp for display
 */
export const formatUnixTimestamp = (timestamp: number, options?: Intl.DateTimeFormatOptions): string => {
    const date = unixTimestampToDate(timestamp);
    const defaultOptions: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    
    return date.toLocaleString(undefined, { ...defaultOptions, ...options });
};

/**
 * Check if a Unix timestamp is in the past
 */
export const isPastTimestamp = (timestamp: number): boolean => {
    return timestamp < getCurrentUnixTimestamp();
};

/**
 * Check if a Unix timestamp is today
 */
export const isTodayTimestamp = (timestamp: number): boolean => {
    const date = unixTimestampToDate(timestamp);
    const today = new Date();
    
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
};

/**
 * Get Unix timestamp for start of today
 */
export const getStartOfTodayTimestamp = (): number => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return dateToUnixTimestamp(today);
};

/**
 * Get Unix timestamp for end of today
 */
export const getEndOfTodayTimestamp = (): number => {
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    return dateToUnixTimestamp(today);
};

