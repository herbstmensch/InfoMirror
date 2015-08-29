<!DOCTYPE html>
<html>
    <head>
        <title>InfoMirror</title>
        <script src="js/lib/jquery-1.9.1.min.js"></script>
        <script src="js/lib/ical_parser.js"></script>
        <script src="js/lib/moment.js"></script>
        <script src="js/mirror.js"></script>
	<meta http-equiv="refresh" content="600">
        <link href="weather-icons-master/css/weather-icons.css" media="all" rel="stylesheet" type="text/css" />
        <link href="css/mirror.css" media="all" rel="stylesheet" type="text/css" />
        <link 
            href='http://fonts.googleapis.com/css?family=Roboto|Asap|Droid+Serif|Nunito|Signika|Source+Sans+Pro|Oxygen|Reenie+Beanie|Gloria+Hallelujah' 
            rel='stylesheet' type='text/css'>
        <script>
            $(document).ready(function() {
                moment.lang('de');
                reloadWeather();
                reloadForecast();
                reloadSolar();
                reloadClock();
                reloadMessages();
                reloadFamilyCalendar();
                checkVersion();
            });
        </script>
        <script type="text/javascript">
            var gitHash = '<?php echo trim(`git rev-parse HEAD`) ?>';
        </script>
    </head>
    <body>
        <div id="weather">
            <div id="weather_fade"></div>
            <div id="weather_info" style="font-size: 25pt" ></div>
            <div id="weather_actual" style="font-size: 80pt;" ></div>
            <div id="weather_forecast" style="margin-left: 60px">
                <table style="font-size: 20pt">
                    <tr>
                        <td id="fc_1_day" width="110"></td>
                        <td id="fc_1_icon" width="60"></td>
                        <td id="fc_1_min" align=right></td>
                        <td id="fc_1_max" width="60" align=right></td>
                    </tr>
                    <tr>
                        <td id="fc_2_day" width="110"></td>
                        <td id="fc_2_icon" width="60"></td>
                        <td id="fc_2_min" align=right></td>
                        <td id="fc_2_max" width="60" align=right></td>
                    </tr>
                    <tr>
                        <td id="fc_3_day" width="110"></td>
                        <td id="fc_3_icon" width="60"></td>
                        <td id="fc_3_min" align=right></td>
                        <td id="fc_3_max" width="60" align=right></td>
                    </tr>
                    <tr>
                        <td id="fc_4_day" width="110"></td>
                        <td id="fc_4_icon" width="60"></td>
                        <td id="fc_4_min" align=right></td>
                        <td id="fc_4_max" width="60" align=right></td>
                    </tr>
                    <tr>
                        <td id="fc_5_day" width="110"></td>
                        <td id="fc_5_icon" width="60"></td>
                        <td id="fc_5_min" align=right></td></td>
                        <td id="fc_5_max" width="60" align=right></td>
                    </tr>
                    <tr>
                        <td id="fc_6_day" width="110"></td>
                        <td id="fc_6_icon" width="60"></td>
                        <td id="fc_6_min" align=right></td>
                        <td id="fc_6_max" width="60" align=right></td>
                    </tr>
                </table>
            </div>
        </div>
        <div id="clock">
            <span id="date"></span>
            <span id="time"></span>
        </div>
        <div id="message_container">
            <div id="messages"></div>
        </div>
        <div id="family_calendar">
            <div id="family_calendar_fade"></div>
        </div>
        <div id="solar">
            <div id="col_pipes"></div>
	    <div id="col_clear"></div>
	    <div id="puffer_pipes"></div>
            <!--<img id="solar_schema" src="img/solar.png"/>-->
            <div id="col"></div>
            <span id="solar_col_temp"></span>
            <span id="solar_vl_temp"></span>
            <span id="solar_rl_temp"></span>
            <div id="ww_puffer"></div>
            <span id="solar_wwo_temp"></span>
            <span id="solar_wwu_temp"></span>
            <div id="hz_puffer"></div>
            <span id="solar_hz_temp"></span>
            <span id="solar_pumpe"></span>
	    <div id="puffer_kessel_pipes"></div>
	    <div id="hz_kessel_pipes_vl"></div>
	    <div id="hz_kessel_pipes_rl"></div>
	    <div id="hz_kessel_pipes_clear"></div>
	    <div id="hz"></div>
	    <div id="kessel">
	        <div id="kessel_deco_1"></div>
	        <div id="kessel_deco_2"></div>
	    </div>
            <span id="hz_vl_temp"></span>
        </div>
        <div id="version"></div>
    </body>
</html>
