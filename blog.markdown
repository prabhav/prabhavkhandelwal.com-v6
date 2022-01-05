---
title: Blog
layout: layout--index
---

<section class="section blog-grid">
  {% for post in site.blog reversed %}
    {% if post.outlink %}
      <a target="_blank" href="{{ post.outlink }}">
    {% else %}
      <a href="{{ post.url }}">
    {% endif %}
    <article>
      <main>
        <h3 class="caption">{{ post.title }}</h3>
        <time class="caption">{{ post.date | date_to_long_string }}</time>

        <p>
          {{ post.content | truncatewords: 45, '...' }}
        </p>
      </main>
      
      <footer>
        {% if post.outlink %}
          <span class="caption">Read on Mindsparkle <img class="outlink" src="{{ site.baseurl }}/assets/img/outlink.svg" alt=""></span>
        {% else %}
          <span class="caption">Read More</span>
        {% endif %}
      </footer>
    </article>
    </a>
  {% endfor %}
</section>

<section class="section blog-grid">
    <figure>
      <img src="https://cdn.dribbble.com/users/198568/screenshots/9395374/media/80619d330577c587d93d549031ae9108.png" alt="">
    </figure>
    <figure>
      <img src="https://cdn.dribbble.com/users/198568/screenshots/6602519/dribbble_shot_hd_2.40.png" alt="">
    </figure>
    <figure>
        <img src="https://cdn.dribbble.com/users/198568/screenshots/6485791/desktop_hd_copy_13.png" alt="">
    </figure>
    <figure>
      <img src="https://cdn.dribbble.com/users/198568/screenshots/3120859/criss.jpg" alt="">
    </figure>
    <figure>
      <img src="https://cdn.dribbble.com/users/198568/screenshots/2712647/mix_bouncer.png" alt="">
    </figure>
    <figure>
      <img src="https://cdn.dribbble.com/users/198568/screenshots/2653946/squiggle_bouncer.png" alt="">
    </figure>
    <figure>
      <img src="https://cdn.dribbble.com/users/198568/screenshots/2638990/bouncer.jpg" alt="">
    </figure>
    <figure>
      <img src="https://cdn.dribbble.com/users/198568/screenshots/9395372/media/94804725a1ea00a23a8a73064b5bff70.png" alt="">
    </figure>
    <figure>
      <img src="https://cdn.dribbble.com/users/198568/screenshots/1658478/modules-banner.png" alt="">
    </figure>
</section>