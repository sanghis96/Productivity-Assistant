var server;

(function(server, $) {
  'use strict';

  server = {};

  server.url = "http://localhost:8000";

  // Private function to call server side APIs
  server._httpPost = function(options) {
    console.log('options are', options);
    $.ajax({
      type: "POST",
      url: server.url + '/parse',
      data: options.data,
      success: options.success,
      dataType: options.dataType || 'json'
    })
    .fail(function(err) {
        //alert('An error occured' + JSON.stringify(err));
        console.log(JSON.stringify(err));
    })
  }

  // Function to send data to server for parsing. Any  preprocessing logic can be written here.
  server.parse = function(text, callback) {
    console.log('sending data to server for parsing...');
    server._httpPost({
        'data': { 'script': text },
        'success': callback
    })
  }
  
  // Making this server object available on windows global object so that it is available in other files.
  window.server = server;
  

}(server, $))

