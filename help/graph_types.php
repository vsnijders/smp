<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />

    <title>StatMine - help: graph types</title>

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

      <h2>Graph types</h2>

      <h3>Line graph</h3>

      <p>A line graph can be used to plot the development of one variable against another variable.
      Usually time is plotted on the x-axis and the variable in whose development one is interested
      is plotted on the y-axis. It is possible to draw seperate lines for subgroups in different
      colours by selecting the variable that defines the subgroups for the 'colours' graph
      variable.</p>

      <dl>
      <dt>x</dt> <dd>the variable that is drawn on the x-axis. This should be a categorical variable whose
      categories can be transformed to numerical values, for example 'year'.</dd>
      <dt>y</dt> <dd>the variable that is drawn on the y-axis. This should be a numerical variable.</dd>
      <dt>colour</dt> <dd>a categorical variable that defines the different subgroups for which different
      coloured lines are drawn. (optional)</dd>
      <dt>row and column: see <a href="#sm">small multiples</a>. (optional)</dd>
      </dl>

      <h3>Bubble plot</h3>

      <p>Bubble plots can be used to investigate the relation between two or more variables. One
      numerical variable is plotted against another numerical variable. The first defined the
      y-coordinate of the points that are drawn, the second one defines the x-coordinate. The
      different points are defined using a third categorical variable for the 'colour' graph
      variable. The size of the points can be set by selecting a third numerical variable for the
      'size' graph variable.</p>

      <dl>
      <dt>x</dt> <dd>a numerical variable the defines the x-coordinate of the points.</dd>
      <dt>y</dt> <dd>a numerical variable the defines the y-coordinate of the points.</dd>
      <dt>colour</dt> <dd>a categorical variable that defines what the points represent. The points are drawn
      with different colours.</dd>
      <dt>size</dt> <dd>a numerical variable that defines the size of the points. The size of the points is
      proportional to the area of the points. (optional)</dd>
      <dt>row and column</dt> <dd>see <a href="#sm">small multiples</a>. (optional)</dd>
      </dl>

      <h3>Bar chart</h3>

      <p>A bar chart can be used to compare values for different groups against each other. A number
      of horizontal bars are drawn whose size can be set by selecting a numerical variable for the
      'size' graph variable. The individual bars are defined by selecting a categorical variable for
      the 'y' graph variable.</p>

      <dl>
      <dt>size</dt> <dd>a numerical variable that defines the size of the bar.</dd>
      <dt>y</dt> <dd>a categorical variable that defines what the bars represent.</dd>
      <dt>row and column</dt> <dd>see <a href="#sm">small multiples</a>. (optional)</dd>
      </dl>

      <h3>Mosaic plot</h3>

      <p>A mosaic plot can be used to investigate the dependence of two categorical variables on
      each other. One can see a mosaic plot as a visual representation of a contingency table where
      the size of the groups is represented using the size of rectangles. Two categorical variables
      need to be selected ('x' and 'y') defining the groups. A third numerical variable is needed
      for the size of the groups. First the x-axis is divided using the size of the groups defined
      by the 'x' graph variable. Each of the verical bars is then divided using the size of the
      subgroups defined by the 'y' graph variable.</p>

      <dl>
      <dt>x</dt> <dd>a categorical variable defining the groups on the x-axis.</dd>
      <dt>y</dt> <dd>a categorical variable defining the groups on the y-axis.</dd>
      <dt>size</dt> <dd>a numerical variable defining the size of the groups.</dd>
      <dt>row and column</dt> <dd>see <a href="#sm">small multiples</a>. (optional)</dd>
      </dl>

      <h3><a name="sm"></a>Small multiples</h3>

      <p>Small multiples can be used to each of the previous graph types and can be used to compare
      graphs between subgroups. For each subgroup a seperate graph is drawn. Beneath each other when
      using 'row' or next to each other using 'column', or both.</p>


    </div>
  </article>

  <footer>
  </footer>

  </body>
</html>



