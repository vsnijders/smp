
// base
// - .links
//   -* .link
//     - .link1
//       - .column1
//     - .link2
//       - .column2
// - .columns
//   - .columns1
//     -* .column1
//   - .columns2
//     -* .column2
function Linker_new(base, tables) {
  this.base   = base;
  this.tables = tables;
  
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
      ui.draggable.appendTo($(this)).attr("style", "position:relative;");
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
      ui.draggable.appendTo($(this)).attr("style", "position:relative;");
    }
  });

  // base/links/link

  // create new link
  function new_link() {
    this.links = links;
    var link = $("<div>").addClass("link");
    $("<div>").addClass("table1").droppable({
        activeClass : "active",
        hoverClass : "hover",
        accept: function(d) {
          if ($(this).children(".column1").length) return false;
          return ($(d.parent()).is(columns1));
        },
        drop : function(event, ui) {
          ui.draggable.appendTo($(this)).attr("style", "position:relative;");
          if (!last_link_empty()) new_link();
        }
      }).appendTo(link);
    $("<div>").addClass("table2").droppable({
        activeClass : "active",
        hoverClass : "hover",
        accept: function(d) {
          if ($(this).children(".column2").length) return false;
          return ($(d.parent()).is(columns2));
        },
        drop : function(event, ui) {
          ui.draggable.appendTo($(this)).attr("style", "position:relative;");
          if (!last_link_empty()) new_link();
        }
      }).appendTo(link);
    link.hide();
    link.appendTo(this.links);
    link.show("slow");
  }
  // check if there are any empty links the need to be deleted
  function last_link_empty() {
    if ($("> .link:last-child > .link1", links).find(".column1")) return false;
    if ($("> .link:last-child > .link2", links).find(".column2")) return false;
    return true;
  }



  new_link();

  // create
}

function Linker(base, table) {
  this.base  = base;
  this.table = table;

  function on_table_drop(event, ui, base, table, num) {
    $("<div></div>" ).text(ui.draggable.text())
      .addClass(base + "table" + num + "column")
      .addClass("table" + num + "column")
      .draggable({revert:"invalid"}).appendTo(table);
    ui.draggable.remove();
    if (!lastempty(base)) newlinkdiv(base);
    checkempty(base);
  }

  function on_table_accept(d, base, table, num) {
    if ($(table).find("div." + base + "table" + num + "column").length) return false;
    return (d.hasClass(base + "table" + num + "column"));
  }

  function newlinkdiv(base) {
    var link = $("<div>").addClass("link");
    $("<div>").addClass("table1").droppable({
        activeClass : "active",
        hoverClass : "hover",
        accept: function(d) { return(on_table_accept(d, base, this, 1));},
        drop: function(event, ui) { on_table_drop(event, ui, base, this, 1);}
      }).appendTo(link);
    $("<div>").addClass("table2").droppable({
        activeClass : "active",
        hoverClass : "hover",
        accept: function(d) { return(on_table_accept(d, base, this, 2));},
        drop: function(event, ui) { on_table_drop(event, ui, base, this, 2);}
      }).appendTo(link);
    link.hide();
    link.appendTo("#" + base + " > .links");
    link.show("slow");
  }

  function lastempty(base) {
    if ($("#" + base + "> .links > div.link:last-child").find("div.table1column").length) return false;
    if ($("#" + base + "> .links > div.link:last-child").find("div.table2column").length) return false;
    return true;
  }
  function checkempty(base) {
    var divs =  $("#" + base + "> .links > div.link");
    var n = divs.length
    $("#" + base + "> .links > div.link").each(function(i, e) {
      if (!$("> div.table1 > div.table1column", e).length &&
          !$("> div.table2 > div.table2column", e).length && i < (n-1)) {
        $(e).hide('blind', {}, "slow", function() {
            $(this).remove();
          });
      }
    });
  }

  function create_link_page(base, data) {
    $("<div>").addClass("links").appendTo($("#" + base));
    var tablecolumns = $("<div>").addClass("tablecolumns").html(
      "<div class=\"table1columns\"></div>" +
      "<div class=\"table2columns\"></div>")
      .appendTo($("#" + base));
    $.each(data.t1, function(index, value) {
      $("<div>").addClass(base + "table1column").addClass("table1column").text(value)
        .appendTo($(".table1columns", tablecolumns)).draggable({
          revert : "invalid"
        });
    });
    $.each(data.t2, function(index, value) {
      $("<div>").addClass(base + "table2column").addClass("table2column").text(value)
        .appendTo($(".table2columns", tablecolumns)).draggable({
          revert : "invalid"
        });

    });
    newlinkdiv(base);
    $(".table1columns", tablecolumns).droppable({
      accept: "." + base + "table1column",
      activeClass : "active",
      hoverClass : "hover",
      drop: function(event, ui) { on_table_drop(event, ui, base, this, 1);}
    });
    $(".table2columns", tablecolumns).droppable({
      accept: "." + base + "table2column",
      activeClass : "active",
      hoverClass : "hover",
      drop: function(event, ui) { on_table_drop(event, ui, base, this, 2);}
    });
  }

  create_link_page(base, table);
}


