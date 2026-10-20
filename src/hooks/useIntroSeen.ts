const KEY = 'portfolio:intro-seen'

/**
 * Remembers for the current browser session that the curtains have been opened,
 * so navigating back to the home page never replays the opening sequence.
 * sessionStorage can throw (privacy modes), so every access is guarded.
 */
export const introSeen = (): boolean => {
  try {
    return sessionStorage.getItem(KEY) === '1'
  } catch {
    return false
  }
}

export const markIntroSeen = (): void => {
  try {
    sessionStorage.setItem(KEY, '1')
  } catch {
    /* ignore */
  }
}

export const resetIntroSeen = (): void => {
  try {
    sessionStorage.removeItem(KEY)
  } catch {
    /* ignore */
  }
}
