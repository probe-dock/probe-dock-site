---
layout: post
title: "Probe Dock v0.1.28 Released"
categories: releases
date: 2016-04-26 20:00:00
media_folder: /media/probedock-v0_1_28
---

**Probe Dock v0.1.28** is now available!
You get new filters to find what you're looking for, a management page for administrators to keep an eye on overall data growth, and more!

* [Admin menu](#admin-menu)
* [Project filters](#project-filters)
* [Report filters](#report-filters)
* [Management page](#management-page)
* [User filters](#user-filters)
* [Improvements](#improvements)
  * [Test execution trend line](#test-execution-time-widget-trend-line)
  * [Technical user names are no longer globally unique](#technical-user-names-no-longer-globally-unique)
  * [Health widget now based on continuous integration results by default](#technical-health)
  * [Humanized xUnit test names](#humanized-xunit-test-names)
* [Bugfixes](#bugfixes)



<a name="admin-menu"></a>

## Admin menu

Instead of being only accessible from the organization dashboard,
the **Members** and **Edit organization** links have been moved to the Admin menu.

![Simpler organization menu]({{ page.media_folder }}/simpler-organization-menu.png)

The same menu gives **platform administrators** access to other features, like the [new management page](#management-page).

![Admin menu]({{ page.media_folder }}/admin-menu.png)



<a name="project-filters"></a>

## Project filters

The projects page has a new search box to find projects more easily when the list grows:

![Project filters]({{ page.media_folder }}/project-filters.png)



<a name="report-filters"></a>

## Report filters

The reports page now has several filters to help you find the reports you are looking for:

![Report filters]({{ page.media_folder }}/report-filters.png)

* **By runner:** only display reports with tests run by at least one of the selected users.
* **By project:** only display reports with tests in at least one of the selected projects.
* **By version:** only display reports with test results for at least one of the selected project versions.
* **By category:** only display reports with tests having at least one of the selected categories.
* **By status:** only display reports containing at least one passing, failing or inactive test; or containing at least one new test.

When these filters are combined, only reports that match all of the criteria are displayed.



<a name="management-page"></a>

## Management page

The new management page provides statistics about the Probe Dock platform.
It is accessible from the Admin menu for users who have sufficient privileges.

**Organization administrators** can obtain statistics about their organization(s):

![Management page for organization administrators]({{ page.media_folder }}/management-page-org-admins.png)

On the same page, **platform administrators** have access to a background jobs (Resque) dashboard and database statistics.
Additionally, they can obtain the same statistics as organization administrators for all registered organizations:

![Management page for platform administrators]({{ page.media_folder }}/management-page-platform-admins.png)




<a name="user-filters"></a>

## User filters

The users page (accessible only to platform administrators) has new filters to help find users:

![User filters]({{ page.media_folder }}/user-filters.png)



<a name="improvements"></a>

## Improvements



<a name="test-execution-time-widget-trend-line"></a>

### Test execution time trend line

The test execution time widget now displays a red trend line indicating the general tendency of the execution time to increase or decrease:

![Trend line]({{ page.media_folder }}/test-execution-time-widget-trend-line.png)



<a name="technical-user-names-no-longer-globally-unique"></a>

### Technical user names are no longer globally unique

Previously, all users, whether human or technical, could not have identical names.
This was impractical because technical users tend to have the same name across organizations (e.g. Jenkins, Travis).

Technical user names are now validated only within their organization.
You may use a name even if another organization already has a technical---or human---user with that name.

Organization administrators may rename existing technical users.



<a name="technical-health"></a>

### Health widget now based on continuous integration results by default

The project health pie chart now displays the state of the latest test run by a technical user (by default).
This will most likely be the latest run on your continuous integration server,
and therefore a better indicator of health than the latest run by a developer.

![Technical health]({{ page.media_folder }}/technical-health.png)

You can still select a different user to view their latest test run, if you wish.



<a name="humanized-xunit-test-names"></a>

### Humanized xUnit test names

When xUnit test reports are submitted, Probe Dock will humanize the test names as probes do:

`itShouldReturnAValue` becomes `It should return a value`.

This transformation is only applied if the test name contains no spaces.



<a name="bugfixes"></a>

## Bugfixes

* Fixed a performance issue where infinite scroll would enter an infinite loop when there were not enough test results to fill the page.
* Fixed a bug were some reports would appear multiple times in the reports list when filtering by category.
* Fixed a bug where the project form's repository link field would display no error when entering an invalid non-HTTP URL.
* Fixed a bug where following a project's link from the reports page would display a blank project page.
* Fixed a bug in the test results and execution time widgets where selecting a user who has run no tests would hide the controls and render the widget unusable.
