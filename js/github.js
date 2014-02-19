var Commit = Backbone.Model.extend({
  details: function () {
    return {
      sha: this.get('sha'),
      author: this.get('commit').author.name,
      message: this.get('commit').message,
      url: this.get('html_url'),
      author_avatar: this.get('author').avatar_url
    };
  },
  detailsToHTML: function () {
    var details = this.details();
    return "<tr><td><a href=" + details.url + ">" + details.sha + "</a></td><td>" +
      "<img class='avatar' src=" + details.author_avatar + "/>" + details.author +
      "</td><td>" + details.message+"</td></tr>"
  }
});

var Commits = Backbone.Collection.extend({
  model: Commit,
  url: 'https://api.github.com/repos/jarviis/jarviis/commits',
  initialize: function () {
    this.fetch();
  }
});


var CommitsView = Backbone.View.extend({
  el: '#list',
  template: _.template('<table><% commits.forEach(function(c){ %><%= c.detailsToHTML()%><% }) %></table>'),
  initialize: function () {
    this.collection.on('add',    this.render, this)
    this.collection.on('change', this.render, this)
  },
  render: function () {
    var html = this.template({commits: this.collection.models})
    $(this.el).html(html)
  }
});

var commits = new Commits()
$(document).ready(function() {
  var commitsview = new CommitsView({collection: commits});
});
