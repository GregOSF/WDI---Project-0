$(function() {

  
  function NewPost(user, loc, post) {
    this.user = user;
    this.loc = loc;
    this.post = post;
  }

  
  NewPost.all = [
        new NewPost('Jack', 'Patagonia', 'This hike was awesome.'),
        new NewPost('Alice', 'Himalayas', 'This hike was awesome.')
  ];

  NewPost.prototype.save = function() {
    NewPost.all.push(this);
    console.log(NewPost.all);
  };

  NewPost.prototype.render = function() {
    var $newPost = $(newPostTemplate(this));
    this.index = NewPost.all.indexOf(this);
    $newPost.attr('data-index', this.index);
    $newPosts.prepend($newPost);
  };

  var $newEntry = $('#new-Entry');

  
  var $newPosts = $('#new-Posts');

  
  var newPostTemplate = _.template($('#post-template').html());

  
  _.each(NewPost.all, function (newpost, index) {
    newpost.render();
  });

  
  $newEntry.on('submit', function(event) {
    event.preventDefault();

  
    var $userName = $('#user-name').val();
    var $userLoc = $('#user-location').val();
    var $userPost = $('#user-post').val();
    var newBlog = new NewPost($userName, $userLoc, $userPost);
    var $postCont = $('#newPostContainer')

  
    newBlog.save();

  
    newBlog.render();

  
    $newEntry[0].reset();
    $('#user-name').focus();
  });

  
  $newPosts.on('click', '.blogPost', function() {
    $(this).toggleClass('removePost');
  });



  
  $newPosts.on("click", ".delete", function () {
    var $blogPost = $(this).closest(".blogPost");
    var index = $blogPost.attr('data-index');

    $('newPostContainer').on("click", function(event) {
    event.preventDefault();
    $(this).fadeOut("slow");
  });

  
    NewPost.all.splice(index, 1);
    console.log(NewPost.all);

  
    $newPosts.remove();


    $('.blogPost').each(function(index) {
      $(this).attr('data-index', index);
    });
  });
});

