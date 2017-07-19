$('.list').on('click', 'li', function(e) {
  e.preventDefault();

  let link = './MB/' + $(this).context.innerText.replace(/\(.*?\)/, "") + '/index.html'

  $('iframe').attr('src', link)
});
