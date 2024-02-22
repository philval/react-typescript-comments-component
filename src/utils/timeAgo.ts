// now is the current time, and can be configured for unit testing
export default function timeAgo(now: Date, createdAt: string): string {
  const ms = (now.getTime() - new Date(createdAt).getTime()) / 1000;

  const minutes = Math.floor(ms / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 31); // not exact
  const years = Math.floor(weeks / 52); // not exact

  if (ms < 60) {
    return "just now";
    ////
  } else if (minutes === 1) {
    return `1 minute ago`;
  } else if (minutes < 60) {
    return `${minutes} minutes ago`;
    ///
  } else if (hours === 1) {
    return `1 hour ago`;
  } else if (hours < 24) {
    return `${hours} hours ago`;
    ////
  } else if (days === 1) {
    return `1 day ago`;
  } else if (days < 7) {
    return `${days} days ago`;
    ////
  } else if (weeks === 1) {
    return `1 week ago`;
  } else if (weeks < 4) {
    return `${weeks} weeks ago`;
    ////
  } else if (months === 1) {
    return `1 month ago`;
  } else if (months < 12) {
    return `${months} months ago`;
    ////
  } else if (years === 1) {
    return `1 year ago`;
  } else return `${years} years ago`;
}
