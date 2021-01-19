import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import '../src/index.scss';
import '../src/reset.scss';
var $ = require( "jquery" );

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

console.log($(".contact__form"))
$(document).ready(function() {

	//E-mail Ajax Send
	$(".contact__form").submit(function() { 
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "mail.php", 
			data: th.serialize()
		}).done(function() {
			alert("Thank you!");
			setTimeout(function() {
				// Done Functions
				th.trigger("reset");
			}, 1000);
		});
		return false;
	});

});
