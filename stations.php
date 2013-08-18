<SCRIPT>
$(function() {
	$(".station_link").on("click", function(event) {
		LoadMetar(this.id);
	});
});
</SCRIPT>


<?

$url = "http://www.aviationweather.gov/adds/dataserver_current/httpparam?dataSource=stations&requestType=retrieve&format=xml&stationString=~" . $_GET['country'];

$xml = file_get_contents($url);

$result = new SimpleXMLElement($xml);

if (count($result->data->Station) > 0) {
	foreach($result->data->Station as $i => $s) {
		if ($s->state) {
			$state = (string)$s->state;
			$station_id = (string)$s->station_id;
			$site = (string)$s->site;
			$states[$state] = 1;
			$stations[$state][] = $station_id;
			$station[$station_id]['site'] = $site;
		}
	}
}
ksort($states);


if (count($states) > 0) {
	foreach($states as $state => $null) {
		echo $state;
		
		if (count($stations[$state]) > 0) {
	
			foreach ($stations[$state] as $key => $value) {
				echo "<DIV ID='" . $value . "' CLASS='station_link'><DIV CLASS='station_id_link'>" . $value . "</DIV><DIV CLASS='station_site_link'>" . $station[$value]['site'] . "</DIV></DIV>";
			}
		}
		
		echo "<P>";
	}
}

?>
