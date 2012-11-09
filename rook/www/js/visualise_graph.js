
      var mapping = Mapping();

<?php
  echo "      var variables = {";
  $first = true;
  foreach ($meta['idvariables'] as $variable) {
    if ($first) $first = false;
    else echo ",";
    echo $variable . ' : "categorical"';
  }
  foreach ($meta['measurevariables'] as $variable) {
    if ($first) $first = false;
    else echo ",";
    echo $variable . ' : "numerical"';
  }
  echo "      };\n";
?>

      function redraw_graph() {
        var validated = false;
        if (graphtype == "bar") {
          validated = validate_bar(selection, variables);
        } else if (graphtype == "mosaic") {
          validated = validate_mosaic(selection, variables);
        } else if (graphtype == "scatter") {
          validated = validate_bubble(selection, variables);
        } else if (graphtype == "line") {
          validated = validate_line(selection, variables);
        } 
        if (validated === true) {
          <?php if (isset($_REQUEST['echo'])): ?>
          $("#graphtype").html("<b>" + graphtype + "</b>");
          $("#graphdata").load("ui_fetch.php?html=1", selection);
          <?php endif; ?>
          jQuery.getJSON("ui_fetch.php", selection, function(data) {
            mapping.refresh(data);
            update_caption();
            drawchart(data,selection, variables, mapping, graphtype);
            /*
            if (graphtype == "bar") {
              draw_bar(data, selection, variables, mapping);
            } else if (graphtype == "mosaic") {
              draw_mosaic(data, selection, variables);
            } else if (graphtype == "bubble") {
              draw_bubble(data, selection, variables);
            } else if (graphtype == "line") {
              draw_line(data, selection, variables);
            } else {
              d3.select(".chart").remove();
            } */
          })
        } else {
          $(".graph").html("<p>" + validated + "</p>");
        }
      }

      function update_caption() {
        var caption = "<p>The following selection is applied to this graph:</p><table>";
        var is_filtered = false;
        for (var variable in selection.filter_text) {
          if (variable === 'length' || !selection.filter_text.hasOwnProperty(variable)) 
            continue;
          is_filtered = true;
          var filter = selection.filter_text[variable];
          caption += "<tr><td>" + variable + ": </td><td class='value'>" + filter.join(', ') + "</td>";
        }
        caption += "</table>";
        if (is_filtered) $('#caption').html(caption);
      }

      $(function() {
        $(".connectedSortable").sortable({
          connectWith: ".connectedSortable",
          update : function(event, ui) { 
            if (this.id != "variables") {
              refresh_selection();
              redraw_graph();
            }
          }
        }).disableSelection();
      });

      refresh_selection = function() {
	    mapping.resetVariables();
        // update the selection itself
        $('.plotvariable ul').each(function() {
          var category = this.id;
          selection[category] = [];
        });
        $('.plotvariable li').each(function() {
          var variable = this.id;
          var category = this.parentNode.id;
          // only use the first variable in a category
          if (selection[category].length == 0){ 
		     selection[category].push(variable);
			 mapping.map()[category]
			    .variable(variable, variables[variable]);
			 if (variable == "Year" ||  variable == "Jaar"){
			    mapping.map()[category].type("time");
			 }
		  }
        });
        // update the filter
        selection.filter = {}
        $(".filter:checked").each(function() {
          var value = this.value;
          var variable = this.name;
          var value_text = this.parentNode.textContent
          if (selection.filter[variable] === undefined) {
            selection.filter[variable] = [];
            selection.filter_text[variable] = [];
          }
          selection.filter[variable].push(value);
          selection.filter_text[variable].push(value_text);
          return (true);
        }) ;
      }

      $(function() {
        $("#graph").buttonset();
        $("#graph input").click(function() {
          graphtype = this.id;
          var sel = $('.plotvariable').not('.' + graphtype);
          $('li', sel).appendTo('#variables');
          sel.hide();
          $('.' + graphtype).show();
          refresh_selection();
          redraw_graph();
        })
      });


      $(function(){
        $('.collapse').click(function() {
          $(this).next().toggle('slow');
          return false;
        }).next().hide();
      });

      $(function(){
        $('.filter').change(function() {
          refresh_selection();
          redraw_graph();
        });
      });

      $(function() {
        $('#resizable').resizable({
          minHeight: 300,
          minWidth: 300,
          stop: function(event, ui) { 
            redraw_graph(); 
          }
        }).width("90%");
      });

      $(function() {
        $("#<?php echo $meta['default_graph']['type'];?>").click();
      });
