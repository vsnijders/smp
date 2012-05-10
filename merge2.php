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
      var m;

      $(function(){
           function dimCreate(selection){
           }
        
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
                   , [ Dimension("age", ["young","old"])
                     , Dimension("year", [2002, 2003])
                     ]
                   )

           m = Merge(tab1, tab2);
           
           function addOptions(selections, options, selected){

              var opts = selections.selectAll("option")
                    .data(options);
                    
              opts.enter()
                  .append("option")
                  .text(function(d){return d;})
                  ;
              opts.exit().remove();
              
              opts.filter(function(d) {return d == selected}).attr("selected", true);
           }
           
           var merge = d3.select("#merge");
           
           var dimensions = merge.selectAll("div.dimension").data(d3.values(m.dims));
           
           dimensions.enter().append("div")
              .classed("dimension", true)
              .each( function(d,i){
              
                 var dim = d3.select(this);
                 var dimmerged = dim.append("div")
                   .classed("merged", true)
                   .append("h3") 
                     .append("a")
                        .text(function(d) {return d.name;})
                 
                 var cats = dim.append("div")
                   .classed("categories", true)
                   .append("table")
                   ;

                /*                   
                 cats.append("tr");
                   .data()
                */
                 cats.selectAll("tr.category")
                      .data(d.categories)
                      .enter()
                      .append("tr")
                      .classed("category", true)
                      .classed("odd", function(d,i){ return i%2;})
                      .each(function(d,i){
                         var tr = d3.select(this);
                         tr.append("th").append("input").attr("value", d.name);
                         tr.append("th").append("input").attr("value", d.from[0]);
                         tr.append("th").append("input").attr("value", d.from[1]);
                       })
              })
              ;
              
           dimensions.exit().remove();
          
        });

      $(function() {
        $("#merge").accordion({
            collapsible : true,
            autoHeight : false,
            active : false,
            header : 'div.merged'
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
      DIV.merged {
        height : 25px;
      }
      
      DIV.merged SELECT, DIV.merged label {
         position: relative;
         top: -22px;
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
      
        <div class="merged">
          <h3><a href="#">Jaar</a></h3>
        </div>
        <div>
         <table>
           <tr>
              <th></th>
              <th>
               <label>table 1:</label>
               <select>
                  <option ></option>
                  <option selected="true">year</option>
               </select>
              </th>
              <th>table 2</th>
           </tr>
           <tr class="category">
             <td><label>cat 1</label><input value="bla"></td>
             <td><input value="bla"></td>
             <td><input value="bla"></td>
           <tr>
         </table>
        </div>


      </div>
    </div>

  </article>

  <footer>
  </footer>

  </body>
</html>

