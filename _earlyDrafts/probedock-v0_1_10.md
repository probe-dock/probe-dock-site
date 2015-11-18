---
layout: post
title: "Probe Dock v0.1.10 Released"
categories: releases
media_folder: /media/probedock-v0_1_10
---

**Probe Dock v0.1.10** is now available!
JUnit Probe updated to support assumption failures and ignored tests. Both are handled as inactive test for Probe Dock. Results are sent but the tests are flagged as inactive even if the annotation has the flag set to true.

JUnit RT Probe updated to support assumption failures and ignored tests. These two events prevent the results to be sent to Probe Dock RT. These events can be sent when the Probe Dock RT filtering is enabled depending of the testing framework used (example: Arquillian)

Probe Dock RT Arquillian Extension is available to enable the test execution filtering. The extension is mandatory for the execution filtering. The Probe Dock RT Junit probe remains usable for test results collection. The code is on [GitHub](https://github.com/probedock/probedock-rt-arquillian-extension)

Arquillian demo with Probe Dock and Probe Dock RT is available on [GitHub](https://github.com/probedock/probedock-demo-arquillian)

Java based probes have a new feature that allow specifying the category by package through the configuration. The pattern matching is based on minimatch. Example of a configuration

  ```yml
  ...
  java:
    categoriesByPackage:
      io.probedock.integration.*: Integration
      io.probedock.api**: API
  ```

Not important:

Probe Dock JUnit demo dependencies updated
