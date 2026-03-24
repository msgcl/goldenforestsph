let homeLandingDismissed = false;
const HOME_LANDING_MIN_WIDTH = 768;

export function isHomeLandingAvailable() {
  if (typeof window === "undefined") {
    return true;
  }

  return window.innerWidth >= HOME_LANDING_MIN_WIDTH;
}

export function isHomeLandingDismissed() {
  return homeLandingDismissed || !isHomeLandingAvailable();
}

export function dismissHomeLanding() {
  homeLandingDismissed = true;
}
