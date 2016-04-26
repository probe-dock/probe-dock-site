---
layout: post
title: "Probe Dock v0.1.28 Released"
categories: releases
date: 2016-04-26 20:00:00
media_folder: /media/probedock-v0_1_28
---

**Probe Dock v0.1.28** is now available!
TODO: Short description here.

* [Project filters](#project-filters)
* [Report filters](#report-filters)
* [Management page](#management-page)
* [Improvements](#improvements)
  * [Test execution trend line](#test-execution-time-widget-trend-line)
  * [Technical user names are no longer globally unique](#technical-user-names-no-longer-globally-unique)
  * [Health widget now based on continuous integration by default](#technical-health)
* [Bugfixes](#bugfixes)




<a name="project-filters"></a>

## Project filters

The projects page now has a search box to more easily find the project you are looking for when the list grows:

![Project filters]({{ page.media_folder }}/project-filters.png)



<a name="report-filters"></a>

## Report filters

The reports page now has several filters that can help you find the reports you are looking for:

![Report filters]({{ page.media_folder }}/report-filters.png)

The following filters are available:

* **By runner:** display only reports with tests run by one of the selected users.
* **By project:** display only reports with test results for one of the selected projects.
* **By version:** display only reports with test results for one of the selected project versions.
* **By category:** display only reports with tests having one of the selected categories.
* **By status:** display only reports containing passing, failing or inactive tests, or containing new tests.



<a name="management-page"></a>

## Management page

The new management page provides statistics about the Probe Dock platform.
It is accessible from the Admin menu for users who have sufficient permissions.

**Organization administrators** can obtain statistics about their organization(s):

![Management page for organization administrators]({{ page.media_folder }}/management-page-org-admins.png)

On the same page, **platform administrators** have access to Resque (background jobs) and database statistics.
In addition, they can obtain the same statistics as organization administrators for all registered organizations:

![Management page for platform administrators]({{ page.media_folder }}/management-page-platform-admins.png)



<a name="improvements"></a>

## Improvements



<a name="test-execution-time-widget-trend-line"></a>

### Test execution time trend line

The test execution time widget now displays a trend line indicating the general tendency of the execution time to increase or decrease.

![Trend line]({{ page.media_folder }}/test-execution-time-widget-trend-line.png)



<a name="technical-user-names-no-longer-globally-unique"></a>

### Technical user names are no longer globally unique

Previously, all users, whether human or technical, could not have identical names.
This was impractical because technical users would tend to have the same name across organizations (e.g. Jenkins, Travis).

Technical user names are now validated only within their organization.
You may use a name even if another organization already has a technical---or human---user with that name.

Organization administrators may rename existing technical users.



<a name="technical-health"></a>

### Health widget now based on continuous integration by default

The project health pie chart now displays the state of the latest test run by a technical user (by default).
This will most likely be the latest run on your continuous integration server,
and therefore a better indicator of health than the latest run by a developer.

![Technical health]({{ page.media_folder }}/technical-health.png)

You can still select a different user to view their latest test run.



<a name="bugfixes"></a>

## Bugfixes

* Fixed a performance issue where infinite scroll would enter an infinite loop when there were not enough test results.
* Fixed a bug were some reports would appear multiple times in the reports list when filtering by category.
* Fixed a bug where the project form's repository link field would display no error when entering an invalid non-HTTP URL.
* Fixed a bug where following a project's link from the reports page would display a blank project page.
* Fixed a bug in the test results and execution time widgets where selecting a user who has run no tests would hide the controls and render the widget unusable.
