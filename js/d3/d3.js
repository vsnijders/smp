


<!DOCTYPE html>
<html>
  <head>
    <meta charset='utf-8'>
    <meta http-equiv="X-UA-Compatible" content="chrome=1">
        <title>d3.min.js at master from mbostock/d3 - GitHub</title>
    <link rel="search" type="application/opensearchdescription+xml" href="/opensearch.xml" title="GitHub" />
    <link rel="fluid-icon" href="https://github.com/fluidicon.png" title="GitHub" />

    
    

    <meta content="authenticity_token" name="csrf-param" />
<meta content="dFkfAQdZywjGpa8utYPKbRSYckg16hg0RMRoZvE/4WI=" name="csrf-token" />

    <link href="https://a248.e.akamai.net/assets.github.com/stylesheets/bundles/github-4a66179db6f6804b8f0d60c4bb581271fadd27cb.css" media="screen" rel="stylesheet" type="text/css" />
    

    <script src="https://a248.e.akamai.net/assets.github.com/javascripts/bundles/jquery-e46225f266eba00902b2e5b66fe6fe6a484fb242.js" type="text/javascript"></script>
    <script src="https://a248.e.akamai.net/assets.github.com/javascripts/bundles/github-a6e5ad89d200a038912bb6e9cb13215234fa1498.js" type="text/javascript"></script>
    

      <link rel='permalink' href='/mbostock/d3/blob/f67e89597db87f017c3d4706448ebe3ff8528853/d3.min.js'>

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
                      <a href="/mbostock/d3/blob/adopt/d3.min.js" data-name="adopt" rel="nofollow">adopt</a>
                  </h4>
                </div>
                <div class="commitish-item branch-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/force-tick/d3.min.js" data-name="force-tick" rel="nofollow">force-tick</a>
                  </h4>
                </div>
                <div class="commitish-item branch-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/gh-pages/d3.min.js" data-name="gh-pages" rel="nofollow">gh-pages</a>
                  </h4>
                </div>
                <div class="commitish-item branch-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/impact/d3.min.js" data-name="impact" rel="nofollow">impact</a>
                  </h4>
                </div>
                <div class="commitish-item branch-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/map/d3.min.js" data-name="map" rel="nofollow">map</a>
                  </h4>
                </div>
                <div class="commitish-item branch-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/master/d3.min.js" data-name="master" rel="nofollow">master</a>
                  </h4>
                </div>
                <div class="commitish-item branch-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/mekko/d3.min.js" data-name="mekko" rel="nofollow">mekko</a>
                  </h4>
                </div>
                <div class="commitish-item branch-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/qq/d3.min.js" data-name="qq" rel="nofollow">qq</a>
                  </h4>
                </div>
                <div class="commitish-item branch-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/radar/d3.min.js" data-name="radar" rel="nofollow">radar</a>
                  </h4>
                </div>
                <div class="commitish-item branch-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/scatter/d3.min.js" data-name="scatter" rel="nofollow">scatter</a>
                  </h4>
                </div>
                <div class="commitish-item branch-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/stagger/d3.min.js" data-name="stagger" rel="nofollow">stagger</a>
                  </h4>
                </div>

                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v2.7.3/d3.min.js" data-name="v2.7.3" rel="nofollow">v2.7.3</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v2.7.2/d3.min.js" data-name="v2.7.2" rel="nofollow">v2.7.2</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v2.7.1/d3.min.js" data-name="v2.7.1" rel="nofollow">v2.7.1</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v2.7.0/d3.min.js" data-name="v2.7.0" rel="nofollow">v2.7.0</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v2.6.1/d3.min.js" data-name="v2.6.1" rel="nofollow">v2.6.1</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v2.6.0/d3.min.js" data-name="v2.6.0" rel="nofollow">v2.6.0</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v2.5.2/d3.min.js" data-name="v2.5.2" rel="nofollow">v2.5.2</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v2.5.1/d3.min.js" data-name="v2.5.1" rel="nofollow">v2.5.1</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v2.5.0/d3.min.js" data-name="v2.5.0" rel="nofollow">v2.5.0</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v2.4.6/d3.min.js" data-name="v2.4.6" rel="nofollow">v2.4.6</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v2.4.5/d3.min.js" data-name="v2.4.5" rel="nofollow">v2.4.5</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v2.4.4/d3.min.js" data-name="v2.4.4" rel="nofollow">v2.4.4</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v2.4.3/d3.min.js" data-name="v2.4.3" rel="nofollow">v2.4.3</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v2.4.2/d3.min.js" data-name="v2.4.2" rel="nofollow">v2.4.2</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v2.4.1/d3.min.js" data-name="v2.4.1" rel="nofollow">v2.4.1</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v2.4.0/d3.min.js" data-name="v2.4.0" rel="nofollow">v2.4.0</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v2.3.4/d3.min.js" data-name="v2.3.4" rel="nofollow">v2.3.4</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v2.3.3/d3.min.js" data-name="v2.3.3" rel="nofollow">v2.3.3</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v2.3.2/d3.min.js" data-name="v2.3.2" rel="nofollow">v2.3.2</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v2.3.1/d3.min.js" data-name="v2.3.1" rel="nofollow">v2.3.1</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v2.3.0/d3.min.js" data-name="v2.3.0" rel="nofollow">v2.3.0</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v2.2.1/d3.min.js" data-name="v2.2.1" rel="nofollow">v2.2.1</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v2.2.0/d3.min.js" data-name="v2.2.0" rel="nofollow">v2.2.0</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v2.1.3/d3.min.js" data-name="v2.1.3" rel="nofollow">v2.1.3</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v2.1.2/d3.min.js" data-name="v2.1.2" rel="nofollow">v2.1.2</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v2.1.1/d3.min.js" data-name="v2.1.1" rel="nofollow">v2.1.1</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v2.1.0/d3.min.js" data-name="v2.1.0" rel="nofollow">v2.1.0</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v2.0.4/d3.min.js" data-name="v2.0.4" rel="nofollow">v2.0.4</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v2.0.3/d3.min.js" data-name="v2.0.3" rel="nofollow">v2.0.3</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v2.0.2/d3.min.js" data-name="v2.0.2" rel="nofollow">v2.0.2</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v2.0.1/d3.min.js" data-name="v2.0.1" rel="nofollow">v2.0.1</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v2.0.0/d3.min.js" data-name="v2.0.0" rel="nofollow">v2.0.0</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.29.7/d3.min.js" data-name="v1.29.7" rel="nofollow">v1.29.7</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.29.6/d3.min.js" data-name="v1.29.6" rel="nofollow">v1.29.6</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.29.5/d3.min.js" data-name="v1.29.5" rel="nofollow">v1.29.5</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.29.4/d3.min.js" data-name="v1.29.4" rel="nofollow">v1.29.4</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.29.3/d3.min.js" data-name="v1.29.3" rel="nofollow">v1.29.3</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.29.2/d3.min.js" data-name="v1.29.2" rel="nofollow">v1.29.2</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.29.1/d3.min.js" data-name="v1.29.1" rel="nofollow">v1.29.1</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.29.0/d3.min.js" data-name="v1.29.0" rel="nofollow">v1.29.0</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.28.1/d3.min.js" data-name="v1.28.1" rel="nofollow">v1.28.1</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.28.0/d3.min.js" data-name="v1.28.0" rel="nofollow">v1.28.0</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.27.2/d3.min.js" data-name="v1.27.2" rel="nofollow">v1.27.2</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.27.1/d3.min.js" data-name="v1.27.1" rel="nofollow">v1.27.1</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.27.0/d3.min.js" data-name="v1.27.0" rel="nofollow">v1.27.0</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.26.0/d3.min.js" data-name="v1.26.0" rel="nofollow">v1.26.0</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.25.0/d3.min.js" data-name="v1.25.0" rel="nofollow">v1.25.0</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.24.1/d3.min.js" data-name="v1.24.1" rel="nofollow">v1.24.1</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.24.0/d3.min.js" data-name="v1.24.0" rel="nofollow">v1.24.0</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.23.0/d3.min.js" data-name="v1.23.0" rel="nofollow">v1.23.0</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.22.1/d3.min.js" data-name="v1.22.1" rel="nofollow">v1.22.1</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.22.0/d3.min.js" data-name="v1.22.0" rel="nofollow">v1.22.0</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.21.0/d3.min.js" data-name="v1.21.0" rel="nofollow">v1.21.0</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.20.3/d3.min.js" data-name="v1.20.3" rel="nofollow">v1.20.3</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.20.2/d3.min.js" data-name="v1.20.2" rel="nofollow">v1.20.2</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.20.1/d3.min.js" data-name="v1.20.1" rel="nofollow">v1.20.1</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.20.0/d3.min.js" data-name="v1.20.0" rel="nofollow">v1.20.0</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.19.1/d3.min.js" data-name="v1.19.1" rel="nofollow">v1.19.1</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.19.0/d3.min.js" data-name="v1.19.0" rel="nofollow">v1.19.0</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.18.0/d3.min.js" data-name="v1.18.0" rel="nofollow">v1.18.0</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.17.1/d3.min.js" data-name="v1.17.1" rel="nofollow">v1.17.1</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.17.0/d3.min.js" data-name="v1.17.0" rel="nofollow">v1.17.0</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.16.0/d3.min.js" data-name="v1.16.0" rel="nofollow">v1.16.0</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.15.1/d3.min.js" data-name="v1.15.1" rel="nofollow">v1.15.1</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.15.0/d3.min.js" data-name="v1.15.0" rel="nofollow">v1.15.0</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.14.2/d3.min.js" data-name="v1.14.2" rel="nofollow">v1.14.2</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.14.1/d3.min.js" data-name="v1.14.1" rel="nofollow">v1.14.1</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.14.0/d3.min.js" data-name="v1.14.0" rel="nofollow">v1.14.0</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.13.4/d3.min.js" data-name="v1.13.4" rel="nofollow">v1.13.4</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.13.3/d3.min.js" data-name="v1.13.3" rel="nofollow">v1.13.3</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.13.2/d3.min.js" data-name="v1.13.2" rel="nofollow">v1.13.2</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.13.1/d3.min.js" data-name="v1.13.1" rel="nofollow">v1.13.1</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.13.0/d3.min.js" data-name="v1.13.0" rel="nofollow">v1.13.0</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.12.0/d3.min.js" data-name="v1.12.0" rel="nofollow">v1.12.0</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.11.1/d3.min.js" data-name="v1.11.1" rel="nofollow">v1.11.1</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.11.0/d3.min.js" data-name="v1.11.0" rel="nofollow">v1.11.0</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.10.1/d3.min.js" data-name="v1.10.1" rel="nofollow">v1.10.1</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.10.0/d3.min.js" data-name="v1.10.0" rel="nofollow">v1.10.0</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.9.1/d3.min.js" data-name="v1.9.1" rel="nofollow">v1.9.1</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.9.0/d3.min.js" data-name="v1.9.0" rel="nofollow">v1.9.0</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.8.5/d3.min.js" data-name="v1.8.5" rel="nofollow">v1.8.5</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.8.4/d3.min.js" data-name="v1.8.4" rel="nofollow">v1.8.4</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.8.3/d3.min.js" data-name="v1.8.3" rel="nofollow">v1.8.3</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.8.2/d3.min.js" data-name="v1.8.2" rel="nofollow">v1.8.2</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.8.1/d3.min.js" data-name="v1.8.1" rel="nofollow">v1.8.1</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.8.0/d3.min.js" data-name="v1.8.0" rel="nofollow">v1.8.0</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.7.0/d3.min.js" data-name="v1.7.0" rel="nofollow">v1.7.0</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.6.1/d3.min.js" data-name="v1.6.1" rel="nofollow">v1.6.1</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.6.0/d3.min.js" data-name="v1.6.0" rel="nofollow">v1.6.0</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.5.3/d3.min.js" data-name="v1.5.3" rel="nofollow">v1.5.3</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.5.2/d3.min.js" data-name="v1.5.2" rel="nofollow">v1.5.2</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.5.1/d3.min.js" data-name="v1.5.1" rel="nofollow">v1.5.1</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.5.0/d3.min.js" data-name="v1.5.0" rel="nofollow">v1.5.0</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.4.0/d3.min.js" data-name="v1.4.0" rel="nofollow">v1.4.0</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.3.0/d3.min.js" data-name="v1.3.0" rel="nofollow">v1.3.0</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.2.1/d3.min.js" data-name="v1.2.1" rel="nofollow">v1.2.1</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.2.0/d3.min.js" data-name="v1.2.0" rel="nofollow">v1.2.0</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.1.0/d3.min.js" data-name="v1.1.0" rel="nofollow">v1.1.0</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.0.3/d3.min.js" data-name="v1.0.3" rel="nofollow">v1.0.3</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.0.2/d3.min.js" data-name="v1.0.2" rel="nofollow">v1.0.2</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.0.1/d3.min.js" data-name="v1.0.1" rel="nofollow">v1.0.1</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/v1.0.0/d3.min.js" data-name="v1.0.0" rel="nofollow">v1.0.0</a>
                  </h4>
                </div>
                <div class="commitish-item tag-commitish selector-item">
                  <h4>
                      <a href="/mbostock/d3/blob/semver/d3.min.js" data-name="semver" rel="nofollow">semver</a>
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


<!-- block_view_fragment_key: views4/v8/blob:v15:943149:mbostock/d3:43fa0700420ce7670f40b08bb31e7b95e680044c:45687330391497a71c8ae73351c45b02 -->
  <div id="slider">

    <div class="breadcrumb" data-path="d3.min.js/">
      <b><a href="/mbostock/d3/tree/f67e89597db87f017c3d4706448ebe3ff8528853" class="js-rewrite-sha">d3</a></b> / d3.min.js       <span style="display:none" id="clippy_4246" class="clippy-text">d3.min.js</span>
      
      <object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"
              width="110"
              height="14"
              class="clippy"
              id="clippy" >
      <param name="movie" value="https://a248.e.akamai.net/assets.github.com/flash/clippy.swf?1261951368?v5"/>
      <param name="allowScriptAccess" value="always" />
      <param name="quality" value="high" />
      <param name="scale" value="noscale" />
      <param NAME="FlashVars" value="id=clippy_4246&amp;copied=copied!&amp;copyto=copy to clipboard">
      <param name="bgcolor" value="#FFFFFF">
      <param name="wmode" value="opaque">
      <embed src="https://a248.e.akamai.net/assets.github.com/flash/clippy.swf?1261951368?v5"
             width="110"
             height="14"
             name="clippy"
             quality="high"
             allowScriptAccess="always"
             type="application/x-shockwave-flash"
             pluginspage="http://www.macromedia.com/go/getflashplayer"
             FlashVars="id=clippy_4246&amp;copied=copied!&amp;copyto=copy to clipboard"
             bgcolor="#FFFFFF"
             wmode="opaque"
      />
      </object>
      

    </div>

    <div class="frames">
      <div class="frame frame-center" data-path="d3.min.js/" data-permalink-url="/mbostock/d3/blob/f67e89597db87f017c3d4706448ebe3ff8528853/d3.min.js" data-title="d3.min.js at master from mbostock/d3 - GitHub" data-type="blob">
          <ul class="big-actions">
            <li><a class="file-edit-link minibutton js-rewrite-sha" href="/mbostock/d3/edit/f67e89597db87f017c3d4706448ebe3ff8528853/d3.min.js" data-method="post" rel="nofollow"><span>Edit this file</span></a></li>
          </ul>

        <div id="files" class="bubble">
          <div class="file">
            <div class="meta">
              <div class="info">
                <span class="icon"><img alt="Txt" height="16" src="https://a248.e.akamai.net/assets.github.com/images/icons/txt.png?1252203928" width="16" /></span>
                <span class="mode" title="File Mode">100644</span>
                  <span>2 lines (2 sloc)</span>
                <span>58.874 kb</span>
              </div>
              <ul class="actions">
                <li><a href="/mbostock/d3/raw/master/d3.min.js" id="raw-url">raw</a></li>
                  <li><a href="/mbostock/d3/blame/master/d3.min.js">blame</a></li>
                <li><a href="/mbostock/d3/commits/master/d3.min.js" rel="nofollow">history</a></li>
              </ul>
            </div>
              <div class="data type-javascript">
      <table cellpadding="0" cellspacing="0" class="lines">
        <tr>
          <td>
            <pre class="line_numbers"><span id="L1" rel="#L1">1</span>
<span id="L2" rel="#L2">2</span>
</pre>
          </td>
          <td width="100%">
                <div class="highlight"><pre><div class='line' id='LC1'>(function(){function e(a){var b=-1,c=a.length,d=[];while(++b&lt;c)d.push(a[b]);return d}function f(a){return Array.prototype.slice.call(a)}function i(){return this}function j(a,b,c){return function(){var d=c.apply(b,arguments);return arguments.length?a:d}}function k(a){return a!=null&amp;&amp;!isNaN(a)}function l(a){return a.length}function m(a){return a==null}function n(a){return a.replace(/(^\s+)|(\s+$)/g,&quot;&quot;).replace(/\s+/g,&quot; &quot;)}function q(){}function r(){function c(){var b=a,c=-1,d=b.length,e;while(++c&lt;d)(e=b[c].on)&amp;&amp;e.apply(this,arguments)}var a=[],b={};return c.on=function(d,e){var f,g;if(arguments.length&lt;2)return(f=b[d])&amp;&amp;f.on;if(f=b[d])f.on=null,a=a.slice(0,g=a.indexOf(f)).concat(a.slice(g+1)),delete b[d];return e&amp;&amp;a.push(b[d]={on:e}),c},c}function u(a,b){return b-(a?1+Math.floor(Math.log(a+Math.pow(10,1+Math.floor(Math.log(a)/Math.LN10)-b))/Math.LN10):1)}function v(a){return a+&quot;&quot;}function w(a){var b=a.lastIndexOf(&quot;.&quot;),c=b&gt;=0?a.substring(b):(b=a.length,&quot;&quot;),d=[];while(b&gt;0)d.push(a.substring(b-=3,b+3));return d.reverse().join(&quot;,&quot;)+c}function y(a,b){return{scale:Math.pow(10,(8-b)*3),symbol:a}}function D(a){return function(b){return b&lt;=0?0:b&gt;=1?1:a(b)}}function E(a){return function(b){return 1-a(1-b)}}function F(a){return function(b){return.5*(b&lt;.5?a(2*b):2-a(2-2*b))}}function G(a){return a}function H(a){return function(b){return Math.pow(b,a)}}function I(a){return 1-Math.cos(a*Math.PI/2)}function J(a){return Math.pow(2,10*(a-1))}function K(a){return 1-Math.sqrt(1-a*a)}function L(a,b){var c;return arguments.length&lt;2&amp;&amp;(b=.45),arguments.length&lt;1?(a=1,c=b/4):c=b/(2*Math.PI)*Math.asin(1/a),function(d){return 1+a*Math.pow(2,10*-d)*Math.sin((d-c)*2*Math.PI/b)}}function M(a){return a||(a=1.70158),function(b){return b*b*((a+1)*b-a)}}function N(a){return a&lt;1/2.75?7.5625*a*a:a&lt;2/2.75?7.5625*(a-=1.5/2.75)*a+.75:a&lt;2.5/2.75?7.5625*(a-=2.25/2.75)*a+.9375:7.5625*(a-=2.625/2.75)*a+.984375}function O(){d3.event.stopPropagation(),d3.event.preventDefault()}function Q(a){return a==&quot;transform&quot;?d3.interpolateTransform:d3.interpolate}function R(a,b){return b=b-(a=+a)?1/(b-a):0,function(c){return(c-a)*b}}function S(a,b){return b=b-(a=+a)?1/(b-a):0,function(c){return Math.max(0,Math.min(1,(c-a)*b))}}function T(a,b,c){return new U(a,b,c)}function U(a,b,c){this.r=a,this.g=b,this.b=c}function V(a){return a&lt;16?&quot;0&quot;+Math.max(0,a).toString(16):Math.min(255,a).toString(16)}function W(a,b,c){var d=0,e=0,f=0,g,h,i;g=/([a-z]+)\((.*)\)/i.exec(a);if(g){h=g[2].split(&quot;,&quot;);switch(g[1]){case&quot;hsl&quot;:return c(parseFloat(h[0]),parseFloat(h[1])/100,parseFloat(h[2])/100);case&quot;rgb&quot;:return b(Y(h[0]),Y(h[1]),Y(h[2]))}}return(i=Z[a])?b(i.r,i.g,i.b):(a!=null&amp;&amp;a.charAt(0)===&quot;#&quot;&amp;&amp;(a.length===4?(d=a.charAt(1),d+=d,e=a.charAt(2),e+=e,f=a.charAt(3),f+=f):a.length===7&amp;&amp;(d=a.substring(1,3),e=a.substring(3,5),f=a.substring(5,7)),d=parseInt(d,16),e=parseInt(e,16),f=parseInt(f,16)),b(d,e,f))}function X(a,b,c){var d=Math.min(a/=255,b/=255,c/=255),e=Math.max(a,b,c),f=e-d,g,h,i=(e+d)/2;return f?(h=i&lt;.5?f/(e+d):f/(2-e-d),a==e?g=(b-c)/f+(b&lt;c?6:0):b==e?g=(c-a)/f+2:g=(a-b)/f+4,g*=60):h=g=0,_(g,h,i)}function Y(a){var b=parseFloat(a);return a.charAt(a.length-1)===&quot;%&quot;?Math.round(b*2.55):b}function _(a,b,c){return new ba(a,b,c)}function ba(a,b,c){this.h=a,this.s=b,this.l=c}function bb(a,b,c){function f(a){return a&gt;360?a-=360:a&lt;0&amp;&amp;(a+=360),a&lt;60?d+(e-d)*a/60:a&lt;180?e:a&lt;240?d+(e-d)*(240-a)/60:d}function g(a){return Math.round(f(a)*255)}var d,e;return a%=360,a&lt;0&amp;&amp;(a+=360),b=b&lt;0?0:b&gt;1?1:b,c=c&lt;0?0:c&gt;1?1:c,e=c&lt;=.5?c*(1+b):c+b-c*b,d=2*c-e,T(g(a+120),g(a),g(a-120))}function bc(a){return h(a,bi),a}function bj(a){return function(){return bd(a,this)}}function bk(a){return function(){return be(a,this)}}function bm(a,b){function f(){if(b=this.classList)return b.add(a);var b=this.className,d=b.baseVal!=null,e=d?b.baseVal:b;c.lastIndex=0,c.test(e)||(e=n(e+&quot; &quot;+a),d?b.baseVal=e:this.className=e)}function g(){if(b=this.classList)return b.remove(a);var b=this.className,d=b.baseVal!=null,e=d?b.baseVal:b;e=n(e.replace(c,&quot; &quot;)),d?b.baseVal=e:this.className=e}function h(){(b.apply(this,arguments)?f:g).call(this)}var c=new RegExp(&quot;(^|\\s+)&quot;+d3.requote(a)+&quot;(\\s+|$)&quot;,&quot;g&quot;);if(arguments.length&lt;2){var d=this.node();if(e=d.classList)return e.contains(a);var e=d.className;return c.lastIndex=0,c.test(e.baseVal!=null?e.baseVal:e)}return this.each(typeof b==&quot;function&quot;?h:b?f:g)}function bn(a){return{__data__:a}}function bo(a){return function(){return bh(this,a)}}function bp(a){return arguments.length||(a=d3.ascending),function(b,c){return a(b&amp;&amp;b.__data__,c&amp;&amp;c.__data__)}}function br(a){return h(a,bs),a}function bt(a,b,c){h(a,bx);var d={},e=d3.dispatch(&quot;start&quot;,&quot;end&quot;),f=bA;return a.id=b,a.time=c,a.tween=function(b,c){return arguments.length&lt;2?d[b]:(c==null?delete d[b]:d[b]=c,a)},a.ease=function(b){return arguments.length?(f=typeof b==&quot;function&quot;?b:d3.ease.apply(d3,arguments),a):f},a.each=function(b,c){return arguments.length&lt;2?bB.call(a,b):(e.on(b,c),a)},d3.timer(function(g){return a.each(function(h,i,j){function p(a){if(o.active&gt;b)return r();o.active=b;for(var f in d)(f=d[f].call(l,h,i))&amp;&amp;k.push(f);return e.start.call(l,h,i),q(a)||d3.timer(q,0,c),1}function q(a){if(o.active!==b)return r();var c=(a-m)/n,d=f(c),g=k.length;while(g&gt;0)k[--g].call(l,d);if(c&gt;=1)return r(),bz=b,e.end.call(l,h,i),bz=0,1}function r(){return--o.count||delete l.__transition__,1}var k=[],l=this,m=a[j][i].delay,n=a[j][i].duration,o=l.__transition__||(l.__transition__={active:0,count:0});++o.count,m&lt;=g?p(g):d3.timer(p,m,c)}),1},0,c),a}function bv(a,b,c){return c!=&quot;&quot;&amp;&amp;bu}function bw(a,b){function d(a,d,e){var f=b.call(this,a,d);return f==null?e!=&quot;&quot;&amp;&amp;bu:e!=f&amp;&amp;c(e,f)}function e(a,d,e){return e!=b&amp;&amp;c(e,b)}var c=Q(a);return typeof b==&quot;function&quot;?d:b==null?bv:(b+=&quot;&quot;,e)}function bB(a){for(var b=0,c=this.length;b&lt;c;b++)for(var d=this[b],e=0,f=d.length;e&lt;f;e++){var g=d[e];g&amp;&amp;a.call(g=g.node,g.__data__,e,b)}return this}function bF(){var a,b=Date.now(),c=bC;while(c)a=b-c.then,a&gt;=c.delay&amp;&amp;(c.flush=c.callback(a)),c=c.next;var d=bG()-b;d&gt;24?(isFinite(d)&amp;&amp;(clearTimeout(bE),bE=setTimeout(bF,d)),bD=0):(bD=1,bH(bF))}function bG(){var a=null,b=bC,c=Infinity;while(b)b.flush?b=a?a.next=b.next:bC=b.next:(c=Math.min(c,b.then+b.delay),b=(a=b).next);return c}function bI(a){var b=[a.a,a.b],c=[a.c,a.d],d=bK(b),e=bJ(b,c),f=bK(bL(c,b,-e))||0;b[0]*c[1]&lt;c[0]*b[1]&amp;&amp;(b[0]*=-1,b[1]*=-1,d*=-1,e*=-1),this.rotate=(d?Math.atan2(b[1],b[0]):Math.atan2(-c[0],c[1]))*bM,this.translate=[a.e,a.f],this.scale=[d,f],this.skew=f?Math.atan2(e,f)*bM:0}function bJ(a,b){return a[0]*b[0]+a[1]*b[1]}function bK(a){var b=Math.sqrt(bJ(a,a));return b&amp;&amp;(a[0]/=b,a[1]/=b),b}function bL(a,b,c){return a[0]+=c*b[0],a[1]+=c*b[1],a}function bN(){}function bO(a){var b=a[0],c=a[a.length-1];return b&lt;c?[b,c]:[c,b]}function bP(a){return a.rangeExtent?a.rangeExtent():bO(a.range())}function bQ(a,b){var c=0,d=a.length-1,e=a[c],f=a[d],g;f&lt;e&amp;&amp;(g=c,c=d,d=g,g=e,e=f,f=g);if(g=f-e)b=b(g),a[c]=b.floor(e),a[d]=b.ceil(f);return a}function bR(){return Math}function bS(a,b,c,d){function g(){var g=a.length==2?bY:bZ,i=d?S:R;return e=g(a,b,i,c),f=g(b,a,i,d3.interpolate),h}function h(a){return e(a)}var e,f;return h.invert=function(a){return f(a)},h.domain=function(b){return arguments.length?(a=b.map(Number),g()):a},h.range=function(a){return arguments.length?(b=a,g()):b},h.rangeRound=function(a){return h.range(a).interpolate(d3.interpolateRound)},h.clamp=function(a){return arguments.length?(d=a,g()):d},h.interpolate=function(a){return arguments.length?(c=a,g()):c},h.ticks=function(b){return bW(a,b)},h.tickFormat=function(b){return bX(a,b)},h.nice=function(){return bQ(a,bU),g()},h.copy=function(){return bS(a,b,c,d)},g()}function bT(a,b){return d3.rebind(a,b,&quot;range&quot;,&quot;rangeRound&quot;,&quot;interpolate&quot;,&quot;clamp&quot;)}function bU(a){return a=Math.pow(10,Math.round(Math.log(a)/Math.LN10)-1),{floor:function(b){return Math.floor(b/a)*a},ceil:function(b){return Math.ceil(b/a)*a}}}function bV(a,b){var c=bO(a),d=c[1]-c[0],e=Math.pow(10,Math.floor(Math.log(d/b)/Math.LN10)),f=b/d*e;return f&lt;=.15?e*=10:f&lt;=.35?e*=5:f&lt;=.75&amp;&amp;(e*=2),c[0]=Math.ceil(c[0]/e)*e,c[1]=Math.floor(c[1]/e)*e+e*.5,c[2]=e,c}function bW(a,b){return d3.range.apply(d3,bV(a,b))}function bX(a,b){return d3.format(&quot;,.&quot;+Math.max(0,-Math.floor(Math.log(bV(a,b)[2])/Math.LN10+.01))+&quot;f&quot;)}function bY(a,b,c,d){var e=c(a[0],a[1]),f=d(b[0],b[1]);return function(a){return f(e(a))}}function bZ(a,b,c,d){var e=[],f=[],g=0,h=a.length-1;a[h]&lt;a[0]&amp;&amp;(a=a.slice().reverse(),b=b.slice().reverse());while(++g&lt;=h)e.push(c(a[g-1],a[g])),f.push(d(b[g-1],b[g]));return function(b){var c=d3.bisect(a,b,1,h)-1;return f[c](e[c](b))}}function b$(a,b){function d(c){return a(b(c))}var c=b.pow;return d.invert=function(b){return c(a.invert(b))},d.domain=function(e){return arguments.length?(b=e[0]&lt;0?cb:ca,c=b.pow,a.domain(e.map(b)),d):a.domain().map(c)},d.nice=function(){return a.domain(bQ(a.domain(),bR)),d},d.ticks=function(){var d=bO(a.domain()),e=[];if(d.every(isFinite)){var f=Math.floor(d[0]),g=Math.ceil(d[1]),h=c(d[0]),i=c(d[1]);if(b===cb){e.push(c(f));for(;f++&lt;g;)for(var j=9;j&gt;0;j--)e.push(c(f)*j)}else{for(;f&lt;g;f++)for(var j=1;j&lt;10;j++)e.push(c(f)*j);e.push(c(f))}for(f=0;e[f]&lt;h;f++);for(g=e.length;e[g-1]&gt;i;g--);e=e.slice(f,g)}return e},d.tickFormat=function(a,e){arguments.length&lt;2&amp;&amp;(e=b_);if(arguments.length&lt;1)return e;var f=a/d.ticks().length,g=b===cb?(h=-1e-12,Math.floor):(h=1e-12,Math.ceil),h;return function(a){return a/c(g(b(a)+h))&lt;f?e(a):&quot;&quot;}},d.copy=function(){return b$(a.copy(),b)},bT(d,a)}function ca(a){return Math.log(a&lt;0?0:a)/Math.LN10}function cb(a){return-Math.log(a&gt;0?0:-a)/Math.LN10}function cc(a,b){function e(b){return a(c(b))}var c=cd(b),d=cd(1/b);return e.invert=function(b){return d(a.invert(b))},e.domain=function(b){return arguments.length?(a.domain(b.map(c)),e):a.domain().map(d)},e.ticks=function(a){return bW(e.domain(),a)},e.tickFormat=function(a){return bX(e.domain(),a)},e.nice=function(){return e.domain(bQ(e.domain(),bU))},e.exponent=function(a){if(!arguments.length)return b;var f=e.domain();return c=cd(b=a),d=cd(1/b),e.domain(f)},e.copy=function(){return cc(a.copy(),b)},bT(e,a)}function cd(a){return function(b){return b&lt;0?-Math.pow(-b,a):Math.pow(b,a)}}function ce(a,b){function f(b){return d[((c[b]||(c[b]=a.push(b)))-1)%d.length]}function g(b,c){return d3.range(a.length).map(function(a){return b+c*a})}var c,d,e;return f.domain=function(d){if(!arguments.length)return a;a=[],c={};var e=-1,g=d.length,h;while(++e&lt;g)c[h=d[e]]||(c[h]=a.push(h));return f[b.t](b.x,b.p)},f.range=function(a){return arguments.length?(d=a,e=0,b={t:&quot;range&quot;,x:a},f):d},f.rangePoints=function(c,h){arguments.length&lt;2&amp;&amp;(h=0);var i=c[0],j=c[1],k=(j-i)/(a.length-1+h);return d=g(a.length&lt;2?(i+j)/2:i+k*h/2,k),e=0,b={t:&quot;rangePoints&quot;,x:c,p:h},f},f.rangeBands=function(c,h){arguments.length&lt;2&amp;&amp;(h=0);var i=c[0],j=c[1],k=(j-i)/(a.length+h);return d=g(i+k*h,k),e=k*(1-h),b={t:&quot;rangeBands&quot;,x:c,p:h},f},f.rangeRoundBands=function(c,h){arguments.length&lt;2&amp;&amp;(h=0);var i=c[0],j=c[1],k=Math.floor((j-i)/(a.length+h));return d=g(i+Math.round((j-i-(a.length-h)*k)/2),k),e=Math.round(k*(1-h)),b={t:&quot;rangeRoundBands&quot;,x:c,p:h},f},f.rangeBand=function(){return e},f.rangeExtent=function(){return b.t===&quot;range&quot;?bO(b.x):b.x},f.copy=function(){return ce(a,b)},f.domain(a)}function cj(a,b){function d(){var d=0,f=a.length,g=b.length;c=[];while(++d&lt;g)c[d-1]=d3.quantile(a,d/g);return e}function e(a){return isNaN(a=+a)?NaN:b[d3.bisect(c,a)]}var c;return e.domain=function(b){return arguments.length?(a=b.filter(function(a){return!isNaN(a)}).sort(d3.ascending),d()):a},e.range=function(a){return arguments.length?(b=a,d()):b},e.quantiles=function(){return c},e.copy=function(){return cj(a,b)},d()}function ck(a,b,c){function f(b){return c[Math.max(0,Math.min(e,Math.floor(d*(b-a))))]}function g(){return d=c.length/(b-a),e=c.length-1,f}var d,e;return f.domain=function(c){return arguments.length?(a=+c[0],b=+c[c.length-1],g()):[a,b]},f.range=function(a){return arguments.length?(c=a,g()):c},f.copy=function(){return ck(a,b,c)},g()}function cn(a){return a.innerRadius}function co(a){return a.outerRadius}function cp(a){return a.startAngle}function cq(a){return a.endAngle}function cr(a){function g(d){return d.length&lt;1?null:&quot;M&quot;+e(a(cs(this,d,b,c)),f)}var b=ct,c=cu,d=&quot;linear&quot;,e=cv[d],f=.7;return g.x=function(a){return arguments.length?(b=a,g):b},g.y=function(a){return arguments.length?(c=a,g):c},g.interpolate=function(a){return arguments.length?(e=cv[d=a],g):d},g.tension=function(a){return arguments.length?(f=a,g):f},g}function cs(a,b,c,d){var e=[],f=-1,g=b.length,h=typeof c==&quot;function&quot;,i=typeof d==&quot;function&quot;,j;if(h&amp;&amp;i)while(++f&lt;g)e.push([c.call(a,j=b[f],f),d.call(a,j,f)]);else if(h)while(++f&lt;g)e.push([c.call(a,b[f],f),d]);else if(i)while(++f&lt;g)e.push([c,d.call(a,b[f],f)]);else while(++f&lt;g)e.push([c,d]);return e}function ct(a){return a[0]}function cu(a){return a[1]}function cw(a){var b=0,c=a.length,d=a[0],e=[d[0],&quot;,&quot;,d[1]];while(++b&lt;c)e.push(&quot;L&quot;,(d=a[b])[0],&quot;,&quot;,d[1]);return e.join(&quot;&quot;)}function cx(a){var b=0,c=a.length,d=a[0],e=[d[0],&quot;,&quot;,d[1]];while(++b&lt;c)e.push(&quot;V&quot;,(d=a[b])[1],&quot;H&quot;,d[0]);return e.join(&quot;&quot;)}function cy(a){var b=0,c=a.length,d=a[0],e=[d[0],&quot;,&quot;,d[1]];while(++b&lt;c)e.push(&quot;H&quot;,(d=a[b])[0],&quot;V&quot;,d[1]);return e.join(&quot;&quot;)}function cz(a,b){return a.length&lt;4?cw(a):a[1]+cC(a.slice(1,a.length-1),cD(a,b))}function cA(a,b){return a.length&lt;3?cw(a):a[0]+cC((a.push(a[0]),a),cD([a[a.length-2]].concat(a,[a[1]]),b))}function cB(a,b,c){return a.length&lt;3?cw(a):a[0]+cC(a,cD(a,b))}function cC(a,b){if(b.length&lt;1||a.length!=b.length&amp;&amp;a.length!=b.length+2)return cw(a);var c=a.length!=b.length,d=&quot;&quot;,e=a[0],f=a[1],g=b[0],h=g,i=1;c&amp;&amp;(d+=&quot;Q&quot;+(f[0]-g[0]*2/3)+&quot;,&quot;+(f[1]-g[1]*2/3)+&quot;,&quot;+f[0]+&quot;,&quot;+f[1],e=a[1],i=2);if(b.length&gt;1){h=b[1],f=a[i],i++,d+=&quot;C&quot;+(e[0]+g[0])+&quot;,&quot;+(e[1]+g[1])+&quot;,&quot;+(f[0]-h[0])+&quot;,&quot;+(f[1]-h[1])+&quot;,&quot;+f[0]+&quot;,&quot;+f[1];for(var j=2;j&lt;b.length;j++,i++)f=a[i],h=b[j],d+=&quot;S&quot;+(f[0]-h[0])+&quot;,&quot;+(f[1]-h[1])+&quot;,&quot;+f[0]+&quot;,&quot;+f[1]}if(c){var k=a[i];d+=&quot;Q&quot;+(f[0]+h[0]*2/3)+&quot;,&quot;+(f[1]+h[1]*2/3)+&quot;,&quot;+k[0]+&quot;,&quot;+k[1]}return d}function cD(a,b){var c=[],d=(1-b)/2,e,f=a[0],g=a[1],h=1,i=a.length;while(++h&lt;i)e=f,f=g,g=a[h],c.push([d*(g[0]-e[0]),d*(g[1]-e[1])]);return c}function cE(a){if(a.length&lt;3)return cw(a);var b=1,c=a.length,d=a[0],e=d[0],f=d[1],g=[e,e,e,(d=a[1])[0]],h=[f,f,f,d[1]],i=[e,&quot;,&quot;,f];cM(i,g,h);while(++b&lt;c)d=a[b],g.shift(),g.push(d[0]),h.shift(),h.push(d[1]),cM(i,g,h);b=-1;while(++b&lt;2)g.shift(),g.push(d[0]),h.shift(),h.push(d[1]),cM(i,g,h);return i.join(&quot;&quot;)}function cF(a){if(a.length&lt;4)return cw(a);var b=[],c=-1,d=a.length,e,f=[0],g=[0];while(++c&lt;3)e=a[c],f.push(e[0]),g.push(e[1]);b.push(cI(cL,f)+&quot;,&quot;+cI(cL,g)),--c;while(++c&lt;d)e=a[c],f.shift(),f.push(e[0]),g.shift(),g.push(e[1]),cM(b,f,g);return b.join(&quot;&quot;)}function cG(a){var b,c=-1,d=a.length,e=d+4,f,g=[],h=[];while(++c&lt;4)f=a[c%d],g.push(f[0]),h.push(f[1]);b=[cI(cL,g),&quot;,&quot;,cI(cL,h)],--c;while(++c&lt;e)f=a[c%d],g.shift(),g.push(f[0]),h.shift(),h.push(f[1]),cM(b,g,h);return b.join(&quot;&quot;)}function cH(a,b){var c=a.length-1,d=a[0][0],e=a[0][1],f=a[c][0]-d,g=a[c][1]-e,h=-1,i,j;while(++h&lt;=c)i=a[h],j=h/c,i[0]=b*i[0]+(1-b)*(d+j*f),i[1]=b*i[1]+(1-b)*(e+j*g);return cE(a)}function cI(a,b){return a[0]*b[0]+a[1]*b[1]+a[2]*b[2]+a[3]*b[3]}function cM(a,b,c){a.push(&quot;C&quot;,cI(cJ,b),&quot;,&quot;,cI(cJ,c),&quot;,&quot;,cI(cK,b),&quot;,&quot;,cI(cK,c),&quot;,&quot;,cI(cL,b),&quot;,&quot;,cI(cL,c))}function cN(a,b){return(b[1]-a[1])/(b[0]-a[0])}function cO(a){var b=0,c=a.length-1,d=[],e=a[0],f=a[1],g=d[0]=cN(e,f);while(++b&lt;c)d[b]=g+(g=cN(e=f,f=a[b+1]));return d[b]=g,d}function cP(a){var b=[],c,d,e,f,g=cO(a),h=-1,i=a.length-1;while(++h&lt;i)c=cN(a[h],a[h+1]),Math.abs(c)&lt;1e-6?g[h]=g[h+1]=0:(d=g[h]/c,e=g[h+1]/c,f=d*d+e*e,f&gt;9&amp;&amp;(f=c*3/Math.sqrt(f),g[h]=f*d,g[h+1]=f*e));h=-1;while(++h&lt;=i)f=(a[Math.min(i,h+1)][0]-a[Math.max(0,h-1)][0])/(6*(1+g[h]*g[h])),b.push([f||0,g[h]*f||0]);return b}function cQ(a){return a.length&lt;3?cw(a):a[0]+cC(a,cP(a))}function cR(a){var b,c=-1,d=a.length,e,f;while(++c&lt;d)b=a[c],e=b[0],f=b[1]+cl,b[0]=e*Math.cos(f),b[1]=e*Math.sin(f);return a}function cS(a){function j(f){if(f.length&lt;1)return null;var j=cs(this,f,b,d),k=cs(this,f,b===c?cT(j):c,d===e?cU(j):e);return&quot;M&quot;+g(a(k),i)+&quot;L&quot;+h(a(j.reverse()),i)+&quot;Z&quot;}var b=ct,c=ct,d=0,e=cu,f,g,h,i=.7;return j.x=function(a){return arguments.length?(b=c=a,j):c},j.x0=function(a){return arguments.length?(b=a,j):b},j.x1=function(a){return arguments.length?(c=a,j):c},j.y=function(a){return arguments.length?(d=e=a,j):e},j.y0=function(a){return arguments.length?(d=a,j):d},j.y1=function(a){return arguments.length?(e=a,j):e},j.interpolate=function(a){return arguments.length?(g=cv[f=a],h=g.reverse||g,j):f},j.tension=function(a){return arguments.length?(i=a,j):i},j.interpolate(&quot;linear&quot;)}function cT(a){return function(b,c){return a[c][0]}}function cU(a){return function(b,c){return a[c][1]}}function cV(a){return a.source}function cW(a){return a.target}function cX(a){return a.radius}function cY(a){return a.startAngle}function cZ(a){return a.endAngle}function c$(a){return[a.x,a.y]}function c_(a){return function(){var b=a.apply(this,arguments),c=b[0],d=b[1]+cl;return[c*Math.cos(d),c*Math.sin(d)]}}function db(a,b){var c=(a.ownerSVGElement||a).createSVGPoint();if(da&lt;0&amp;&amp;(window.scrollX||window.scrollY)){var d=d3.select(document.body).append(&quot;svg&quot;).style(&quot;position&quot;,&quot;absolute&quot;).style(&quot;top&quot;,0).style(&quot;left&quot;,0),e=d[0][0].getScreenCTM();da=!e.f&amp;&amp;!e.e,d.remove()}return da?(c.x=b.pageX,c.y=b.pageY):(c.x=b.clientX,c.y=b.clientY),c=c.matrixTransform(a.getScreenCTM().inverse()),[c.x,c.y]}function dc(){return 64}function dd(){return&quot;circle&quot;}function dh(a,b){a.attr(&quot;transform&quot;,function(a){return&quot;translate(&quot;+b(a)+&quot;,0)&quot;})}function di(a,b){a.attr(&quot;transform&quot;,function(a){return&quot;translate(0,&quot;+b(a)+&quot;)&quot;})}function dj(a,b,c){e=[];if(c&amp;&amp;b.length&gt;1){var d=bO(a.domain()),e,f=-1,g=b.length,h=(b[1]-b[0])/++c,i,j;while(++f&lt;g)for(i=c;--i&gt;0;)(j=+b[f]-i*h)&gt;=d[0]&amp;&amp;e.push(j);for(--f,i=0;++i&lt;c&amp;&amp;(j=+b[f]+i*h)&lt;d[1];)e.push(j)}return e}function dv(a,b){a.select(&quot;.extent&quot;).attr(&quot;x&quot;,b[0][0]),a.selectAll(&quot;.n,.s,.w,.nw,.sw&quot;).attr(&quot;x&quot;,b[0][0]-2),a.selectAll(&quot;.e,.ne,.se&quot;).attr(&quot;x&quot;,b[1][0]-3),a.selectAll(&quot;.extent,.n,.s&quot;).attr(&quot;width&quot;,b[1][0]-b[0][0])}function dw(a,b){a.select(&quot;.extent&quot;).attr(&quot;y&quot;,b[0][1]),a.selectAll(&quot;.n,.e,.w,.nw,.ne&quot;).attr(&quot;y&quot;,b[0][1]-3),a.selectAll(&quot;.s,.se,.sw&quot;).attr(&quot;y&quot;,b[1][1]-4),a.selectAll(&quot;.extent,.e,.w&quot;).attr(&quot;height&quot;,b[1][1]-b[0][1])}function dx(){d3.event.keyCode==32&amp;&amp;dm&amp;&amp;!dr&amp;&amp;(dt=null,du[0]-=dq[1][0],du[1]-=dq[1][1],dr=2,O())}function dy(){d3.event.keyCode==32&amp;&amp;dr==2&amp;&amp;(du[0]+=dq[1][0],du[1]+=dq[1][1],dr=0,O())}function dz(){if(du){var a=d3.svg.mouse(dm),b=d3.select(dm);dr||(d3.event.altKey?(dt||(dt=[(dq[0][0]+dq[1][0])/2,(dq[0][1]+dq[1][1])/2]),du[0]=dq[+(a[0]&lt;dt[0])][0],du[1]=dq[+(a[1]&lt;dt[1])][1]):dt=null),dn&amp;&amp;(dA(a,dn,0),dv(b,dq)),dp&amp;&amp;(dA(a,dp,1),dw(b,dq)),dl(&quot;brush&quot;)}}function dA(a,b,c){var d=bP(b),e=d[0],f=d[1],g=du[c],h=dq[1][c]-dq[0][c],i,j;dr&amp;&amp;(e-=g,f-=h+g),i=Math.max(e,Math.min(f,a[c])),dr?j=(i+=g)+h:(dt&amp;&amp;(g=Math.max(e,Math.min(f,2*dt[c]-i))),g&lt;i?(j=i,i=g):j=g),dq[0][c]=i,dq[1][c]=j}function dB(){du&amp;&amp;(dz(),d3.select(dm).selectAll(&quot;.resize&quot;).style(&quot;pointer-events&quot;,dk.empty()?&quot;none&quot;:&quot;all&quot;),dl(&quot;brushend&quot;),dk=dl=dm=dn=dp=dq=dr=ds=dt=du=null,O())}function dK(a){var b=dL(),c=d3.event,d=d3.event={type:a};b&amp;&amp;(d.x=b[0]+dH[0],d.y=b[1]+dH[1],d.dx=b[0]-dI[0],d.dy=b[1]-dI[1],dJ|=d.dx|d.dy,dI=b);try{dD[a].apply(dF,dG)}finally{d3.event=c}c.stopPropagation(),c.preventDefault()}function dL(){var a=dF.parentNode,b=d3.event.changedTouches;return a&amp;&amp;(b?d3.svg.touches(a,b)[0]:d3.svg.mouse(a))}function dM(){if(!dF)return;var a=dF.parentNode;if(!a)return dN();dK(&quot;drag&quot;),O()}function dN(){if(!dF)return;dK(&quot;dragend&quot;),dJ&amp;&amp;(O(),dJ=d3.event.target===dE),dD=dE=dF=dG=dH=dI=null}function dO(){dJ&amp;&amp;(O(),dJ=0)}function d_(a){return[a[0]-dU[0],a[1]-dU[1],dU[2]]}function ea(){dP||(dP=d3.select(&quot;body&quot;).append(&quot;div&quot;).style(&quot;visibility&quot;,&quot;hidden&quot;).style(&quot;top&quot;,0).style(&quot;height&quot;,0).style(&quot;width&quot;,0).style(&quot;overflow-y&quot;,&quot;scroll&quot;).append(&quot;div&quot;).style(&quot;height&quot;,&quot;2000px&quot;).node().parentNode);var a=d3.event,b;try{dP.scrollTop=1e3,dP.dispatchEvent(a),b=1e3-dP.scrollTop}catch(c){b=a.wheelDelta||-a.detail*5}return b*.005}function eb(){var a=d3.svg.touches(dY),b=-1,c=a.length,d;while(++b&lt;c)dS[(d=a[b]).identifier]=d_(d);return a}function ec(){var a=d3.svg.touches(dY);switch(a.length){case 1:var b=a[0];eg(dU[2],b,dS[b.identifier]);break;case 2:var c=a[0],d=a[1],e=[(c[0]+d[0])/2,(c[1]+d[1])/2],f=dS[c.identifier],g=dS[d.identifier],h=[(f[0]+g[0])/2,(f[1]+g[1])/2,f[2]];eg(Math.log(d3.event.scale)/Math.LN2+f[2],e,h)}}function ed(){dR=null,dQ&amp;&amp;(d$=1,eg(dU[2],d3.svg.mouse(dY),dQ))}function ee(){dQ&amp;&amp;(d$&amp;&amp;(O(),d$=dX===d3.event.target),dU=dV=dW=dX=dY=dZ=dQ=null)}function ef(){d$&amp;&amp;(O(),d$=0)}function eg(a,b,c){function l(a,b,c){a.domain(a.range().map(function(f){return a.invert((f-c)*d/e+b)}))}a=ei(a,2);var d=Math.pow(2,dU[2]),e=Math.pow(2,a),f=Math.pow(2,(dU[2]=a)-c[2]),g=dU[0],h=dU[1],i=dU[0]=ei(b[0]-c[0]*f,0,e),j=dU[1]=ei(b[1]-c[1]*f,1,e),k=d3.event;d3.event={scale:e,translate:[i,j],transform:function(a,b){a&amp;&amp;l(a,g,i),b&amp;&amp;l(b,h,j)}};try{dW.apply(dY,dZ)}finally{d3.event=k}k.preventDefault()}function ei(a,b,c){var d=dV[b],e=d[0],f=d[1];return arguments.length===3?Math.max(f*(f===Infinity?-Infinity:1/c-1),Math.min(e===-Infinity?Infinity:e,a/c))*c:Math.max(e,Math.min(f,a))}Date.now||(Date.now=function(){return+(new Date)});try{document.createElement(&quot;div&quot;).style.setProperty(&quot;opacity&quot;,0,&quot;&quot;)}catch(a){var b=CSSStyleDeclaration.prototype,c=b.setProperty;b.setProperty=function(a,b,d){c.call(this,a,b+&quot;&quot;,d)}}d3={version:&quot;2.7.3&quot;};var d=f;try{d(document.documentElement.childNodes)[0].nodeType}catch(g){d=e}var h=[].__proto__?function(a,b){a.__proto__=b}:function(a,b){for(var c in b)a[c]=b[c]};d3.functor=function(a){return typeof a==&quot;function&quot;?a:function(){return a}},d3.rebind=function(a,b){var c=1,d=arguments.length,e;while(++c&lt;d)a[e=arguments[c]]=j(a,b,b[e]);return a},d3.ascending=function(a,b){return a&lt;b?-1:a&gt;b?1:a&gt;=b?0:NaN},d3.descending=function(a,b){return b&lt;a?-1:b&gt;a?1:b&gt;=a?0:NaN},d3.mean=function(a,b){var c=a.length,d,e=0,f=-1,g=0;if(arguments.length===1)while(++f&lt;c)k(d=a[f])&amp;&amp;(e+=(d-e)/++g);else while(++f&lt;c)k(d=b.call(a,a[f],f))&amp;&amp;(e+=(d-e)/++g);return g?e:undefined},d3.median=function(a,b){return arguments.length&gt;1&amp;&amp;(a=a.map(b)),a=a.filter(k),a.length?d3.quantile(a.sort(d3.ascending),.5):undefined},d3.min=function(a,b){var c=-1,d=a.length,e,f;if(arguments.length===1){while(++c&lt;d&amp;&amp;((e=a[c])==null||e!=e))e=undefined;while(++c&lt;d)(f=a[c])!=null&amp;&amp;e&gt;f&amp;&amp;(e=f)}else{while(++c&lt;d&amp;&amp;((e=b.call(a,a[c],c))==null||e!=e))e=undefined;while(++c&lt;d)(f=b.call(a,a[c],c))!=null&amp;&amp;e&gt;f&amp;&amp;(e=f)}return e},d3.max=function(a,b){var c=-1,d=a.length,e,f;if(arguments.length===1){while(++c&lt;d&amp;&amp;((e=a[c])==null||e!=e))e=undefined;while(++c&lt;d)(f=a[c])!=null&amp;&amp;f&gt;e&amp;&amp;(e=f)}else{while(++c&lt;d&amp;&amp;((e=b.call(a,a[c],c))==null||e!=e))e=undefined;while(++c&lt;d)(f=b.call(a,a[c],c))!=null&amp;&amp;f&gt;e&amp;&amp;(e=f)}return e},d3.extent=function(a,b){var c=-1,d=a.length,e,f,g;if(arguments.length===1){while(++c&lt;d&amp;&amp;((e=g=a[c])==null||e!=e))e=g=undefined;while(++c&lt;d)(f=a[c])!=null&amp;&amp;(e&gt;f&amp;&amp;(e=f),g&lt;f&amp;&amp;(g=f))}else{while(++c&lt;d&amp;&amp;((e=g=b.call(a,a[c],c))==null||e!=e))e=undefined;while(++c&lt;d)(f=b.call(a,a[c],c))!=null&amp;&amp;(e&gt;f&amp;&amp;(e=f),g&lt;f&amp;&amp;(g=f))}return[e,g]},d3.random={normal:function(a,b){return arguments.length&lt;2&amp;&amp;(b=1),arguments.length&lt;1&amp;&amp;(a=0),function(){var c,d,e;do c=Math.random()*2-1,d=Math.random()*2-1,e=c*c+d*d;while(!e||e&gt;1);return a+b*c*Math.sqrt(-2*Math.log(e)/e)}}},d3.sum=function(a,b){var c=0,d=a.length,e,f=-1;if(arguments.length===1)while(++f&lt;d)isNaN(e=+a[f])||(c+=e);else while(++f&lt;d)isNaN(e=+b.call(a,a[f],f))||(c+=e);return c},d3.quantile=function(a,b){var c=(a.length-1)*b+1,d=Math.floor(c),e=a[d-1],f=c-d;return f?e+f*(a[d]-e):e},d3.transpose=function(a){return d3.zip.apply(d3,a)},d3.zip=function(){if(!(e=arguments.length))return[];for(var a=-1,b=d3.min(arguments,l),c=new Array(b);++a&lt;b;)for(var d=-1,e,f=c[a]=new Array(e);++d&lt;e;)f[d]=arguments[d][a];return c},d3.bisectLeft=function(a,b,c,d){arguments.length&lt;3&amp;&amp;(c=0),arguments.length&lt;4&amp;&amp;(d=a.length);while(c&lt;d){var e=c+d&gt;&gt;1;a[e]&lt;b?c=e+1:d=e}return c},d3.bisect=d3.bisectRight=function(a,b,c,d){arguments.length&lt;3&amp;&amp;(c=0),arguments.length&lt;4&amp;&amp;(d=a.length);while(c&lt;d){var e=c+d&gt;&gt;1;b&lt;a[e]?d=e:c=e+1}return c},d3.first=function(a,b){var c=0,d=a.length,e=a[0],f;arguments.length===1&amp;&amp;(b=d3.ascending);while(++c&lt;d)b.call(a,e,f=a[c])&gt;0&amp;&amp;(e=f);return e},d3.last=function(a,b){var c=0,d=a.length,e=a[0],f;arguments.length===1&amp;&amp;(b=d3.ascending);while(++c&lt;d)b.call(a,e,f=a[c])&lt;=0&amp;&amp;(e=f);return e},d3.nest=function(){function f(c,g){if(g&gt;=b.length)return e?e.call(a,c):d?c.sort(d):c;var h=-1,i=c.length,j=b[g++],k,l,m={};while(++h&lt;i)(k=j(l=c[h]))in m?m[k].push(l):m[k]=[l];for(k in m)m[k]=f(m[k],g);return m}function g(a,d){if(d&gt;=b.length)return a;var e=[],f=c[d++],h;for(h in a)e.push({key:h,values:g(a[h],d)});return f&amp;&amp;e.sort(function(a,b){return f(a.key,b.key)}),e}var a={},b=[],c=[],d,e;return a.map=function(a){return f(a,0)},a.entries=function(a){return g(f(a,0),0)},a.key=function(c){return b.push(c),a},a.sortKeys=function(d){return c[b.length-1]=d,a},a.sortValues=function(b){return d=b,a},a.rollup=function(b){return e=b,a},a},d3.keys=function(a){var b=[];for(var c in a)b.push(c);return b},d3.values=function(a){var b=[];for(var c in a)b.push(a[c]);return b},d3.entries=function(a){var b=[];for(var c in a)b.push({key:c,value:a[c]});return b},d3.permute=function(a,b){var c=[],d=-1,e=b.length;while(++d&lt;e)c[d]=a[b[d]];return c},d3.merge=function(a){return Array.prototype.concat.apply([],a)},d3.split=function(a,b){var c=[],d=[],e,f=-1,g=a.length;arguments.length&lt;2&amp;&amp;(b=m);while(++f&lt;g)b.call(d,e=a[f],f)?d=[]:(d.length||c.push(d),d.push(e));return c},d3.range=function(a,b,c){arguments.length&lt;3&amp;&amp;(c=1,arguments.length&lt;2&amp;&amp;(b=a,a=0));if((b-a)/c==Infinity)throw new Error(&quot;infinite range&quot;);var d=[],e=-1,f;if(c&lt;0)while((f=a+c*++e)&gt;b)d.push(f);else while((f=a+c*++e)&lt;b)d.push(f);return d},d3.requote=function(a){return a.replace(o,&quot;\\$&amp;&quot;)};var o=/[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g;d3.round=function(a,b){return b?Math.round(a*(b=Math.pow(10,b)))/b:Math.round(a)},d3.xhr=function(a,b,c){var d=new XMLHttpRequest;arguments.length&lt;3?(c=b,b=null):b&amp;&amp;d.overrideMimeType&amp;&amp;d.overrideMimeType(b),d.open(&quot;GET&quot;,a,!0),b&amp;&amp;d.setRequestHeader(&quot;Accept&quot;,b),d.onreadystatechange=function(){d.readyState===4&amp;&amp;c(d.status&lt;300?d:null)},d.send(null)},d3.text=function(a,b,c){function d(a){c(a&amp;&amp;a.responseText)}arguments.length&lt;3&amp;&amp;(c=b,b=null),d3.xhr(a,b,d)},d3.json=function(a,b){d3.text(a,&quot;application/json&quot;,function(a){b(a?JSON.parse(a):null)})},d3.html=function(a,b){d3.text(a,&quot;text/html&quot;,function(a){if(a!=null){var c=document.createRange();c.selectNode(document.body),a=c.createContextualFragment(a)}b(a)})},d3.xml=function(a,b,c){function d(a){c(a&amp;&amp;a.responseXML)}arguments.length&lt;3&amp;&amp;(c=b,b=null),d3.xhr(a,b,d)};var p={svg:&quot;http://www.w3.org/2000/svg&quot;,xhtml:&quot;http://www.w3.org/1999/xhtml&quot;,xlink:&quot;http://www.w3.org/1999/xlink&quot;,xml:&quot;http://www.w3.org/XML/1998/namespace&quot;,xmlns:&quot;http://www.w3.org/2000/xmlns/&quot;};d3.ns={prefix:p,qualify:function(a){var b=a.indexOf(&quot;:&quot;);return b&lt;0?a in p?{space:p[a],local:a}:a:{space:p[a.substring(0,b)],local:a.substring(b+1)}}},d3.dispatch=function(){var a=new q,b=-1,c=arguments.length;while(++b&lt;c)a[arguments[b]]=r();return a},q.prototype.on=function(a,b){var c=a.indexOf(&quot;.&quot;),d=&quot;&quot;;return c&gt;0&amp;&amp;(d=a.substring(c+1),a=a.substring(0,c)),arguments.length&lt;2?this[a].on(d):(this[a].on(d,b),this)},d3.format=function(a){var b=s.exec(a),c=b[1]||&quot; &quot;,d=b[3]||&quot;&quot;,e=b[5],f=+b[6],g=b[7],h=b[8],i=b[9],j=1,k=&quot;&quot;,l=!1;h&amp;&amp;(h=+h.substring(1)),e&amp;&amp;(c=&quot;0&quot;,g&amp;&amp;(f-=Math.floor((f-1)/4)));switch(i){case&quot;n&quot;:g=!0,i=&quot;g&quot;;break;case&quot;%&quot;:j=100,k=&quot;%&quot;,i=&quot;f&quot;;break;case&quot;p&quot;:j=100,k=&quot;%&quot;,i=&quot;r&quot;;break;case&quot;d&quot;:l=!0,h=0;break;case&quot;s&quot;:j=-1,i=&quot;r&quot;}return i==&quot;r&quot;&amp;&amp;!h&amp;&amp;(i=&quot;g&quot;),i=t[i]||v,function(a){if(l&amp;&amp;a%1)return&quot;&quot;;var b=a&lt;0&amp;&amp;(a=-a)?&quot;−&quot;:d;if(j&lt;0){var m=d3.formatPrefix(a,h);a*=m.scale,k=m.symbol}else a*=j;a=i(a,h);if(e){var n=a.length+b.length;n&lt;f&amp;&amp;(a=(new Array(f-n+1)).join(c)+a),g&amp;&amp;(a=w(a)),a=b+a}else{g&amp;&amp;(a=w(a)),a=b+a;var n=a.length;n&lt;f&amp;&amp;(a=(new Array(f-n+1)).join(c)+a)}return a+k}};var s=/(?:([^{])?([&lt;&gt;=^]))?([+\- ])?(#)?(0)?([0-9]+)?(,)?(\.[0-9]+)?([a-zA-Z%])?/,t={g:function(a,b){return a.toPrecision(b)},e:function(a,b){return a.toExponential(b)},f:function(a,b){return a.toFixed(b)},r:function(a,b){return d3.round(a,b=u(a,b)).toFixed(Math.max(0,Math.min(20,b)))}},x=[&quot;y&quot;,&quot;z&quot;,&quot;a&quot;,&quot;f&quot;,&quot;p&quot;,&quot;n&quot;,&quot;μ&quot;,&quot;m&quot;,&quot;&quot;,&quot;k&quot;,&quot;M&quot;,&quot;G&quot;,&quot;T&quot;,&quot;P&quot;,&quot;E&quot;,&quot;Z&quot;,&quot;Y&quot;].map(y);d3.formatPrefix=function(a,b){var c=0;return a&amp;&amp;(a&lt;0&amp;&amp;(a*=-1),b&amp;&amp;(a=d3.round(a,u(a,b))),c=1+Math.floor(1e-12+Math.log(a)/Math.LN10),c=Math.max(-24,Math.min(24,Math.floor((c&lt;=0?c+1:c-1)/3)*3))),x[8+c/3]};var z=H(2),A=H(3),B={linear:function(){return G},poly:H,quad:function(){return z},cubic:function(){return A},sin:function(){return I},exp:function(){return J},circle:function(){return K},elastic:L,back:M,bounce:function(){return N}},C={&quot;in&quot;:function(a){return a},out:E,&quot;in-out&quot;:F,&quot;out-in&quot;:function(a){return F(E(a))}};d3.ease=function(a){var b=a.indexOf(&quot;-&quot;),c=b&gt;=0?a.substring(0,b):a,d=b&gt;=0?a.substring(b+1):&quot;in&quot;;return D(C[d](B[c].apply(null,Array.prototype.slice.call(arguments,1))))},d3.event=null,d3.interpolate=function(a,b){var c=d3.interpolators.length,d;while(--c&gt;=0&amp;&amp;!(d=d3.interpolators[c](a,b)));return d},d3.interpolateNumber=function(a,b){return b-=a,function(c){return a+b*c}},d3.interpolateRound=function(a,b){return b-=a,function(c){return Math.round(a+b*c)}},d3.interpolateString=function(a,b){var c,d,e,f=0,g=0,h=[],i=[],j,k;P.lastIndex=0;for(d=0;c=P.exec(b);++d)c.index&amp;&amp;h.push(b.substring(f,g=c.index)),i.push({i:h.length,x:c[0]}),h.push(null),f=P.lastIndex;f&lt;b.length&amp;&amp;h.push(b.substring(f));for(d=0,j=i.length;(c=P.exec(a))&amp;&amp;d&lt;j;++d){k=i[d];if(k.x==c[0]){if(k.i)if(h[k.i+1]==null){h[k.i-1]+=k.x,h.splice(k.i,1);for(e=d+1;e&lt;j;++e)i[e].i--}else{h[k.i-1]+=k.x+h[k.i+1],h.splice(k.i,2);for(e=d+1;e&lt;j;++e)i[e].i-=2}else if(h[k.i+1]==null)h[k.i]=k.x;else{h[k.i]=k.x+h[k.i+1],h.splice(k.i+1,1);for(e=d+1;e&lt;j;++e)i[e].i--}i.splice(d,1),j--,d--}else k.x=d3.interpolateNumber(parseFloat(c[0]),parseFloat(k.x))}while(d&lt;j)k=i.pop(),h[k.i+1]==null?h[k.i]=k.x:(h[k.i]=k.x+h[k.i+1],h.splice(k.i+1,1)),j--;return h.length===1?h[0]==null?i[0].x:function(){return b}:function(a){for(d=0;d&lt;j;++d)h[(k=i[d]).i]=k.x(a);return h.join(&quot;&quot;)}},d3.interpolateTransform=function(a,b){return d3.interpolateString(d3.transform(a)+&quot;&quot;,d3.transform(b)+&quot;&quot;)},d3.interpolateRgb=function(a,b){a=d3.rgb(a),b=d3.rgb(b);var c=a.r,d=a.g,e=a.b,f=b.r-c,g=b.g-d,h=b.b-e;return function(a){return&quot;#&quot;+V(Math.round(c+f*a))+V(Math.round(d+g*a))+V(Math.round(e+h*a))}},d3.interpolateHsl=function(a,b){a=d3.hsl(a),b=d3.hsl(b);var c=a.h,d=a.s,e=a.l,f=b.h-c,g=b.s-d,h=b.l-e;return function(a){return bb(c+f*a,d+g*a,e+h*a).toString()}},d3.interpolateArray=function(a,b){var c=[],d=[],e=a.length,f=b.length,g=Math.min(a.length,b.length),h;for(h=0;h&lt;g;++h)c.push(d3.interpolate(a[h],b[h]));for(;h&lt;e;++h)d[h]=a[h];for(;h&lt;f;++h)d[h]=b[h];return function(a){for(h=0;h&lt;g;++h)d[h]=c[h](a);return d}},d3.interpolateObject=function(a,b){var c={},d={},e;for(e in a)e in b?c[e]=Q(e)(a[e],b[e]):d[e]=a[e];for(e in b)e in a||(d[e]=b[e]);return function(a){for(e in c)d[e]=c[e](a);return d}};var P=/[-+]?(?:\d*\.?\d+)(?:[eE][-+]?\d+)?/g;d3.interpolators=[d3.interpolateObject,function(a,b){return b instanceof Array&amp;&amp;d3.interpolateArray(a,b)},function(a,b){return(typeof a==&quot;string&quot;||typeof b==&quot;string&quot;)&amp;&amp;d3.interpolateString(a+&quot;&quot;,b+&quot;&quot;)},function(a,b){return(typeof b==&quot;string&quot;?b in Z||/^(#|rgb\(|hsl\()/.test(b):b instanceof U||b instanceof ba)&amp;&amp;d3.interpolateRgb(a,b)},function(a,b){return!isNaN(a=+a)&amp;&amp;!isNaN(b=+b)&amp;&amp;d3.interpolateNumber(a,b)}],d3.rgb=function(a,b,c){return arguments.length===1?a instanceof U?T(a.r,a.g,a.b):W(&quot;&quot;+a,T,bb):T(~~a,~~b,~~c)},U.prototype.brighter=function(a){a=Math.pow(.7,arguments.length?a:1);var b=this.r,c=this.g,d=this.b,e=30;return!b&amp;&amp;!c&amp;&amp;!d?T(e,e,e):(b&amp;&amp;b&lt;e&amp;&amp;(b=e),c&amp;&amp;c&lt;e&amp;&amp;(c=e),d&amp;&amp;d&lt;e&amp;&amp;(d=e),T(Math.min(255,Math.floor(b/a)),Math.min(255,Math.floor(c/a)),Math.min(255,Math.floor(d/a))))},U.prototype.darker=function(a){return a=Math.pow(.7,arguments.length?a:1),T(Math.floor(a*this.r),Math.floor(a*this.g),Math.floor(a*this.b))},U.prototype.hsl=function(){return X(this.r,this.g,this.b)},U.prototype.toString=function(){return&quot;#&quot;+V(this.r)+V(this.g)+V(this.b)};var Z={aliceblue:&quot;#f0f8ff&quot;,antiquewhite:&quot;#faebd7&quot;,aqua:&quot;#00ffff&quot;,aquamarine:&quot;#7fffd4&quot;,azure:&quot;#f0ffff&quot;,beige:&quot;#f5f5dc&quot;,bisque:&quot;#ffe4c4&quot;,black:&quot;#000000&quot;,blanchedalmond:&quot;#ffebcd&quot;,blue:&quot;#0000ff&quot;,blueviolet:&quot;#8a2be2&quot;,brown:&quot;#a52a2a&quot;,burlywood:&quot;#deb887&quot;,cadetblue:&quot;#5f9ea0&quot;,chartreuse:&quot;#7fff00&quot;,chocolate:&quot;#d2691e&quot;,coral:&quot;#ff7f50&quot;,cornflowerblue:&quot;#6495ed&quot;,cornsilk:&quot;#fff8dc&quot;,crimson:&quot;#dc143c&quot;,cyan:&quot;#00ffff&quot;,darkblue:&quot;#00008b&quot;,darkcyan:&quot;#008b8b&quot;,darkgoldenrod:&quot;#b8860b&quot;,darkgray:&quot;#a9a9a9&quot;,darkgreen:&quot;#006400&quot;,darkgrey:&quot;#a9a9a9&quot;,darkkhaki:&quot;#bdb76b&quot;,darkmagenta:&quot;#8b008b&quot;,darkolivegreen</div><div class='line' id='LC2'>:&quot;#556b2f&quot;,darkorange:&quot;#ff8c00&quot;,darkorchid:&quot;#9932cc&quot;,darkred:&quot;#8b0000&quot;,darksalmon:&quot;#e9967a&quot;,darkseagreen:&quot;#8fbc8f&quot;,darkslateblue:&quot;#483d8b&quot;,darkslategray:&quot;#2f4f4f&quot;,darkslategrey:&quot;#2f4f4f&quot;,darkturquoise:&quot;#00ced1&quot;,darkviolet:&quot;#9400d3&quot;,deeppink:&quot;#ff1493&quot;,deepskyblue:&quot;#00bfff&quot;,dimgray:&quot;#696969&quot;,dimgrey:&quot;#696969&quot;,dodgerblue:&quot;#1e90ff&quot;,firebrick:&quot;#b22222&quot;,floralwhite:&quot;#fffaf0&quot;,forestgreen:&quot;#228b22&quot;,fuchsia:&quot;#ff00ff&quot;,gainsboro:&quot;#dcdcdc&quot;,ghostwhite:&quot;#f8f8ff&quot;,gold:&quot;#ffd700&quot;,goldenrod:&quot;#daa520&quot;,gray:&quot;#808080&quot;,green:&quot;#008000&quot;,greenyellow:&quot;#adff2f&quot;,grey:&quot;#808080&quot;,honeydew:&quot;#f0fff0&quot;,hotpink:&quot;#ff69b4&quot;,indianred:&quot;#cd5c5c&quot;,indigo:&quot;#4b0082&quot;,ivory:&quot;#fffff0&quot;,khaki:&quot;#f0e68c&quot;,lavender:&quot;#e6e6fa&quot;,lavenderblush:&quot;#fff0f5&quot;,lawngreen:&quot;#7cfc00&quot;,lemonchiffon:&quot;#fffacd&quot;,lightblue:&quot;#add8e6&quot;,lightcoral:&quot;#f08080&quot;,lightcyan:&quot;#e0ffff&quot;,lightgoldenrodyellow:&quot;#fafad2&quot;,lightgray:&quot;#d3d3d3&quot;,lightgreen:&quot;#90ee90&quot;,lightgrey:&quot;#d3d3d3&quot;,lightpink:&quot;#ffb6c1&quot;,lightsalmon:&quot;#ffa07a&quot;,lightseagreen:&quot;#20b2aa&quot;,lightskyblue:&quot;#87cefa&quot;,lightslategray:&quot;#778899&quot;,lightslategrey:&quot;#778899&quot;,lightsteelblue:&quot;#b0c4de&quot;,lightyellow:&quot;#ffffe0&quot;,lime:&quot;#00ff00&quot;,limegreen:&quot;#32cd32&quot;,linen:&quot;#faf0e6&quot;,magenta:&quot;#ff00ff&quot;,maroon:&quot;#800000&quot;,mediumaquamarine:&quot;#66cdaa&quot;,mediumblue:&quot;#0000cd&quot;,mediumorchid:&quot;#ba55d3&quot;,mediumpurple:&quot;#9370db&quot;,mediumseagreen:&quot;#3cb371&quot;,mediumslateblue:&quot;#7b68ee&quot;,mediumspringgreen:&quot;#00fa9a&quot;,mediumturquoise:&quot;#48d1cc&quot;,mediumvioletred:&quot;#c71585&quot;,midnightblue:&quot;#191970&quot;,mintcream:&quot;#f5fffa&quot;,mistyrose:&quot;#ffe4e1&quot;,moccasin:&quot;#ffe4b5&quot;,navajowhite:&quot;#ffdead&quot;,navy:&quot;#000080&quot;,oldlace:&quot;#fdf5e6&quot;,olive:&quot;#808000&quot;,olivedrab:&quot;#6b8e23&quot;,orange:&quot;#ffa500&quot;,orangered:&quot;#ff4500&quot;,orchid:&quot;#da70d6&quot;,palegoldenrod:&quot;#eee8aa&quot;,palegreen:&quot;#98fb98&quot;,paleturquoise:&quot;#afeeee&quot;,palevioletred:&quot;#db7093&quot;,papayawhip:&quot;#ffefd5&quot;,peachpuff:&quot;#ffdab9&quot;,peru:&quot;#cd853f&quot;,pink:&quot;#ffc0cb&quot;,plum:&quot;#dda0dd&quot;,powderblue:&quot;#b0e0e6&quot;,purple:&quot;#800080&quot;,red:&quot;#ff0000&quot;,rosybrown:&quot;#bc8f8f&quot;,royalblue:&quot;#4169e1&quot;,saddlebrown:&quot;#8b4513&quot;,salmon:&quot;#fa8072&quot;,sandybrown:&quot;#f4a460&quot;,seagreen:&quot;#2e8b57&quot;,seashell:&quot;#fff5ee&quot;,sienna:&quot;#a0522d&quot;,silver:&quot;#c0c0c0&quot;,skyblue:&quot;#87ceeb&quot;,slateblue:&quot;#6a5acd&quot;,slategray:&quot;#708090&quot;,slategrey:&quot;#708090&quot;,snow:&quot;#fffafa&quot;,springgreen:&quot;#00ff7f&quot;,steelblue:&quot;#4682b4&quot;,tan:&quot;#d2b48c&quot;,teal:&quot;#008080&quot;,thistle:&quot;#d8bfd8&quot;,tomato:&quot;#ff6347&quot;,turquoise:&quot;#40e0d0&quot;,violet:&quot;#ee82ee&quot;,wheat:&quot;#f5deb3&quot;,white:&quot;#ffffff&quot;,whitesmoke:&quot;#f5f5f5&quot;,yellow:&quot;#ffff00&quot;,yellowgreen:&quot;#9acd32&quot;};for(var $ in Z)Z[$]=W(Z[$],T,bb);d3.hsl=function(a,b,c){return arguments.length===1?a instanceof ba?_(a.h,a.s,a.l):W(&quot;&quot;+a,X,_):_(+a,+b,+c)},ba.prototype.brighter=function(a){return a=Math.pow(.7,arguments.length?a:1),_(this.h,this.s,this.l/a)},ba.prototype.darker=function(a){return a=Math.pow(.7,arguments.length?a:1),_(this.h,this.s,a*this.l)},ba.prototype.rgb=function(){return bb(this.h,this.s,this.l)},ba.prototype.toString=function(){return this.rgb().toString()};var bd=function(a,b){return b.querySelector(a)},be=function(a,b){return b.querySelectorAll(a)},bf=document.documentElement,bg=bf.matchesSelector||bf.webkitMatchesSelector||bf.mozMatchesSelector||bf.msMatchesSelector||bf.oMatchesSelector,bh=function(a,b){return bg.call(a,b)};typeof Sizzle==&quot;function&quot;&amp;&amp;(bd=function(a,b){return Sizzle(a,b)[0]},be=function(a,b){return Sizzle.uniqueSort(Sizzle(a,b))},bh=Sizzle.matchesSelector);var bi=[];d3.selection=function(){return bq},d3.selection.prototype=bi,bi.select=function(a){var b=[],c,d,e,f;typeof a!=&quot;function&quot;&amp;&amp;(a=bj(a));for(var g=-1,h=this.length;++g&lt;h;){b.push(c=[]),c.parentNode=(e=this[g]).parentNode;for(var i=-1,j=e.length;++i&lt;j;)(f=e[i])?(c.push(d=a.call(f,f.__data__,i)),d&amp;&amp;&quot;__data__&quot;in f&amp;&amp;(d.__data__=f.__data__)):c.push(null)}return bc(b)},bi.selectAll=function(a){var b=[],c,e;typeof a!=&quot;function&quot;&amp;&amp;(a=bk(a));for(var f=-1,g=this.length;++f&lt;g;)for(var h=this[f],i=-1,j=h.length;++i&lt;j;)if(e=h[i])b.push(c=d(a.call(e,e.__data__,i))),c.parentNode=e;return bc(b)},bi.attr=function(a,b){function d(){this.removeAttribute(a)}function e(){this.removeAttributeNS(a.space,a.local)}function f(){this.setAttribute(a,b)}function g(){this.setAttributeNS(a.space,a.local,b)}function h(){var c=b.apply(this,arguments);c==null?this.removeAttribute(a):this.setAttribute(a,c)}function i(){var c=b.apply(this,arguments);c==null?this.removeAttributeNS(a.space,a.local):this.setAttributeNS(a.space,a.local,c)}a=d3.ns.qualify(a);if(arguments.length&lt;2){var c=this.node();return a.local?c.getAttributeNS(a.space,a.local):c.getAttribute(a)}return this.each(b==null?a.local?e:d:typeof b==&quot;function&quot;?a.local?i:h:a.local?g:f)},bi.classed=function(a,b){var c=a.split(bl),d=c.length,e=-1;if(arguments.length&gt;1){while(++e&lt;d)bm.call(this,c[e],b);return this}while(++e&lt;d)if(!bm.call(this,c[e]))return!1;return!0};var bl=/\s+/g;bi.style=function(a,b,c){function d(){this.style.removeProperty(a)}function e(){this.style.setProperty(a,b,c)}function f(){var d=b.apply(this,arguments);d==null?this.style.removeProperty(a):this.style.setProperty(a,d,c)}return arguments.length&lt;3&amp;&amp;(c=&quot;&quot;),arguments.length&lt;2?window.getComputedStyle(this.node(),null).getPropertyValue(a):this.each(b==null?d:typeof b==&quot;function&quot;?f:e)},bi.property=function(a,b){function c(){delete this[a]}function d(){this[a]=b}function e(){var c=b.apply(this,arguments);c==null?delete this[a]:this[a]=c}return arguments.length&lt;2?this.node()[a]:this.each(b==null?c:typeof b==&quot;function&quot;?e:d)},bi.text=function(a){return arguments.length&lt;1?this.node().textContent:this.each(typeof a==&quot;function&quot;?function(){var b=a.apply(this,arguments);this.textContent=b==null?&quot;&quot;:b}:a==null?function(){this.textContent=&quot;&quot;}:function(){this.textContent=a})},bi.html=function(a){return arguments.length&lt;1?this.node().innerHTML:this.each(typeof a==&quot;function&quot;?function(){var b=a.apply(this,arguments);this.innerHTML=b==null?&quot;&quot;:b}:a==null?function(){this.innerHTML=&quot;&quot;}:function(){this.innerHTML=a})},bi.append=function(a){function b(){return this.appendChild(document.createElementNS(this.namespaceURI,a))}function c(){return this.appendChild(document.createElementNS(a.space,a.local))}return a=d3.ns.qualify(a),this.select(a.local?c:b)},bi.insert=function(a,b){function c(){return this.insertBefore(document.createElementNS(this.namespaceURI,a),bd(b,this))}function d(){return this.insertBefore(document.createElementNS(a.space,a.local),bd(b,this))}return a=d3.ns.qualify(a),this.select(a.local?d:c)},bi.remove=function(){return this.each(function(){var a=this.parentNode;a&amp;&amp;a.removeChild(this)})},bi.data=function(a,b){function f(a,f){var g,h=a.length,i=f.length,j=Math.min(h,i),k=Math.max(h,i),l=[],m=[],n=[],o,p;if(b){var q={},r=[],s,t=f.length;for(g=-1;++g&lt;h;)s=b.call(o=a[g],o.__data__,g),s in q?n[t++]=o:q[s]=o,r.push(s);for(g=-1;++g&lt;i;)o=q[s=b.call(f,p=f[g],g)],o?(o.__data__=p,l[g]=o,m[g]=n[g]=null):(m[g]=bn(p),l[g]=n[g]=null),delete q[s];for(g=-1;++g&lt;h;)r[g]in q&amp;&amp;(n[g]=a[g])}else{for(g=-1;++g&lt;j;)o=a[g],p=f[g],o?(o.__data__=p,l[g]=o,m[g]=n[g]=null):(m[g]=bn(p),l[g]=n[g]=null);for(;g&lt;i;++g)m[g]=bn(f[g]),l[g]=n[g]=null;for(;g&lt;k;++g)n[g]=a[g],m[g]=l[g]=null}m.update=l,m.parentNode=l.parentNode=n.parentNode=a.parentNode,c.push(m),d.push(l),e.push(n)}var c=[],d=[],e=[],g=-1,h=this.length,i;if(typeof a==&quot;function&quot;)while(++g&lt;h)f(i=this[g],a.call(i,i.parentNode.__data__,g));else while(++g&lt;h)f(i=this[g],a);var j=bc(d);return j.enter=function(){return br(c)},j.exit=function(){return bc(e)},j},bi.filter=function(a){var b=[],c,d,e;typeof a!=&quot;function&quot;&amp;&amp;(a=bo(a));for(var f=0,g=this.length;f&lt;g;f++){b.push(c=[]),c.parentNode=(d=this[f]).parentNode;for(var h=0,i=d.length;h&lt;i;h++)(e=d[h])&amp;&amp;a.call(e,e.__data__,h)&amp;&amp;c.push(e)}return bc(b)},bi.map=function(a){return this.each(function(){this.__data__=a.apply(this,arguments)})},bi.order=function(){for(var a=-1,b=this.length;++a&lt;b;)for(var c=this[a],d=c.length-1,e=c[d],f;--d&gt;=0;)if(f=c[d])e&amp;&amp;e!==f.nextSibling&amp;&amp;e.parentNode.insertBefore(f,e),e=f;return this},bi.sort=function(a){a=bp.apply(this,arguments);for(var b=-1,c=this.length;++b&lt;c;)this[b].sort(a);return this.order()},bi.on=function(a,b,c){arguments.length&lt;3&amp;&amp;(c=!1);var d=&quot;__on&quot;+a,e=a.indexOf(&quot;.&quot;);return e&gt;0&amp;&amp;(a=a.substring(0,e)),arguments.length&lt;2?(e=this.node()[d])&amp;&amp;e._:this.each(function(e,f){function h(a){var c=d3.event;d3.event=a;try{b.call(g,g.__data__,f)}finally{d3.event=c}}var g=this;g[d]&amp;&amp;g.removeEventListener(a,g[d],c),b&amp;&amp;g.addEventListener(a,g[d]=h,c),h._=b})},bi.each=function(a){for(var b=-1,c=this.length;++b&lt;c;)for(var d=this[b],e=-1,f=d.length;++e&lt;f;){var g=d[e];g&amp;&amp;a.call(g,g.__data__,e,b)}return this},bi.call=function(a){return a.apply(this,(arguments[0]=this,arguments)),this},bi.empty=function(){return!this.node()},bi.node=function(a){for(var b=0,c=this.length;b&lt;c;b++)for(var d=this[b],e=0,f=d.length;e&lt;f;e++){var g=d[e];if(g)return g}return null},bi.transition=function(){var a=[],b,c;for(var d=-1,e=this.length;++d&lt;e;){a.push(b=[]);for(var f=this[d],g=-1,h=f.length;++g&lt;h;)b.push((c=f[g])?{node:c,delay:0,duration:250}:null)}return bt(a,bz||++by,Date.now())};var bq=bc([[document]]);bq[0].parentNode=bf,d3.select=function(a){return typeof a==&quot;string&quot;?bq.select(a):bc([[a]])},d3.selectAll=function(a){return typeof a==&quot;string&quot;?bq.selectAll(a):bc([d(a)])};var bs=[];bs.append=bi.append,bs.insert=bi.insert,bs.empty=bi.empty,bs.node=bi.node,bs.select=function(a){var b=[],c,d,e,f,g;for(var h=-1,i=this.length;++h&lt;i;){e=(f=this[h]).update,b.push(c=[]),c.parentNode=f.parentNode;for(var j=-1,k=f.length;++j&lt;k;)(g=f[j])?(c.push(e[j]=d=a.call(f.parentNode,g.__data__,j)),d.__data__=g.__data__):c.push(null)}return bc(b)};var bu={},bx=[],by=0,bz=0,bA=d3.ease(&quot;cubic-in-out&quot;);bx.call=bi.call,d3.transition=function(){return bq.transition()},d3.transition.prototype=bx,bx.select=function(a){var b=[],c,d,e;typeof a!=&quot;function&quot;&amp;&amp;(a=bj(a));for(var f=-1,g=this.length;++f&lt;g;){b.push(c=[]);for(var h=this[f],i=-1,j=h.length;++i&lt;j;)(e=h[i])&amp;&amp;(d=a.call(e.node,e.node.__data__,i))?(&quot;__data__&quot;in e.node&amp;&amp;(d.__data__=e.node.__data__),c.push({node:d,delay:e.delay,duration:e.duration})):c.push(null)}return bt(b,this.id,this.time).ease(this.ease())},bx.selectAll=function(a){var b=[],c,d,e;typeof a!=&quot;function&quot;&amp;&amp;(a=bk(a));for(var f=-1,g=this.length;++f&lt;g;)for(var h=this[f],i=-1,j=h.length;++i&lt;j;)if(e=h[i]){d=a.call(e.node,e.node.__data__,i),b.push(c=[]);for(var k=-1,l=d.length;++k&lt;l;)c.push({node:d[k],delay:e.delay,duration:e.duration})}return bt(b,this.id,this.time).ease(this.ease())},bx.attr=function(a,b){return this.attrTween(a,bw(a,b))},bx.attrTween=function(a,b){function d(a,d){var e=b.call(this,a,d,this.getAttribute(c));return e===bu?(this.removeAttribute(c),null):e&amp;&amp;function(a){this.setAttribute(c,e(a))}}function e(a,d){var e=b.call(this,a,d,this.getAttributeNS(c.space,c.local));return e===bu?(this.removeAttributeNS(c.space,c.local),null):e&amp;&amp;function(a){this.setAttributeNS(c.space,c.local,e(a))}}var c=d3.ns.qualify(a);return this.tween(&quot;attr.&quot;+a,c.local?e:d)},bx.style=function(a,b,c){return arguments.length&lt;3&amp;&amp;(c=&quot;&quot;),this.styleTween(a,bw(a,b),c)},bx.styleTween=function(a,b,c){return arguments.length&lt;3&amp;&amp;(c=&quot;&quot;),this.tween(&quot;style.&quot;+a,function(d,e){var f=b.call(this,d,e,window.getComputedStyle(this,null).getPropertyValue(a));return f===bu?(this.style.removeProperty(a),null):f&amp;&amp;function(b){this.style.setProperty(a,f(b),c)}})},bx.text=function(a){return this.tween(&quot;text&quot;,function(b,c){this.textContent=typeof a==&quot;function&quot;?a.call(this,b,c):a})},bx.remove=function(){return this.each(&quot;end.transition&quot;,function(){var a;!this.__transition__&amp;&amp;(a=this.parentNode)&amp;&amp;a.removeChild(this)})},bx.delay=function(a){var b=this;return b.each(typeof a==&quot;function&quot;?function(c,d,e){b[e][d].delay=+a.apply(this,arguments)}:(a=+a,function(c,d,e){b[e][d].delay=a}))},bx.duration=function(a){var b=this;return b.each(typeof a==&quot;function&quot;?function(c,d,e){b[e][d].duration=+a.apply(this,arguments)}:(a=+a,function(c,d,e){b[e][d].duration=a}))},bx.transition=function(){return this.select(i)};var bC=null,bD,bE;d3.timer=function(a,b,c){var d=!1,e,f=bC;if(arguments.length&lt;3){if(arguments.length&lt;2)b=0;else if(!isFinite(b))return;c=Date.now()}while(f){if(f.callback===a){f.then=c,f.delay=b,d=!0;break}e=f,f=f.next}d||(bC={callback:a,then:c,delay:b,next:bC}),bD||(bE=clearTimeout(bE),bD=1,bH(bF))},d3.timer.flush=function(){var a,b=Date.now(),c=bC;while(c)a=b-c.then,c.delay||(c.flush=c.callback(a)),c=c.next;bG()};var bH=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(a){setTimeout(a,17)};d3.transform=function(a){var b=document.createElementNS(d3.ns.prefix.svg,&quot;g&quot;),c={a:1,b:0,c:0,d:1,e:0,f:0};return(d3.transform=function(a){b.setAttribute(&quot;transform&quot;,a);var d=b.transform.baseVal.consolidate();return new bI(d?d.matrix:c)})(a)},bI.prototype.toString=function(){return&quot;translate(&quot;+this.translate+&quot;)rotate(&quot;+this.rotate+&quot;)skewX(&quot;+this.skew+&quot;)scale(&quot;+this.scale+&quot;)&quot;};var bM=180/Math.PI;d3.scale={},d3.scale.linear=function(){return bS([0,1],[0,1],d3.interpolate,!1)},d3.scale.log=function(){return b$(d3.scale.linear(),ca)};var b_=d3.format(&quot;.0e&quot;);ca.pow=function(a){return Math.pow(10,a)},cb.pow=function(a){return-Math.pow(10,-a)},d3.scale.pow=function(){return cc(d3.scale.linear(),1)},d3.scale.sqrt=function(){return d3.scale.pow().exponent(.5)},d3.scale.ordinal=function(){return ce([],{t:&quot;range&quot;,x:[]})},d3.scale.category10=function(){return d3.scale.ordinal().range(cf)},d3.scale.category20=function(){return d3.scale.ordinal().range(cg)},d3.scale.category20b=function(){return d3.scale.ordinal().range(ch)},d3.scale.category20c=function(){return d3.scale.ordinal().range(ci)};var cf=[&quot;#1f77b4&quot;,&quot;#ff7f0e&quot;,&quot;#2ca02c&quot;,&quot;#d62728&quot;,&quot;#9467bd&quot;,&quot;#8c564b&quot;,&quot;#e377c2&quot;,&quot;#7f7f7f&quot;,&quot;#bcbd22&quot;,&quot;#17becf&quot;],cg=[&quot;#1f77b4&quot;,&quot;#aec7e8&quot;,&quot;#ff7f0e&quot;,&quot;#ffbb78&quot;,&quot;#2ca02c&quot;,&quot;#98df8a&quot;,&quot;#d62728&quot;,&quot;#ff9896&quot;,&quot;#9467bd&quot;,&quot;#c5b0d5&quot;,&quot;#8c564b&quot;,&quot;#c49c94&quot;,&quot;#e377c2&quot;,&quot;#f7b6d2&quot;,&quot;#7f7f7f&quot;,&quot;#c7c7c7&quot;,&quot;#bcbd22&quot;,&quot;#dbdb8d&quot;,&quot;#17becf&quot;,&quot;#9edae5&quot;],ch=[&quot;#393b79&quot;,&quot;#5254a3&quot;,&quot;#6b6ecf&quot;,&quot;#9c9ede&quot;,&quot;#637939&quot;,&quot;#8ca252&quot;,&quot;#b5cf6b&quot;,&quot;#cedb9c&quot;,&quot;#8c6d31&quot;,&quot;#bd9e39&quot;,&quot;#e7ba52&quot;,&quot;#e7cb94&quot;,&quot;#843c39&quot;,&quot;#ad494a&quot;,&quot;#d6616b&quot;,&quot;#e7969c&quot;,&quot;#7b4173&quot;,&quot;#a55194&quot;,&quot;#ce6dbd&quot;,&quot;#de9ed6&quot;],ci=[&quot;#3182bd&quot;,&quot;#6baed6&quot;,&quot;#9ecae1&quot;,&quot;#c6dbef&quot;,&quot;#e6550d&quot;,&quot;#fd8d3c&quot;,&quot;#fdae6b&quot;,&quot;#fdd0a2&quot;,&quot;#31a354&quot;,&quot;#74c476&quot;,&quot;#a1d99b&quot;,&quot;#c7e9c0&quot;,&quot;#756bb1&quot;,&quot;#9e9ac8&quot;,&quot;#bcbddc&quot;,&quot;#dadaeb&quot;,&quot;#636363&quot;,&quot;#969696&quot;,&quot;#bdbdbd&quot;,&quot;#d9d9d9&quot;];d3.scale.quantile=function(){return cj([],[])},d3.scale.quantize=function(){return ck(0,1,[0,1])},d3.svg={},d3.svg.arc=function(){function e(){var e=a.apply(this,arguments),f=b.apply(this,arguments),g=c.apply(this,arguments)+cl,h=d.apply(this,arguments)+cl,i=(h&lt;g&amp;&amp;(i=g,g=h,h=i),h-g),j=i&lt;Math.PI?&quot;0&quot;:&quot;1&quot;,k=Math.cos(g),l=Math.sin(g),m=Math.cos(h),n=Math.sin(h);return i&gt;=cm?e?&quot;M0,&quot;+f+&quot;A&quot;+f+&quot;,&quot;+f+&quot; 0 1,1 0,&quot;+ -f+&quot;A&quot;+f+&quot;,&quot;+f+&quot; 0 1,1 0,&quot;+f+&quot;M0,&quot;+e+&quot;A&quot;+e+&quot;,&quot;+e+&quot; 0 1,0 0,&quot;+ -e+&quot;A&quot;+e+&quot;,&quot;+e+&quot; 0 1,0 0,&quot;+e+&quot;Z&quot;:&quot;M0,&quot;+f+&quot;A&quot;+f+&quot;,&quot;+f+&quot; 0 1,1 0,&quot;+ -f+&quot;A&quot;+f+&quot;,&quot;+f+&quot; 0 1,1 0,&quot;+f+&quot;Z&quot;:e?&quot;M&quot;+f*k+&quot;,&quot;+f*l+&quot;A&quot;+f+&quot;,&quot;+f+&quot; 0 &quot;+j+&quot;,1 &quot;+f*m+&quot;,&quot;+f*n+&quot;L&quot;+e*m+&quot;,&quot;+e*n+&quot;A&quot;+e+&quot;,&quot;+e+&quot; 0 &quot;+j+&quot;,0 &quot;+e*k+&quot;,&quot;+e*l+&quot;Z&quot;:&quot;M&quot;+f*k+&quot;,&quot;+f*l+&quot;A&quot;+f+&quot;,&quot;+f+&quot; 0 &quot;+j+&quot;,1 &quot;+f*m+&quot;,&quot;+f*n+&quot;L0,0&quot;+&quot;Z&quot;}var a=cn,b=co,c=cp,d=cq;return e.innerRadius=function(b){return arguments.length?(a=d3.functor(b),e):a},e.outerRadius=function(a){return arguments.length?(b=d3.functor(a),e):b},e.startAngle=function(a){return arguments.length?(c=d3.functor(a),e):c},e.endAngle=function(a){return arguments.length?(d=d3.functor(a),e):d},e.centroid=function(){var e=(a.apply(this,arguments)+b.apply(this,arguments))/2,f=(c.apply(this,arguments)+d.apply(this,arguments))/2+cl;return[Math.cos(f)*e,Math.sin(f)*e]},e};var cl=-Math.PI/2,cm=2*Math.PI-1e-6;d3.svg.line=function(){return cr(Object)};var cv={linear:cw,&quot;step-before&quot;:cx,&quot;step-after&quot;:cy,basis:cE,&quot;basis-open&quot;:cF,&quot;basis-closed&quot;:cG,bundle:cH,cardinal:cB,&quot;cardinal-open&quot;:cz,&quot;cardinal-closed&quot;:cA,monotone:cQ},cJ=[0,2/3,1/3,0],cK=[0,1/3,2/3,0],cL=[0,1/6,2/3,1/6];d3.svg.line.radial=function(){var a=cr(cR);return a.radius=a.x,delete a.x,a.angle=a.y,delete a.y,a},cx.reverse=cy,cy.reverse=cx,d3.svg.area=function(){return cS(Object)},d3.svg.area.radial=function(){var a=cS(cR);return a.radius=a.x,delete a.x,a.innerRadius=a.x0,delete a.x0,a.outerRadius=a.x1,delete a.x1,a.angle=a.y,delete a.y,a.startAngle=a.y0,delete a.y0,a.endAngle=a.y1,delete a.y1,a},d3.svg.chord=function(){function f(c,d){var e=g(this,a,c,d),f=g(this,b,c,d);return&quot;M&quot;+e.p0+i(e.r,e.p1,e.a1-e.a0)+(h(e,f)?j(e.r,e.p1,e.r,e.p0):j(e.r,e.p1,f.r,f.p0)+i(f.r,f.p1,f.a1-f.a0)+j(f.r,f.p1,e.r,e.p0))+&quot;Z&quot;}function g(a,b,f,g){var h=b.call(a,f,g),i=c.call(a,h,g),j=d.call(a,h,g)+cl,k=e.call(a,h,g)+cl;return{r:i,a0:j,a1:k,p0:[i*Math.cos(j),i*Math.sin(j)],p1:[i*Math.cos(k),i*Math.sin(k)]}}function h(a,b){return a.a0==b.a0&amp;&amp;a.a1==b.a1}function i(a,b,c){return&quot;A&quot;+a+&quot;,&quot;+a+&quot; 0 &quot;+ +(c&gt;Math.PI)+&quot;,1 &quot;+b}function j(a,b,c,d){return&quot;Q 0,0 &quot;+d}var a=cV,b=cW,c=cX,d=cp,e=cq;return f.radius=function(a){return arguments.length?(c=d3.functor(a),f):c},f.source=function(b){return arguments.length?(a=d3.functor(b),f):a},f.target=function(a){return arguments.length?(b=d3.functor(a),f):b},f.startAngle=function(a){return arguments.length?(d=d3.functor(a),f):d},f.endAngle=function(a){return arguments.length?(e=d3.functor(a),f):e},f},d3.svg.diagonal=function(){function d(d,e){var f=a.call(this,d,e),g=b.call(this,d,e),h=(f.y+g.y)/2,i=[f,{x:f.x,y:h},{x:g.x,y:h},g];return i=i.map(c),&quot;M&quot;+i[0]+&quot;C&quot;+i[1]+&quot; &quot;+i[2]+&quot; &quot;+i[3]}var a=cV,b=cW,c=c$;return d.source=function(b){return arguments.length?(a=d3.functor(b),d):a},d.target=function(a){return arguments.length?(b=d3.functor(a),d):b},d.projection=function(a){return arguments.length?(c=a,d):c},d},d3.svg.diagonal.radial=function(){var a=d3.svg.diagonal(),b=c$,c=a.projection;return a.projection=function(a){return arguments.length?c(c_(b=a)):b},a},d3.svg.mouse=function(a){return db(a,d3.event)};var da=/WebKit/.test(navigator.userAgent)?-1:0;d3.svg.touches=function(a,b){return arguments.length&lt;2&amp;&amp;(b=d3.event.touches),b?d(b).map(function(b){var c=db(a,b);return c.identifier=b.identifier,c}):[]},d3.svg.symbol=function(){function c(c,d){return(de[a.call(this,c,d)]||de.circle)(b.call(this,c,d))}var a=dd,b=dc;return c.type=function(b){return arguments.length?(a=d3.functor(b),c):a},c.size=function(a){return arguments.length?(b=d3.functor(a),c):b},c};var de={circle:function(a){var b=Math.sqrt(a/Math.PI);return&quot;M0,&quot;+b+&quot;A&quot;+b+&quot;,&quot;+b+&quot; 0 1,1 0,&quot;+ -b+&quot;A&quot;+b+&quot;,&quot;+b+&quot; 0 1,1 0,&quot;+b+&quot;Z&quot;},cross:function(a){var b=Math.sqrt(a/5)/2;return&quot;M&quot;+ -3*b+&quot;,&quot;+ -b+&quot;H&quot;+ -b+&quot;V&quot;+ -3*b+&quot;H&quot;+b+&quot;V&quot;+ -b+&quot;H&quot;+3*b+&quot;V&quot;+b+&quot;H&quot;+b+&quot;V&quot;+3*b+&quot;H&quot;+ -b+&quot;V&quot;+b+&quot;H&quot;+ -3*b+&quot;Z&quot;},diamond:function(a){var b=Math.sqrt(a/(2*dg)),c=b*dg;return&quot;M0,&quot;+ -b+&quot;L&quot;+c+&quot;,0&quot;+&quot; 0,&quot;+b+&quot; &quot;+ -c+&quot;,0&quot;+&quot;Z&quot;},square:function(a){var b=Math.sqrt(a)/2;return&quot;M&quot;+ -b+&quot;,&quot;+ -b+&quot;L&quot;+b+&quot;,&quot;+ -b+&quot; &quot;+b+&quot;,&quot;+b+&quot; &quot;+ -b+&quot;,&quot;+b+&quot;Z&quot;},&quot;triangle-down&quot;:function(a){var b=Math.sqrt(a/df),c=b*df/2;return&quot;M0,&quot;+c+&quot;L&quot;+b+&quot;,&quot;+ -c+&quot; &quot;+ -b+&quot;,&quot;+ -c+&quot;Z&quot;},&quot;triangle-up&quot;:function(a){var b=Math.sqrt(a/df),c=b*df/2;return&quot;M0,&quot;+ -c+&quot;L&quot;+b+&quot;,&quot;+c+&quot; &quot;+ -b+&quot;,&quot;+c+&quot;Z&quot;}};d3.svg.symbolTypes=d3.keys(de);var df=Math.sqrt(3),dg=Math.tan(30*Math.PI/180);d3.svg.axis=function(){function j(j){j.each(function(k,l,m){var n=d3.select(this),o=j.delay?function(a){var b=bz;try{return bz=j.id,a.transition().delay(j[m][l].delay).duration(j[m][l].duration).ease(j.ease())}finally{bz=b}}:Object,p=a.ticks?a.ticks.apply(a,g):a.domain(),q=h==null?a.tickFormat?a.tickFormat.apply(a,g):String:h,r=dj(a,p,i),s=n.selectAll(&quot;.minor&quot;).data(r,String),t=s.enter().insert(&quot;line&quot;,&quot;g&quot;).attr(&quot;class&quot;,&quot;tick minor&quot;).style(&quot;opacity&quot;,1e-6),u=o(s.exit()).style(&quot;opacity&quot;,1e-6).remove(),v=o(s).style(&quot;opacity&quot;,1),w=n.selectAll(&quot;g&quot;).data(p,String),x=w.enter().insert(&quot;g&quot;,&quot;path&quot;).style(&quot;opacity&quot;,1e-6),y=o(w.exit()).style(&quot;opacity&quot;,1e-6).remove(),z=o(w).style(&quot;opacity&quot;,1),A,B=bP(a),C=n.selectAll(&quot;.domain&quot;).data([0]),D=C.enter().append(&quot;path&quot;).attr(&quot;class&quot;,&quot;domain&quot;),E=o(C),F=a.copy(),G=this.__chart__||F;this.__chart__=F,x.append(&quot;line&quot;).attr(&quot;class&quot;,&quot;tick&quot;),x.append(&quot;text&quot;),z.select(&quot;text&quot;).text(q);switch(b){case&quot;bottom&quot;:A=dh,t.attr(&quot;y2&quot;,d),v.attr(&quot;x2&quot;,0).attr(&quot;y2&quot;,d),x.select(&quot;line&quot;).attr(&quot;y2&quot;,c),x.select(&quot;text&quot;).attr(&quot;y&quot;,Math.max(c,0)+f),z.select(&quot;line&quot;).attr(&quot;x2&quot;,0).attr(&quot;y2&quot;,c),z.select(&quot;text&quot;).attr(&quot;x&quot;,0).attr(&quot;y&quot;,Math.max(c,0)+f).attr(&quot;dy&quot;,&quot;.71em&quot;).attr(&quot;text-anchor&quot;,&quot;middle&quot;),E.attr(&quot;d&quot;,&quot;M&quot;+B[0]+&quot;,&quot;+e+&quot;V0H&quot;+B[1]+&quot;V&quot;+e);break;case&quot;top&quot;:A=dh,t.attr(&quot;y2&quot;,-d),v.attr(&quot;x2&quot;,0).attr(&quot;y2&quot;,-d),x.select(&quot;line&quot;).attr(&quot;y2&quot;,-c),x.select(&quot;text&quot;).attr(&quot;y&quot;,-(Math.max(c,0)+f)),z.select(&quot;line&quot;).attr(&quot;x2&quot;,0).attr(&quot;y2&quot;,-c),z.select(&quot;text&quot;).attr(&quot;x&quot;,0).attr(&quot;y&quot;,-(Math.max(c,0)+f)).attr(&quot;dy&quot;,&quot;0em&quot;).attr(&quot;text-anchor&quot;,&quot;middle&quot;),E.attr(&quot;d&quot;,&quot;M&quot;+B[0]+&quot;,&quot;+ -e+&quot;V0H&quot;+B[1]+&quot;V&quot;+ -e);break;case&quot;left&quot;:A=di,t.attr(&quot;x2&quot;,-d),v.attr(&quot;x2&quot;,-d).attr(&quot;y2&quot;,0),x.select(&quot;line&quot;).attr(&quot;x2&quot;,-c),x.select(&quot;text&quot;).attr(&quot;x&quot;,-(Math.max(c,0)+f)),z.select(&quot;line&quot;).attr(&quot;x2&quot;,-c).attr(&quot;y2&quot;,0),z.select(&quot;text&quot;).attr(&quot;x&quot;,-(Math.max(c,0)+f)).attr(&quot;y&quot;,0).attr(&quot;dy&quot;,&quot;.32em&quot;).attr(&quot;text-anchor&quot;,&quot;end&quot;),E.attr(&quot;d&quot;,&quot;M&quot;+ -e+&quot;,&quot;+B[0]+&quot;H0V&quot;+B[1]+&quot;H&quot;+ -e);break;case&quot;right&quot;:A=di,t.attr(&quot;x2&quot;,d),v.attr(&quot;x2&quot;,d).attr(&quot;y2&quot;,0),x.select(&quot;line&quot;).attr(&quot;x2&quot;,c),x.select(&quot;text&quot;).attr(&quot;x&quot;,Math.max(c,0)+f),z.select(&quot;line&quot;).attr(&quot;x2&quot;,c).attr(&quot;y2&quot;,0),z.select(&quot;text&quot;).attr(&quot;x&quot;,Math.max(c,0)+f).attr(&quot;y&quot;,0).attr(&quot;dy&quot;,&quot;.32em&quot;).attr(&quot;text-anchor&quot;,&quot;start&quot;),E.attr(&quot;d&quot;,&quot;M&quot;+e+&quot;,&quot;+B[0]+&quot;H0V&quot;+B[1]+&quot;H&quot;+e)}if(a.ticks)x.call(A,G),z.call(A,F),y.call(A,F),t.call(A,G),v.call(A,F),u.call(A,F);else{var H=F.rangeBand()/2,I=function(a){return F(a)+H};x.call(A,I),z.call(A,I)}})}var a=d3.scale.linear(),b=&quot;bottom&quot;,c=6,d=6,e=6,f=3,g=[10],h,i=0;return j.scale=function(b){return arguments.length?(a=b,j):a},j.orient=function(a){return arguments.length?(b=a,j):b},j.ticks=function(){return arguments.length?(g=arguments,j):g},j.tickFormat=function(a){return arguments.length?(h=a,j):h},j.tickSize=function(a,b,f){if(!arguments.length)return c;var g=arguments.length-1;return c=+a,d=g&gt;1?+b:c,e=g&gt;0?+arguments[g]:c,j},j.tickPadding=function(a){return arguments.length?(f=+a,j):f},j.tickSubdivide=function(a){return arguments.length?(i=+a,j):i},j},d3.svg.brush=function(){function e(a){var g=b&amp;&amp;c?[&quot;n&quot;,&quot;e&quot;,&quot;s&quot;,&quot;w&quot;,&quot;nw&quot;,&quot;ne&quot;,&quot;se&quot;,&quot;sw&quot;]:b?[&quot;e&quot;,&quot;w&quot;]:c?[&quot;n&quot;,&quot;s&quot;]:[];a.each(function(){var a=d3.select(this).on(&quot;mousedown.brush&quot;,f),h=a.selectAll(&quot;.background&quot;).data([0]),i=a.selectAll(&quot;.extent&quot;).data([0]),j=a.selectAll(&quot;.resize&quot;).data(g,String),k;h.enter().append(&quot;rect&quot;).attr(&quot;class&quot;,&quot;background&quot;).style(&quot;visibility&quot;,&quot;hidden&quot;).style(&quot;pointer-events&quot;,&quot;all&quot;).style(&quot;cursor&quot;,&quot;crosshair&quot;),i.enter().append(&quot;rect&quot;).attr(&quot;class&quot;,&quot;extent&quot;).style(&quot;cursor&quot;,&quot;move&quot;),j.enter().append(&quot;rect&quot;).attr(&quot;class&quot;,function(a){return&quot;resize &quot;+a}).attr(&quot;width&quot;,6).attr(&quot;height&quot;,6).style(&quot;visibility&quot;,&quot;hidden&quot;).style(&quot;cursor&quot;,function(a){return dC[a]}),j.style(&quot;pointer-events&quot;,e.empty()?&quot;none&quot;:&quot;all&quot;),j.exit().remove(),b&amp;&amp;(k=bP(b),h.attr(&quot;x&quot;,k[0]).attr(&quot;width&quot;,k[1]-k[0]),dv(a,d)),c&amp;&amp;(k=bP(c),h.attr(&quot;y&quot;,k[0]).attr(&quot;height&quot;,k[1]-k[0]),dw(a,d))})}function f(){var a=d3.select(d3.event.target);dk=e,dm=this,dq=d,du=d3.svg.mouse(dm),(dr=a.classed(&quot;extent&quot;))?(du[0]=d[0][0]-du[0],du[1]=d[0][1]-du[1]):a.classed(&quot;resize&quot;)?(ds=d3.event.target.__data__,du[0]=d[+/w$/.test(ds)][0],du[1]=d[+/^n/.test(ds)][1]):d3.event.altKey&amp;&amp;(dt=du.slice()),dn=!/^(n|s)$/.test(ds)&amp;&amp;b,dp=!/^(e|w)$/.test(ds)&amp;&amp;c,dl=g(this,arguments),dl(&quot;brushstart&quot;),dz(),O()}function g(b,c){return function(d){var f=d3.event;try{d3.event={type:d,target:e},a[d].apply(b,c)}finally{d3.event=f}}}var a=d3.dispatch(&quot;brushstart&quot;,&quot;brush&quot;,&quot;brushend&quot;),b,c,d=[[0,0],[0,0]];return e.x=function(a){return arguments.length?(b=a,e):b},e.y=function(a){return arguments.length?(c=a,e):c},e.extent=function(a){var f,g,h,i,j;return arguments.length?(b&amp;&amp;(f=a[0],g=a[1],c&amp;&amp;(f=f[0],g=g[0]),b.invert&amp;&amp;(f=b(f),g=b(g)),g&lt;f&amp;&amp;(j=f,f=g,g=j),d[0][0]=f,d[1][0]=g),c&amp;&amp;(h=a[0],i=a[1],b&amp;&amp;(h=h[1],i=i[1]),c.invert&amp;&amp;(h=c(h),i=c(i)),i&lt;h&amp;&amp;(j=h,h=i,i=j),d[0][1]=h,d[1][1]=i),e):(b&amp;&amp;(f=d[0][0],g=d[1][0],b.invert&amp;&amp;(f=b.invert(f),g=b.invert(g)),g&lt;f&amp;&amp;(j=f,f=g,g=j)),c&amp;&amp;(h=d[0][1],i=d[1][1],c.invert&amp;&amp;(h=c.invert(h),i=c.invert(i)),i&lt;h&amp;&amp;(j=h,h=i,i=j)),b&amp;&amp;c?[[f,h],[g,i]]:b?[f,g]:c&amp;&amp;[h,i])},e.clear=function(){return d[0][0]=d[0][1]=d[1][0]=d[1][1]=0,e},e.empty=function(){return b&amp;&amp;d[0][0]===d[1][0]||c&amp;&amp;d[0][1]===d[1][1]},d3.select(window).on(&quot;mousemove.brush&quot;,dz).on(&quot;mouseup.brush&quot;,dB).on(&quot;keydown.brush&quot;,dx).on(&quot;keyup.brush&quot;,dy),d3.rebind(e,a,&quot;on&quot;)};var dk,dl,dm,dn,dp,dq,dr,ds,dt,du,dC={n:&quot;ns-resize&quot;,e:&quot;ew-resize&quot;,s:&quot;ns-resize&quot;,w:&quot;ew-resize&quot;,nw:&quot;nwse-resize&quot;,ne:&quot;nesw-resize&quot;,se:&quot;nwse-resize&quot;,sw:&quot;nesw-resize&quot;};d3.behavior={},d3.behavior.drag=function(){function c(){this.on(&quot;mousedown.drag&quot;,e).on(&quot;touchstart.drag&quot;,e),d3.select(window).on(&quot;mousemove.drag&quot;,dM).on(&quot;touchmove.drag&quot;,dM).on(&quot;mouseup.drag&quot;,dN,!0).on(&quot;touchend.drag&quot;,dN,!0).on(&quot;click.drag&quot;,dO,!0)}function d(){dD=a,dE=d3.event.target,dF=this,dG=arguments,dI=dL(),b?(dH=b.apply(dF,dG),dH=[dH.x-dI[0],dH.y-dI[1]]):dH=[0,0],dJ=0}function e(){d.apply(this,arguments),dK(&quot;dragstart&quot;)}var a=d3.dispatch(&quot;drag&quot;,&quot;dragstart&quot;,&quot;dragend&quot;),b=null;return c.origin=function(a){return arguments.length?(b=a,c):b},d3.rebind(c,a,&quot;on&quot;)};var dD,dE,dF,dG,dH,dI,dJ;d3.behavior.zoom=function(){function d(){this.on(&quot;mousedown.zoom&quot;,f).on(&quot;mousewheel.zoom&quot;,g).on(&quot;DOMMouseScroll.zoom&quot;,g).on(&quot;dblclick.zoom&quot;,h).on(&quot;touchstart.zoom&quot;,i),d3.select(window).on(&quot;mousemove.zoom&quot;,ed).on(&quot;mouseup.zoom&quot;,ee).on(&quot;touchmove.zoom&quot;,ec).on(&quot;touchend.zoom&quot;,eb).on(&quot;click.zoom&quot;,ef,!0)}function e(){dU=a,dV=c,dW=b.zoom,dX=d3.event.target,dY=this,dZ=arguments}function f(){e.apply(this,arguments),dQ=d_(d3.svg.mouse(dY)),d$=0,d3.event.preventDefault(),window.focus()}function g(){e.apply(this,arguments),dR||(dR=d_(d3.svg.mouse(dY))),eg(ea()+a[2],d3.svg.mouse(dY),dR)}function h(){e.apply(this,arguments);var b=d3.svg.mouse(dY);eg(d3.event.shiftKey?Math.ceil(a[2]-1):Math.floor(a[2]+1),b,d_(b))}function i(){e.apply(this,arguments);var b=eb(),c,d=Date.now();b.length===1&amp;&amp;d-dT&lt;300&amp;&amp;eg(1+Math.floor(a[2]),c=b[0],dS[c.identifier]),dT=d}var a=[0,0,0],b=d3.dispatch(&quot;zoom&quot;),c=eh;return d.extent=function(a){return arguments.length?(c=a==null?eh:a,d):c},d3.rebind(d,b,&quot;on&quot;)};var dP,dQ,dR,dS={},dT=0,dU,dV,dW,dX,dY,dZ,d$,eh=[[-Infinity,Infinity],[-Infinity,Infinity],[-Infinity,Infinity]]})();</div></pre></div>
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

      <p>&copy; 2012 <span id="_rrt" title="0.12365s from fe8.rs.github.com">GitHub</span> Inc. All rights reserved.</p>
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

