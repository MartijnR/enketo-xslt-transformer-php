(function(factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function($) {

    /**
     * TODO: split off of form model and add as submodule?
     *
     * Simple XPath Compatibility Plugin for jQuery 1.1
     * By John Resig
     * Dual licensed under MIT and GPL.
     * Original plugin code here: http://code.google.com/p/jqueryjs/source/browse/trunk/plugins/xpath/jquery.xpath.js?spec=svn3167&r=3167
     * some changes made by Martijn van de Rijdt (not replacing $.find(), removed context, dot escaping)
     *
     * @param  {string} selector [description]
     * @return {?(Array.<(Element|null)>|Element)}          [description]
     */
    $.fn.xfind = function(selector) {
        var parts, cur, i;

        // Convert the root / into a different context
        //if ( !selector.indexOf("/") ) {
        //  context = this.context.documentElement;
        //  selector = selector.replace(/^\/\w*/, "");
        //  if ( !selector ){
        //      return [ context ];
        //  }
        //}

        // Convert // to " "
        selector = selector.replace(/\/\//g, " ");

        //added by Martijn
        selector = selector.replace(/^\//, "");
        selector = selector.replace(/\/\.$/, '');

        // Convert / to >
        selector = selector.replace(/\//g, ">");

        // Naively convert [elem] into :has(elem)
        selector = selector.replace(/\[([^@].*?)\]/g, function(m, selector) {
            return ":has(" + selector + ")";
        });

        // Naively convert /.. into a new set of expressions
        // Martijn: I just don't see this except if this always occurs as nodea/../../parentofnodea/../../grandparentofnodea
        if (selector.indexOf(">..") >= 0) {
            parts = selector.split(/>\.\.>?/g);
            //var cur = jQuery(parts[0], context);
            cur = jQuery(parts[0], this);
            for (i = 1; i < parts.length; i++)
                cur = cur.parent(parts[i]);
            return cur.get();
        }

        // any remaining dots inside node names need to be escaped (added by Martijn)
        selector = selector.replace(/\./gi, '\\.');

        //if performance becomes an issue, it's worthwhile implementing this with native XPath instead.
        return this.find(selector);
    };
}));
