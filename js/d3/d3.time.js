


<!DOCTYPE html>
<html>
  <head>
    <meta charset='utf-8'>
    <meta http-equiv="X-UA-Compatible" content="chrome=1">
        <title>d3.time.min.js at master from mbostock/d3 - GitHub</title>
    <link rel="search" type="application/opensearchdescription+xml" href="/opensearch.xml" title="GitHub" />
    <link rel="fluid-icon" href="https://github.com/fluidicon.png" title="GitHub" />

    
    

    <meta content="authenticity_token" name="csrf-param" />
<meta content="dFkfAQdZywjGpa8utYPKbRSYckg16hg0RMRoZvE/4WI=" name="csrf-token" />

    <link href="https://a248.e.akamai.net/assets.github.com/stylesheets/bundles/github-4a66179db6f6804b8f0d60c4bb581271fadd27cb.css" media="screen" rel="stylesheet" type="text/css" />
    

    <script src="https://a248.e.akamai.net/assets.github.com/javascripts/bundles/jquery-e46225f266eba00902b2e5b66fe6fe6a484fb242.js" type="text/javascript"></script>
    <script src="https://a248.e.akamai.net/assets.github.com/javascripts/bundles/github-a6e5ad89d200a038912bb6e9cb13215234fa1498.js" type="text/javascript"></script>
    

      <link rel='permalink' href='/mbostock/d3/blob/f67e89597db87f017c3d4706448ebe3ff8528853/d3.time.min.js'>

    <meta name="description" content="d3 - A JavaScript visualization library for HTML and SVG." />
  <link href="https://github.com/mbostock/d3/commits/master.atom" rel="alternate" title="Recent Commits to d3:master" type="application/atom+xml" />

  </head>


  <body class="logged_in page-blob windows vis-public env-production ">
    


    

      <div id="header" class="true clearfix">
        <div class="container clearfix">
          <a class="site-logo" href="https://github.com/">
            <!--[if IE]>
            <img alt="GitHub" class="github-logo" src="https://a248.e.akamai.net/assets.github.com/images/modules/header/logov7.png?1323882736" />
            <img alt="GitHub" class="github-logo-hover" src="https://a248.e.akamai.net/assets.github.com/images/modules/header/logov7-hover.png?1324325373" />
            <![endif]-->
            <img alt="GitHub" class="github-logo-4x" height="30" src="https://a248.e.akamai.net/assets.github.com/images/modules/header/logov7@4x.png?1323882736" />
            <img alt="GitHub" class="github-logo-4x-hover" height="30" src="https://a248.e.akamai.net/assets.github.com/images/modules/header/logov7@4x-hover.png?1324325373" />
          </a>

              
    <div class="topsearch ">
<form action="/search" id="top_search_form" method="get">        <a href="/search" class="advanced-search tooltipped downwards" title="Advanced Search">Advanced Search</a>
        <div class="search placeholder-field js-placeholder-field">
          <label class="placeholder" for="global-search-field">Search…</label>
          <input type="text" class="search my_repos_autocompleter" id="global-search-field" name="q" results="5" /> <input type="submit" value="Search" class="button" />
        </div>
        <input type="hidden" name="type" value="Everything" />
        <input type="hidden" name="repo" value="" />
        <input type="hidden" name="langOverride" value="" />
        <input type="hidden" name="start_value" value="1" />
</form>      <ul class="top-nav">
          <li class="explore"><a href="https://github.com/explore">Explore</a></li>
          <li><a href="https://gist.github.com">Gist</a></li>
          <li><a href="/blog">Blog</a></li>
        <li><a href="http://help.github.com">Help</a></li>
      </ul>
    </div>


            


  <div id="userbox">
    <div id="user">
      <a href="https://github.com/edwindj"><img height="20" src="https://secure.gravatar.com/avatar/0d073168988cf547aded3ac1ca2c0d3a?s=140&amp;d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-140.png" width="20" /></a>
      <a href="https://github.com/edwindj" class="name">edwindj</a>
    </div>
    <ul id="user-links">
      <li>
        <a href="/inbox/notifications" id="notifications" class="tooltipped downwards" title="Notifications">
          <span class="icon">Notifications</span>
          <span class="unread_count">4</span>
        </a>
      </li>
      <li><a href="/account" id="settings" class="tooltipped downwards" title="Account Settings"><span class="icon">Account Settings</span></a></li>
      <li><a href="/logout" id="logout" class="tooltipped downwards" title="Log Out"><span class="icon">Log Out</span></a></li>
    </ul>
  </div>



          
        </div>
      </div>

      

            <div class="site">
      <div class="container">
        <div class="pagehead repohead instapaper_ignore readability-menu">


        <div class="title-actions-bar">
          <h1>
            <a href="/mbostock">mbostock</a> /
            <strong><a href="/mbostock/d3" class="js-current-repository">d3</a></strong>
          </h1>
          



              <ul class="pagehead-actions">


          <li class="js-toggler-container watch-button-container on">
            <a href="/mbostock/d3/toggle_watch" class="minibutton btn-watch watch-button js-toggler-target" data-method="post" data-remote="true" rel="nofollow"><span><span class="icon"></span>Watch</span></a>
            <a href="/mbostock/d3/toggle_watch" class="minibutton btn-watch unwatch-button js-toggler-target" data-method="post" data-remote="true" rel="nofollow"><span><span class="icon"></span>Unwatch</span></a>
          </li>

              <li><a href="/edwindj/d3" class="minibutton btn-fork "><span><span class="icon"></span>Your Fork</span></a></li>



      <li class="repostats">
        <ul class="repo-stats">
          <li class="watchers watching">
            <a href="/mbostock/d3/watchers" title="Watchers — You're Watching" class="tooltipped downwards">
              3,266
            </a>
          </li>
          <li class="forks">
            <a href="/mbostock/d3/network" title="Forks - You have a fork" class="tooltipped downwards">
              366
            </a>
          </li>
        </ul>
      </li>
    </ul>

        </div>

          

  <ul class="tabs">
    <li><a href="/mbostock/d3" class="selected" highlight="repo_sourcerepo_downloadsrepo_commitsrepo_tagsrepo_branches">Code</a></li>
    <li><a href="/mbostock/d3/network" highlight="repo_networkrepo_fork_queue">Network</a>
    <li><a href="/mbostock/d3/pulls" highlight="repo_pulls">Pull Requests <span class='counter'>15</span></a></li>

      <li><a href="/mbostock/d3/issues" highlight="repo_issues">Issues <span class='counter'>60</span></a></li>

      <li><a href="/mbostock/d3/wiki" highlight="repo_wiki">Wiki <span class='counter'>46</span></a></li>

    <li><a href="/mbostock/d3/graphs" highlight="repo_graphsrepo_contributors">Stats &amp; Graphs</a></li>

  </ul>

  
<div class="frame frame-center tree-finder" style="display:none"
      data-tree-list-url="/mbostock/d3/tree-list/f67e89597db87f017c3d4706448ebe3ff8528853"
      data-blob-url-prefix="/mbostock/d3/blob/f67e89597db87f017c3d4706448ebe3ff8528853"
    >

  <div class="breadcrumb">
    <b><a href="/mbostock/d3">d3</a></b> /
    <input class="tree-finder-input js-navigation-enable" type="text" name="query" autocomplete="off" spellcheck="false">
  </div>

    <div class="octotip">
      <p>
        <a href="/mbostock/d3/dismiss-tree-finder-help" class="dismiss js-dismiss-tree-list-help" title="Hide this notice forever" rel="nofollow">Dismiss</a>
        <strong>Octotip:</strong> You've activated the <em>file finder</em>
        by pressing <span class="kbd">t</span> Start typing to filter the
        file list. Use <span class="kbd badmono">↑</span> and
        <span class="kbd badmono">↓</span> to navigate,
        <span class="kbd">enter</span> to view files.
      </p>
    </div>

  <table class="tree-browser" cellpadding="0" cellspacing="0">
    <tr class="js-header"><th>&nbsp;</th><th>name</th></tr>
    <tr class="js-no-results no-results" style="display: none">
      <th colspan="2">No matching files</th>
    </tr>
    <tbody class="js-results-list js-navigation-container" data-navigation-enable-mouse>
    </tbody>
  </table>
</div>

<div id="jump-to-line" style="display:none">
  <h2>Jump to Line</h2>
  <form>
    <input class="textfield" type="text">
    <div class="full-button">
      <button type="submit" class="classy">
        <span>Go</span>
      </button>
    </div>
  </form>
</div>


<div class="subnav-bar">

  <ul class="actions">
    
      <li class="switcher">

        <div class="context-menu-container js-menu-container">
          <span class="text">Current branch:</span>
          <a href="#"
             class="minibutton bigger switcher context-menu-button js-menu-target js-commitish-button btn-branch repo-tree"
             data-master-branch="master"
             data-ref="master">
            <span><span class="icon"></span>master</span>
          </a>

          <div class="context-pane commitish-context js-menu-content">
            <a href="javascript:;" class="close js-menu-close"></a>
            <div class="context-title">Switch Branches/Tags</div>
            <div class="context-body pane-selector commitish-selector js-filterable-commitishes">
              <div class="filterbar">
                <div class="placeholder-field js-placeholder-field">
                  <label class="placeholder" for="context-commitish-filter-field" data-placeholder-mode="sticky">Filter branches/tags</label>
                  <input type="text" id="context-commitish-filter-field" class="commitish-filter" />
                </div>

                <ul class="tabs">
                  <li><a href="#" data-filter="branches" class="selected">Branches</a></li>
                  <li><a href="#" data-filter="tags">Tags</a></li>
                </ul>
              </div>

                <div class="commitish-item branch-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/adopt/d3.time.min.js" data-name="adopt" rel="nofollow">adopt</a>
                  </h4>
                </div>
                <div class="commitish-item branch-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/force-tick/d3.time.min.js" data-name="force-tick" rel="nofollow">force-tick</a>
                  </h4>
                </div>
                <div class="commitish-item branch-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/gh-pages/d3.time.min.js" data-name="gh-pages" rel="nofollow">gh-pages</a>
                  </h4>
                </div>
                <div class="commitish-item branch-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/impact/d3.time.min.js" data-name="impact" rel="nofollow">impact</a>
                  </h4>
                </div>
                <div class="commitish-item branch-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/map/d3.time.min.js" data-name="map" rel="nofollow">map</a>
                  </h4>
                </div>
                <div class="commitish-item branch-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/master/d3.time.min.js" data-name="master" rel="nofollow">master</a>
                  </h4>
                </div>
                <div class="commitish-item branch-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/mekko/d3.time.min.js" data-name="mekko" rel="nofollow">mekko</a>
                  </h4>
                </div>
                <div class="commitish-item branch-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/qq/d3.time.min.js" data-name="qq" rel="nofollow">qq</a>
                  </h4>
                </div>
                <div class="commitish-item branch-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/radar/d3.time.min.js" data-name="radar" rel="nofollow">radar</a>
                  </h4>
                </div>
                <div class="commitish-item branch-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/scatter/d3.time.min.js" data-name="scatter" rel="nofollow">scatter</a>
                  </h4>
                </div>
                <div class="commitish-item branch-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/stagger/d3.time.min.js" data-name="stagger" rel="nofollow">stagger</a>
                  </h4>
                </div>

                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v2.7.3/d3.time.min.js" data-name="v2.7.3" rel="nofollow">v2.7.3</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v2.7.2/d3.time.min.js" data-name="v2.7.2" rel="nofollow">v2.7.2</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v2.7.1/d3.time.min.js" data-name="v2.7.1" rel="nofollow">v2.7.1</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v2.7.0/d3.time.min.js" data-name="v2.7.0" rel="nofollow">v2.7.0</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v2.6.1/d3.time.min.js" data-name="v2.6.1" rel="nofollow">v2.6.1</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v2.6.0/d3.time.min.js" data-name="v2.6.0" rel="nofollow">v2.6.0</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v2.5.2/d3.time.min.js" data-name="v2.5.2" rel="nofollow">v2.5.2</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v2.5.1/d3.time.min.js" data-name="v2.5.1" rel="nofollow">v2.5.1</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v2.5.0/d3.time.min.js" data-name="v2.5.0" rel="nofollow">v2.5.0</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v2.4.6/d3.time.min.js" data-name="v2.4.6" rel="nofollow">v2.4.6</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v2.4.5/d3.time.min.js" data-name="v2.4.5" rel="nofollow">v2.4.5</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v2.4.4/d3.time.min.js" data-name="v2.4.4" rel="nofollow">v2.4.4</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v2.4.3/d3.time.min.js" data-name="v2.4.3" rel="nofollow">v2.4.3</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v2.4.2/d3.time.min.js" data-name="v2.4.2" rel="nofollow">v2.4.2</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v2.4.1/d3.time.min.js" data-name="v2.4.1" rel="nofollow">v2.4.1</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v2.4.0/d3.time.min.js" data-name="v2.4.0" rel="nofollow">v2.4.0</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v2.3.4/d3.time.min.js" data-name="v2.3.4" rel="nofollow">v2.3.4</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v2.3.3/d3.time.min.js" data-name="v2.3.3" rel="nofollow">v2.3.3</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v2.3.2/d3.time.min.js" data-name="v2.3.2" rel="nofollow">v2.3.2</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v2.3.1/d3.time.min.js" data-name="v2.3.1" rel="nofollow">v2.3.1</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v2.3.0/d3.time.min.js" data-name="v2.3.0" rel="nofollow">v2.3.0</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v2.2.1/d3.time.min.js" data-name="v2.2.1" rel="nofollow">v2.2.1</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v2.2.0/d3.time.min.js" data-name="v2.2.0" rel="nofollow">v2.2.0</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v2.1.3/d3.time.min.js" data-name="v2.1.3" rel="nofollow">v2.1.3</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v2.1.2/d3.time.min.js" data-name="v2.1.2" rel="nofollow">v2.1.2</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v2.1.1/d3.time.min.js" data-name="v2.1.1" rel="nofollow">v2.1.1</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v2.1.0/d3.time.min.js" data-name="v2.1.0" rel="nofollow">v2.1.0</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v2.0.4/d3.time.min.js" data-name="v2.0.4" rel="nofollow">v2.0.4</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v2.0.3/d3.time.min.js" data-name="v2.0.3" rel="nofollow">v2.0.3</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v2.0.2/d3.time.min.js" data-name="v2.0.2" rel="nofollow">v2.0.2</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v2.0.1/d3.time.min.js" data-name="v2.0.1" rel="nofollow">v2.0.1</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v2.0.0/d3.time.min.js" data-name="v2.0.0" rel="nofollow">v2.0.0</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.29.7/d3.time.min.js" data-name="v1.29.7" rel="nofollow">v1.29.7</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.29.6/d3.time.min.js" data-name="v1.29.6" rel="nofollow">v1.29.6</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.29.5/d3.time.min.js" data-name="v1.29.5" rel="nofollow">v1.29.5</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.29.4/d3.time.min.js" data-name="v1.29.4" rel="nofollow">v1.29.4</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.29.3/d3.time.min.js" data-name="v1.29.3" rel="nofollow">v1.29.3</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.29.2/d3.time.min.js" data-name="v1.29.2" rel="nofollow">v1.29.2</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.29.1/d3.time.min.js" data-name="v1.29.1" rel="nofollow">v1.29.1</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.29.0/d3.time.min.js" data-name="v1.29.0" rel="nofollow">v1.29.0</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.28.1/d3.time.min.js" data-name="v1.28.1" rel="nofollow">v1.28.1</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.28.0/d3.time.min.js" data-name="v1.28.0" rel="nofollow">v1.28.0</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.27.2/d3.time.min.js" data-name="v1.27.2" rel="nofollow">v1.27.2</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.27.1/d3.time.min.js" data-name="v1.27.1" rel="nofollow">v1.27.1</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.27.0/d3.time.min.js" data-name="v1.27.0" rel="nofollow">v1.27.0</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.26.0/d3.time.min.js" data-name="v1.26.0" rel="nofollow">v1.26.0</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.25.0/d3.time.min.js" data-name="v1.25.0" rel="nofollow">v1.25.0</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.24.1/d3.time.min.js" data-name="v1.24.1" rel="nofollow">v1.24.1</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.24.0/d3.time.min.js" data-name="v1.24.0" rel="nofollow">v1.24.0</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.23.0/d3.time.min.js" data-name="v1.23.0" rel="nofollow">v1.23.0</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.22.1/d3.time.min.js" data-name="v1.22.1" rel="nofollow">v1.22.1</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.22.0/d3.time.min.js" data-name="v1.22.0" rel="nofollow">v1.22.0</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.21.0/d3.time.min.js" data-name="v1.21.0" rel="nofollow">v1.21.0</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.20.3/d3.time.min.js" data-name="v1.20.3" rel="nofollow">v1.20.3</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.20.2/d3.time.min.js" data-name="v1.20.2" rel="nofollow">v1.20.2</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.20.1/d3.time.min.js" data-name="v1.20.1" rel="nofollow">v1.20.1</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.20.0/d3.time.min.js" data-name="v1.20.0" rel="nofollow">v1.20.0</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.19.1/d3.time.min.js" data-name="v1.19.1" rel="nofollow">v1.19.1</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.19.0/d3.time.min.js" data-name="v1.19.0" rel="nofollow">v1.19.0</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.18.0/d3.time.min.js" data-name="v1.18.0" rel="nofollow">v1.18.0</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.17.1/d3.time.min.js" data-name="v1.17.1" rel="nofollow">v1.17.1</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.17.0/d3.time.min.js" data-name="v1.17.0" rel="nofollow">v1.17.0</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.16.0/d3.time.min.js" data-name="v1.16.0" rel="nofollow">v1.16.0</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.15.1/d3.time.min.js" data-name="v1.15.1" rel="nofollow">v1.15.1</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.15.0/d3.time.min.js" data-name="v1.15.0" rel="nofollow">v1.15.0</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.14.2/d3.time.min.js" data-name="v1.14.2" rel="nofollow">v1.14.2</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.14.1/d3.time.min.js" data-name="v1.14.1" rel="nofollow">v1.14.1</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.14.0/d3.time.min.js" data-name="v1.14.0" rel="nofollow">v1.14.0</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.13.4/d3.time.min.js" data-name="v1.13.4" rel="nofollow">v1.13.4</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.13.3/d3.time.min.js" data-name="v1.13.3" rel="nofollow">v1.13.3</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.13.2/d3.time.min.js" data-name="v1.13.2" rel="nofollow">v1.13.2</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.13.1/d3.time.min.js" data-name="v1.13.1" rel="nofollow">v1.13.1</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.13.0/d3.time.min.js" data-name="v1.13.0" rel="nofollow">v1.13.0</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.12.0/d3.time.min.js" data-name="v1.12.0" rel="nofollow">v1.12.0</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.11.1/d3.time.min.js" data-name="v1.11.1" rel="nofollow">v1.11.1</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.11.0/d3.time.min.js" data-name="v1.11.0" rel="nofollow">v1.11.0</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.10.1/d3.time.min.js" data-name="v1.10.1" rel="nofollow">v1.10.1</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.10.0/d3.time.min.js" data-name="v1.10.0" rel="nofollow">v1.10.0</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.9.1/d3.time.min.js" data-name="v1.9.1" rel="nofollow">v1.9.1</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.9.0/d3.time.min.js" data-name="v1.9.0" rel="nofollow">v1.9.0</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.8.5/d3.time.min.js" data-name="v1.8.5" rel="nofollow">v1.8.5</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.8.4/d3.time.min.js" data-name="v1.8.4" rel="nofollow">v1.8.4</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.8.3/d3.time.min.js" data-name="v1.8.3" rel="nofollow">v1.8.3</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.8.2/d3.time.min.js" data-name="v1.8.2" rel="nofollow">v1.8.2</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.8.1/d3.time.min.js" data-name="v1.8.1" rel="nofollow">v1.8.1</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.8.0/d3.time.min.js" data-name="v1.8.0" rel="nofollow">v1.8.0</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.7.0/d3.time.min.js" data-name="v1.7.0" rel="nofollow">v1.7.0</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.6.1/d3.time.min.js" data-name="v1.6.1" rel="nofollow">v1.6.1</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.6.0/d3.time.min.js" data-name="v1.6.0" rel="nofollow">v1.6.0</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.5.3/d3.time.min.js" data-name="v1.5.3" rel="nofollow">v1.5.3</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.5.2/d3.time.min.js" data-name="v1.5.2" rel="nofollow">v1.5.2</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.5.1/d3.time.min.js" data-name="v1.5.1" rel="nofollow">v1.5.1</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.5.0/d3.time.min.js" data-name="v1.5.0" rel="nofollow">v1.5.0</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.4.0/d3.time.min.js" data-name="v1.4.0" rel="nofollow">v1.4.0</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.3.0/d3.time.min.js" data-name="v1.3.0" rel="nofollow">v1.3.0</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.2.1/d3.time.min.js" data-name="v1.2.1" rel="nofollow">v1.2.1</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.2.0/d3.time.min.js" data-name="v1.2.0" rel="nofollow">v1.2.0</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.1.0/d3.time.min.js" data-name="v1.1.0" rel="nofollow">v1.1.0</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.0.3/d3.time.min.js" data-name="v1.0.3" rel="nofollow">v1.0.3</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.0.2/d3.time.min.js" data-name="v1.0.2" rel="nofollow">v1.0.2</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.0.1/d3.time.min.js" data-name="v1.0.1" rel="nofollow">v1.0.1</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.0.0/d3.time.min.js" data-name="v1.0.0" rel="nofollow">v1.0.0</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/semver/d3.time.min.js" data-name="semver" rel="nofollow">semver</a>
                  </h4>
                </div>

              <div class="no-results" style="display:none">Nothing to show</div>
            </div>
          </div><!-- /.commitish-context-context -->
        </div>

      </li>
  </ul>

  <ul class="subnav">
    <li><a href="/mbostock/d3" class="selected" highlight="repo_source">Files</a></li>
    <li><a href="/mbostock/d3/commits/master" highlight="repo_commits">Commits</a></li>
    <li><a href="/mbostock/d3/branches" class="" highlight="repo_branches" rel="nofollow">Branches <span class="counter">11</span></a></li>
    <li><a href="/mbostock/d3/tags" class="" highlight="repo_tags">Tags <span class="counter">103</span></a></li>
    <li><a href="/mbostock/d3/downloads" class="blank" highlight="repo_downloads">Downloads <span class="counter">0</span></a></li>
  </ul>

</div>

  
  
  


          

        </div><!-- /.repohead -->

        




  
  <p class="last-commit">Latest commit to the <strong>master</strong> branch</p>

<div class="commit commit-tease js-details-container">
  <p class="commit-title ">
      <a href="/mbostock/d3/commit/f67e89597db87f017c3d4706448ebe3ff8528853" class="message">Expand the default custom build.</a>
      
  </p>
  <div class="commit-meta">
    <a href="/mbostock/d3/commit/f67e89597db87f017c3d4706448ebe3ff8528853" class="sha-block">commit <span class="sha">f67e89597d</span></a>

    <div class="authorship">
      <img class="gravatar" height="20" src="https://secure.gravatar.com/avatar/005a27e09fe946ebef64bf4d134efc0a?s=140&amp;d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-140.png" width="20" />
      <span class="author-name"><a href="/mbostock">mbostock</a></span>
      authored <time class="js-relative-date" datetime="2012-01-26T11:58:40-08:00" title="2012-01-26 11:58:40">January 26, 2012</time>

    </div>
  </div>
</div>


<!-- block_view_fragment_key: views4/v8/blob:v15:943149:mbostock/d3:73cd761d1f4b0082eb35138c04caac4aa0d408b0:af6a3d01aea14da7537c88eeb8f438cb -->
  <div id="slider">

    <div class="breadcrumb" data-path="d3.time.min.js/">
      <b><a href="/mbostock/d3/tree/f67e89597db87f017c3d4706448ebe3ff8528853" class="js-rewrite-sha">d3</a></b> / d3.time.min.js       <span style="display:none" id="clippy_438" class="clippy-text">d3.time.min.js</span>
      
      <object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"
              width="110"
              height="14"
              class="clippy"
              id="clippy" >
      <param name="movie" value="https://a248.e.akamai.net/assets.github.com/flash/clippy.swf?1315937507?v5"/>
      <param name="allowScriptAccess" value="always" />
      <param name="quality" value="high" />
      <param name="scale" value="noscale" />
      <param NAME="FlashVars" value="id=clippy_438&amp;copied=copied!&amp;copyto=copy to clipboard">
      <param name="bgcolor" value="#FFFFFF">
      <param name="wmode" value="opaque">
      <embed src="https://a248.e.akamai.net/assets.github.com/flash/clippy.swf?1315937507?v5"
             width="110"
             height="14"
             name="clippy"
             quality="high"
             allowScriptAccess="always"
             type="application/x-shockwave-flash"
             pluginspage="http://www.macromedia.com/go/getflashplayer"
             FlashVars="id=clippy_438&amp;copied=copied!&amp;copyto=copy to clipboard"
             bgcolor="#FFFFFF"
             wmode="opaque"
      />
      </object>
      

    </div>

    <div class="frames">
      <div class="frame frame-center" data-path="d3.time.min.js/" data-permalink-url="/mbostock/d3/blob/f67e89597db87f017c3d4706448ebe3ff8528853/d3.time.min.js" data-title="d3.time.min.js at f67e89597db87f017c3d4706448ebe3ff8528853 from mbostock/d3 - GitHub" data-type="blob">
          <ul class="big-actions">
            <li><a class="file-edit-link minibutton js-rewrite-sha" href="/mbostock/d3/edit/f67e89597db87f017c3d4706448ebe3ff8528853/d3.time.min.js" data-method="post" rel="nofollow"><span>Edit this file</span></a></li>
          </ul>

        <div id="files" class="bubble">
          <div class="file">
            <div class="meta">
              <div class="info">
                <span class="icon"><img alt="Txt" height="16" src="https://a248.e.akamai.net/assets.github.com/images/icons/txt.png?1315937507" width="16" /></span>
                <span class="mode" title="File Mode">100644</span>
                  <span>1 lines (1 sloc)</span>
                <span>11.042 kb</span>
              </div>
              <ul class="actions">
                <li><a href="/mbostock/d3/raw/f67e89597db87f017c3d4706448ebe3ff8528853/d3.time.min.js" id="raw-url">raw</a></li>
                  <li><a href="/mbostock/d3/blame/f67e89597db87f017c3d4706448ebe3ff8528853/d3.time.min.js">blame</a></li>
                <li><a href="/mbostock/d3/commits/f67e89597db87f017c3d4706448ebe3ff8528853/d3.time.min.js" rel="nofollow">history</a></li>
              </ul>
            </div>
              <div class="data type-javascript">
      <table cellpadding="0" cellspacing="0" class="lines">
        <tr>
          <td>
            <pre class="line_numbers"><span id="L1" rel="#L1">1</span>
</pre>
          </td>
          <td width="100%">
                <div class="highlight"><pre><div class='line' id='LC1'>(function(){function b(a,b,c,d){var e,f,g=0,i=b.length,j=c.length;while(g&lt;i){if(d&gt;=j)return-1;e=b.charCodeAt(g++);if(e==37){f=h[b.charAt(g++)];if(!f||(d=f(a,c,d))&lt;0)return-1}else if(e!=c.charCodeAt(d++))return-1}return d}function i(a,b,c){return b.substring(c,c+=3).toLowerCase()in j?c:-1}function k(a,b,c){l.lastIndex=0;var d=l.exec(b.substring(c,c+10));return d?c+=d[0].length:-1}function n(a,b,c){var d=o[b.substring(c,c+=3).toLowerCase()];return d==null?-1:(a.setMonth(d),c)}function p(a,b,c){q.lastIndex=0;var d=q.exec(b.substring(c,c+12));return d?(a.setMonth(r[d[0].toLowerCase()]),c+=d[0].length):-1}function t(a,c,d){return b(a,g.c.toString(),c,d)}function u(a,c,d){return b(a,g.x.toString(),c,d)}function v(a,c,d){return b(a,g.X.toString(),c,d)}function w(a,b,c){G.lastIndex=0;var d=G.exec(b.substring(c,c+4));return d?(a.setFullYear(d[0]),c+=d[0].length):-1}function x(a,b,c){G.lastIndex=0;var d=G.exec(b.substring(c,c+2));return d?(a.setFullYear(y()+ +d[0]),c+=d[0].length):-1}function y(){return~~((new Date).getFullYear()/1e3)*1e3}function z(a,b,c){G.lastIndex=0;var d=G.exec(b.substring(c,c+2));return d?(a.setMonth(d[0]-1),c+=d[0].length):-1}function A(a,b,c){G.lastIndex=0;var d=G.exec(b.substring(c,c+2));return d?(a.setDate(+d[0]),c+=d[0].length):-1}function B(a,b,c){G.lastIndex=0;var d=G.exec(b.substring(c,c+2));return d?(a.setHours(+d[0]),c+=d[0].length):-1}function C(a,b,c){return a.hour12=!0,B(a,b,c)}function D(a,b,c){G.lastIndex=0;var d=G.exec(b.substring(c,c+2));return d?(a.setMinutes(+d[0]),c+=d[0].length):-1}function E(a,b,c){G.lastIndex=0;var d=G.exec(b.substring(c,c+2));return d?(a.setSeconds(+d[0]),c+=d[0].length):-1}function F(a,b,c){G.lastIndex=0;var d=G.exec(b.substring(c,c+3));return d?(a.setMilliseconds(+d[0]),c+=d[0].length):-1}function H(a,b,c){var d=I[b.substring(c,c+=2).toLowerCase()];return d==null?-1:(a.hour12pm=d,c)}function J(b){return new a(b.getFullYear(),0,1)}function K(a,b){return~~((b-a)/864e5-(b.getTimezoneOffset()-a.getTimezoneOffset())/1440)}function L(a){return d(1+K(J(a),a))}function M(a){var b=J(a);return c(~~((K(b,a)+b.getDay())/7))}function N(a){var b=J(a);return c(~~((K(b,a)+(b.getDay()+6)%7)/7))}function O(a){var b=a.getTimezoneOffset(),d=b&gt;0?&quot;-&quot;:&quot;+&quot;,e=~~(Math.abs(b)/60),f=Math.abs(b)%60;return d+c(e)+c(f)}function P(){this._=new Date(Date.UTC.apply(this,arguments))}function R(a){return a.toISOString()}function S(a,b,c){return function(d,e,f){var g=a(d),h=[];g&lt;d&amp;&amp;b(g);if(f&gt;1)while(g&lt;e){var i=new Date(+g);c(i)%f||h.push(i),b(g)}else while(g&lt;e)h.push(new Date(+g)),b(g);return h}}function T(a){a.setTime(a.getTime()+6e4)}function U(a){a.setTime(a.getTime()+36e5)}function V(a,b,c){function d(b){return a(b)}return d.invert=function(b){return X(a.invert(b))},d.domain=function(b){return arguments.length?(a.domain(b),d):a.domain().map(X)},d.ticks=function(a,c){var e=W(d.domain());if(typeof a!=&quot;function&quot;){var f=e[1]-e[0],g=f/a,h=d3.bisect(Z,g,1,Z.length-1);Math.log(g/Z[h-1])&lt;Math.log(Z[h]/g)&amp;&amp;--h,a=b[h],c=a[1],a=a[0]}return a(e[0],e[1],c)},d.tickFormat=function(){return c},d.copy=function(){return V(a.copy(),b,c)},d3.rebind(d,a,&quot;range&quot;,&quot;rangeRound&quot;,&quot;interpolate&quot;,&quot;clamp&quot;)}function W(a){var b=a[0],c=a[a.length-1];return b&lt;c?[b,c]:[c,b]}function X(a){return new Date(a)}function Y(a){return function(b){var c=a.length-1,d=a[c];while(!d[1](b))d=a[--c];return d[0](b)}}d3.time={};var a=Date;d3.time.format=function(c){function e(a){var b=[],e=-1,f=0,h,i;while(++e&lt;d)c.charCodeAt(e)==37&amp;&amp;(b.push(c.substring(f,e),(i=g[h=c.charAt(++e)])?i(a):h),f=e+1);return b.push(c.substring(f,e)),b.join(&quot;&quot;)}var d=c.length;return e.parse=function(d){var e=new a(1900,0,1),f=b(e,c,d,0);if(f!=d.length)return null;if(e.hour12){var g=e.getHours()%12;e.setHours(e.hour12pm?g+12:g)}return delete e.hour12,delete e.hour12pm,e},e.toString=function(){return c},e};var c=d3.format(&quot;02d&quot;),d=d3.format(&quot;03d&quot;),e=d3.format(&quot;04d&quot;),f=d3.format(&quot;2d&quot;),g={a:function(a){return m[a.getDay()].substring(0,3)},A:function(a){return m[a.getDay()]},b:function(a){return s[a.getMonth()].substring(0,3)},B:function(a){return s[a.getMonth()]},c:d3.time.format(&quot;%a %b %e %H:%M:%S %Y&quot;),d:function(a){return c(a.getDate())},e:function(a){return f(a.getDate())},H:function(a){return c(a.getHours())},I:function(a){return c(a.getHours()%12||12)},j:L,L:function(a){return d(a.getMilliseconds())},m:function(a){return c(a.getMonth()+1)},M:function(a){return c(a.getMinutes())},p:function(a){return a.getHours()&gt;=12?&quot;PM&quot;:&quot;AM&quot;},S:function(a){return c(a.getSeconds())},U:M,w:function(a){return a.getDay()},W:N,x:d3.time.format(&quot;%m/%d/%y&quot;),X:d3.time.format(&quot;%H:%M:%S&quot;),y:function(a){return c(a.getFullYear()%100)},Y:function(a){return e(a.getFullYear()%1e4)},Z:O,&quot;%&quot;:function(a){return&quot;%&quot;}},h={a:i,A:k,b:n,B:p,c:t,d:A,e:A,H:B,I:C,L:F,m:z,M:D,p:H,S:E,x:u,X:v,y:x,Y:w},j={sun:3,mon:3,tue:3,wed:3,thu:3,fri:3,sat:3},l=/^(?:Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday)/ig,m=[&quot;Sunday&quot;,&quot;Monday&quot;,&quot;Tuesday&quot;,&quot;Wednesday&quot;,&quot;Thursday&quot;,&quot;Friday&quot;,&quot;Saturday&quot;],o={jan:0,feb:1,mar:2,apr:3,may:4,jun:5,jul:6,aug:7,sep:8,oct:9,nov:10,dec:11},q=/^(?:January|February|March|April|May|June|July|August|September|October|November|December)/ig,r={january:0,february:1,march:2,april:3,may:4,june:5,july:6,august:7,september:8,october:9,november:10,december:11},s=[&quot;January&quot;,&quot;February&quot;,&quot;March&quot;,&quot;April&quot;,&quot;May&quot;,&quot;June&quot;,&quot;July&quot;,&quot;August&quot;,&quot;September&quot;,&quot;October&quot;,&quot;November&quot;,&quot;December&quot;],G=/\s*\d+/,I={am:0,pm:1};d3.time.format.utc=function(b){function d(b){try{a=P;var d=new a;return d._=b,c(d)}finally{a=Date}}var c=d3.time.format(b);return d.parse=function(b){try{a=P;var d=c.parse(b);return d&amp;&amp;d._}finally{a=Date}},d.toString=c.toString,d},P.prototype={getDate:function(){return this._.getUTCDate()},getDay:function(){return this._.getUTCDay()},getFullYear:function(){return this._.getUTCFullYear()},getHours:function(){return this._.getUTCHours()},getMilliseconds:function(){return this._.getUTCMilliseconds()},getMinutes:function(){return this._.getUTCMinutes()},getMonth:function(){return this._.getUTCMonth()},getSeconds:function(){return this._.getUTCSeconds()},getTimezoneOffset:function(){return 0},valueOf:function(){return this._.getTime()},setDate:function(a){this._.setUTCDate(a)},setDay:function(a){this._.setUTCDay(a)},setFullYear:function(a){this._.setUTCFullYear(a)},setHours:function(a){this._.setUTCHours(a)},setMilliseconds:function(a){this._.setUTCMilliseconds(a)},setMinutes:function(a){this._.setUTCMinutes(a)},setMonth:function(a){this._.setUTCMonth(a)},setSeconds:function(a){this._.setUTCSeconds(a)}};var Q=d3.time.format.utc(&quot;%Y-%m-%dT%H:%M:%S.%LZ&quot;);d3.time.format.iso=Date.prototype.toISOString?R:Q,R.parse=function(a){return new Date(a)},R.toString=Q.toString,d3.time.second=function(a){return new Date(~~(a/1e3)*1e3)},d3.time.second.utc=d3.time.second,d3.time.seconds=S(d3.time.second,function(a){a.setTime(a.getTime()+1e3)},function(a){return a.getSeconds()}),d3.time.seconds.utc=d3.time.seconds,d3.time.minute=function(a){return new Date(~~(a/6e4)*6e4)},d3.time.minute.utc=d3.time.minute,d3.time.minutes=S(d3.time.minute,T,function(a){return a.getMinutes()}),d3.time.minutes.utc=S(d3.time.minute,T,function(a){return a.getUTCMinutes()}),d3.time.hour=function(a){var b=a.getTimezoneOffset()/60;return new Date((~~(a/36e5-b)+b)*36e5)},d3.time.hour.utc=function(a){return new Date(~~(a/36e5)*36e5)},d3.time.hours=S(d3.time.hour,U,function(a){return a.getHours()}),d3.time.hours.utc=S(d3.time.hour.utc,U,function(a){return a.getUTCHours()}),d3.time.day=function(a){return new Date(a.getFullYear(),a.getMonth(),a.getDate())},d3.time.day.utc=function(a){return new Date(~~(a/864e5)*864e5)},d3.time.days=S(d3.time.day,function(a){a.setDate(a.getDate()+1)},function(a){return a.getDate()-1}),d3.time.days.utc=S(d3.time.day.utc,function(a){a.setUTCDate(a.getUTCDate()+1)},function(a){return a.getUTCDate()-1}),d3.time.week=function(a){return(a=d3.time.day(a)).setDate(a.getDate()-a.getDay()),a},d3.time.week.utc=function(a){return(a=d3.time.day.utc(a)).setUTCDate(a.getUTCDate()-a.getUTCDay()),a},d3.time.weeks=S(d3.time.week,function(a){a.setDate(a.getDate()+7)},function(a){return~~((a-new Date(a.getFullYear(),0,1))/6048e5)}),d3.time.weeks.utc=S(d3.time.week.utc,function(a){a.setUTCDate(a.getUTCDate()+7)},function(a){return~~((a-Date.UTC(a.getUTCFullYear(),0,1))/6048e5)}),d3.time.month=function(a){return new Date(a.getFullYear(),a.getMonth(),1)},d3.time.month.utc=function(a){return new Date(Date.UTC(a.getUTCFullYear(),a.getUTCMonth(),1))},d3.time.months=S(d3.time.month,function(a){a.setMonth(a.getMonth()+1)},function(a){return a.getMonth()}),d3.time.months.utc=S(d3.time.month.utc,function(a){a.setUTCMonth(a.getUTCMonth()+1)},function(a){return a.getUTCMonth()}),d3.time.year=function(a){return new Date(a.getFullYear(),0,1)},d3.time.year.utc=function(a){return new Date(Date.UTC(a.getUTCFullYear(),0,1))},d3.time.years=S(d3.time.year,function(a){a.setFullYear(a.getFullYear()+1)},function(a){return a.getFullYear()}),d3.time.years.utc=S(d3.time.year.utc,function(a){a.setUTCFullYear(a.getUTCFullYear()+1)},function(a){return a.getUTCFullYear()});var Z=[1e3,5e3,15e3,3e4,6e4,3e5,9e5,18e5,36e5,108e5,216e5,432e5,864e5,1728e5,6048e5,2592e6,7776e6,31536e6],$=[[d3.time.seconds,1],[d3.time.seconds,5],[d3.time.seconds,15],[d3.time.seconds,30],[d3.time.minutes,1],[d3.time.minutes,5],[d3.time.minutes,15],[d3.time.minutes,30],[d3.time.hours,1],[d3.time.hours,3],[d3.time.hours,6],[d3.time.hours,12],[d3.time.days,1],[d3.time.days,2],[d3.time.weeks,1],[d3.time.months,1],[d3.time.months,3],[d3.time.years,1]],_=[[d3.time.format(&quot;%Y&quot;),function(a){return!0}],[d3.time.format(&quot;%B&quot;),function(a){return a.getMonth()}],[d3.time.format(&quot;%b %d&quot;),function(a){return a.getDate()!=1}],[d3.time.format(&quot;%a %d&quot;),function(a){return a.getDay()&amp;&amp;a.getDate()!=1}],[d3.time.format(&quot;%I %p&quot;),function(a){return a.getHours()}],[d3.time.format(&quot;%I:%M&quot;),function(a){return a.getMinutes()}],[d3.time.format(&quot;:%S&quot;),function(a){return a.getSeconds()||a.getMilliseconds()}]],ba=Y(_);d3.time.scale=function(){return V(d3.scale.linear(),$,ba)};var bb=[[d3.time.seconds.utc,1],[d3.time.seconds.utc,5],[d3.time.seconds.utc,15],[d3.time.seconds.utc,30],[d3.time.minutes.utc,1],[d3.time.minutes.utc,5],[d3.time.minutes.utc,15],[d3.time.minutes.utc,30],[d3.time.hours.utc,1],[d3.time.hours.utc,3],[d3.time.hours.utc,6],[d3.time.hours.utc,12],[d3.time.days.utc,1],[d3.time.days.utc,2],[d3.time.weeks.utc,1],[d3.time.months.utc,1],[d3.time.months.utc,3],[d3.time.years.utc,1]],bc=[[d3.time.format.utc(&quot;%Y&quot;),function(a){return!0}],[d3.time.format.utc(&quot;%B&quot;),function(a){return a.getUTCMonth()}],[d3.time.format.utc(&quot;%b %d&quot;),function(a){return a.getUTCDate()!=1}],[d3.time.format.utc(&quot;%a %d&quot;),function(a){return a.getUTCDay()&amp;&amp;a.getUTCDate()!=1}],[d3.time.format.utc(&quot;%I %p&quot;),function(a){return a.getUTCHours()}],[d3.time.format.utc(&quot;%I:%M&quot;),function(a){return a.getUTCMinutes()}],[d3.time.format.utc(&quot;:%S&quot;),function(a){return a.getUTCSeconds()||a.getUTCMilliseconds()}]],bd=Y(bc);d3.time.scale.utc=function(){return V(d3.scale.linear(),bb,bd)}})();</div></pre></div>
          </td>
        </tr>
      </table>
  </div>

          </div>
        </div>
      </div>
    </div>

  </div>

<div class="frame frame-loading" style="display:none;" data-tree-list-url="/mbostock/d3/tree-list/f67e89597db87f017c3d4706448ebe3ff8528853" data-blob-url-prefix="/mbostock/d3/blob/f67e89597db87f017c3d4706448ebe3ff8528853">
  <img src="https://a248.e.akamai.net/assets.github.com/images/modules/ajax/big_spinner_336699.gif?1310104853" height="32" width="32">
</div>

      </div>
      <div class="context-overlay"></div>
    </div>


    <!-- footer -->
    <div id="footer" >
      
  <div class="upper_footer">
     <div class="container clearfix">

       <!--[if IE]><h4 id="blacktocat_ie">GitHub Links</h4><![endif]-->
       <![if !IE]><h4 id="blacktocat">GitHub Links</h4><![endif]>

       <ul class="footer_nav">
         <h4>GitHub</h4>
         <li><a href="https://github.com/about">About</a></li>
         <li><a href="https://github.com/blog">Blog</a></li>
         <li><a href="https://github.com/features">Features</a></li>
         <li><a href="https://github.com/contact">Contact &amp; Support</a></li>
         <li><a href="https://github.com/training">Training</a></li>
         <li><a href="http://enterprise.github.com/">GitHub Enterprise</a></li>
         <li><a href="http://status.github.com/">Site Status</a></li>
       </ul>

       <ul class="footer_nav">
         <h4>Tools</h4>
         <li><a href="http://get.gaug.es/">Gauges: Analyze web traffic</a></li>
         <li><a href="http://speakerdeck.com">Speaker Deck: Presentations</a></li>
         <li><a href="https://gist.github.com">Gist: Code snippets</a></li>
         <li><a href="http://mac.github.com/">GitHub for Mac</a></li>
         <li><a href="http://mobile.github.com/">Issues for iPhone</a></li>
         <li><a href="http://jobs.github.com/">Job Board</a></li>
       </ul>

       <ul class="footer_nav">
         <h4>Extras</h4>
         <li><a href="http://shop.github.com/">GitHub Shop</a></li>
         <li><a href="http://octodex.github.com/">The Octodex</a></li>
       </ul>

       <ul class="footer_nav">
         <h4>Documentation</h4>
         <li><a href="http://help.github.com/">GitHub Help</a></li>
         <li><a href="http://developer.github.com/">Developer API</a></li>
         <li><a href="http://github.github.com/github-flavored-markdown/">GitHub Flavored Markdown</a></li>
         <li><a href="http://pages.github.com/">GitHub Pages</a></li>
       </ul>

     </div><!-- /.site -->
  </div><!-- /.upper_footer -->

<div class="lower_footer">
  <div class="container clearfix">
    <!--[if IE]><div id="legal_ie"><![endif]-->
    <![if !IE]><div id="legal"><![endif]>
      <ul>
          <li><a href="https://github.com/site/terms">Terms of Service</a></li>
          <li><a href="https://github.com/site/privacy">Privacy</a></li>
          <li><a href="https://github.com/security">Security</a></li>
      </ul>

      <p>&copy; 2012 <span id="_rrt" title="0.12146s from fe8.rs.github.com">GitHub</span> Inc. All rights reserved.</p>
    </div><!-- /#legal or /#legal_ie-->

      <div class="sponsor">
        <a href="http://www.rackspace.com" class="logo">
          <img alt="Dedicated Server" height="36" src="https://a248.e.akamai.net/assets.github.com/images/modules/footer/rackspace_logo.png?v2" width="38" />
        </a>
        Powered by the <a href="http://www.rackspace.com ">Dedicated
        Servers</a> and<br/> <a href="http://www.rackspacecloud.com">Cloud
        Computing</a> of Rackspace Hosting<span>&reg;</span>
      </div>
  </div><!-- /.site -->
</div><!-- /.lower_footer -->

    </div><!-- /#footer -->

    

<div id="keyboard_shortcuts_pane" class="instapaper_ignore readability-extra" style="display:none">
  <h2>Keyboard Shortcuts <small><a href="#" class="js-see-all-keyboard-shortcuts">(see all)</a></small></h2>

  <div class="columns threecols">
    <div class="column first">
      <h3>Site wide shortcuts</h3>
      <dl class="keyboard-mappings">
        <dt>s</dt>
        <dd>Focus site search</dd>
      </dl>
      <dl class="keyboard-mappings">
        <dt>?</dt>
        <dd>Bring up this help dialog</dd>
      </dl>
    </div><!-- /.column.first -->

    <div class="column middle" style='display:none'>
      <h3>Commit list</h3>
      <dl class="keyboard-mappings">
        <dt>j</dt>
        <dd>Move selection down</dd>
      </dl>
      <dl class="keyboard-mappings">
        <dt>k</dt>
        <dd>Move selection up</dd>
      </dl>
      <dl class="keyboard-mappings">
        <dt>c <em>or</em> o <em>or</em> enter</dt>
        <dd>Open commit</dd>
      </dl>
      <dl class="keyboard-mappings">
        <dt>y</dt>
        <dd>Expand URL to its canonical form</dd>
      </dl>
    </div><!-- /.column.first -->

    <div class="column last" style='display:none'>
      <h3>Pull request list</h3>
      <dl class="keyboard-mappings">
        <dt>j</dt>
        <dd>Move selection down</dd>
      </dl>
      <dl class="keyboard-mappings">
        <dt>k</dt>
        <dd>Move selection up</dd>
      </dl>
      <dl class="keyboard-mappings">
        <dt>o <em>or</em> enter</dt>
        <dd>Open issue</dd>
      </dl>
    </div><!-- /.columns.last -->

  </div><!-- /.columns.equacols -->

  <div style='display:none'>
    <div class="rule"></div>

    <h3>Issues</h3>

    <div class="columns threecols">
      <div class="column first">
        <dl class="keyboard-mappings">
          <dt>j</dt>
          <dd>Move selection down</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>k</dt>
          <dd>Move selection up</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>x</dt>
          <dd>Toggle selection</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>o <em>or</em> enter</dt>
          <dd>Open issue</dd>
        </dl>
      </div><!-- /.column.first -->
      <div class="column middle">
        <dl class="keyboard-mappings">
          <dt>I</dt>
          <dd>Mark selection as read</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>U</dt>
          <dd>Mark selection as unread</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>e</dt>
          <dd>Close selection</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>y</dt>
          <dd>Remove selection from view</dd>
        </dl>
      </div><!-- /.column.middle -->
      <div class="column last">
        <dl class="keyboard-mappings">
          <dt>c</dt>
          <dd>Create issue</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>l</dt>
          <dd>Create label</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>i</dt>
          <dd>Back to inbox</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>u</dt>
          <dd>Back to issues</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>/</dt>
          <dd>Focus issues search</dd>
        </dl>
      </div>
    </div>
  </div>

  <div style='display:none'>
    <div class="rule"></div>

    <h3>Issues Dashboard</h3>

    <div class="columns threecols">
      <div class="column first">
        <dl class="keyboard-mappings">
          <dt>j</dt>
          <dd>Move selection down</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>k</dt>
          <dd>Move selection up</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>o <em>or</em> enter</dt>
          <dd>Open issue</dd>
        </dl>
      </div><!-- /.column.first -->
    </div>
  </div>

  <div style='display:none'>
    <div class="rule"></div>

    <h3>Network Graph</h3>
    <div class="columns equacols">
      <div class="column first">
        <dl class="keyboard-mappings">
          <dt><span class="badmono">←</span> <em>or</em> h</dt>
          <dd>Scroll left</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt><span class="badmono">→</span> <em>or</em> l</dt>
          <dd>Scroll right</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt><span class="badmono">↑</span> <em>or</em> k</dt>
          <dd>Scroll up</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt><span class="badmono">↓</span> <em>or</em> j</dt>
          <dd>Scroll down</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>t</dt>
          <dd>Toggle visibility of head labels</dd>
        </dl>
      </div><!-- /.column.first -->
      <div class="column last">
        <dl class="keyboard-mappings">
          <dt>shift <span class="badmono">←</span> <em>or</em> shift h</dt>
          <dd>Scroll all the way left</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>shift <span class="badmono">→</span> <em>or</em> shift l</dt>
          <dd>Scroll all the way right</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>shift <span class="badmono">↑</span> <em>or</em> shift k</dt>
          <dd>Scroll all the way up</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>shift <span class="badmono">↓</span> <em>or</em> shift j</dt>
          <dd>Scroll all the way down</dd>
        </dl>
      </div><!-- /.column.last -->
    </div>
  </div>

  <div >
    <div class="rule"></div>
    <div class="columns threecols">
      <div class="column first" >
        <h3>Source Code Browsing</h3>
        <dl class="keyboard-mappings">
          <dt>t</dt>
          <dd>Activates the file finder</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>l</dt>
          <dd>Jump to line</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>w</dt>
          <dd>Switch branch/tag</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>y</dt>
          <dd>Expand URL to its canonical form</dd>
        </dl>
      </div>
    </div>
  </div>
</div>

    <div id="markdown-help" class="instapaper_ignore readability-extra">
  <h2>Markdown Cheat Sheet</h2>

  <div class="cheatsheet-content">

  <div class="mod">
    <div class="col">
      <h3>Format Text</h3>
      <p>Headers</p>
      <pre>
# This is an &lt;h1&gt; tag
## This is an &lt;h2&gt; tag
###### This is an &lt;h6&gt; tag</pre>
     <p>Text styles</p>
     <pre>
*This text will be italic*
_This will also be italic_
**This text will be bold**
__This will also be bold__

*You **can** combine them*
</pre>
    </div>
    <div class="col">
      <h3>Lists</h3>
      <p>Unordered</p>
      <pre>
* Item 1
* Item 2
  * Item 2a
  * Item 2b</pre>
     <p>Ordered</p>
     <pre>
1. Item 1
2. Item 2
3. Item 3
   * Item 3a
   * Item 3b</pre>
    </div>
    <div class="col">
      <h3>Miscellaneous</h3>
      <p>Images</p>
      <pre>
![GitHub Logo](/images/logo.png)
Format: ![Alt Text](url)
</pre>
     <p>Links</p>
     <pre>
http://github.com - automatic!
[GitHub](http://github.com)</pre>
<p>Blockquotes</p>
     <pre>
As Kanye West said:

> We're living the future so
> the present is our past.
</pre>
    </div>
  </div>
  <div class="rule"></div>

  <h3>Code Examples in Markdown</h3>
  <div class="col">
      <p>Syntax highlighting with <a href="http://github.github.com/github-flavored-markdown/" title="GitHub Flavored Markdown" target="_blank">GFM</a></p>
      <pre>
```javascript
function fancyAlert(arg) {
  if(arg) {
    $.facebox({div:'#foo'})
  }
}
```</pre>
    </div>
    <div class="col">
      <p>Or, indent your code 4 spaces</p>
      <pre>
Here is a Python code example
without syntax highlighting:

    def foo:
      if not bar:
        return true</pre>
    </div>
    <div class="col">
      <p>Inline code for comments</p>
      <pre>
I think you should use an
`&lt;addr&gt;` element here instead.</pre>
    </div>
  </div>

  </div>
</div>


    <div class="ajax-error-message">
      <p><span class="icon"></span> Something went wrong with that request. Please try again. <a href="javascript:;" class="ajax-error-dismiss">Dismiss</a></p>
    </div>

    
    
    
  </body>
</html>

