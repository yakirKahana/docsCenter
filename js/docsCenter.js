
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

//example
docs_saved[0]={
  name:'html',
  url:'https://developer.mozilla.org/en-US/docs/Web/HTML',

}

//displaying in dashboard
function renderDashboard(){

let card = '';
for(let i = 0; i < docs_saved.length; i++){
  card += `<div class="col l1 m3 s6">
                <div class="card padding-10">
                  <a href="`+docs_saved[i].url+`">
                  <div>
                  <img style="" src="https://s2.googleusercontent.com/s2/favicons?domain=`+docs_saved[i].url+`">
                  <span>`+docs_saved[i].name.toUpperCase()+`</span>
                  </div>
                  </a>
                </div>
              </div> `;

}
dashboard.html(card);
}

renderDashboard();


save_btn.click(()=>{
  //add item to array
  docs_saved.push(new Doc($('#name').val(),$('#url').val()));

  $('#name').val('');
  $('#url').val('');

  renderDashboard();
});
