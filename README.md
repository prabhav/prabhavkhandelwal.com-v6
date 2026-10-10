# Bare

Slightly opinionated, personal boilerplate for small to medium sized web projects. Based on Jekyll and Grunt.

## Running 

- Run `grunt`
- Run `grunt serve` simultaneously.

## Production build

Netlify builds the committed assets with `bundle exec jekyll build` and publishes
`_site`. Ruby is pinned in `.ruby-version`; install Bundler 2.4.22 and run
`bundle install` first. Jekyll 3.10 retains the existing Jekyll 3 site while
supporting the current Ruby build environment.

The homepage shapes use local `assets/css/shapes.css` and `assets/js/shapes.js`;
no Vector.js CDN is required. The autograph canvas initializes on DOM ready.
After changing `assets/js/app.js`, regenerate `production.js` and
`production.min.js` with the Grunt concat/uglify tasks before deploying.

## Image optimization

See [the image workflow](tools/images/README.md) for source-preserving compression,
responsive image generation, validation, and size reports. Run
`npm ci --prefix tools/images` followed by `npm --prefix tools/images run refresh`
after adding or changing images. The refresh command never publishes.
