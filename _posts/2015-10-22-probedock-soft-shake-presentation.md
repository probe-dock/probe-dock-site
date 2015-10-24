---
layout: post
title: "Probe Dock Soft-Shake Presentation"
categories: news
date: 2015-10-22 20:00:00
media_folder: /media/probedock-soft-shake-presentation
banner_file: banner-news.jpg
---

We presented Probe Dock at [the Soft-Shake 2015](http://soft-shake.ch/2015/en/) this morning.
It went very well and we got interesting questions and feedback.
Thanks to all attendees and of course to the conference sponsors and organizers!

Check out the [slides we used for the presentation](https://www.dropbox.com/s/krwp0gowh57t7xa/Soft-Shake%202015%20-%20Test%20analytics%20presentation.pdf?dl=0).

As always, do not hesitate to contact us if you have additional questions or feedback.



## Q & A after the presentation

**Does Probe Dock include code coverage information?**

Not at this time but it's clearly something that we plan to add.
We can obtain code coverage metrics through integrations with other tools (e.g. Sonar, Coveralls), that we will analyze and correlate with other test data.

**Does Probe Dock display information about the machine/environment on which the tests are executed?**

We already collect this information but don't have it in the UI yet.
It's definitely information that will be useful to help solve *"Works on my machine"* kinds of problems.

**Can Probe Dock show a build matrix (i.e. when tests are executed multiple times on different combinations of OS, browser, dependency versions, etc)?**

Probe Dock can collect the results of a build matrix in a report, but it currently won't collect information about the matrix itself.
A limited workaround at this time is to use tags to differentiate between the test results of each execution.
Including more advanced build matrix features is on our roadmap but not necessarily a priority right now

**How can Probe Dock differentiate between the different components of my big project?**

The current Probe Dock model allows you to manage *projects*.
Each Probe Dock project might correspond to an entire project or yours, or to only one component in your project.
You can organize them as you see fit and decide what goes into each report.

We have been discussing more advanced project/component models that will provide more flexibility, but nothing definite has been decided yet.

**Jenkins can also display automated test reports. What does Probe Dock offer that Jenkins doesn't already have?**

Jenkins does have the ability to display test results in a report, but little more,
and it is very much Java/Maven-oriented whereas Probe Dock aims to support any testing framework that has listeners (most of them do).

Probe Dock also tracks individual tests over time,
allows developers to enrich tests with custom data freely defined by you (tags & tickets),
and tracks day-to-day developer activity in addition to continuous integration pipelines.

Its goal is to offer many more insights into testing trends and team behavior,
and to correlate the data of testing activities with other data such as test coverage and bug reports.
