// Client facing scripts here


$(() => {
  $('#filter-price').on('click', () => {

    const min = ($('#search-minimum-price').val()*100);
    const max = ($('#search-maximum-price').val()*100);
    $.ajax({
      method: 'GET',
      url: '/'
    })
    .done((response) => {
      console.log(min);

  //   //   for(const user of response.users) {
  //   //     $(`<li class="user">`).text(user.name).appendTo($usersList);
  //   //   }
    });
  //   // console.log('hello');
  });
});
