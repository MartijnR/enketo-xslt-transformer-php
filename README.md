enketo-xslt-transformer-php [![Build Status](https://travis-ci.org/enketo/enketo-xslt-transformer-php.png)](https://travis-ci.org/enketo/enketo-xslt-transformer-php)
===========================

Enketo XForm to HTML Form transformer using XSLT

Not meant for production. Just a simple demo that can be used for development on enketo-core. 
It is slow, unsafe, and doesn't handle errors...

###Related Projects

* [enketo-transformer](https://github.com/enketo/enketo-transformer) - NodeJS Enketo XSLT transformer

###Installation

1. `apt-get install php5 php5-xsl git`
2. clone this repo `git clone https://github.com/MartijnR/enketo-xslt-transformer-php`
3. `git submodule update --init`
4. use the built-in webserver for development after installing node.js, npm and running `npm install` and `grunt server`
5. or use e.g. Apache or Nginx
6. run tests with `grunt test`
7. simply drop an XForm in test/form to include all tests on that form!

###Usage

There are three ways to provide an XForm source:

1. provide queryparameter `xform` with a url to the source
2. enter/drag a file in the page input
3. POST a XForm file as the `xform` parameter (API call)


###Not included
* security
* error handling 
* XSLT feedback messages
* fix for media labels src link
* fix for lang attributes (to pass HTML validation - not very important)
* fix for adding instanceID node

