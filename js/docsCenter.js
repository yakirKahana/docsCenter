
// modal Initialization
$(document).ready(function () {
  $('.modal').modal();
});


let dashboard = $('#dashboard');
let save_btn = $('#save_btn');

let exportBtn = $('#export');

let fileBtn = $('#file-btn');
let fileinput = $('#file-input');

let beingEdited;
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
  let card = '';

  //check if docs are in localstorage, if so, save it in docs_saved;
  if (localStorage.getItem('docs') !== null) {
    docs_saved = JSON.parse(localStorage.getItem('docs'));
  }
  
  // if there's docs to display
  if (docs_saved.length > 0) {
    //loop thru docs_saved
    for (let i = 0; i < docs_saved.length; i++) {
      card += `<div class="col l2 m3 s6">
                  <div id="card-${i}" class="card padding-10">
                    <a href="${docs_saved[i].url}" target="_blank">
                      <div class="w80p">
                        <img class="favicons" src="https://icons.duckduckgo.com/ip3/${getDomain(docs_saved[i].url)}.ico">
                        <span>${docs_saved[i].name}</span>
                      </div>
                    </a>
                    <a href="#edit-item-modal" data-edit="${i}" class="fr modal-trigger" style="margin-top:3px"><img src="./imgs/icons/edit.svg"></a>
                  </div>
              </div>`;

    }

    //generate export file
    exportBtn.attr('href', "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(docs_saved)));
    exportBtn.attr('download', 'docs.json');

  } else {
    // if there's no docs to display
    card = '<h1 class="light-blue-text center-align">No Links, add some =)</h1>';
  }
  //render to screen
  dashboard.html(card);


    //set click event to all elements with attr data-edit
    $('a[data-edit]').on('click',function(){
      let index = $(this).attr('data-edit');
      $('#edit-name').val(docs_saved[index].name);
      $('#edit-url').val(docs_saved[index].url);
      beingEdited = index;
    });
}

renderDashboard();


//save edited docs
$('#edit-save-btn').on('click',()=>{
  docs_saved[beingEdited].name = $('#edit-name').val();
  docs_saved[beingEdited].url = pharseURL($('#edit-url').val());
  localStorage.setItem('docs',JSON.stringify(docs_saved));
  beingEdited = null;
  renderDashboard();
  $('.modal').modal(close());
});

//delete docs
$('#edit-delete-btn').on('click',()=>{
  let conf = confirm(`Are you sure you want to delete ${docs_saved[beingEdited].name}?`);
  if(conf){
    docs_saved.splice(beingEdited,1);
    localStorage.setItem('docs',JSON.stringify(docs_saved));
    beingEdited = null;
    renderDashboard();
    $('.modal').modal(close());
  }
});

save_btn.click(() => {
  if ($('#name').val()) {

    if ($('#url').val()) {

      //add item to array
      docs_saved.push(new Doc($('#name').val(), pharseURL($('#url').val())));
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
  return url.replace('http://','').replace('https://','').replace('www.','').replace('//','').split(/[/?#]/)[0];
}

function pharseURL(url){
  return '//' + url.replace('http://','').replace('https://','').replace('www.','').replace('//','');
}