---
layout: post
title: "Probe Dock v0.1.14 Released"
categories: releases
date: 2016-02-02 15:00:00
media_folder: /media/probedock-v0_1_14
---

**Probe Dock v0.1.14** is now available!
It brings you many new widgets on your organization's dashboard as well as on the new project page available for all your projects.

* [New Pages](#new-pages)
* [Widgets](#widgets)
  * [Contributors](#contributors)
  * [Test Suite Size](#test-suite-size)
  * [Test Run Activity](#test-run-activity)
  * [Recent Activity for Projects](#project-recent-activity)
  * [Project Health](#project-health)
  * [xUnit XML Reports Dropzone](#xunit)
* [Bugfixes](#bugfixes)



<a name="new-pages"></a>

## New Pages

The **project page** shows detailed information about each of your organization's projects.
It includes all of the new [widgets](#widgets) described in this article.
You can access it by clicking on a project's name in the project list,
or by clicking on a project version label in a test run report or in the dashboard.

PROJECT LABEL SCREENSHOT HERE

The **test details page** will show information about a particular test in your test suite.
At this time it only includes basic details about a test such as the dates it was first and last run,
but it will soon allow you to browse the result of the tests or see how its execution time changed over time.



<a name="widgets"></a>

## Widgets



<a name="contributors"></a>

### Contributors

Add description and screenshot.



<a name="test-suite-size"></a>

### Test Suite Size

Add description and screenshot.



<a name="test-run-activity"></a>

### Test Run Activity

Add description and screenshot.



<a name="project-recent-activity"></a>

### Recent Activity for Projects

Add description and screenshot.



<a name="project-health"></a>

### Project Health

Add description and screenshot.



<a name="xunit"></a>

### xUnit XML Reports Dropzone

Add description and screenshot.



<a name="bugfixes"></a>

## Bugfixes

* Tags and tickets were not correctly assigned to tests when processing test result payloads.
* Different tests sharing names and keys caused payload processing to fail in specific circumstances.
