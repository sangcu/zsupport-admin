Support.Me.MainView = Ember.View.extend({
    templateName: 'Main'
});
Em.TEMPLATES["Main"] = Em.Handlebars.compile(
	'<div class="row-fluid">'+
    '<div id="left-menu" >'+
        '{{outlet menu}}'+
    '</div>'+
    '<div class="span10">'+
        //Body content
        '{{outlet content}}'+
        '<div id="chat-box">'+
        '</div>'+
    '</div>'+
	'</div>'
	);


/*Emberjs View Library*/
if(!window.ZSupport)
    ZSupport={};

ZSupport.ColorView=Em.View.extend({
    selectedColorBinding:'',        
    content:['#1abc9c','#2ecc71','#3498db','#9b59b6','#34495f','#2c3e50','#8e44ad','#2980b9','#27ae60','#16a085','#f1c40f','#f39c12','#d35400','#e67e22','#e74c3c','#c0392b','#ecf0f1','#bdc3c7','#95a5a6','#7f8c8d'],    
    //content:["#ffffff", "#ebebeb", "#d6d6d6", "#c0c0c0", "#aaaaaa", "#606060", "#444444", "#000000","#e0edd4", "#cce8b4", "#b2dd8b", "#97d35d", "#78bc3f", "#679c33", "#507a26", "#395719","#f8fadb", "#fffbb8", "#fff993", "#fff768", "#fffc3b", "#f5ec00", "#c4bc00", "#8d8600","#fff2d5", "#ffd8a7", "#ffc576", "#feb33b", "#fea900", "#d48300", "#a86700", "#794900","#ffd9d8", "#feb4af", "#fe8a81", "#fd5e4f", "#fe3909", "#e21900", "#b41100", "#820900","#f0c8ff", "#e291ff", "#d255ff", "#bd36f4", "#9827be", "#7b20a0", "#60167c", "#450d59","#d9caff", "#b08cff", "#864eff", "#5e31ec", "#4d23b4", "#371b95", "#2c1477", "#1a0a53","#d5e3ff", "#a8c6ff", "#75a8ff", "#3d89ff", "#0963ff", "#0657d7", "#0443ab", "#022f7b","#cbf1ff", "#95e3ff", "#57d6fe", "#16c8fc", "#11a4d8", "#0c8db5", "#076e90", "#044e65"],
    didInsertElement:function(){  
    },
    template:Em.Handlebars.compile(
        '<div class="color-palette">'+
            '<div class="dropdown">'+
                '<a class="color-toogle dropdown-toggle" data-toggle="dropdown" href="#">{{view ZSupport.ColorBlockTextView colorBinding="view.selectedColor"}}</a>'+
//                '<ul class="dropdown-menu" role="menu" aria-labelledby="dLabel">'+
//                    '{{#each view.content}}'+
//                    '<li class="color-pick">'+
//                        '<a>{{view ZSupport.ColorBlockView selectedColorBinding="view.selectedColor" colorBinding="this"}}</a>'+
//                    '</li>'+
//                    '{{/each}}'+
//               '</ul>'+
            '</div>'+
        '</div>'
    )
});

ZSupport.ColorBlockView=Em.View.extend({
    classNameBindings:['colorBlock'],        
    colorBlock:'color-block',    
    attributeBindings:['style'],        
    selectedColorBinding:'',
    color:'',
    style:function(){

        return 'background:'+ this.get('color');

    }.property('color'),        
    click:function(){
        console.log('clicked!');
        this.set('selectedColor',this.get('color'));
    },
    tagName:'span'
    
});
ZSupport.ColorBlockTextView=ZSupport.ColorBlockView.extend({
    classNameBindings:['btn'],
    btn:'btn',
    template:Em.Handlebars.compile('<span class="color-block"> </span> <b class="caret"></b>'),
    tagName:'button',
    click:function(){},
})

Ember.Handlebars.helper('fromNow', function(value, options) {
  var escaped = Handlebars.Utils.escapeExpression(value);
  return moment(value).fromNow();
});