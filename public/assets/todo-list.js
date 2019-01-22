$(document).ready(function(){

  $('form').on('submit', function(){
      console.log("hello")
      var item = $('form input');
      var todo = {item: item.val()};
      console.log(todo)
      $.ajax({
        type: 'POST',
        url: '/todo',
        data: todo,
        success: function(data){
          //do something with the data via front-end framework
          console.log(data)
          location.reload();
        }
      });

      return false;

  });

  $('li').on('click', function(){
     var item = $(this).text().replace(/ /g, "-");
    //  var item = $(this).text().trim().replace(/ /g, "-");
      console.log(item)
      console.log('delete opt')
      $.ajax({
        type: 'DELETE',
        url: '/todo/' + item,
        success: function(data){
          //do something with the data via front-end framework
          console.log(data)
         location.reload();
        }
      });
  });


});
