---
layout: post
title: "Probe Dock v0.1.23 Released"
categories: releases
date: 2016-03-01 19:00:00
media_folder: /media/probedock-v0_1_23
---

**Probe Dock v0.1.23** is now available!
It brings you 3 new widgets to show new data about your projects, including the first 2 widgets to show data about individual tests.
There have also been several other improvements.

* [Widgets](#widgets)
  * [Category bar](#category-bar-widget)
  * [Test results history](#test-results-history-widget)
  * [Execution time](#test-execution-time-widget)
  * [Test result details](#test-result-details)
* [Project repository link](#project-repository-link)
* [Improvements](#improvements)
* [Bugfixes](#bugfixes)



<a name="widgets"></a>

## Widgets

3 new widgets have been added, 1 in the organization dashboard and project details pages, and 2 in the test details page.



<a name="category-bar-widget"></a>

### Category bar

The first thing you now see in your **organization's dashboard** is a breakdown of the test categories used across all your projects:

![Category Bar Widget]({{ page.media_folder }}/category-bar-widget.png)

The same widget is also included in the **project details page** where it shows the breakdown for that particular project.
This information can also be **filtered by user** so that you can see what kind of tests each developer most works with.



<a name="test-results-history-widget"></a>

### Test results history

The **test details page** finally has widgets!
To access this page, click on a result in one of your test reports:

![Test Report Results]({{ page.media_folder }}/test-report-results.png)

This first widget will show you **the latest results of the test** in the same style as test reports,
allowing you to immediately identify **flickering**, i.e. when a test passes, then fails, then passes, etc.
This could indicate an error due to leftover state data from another test or a random condition.

![Test Results History Widget]({{ page.media_folder }}/test-results-history-widget.png)

By default, results are shown **across all versions** of the project.
Use the filters to see only the results received **for a particular version**.
The widget will also tell you if there are versions in which the test **was never run**.

![Test Results History Widget (Filtered)]({{ page.media_folder }}/test-results-history-widget-filtered.png)

You can also filter the results **by user**, which can help you identify issues on a given developer's machine.



<a name="test-execution-time-widget"></a>

### Test execution time

This other widget in the test details page shows you the **evolution of the test's execution time**.
You will see if a test suddenly develops **performance problems**.

![Test Execution Time Widget]({{ page.media_folder }}/test-execution-time-widget.png)

By default it shows the execution time for the 50 latest results, and then allows you to navigate backwards and forwards in time.
You can filter to only show the execution time for a given project version, or for a given runner (the user who ran the tests).



<a name="test-result-details"></a>

### Test result details

Clicking on one of the results in the **test results history widget** will open a dialog giving you **more detailed information about the result**,
including for example the stack trace in case of failed tests.

![Test result details]({{ page.media_folder }}/test-result-details.png)



<a name="project-repository-link"></a>

## Project repository link

You can now add links to your projects' repositories on GitHub or wherever you're hosting your source code:

![Project repository link]({{ page.media_folder }}/project-repo-link.png)

Convenient link icons will then appear in the projects list and on the project details page:

![Project repository link button]({{ page.media_folder }}/project-repo-link-button.png)

**Note** that this should be the URL to access your source code in the browser (starting with `http://` or `https://`), not the clone/checkout URL.

For now we only use this feature to display links, but it opens the door for us to start analyzing your code to enrich the Probe Dock experience.
For example, you will be able to see a failing test's source code directly in Probe Dock,
or we will be able to correlate the growth of your code base to the results of your automated tests.



<a name="improvements"></a>

## Improvements



### Collapsed projects in the recent activity widget

If you publish reports with test results from many projects, only **the first 5** will be shown by default with the rest collapsed.
The "More..." button allows you to show the rest.

![Collapsed projects in the recent activity widget]({{ page.media_folder }}/recent-activity-widget-collapsed-projects.png)

Additionally, in the project details page, only the version will be shown since you're in the context of a particular project.



### Gravatar identicons

Probe Dock account avatars are powered by [Gravatar](http://gravatar.com).
You can register your e-mail there and associate an image with it.

However, for those who don't want to do that, we have activated **identicons**,
which means that their avatar will be a pattern generated from their e-mail.
Even users that do not use Gravatar will have different avatars from each other.

![Gravatar identicons]({{ page.media_folder }}/gravatar-identicons.png)



### Copy-on-click organization & project IDs

Most IDs can now be copied with a simple click:

![Copy-on-click organization and project IDs]({{ page.media_folder }}/copy-on-click-project-id.png)



### Page titles

You will see more useful page titles when navigating:

![Page titles]({{ page.media_folder }}/page-titles.png)



### Other improvements

* In the projects list, the pie chart showing the results of the last test run is now a link to that test run.
* We have a favicon, finally!



<a name="bugfixes"></a>

## Bugfixes

* Fixed a bug where invite links to new organizations would not work when already logged in.
