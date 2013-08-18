
<!DOCTYPE html>
<html>
	<head>
	<meta charset="UTF-8">
		<title>Test</title>	
		<SCRIPT SRC='query-1.9.0.min.js'></SCRIPT>
		<SCRIPT SRC='metar.js'></SCRIPT>
		
		<LINK REL='stylesheet' HREF='metar.css' />
		
		<SCRIPT>
		$(function() {

			var country = "us";
			$('#stations1').load('stations.php?country=' + country, function() {

			});
		});
		</SCRIPT>
	</head>
	<body>
	
	
<TABLE ALIGN='center'>

<TR>
<TD>

</TD>
<TD>
<DIV CLASS='station_container'>
	<SELECT ID='country'>
	<OPTION VALUE='us' SELECTED>US</OPTION>
	<OPTION VALUE='au'>AU</OPTION>
	</SELECT>
	</DIV>
</TD>
</TR>

<TR>
<TD VALIGN='top' WIDTH='900'>
<DIV ID='metar_report'>


</DIV>
</TD>
<TD VALIGN='top'>


	
<DIV CLASS='station_container'>

<DIV ID='stations1'>Loading Stations ...</DIV>

</DIV>
</TD></TR></TABLE>
		
		
	</body>
	
</html>

