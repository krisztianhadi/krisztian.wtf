async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        showToast('Copied it to your clipboard yay!');
    } catch {
        showToast('Could not copy :( Please copy manually.');
    }
}

function showToast(message, duration = 5000) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => toast.classList.remove('show'), duration);
}

// Simple hamburger menu - only reachable while the toggle is visible (small screens)
const siteHeader = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');

if (siteHeader && menuToggle) {
    const setOpen = open => {
        siteHeader.classList.toggle('menu-open', open);
        menuToggle.setAttribute('aria-expanded', String(open));
    };

    menuToggle.addEventListener('click', event => {
        event.stopPropagation();
        setOpen(!siteHeader.classList.contains('menu-open'));
    });

    // close it when a link is picked, on Escape, or on a click outside the header
    document.querySelectorAll('.site-nav a').forEach(link => {
        link.addEventListener('click', () => setOpen(false));
    });

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape') setOpen(false);
    });

    document.addEventListener('click', event => {
        if (!siteHeader.contains(event.target)) setOpen(false);
    });
}

// Chromium skips a cross-document view transition when the incoming page is still
// fetching assets (most likely on a slow connection or an uncached dev server).
// The skip surfaces as an unhandled AbortError in the console - this is not an
// error in our code, so keep the console clean. The fade still runs whenever the
// browser does decide to run it.
window.addEventListener('unhandledrejection', event => {
    if (event.reason && event.reason.name === 'AbortError') {
        event.preventDefault();
    }
});

// NSFW gallery: click a shot to open it full-screen, arrow through the set
const lightbox = document.getElementById('lightbox');

if (lightbox) {
    const image = lightbox.querySelector('img');
    const stage = lightbox.querySelector('.lightbox-stage');
    const counter = lightbox.querySelector('.lightbox-count');
    const prevButton = lightbox.querySelector('.lightbox-prev');
    const nextButton = lightbox.querySelector('.lightbox-next');
    const closeButton = lightbox.querySelector('.lightbox-close');
    let group = [];
    let index = 0;

    const show = () => {
        const shot = group[index];
        image.src = shot.dataset.full;
        image.alt = shot.querySelector('img').alt;
        counter.textContent = `${index + 1} / ${group.length}`;
        prevButton.disabled = nextButton.disabled = group.length < 2;
        stage.scrollTop = 0;
    };

    const step = delta => {
        index = (index + delta + group.length) % group.length;
        show();
    };

    document.querySelectorAll('.nsfw-grid').forEach(strip => {
        const shots = [...strip.querySelectorAll('.nsfw-shot')];
        shots.forEach((shot, position) => {
            shot.addEventListener('click', () => {
                group = shots;
                index = position;
                show();
                lightbox.showModal();
                document.body.classList.add('lightbox-open');
            });
        });
    });

    prevButton.addEventListener('click', () => step(-1));
    nextButton.addEventListener('click', () => step(1));
    closeButton.addEventListener('click', () => lightbox.close());
    lightbox.addEventListener('close', () => document.body.classList.remove('lightbox-open'));
    lightbox.addEventListener('click', event => {
        if (event.target === lightbox) lightbox.close();
    });
    lightbox.addEventListener('keydown', event => {
        if (event.key === 'ArrowRight') step(1);
        if (event.key === 'ArrowLeft') step(-1);
    });
}

