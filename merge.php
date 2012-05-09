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


      $(function() {
        $("#merge").accordion({
            collapsible : true,
            autoHeight : false,
            active : false,
            header : 'div.foo'
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
        height : 25px;
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
            <option>Foo</option>
            <option>BarM</option>
          </select>
        </div>
        <div>
          FOO
        </div>

        <div class="foo table1column">
          <h3><a href="#">SBI</a></h3>
          <select class="no-event-bubble-up">
            <option>Foo</option>
            <option>BarM</option>
          </select>
        </div>
        <div>
          FOO
        </div>

        <div class="foo table1column">
          <h3><a href="#">Grootteklasse</a></h3>
          <select class="no-event-bubble-up">
            <option>Foo</option>
            <option>BarM</option>
          </select>
        </div>
        <div>
          FOO
        </div>

        <div class="foo table2column">
          <select class="no-event-bubble-up">
            <option>Foo</option>
            <option>BarM</option>
          </select>
          <h3><a href="#">Grootteklasse</a></h3>
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


