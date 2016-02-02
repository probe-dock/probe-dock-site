---
layout: post
title: "Probe Dock v0.1.14 Released"
categories: releases
date: 2016-02-02 19:00:00
media_folder: /media/probedock-v0_1_14
---

**Probe Dock v0.1.14** is now available!
It brings you new widgets on your organization's dashboard as well as on the new project page.
Also, if you have an existing testing infrastructure that generates standard xUnit XML test reports (like JUnit does),
Probe Dock can now collect and analyse those reports as well.

* [xUnit/JUnit XML Reports](#xunit)
* [New Pages](#new-pages)
* [Widgets](#widgets)
  * [Test Run Activity](#test-run-activity)
  * [Test Suite Size](#test-suite-size)
  * [Contributors](#contributors)
  * [Recent Activity for Projects](#project-recent-activity)
  * [Project Health](#project-health)
  * [Test Report Dropzone](#test-report-dropzone)
* [Bugfixes](#bugfixes)



<a name="xunit"></a>

## xUnit/JUnit XML Reports

The standard way of using Probe Dock is to integrate its [probes](https://github.com/probedock/probedock-probes) into your favorite test framework.
This allows Probe Dock to automatically collect information about your testing environment and activity,
and allows you to enrich your tests with various metadata like custom tags and tickets.

However, if you already have a testing infrastructure that generates **standard xUnit/JUnit XML reports**,
you can also submit these reports to Probe Dock directly.
Most test frameworks are therefore supported by Probe Dock even if we do not yet supply a probe,
as almost all frameworks can generate this format with some additional configuration (including Ruby and Node.js test frameworks, for example).

If you have archived previous report files, you can also publish those to Probe Dock as they include a timestamp indicating when the tests were run.
Your can therefore import your past testing history.

You can publish an XML test report [manually](#xunit-manual) for trial purposes,
or from a [continuous integration environment](#xunit-ci).

<a name="xunit-manual"></a>

### How to publish an XML test report manually

If you do not already have a Probe Dock account and organization, you can [register a trial account](https://trial.probedock.io/register) to try it.
Also make sure you have created your project in Probe Dock.

Log in to Probe Dock and go to your project's page.

Set the desired version and test category in the publishing widget,
then simply drag-and-drop your XML report file into the dropzone:

![xUnit XML Reports Dropzone]({{ page.media_folder }}/xunit.png)

If Probe Dock cannot understand the contents of your report file for any reason,
it will notify you and provide you with a list of errors describing what seems to be missing or invalid.

<a name="xunit-ci"></a>

### How to publish an XML test report from a continuous integration environment

If you do not already have a Probe Dock account and organization, you can [register a trial account](https://trial.probedock.io/register) to try it.
Also make sure you have created your project in Probe Dock.

Log in to Probe Dock and go to your organization's page.
If you do not already have a technical user, go to the members page:

![Organization Members Page]({{ page.media_folder }}/organization-members.png)

Click on "Add a member" and create a **technical user**:

![Create Technical User]({{ page.media_folder }}/new-technical-member.png)

Once you have your technical user, you can generate an **API access token** for that user from the members page:

![Technical User API Access Token]({{ page.media_folder }}/technical-user-api-access-token.png)

You also need to go to your project list or the project's page and get the **ID** of your project:

![Project ID]({{ page.media_folder }}/project-id.png)

Then, on a Unix continuous integration environment for example, you can simply curl your XML report file into Probe Dock.
You must supply headers for your API access token, the project ID, the project version, and optionally a test category:

    cat report.xml | curl --data-binary @- \
                          -H "Content-Type: application/xml" \
                          -H "Authorization: Bearer YOUR_API_ACCESS_TOKEN_HERE" \
                          -H "Probe-Dock-Project-Id: o4m14w1u6hz3" \
                          -H "Probe-Dock-Project-Version: 1.0.0" \
                          -H "Probe-Dock-Category: JUnit" \
                          https://trial.probedock.io/api/publish

If your XML report file is accepted, the HTTP status code of the response will be *202 Accepted*.
Your test report will appear in Probe Dock a few seconds later.

If Probe Dock cannot understand the contents of your report file for any reason,
it will respond with the HTTP status code *422 Unprocessable Entity* and provide you with a list of errors indicating what seems to be missing or invalid.



<a name="new-pages"></a>

## New Pages

The **project page** shows detailed information about each of your organization's projects.
It includes all of the new [widgets](#widgets) described in this article.

You can access it by clicking on a project's name in the project list,
or by clicking on a project version label in a test run report or in the dashboard:

![Project Label Link]({{ page.media_folder }}/project-label.png)

The **test details page** will show information about a particular test in your test suite.
At this time it only includes basic details about a test such as the dates it was first and last run,
but it will soon allow you to browse the result of the tests or see how its execution time changed over time.
You can access it by clicking a test result's name in a test run report.



<a name="widgets"></a>

## Widgets

5 new widgets have been added and 1 was improved.



<a name="test-run-activity"></a>

### Test Run Activity

This widget is an updated version of the previous **new tests** widget.
It not only allows you to see the number of new tests written by day, like before,
but you can also switch to the number of test runs by day.

Each time a developer runs tests on his machine and publishes the results to Probe Dock,
or each time a continuous integration environment does the same, it counts for 1 test run.
The number of test runs by day therefore allows you to track the test execution activity,
not only when new tests are written.

Of course, this information can still be filtered both by project and/or user.

![Test Run Activity Widget]({{ page.media_folder }}/test-run-activity.png)

In addition to being in the dashboard, this widget has also been added to the new project page,
showing the activity specific to that project.

A simplified version of the widget is also displayed in each project's box in the project list:

![Test Run Activity Widget in the Project List]({{ page.media_folder }}/test-run-activity-project-list.png)



<a name="test-suite-size"></a>

### Test Suite Size

This widget shows the evolution of the total number of tests in your test suite by week.
Unlike the test run activity widget which shows daily activity, this one shows the cumulative growth of the test suite, and over a much longer timespan.
Of course, it can also be filtered by project and/or user.

![Test Suite Size Widget]({{ page.media_folder }}/test-suite-size.png)

It has been added both to the dashboard and the new project page.
In the project page, it only shows the total number of the tests specific to the project.



<a name="contributors"></a>

### Contributors

This widget lists the organization members who have contributed to the testing effort by writing new tests.
It also indicates how many and what kinds of tests they have written, which shows who is specialized in what.

![Contributors Widget]({{ page.media_folder }}/contributors.png)

This widget has been added both to the dashboard and the new project page.
In the project page, it only shows the organization members who have written new tests for a specific project.



<a name="project-recent-activity"></a>

### Recent Activity for Projects

This widget is similar to the **recent activity** widget on the dashboard, but only shows the activity for a specific project in the new project page.
In addition to listing the latest test runs, it also indicates if new tests were added for each test run, and how many.

![Project Recent Activity Widget]({{ page.media_folder }}/project-recent-activity.png)



<a name="project-health"></a>

### Project Health

This widget shows the latest state of a project for a specific version.
For each version, it indicates how many tests there are in the project, and how many were passing, failing or inactive the last time they were run.
This gives you a quick view on the overall health of a project.

![Project Health Widget]({{ page.media_folder }}/project-health.png)



<a name="test-report-dropzone"></a>

### Test Report Dropzone

If you want to quickly try Probe Dock and your favorite test framework generates standard xUnit/JUnit XML test reports,
you can simply take your XML report file and drag-and-drop it into this widget.
Probe Dock will queue it for processing and your report will appear a few seconds later.

You can select the version of the project used to run the tests, as well as the test category:

![xUnit XML Reports Dropzone]({{ page.media_folder }}/xunit.png)

As described [at the beginning of the article](#xunit),
you do not have to manually upload XML reports:
they can also be sent directly to the Probe Dock API.
The widget is provided because it is convenient for trial purposes.



<a name="bugfixes"></a>

## Bugfixes

* Tags and tickets were not correctly assigned to tests when test results were published.
* Multiple test results sharing names and test keys caused payload processing to fail in special cases.
