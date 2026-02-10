/**
 * Get the localized value of a field from an item.
 * Falls back to English if Arabic content is not available.
 *
 * @param item - The data object (product, category, brand, etc.)
 * @param field - The base field name (e.g., 'name', 'description')
 * @param locale - The current locale ('en' or 'ar')
 * @returns The localized value, falling back to English
 */
export function getLocalizedField(
    item: Record<string, any>,
    field: string,
    locale: string
): string {
    if (locale === 'ar') {
        const arField = `${field}Ar`;
        if (item[arField]) {
            return item[arField];
        }
    }
    return item[field] || '';
}

/**
 * Get multiple localized fields from an item at once.
 *
 * @param item - The data object
 * @param fields - Array of base field names
 * @param locale - The current locale
 * @returns Object with field names as keys and localized values
 */
export function getLocalizedFields(
    item: Record<string, any>,
    fields: string[],
    locale: string
): Record<string, string> {
    const result: Record<string, string> = {};
    for (const field of fields) {
        result[field] = getLocalizedField(item, field, locale);
    }
    return result;
}
