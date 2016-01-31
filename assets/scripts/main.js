(function() {

  var setSubReddit = function () {
    var url = $('#reddit-url').val();
    $('.sub-reddit-wrap').html('');
    localStorage.setItem('subReddit', url);
    getSubReddit(url);
  };

  var getSubReddit = function (url) {
    $wrap = $('.sub-reddit-wrap');
    $.getJSON(url, function(data) {
      parse(data);
    });
  } ;

  var parse = function (data) {
    var obj = data.data.children,
        results = [];

    _.each(obj, function(o) {
      var post = o.data;
      var image = '';
      var thumbnail = "http://cdn.mysitemyway.com/etc-mysitemyway/icons/legacy-previews/icons/glossy-black-icons-social-media-logos/099350-glossy-black-icon-social-media-logos-reddit-logo.png";

      if (post.thumbnail != 'self' && post.thumbnail != 'default') {
        thumbnail = post.thumbnail;
      }

      if (post.hasOwnProperty('preview')) {
        image = post.preview.images[0].source.url;
      }
      var item = {
        id: post.id,
        title: post.title,
        author: post.author,
        domain: post.domain,
        downs: post.downs,
        likes: post.likes || 0,
        redditLink: "http://reddit.com/" + post.permalink,
        image: image,
        score: post.score,
        thumbnail: thumbnail,
        url: post.url
      };

      addItem(item);
    });

    return results;
  };

  var addItem = function (data) {
    $wrap = $('.sub-reddit-wrap');
    $wrap.append(template(data));
  };

  var template = function (data) {
    var html = "<div class='sub-reddit card col l4 m6 s12'>" +
          "<div class='card-content red-text'>" +
            "<a target='_blank' class='col s12' href='" + data.url + "'>" + data.title + "</a>" +
            "<img class='responsive-img' src='" + data.thumbnail + "' />" +
          "</div>" +
          "</div>";
    return html;
  };

  if (localStorage.getItem('subReddit')) {
    var sub = localStorage.getItem('subReddit');
    var checkReddit;
    getSubReddit(sub);
  }

  $('#submit').on('click', setSubReddit);

})();

