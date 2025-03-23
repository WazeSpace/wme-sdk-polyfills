interface Version {
  major: number;
  minor: number;
  patch: number;
}

type VersionedResult<T> = {
  version: Partial<Version>;
} & T;

export function separateVersionComponents(version: string): Version {
  const [major, minor, patch] = version.split('.').map(Number);
  return { major, minor, patch };
}

/**
 * Compares two versions
 * @param a Version A
 * @param b Version B
 * @returns 0 if versions are equal, positive if A is higher, negative if B is higher
 */
export function compareVersions(a: Partial<Version>, b: Partial<Version>): number {
  if (!a) return -1;
  if (!b) return 1;

  if (a.major && b.major && a.major !== b.major) return a.major - b.major;
  if (a.minor && b.minor && a.minor !== b.minor) return a.minor - b.minor;
  if (a.patch && b.patch && a.patch !== b.patch) return a.patch - b.patch;

  return 0;
}

export function getResultForVersion<T>(
  version: {
    highest?: Version | string;
    lowest?: Version | string;
  },
  results: VersionedResult<T>[],
  goal: 'highest' | 'lowest' = 'highest',
): T {
  let match: VersionedResult<T> | null = null;
  if (typeof version.highest === 'string') version.highest = separateVersionComponents(version.highest);
  if (typeof version.lowest === 'string') version.lowest = separateVersionComponents(version.lowest);

  for (const option of results) {
    if (!option.version) continue;
    if (!match) {
      match = option;
      continue;
    }

    if (version.highest && compareVersions(option.version, version.highest) > 0)
      continue;

    if (version.lowest && compareVersions(option.version, version.lowest) < 0)
      continue;

    const currentVersion = option.version;
    const matchVersion = match.version;
    const comparisonResult = compareVersions(currentVersion, matchVersion);
    if (goal === 'highest' && comparisonResult > 0) {
      match = option;
    } else if (goal === 'lowest' && comparisonResult < 0) {
      match = option;
    }
  }

  if (!match)
    throw new Error('No matching version found');

  return match;
}
