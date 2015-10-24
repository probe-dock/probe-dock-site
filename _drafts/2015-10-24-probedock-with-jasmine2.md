---
layout: post
title: "Using Probe Dock with Jasmine2"
categories: roadmap
date: 2015-10-24 13:00:00
media_folder: /media/2015-10-24-probedock-with-jasmine2
---

Are you using Jasmine 2 and do you want to send your test results to Probe Dock?

In a [previous post]({% post_url 2015-10-17-probedock-integration-with-mocha %}), we have shown how the [probedock-node](https://www.npmjs.com/package/probedock-node) npm module can be used to send test results to the Probe Dock server in a JavaScript environment. To illustrate the process, we have shown what you need to do if you are using the Mocha framework. You can grab the code in [this GitHub repo](https://github.com/probedock/probedock-demo-mocha).

We have now done the same thing for Jasmine2. If you are using this framework to write your tests, you will see that you can very easily collect the results (using a custom reporter), prepare a test run payload and send it to the Probe Dock server. For the details, have a look in [this repo](https://github.com/probedock/probedock-demo-jasmine2)!

![image]({{ page.media_folder }}/server-01.png)
