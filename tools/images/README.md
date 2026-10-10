# Image delivery

This workflow preserves source originals and creates local responsive WebP derivatives.
It covers images rendered by Jekyll, video posters, and the homepage's six hover images.
Unused media, SVGs, favicons, and the Open Graph image remain untouched. Videos are not
transcoded. Imported Dribbble originals and their URL mapping are retained.

## Refresh after adding or changing content

Use the repository's Ruby/Bundler versions and Node >=18.17:

```sh
npm ci --prefix tools/images
npm --prefix tools/images run refresh
```

The refresh command builds unoptimized HTML to discover references, imports new images
from the existing Dribbble host, audits originals, generates derivatives and the manifest,
rebuilds Jekyll, and validates every generated image reference. It does not commit, push,
or deploy. Commit the generated assets, `_data/image_assets.json`, source/content changes,
and tool files together when ready to publish. Netlify uses those committed derivatives;
there is no runtime image service or build-time image download in production.

For checks without encoding:

```sh
bundle exec jekyll build
npm --prefix tools/images run verify
node tools/images/budgets.cjs
```

Set `JEKYLL_IMAGE_OPTIMIZATION=0` for a build with original image URLs, useful for visual
comparison. `_plugins/responsive_images.rb` otherwise supplies WebP `<picture>` sources,
original-format fallbacks, dimensions, layout-specific `sizes`, eager loading for the first
two content images, and lazy loading for later images. SVG icons are not counted as content
images. Original `@2x` sources determine available detail. Hover images load only on hover
on devices where the desktop hover UI is visible, with an original GIF error fallback.

## Encoding policy

- Static imagery: lossless WebP, preserving visible pixels and alpha at original dimensions.
  Responsive widths: 480, 960, 1600, 2400, 3200, 3840, capped to the original width.
- Hover imagery: maximum 960 pixels, appropriate to its roughly 32vw desktop slot.
- Animations: compare lossless and quality-88 WebP at each width, choose the smaller, and
  verify every frame count, delay and loop value. No frames are intentionally dropped.
- Never upscale or crop. If the highest-resolution derivative is not smaller, retain the
  original for that asset. Remove a smaller-width candidate when a larger one costs fewer bytes.
- Content hashes and a versioned recipe cache unchanged inputs. Only obsolete derivatives
  under `assets/img/optimized/` are removed; source masters are never overwritten.

The manifest is keyed by source URLs and has hashes, dimensions, animation metadata,
variant byte sizes, and hover mappings. Change the recipe version when encoding policy
changes. Reports distinguish total source-library size, referenced originals, the largest
available derivative for each referenced source, and calculated viewport-specific budgets.
Original fallbacks remain on disk: these are transfer savings, not repository-size savings.
Viewport budgets assume WebP support, DPR 2, all pages scrolled, and desktop hover states
visited; they are not measured loading-time claims.

## Validation

`verify.cjs` checks source hashes, derivative dimensions, aspect ratios, byte savings,
animation timing/loops/frames, generated references, and loading/dimension attributes.
Review representative screenshots, transparent artwork, small text, photographs and
animation frames after changing quality or sizing settings. Use a browser to inspect
`currentSrc`, desktop/mobile layouts, hover behavior and the original fallback.
