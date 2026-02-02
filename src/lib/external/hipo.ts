export interface HipoUniversity {
  name: string;
  country: string;
  alpha_two_code: string;
  "state-province": string | null;
  domains: string[];
  web_pages: string[];
}

const HIPO_API_BASE = "http://universities.hipolabs.com";

/**
 * Searches for universities using the Hipo Labs API.
 * @param name The name or partial name of the university to search for.
 * @returns A list of universities matching the search query.
 */
export async function searchHipoUniversities(
  name: string = "",
  country: string = "",
): Promise<HipoUniversity[]> {
  try {
    let url = `${HIPO_API_BASE}/search?`;
    if (name) url += `name=${encodeURIComponent(name)}&`;
    if (country) url += `country=${encodeURIComponent(country)}`;

    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Hipo API error: ${response.statusText}`);
    }
    const data = await response.json();
    return data as HipoUniversity[];
  } catch (error) {
    console.error("Failed to fetch from Hipo API:", error);
    return [];
  }
}

/**
 * Normalizes a Hipo university entry to a partial University object structure
 * identifying it as external data.
 */
export function normalizeHipoUniversity(hipoUni: HipoUniversity) {
  return {
    id: `hipo_${hipoUni.domains[0] || hipoUni.name.replace(/\s+/g, "_")}`,
    name: hipoUni.name,
    country: hipoUni.country,
    website: hipoUni.web_pages[0] || null,
    isExternal: true, // Flag to indicate this is not fully populated
    // Defaults for missing data
    acceptanceRate: null,
    ranking: null,
    tuition: null,
  };
}
