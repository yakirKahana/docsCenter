
// modal Initialization
$(document).ready(function () {
  $('.modal').modal();
});


var dashboard = $('#dashboard');
var save_btn = $('#save_btn');

let exportBtn = $('#export');

let fileBtn = $('#file-btn');
let fileinput = $('#file-input');
//click on file btn  == click on file Input
fileBtn.click(() => {
  fileinput.click();
});

//define doc class
class Doc {
  constructor(doc_name, doc_url) {
    this.name = doc_name;
    this.url = doc_url;

  }
}

var docs_saved = [];



//displaying in dashboard
function renderDashboard() {
  if (localStorage.getItem('docs') !== null) {
    docs_saved = JSON.parse(localStorage.getItem('docs'));
  }
  let card = '';
  if (docs_saved.length > 0) {
    for (let i = 0; i < docs_saved.length; i++) {
      card += `<div class="col l2 m3 s6">
                  <div class="card padding-10">
                    <a href="${docs_saved[i].url}" target="_blank">
                      <div class="w80p">
                        <img class="favicons" src="https://icons.duckduckgo.com/ip3/${getDomain(docs_saved[i].url)}.ico">
                        <span>${docs_saved[i].name}</span>
                      </div>
                    </a>
                    <a href="#" class="fr" style="margin-top:3px"><img src="./imgs/icons/edit.svg"></a>
                  </div>
                </div> `;

    }

    //export file
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

//import

function handleFile(File) {
  let reader = new FileReader();
  reader.readAsText(File)
  reader.addEventListener('load', () => {
    console.log(reader.result);
    localStorage.setItem('docs', reader.result);
    renderDashboard();
  });

}

fileinput.change(() => {
  handleFile(fileinput[0].files[0]);
});


//get domain name from url
function getDomain(url){
  return url.replace('http://','').replace('https://','').replace('www.','').split(/[/?#]/)[0];

}