# Build-time image delivery only: source originals remain unchanged and available.
require 'cgi'
require 'uri'
module ResponsiveImages
  def self.attribute(tag, name)
    match = tag.match(/\s#{Regexp.escape(name)}\s*=\s*(["'])(.*?)\1/m)
    match && CGI.unescapeHTML(match[2])
  end

  def self.set_attribute(tag, name, value)
    value = CGI.escapeHTML(value.to_s)
    pattern = /\s#{Regexp.escape(name)}\s*=\s*(["']).*?\1/m
    return tag.sub(pattern, " #{name}=\"#{value}\"") if tag.match?(pattern)
    tag.sub(/\s*\/?\s*>\z/, " #{name}=\"#{value}\">")
  end

  def self.key(url, site)
    return url if site.data.dig('image_assets', 'assets', url)
    return nil unless url
    path = url.sub(/\A#{Regexp.escape(site.config['url'].to_s)}/, '')
    return nil unless path.start_with?('/assets/img/')
    URI::DEFAULT_PARSER.unescape(path.split(/[?#]/).first)
  end

  def self.sizes(page, figure)
    return '(min-width: 1640px) 667px, (min-width: 768px) 42vw, calc(100vw - 40px)' if page.url == '/work/'
    if page.url.start_with?('/work/')
      return '(min-width: 1640px) 1200px, (min-width: 1024px) 75vw, calc(100vw - 40px)' if figure.include?('full')
      return '(min-width: 1640px) 600px, (min-width: 1024px) 38vw, (min-width: 768px) 50vw, calc(100vw - 40px)'
    end
    return '(min-width: 1024px) 17vw, (min-width: 768px) 25vw, calc(100vw - 40px)' if page.url == '/about/'
    'calc(100vw - 40px)'
  end

  def self.render(page)
    return if ENV['JEKYLL_IMAGE_OPTIMIZATION'] == '0'
    return unless page.output_ext == '.html' && page.output
    assets = page.site.data.dig('image_assets', 'assets')
    return unless assets
    figure = ''; count = 0
    # Tokenize only tags we change; comments are consumed whole and never rewritten.
    page.output = page.output.gsub(/<!--[\s\S]*?-->|<\/?figure\b[^>]*>|<img\b[^>]*>|<video\b[^>]*>/i) do |tag|
      if tag.start_with?('<!--')
        tag
      elsif tag.match?(/\A<figure\b/i)
        figure = attribute(tag, 'class').to_s; tag
      elsif tag.match?(/\A<\/figure/i)
        figure = ''; tag
      elsif tag.match?(/\A<video\b/i)
        original = attribute(tag, 'poster'); asset = assets[key(original, page.site)]
        variants = asset && asset['variants']
        if variants && !variants.empty?
          best = variants.find { |v| v['width'] >= 1600 } || variants.last
          set_attribute(set_attribute(tag, 'poster', best['url']), 'data-original-poster', original)
        else
          tag
        end
      else
        original = attribute(tag, 'src'); asset = assets[key(original, page.site)]
        if asset
          tag = set_attribute(tag, 'src', asset['source']) if original.start_with?('https://cdn.dribbble.com/') && asset['source']
          # Respect authored @2x imagery: choose the highest-resolution source.
          source_set = attribute(tag, 'srcset').to_s
          sources = source_set.split(',').map { |s| s.strip.sub(/\s+[\d.]+[wx]\z/, '') }
          high = sources.map { |url| assets[key(url, page.site)] }.compact.max_by { |a| a['width'] }
          high = asset unless high && high['width'] > asset['width']
          variants = high['variants']
          count += 1
          tag = set_attribute(tag, 'width', asset['width']) unless attribute(tag, 'width')
          tag = set_attribute(tag, 'height', asset['height']) unless attribute(tag, 'height')
          tag = set_attribute(tag, 'data-optimized-image', 'true')
          tag = set_attribute(tag, 'loading', count <= 2 ? 'eager' : 'lazy') unless attribute(tag, 'loading')
          tag = set_attribute(tag, 'decoding', 'async') unless attribute(tag, 'decoding')
          if variants && !variants.empty?
            srcset = variants.map { |v| "#{v['url']} #{v['width']}w" }.join(', ')
            "<picture style=\"display:contents\"><source type=\"image/webp\" srcset=\"#{CGI.escapeHTML(srcset)}\" sizes=\"#{CGI.escapeHTML(sizes(page, figure))}\">#{tag}</picture>"
          else
            tag
          end
        else
          tag
        end
      end
    end
  end
end
Jekyll::Hooks.register [:pages, :documents], :post_render do |page|
  ResponsiveImages.render(page)
end
