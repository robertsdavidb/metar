
<?
if ($_GET['stations'] != "") {

	
	$url = "http://www.aviationweather.gov/adds/dataserver_current/httpparam?dataSource=metars&requestType=retrieve&format=xml&mostRecentForEachStation=true&hoursBeforeNow=2&stationString=" . $_GET['stations'];

	$xml = file_get_contents($url);

	$result = new SimpleXMLElement($xml);
	//echo "<PRE>";
	//print_r($result);
	//echo "</PRE>";

	if (count($result->data->METAR) > 0) {

		echo json_encode($result);

	}

}
 
 ?>

