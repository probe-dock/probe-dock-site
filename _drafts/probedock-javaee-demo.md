---
layout: post
title: "Integrating Probe Dock and Probe Dock RT in Java EE project"
categories: howto
date: 2015-10-20 15:00:00
media_folder: /media/2015-10-20-probedock-javaee-demo
---

When you start writing a Java EE project, you think about the diversity of automated tests. You have the unit tests, the integration tests, sometimes you also have kind of integration tests dedicated to your REST API. It is also quite common to have a web user interface to test with functional tests.

We have prepared a full Java EE stack demo project where you can discover step by step how to integrate different test technologies.

### System under test

The **system** under test is an object oriented calculator which offer only four operations: `div`, `sub`, `mul` and `add`. In fact, the REST API offer a simple language to write complex operation (e.g. (2 + (3 - 1))).

You will find the demo project [probedock-demo-jee-stack/probedock-demo-jee-stack-notest](https://github.com/probedock/probedock-demo-jee-stack/probedock-demo-jee-stack-notest).

The application let you send operations through a REST API and give you the result. There is an example of an operation payload:

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

Doing a POST request on the `http://localhost:8080/jee-stack/api/calculator` with this JSON payload should have the following result.

{% highlight json %}
{
  "result": -8
}
{% endhighlight %}

### Unit tests

In the [probedock-demo-jee-stack/probedock-demo-jee-stack-unit](https://github.com/probedock/probedock-demo-jee-stack/probedock-demo-jee-stack-unit) project, we introduced the unit tests as the first test technology of our stack. We already integrated Probe Dock and Probe Dock RT in this project. Go though the README to see exactly what we did. There is the summary of modifications we did based on the project without tests.

  1. Added Probe Dock and test dependencies
  2. Configured Maven Surefire plugin for Probe Dock
  3. Written few unit tests with JUnit
  4. Added the `probedock.yml` project configuration file

### Integration tests

In the [probedock-demo-jee-stack/probedock-demo-jee-stack-integration](https://github.com/probedock/probedock-demo-jee-stack/probedock-demo-jee-stack-integration) project, we introduced the integration tests. We used [Arquillian](http://arquillian.org) to write our integration tests.

In two words, Arquillian provide a way to run the tests in a lightweight application container where all the Java EE is managed as you are used to.

There is the summary of modifications we did based on the project without tests.

  1. Added Probe Dock and test (JUnit, Arquillian, ...) dependencies
  2. Added a dependency management part for Arquillian for the version management
  3. Configured Maven Surefire plugin for Probe Dock
  4. We added several configuration files required by Arquillian
  5. We have written few integration tests with JUnit add added the required annotations and methods for Arquillian. Each test class will have the responsibility to create its own archive to be run by Arquillian.
  6. Added the `probedock.yml` project configuration file

### API tests

In the  [probedock-demo-jee-stack/probedock-demo-jee-stack-api](https://github.com/probedock/probedock-demo-jee-stack/probedock-demo-jee-stack-api) project, we introduced the API tests. We used a custom test framework [java-api-test](https://github.com/probedock/java-api-test) to write our API tests.

The test framework offers an abstraction to make JSON based requests on a REST API. There few utility methods to help writing tests.

We also use another custom framework to have access to the JPA API. We use [junitee-data-utils](https://github.com/probedock/junitee-data-utils). This framework allow us to manage the data directly through the code written for the application (entities, services).

In fact, we continue to use Arquillian to have a lightweight running application. In Arquillian, there is two modes to run the tests. Server mode and client mode. In the integration tests, we use the server mode. In the API tests, we use the client mode. In this mode, the tests are run `outside` the application context. Therefore, we cannot inject services in the test directly as it is not managed.

In summary, we did the following steps to make the tests running and integrated with Probe Dock:

  1. Added Probe Dock and test (JUnit, java-api-test, ...) dependencies
  2. Added a dependency management part for Arquillian for the version management
  3. Configured Maven Surefire plugin for Probe Dock
  4. We added several configuration files required by Arquillian
  5. We have written few integration tests with JUnit add added the required annotations and methods for Arquillian. Each test class will have the responsibility to create its own archive to be run by Arquillian. In client mode, we also benefit from some injections like the URL where the application is running by Arquillian.
  6. Added the `probedock.yml` project configuration file
  7. We added some configuration and code to integrate the junitee-data-utils.

### Rule them all

Finally, we bring all these pieces together. The project [probedock-demo-jee-stack/probedock-demo-jee-stack-all](https://github.com/probedock/probedock-demo-jee-stack/probedock-demo-jee-stack-all) offers the three test types and a way to run each of them separately or all together.

In summary, we id the following steps to make the tests running correctly:

  1. We have combined all the tests under the same project.
   * We have the standard packages for unit tests
   * We have the integration package for the integration tests
   * We have the api package for the API tests

  2. We combined the different configuration files
  3. We have added the probedock project configuration file with the correct categories by package to make sure the integration and API tests have the corresponding category.
  4. We have tuned the Maven Surefire plugin configuration to run only the unit tests by default when running the command `mvn clean install`
  5. We added three maven profiles with tuned Maven Surefire configuration.
   * `integration` to run only these tests with `mvn clean install -Pintegration`
   * `api` to run only these tests with `mvn clean install -Papi`
   * `all` to run all the tests at once with `mvn clean install -Pall`

### Conclusion

Hopefully, this article and the companion [GitHub repo](https://github.com/probedock/probedock-demo-jee-stack) have given you a good understanding about what needs to be done in order to integrate different test technologies in a Java EE application. Use our demo project to get inspiration about how to integrate Probe Dock in your Java EE projects or any Java application with different JUnit based testing.

If you use different test framework based on JUnit, it will be supported out-of-the-box by Probe Dock JUnit probe. You just need to add the listener in the Maven Surefire plugin configuration.
