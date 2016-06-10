---
layout: post
title: "Probe Dock v0.1.29 Released"
categories: releases
date: 2016-06-10 11:00:00
media_folder: /media/probedock-v0_1_29
---

**Probe Dock v0.1.29** is now available with a bunch of improvements and new probe features.

* [Inactive flag in JavaScript probes](#inactive-flag-in-javascript-probes)
* [Annotations in the Cucumber Ruby probe](#annotations-in-cucumber-ruby-probe)
* [Required form fields](#required-form-fields)
* [Better test report health bars](#better-test-report-health-bars)
* [User-friendly organization & project names](#user-friendly-names)
* [Bugfixes](#bugfixes)



<a name="inactive-flag-in-javascript-probes"></a>

## Inactive flag in JavaScript probes

The [Jasmine probe](https://github.com/probedock/probedock-grunt-jasmine)
and the [Karma probe](https://github.com/probedock/probedock-karma)
(and the [Node.js probe library](https://github.com/probedock/probedock-node))
now support flagging a test as inactive using the `@probedock` annotation in the test name:

{% highlight javascript %}
describe("Something", function() {
  it("should work @probedock(active=false)", function() {
    expect(true).toBe(false);
  });
});
{% endhighlight %}



<a name="annotations-in-cucumber-ruby-probe"></a>

## Annotations in the Cucumber Ruby probe

The [Cucumber Ruby probe](https://github.com/probedock/probedock-cucumber-ruby)
(and the [Ruby probe library](https://github.com/probedock/probedock-ruby))
now support Probe Dock annotations to customize the test category, tags and other properties.

Annotations are added in comments on Feature or Scenario elements:

{% highlight gherkin %}
# @probedock(category=cucumber tag=awesome)
Feature: Something awesome.

  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  Praesent dictum nisl convallis, dapibus libero at, sodales lorem.
  Integer scelerisque risus at odio vulputate lobortis.

  # @probedock(key=abc tag=foo ticket=JIRA-1234)
  @bar
  Scenario: It should work.
    Given I am here
    When I do it
    Then it works

  # @probedock(category=letuce tag=baz active=false)
  Scenario: It should still work.
    Given I am still here
    When I do it again
    Then it still works
{% endhighlight %}

The Feature annotation, if present, is merged with each scenario's annotation, with the latter taking precedence.

In this example, the first scenario (*It should work*) will have the following properties:

* **key:** abc (from the Scenario annotation)
* **category:** cucumber (from the Feature annotation)
* **tags:** awesome, foo, bar (combined from the Feature annotation, the Scenario annotation, and the Cucumber tag `@bar`)
* **tickets:** JIRA-1234

The second scenario (*It should still work*) will have the following properties:

* **category:** letuce (from the Scenario annotation which overrides the Feature annotation)
* **tags:** baz
* **active:** false



<a name="required-form-fields"></a>

## Required form fields

Required form fields are now clearly indicated in Probe Dock forms:

![Required form fields]({{ page.media_folder }}/required-form-fields.png)



<a name="better-test-report-health-bars"></a>

## Better test report health bars

Health bars sections now have a minimum size so that they always remain visible.

As you can see in the following screenshot, 1 failed test out of 818 is much less than 1 percent,
so the proportional width of the red bar would be so thin that you could easily miss it.
We now enlarge it to make it stand out:

![Better test report health bars]({{ page.media_folder }}/better-test-report-health-bars.png)



<a name="user-friendly-names"></a>

## User-friendly organization & project names

When creating an organization and project, you no longer have to supply both a name and a user-friendly display name.
Supply only the user-friendly name, and Probe Dock will do the rest:

![User-friendly names form]({{ page.media_folder }}/user-friendly-names-form.png)

A simplified version of the name you entered will be used in URLs.
In this example, the link to the `My Awesome Project` page under the Probe Dock organization would be as follows:

![User-friendly names URL]({{ page.media_folder }}/user-friendly-names-url.png)



<a name="bugfixes"></a>

## Bugfixes

* The organization management menu items were displayed in the Admin menu even when no organization was selected.
* Some combinations of test report list filters produced a server error.
* The report list filter to show only reports with failed tests was incorrectly selecting some reports with no failed tests.
* The username uniqueness validation did not prevent some collisions.
* The organization members page was only accessible by organization admins.
