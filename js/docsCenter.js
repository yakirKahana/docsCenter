
// modal Initialization
$(document).ready(function(){
    $('.modal').modal();
  });


var dashboard = $('#dashboard');


var save_btn = $('#save_btn');
//define doc class
class Doc{
    constructor(doc_name,doc_url){
        this.name = doc_name;
        this.url = doc_url;

    }
}

var docs_saved = [];

if(localStorage.getItem('docs') !== null){
  docs_saved = JSON.parse(localStorage.getItem('docs'));
}

//displaying in dashboard
function renderDashboard(){
    let card = '';
if(docs_saved.length > 0){
  for(let i = 0; i < docs_saved.length; i++){
    card += `<div class="col l2 m3 s6">
                  <div class="card padding-10">
                    <a href="`+docs_saved[i].url+`">
                    <div>
                    <img class="favicons" src="http://f1.allesedv.com/16/`+docs_saved[i].url+`">
                    <span>`+docs_saved[i].name+`</span>
                    </div>
                    </a>
                  </div>
                </div> `;

  }
}else{
  card = '<h1 class="light-blue-text center-align">No Links, add some =)</h1>';
}

dashboard.html(card);
}

renderDashboard();


save_btn.click(()=>{
  //add item to array
  docs_saved.push(new Doc($('#name').val(),$('#url').val()));
  localStorage.setItem('docs',JSON.stringify(docs_saved));
  $('#name').val(null);
  $('#url').val(null);

  renderDashboard();
});
