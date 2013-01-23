function Menu(){
  var menu = {};

  var meta_;

  function update_filter() {
    var context = $(this);
    
    if (!context.is('input')) context = $('#' + cntrl.graph());
    
    var filter = {};
    $("input.filter:checked", context.closest(".tab-pane")).each(function() {
      var variable = this.name;
      var level    = this.value;
      if (filter[variable] === undefined) filter[variable] = [];
      filter[variable].push(level);
    });

    cntrl.filter(filter);
  }

  function update_selection(context) {
    if (context === undefined) context = $('#' + cntrl.graph());
    
    var selection = {};
    $("div.plotvariable .droppable", $(context).closest(".tab-pane")).each(function(i, ul) {
      var dimension = $(ul).attr("data-dimension");
      selection[dimension] = [];
      $("li.draggable", $(ul)).each(function(j, li) {
        selection[dimension][j] = $(li).attr("data-variable");
      });
    });
    cntrl.selection(selection);
  }

  function redraw_graph() {
    cntrl.redraw();
  }

  // Checkboxes in the variables section need to behave like a radiobox. This is handled in the 
  // next bit of code.
  function behave_like_radio() {

    var li = $(this).closest('li');
    var ul = li.closest('ul.droppable');

    if (ul.hasClass('variables')) {
      // enable only one check
      $("input:checked", li).not($(this)).attr("checked", false);
      var val = $("input:checked", li).val();
      if (!val){
        val = meta_.dimensions[li.data("variable")].default;
        $("input.filter[value='"+val+"']", li).attr("checked", true);
      }
      $("span.slice", li).text(" [='"+val+"']")
    } else {
      var val = $("input:checked", li).val();
      if (!val){
        val = meta_.dimensions[li.data("variable")].aggregate;
        $("input.filter[value!='"+val+"']", li).attr("checked", true);
      }

      var n_sel = $("input.filter:checked", li).length;
      var n = $("input.filter", li).length;

      $("span.slice", li).text(" ("+n_sel+"/"+n+")")
    }

  }

  function makeCatVar(id, catVar){
        var type = catVar.type;
        if (Array.isArray(type)) type = type.join(" ");
        var li = $("<li>").addClass("draggable " + type)
          .attr("data-variable", id)
          .attr("data-name", catVar.name)
          .text(catVar.name)
          .draggable({
            revert : "invalid",
            axis : "y",
            stack: "div"
          });

        var span = $("<span>")
          .addClass("slice")
          .text(" [='"+catVar.default+"']")
          .appendTo(li)
          ;

        if (catVar.description){
          var info = $("<a>")
            .attr({"href":"#"})
            .addClass("info")
            .html('<i class="icon-info-sign"></i>')
            .popover({ content: markdown.toHTML(catVar.description)
                     , html: true
                     , title: catVar.name
                     , trigger: "hover"
                     })
            .appendTo(li)
        }

        var a = $("<a>").attr("href", "#").addClass("togglefilter")
          .html('<i class="icon-chevron-right"></i>').appendTo(li)
          .click(function() {
            $("i", this).toggleClass('icon-chevron-down');
            $(this).next().toggle('slow');
            return false;
          });


        var div = $("<div>").addClass("filter").appendTo(li).hide();
        var form = $("<form>").appendTo(div);
        $.each(catVar.categories, function(i, cat) {
          var span_c = $("<span>").attr({"class":"color", "data-value": cat.level});
          var span = $("<span>").text(cat.name);
          var label = $("<label>").appendTo(form);
          label.append(span_c);
          span.appendTo(label);
          if (cat.description){
            var info = $("<a>")
              .attr({"href":"#"})
              .addClass("info")
              .html('<i class="icon-info-sign"></i>')
              .popover({ content: markdown.toHTML(cat.description)
                       , html: true
                       , title: cat.name
                       , trigger: "hover"
                       })
              .appendTo(label)
          }
          $("<input>").attr("type", "checkbox").addClass("filter")
            .attr("name", id)
            .val(cat.level)
            .click(behave_like_radio) 
            .click(update_filter)
            .click(cntrl.redraw)
            .prependTo(label);
        });
      return li;
  }

  function makeNumVar(id, numVar){
        var label = numVar.name;
        if (numVar.unit){
          label += " (" + numVar.unit + ")";
        }
        var li = $("<li>").addClass("draggable numeric")
          .attr("data-variable", id).text(label)
          .draggable({
            revert : "invalid",
            axis : "y",
            stack: "div"
          });

        if (numVar.description){
          var info = $("<a>")
            .attr({"href":"#"})
            .addClass("info")
            .html('<i class="icon-info-sign"></i>')
            .popover({ content: markdown.toHTML(numVar.description)
                     , html: true
                     , title: numVar.name
                     , trigger: "hover"
                     })
            .appendTo(li)
        }
        return li;
  }

  // loads the default graph, if available
  function defaultFill(){
    
    $(".tab-pane").each(function(i, tab){
      var id = tab.id;
      var sel;
      if (meta_.defaultgraphs && (sel = meta_.defaultgraphs[id])){
        $.each(sel, function(d, v){
          var dsel = "[data-dimension='"+d+"']";
          var vsel = "[data-variable='"+v+"']";
          $(vsel, tab).appendTo($(dsel,tab));
        })
      }
    })
  }

  // fill up required variables with available variables
  function autoFill(){
    var a = ["time", "categorical", "numeric", "ordered"];
    
    $(".tab-pane").each(function(i, tab){
      $(".required", tab)
      .filter(function(_, ul){return $("li", ul).length==0})
      .each(function(j, pv){
        var vars = $(".variables li", tab);
        for (var v = 0; v < vars.length; v++){
          var el = $(vars[v]);
          for (var c in a){
            if (el.hasClass(a[c]) && $(pv).hasClass(a[c])){
              el.appendTo(pv);
              return;
            }
          }
        }
      })
    })
  }

  // data is the meta data of the table
  menu.render = function(data) {
    meta_ = data;

    // TODO: following code block needs cleanup
    $(".variables").each(function(i, el) {
      // add dimensions to page
      $.each(data.dimensions, function(dim, dat) {
        $(el).append(makeCatVar(dim,dat));
      });
  
      // add variables to page
      $.each(data.variables, function(dim, dat) {
        var li = makeNumVar(dim,dat);
        $(el).append(li)
      });
    });

    defaultFill();
    autoFill();

    //set checks for categorical variables
    $("li.categorical").each(behave_like_radio);
  
       // Create tabbed pages for each of the graph types
    $("#tabs").tabs();
    // Keep track of which tab = graphtype is selected
    $('a[data-toggle="tab"]').on('shown', function (e) {
      // remove hash before type
      var type = $(this).attr("href").substring(1);
      cntrl.graph(type);
      update_selection();
      update_filter();
      redraw_graph();
    });

    // Select first tab
    $('.nav-tabs a:first').tab("show");

    // Drag-and-drop of variables on graph dimensions
    $(".droppable").droppable({
      accept: ".draggable",
      activeClass: "droppable_active", 
      hoverClass: "droppable_hover", 
      tolerance : "touch",
      drop: function(event, ui) {
        var granpa = $(this).closest(".tab-pane");
        // move existing variables to variables section
        var old = $(".draggable", $(this));
        old.appendTo($(".variables", granpa));

        var ul = $(ui.draggable).closest("ul");

        //remove selection if destination was variables
        if (ul.hasClass('variables')){
          $("input.filter:checked", ul).attr("checked", false);
        }

        // append newly dropped variable to the list
        $(ui.draggable).prependTo($(this)).attr("style", "position:relative");
        // when draggables are moves to the variables section and more than
        // one category is selected; these need to be unselected
        if ($(this).hasClass('variables')) {
          var sel = $("input.filter:checked", $(ui.draggable));
        } else {
          var sel = $("input.filter:checked", old);
        }
        if (sel.length > 1) sel.attr("checked", false);

        // update selection
        $("li.categorical").each(behave_like_radio);
        update_filter();
        update_selection(this);
        redraw_graph();
      },
      accept : function(draggable) {
        var $draggable = $(draggable);
        var $this = $(this);
        if ($(draggable).parent()[0] == $(this)[0]) return (false);
        
        var a = ["numeric", "categorical", "ordered", "time"];
        for (var v in a){
          if ($this.hasClass(a[v]) && $draggable.hasClass(a[v])){
            return true;
          }
        }
        return $this.hasClass("variables");
      }
    });
  }
  return menu;
};
