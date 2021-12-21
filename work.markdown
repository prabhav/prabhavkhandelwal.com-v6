---
title: Work
layout: default
footer_text: THE WEB SURE IS FLUID & DYNAMIC, BUT THAT ALSO MAKES THE THINGS IT HOLDS EPHEMERAL.
---

{% comment %}
<section class="section work__grid" id="">
    {% for post in site.work reversed %}
        <div class="project" id="{{ post.slug }}">
            <a href="{{ post.url }}" class="project__thumb">
                <figure>
                    <img 
                        src="{{ site.baseurl }}/assets/img/work/{{ post.title | slugify }}.png" 
                        alt="{{ post.title }} cover image">
                    <div class="project__role">
                        {% for item in post.role %}
                            <mark class="">{{ item }}</mark>
                        {% endfor %}
                    </div>
                </figure>
            </a>
            <div class="project__meta">
                <a href="{{ post.url }}">
                    <span class="project__meta__title">
                        {{ post.title }}
                    </span> &mdash;
                    <span class="project__meta__intro">
                        {{ post.intro }}
                    </span>
                </a>
            </div>
        </div>   
    {% endfor %}
</section> 
{% endcomment %}

<section class="projects">
    {% for post in site.work reversed %}
    {% unless post.archive %}
        <section class="section project" id="{{ post.slug }}">
            <div class="role hide--mobile">
                {% for item in post.role %}
                    <p class="caption">({{ item }})</p>
                {% endfor %}
            </div>

            <div class="info">
                <p class="caption name">
                    {{ post.title }}
                    <span class="hide--desktop role--mobile"> &mdash;
                        {% for item in post.role %}
                        {{ item }}
                        {% if forloop.last %}{% else %}+{% endif %}
                        {% endfor %}
                    </span>
                </p>
                <h3 class="hide--mobile">{{ post.intro }}</h3>

                <div class="caption link">
                    ↳ 
                    <a 
                    {% if post.outlink %}
                        href="{{ post.outlink }}" target="_blank"
                    {% else %}
                        href="{{ post.url }}"
                    {% endif %}
                    class="">
                        Case Study
                    </a>
                </div>
            </div>

            <figure 
                {% if post.cover_padded %}class="padded"{% endif %} 
                id="{{ post.slug }}"
                {% if post.cover_background %}style="background-color: #{{ post.cover_background }};"{% endif %}
            >
                <a 
                    {% if post.outlink %}
                        href="{{ post.outlink }}" target="_blank"
                    {% else %}
                        href="{{ post.url }}"
                    {% endif %}
                >
                    {% if post.cover_video %}
                        <video autoplay="" loop="" muted="" playsinline="" poster="/assets/img/work/{{ post.slug }}.png">
                            <source src="{{ site.baseurl }}/assets/img/work/{{ post.slug }}.webm" type="video/webm">	
                            <source src="{{ site.baseurl }}/assets/img/work/{{ post.slug }}.mp4" type="video/mp4">	
                        </video>
                    {% else %}
                    <img 
                        srcset="/assets/img/work/{{ post.slug }}@2x.png 2x"    
                        src="/assets/img/work/{{ post.slug }}.png" alt="{{ post.title }} cover image"
                    >
                    {% endif %}
                </a>
            </figure>
            <h3 class="hide--desktop">{{ post.intro }}</h3>
        </section>
    {% endunless %}
    {% endfor %}

    <!-- archive  -->

    {%- comment -%}

    {% for post in site.work reversed %}
    {% if post.archive %}
        <section class="section project archive" id="{{ post.slug }}">
            <div class="role hide--mobile">
                {% for item in post.role %}
                    <p class="caption">({{ item }})</p>
                {% endfor %}
            </div>

            <div class="info">
                <p class="caption name">
                    {{ post.title }}
                    <span class="hide--desktop role--mobile"> &mdash;
                        {% for item in post.role %}
                        {{ item }}
                        {% if forloop.last %}{% else %}+{% endif %}
                        {% endfor %}
                    </span>
                </p>
                <h3 class="hide--mobile">
                    <a 
                    {% if post.outlink %}
                        href="{{ post.outlink }}" target="_blank"
                    {% else %}
                        href="{{ post.url }}"
                    {% endif %}
                    >
                        {{ post.intro }}
                    </a>
                </h3>

                <!-- <div class="caption link">
                    ↳ 
                    <a 
                    {% if post.outlink %}
                        href="{{ post.outlink }}" target="_blank"
                    {% else %}
                        href="{{ post.url }}"
                    {% endif %}
                    class="">
                        Case Study
                    </a>
                </div> -->
            </div>

            <h3 class="hide--desktop">
                <a 
                    {% if post.outlink %}
                        href="{{ post.outlink }}" target="_blank"
                    {% else %}
                        href="{{ post.url }}"
                    {% endif %}
                >
                {{ post.intro }}
                </a>
            </h3>
        </section>
    {% endif %}
    {% endfor %}
</section>

<section class="section work__archive">
    <header>
        <p class="caption">(name)</p>
        <p class="caption">(kind)</p>
        <p class="caption">(brief)</p>
        <p class="caption">(year)</p>
    </header>

    <main>
        <a href="#" class="project">
            <div class="line"></div>
            <p>Simplex</p>
            <p>UX Case Study</p>
            <p>Trying to solve millenial banking in a sleepless hackathon.</p>
            <p>2018</p>
        </a>
        <a href="#" class="project">
            <div class="line"></div>
            <p>Simplex</p>
            <p>UX Case Study</p>
            <p>Trying to solve millenial banking in a sleepless hackathon.</p>
            <p>2018</p>
        </a>
        <a href="#" class="project">
            <div class="line"></div>
            <p>Simplex</p>
            <p>UX Case Study</p>
            <p>Trying to solve millenial banking in a sleepless hackathon.</p>
            <p>2018</p>
        </a>
        <a href="#" class="project">
            <div class="line"></div>
            <p>Simplex</p>
            <p>UX Case Study</p>
            <p>Trying to solve millenial banking in a sleepless hackathon.</p>
            <p>2018</p>
        </a>
        <a href="#" class="project">
            <div class="line"></div>
            <p>Simplex</p>
            <p>UX Case Study</p>
            <p>Trying to solve millenial banking in a sleepless hackathon.</p>
            <p>2018</p>
        </a>
        <a href="#" class="project">
            <div class="line"></div>
            <p>Simplex</p>
            <p>UX Case Study</p>
            <p>Trying to solve millenial banking in a sleepless hackathon.</p>
            <p>2018</p>
        </a>
        <a href="#" class="project">
            <div class="line"></div>
            <p>Simplex</p>
            <p>UX Case Study</p>
            <p>Trying to solve millenial banking in a sleepless hackathon.</p>
            <p>2018</p>
        </a>
        <a href="#" class="project">
            <div class="line"></div>
            <p>Simplex</p>
            <p>UX Case Study</p>
            <p>Trying to solve millenial banking in a sleepless hackathon.</p>
            <p>2018</p>
        </a>
    </main>

</section>

 <section class="section work__gallery">
    {% for post in site.work reversed %}
        <div class="project" id="{{ post.slug }}">
            <a href="{{ post.url }}" class="project__thumb">
                <figure>
                    <img src="{{ site.baseurl }}/assets/img/work/{{ post.banner_image }}" alt="{{ post.title }} banner image">
                </figure>
            </a>
            <p class="project__meta">
                <a href="{{ post.url }}">
                    <span class="caption project__meta__title">
                        {{ post.title }}
                    </span> &mdash;
                    <span class="project__meta__intro">
                        {{ post.intro }}
                    </span>
                </a>
            </p>
        </div>   
    {% endfor %}
</section> {%- endcomment -%}