# Probe Dock Site

Jekyll site for [Probe Dock](https://github.com/probedock/probedock).

The `source` branch contains the source of the Jekyll blog.
That's where you should work to update the blog.

The `master` branch contains the compiled version that is served by GitHub pages.



* [Requirements](#requirements)
* [First-time setup](#setup)
* [Local development](#development)
* [Staging deployment (Amazon S3)](#staging)
* [Production deployment (GitHub Pages)](#production)



<a name="requirements"></a>
## Requirements

* Ruby 2.x



<a name="setup"></a>
## First-time setup

* `git clone git@github.com:probedock/probedock.github.io.git`

* `cd probedock.github.io.git`

* `git checkout source`

* `bundle install`

The following step is required to push the blog to Amazon S3 for staging:

* Create a `.env` file in the root directory of the repository, with the following contents:

  ```
  S3_KEY=your-amazon-access-key-id
  S3_SECRET=your-amazon-access-key-secret
  ```



<a name="development"></a>
## Local development

Run the following task to serve the site locally and open it in your browser:

* `bundle exec rake preview`



<a name="staging"></a>
## Staging deployment

Run the following task to build the site and upload it to Amazon S3 for preview:

* `bundle exec rake staging`

Go to [http://probedock-blog-staging.s3-website.eu-central-1.amazonaws.com/](http://probedock-blog-staging.s3-website.eu-central-1.amazonaws.com/) to view the generated site.

**Note:** this builds the site from the current directory with drafts enabled.



<a name="production"></a>
## Production deployment

Run the following task to build the site and push it to GitHub Pages:

* `bundle exec rake pages`

Go to [http://probedock.io/](http://probedock.io/) to view the generated site.

**Note:** this builds from the latest commit on the *local master branch* (local modifications will *not* be included) with drafts disabled.
