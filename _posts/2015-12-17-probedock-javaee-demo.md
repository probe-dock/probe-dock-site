---
layout: post
title: "Integrating Probe Dock and Probe Dock RT into a Java EE project"
categories: howto
date: 2015-12-17 14:00:00
media_folder: /media/probedock-javaee-demo
---

When you build a Java EE project, you can use a variety of automated tests. Unit tests, integration tests, tests for your REST API. It is also quite common to have functional tests for the web user interface.

We have prepared a full stack Java EE demo project where you can discover step by step how to integrate multiple test technologies with Probe Dock.



### System under test

The **system** under test is an object-oriented calculator with four operations: `div`, `sub`, `mul` and `add`. Its REST API offers a simple language to express more complex operation (e.g. `(2 + (3 - 1))`).

Check out the [demo project (without tests)](https://github.com/probedock/probedock-demo-jee-stack/tree/master/probedock-demo-jee-stack-notest).

Here's a sample payload for the REST API.
It represents the calculation `2 + (10 - ((15 / 3) * 4))`:

{% highlight json %}
{
  "type": "add",
  "left": 2,
  "rightOperation": {
    "type": "sub",
    "left": 10,
    "rightOperation": {
      "type": "mul",
      "leftOperation": {
        "type": "div",
        "left": 15,
        "right": 3
      },
      "right": 4
    }
  }
}
{% endhighlight %}

Submitting this payload with a POST request on `http://localhost:8080/jee-stack/api/calculator` will yield the following result:

{% highlight json %}
{
  "result": -8
}
{% endhighlight %}



### Unit tests

In the [probedock-demo-jee-stack-unit](https://github.com/probedock/probedock-demo-jee-stack/tree/master/probedock-demo-jee-stack-unit) project, we added JUnit tests as the first test technology in our stack. We have already integrated Probe Dock and Probe Dock RT into this project. Go through the README to see exactly what we did.

This is a short summary of modifications compared to the initial project without tests:

  1. Added Probe Dock and test dependencies
  2. Configured Maven Surefire plugin for Probe Dock
  3. Wrote a few unit tests with JUnit
  4. Added the `probedock.yml` project configuration file



### Integration tests

In the [probedock-demo-jee-stack-integration](https://github.com/probedock/probedock-demo-jee-stack/tree/master/probedock-demo-jee-stack-integration) project, we introduced integration tests with [Arquillian](http://arquillian.org) in addition to unit tests.

Arquillian is a Java EE test framework which runs the tests in a lightweight application container where all Java EE components are managed as you are used to.

This is a summary of modifications compared to the initial project, including the previous setup of the unit tests:

  1. Added Probe Dock and test (JUnit, Arquillian, ...) dependencies
  2. Added the dependency management configuration for Arquillian for the version management
  3. Configured Maven Surefire plugin for Probe Dock
  4. Added several configuration files required by Arquillian
  5. We have written a few integration tests with JUnit and added the required annotations and methods for Arquillian. Each test class will have the responsibility to create its own archive to be run by Arquillian.
  6. Added the `probedock.yml` project configuration file



### API tests

In the [probedock-demo-jee-stack-api](https://github.com/probedock/probedock-demo-jee-stack/tree/master/probedock-demo-jee-stack-api) project, we introduced API tests. We used [java-api-test](https://github.com/probedock/java-api-test) to write our API tests.

The test framework offers an abstraction to make JSON requests on a REST API. It also provides utility methods to make assertions on JSON responses.

We have also used another library to manage data through JPA: [junitee-data-utils](https://github.com/probedock/junitee-data-utils). This library allows us to populate data through code in the test setup phase.

With Arquillian, there are two modes to run the tests: the server mode and the client mode. We use the server mode for integration tests, and the client mode for API tests. In the client mode, the tests are run *outside* of the application context. Therefore, we cannot inject services in tests directly as they are not managed.

This is a summary of modifications compared to the initial project, including the previous setups of the unit and integration tests:

  1. Added Probe Dock and test (JUnit, java-api-test, ...) dependencies
  2. Added the dependency management configuration for Arquillian for the version management
  3. Configured Maven Surefire plugin for Probe Dock
  4. Added several configuration files required by Arquillian
  5. We have written a few integration tests with JUnit and added the required annotations and methods for Arquillian. Each test class will have the responsibility to create its own archive to be run by Arquillian. In client mode, we also benefit from some injections like the URL where the application is running by Arquillian.
  6. Added the `probedock.yml` project configuration file
  7. Added the configuration and code to integrate junitee-data-utils



### Rule them all

Finally, we bring all these pieces together. The project [probedock-demo-jee-stack-all](https://github.com/probedock/probedock-demo-jee-stack/tree/master/probedock-demo-jee-stack-all) contains the three kinds of tests and a way to run each of them separately or all together.

We performed the following steps to have all tests running correctly:

  1. We have combined all the tests into the same project:
   * We have the standard packages for unit tests.
   * We have the `integration` package for the integration tests.
   * We have the `api` package for the API tests.

  2. We combined the different configuration files.
  3. We have added the probedock project configuration file with the correct categories by package to make sure integration and API tests are assigned the correct category in Probe Dock.
  4. We have tuned the Maven Surefire plugin configuration to run only the unit tests by default when running the command `mvn clean install`.
  5. We added three maven profiles with custom Maven Surefire configurations:
   * `integration` to run only integration tests with `mvn clean install -Pintegration`
   * `api` to run only API tests tests with `mvn clean install -Papi`
   * `all` to run all tests at once with `mvn clean install -Pall`



### Conclusion

Hopefully, this article and the companion [GitHub repo](https://github.com/probedock/probedock-demo-jee-stack) have given you a good understanding of what needs to be done in order to integrate different test technologies in a Java EE application. Use our demo project to learn how to integrate Probe Dock into your Java EE projects or any Java application with JUnit-based testing.

If you use other test frameworks based on JUnit, they will be supported out of the box by the [Probe Dock JUnit probe](https://github.com/probedock/probedock-junit). You simply need to add the listener in the Maven Surefire plugin configuration.
