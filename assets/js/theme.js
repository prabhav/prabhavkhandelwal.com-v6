(function () {
    'use strict';
    var root = document.documentElement;
    var key = 'portfolio-theme';

    function apply(theme) {
        root.dataset.theme = theme;
        var dark = theme === 'dark';
        document.querySelectorAll('.theme-toggle').forEach(function (button) {
            var label = 'Switch to ' + (dark ? 'light' : 'dark') + ' mode';
            button.setAttribute('aria-pressed', String(dark));
            button.setAttribute('aria-label', label);
            button.title = label;
        });
        var meta = document.querySelector('meta[name="theme-color"]');
        if (meta) meta.content = dark ? '#0c0c0c' : '#ffffff';
    }

    var saved;
    try { saved = localStorage.getItem(key); } catch (error) { /* Storage is optional. */ }
    apply(saved === 'dark' ? 'dark' : 'light');

    document.addEventListener('DOMContentLoaded', function () {
        apply(root.dataset.theme);
        document.querySelectorAll('.theme-toggle').forEach(function (button) {
            button.addEventListener('click', function () {
                var theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
                apply(theme);
                try { localStorage.setItem(key, theme); } catch (error) { /* Keep the toggle usable. */ }
            });
        });
    });
    window.addEventListener('storage', function (event) {
        if (event.key === key) apply(event.newValue === 'dark' ? 'dark' : 'light');
    });
}());
