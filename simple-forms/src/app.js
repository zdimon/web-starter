
var app = {
    appTag: null,
    db: null,
    init: function() {
        this.appTag = $('#appTag');
        $.ajax({
            url: "bd.json",
            complete: (responce) => {
                console.log(this);
                var data = JSON.parse(responce.responseText);
                this.db = data;
                this.showForm();
            }
          });
    },
    showForm: function() {
        console.log(this.db)
        for (let item of this.db ) {
            console.log(item);
            if(item.type === 'text') {

                let field = $(`<div>
                ${item.question}                
             </div>`);
                field.append('<input type="text" />');
                this.appTag.append(field);
            }

            if(item.type === 'radio') {

                let field = $(`<div>
                ${item.question}                
             </div>`);
                for (let r of item.answers) {
                    var option = $(`<div>${r.text}</div>`)
                    option.append(`<input type="radio" name="${item.name}" />`);
                    field.append(option);
                }
                
                this.appTag.append(field);
            }

        }
    }
}

app.init();




