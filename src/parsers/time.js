export function parseHHmmToMinutes(string) {
  const [hours, minutes] = string.split(":");
  const intHours = parseInt(hours);
  const intMinutes = parseInt(minutes);
  const isPositive = intHours >= 0;
  return intHours * 60 + (-1) ** (isPositive * 2) * intMinutes;
}
