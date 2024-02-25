function generateTimestampId(): string {
  const timestamp = Date.now();
  return timestamp.toString();
}
function generateUniqueTimestampId(): string {
  const timestamp = Date.now();
  return `${timestamp}_${generateUniqueId()}`;
}
function generateUniqueId(): string {
  const randomComponent = Math.floor(Math.random() * 1000000);
  return `${randomComponent}`;
}

export { generateTimestampId, generateUniqueTimestampId, generateUniqueId };
