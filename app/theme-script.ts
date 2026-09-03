/**
 * Runs before first paint, inlined in <head>. Without it a reader who has
 * chosen light-on-a-dark-OS gets a charcoal flash on every navigation.
 *
 * Deliberately does nothing when no explicit choice is stored: the CSS media
 * query in styles/globals.css is the source of truth for "system", so this
 * script must not write an attribute in that case.
 *
 * Kept as a string constant rather than a real function so the exact bytes
 * that reach the page are reviewable here.
 */
export const themeScript = `try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t)}catch(e){}`;
