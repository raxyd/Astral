document.addEventListener('DOMContentLoaded', () => {
    const content = document.getElementById('content');

    function loadPage(page) {
        fetch(page)
            .then(response => response.text())
            .then(html => {
                content.innerHTML = html;
                applySavedTheme();
            });
    }

    function route() {
        let path = window.location.pathname;
        if (path === '/') {
            loadPage('/partials/home.html');
        } else if (path === '/games') {
            loadPage('/partials/games.html');
        } else if (path === '/settings') {
            loadPage('/partials/settings.html');
        }
    }

    window.addEventListener('popstate', route);
    route();
});

function navigate(path) {
    window.history.pushState({}, path, window.location.origin + path);
    route();
}
