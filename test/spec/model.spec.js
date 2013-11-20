var xforms = [
    'Basic-with-jr-meta.xml',
    'Basic-with-meta.xml',
    'Basic-no-meta.xml',
    'Basic-with-meta-no-id.xml',
    'Basic-meta-wrong-location.xml',
    'widgets-dev.xml'
];


describe("XSL Transformation outputs for the model", function() {

    for (var i = 0; i < xforms.length; i++) {
        test(xforms[i]);
    }

    function test(form) {
        var parseError, $result, $model,
            result = transform(form);

        try {
            $result = $($.parseXML(result));
            $model = $result.find('model:eq(0)');
        } catch (e) {
            parseError = e;
        }

        it("are valid XML for form: " + form, function() {
            //this would be invalid if namespaces were included in the output
            expect(parseError).toBeUndefined();
        });

        it("include a model for form: " + form, function() {
            expect($model.length).toEqual(1);
        });

        it("include one meta node for form: " + form, function() {
            expect($model.find('instance>*>meta').length).toEqual(1);
        });

        it("include one meta/instanceID node for form: " + form, function() {
            console.log($model[0]);
            expect($model.find('instance>*>meta>instanceID').length).toEqual(1);
        });
    }
});
