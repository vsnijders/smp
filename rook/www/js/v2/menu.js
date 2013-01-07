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
    var ul = $(this).closest('ul.droppable');
    if (ul.hasClass('variables')) {
      var div = $(this).closest('div.filter');
      $("input:checked", div).not($(this)).attr("checked", false);
    }
  }

  function makeCatVar(id, catVar){
        var li = $("<li>").addClass("draggable categorical")
          .attr("data-variable", id).text(catVar.name)
          .draggable({
            revert : "invalid",
            axis : "y"
          });
        var a = $("<a>").attr("href", "#").addClass("togglefilter")
          .html('<i class="icon-chevron-right"></i>').appendTo(li)
          .click(function() {
            $("i", this).toggleClass('icon-chevron-down');
            $(this).next().toggle('slow');
            return false;
          });


        var div = $("<div>").addClass("filter").appendTo(li).hide();
        var form = $("<form>").appendTo(div);
        $.each(catVar.levels, function(i, lab) {
          var span_c = $("<span>").attr("class", "color category"+i);
          var span = $("<span>").text(lab);
          var label = $("<label>").appendTo(form);
          label.append(span_c);
          span.appendTo(label);
          $("<input>").attr("type", "checkbox").addClass("filter")
            .attr("name", id)
            .val(lab)
            .click(behave_like_radio) 
            .click(update_filter)
            .click(cntrl.redraw)
            .prependTo(label);
        });
      return li;
  }

  function makeNumVar(id, numVar){
        var li = $("<li>").addClass("draggable numeric")
          .attr("data-variable", id).text(numVar.name)
          .draggable({
            revert : "invalid",
            axis : "y"
          });
        return li;
  }

  // fill up required variables with available variables
  function autoFill(){
    var a = ["numeric", "categorical"];
    
    $(".tab-pane").each(function(i, tab){
      $(".required", tab).each(function(j, pv){
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

    autoFill();
  
       // Create tabbed pages for each of the graph types
    $("#tabs").tabs();
    // Keep track of which tab = graphtype is selected
    $('a[data-toggle="tab"]').on('shown', function (e) {
      cntrl.graph($(this).text());
      update_selection();
      update_filter();
      redraw_graph();
    });

    // Select first tab
    $('.nav a:first').tab("show");

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
        update_filter();
        update_selection(this);
        redraw_graph();
      },
      accept : function(draggable) {
        var $draggable = $(draggable);
        var $this = $(this);
        if ($(draggable).parent()[0] == $(this)[0]) return (false);
        
        var a = ["numeric", "categorical"];
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
