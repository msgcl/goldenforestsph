let homeLandingDismissed = false;

export function isHomeLandingDismissed() {
  return homeLandingDismissed;
}

export function dismissHomeLanding() {
  homeLandingDismissed = true;
}
