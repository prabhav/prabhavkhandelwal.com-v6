# Deployment

In this project, a request to "deploy" means committing the intended changes and
pushing them to `main` on `origin` (`prabhav/prabhavkhandelwal.com-v6`). Netlify
automatically builds and deploys from that Git push.

Use this Git workflow by default. Do not use direct Netlify CLI uploads or the
Netlify source-upload deployment service unless the user explicitly asks for it.
Run appropriate checks before pushing and report the pushed commit. Distinguish
a successful push from a confirmed completed Netlify deployment.
