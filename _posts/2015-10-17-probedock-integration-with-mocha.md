---
layout: post
title: "Integrating Probe Dock with Mocha"
categories: howto
date: 2015-10-17 13:00:00
media_folder: /media/2015-10-17-probedock-integration-with-mocha
---

[Mocha](https://mochajs.org/) is one of the most popular JavaScript testing frameworks. We have integrated it with Probe Dock, so that test results can be collected and analyzed via our web interface.

Mocha provides a lot of very nice features, which make testing efficient and enjoyable. The framework allows you to test both server-side and client-side components. It supports asynchronous tests, custom reporters and much more.

To illustrate how Probe Dock can be integrated with existing testing frameworks, we have implemented a reference project where automated tests are written and executed with Mocha and where test results are sent to Probe Dock.

Have a look at [this GitHub repo](https://github.com/probedock/probedock-demo-mocha) to see the result and get access to our Mocha runner. If you are using this framework, you will be able to collect your test results and feed them in your Probe Dock server.

### What is our System-Under-Test?

In this demo, we consider **two different systems** that we want to validate with our Mocha tests:

- the first one is **a very simple Node.js module**, which exposes two functions. We are going to check that the functions return values of the expected type.

- the second one is **a fictive distributed application** (with a front-end, a back-end, etc.). There is actually no code at all: we only want to show that with Mocha, it is possible to recursively define test suites within test suites.

Here is the code of the node module that we will test:

{% highlight javascript %}
{% include_relative code/probedock-demo-mocha/app/index.js %}
{% endhighlight %}


### Write tests with Mocha

Writing tests with Mocha is easy. You declare **test suites** by calling the `describe` function. You then declare **individual tests** by calling the `it` function. In the callback function that you pass to `it`, you invoke the System-Under-Test (e.g. you make calls to your Node.js module) and then make assertions on the provided results.

Here is the test suite for validating the behavior of our simple Node.js module:
{% highlight javascript %}
{% include_relative code/probedock-demo-mocha/test/index.js %}
{% endhighlight %}

And here is the test suite for validating the behavior of our fictive distributed application:
{% highlight javascript %}
{% include_relative code/probedock-demo-mocha/test/aDistributedApplication.js %}
{% endhighlight %}

### Configure your Probe Dock environment

To use Probe Dock, you can install your own server. You can also get a free trial account on our SaaS platform. You will find all details on [this page](http://probedock.io/getting-started/). After registration, you will get **credentials** that you will need to store in a local configuration file (see below).

Once you have access to a server, you will also need to **create a new Probe Dock project** and get its **API key**.

Finally, you will need to make sure that **two configuration files** are properly setup on your machine. Firstly, in `~/.probedock/probedock.yml`, you will need to enter the URL of your server and your user credentials. Secondly, in your project folder, you will need a `probedock.yml` file with the API key of your project.

### Run the tests

To run the tests, use this command: `node probedock-mocha-runner.js`. 

In our implementation, we have used the **Mocha programmatic API** to control the Mocha runner and be notified of test successes and failures. Once all tests have been executed, we send the results to the Probe Dock server with our [probedock-node](https://www.npmjs.com/package/probedock-node) library. This is the npm module that you should use if you want to integrate Probe Dock in your development workflow and want to have a lot of control and flexibility.

When you run the command, you should see the following output on your console. Note that two tests are expected to fail (we generate exceptions on purpose).

![image]({{ page.media_folder }}/console-01.png)


### See the test results in Probe Dock

If your setup is correct, you should see the test results in the Probe Dock web interface.

![image]({{ page.media_folder }}/server-01.png)

![image]({{ page.media_folder }}/server-02.png)


### How do all pieces fit together?

You will find more details about the implementation on our [GitHub repo](https://github.com/probedock/probedock-demo-mocha), but the following diagram should already give you a pretty good idea about how Probe Dock, Mocha and your code base fit together.

![image]({{ page.media_folder }}/architecture.png)
 
### Conclusion

Hopefully, this article and the companion [GitHub repo](https://github.com/probedock/probedock-demo-mocha) have given you a good understanding about what needs to be done in order to post test results from a JavaScript environment. If you are using Mocha, then you can use our code either by invoking our runner script from the command line, or by integrating in your favorite build tool (e.g. Grunt, Gulp). 

If you are using another test framework, it should not be too difficult to adapt our code to your needs. It is almost always about using the test framework to launch a runner, listen to test result events and ask the Probe Dock client to send the results to the server.
