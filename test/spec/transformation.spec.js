/* jshint browser:true, devel:true */
/* global xforms, $, getTransform, getXform, describe, it, expect, countBindsXform, countInputsForm */

(function() {
    "use strict";

    var results = [];

    for (var i = 0; i < xforms.length; i++) {
        var $result, parseError, $model, $form, $xform;
        try {
            $result = $($.parseXML(getTransform(xforms[i])));
        } catch (e) {
            console.error('Error parsing XML:', e);
            parseError = e;
        }
        $model = (parseError) ? null : $result.find('model:eq(0)');
        $form = (parseError) ? null : $result.find('form:eq(0)');
        $xform = $(getXform(xforms[i]));
        results.push({
            name: xforms[i],
            $model: $model,
            $form: $form,
            $xform: $xform
        });
    }

    describe("Model output", function() {
        var tests = [

            function testValid(result) {
                it("is valid XML for: " + results[i].name, function() {
                    //this would be invalid if namespaces were included in the output
                    expect(result.$model).not.toBe(null);
                });
            },
            function testPresent(result) {
                it("includes a model for: " + result.name, function() {
                    expect(result.$model.length).toEqual(1);
                });
            },
            function testMeta(result) {
                it("includes one meta node for: " + result.name, function() {
                    expect(result.$model.find('instance>*>meta').length).toEqual(1);
                });
            },
            function testInstanceID(result) {
                it("includes one meta/instanceID node for form: " + result.name, function() {
                    expect(result.$model.find('instance>*>meta>instanceID').length).toEqual(1);
                });
            }
        ];

        for (var j = 0; j < tests.length; j++) {
            for (var i = 0; i < results.length; i++) {
                tests[j](results[i]);
            }
        }
    });

    describe("Form output", function() {
        var tests = [

            function testValid(result) {
                it("is valid XML for: " + results[i].name, function() {
                    expect(result.$form).not.toBe(null);
                });
            },
            function testPresent(result) {
                it("includes a form for: " + result.name, function() {
                    expect(result.$form.length).toEqual(1);
                });
            },
            function testItemsets(result) {
                it("contains the correct number of itemsets for: " + result.name, function() {
                    expect(result.$form.find('.itemset-template').length).toEqual(result.$xform.find('itemset').length);
                });
            },
            function testTriggers(result) {
                it("contains the correct number of triggers for: " + result.name, function() {
                    expect(result.$form.find('.trigger').length).toEqual(result.$xform.find('trigger').length);
                });
            },
            function testRelevants(result) {
                var $binds = result.$xform.find('bind[relevant]:not([jr\\:preload])'),
                    relX = $binds.filter(function() {
                        var nodeset = $(this).attr('nodeset');
                        //remove those bindings that ONLY apply to outputs
                        return result.$xform.find('[ref="' + nodeset + '"]').length !== 0 || $(this).attr('calculate') || $(this).attr('jr:preload');
                    }).length,
                    relH = countInputsForm(result.$form, '[data-relevant]') + result.$form.find('.or-group[data-relevant], .or-group-data[data-relevant]').length;
                it("contains the correct number of relevant logic for: " + result.name, function() {
                    expect(relH).toEqual(relX);
                });
            },
            function testConstraints(result) {
                var conX = countBindsXform(result.$xform, '[constraint]', ['trigger']),
                    conH = countInputsForm(result.$form, '[data-constraint]');
                it("contains the correct number of constraint logic for: " + result.name, function() {
                    expect(conH).toEqual(conX);
                });
            },
            function testRequireds(result) {
                var reqX = countBindsXform(result.$xform, '[required]', ['trigger', 'group']),
                    reqH = countInputsForm(result.$form, '[required]');
                it("contains the correct number of required logic for: " + result.name, function() {
                    expect(reqH).toEqual(reqX);
                });
            },
            function testOutputs(result) {
                var outX = result.$xform.find('output').length,
                    outH = result.$form.find('.or-output').length;
                it("contains the correct number of outputs for: " + result.name, function() {
                    expect(outH).toEqual(outX);
                });
            },
            function testCalculates(result) {
                var calcX = countBindsXform(result.$xform, '[calculate]'),
                    calcH = countInputsForm(result.$form, '[data-calculate]'); //result.$form.find('[data-calculate]').length;
                it("contains the correct number of calculated items for: " + result.name, function() {
                    expect(calcH).toEqual(calcX);
                });
            },
            function testPreloads(result) {
                var preloadX = result.$xform.find('bind[jr\\:preload]').length,
                    preloadH = result.$form.find('#or-preload-items input').length;
                it("contains the correct number of preload items for: " + result.name, function() {
                    expect(preloadH).toEqual(preloadX);
                });
            },
            function testNotRadioCheckbox(result) {
                var inputX = result.$xform.find('input, upload').length,
                    inputH = result.$form.find('textarea, input:not([type="radio"], [type="checkbox"])').length,
                    preloadCalculateH = result.$form.find('#or-preload-items input:not([data-calculate]), #or-calculated-items [data-calculate]').length;
                it("contains the correct number of non-radio and non-checkbox inputs for: " + result.name, function() {
                    expect(inputH - preloadCalculateH).toEqual(inputX);
                });
            },
            function testOptions(result) {
                var itemX = result.$xform.find('select item, select1 item').length,
                    optionH = result.$form.find('select:not(#form-languages) > option:not(.itemset-template)[value!=""]').length,
                    radioH = result.$form.find('label:not(.itemset-template) [type="radio"]').length,
                    checkH = result.$form.find('label:not(.itemset-template) [type="checkbox"]').length;
                it("contains the correct number of non-itemset options for: " + result.name, function() {
                    expect(optionH + radioH + checkH).toEqual(itemX);
                });
            },
            function testSelects(result) {
                var $x = result.$xform,
                    xselect = $x.find('select').length,
                    xselect1 = $x.find('select1').length;
            }
        ];

        for (var j = 0; j < tests.length; j++) {
            for (var i = 0; i < results.length; i++) {
                tests[j](results[i]);
            }
        }

    });

    describe("Form/Model output", function() {

        var tests = [

            function testNodeMatching(result) {
                var paths = [],
                    misses = [];

                result.$form.find('[name]').each(function() {
                    if ($.inArray($(this).attr('name'), paths)) {
                        paths.push($(this).attr('name'));
                    }
                });

                for (var i = 0; i < paths.length; i++) {
                    if (result.$model.xfind(paths[i]).length < 1) {
                        misses.push('Name attribute of form node: ' + paths[i] + ' has no corresponding model node');
                    }
                }

                it("each form control has a matching data node for: " + result.name, function() {
                    expect(misses.join(', ')).toEqual('');
                });
            }
        ];

        for (var j = 0; j < tests.length; j++) {
            for (var i = 0; i < results.length; i++) {
                tests[j](results[i]);
            }
        }
    });

    //TODO: add test for https://github.com/MartijnR/enketo-xslt/issues/12
}());
