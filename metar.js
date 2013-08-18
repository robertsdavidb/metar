

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

			
			$('#metar_report').append(text);
			/*
			$('#raw_text').html(metar.data.METAR.raw_text);
			$('#station_id').html(metar.data.METAR.station_id);
			$('#observation_time').html(metar.data.METAR.observation_time);
			$('#temp_c').html(metar.data.METAR.temp_c);
			$('#dewpoint_c').html(metar.data.METAR.dewpoint_c);
			$('#wind_dir_degrees').html(metar.data.METAR.wind_dir_degrees);
			$('#wind_speed_kt').html(metar.data.METAR.wind_speed_kt);
			if (metar.data.METAR.wind_gust_kt) {
				$('#wind_gust_kt').html(" with gusts up to " + metar.data.METAR.wind_gust_kt + " kts");
			}
			$('#visibility_statute_mi').html(metar.data.METAR.visibility_statute_mi);
			$('#altim_in_hg').html(metar.data.METAR.altim_in_hg);
			$('#sea_level_pressure_mb').html(metar.data.METAR.sea_level_pressure_mb);
			$('#latitude').html(metar.data.METAR.latitude);
			$('#longitude').html(metar.data.METAR.longitude);
			
			$('#flight_category').html(metar.data.METAR.flight_category);
			$('#three_hr_pressure_tendency_mb').html(metar.data.METAR.three_hr_pressure_tendency_mb);
			$('#maxT_c').html(metar.data.METAR.maxT_c);
			$('#minT_c').html(metar.data.METAR.minT_c);
			$('#maxT24hr_c').html(metar.data.METAR.maxT24hr_c);
			$('#minT24hr_c').html(metar.data.METAR.minT24hr_c);
			$('#precip_in').html(metar.data.METAR.precip_in);
			$('#pcp3hr_in').html(metar.data.METAR.pcp3hr_in);
			$('#pcp6hr_in').html(metar.data.METAR.pcp6hr_in);
			$('#pcp24hr_in').html(metar.data.METAR.pcp24hr_in);
			$('#vert_vis_feet').html(metar.data.METAR.vert_vis_feet);
			$('#elevation_m').html(metar.data.METAR.elevation_m);
			
			if (metar.data.METAR.sky_condition.length > 0) {
				var sky_condition = "";
				for (var i = 0; i < metar.data.METAR.sky_condition.length; i++) {
					sky_condition += metar.data.METAR.sky_condition[i]['@attributes']['sky_cover'] + " at " + metar.data.METAR.sky_condition[i]['@attributes']['cloud_base_ft_agl'] + " ";
				}
				$('#sky_condition').html(sky_condition);
			}
*/
	});	
}