---
layout: post
title: "Probe Dock v0.1.29 Released"
categories: releases
date: 2016-05-01 16:00:00
media_folder: /media/probedock-v0_1_29
---

**Probe Dock v0.1.29** is now available.

* [User-friendly organization & project names](#user-friendly-names)
* [Inactive flag in JavaScript probes](#inactive-flag-in-javascript-probes)
* [Annotations in Ruby probes](#annotations-in-ruby-probes)
* [Required form fields](#required-form-fields)
* [Bugfixes](#bugfixes)



<a name="user-friendly-names"></a>

## User-friendly organization & project names

When creating an organization and project, you no longer have to supply both a name and a user-friendly display name.
Supply only the user-friendly name, and Probe Dock will do the rest.

**TODO:** add form screenshot.

A simplified version of the name you entered will be used in URLs.
For example, the link to the `Probe Dock` organization page is `https://demo.probedock.io/probedock`, with `probedock` being the URL identifier deduced from the name.



<a name="Inactive flag in JavaScript probes"></a>

## Inactive flag in JavaScript probes

All JavaScript probes now support flagging a test as inactive.

**TODO:** add example for one probe and link to all affected probes.



<a name="annotations-in-cucumber-ruby-probe"></a>

## Annotations in Ruby probe

The Cucumber Ruby probe---and the Ruby probe library---now support annotations to customize the category, tickets and other test properties.

**TODO:** add example and link for Cucumber Ruby probe.



<a name="required-form-fields"></a>

## Required form fields

Required form fields are now clearly indicated in all Probe Dock forms.

![Required form fields]({{ page.media_folder }}/required-form-fields.png)



<a name="Bugfixes"></a>

## Bugfixes

* Fixed a bug where organization management menu items would be displayed in the Admin menu even when no organization was selected.
