<?php

	//get the xform source
	$source = (isset($_FILES['xform']) && $_FILES['xform']['size'] > 0) ? $_FILES['xform']['tmp_name'] : $_GET['xform'];
	
	if ( $source ) {

		$xform = new DOMDocument();
		$form_xsl = new DOMDocument();
		$model_xsl = new DOMDocument();

		//load files
		$xform->load($source);
		$form_xsl->load('lib/openrosa2html5form_php5.xsl');
		$model_xsl->load('lib/openrosa2xmlmodel.xsl');

		//get HTML Form transformation result
		$proc = new XSLTProcessor;
		$proc->importStyleSheet($form_xsl);
		$form = simplexml_load_string($proc->transformToXML($xform));

		//get XML Model transformation result
		$proc->importStyleSheet($model_xsl);
		$model = simplexml_load_string($proc->transformToXML($xform));
		$result = new SimpleXMLElement('<root>'.$model->model->asXML().$form->form->asXML().'</root>');
		
		//output result
		echo $result->asXML();
	} else {

		//output file input
		echo '<form action="" method="post" enctype="multipart/form-data">';
		echo '<label>OpenRosa XForm: <input type=file name="xform" /></label>';
		echo '<input type="submit" name="submit" value="Submit">';
		echo '</form>';
	}
?>
