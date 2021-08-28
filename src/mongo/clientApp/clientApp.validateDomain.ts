/**
 * Ideally we want to require encrypted HTTP domain.
 * @param domain {string}
 * @returns boolean - is domain a valid domain.
 */

export default function(domain: string): boolean {
  // Regex pattern found here: https://thispointer.com/javascript-check-if-string-is-url/
  // TODO: Update to check for valid protocol, origin, host.
  console.log(domain);
  const urlRegex = new RegExp(/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/gm);

  return urlRegex.test(domain);
}
