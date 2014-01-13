//counts a group of radiobuttons and checkboxes as one
function countInputsForm($form, selector) {
    return $form.find(selector).closest('.question, .note, .trigger, .calculation').length;
}

//some xform elements with constraints, relevants, requireds are ignored by enketo
//this function allows to easily exclude them
function countBindsXform($xform, selector, excludes) {
    excludes = excludes || [];
    var $binds = $xform.find('bind' + selector),
        $ignore = $binds.filter(function() {
            for (var i = 0; i < excludes.length; i++) {
                if ($xform.find(excludes[i] + '[ref="' + $(this).attr('nodeset') + '"]').length > 0) {
                    return true;
                }
            }
            return false;
        });
    return $binds.length - $ignore.length;
}
