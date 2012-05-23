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
                  'Jaar' : [],
                  'SBI' : [],
                  'Grootteklasse' : []
                }
            },
          'table2' : {
              'columns' : {
                  'Jaar' : [],
                  'SBI' : [],
                  'Grootteklasse' : [],
                  'Oorzaak' : [],
                  'Effect' : []
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
              .append("h3")
              .append("a")
              .text(function(d) {return d.name;})
              ;
              
           dimensions.exit().remove();
           
           dimensions.selectAll("select")
              .data(function(d){return d;})
              .enter()
              .append("select")
              .selectAll("options")
              .data(function(d){return d.categories;})
              .enter().append("option").text(function(d) {return d;})
              
           

        });

      $(function() {
        $("#merge").accordion({
            collapsible : true,
            autoHeight : false,
            active : false,
            header : 'div.foo'
          });
        $(".leaveout").change(function() {
            var foo = $(this).parent().parent().parent();
            $(".selectaggregate", $(this).parent().parent().parent()).toggle();
          });

    $(".no-event-bubble-up").each(function() {
      $(this).click(function(e) {
        e.stopPropagation();
      });
    });
      });
      
      
    </script>
    <style>
      
      /*DIV.dimensionheader {
        border : solid 1px blue;
        padding : 2pt 2pt;
      }
      DIV.dimension1, DIV.dimension2 {
        width : 49%;
        border : 1px solid yellow;
        padding : 2pt 0pt;
      }
      DIV.dimension1 { 
        float : left;
      }
      DIV.dimension2 {
        margin-left : 50%;
      }
      DIV.dimensionheader SELECT {
        width : 100%;
      }
      DIV.dimensionsettings {
        border : solid 1px red;
      }*/

      DIV.table1column SELECT {
        position : relative;
        left : 50%;
        top : -22px;
        width : 48%;
      }
      DIV.table2column H3 {
        position : relative;
        left : 50%;
        top : -23px;
        width : 48%;
        margin-left : -24.2px;
      }
      DIV.table2column SELECT {
        margin-top : 1px;
        margin-left : 24.2px;
      }
      DIV.foo {
        margin-top : 20px;
        height : 25px;
      }
      TD, TH {
        vertical-align : top;
      }
    </style>

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
      <div id="merge">

        <div class="foo table1column">
          <h3><a href="#">Jaar</a></h3>
          <select class="no-event-bubble-up">
            <option>Do not link with column in other table</option>
            <option>Jaar</option>
            <option>SBI</option>
            <option>Grootteklasse</option>
            <option>Oorzaak</option>
            <option>Effect</option>
          </select>
        </div>
        <div>
          <p>You haven't selected a column with which to link this column. How do you want this column to show up in
          the merged table?</p>
          <form>
            <table>
              <tr><td><input type="radio" class="leaveout" name="nt1d1"></td><td>
                  Leave column out of the merged table
                  <div class="selectaggregate">
                    <em>Use the following category as the selected aggregate:</em><br>
                    <table>
                      <tr><td><input type="radio" name="nt1d1c1"></td><td>2006</td</tr>
                      <tr><td><input type="radio" name="nt1d1c1"></td><td>2007</td</tr>
                      <tr><td><input type="radio" name="nt1d1c1"></td><td>2008</td</tr>
                      <tr><td><input type="radio" name="nt1d1c1"></td><td>2009</td</tr>
                      <tr><td><input type="radio" name="nt1d1c1"></td><td>2010</td</tr>
                      <tr><td><input type="radio" name="nt1d1c1"></td><td>2011</td</tr>
                    </table>
                  </div>
                </td></tr>
              <tr><td><input type="radio" class="leaveout" name="nt1d1"></td><td>Convert the column to variables</td></tr>
            </table>
          </form>
        </div>

        <div class="foo table1column">
          <h3><a href="#">SBI</a></h3>
          <select class="no-event-bubble-up">
            <option>Do not link with column in other table</option>
            <option>Jaar</option>
            <option>SBI</option>
            <option>Grootteklasse</option>
            <option>Oorzaak</option>
            <option>Effect</option>
          </select>
        </div>
        <div>
          FOO
        </div>

        <div class="foo table1column">
          <h3><a href="#">Grootteklasse</a></h3>
          <select class="no-event-bubble-up">
            <option>Do not link with column in other table</option>
            <option>Jaar</option>
            <option>SBI</option>
            <option>Grootteklasse</option>
            <option>Oorzaak</option>
            <option>Effect</option>
          </select>
        </div>
        <div>
          <table>
            <tr><td>Microbedrijf</td><td>
              <select>
                <option>Do not link category</option>
                <option>Microbedrijf</option>
                <option>Kleinbedrijf</option>
                <option>Middenbedrijf</option>
                <option>Grootbedrijf</option>
              </select>
            </td></tr>
            <tr><td>Kleinbedrijf</td><td>
              <select>
                <option>Do not link category</option>
                <option>Microbedrijf</option>
                <option>Kleinbedrijf</option>
                <option>Middenbedrijf</option>
                <option>Grootbedrijf</option>
              </select>
            </td></tr>
            <tr><td>Middenbedrijf</td><td>
              <select>
                <option>Do not link category</option>
                <option>Microbedrijf</option>
                <option>Kleinbedrijf</option>
                <option>Middenbedrijf</option>
                <option>Grootbedrijf</option>
              </select>
            </td></tr>
            <tr><td>Grootbedrijf</td><td>
              <select>
                <option>Do not link category</option>
                <option>Microbedrijf</option>
                <option>Kleinbedrijf</option>
                <option>Middenbedrijf</option>
                <option>Grootbedrijf</option>
              </select>
            </td></tr>
            <tr><td>
              <select>
                <option>Do not link category</option>
                <option>Microbedrijf</option>
                <option>Kleinbedrijf</option>
                <option>Middenbedrijf</option>
                <option>Grootbedrijf</option>
              </select>
              </td><td>Microbedrijf
            </td></tr>
            <tr><td>
              <select>
                <option>Do not link category</option>
                <option>Microbedrijf</option>
                <option>Kleinbedrijf</option>
                <option>Middenbedrijf</option>
                <option>Grootbedrijf</option>
              </select>
              </td><td>Kleinbedrijf
            </td></tr>
            <tr><td>
              <select>
                <option>Do not link category</option>
                <option>Microbedrijf</option>
                <option>Kleinbedrijf</option>
                <option>Middenbedrijf</option>
                <option>Grootbedrijf</option>
              </select>
              </td><td>Middenbedrijf
            </td></tr>
            <tr><td>
              <select>
                <option>Do not link category</option>
                <option>Microbedrijf</option>
                <option>Kleinbedrijf</option>
                <option>Middenbedrijf</option>
                <option>Grootbedrijf</option>
              </select>
              </td><td>Grootbedrijf
            </td></tr>
          </table>
        </div>

        <div class="foo table2column">
          <select class="no-event-bubble-up">
            <option>Do not link with column in other table</option>
            <option>Jaar</option>
            <option>SBI</option>
            <option>Grootteklasse</option>
          </select>
          <h3><a href="#">Jaar</a></h3>
        </div>
        <div>
          FOO
        </div>

        <div class="foo table2column">
          <select class="no-event-bubble-up">
            <option>Do not link with column in other table</option>
            <option>Jaar</option>
            <option>SBI</option>
            <option>Grootteklasse</option>
          </select>
          <h3><a href="#">SBI</a></h3>
        </div>
        <div>
          FOO
        </div>

        <div class="foo table2column">
          <select class="no-event-bubble-up">
            <option>Do not link with column in other table</option>
            <option>Jaar</option>
            <option>SBI</option>
            <option>Grootteklasse</option>
          </select>
          <h3><a href="#">Grootteklasse</a></h3>
        </div>
        <div>
          FOO
        </div>

        <div class="foo table2column">
          <select class="no-event-bubble-up">
            <option>Do not link with column in other table</option>
            <option>Jaar</option>
            <option>SBI</option>
            <option>Grootteklasse</option>
          </select>
          <h3><a href="#">Oorzaak</a></h3>
        </div>
        <div>
          FOO
        </div>

        <div class="foo table2column">
          <select class="no-event-bubble-up">
            <option>Do not link with column in other table</option>
            <option>Jaar</option>
            <option>SBI</option>
            <option>Grootteklasse</option>
          </select>
          <h3><a href="#">Effect</a></h3>
        </div>
        <div>
          FOO
        </div>

      </div>

  </article>

  <footer>
  </footer>

  </body>
</html>

