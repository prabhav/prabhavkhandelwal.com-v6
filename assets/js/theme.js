(function () {
    'use strict';
    var root = document.documentElement;
    var key = 'portfolio-theme';
    var devicePreference = window.matchMedia('(prefers-color-scheme: dark)');
    var override = null;

    function validTheme(value) {
        return value === 'dark' || value === 'light' ? value : null;
    }

    function preferredTheme() {
        return override || (devicePreference.matches ? 'dark' : 'light');
    }

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

    try { override = validTheme(localStorage.getItem(key)); } catch (error) { /* Storage is optional. */ }
    apply(preferredTheme());

    devicePreference.addEventListener('change', function () {
        if (!override) apply(preferredTheme());
    });

    document.addEventListener('DOMContentLoaded', function () {
        apply(root.dataset.theme);
        document.querySelectorAll('.theme-toggle').forEach(function (button) {
            button.addEventListener('click', function () {
                var theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
                override = theme;
                apply(theme);
                try { localStorage.setItem(key, theme); } catch (error) { /* Keep the toggle usable. */ }
            });
        });
    });
    window.addEventListener('storage', function (event) {
        if (event.key === key || event.key === null) {
            override = validTheme(event.newValue);
            apply(preferredTheme());
        }
    });
}());
