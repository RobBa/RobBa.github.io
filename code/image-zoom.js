const zoomableImages = document.querySelectorAll('.pytorch-nsight, .pytorch-perf');

if (zoomableImages.length > 0) {
    let overlay = null;

    const closeZoom = () => {
        if (!overlay) return;
        const el = overlay;
        overlay = null;

        el.classList.remove('pytorch-zoom-open');
        document.body.classList.remove('pytorch-zoom-lock');
        document.removeEventListener('keydown', onKeydown);

        el.addEventListener('transitionend', () => el.remove(), { once: true });
    };

    function onKeydown(e) {
        if (e.key === 'Escape') closeZoom();
    }

    const openZoom = (img) => {
        overlay = document.createElement('div');
        overlay.className = 'pytorch-zoom-overlay';

        const zoomedImg = document.createElement('img');
        zoomedImg.src = img.currentSrc || img.src;
        zoomedImg.alt = img.alt;

        overlay.appendChild(zoomedImg);
        document.body.appendChild(overlay);
        document.body.classList.add('pytorch-zoom-lock');

        // force layout with the closed (opacity/scale) state applied first,
        // so adding the open class right after actually transitions instead of snapping
        void overlay.offsetWidth;
        overlay.classList.add('pytorch-zoom-open');

        overlay.addEventListener('click', closeZoom);
        document.addEventListener('keydown', onKeydown);
    };

    zoomableImages.forEach(img => {
        img.addEventListener('click', () => openZoom(img));
    });
}
