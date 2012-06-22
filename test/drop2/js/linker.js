
// base
// - .links
//   -* .link
//     - .link1
//       - .column1
//     - .link2
//       - .column2
//     - .linkcontent
// - .columns
//   - .columns1
//     -* .column1
//   - .columns2
//     -* .column2
function Linker(base, tables) {
  //TEST
  this.on_link_change_ = undefined;
  this.on_link_remove_ = undefined;
  var linker = this;
  //TEST


  // base/links
  var links = $("<div>").addClass("links").appendTo(base);
 
  // base/columns
  var columns  = $("<div>").addClass("columns").appendTo(base);

  // base/columns/columns1
  var columns1 = $("<div>").addClass("columns1").appendTo(columns);
  $.each(tables.t1, function(index, value) {
    $("<div>").addClass("column1").text(value).appendTo(columns1)
      .draggable({ revert : "invalid" });
  });
  columns1.droppable({
    activeClass : "active",
    hoverClass : "hover",
    accept: function(d) {
      return (d.hasClass("column1") && $(d.parent().parent().parent()).is(links));
    },
    drop : function(event, ui) {
      // TEST
      //ui.draggable.appendTo($(this)).attr("style", "position:relative;");
      var link = ui.draggable.parent().parent();
      ui.draggable.appendTo($(this)).attr("style", "position:relative;");
      if (linker.on_link_remove_ !== undefined) 
        linker.on_link_remove_(ui.draggable.text(), undefined, link);
      /// TEST
      remove_empty();
    }
  });

  // base/columns/columns2
  var columns2 = $("<div>").addClass("columns2").appendTo(columns);
  $.each(tables.t2, function(index, value) {
    $("<div>").addClass("column2").text(value).appendTo(columns2)
      .draggable({ revert : "invalid" });
  });
  columns2.droppable({
    activeClass : "active",
    hoverClass : "hover",
    accept: function(d) {
      return (d.hasClass("column2") && $(d.parent().parent().parent()).is(links));
    },
    drop : function(event, ui) {
      // TEST
      //ui.draggable.appendTo($(this)).attr("style", "position:relative;");
      var link = ui.draggable.parent().parent();
      ui.draggable.appendTo($(this)).attr("style", "position:relative;");
      if (linker.on_link_remove_ !== undefined) 
        linker.on_link_remove_(undefined, ui.draggable.text(), link);
      /// TEST
      remove_empty();
    }
  });

  // base/links/link

  // create new link
  function new_link() {
    this.links = links;
    var link = $("<div>").addClass("link");
    $("<div>").addClass("link1").droppable({
        activeClass : "active",
        hoverClass : "hover",
        accept: function(d) {
          if ($(this).children(".column1").length) return false;
          return (
            (d.hasClass("column1") &&
              $(d.parent().parent().parent()).is(links)) ||
            $(d.parent()).is(columns1) 
          );
        },
        drop : function(event, ui) {
          ui.draggable.appendTo($(this)).attr("style", "position:relative;");
          //TEST
          var link1 = $(this).text();
          var link2 = $("> .link2", $(this).parent()).find(".column2")[0];
          if (link2 !== undefined) link2 = $(link2).text();
          if (linker.on_link_change_ !== undefined) 
            linker.on_link_change_(link1, link2, $(this).parent());
          ///TEST
          if (!last_link_empty()) new_link();
          remove_empty();
        }
      }).appendTo(link);
    $("<div>").addClass("link2").droppable({
        activeClass : "active",
        hoverClass : "hover",
        accept: function(d) {
          if ($(this).children(".column2").length) return false;
          return (
            (d.hasClass("column2") &&
              $(d.parent().parent().parent()).is(links)) ||
            $(d.parent()).is(columns2) 
          );
        },
        drop : function(event, ui) {
          ui.draggable.appendTo($(this)).attr("style", "position:relative;");
          //TEST
          var link1 = $("> .link1", $(this).parent()).find(".column1")[0];
          if (link1 !== undefined) link1 = $(link1).text();
          var link2 = $(this).text();
          if (linker.on_link_change_ !== undefined)
            linker.on_link_change_(link1, link2, $(this).parent());
          ///TEST
          if (!last_link_empty()) new_link();
          remove_empty();
        }
      }).appendTo(link);
    $("<div>").addClass("linkcontent").appendTo(link);
    link.hide();
    link.appendTo(this.links);
    link.show("slow");
  }
  // check if there are any empty links the need to be deleted
  function link_empty(link) {
    if ($("> .link1 > .column1", link).length) return false;
    if ($("> .link2 > .column2", link).length) return false;
    return true;
  }
  function last_link_empty() {
    return (link_empty($("> .link:last-child", links)));
  }
  function remove_empty() {
    var divs =  $("> .link", links);
    var n = divs.length
    $(divs).each(function(i, e) {
      if (link_empty(e) && i < (n-1)) {
        $(e).hide('blind', {}, "slow", function() { $(this).remove(); });
      }
    });
  }

  new_link();
}

//TEST
Linker.prototype.on_link_change = function(f) {
  this.on_link_change_ = f;
  return(this);
}

Linker.prototype.on_link_remove = function(f) {
  this.on_link_remove_ = f;
  return(this);
}

///TEST

Linker.prototype.link_content = function() {
}

