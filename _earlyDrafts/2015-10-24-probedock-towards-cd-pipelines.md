---
layout: post
title: "Towards a better support for Continuous Delivery pipelines"
categories: roadmap
date: 2015-10-18 13:00:00
media_folder: /media/2015-10-18-probedock-towards-cd-pipelines
---

The objective of Probe Dock is to help agile teams, by giving them better ways assess the quality of their software, but also about their engineering practices. 

Today, Probe Dock already gives you the ability to collect the results of automated tests executed across technologies and components. It gives you a single place, where you can. 

### Overview

Let us first have a look at how most agile teams work. During an iteration, the whole team collaborates to develop new features. The Product Owner defines.

There is not a single build pipeline, but rather a collection of build pipelines that are used at different time scales and for different purposes. Developers use a build pipeline on their machine to support their daily.

### Analytics

* Team
  * How are we doing with this feature? (several times a day)
  * How are we doing during this iteration? (once a day)

* Product Owner
  * How are we doing during this releas
  * How are we doing during this iteration? (once a day)
    * What is the current status of the development branch? How many tests are failing? I
    * 

* Scrum Master
  * Is the Team following agreed upon practices? 

### Pipeline types

The first thing that we need is the ability to define **pipeline types**. A pipeline type defines a sequence of stages.

{% highlight javascript %}
var pipelineType = {
  "id" : "lightweight",
  "description" : "a simple pipeline"
  "stages" : [
    {
      "id" : "stage-01",
      "name" : "run unit tests",
      "description" : "bla bla"
    },
    {
      "id" : "stage-02",
      "name" : "run API tests",
      "description" : "bla bla"
    }
  ]
}
{% endhighlight %}

### Environment types

{% highlight javascript %}
var environmentType = {
  "id" : "developer machine",
  "description" : "bla bla",
  "expectedProperties" : [
    "name" : "developer",
    "name" : "os",
    "name" : "mysqlVersion"
  ]
}
{% endhighlight %}


### Test run

Tests are run in the context of a specific pipeline. Tests are run in a specific environment.


{% highlight javascript %}
var testRunMetadata = {
  "pipeline" : {
    "type" : "lightweight",
    "stage" : "stage-01",
    "properties" : {}
  },
  "environment" : {
    "type" : "developer machine",
    "properties" : {
      "developer" : "Olivier Liechti",
      "os" : "Mac OS X 10.11",
      "mysqlVersion" : "5.x"
    }
  }
}
{% endhighlight %}

### Analytics

{% highlight text %}
> Environments
  > By type
    > Developer machine
      > By developer
        > Olivier Liechti
        > Simon Oulevay
        > Laurent Prévost
    > Integration server
      > By name
        > Push-build server
    > QA
      > By name
        > QA1
        > QA2
    > Pre-Prod
{% endhighlight %}
    
probedock.yml

{% highlight yaml %}
project:
  apiId: kvr0r1t0ydqx
  version: 1.0.0
server: trial.probedock.io
{% endhighlight %}
  
  
  

