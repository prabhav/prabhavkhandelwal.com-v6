---
title: Home
layout: default
footer_text: say hi
---

<section class="section index__hero" style="max-height: 960px;">
    <article>
        <h3>
I'm a designer, developer and internet maker. Based in Delhi, by way of San Diego, Hong Kong and New York. Previously worked at Google, Alright Studio & Netlify. Currently building <a target="_blank" href="https://studiocanine.com">Studio Canine</a>.
        </h3>

        <img class="hover-img" alt="your intention in question">
    </article>

    <div class="wall">
        <img class="axis--v" src="{{ site.baseurl }}/assets/img/axis--gray.svg" alt="">
        <img class="axis--h" src="{{ site.baseurl }}/assets/img/axis--gray.svg" alt="">

        <div class="box box--shapes">
            {% include shapes.html %}
        </div>
        <div class="box box--work">
            <a class="point" href="/work/jeffstaple/" id="jeffstaple">
                <img class="shape" src="{{ site.baseurl }}/assets/img/triangle--red.svg" alt="red square">
                <span class="caption label">(work, jeffstaple)</span>
            </a>
            
            <a class="point" href="/work/skilli/" id="skilli">
                <img class="shape" src="{{ site.baseurl }}/assets/img/square--red.svg" alt="red square">
                <span class="caption label">(work, skilli)</span>
            </a>
            <a class="point" href="/work/boldvoice/" id="boldvoice">
                <img class="shape" src="{{ site.baseurl }}/assets/img/circle--red.svg" alt="red square">
                <span class="caption label">(work, boldvoice)</span>
            </a>
        </div>
        <div class="box box--mood">
            <a target="_blank" class="point" id="haptic" href="https://open.spotify.com/playlist/72SDJhgLd15veW9QIZrSgJ?si=318ee9660a3c4399">
                <img class="shape" src="{{ site.baseurl }}/assets/img/square--yellow.svg" alt="red square">
                <span class="caption label">(listening, haptic touch)</span>
            </a>
            <a target="_blank" class="point" id="beatles" href="https://www.imdb.com/title/tt9735318/">
                <img class="shape" src="{{ site.baseurl }}/assets/img/triangle--yellow.svg" alt="red square">
                <span class="caption label">(watching, get back)</span>
            </a>
            <a target="_blank" class="point" id="house" href="https://open.spotify.com/playlist/56VUADHOYrHtnUEjBXomOP?si=8c058a708a7b43be">
                <img class="shape" src="{{ site.baseurl }}/assets/img/circle--yellow.svg" alt="red square">
                <span class="caption label">(listening, deep house)</span>
            </a>
        </div>
        <div class="box box--sketchpad" id="sketchpadapp">
            <canvas id="sketchpad" height="400" width="400%">
            </canvas>
            <p class="caption" contenteditable="true">
                Can I have your autograph?<span class="cursor">|</span>
            </p>
        </div>
    </div>
</section>

<script defer src="{{ site.baseurl }}/assets/js/shapes.js"></script>

<script type="application/json" id="hover-image-assets">{{ site.data.image_assets.hover | jsonify }}</script>
