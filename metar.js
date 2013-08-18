

function LoadMetar(station_id) {
	$('#metar_report').html("");
	var url = 'metar_json.php?stations=' + station_id;
	$.get(url, function(data){ 
			var result = jQuery.parseJSON(data);
			var m = result.data.METAR;
			
			var text = "<SPAN CLASS='metar_data'>" + m.raw_text + "</SPAN><BR>";
			text += "<SPAN CLASS='metar_label'>Station ID</SPAN><SPAN CLASS='metar_data'>" + m.station_id + "</SPAN><BR>";
			text += "<SPAN CLASS='metar_label'>Observation Time</SPAN><SPAN CLASS='metar_data'>" + m.observation_time + "</SPAN><BR>";
			text += "<SPAN CLASS='metar_label'>Latitude</SPAN><SPAN CLASS='metar_data'>" + m.latitude + "</SPAN><BR>";
			text += "<SPAN CLASS='metar_label'>Longitude</SPAN><SPAN CLASS='metar_data'>" + m.longitude + "</SPAN><BR>";
			text += "<SPAN CLASS='metar_label'>Elevation</SPAN><SPAN CLASS='metar_data'>" + m.elevation_m + " m</SPAN><BR>";	
			text += "<SPAN CLASS='metar_label'>Flight Category</SPAN><SPAN CLASS='metar_data'>" + m.flight_category + "</SPAN><BR>";			
			text += "<SPAN CLASS='metar_label'>Temp</SPAN><SPAN CLASS='metar_data'>" + m.temp_c + " &deg;C</SPAN><BR>";
			text += "<SPAN CLASS='metar_label'>Dew Point</SPAN><SPAN CLASS='metar_data'>" + m.dewpoint_c + " &deg;C</SPAN><BR>";		
			text += "<SPAN CLASS='metar_label'>Wind</SPAN><SPAN CLASS='metar_data'>" + m.wind_dir_degrees + " &deg; at " + m.wind_speed_kt + " kts";
			if (m.wind_gust_kt) {
				text += " with gusts up to " + m.wind_gust_kt + " kts";
			}
			text += "</SPAN><BR>";
			if (m.visibility_statute_mi) {
				text += "<SPAN CLASS='metar_label'>Visibility</SPAN><SPAN CLASS='metar_data'>" + m.visibility_statute_mi + " miles</SPAN><BR>";
			}
			if (m.vert_vis_ft) {
				text += "<SPAN CLASS='metar_label'>Vertical Visibility</SPAN><SPAN CLASS='metar_data'>" + m.vert_vis_ft + " ft</SPAN><BR>";
			}		

			if (m.sky_condition.length > 0) {
				var sky_condition = "";
				var sky_cover = "";
				for (var i = 0; i < m.sky_condition.length; i++) {
					switch(m.sky_condition[i]['@attributes']['sky_cover']) {
						case "FEW":
							sky_cover = "few clouds";
							break;
						case "SCT":
							sky_cover = "scattered clouds";
							break;
						case "OVC":
							sky_cover = "overcast";
							break;
						case "BKN":
							sky_cover = "broken clouds";
							break;
						default:
							sky_cover = "[Unknown]";
					}
					sky_condition += sky_cover + " at " + m.sky_condition[i]['@attributes']['cloud_base_ft_agl'] + " ft";
					if (i < m.sky_condition.length) {
						sky_condition += ",";
					}
					sky_condition += " ";

				}
				text += "<SPAN CLASS='metar_label'>Sky Condition</SPAN><SPAN CLASS='metar_data'>" + sky_condition + "</SPAN><BR>";
			}

			
			text += "<SPAN CLASS='metar_label'>Pressure</SPAN><SPAN CLASS='metar_data'>" + m.altim_in_hg;
			if (m.sea_level_pressure_mb) {
				text += " (Sea Level " + m.sea_level_pressure_mb + " mb)";
			}
			text += "</SPAN><BR>";
			if (m.three_hr_pressure_tendency_mb) {
				text += "<SPAN CLASS='metar_label'>3 Hr Pressure Tendency</SPAN><SPAN CLASS='metar_data'>" + m.three_hr_pressure_tendency_mb + "</SPAN><BR>";
			}
			if (m.maxT_c) {
				text += "<SPAN CLASS='metar_label'>Max Temp</SPAN><SPAN CLASS='metar_data'>" + m.maxT_c + " &deg;C</SPAN><BR>";
			}
			if (m.minT_c) {
				text += "<SPAN CLASS='metar_label'>Min Temp</SPAN><SPAN CLASS='metar_data'>" + m.minT_c + " &deg;C</SPAN><BR>";
			}
			if (m.maxT24hr_c) {
				text += "<SPAN CLASS='metar_label'>24 Hr Max Temp</SPAN><SPAN CLASS='metar_data'>" + m.maxT24hr_c + " &deg;C</SPAN><BR>";
			}			
			if (m.minT24hr_c) {
				text += "<SPAN CLASS='metar_label'>24 Hr Min Temp</SPAN><SPAN CLASS='metar_data'>" + m.minT24hr_c + " &deg;C</SPAN><BR>";
			}		
			if (m.precip_in) {
				text += "<SPAN CLASS='metar_label'>24 Hr Max Temp</SPAN><SPAN CLASS='metar_data'>" + m.precip_in + " &deg;C</SPAN><BR>";
			}	
			if (m.pcp3hr_in) {
				text += "<SPAN CLASS='metar_label'>Precipitation</SPAN><SPAN CLASS='metar_data'>" + m.pcp3hr_in + " in last 3 hours</SPAN><BR>";
			}
			if (m.pcp6hr_in) {
				text += "<SPAN CLASS='metar_label'>Precipitation</SPAN><SPAN CLASS='metar_data'>" + m.pcp6hr_in + " in last 6 hours</SPAN><BR>";
			}
			if (m.pcp24hr_in) {
				text += "<SPAN CLASS='metar_label'>Precipitation</SPAN><SPAN CLASS='metar_data'>" + m.pcp24hr_in + " in last 24 hours</SPAN><BR>";
			}

	});	
}