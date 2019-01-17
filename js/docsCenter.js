
// modal Initialization
$(document).ready(function () {
  $('.modal').modal();
});


var dashboard = $('#dashboard');
var save_btn = $('#save_btn');

let exportBtn = $('#export');

//define doc class
class Doc {
  constructor(doc_name, doc_url) {
    this.name = doc_name;
    this.url = doc_url;

  }
}

var docs_saved = [];

if (localStorage.getItem('docs') !== null) {
  docs_saved = JSON.parse(localStorage.getItem('docs'));
}

//displaying in dashboard
function renderDashboard() {
  let card = '';
  if (docs_saved.length > 0) {
    for (let i = 0; i < docs_saved.length; i++) {
      card += `<div class="col l2 m3 s6">
                  <div class="card padding-10">
                    <a href="`+ docs_saved[i].url + `" target="_blank">
                    <div>
                    <img class="favicons" src="https://f1.allesedv.com/16/`+ docs_saved[i].url + `">
                    <span>`+ docs_saved[i].name + `</span>
                    </div>
                    </a>
                  </div>
                </div> `;

    }
    exportBtn.attr('href', "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(docs_saved)));
    exportBtn.attr('download', 'docs.json');
  } else {
    card = '<h1 class="light-blue-text center-align">No Links, add some =)</h1>';
  }

  dashboard.html(card);
}

renderDashboard();


save_btn.click(() => {
  if ($('#name').val()) {

    if ($('#url').val()) {
      //add item to array
      docs_saved.push(new Doc($('#name').val(), $('#url').val()));
      localStorage.setItem('docs', JSON.stringify(docs_saved));
      $('#name').val(null).removeClass();
      $('#url').val(null).removeClass();
      $('.modal').modal(close());
    } else {
      $('#url').addClass('invalid');
    }
  } else {
    $('#name').addClass('invalid');
  }
  renderDashboard();
});



