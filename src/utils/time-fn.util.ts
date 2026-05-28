import { formatInTimeZone } from "date-fns-tz";

export type TTimeDetails = {
    /** e.g. "28 May 2026" */
    fullDate: string;
    /** e.g. "10:38 AM" */
    fullTime12: string;
    /** e.g. "10:38" */
    fullTime24: string;
    /** e.g. "28" */
    day: string;
    /** e.g. "May" */
    month: string;
    /** e.g. "May" */
    shortMonth: string;
    /** e.g. "2026" */
    year: string;
    /** e.g. "Thursday" */
    weekDay: string;
    /** e.g. "Thu" */
    shortWeekDay: string;
    /** e.g. "10" (12-hour) */
    hour12: string;
    /** e.g. "10" (24-hour) */
    hour24: string;
    /** e.g. "38" */
    minute: string;
    /** e.g. "18" */
    second: string;
    /** e.g. "AM" | "PM" */
    period: string;
    /** IANA timezone string, e.g. "Asia/Kolkata" */
    timezone: string;
    /** Abbreviated timezone, e.g. "IST" */
    timezoneShort: string;
};

export function getTimeDetails({
    utcTimestampInSeconds,
    timezone,
}: {
    utcTimestampInSeconds: number;
    timezone: string;
}): TTimeDetails {
    const date = new Date(utcTimestampInSeconds * 1000);

    return {
        fullDate: formatInTimeZone(date, timezone, "dd MMMM yyyy"),
        fullTime12: formatInTimeZone(date, timezone, "h:mm a"),
        fullTime24: formatInTimeZone(date, timezone, "HH:mm"),
        day: formatInTimeZone(date, timezone, "dd"),
        month: formatInTimeZone(date, timezone, "MMMM"),
        shortMonth: formatInTimeZone(date, timezone, "MMM"),
        year: formatInTimeZone(date, timezone, "yyyy"),
        weekDay: formatInTimeZone(date, timezone, "EEEE"),
        shortWeekDay: formatInTimeZone(date, timezone, "EEE"),
        hour12: formatInTimeZone(date, timezone, "h"),
        hour24: formatInTimeZone(date, timezone, "HH"),
        minute: formatInTimeZone(date, timezone, "mm"),
        second: formatInTimeZone(date, timezone, "ss"),
        period: formatInTimeZone(date, timezone, "a"),
        timezone: timezone,
        timezoneShort: formatInTimeZone(date, timezone, "zzz"),
    };
}

// console.log(getTimeDetails(1779939687, "Asia/Kolkata"));

