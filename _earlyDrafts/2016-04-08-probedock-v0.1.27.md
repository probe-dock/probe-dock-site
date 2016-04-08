---
layout: post
title: "Probe Dock v0.1.27 Released"
categories: releases
date: 2016-04-08 10:00:00
media_folder: /media/probedock-v0_1_27
---

**Probe Dock v0.1.27** is now available!
It brings you 3 new widgets to show new data about your projects, including the first 2 widgets to show data about individual tests.
There have also been several other improvements.

* [Pages](#pages)
  * [Management page](#management-page)
* [Improvements](#improvements)
  * [Test result details](#test-result-details)
  * [Test execution trend line](#test-execution-time-widget-trend-line)
* [Bugfixes](#bugfixes)


<a name="pages"></a>
## Pages

<a name="management-page"></a>
### Management page
A page for the platform administrator and the organization administrator is available and display stats about the organization or the system.

### For the organization administrators

The page will display the stats of the organization such the number of projects or results.

![Management page for organization administrators]({{ page.media_folder }}/mgm-org-admins.png)

If the user is an administrator of more than one organization, the dropdown will let him choosing the organization to display the stats.

### For the platform administrators

The page will display the stats of the database and the most space consuming organization. There are also some stats about Resque jobs.

![Management page for platform administrators]({{ page.media_folder }}/mgm-platform-admins.png)

It is also possible to select any active organization to see the stats of this organization.

<a name="improvements"></a>

## Improvements



<a name="reports-list-page"></a>
### New filter in the reports list page

Now, you have the possibility to filter the reports by status of results. You can display only the reports that contains failing tests. You
have also the possibility to display the reports which contains new tests.

![New filter]({{ page.media_folder }}/reports-list-page-filters.png)


<a name="test-execution-time-widget-trend-line"></a>
### Trend line of time execution in the time execution widget

![Trend line]({{ page.media_folder }}/test-execution-time-widget-trend-line.png)


### Other improvements

* Improved the UI when a repo URL is given. Validation is done and accepts only HTTP / HTTPS URL.
* The history of test results widget is now less flickering when data are updated.
* The technical users are now unique scoped by organization.



<a name="bugfixes"></a>

## Bugfixes

* Fixed a performance issue where infinite scroll enter in an infinite loop when there is not enough test results.
* Fixed an issue with category filtering in reports list page.
* Fixed an issue with duplicated reports in the reports list page due to the categories filter.
