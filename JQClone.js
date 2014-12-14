(function () {

	   

     window.jQClone = function () {

      if(arguments.length == 1){
        var selector = document.querySelectorAll(arguments[0]);
        return new jQCloneObject(selector);
      }else{

     
        var arr = [];
        if(arguments[1]  instanceof NodeList || arguments[1]  instanceof Array || arguments[1] instanceof jQCloneObject){

          for (var i = 0; i < arguments[1].length; i++) {
           

             var cur =  arguments[1][i].querySelectorAll(arguments[0]);


             for (var j = 0; j < cur.length; j++) {
                arr.push(cur[j]);
              }
          }


          return new jQCloneObject(arr);
          

        }else{
          var selector = arguments[1].querySelectorAll(arguments[0]);
          return new jQCloneObject(selector);
        }


      }
    };

	
    var jQCloneObject  = function (selector) {
        // Get params
        
            
       
        this.length = selector.length;
  		  i = 0;
        
        for (; i < this.length; i++) {
            this[i] = selector[i];
        }
         
       
        return this;        
    };


    jQCloneObject.prototype = 
    {
       
        first: function () {
           if(this.length==0 ) return new jQCloneObject([]);
           else{
            var v = this[0];
            return new jQCloneObject([v]);
          }
        },

        last: function () {
           if(this.length==0 ) return new jQCloneObject([]);
           else{
            var v = this[this.length];
            return new jQCloneObject([v]);
          }
        },
        each:function(f){

           i = 0;
        
          for (; i < this.length; i++) {
              f.call(this[i],i, this[i]);
          }
          return this;

        },

        find: function(selector){


          return new jQClone(selector,this);
        },


        hasClass: function(className) {

          if(this.length >0 ){
            var classes = this[0].className.split(" ");
            for (var i = 0; i < classes.length; i++) {
              if(classes[i]==className){
                return true;

              }
          

            }
          }
          return false;
        },

        addClass: function(className){

          var newClasses = className.split(" ");

          for (var j = 0; j < newClasses.length; j++) {
           
         
              for (var i = 0; i < this.length; i++) {

                  if(!this[i].hasClass(newClasses[j]))
                   this[i].className += " "+newClasses[j];

              }
           };
          return this;
        },
      

         removeClass: function(className) {

          for (var i = 0; i < this.length; i++) {
            var classes = this[i].className.split(" ");
            for (var j = 0; j < classes.length; j++) {
              if(classes[j]==className){
                classes.splice(j,1);
              }
            };
            this[i].className = classes.join(" ");
          };
          return this;
        },
        toggleClass: function(className,addOrRemove){


          if(arguments.length == 1){
             var checker =this.hasClass(className);

              for (var i = 0; i < this.length; i++) {
               
                var obj = new jQCloneObject([ this[i] ]);

                if (obj.hasClass(className)) {
                  obj.removeClass(className);
                } else {
                  obj.addClass(className);
                }
              };

          }else{

            if (!addOrRemove) {
              this.removeClass(className);
            } else {
              this.addClass(className);
            }
          }
          return this;

        },

        attr: function(attributeName){
          if(this.length == 0) return null;

          if(arguments.length==1 &&  (typeof arguments[0] === "string" || arguments[0] instanceof String)){
            return this[0].getAttribute(attributeName);

          }else if(arguments.length==1){

            for (var i = 0; i < this.length; i++) {
              for (var key in arguments[0]) {
                if (arguments[0].hasOwnProperty(key)) {


                  this[i].setAttribute(key,  arguments[0][key]);
                
                }
              }
          }
           
          }else if(arguments.length==2 && arguments[1] instanceof Function){

              for (var i = 0; i < this.length; i++) {
               var value =  arguments[1].call(this[i],i, this[i].getAttribute(arguments[0]));


                this[i].setAttribute(arguments[0], value);
              };

          }else{

            for (var i = 0; i < this.length; i++) {
              this[i].setAttribute(arguments[0], arguments[1]);
            };
            
              
          }
          return this;
        },

        css : function(value){

          if(this.length == 0) return null;

          if(arguments.length == 1 ){

            if (typeof arguments[0] === "string" || arguments[0] instanceof String){

              var style =  this[0].style[value];

              if(style.length==0 || style == null){
                style = window.getComputedStyle(this[0],null).getPropertyValue(value)
              }
               return style;
            }else if (arguments[0] instanceof Array){
              var result= {};
              for (var i = 0; i < value.length; i++) {
               


                 var style =  this[0].style[value[i]];

                  if(style.length==0 || style == null){
                    style = window.getComputedStyle(this[0],null).getPropertyValue(value[i])
                  }
                   result[value[i]] = style;
              };
              return result;
            }else{





              for (var key in arguments[0]) {
                if (arguments[0].hasOwnProperty(key)) {

                  this.css(key,  arguments[0][key]);
                
                }
              }

              return this;
          }

          }else{


            if(arguments[1] instanceof Function ){
                for (var i = 0; i < this.length; i++) {


                 


                  var style =  this[i].style[arguments[0]];

                if(style.length==0 || style == null){
                  style = window.getComputedStyle(this[i],null).getPropertyValue(arguments[0])
                }
             


                   var result =  arguments[1].call(this[i],i, style);


                   
                this[i].style[arguments[0]]  = result;

              };


            }else{


              for (var i = 0; i < this.length; i++) {
                this[i].style[arguments[0]]  = arguments[1];

              };
            }

            return this;
          }

         
        },

        data:function(){

          if(arguments.length == 1){

            if (typeof arguments[0] === "string" || arguments[0] instanceof String){
          
                return this.attr("data-"+arguments[0])
            }else{


               for (var key in arguments[0]) {

                 if (arguments[0].hasOwnProperty(key)) {


                  this.attr("data-"+key,JSON.stringify(arguments[0][key]));
              
                
                }

               }
              return this;
            }
            

          }else if(arguments.length == 0){

            var obj = {}
             if (this[0].hasAttributes()) {
              var attrs = this[0].attributes;
            
              for(var i = attrs.length - 1; i >= 0; i--) {
                if(attrs[i].name.length>5 ){

                  var str = attrs[i].name.substring(0, 5);
                  if(str =="data-"){

                    obj[attrs[i].name] = attrs[i].value;
                  }
                }
              }
              
            }


            return obj;

          }else if(arguments.length > 1){

            var arr = [];
            for (var i = 0; i < arguments.length; i++) {
             
                var cur = this.attr("data-"+arguments[i])
                arr.push(cur);
            };
            return arr;


          }



         
        },

        on : function(name,event){

          if(arguments.length == 1){

           this[0][name]();
          }else{

            for (var i = 0; i < this.length; i++) {
              this[i].addEventListener(name, event, false);
            };
           
         }
        },

        html : function(){

          if(arguments.length == 0){
            if(this.length > 0) return this[0].innerHTML;
            return null;


          }else if( arguments.length == 1){

            if(arguments[0] instanceof Function){


              for (var i = 0; i < this.length; i++) {


                this[i].innerHTML = arguments[0].call(this[i],i,this[0].innerHTML)
              };

            }else{
              for (var i = 0; i < this.length; i++) {
                this[i].innerHTML = arguments[0];
              };
            }

           }

           return this;
        },
        append : function(text){

          if (typeof text === "string" || text instanceof String){
          
            for (var i = 0; i < this.length; i++) {
                this[i].insertAdjacentHTML("beforeend", text);
            };
          }else{

             for (var i = 0; i < this.length; i++) {
                this[i].appendChild(text);
            };


          }

          return this
        },

        prepend : function(text){

          if (typeof text === "string" || text instanceof String){
          
            for (var i = 0; i < this.length; i++) {
                this[i].insertAdjacentHTML("afterbegin", text);
            };
          }else{



             for (var i = 0; i < this.length; i++) {



                if (this[i].hasChildNodes()) {
  
                 var firstChild = this[i].childNodes[0];
                 this[i].insertBefore(text, firstChild);
               
                }else{
                   this[i].appendChild(text);
                 }
                
            };


          }

          return this
        },


        empty: function(){




          for (var i = 0; i < this.length; i++) {



                if (this[i].hasChildNodes()) {


                  while (this[i].firstChild) {
                      this[i].removeChild(this[i].firstChild);
                  }
                }
  
                
                 
                
            };


            return this;      
        },
   
    };



    function createString(obj){

      var s = "";
        for (var key in obj) {
          s += key +"=" +encodeURIComponent(obj[key])+"&";
        }

        if(s.length>1) s =s.substring(0,s.length-1)
       return s
    }
  
   myAjax =  function (){



        var xhr = new XMLHttpRequest();
         this.xhr =xhr;
       if(arguments.length  == 1){


        if(typeof arguments[0] === "string" || arguments[0] instanceof String){
          
     
            xhr.open('GET', arguments[0], true);
            xhr.send();
           
        }else {


            if(arguments[0].type == 'GET' || arguments[0]=== "undefined"){
                  xhr.open('GET', arguments[0].url, true);
            
                  xhr.send();
            }else{


                  if (!(typeof arguments[0].data === "undefined")) {

                    var str = createString(arguments[0].data);
                    console.log(str)
                    xhr.send(str);
                  }
            }
        
        }

        return this;

    }},
    returnMyAjax = function(arguments){
        return new myAjax(arguments);
      

    }
     myAjax.prototype = {


        done: function (callback) {
          this.xhr.addEventListener('load', callback, true);
          return this;
        },

         error: function (callback) {
          this.xhr.addEventListener('error', callback, true);
          return this;
        }
      }
     
      window.jQClone = jQClone;
      window.jQClone.ajax = returnMyAjax;
      window.$ =  window.jQClone;
   
   
})();



