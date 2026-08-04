export function parsePhones(settings: Record<string, string> | null): string[] {
  if (!settings) return [];
  const phones: string[] = [];
  if (settings.phone1) phones.push(settings.phone1);
  if (settings.phone2) phones.push(settings.phone2);
  if (settings.extraPhones) {
    try {
      const extra = JSON.parse(settings.extraPhones);
      if (Array.isArray(extra)) phones.push(...extra.filter(Boolean));
    } catch { /* ignore */ }
  }
  return phones;
}

export function parseEmails(settings: Record<string, string> | null): string[] {
  if (!settings) return [];
  const emails: string[] = [];
  if (settings.email1) emails.push(settings.email1);
  if (settings.email2) emails.push(settings.email2);
  if (settings.extraEmails) {
    try {
      const extra = JSON.parse(settings.extraEmails);
      if (Array.isArray(extra)) emails.push(...extra.filter(Boolean));
    } catch { /* ignore */ }
  }
  return emails;
}