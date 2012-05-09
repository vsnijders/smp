<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />

    <title>StatMine</title>

    <!-- webpage icon -->
    <link type="text/css" href="css/ui_merge.css" rel="stylesheet" />
    <link rel="shortcut icon" href="img/favicon.ico" type="image/vnd.microsoft.icon" />
    <link rel="icon" href="img/favicon2.png" type="image/png" />


    <!-- jQuery includes -->
    <link type="text/css" href="css/smoothness/jquery-ui-1.8.17.custom.css" rel="stylesheet" />
    <script type="text/javascript" src="js/jquery-1.7.1.js"></script>
    <script type="text/javascript" src="js/jquery-ui-1.8.17.custom.min.js"></script>
    <script type="text/javascript" src="js/d3/d3.js"></script>
    <script type="text/javascript" src="js/merge.js"></script>
    

    <script type="text/javascript">
      var meta = {
          'table1' : {
              'columns' : {
                  'jaar' : [],
                  'sbi' : [],
                  'grootteklasse' : []
                }
            },
          'table2' : {
              'columns' : {
                  'jaar' : [],
                  'sbi' : [],
                  'grootteklasse' : [],
                  'oorzaak' : [],
                  'effect' : []
                }
            }
        }

      $(function(){
/*
          $.each(meta.table1.columns, function(index, value) {
              var div = $("<div class=\"dimension\">");
              div.html("<div class=\"dimhead\"><span>" + 
                index + 
                "</span><input type=\"text\"></input></div>");
              $("#merge").append(div);
            });
          $.each(meta.table2.columns, function(index, value) {
              var div = $("<div class=\"dimension\">");
              div.html("<h3>" + index + "</h3>");
              $("#merge").append(div);
            });
*/
        
        
           var tab1 = Table( "pop"
                   , ["Population"
                     ]
                   , [ Dimension("gender", ["male","female"])
                     , Dimension("year", [2001,2002])
                     ]
                   )

           var tab2 = Table( "inc"
                   , ["Income"
                     ]
                   , [ Dimension("gender", ["male","female"])
                     , Dimension("year", [2002, 2003])
                     ]
                   )

           var m = Merge(tab1, tab2);
           
           var merge = d3.select("#merge");
           
           var dimensions = merge.selectAll("div.dimension").data(d3.values(m.dims));
           
           dimensions.enter().append("div")
              .classed("dimension", true)
              .text(function(d) {return d.name;})
              ;
              
           dimensions.exit().remove();

        });
    </script>

  </head>
  <body>
   
  <header>
    <h1><a href="index.php">StatMine</a></h1>
  </header>
  <div id="navigation-container">
    <div id="navigation">
      <ul>
        <li><a href="index.php">Tables</a></li>
        <li><a href="help/index.php">Help</a></li>
      </ul>
    </div>
  </div>

  <article>
    <div class="menu">
    </div>

    <div class="content">
      <form id="merge">
      </form>
    </div>
  </article>

  <footer>
  </footer>

  </body>
</html>


