enketo-xslt-transformer-php
===========================

Enketo XForm -> HTML Form transformer using XSLT

Not meant for production. Just a simple demo that can be used for development on enketo-core. 
See this beauty live at [http://xslt-dev.enketo.org/](http://xslt-dev.enketo.org/). Again, don't use for production. It is slow, unsafe, and doesn't handle errors...

###Related Projects

* [enketo-core](https://github.com/MartijnR/enketo-core) - the engine that powers Enketo Smart Paper
* [XPathJS_javarosa](https://github.com/MartijnR/xpathjs_javarosa) - used inside this repo
* [enketo-xslt](https://github.com/MartijnR/enketo-xslt)
* [enketo-xslt-transformer-node] - To follow
* [enketo-dristhi](https://github.com/MartijnR/enketo-dristhi)
* [file-manager](https://github.com/MartijnR/file-manager)
* [openrosa-forms](https://github.com/MartijnR/openrosa-forms) - bunch of test forms, for development

###Installation

1. `apt-get install php5 php5-xsl git`
2. clone this repo `git clone https://github.com/MartijnR/enketo-xslt-transformer-php`
3. `git submodule update --init`
4. Apache or Nginx configuration

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

