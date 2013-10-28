enketo-xslt-transformer-php
===========================

Enketo XForm -> HTML Form transformer using XSLT

Not meant for production. Just a simple demo that can be used for development on enketo-core.


###Installation
1 `apt-get install php5 php5-xsl git`
2 clone this repo
3 `git submodule update --init`Y


###Usage

There are three ways to provide an XForm source:

1. provide queryparamater `xform` with a url to the source
2. enter/drag a file in the page input
3. POST a XForm file as the `xform` parameter (API call)
