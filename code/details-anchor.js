/**
 * Auto-opens a collapsed <details> (e.g. the "Optional: ..." sections) when a
 * link's #hash points at it or at something nested inside it, then scrolls it
 * into view again since opening it changes the page layout.
 */
function openTargetDetails() {
    if (!location.hash) return;

    let target;
    try {
        target = document.querySelector(location.hash);
    } catch (e) {
        return; // hash isn't a valid CSS selector
    }
    if (!target) return;

    const details = target.closest('details');
    if (!details || details.open) return;

    details.open = true;
    requestAnimationFrame(() => target.scrollIntoView({ block: 'start' }));
}

openTargetDetails();
window.addEventListener('hashchange', openTargetDetails);
