const accountSid = 'AC279a6b2121ae915dfb59876da5f11ad5';
const authToken = '54e607bad4553e93fe0a0b779c2dce71';
const client = require('twilio')(accountSid, authToken);

const message = function (send) {

  client.messages
    .create({
      body: `${send}`,
      from: '+12407822054',
      to: '+12369696116'
    })
    .then(message => console.log(message.status))
};

$(document).ready(function () {

  $(".send-message").on("click", function() {
    console.log('hi');
  });

  // $('#send-message-form').submit(function (event) {
  //   // event.preventDefault();

  //   // const formData = $(this).serialize(); // serialize return obj
  //   // // console.log(formData);

  //   // $.ajax('/api/sms', {

  //   //   method: 'GET',
  //   //   data: formData

  //   // })
  //   //   .then(function (results) {
  //   //     console.log(results);
  //   //   })
  // })
});


module.exports = { message };
