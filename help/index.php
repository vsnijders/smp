<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />

    <title>StatMine - help: basic use</title>

    <!-- webpage icon -->
    <link type="text/css" href="../css/ui.css" rel="stylesheet" />
    <link rel="shortcut icon" href="../img/favicon.ico" type="image/vnd.microsoft.icon" />
    <link rel="icon" href="../img/favicon2.png" type="image/png" />

    <!-- jQuery includes -->
    <link type="text/css" href="../css/smoothness/jquery-ui-1.8.17.custom.css" rel="stylesheet" />
    <script type="text/javascript" src="../js/jquery-1.7.1.js"></script>
    <script type="text/javascript" src="../js/jquery-ui-1.8.17.custom.min.js"></script>

  </head>
  <style>
   h2 {
     margin-top : 10px;
     margin-bottom : 10px;
     color : steelblue;
     font-size : 150%;
   }
   h3 {
     margin-top : 20px;
     margin-bottom : 5px;
     color : steelblue;
     font-size : 120%;
   }
   p {
     margin-top : 1em;
     margin-bottom : 1em;
     text-align : justify;
   }
   dt {
     font-weight : bold;
   }
   dd {
     margin-left : 3em;
   }
   li {
     margin-left : 2.5em;
     margin-top:0.5em;
     margin-bottom:0.5em;
   }
   div.menu h3 {
     margin-top : 5px;
     padding-bottom : 5px;
     border-bottom : 1px solid rgb(180, 180, 180);
   }
   div.menu a {
     font-weight : bold;
   }
   div.menu a:hover {
     color : black;
   }
   div.content {
     max-width : 500px;
   }
  </style>
  <body>
   
  <header>
    <h1><a href="../index.php">StatMine</a></h1>
  </header>
  <div id="navigation-container">
    <div id="navigation">
      <ul>
        <li><a href="../index.php">Tables</a></li>
        <li><a href="../help/index.php">Help</a></li>
      </ul>
    </div>
  </div>

  <article>
    <div class="menu">
      <h3><a href="index.php">Basic use</a></h3>
      <h3><a href="graph_types.php">Graph types</a></h3>
    </div>

    <div class="content">

      <h2>Basic use</h2>

      <p>The <a href="../index.php">start page</a> shows an overview of all tables that are
      available for visualisation in StatMine. Clicking on the title will open the visualisation
      page. The controls on the left side of this page can be used to create and modify a graph. On
      top four buttons are shown with which the graph type can be choosen. Each of the graph types
      has a number of graph variables which determine the appearance of the graph. For example, for
      a line graph one needs to specify an 'x' and 'y' variable. The <a
      href="graph_types.php">description of the graph types</a> shows for each graph the available
      graph variables and the meaning of those.</p>
      
      <h3>Selection of variables</h3>

      <p>Variables can be selected by dragging data variables to one of the graph variables and
      dropping them there. Two types of data variables are available: numerical and categorical. The
      categorical variables are used to define subpopulations. The numerical variables give
      numerical quantities for these subpopulations. For example, a table containing the number of
      males and females per municipality will probably (there are other formats possible) contain
      two categorical variables: gender and municipality, and one numerical variable: number of
      persons. In the graph page these variables are distinguished by there colour: green for
      categorical variables and yellow for numerical variables. The colours beneath the graph
      variables indicate wich type of data variable is needed for which graph variable.</p>

      <p>It is possible to place more than one variable on one of the graph variables. However, only
      the top one is used. The other ones are ignored.</p>
      
      <h3>Filtering</h3>

      <p>The categorical variables can be used to filter the table to select specific
      subpopulations. Clicking on the 'gear' icon at the right side of the categorical variables
      will open the filter window. Clicking again will close it. When it is opened categories can be
      selected. The selection is applied immediately and the graph is updated.</p>

      <p>The default when no category is selected depends whether or not the variables is in the
      'Variables' list at the bottom or in one of the graph variables above. In the first case the
      default category is the last one of the list. This is usually the total, except for time
      variables where it is usually the last period. When the data variable is placed in one of the
      graph variables, all categories are selected except the total (where available).</p>

      <p>Two things should be noted that will probably be resolved in a future version of
      StatMine:</p>
      <ol>
        <li>One should select only one category when a variable is in the 'variables' list below. At
        the moment it is possible to select more than one. However, this will result in incorrect
        graphs.</li>
        <li>The line graph requires a categorical variable for it 'x' graph variable. However, this
        should be a categorical variable which can be converted to numerical values such as
        year.</li>
      </ol>




    </div>
  </article>

  <footer>
  </footer>

  </body>
</html>



