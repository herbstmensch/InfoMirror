var fam_cal = 'load_res.php?id=FAM_CAL';
var forecast = 'load_res.php?id=FORECAST';
var weather = 'load_res.php?id=WEATHER';
var infos_url = 'load_res.php?id=INFO';

function reloadWeather() {
    
    setTimeout(function() {
        reloadWeather();
    }, 600000);
    
    $.getJSON(weather, function(data) {
        if (data) {
            $("#weather_info").html('<table><tr><td style="width: 220px"><i class="wi-strong-wind"/>&nbsp;' + Math.round(data.wind.speed * 3.6, 1) + ' km/h</td><td style="width: 210px"><i class="wi-sunset"/>&nbsp;' + new Date(data.sys.sunset * 1000).toTimeString().substring(0, 5) + ' Uhr</td></tr></table>');
            $("#weather_actual").html('<table><tr><td style="width: 190px" align="center"><i class="' + getIconCode(data.weather[0].icon) + '"/></td><td>' + Math.round(data.main.temp * 10 / 5) * 0.5 + '°</td></tr></table>');
        }

        
    });
}

function reloadForecast() {

    setTimeout(function() {
        reloadForecast();
    }, 600000);
        
    $.getJSON(forecast, function(data) {

        if (data) {
            $("#fc_1_day").html(moment(new Date(data.list[0].dt * 1000)).format('dd'));
            $("#fc_2_day").html(moment(new Date(data.list[1].dt * 1000)).format('dd'));
            $("#fc_3_day").html(moment(new Date(data.list[2].dt * 1000)).format('dd'));
            $("#fc_4_day").html(moment(new Date(data.list[3].dt * 1000)).format('dd'));
            $("#fc_5_day").html(moment(new Date(data.list[4].dt * 1000)).format('dd'));
            $("#fc_6_day").html(moment(new Date(data.list[5].dt * 1000)).format('dd'));
            $("#fc_1_icon").html('<i class="' + getIconCode(data.list[0].weather[0].icon) + '"/>');
            $("#fc_2_icon").html('<i class="' + getIconCode(data.list[1].weather[0].icon) + '"/>');
            $("#fc_3_icon").html('<i class="' + getIconCode(data.list[2].weather[0].icon) + '"/>');
            $("#fc_4_icon").html('<i class="' + getIconCode(data.list[3].weather[0].icon) + '"/>');
            $("#fc_5_icon").html('<i class="' + getIconCode(data.list[4].weather[0].icon) + '"/>');
            $("#fc_6_icon").html('<i class="' + getIconCode(data.list[5].weather[0].icon) + '"/>');
            $("#fc_1_min").html(Math.round(data.list[0].temp.min) + '°');
            $("#fc_2_min").html(Math.round(data.list[1].temp.min) + '°');
            $("#fc_3_min").html(Math.round(data.list[2].temp.min) + '°');
            $("#fc_4_min").html(Math.round(data.list[3].temp.min) + '°');
            $("#fc_5_min").html(Math.round(data.list[4].temp.min) + '°');
            $("#fc_6_min").html(Math.round(data.list[5].temp.min) + '°');
            $("#fc_1_max").html(Math.round(data.list[0].temp.max) + '°');
            $("#fc_2_max").html(Math.round(data.list[1].temp.max) + '°');
            $("#fc_3_max").html(Math.round(data.list[2].temp.max) + '°');
            $("#fc_4_max").html(Math.round(data.list[3].temp.max) + '°');
            $("#fc_5_max").html(Math.round(data.list[4].temp.max) + '°');
            $("#fc_6_max").html(Math.round(data.list[5].temp.max) + '°');
        }
    });
}

function reloadMessages() {

    setTimeout(function() {
        reloadMessages();
    }, 60000);
    
    $('#messages').html('');
    addSpecialDay();
    addGarbage();
    addInfo();
}

function getTemp(str) {
    str = Math.round(str.substr(0, str.indexOf(' ')))
    return str + '°';
}

function checkVersion() {
    
    setTimeout(function() {
        checkVersion();
    }, 3000);
    
    $('#version').html(gitHash);
    $.getJSON('githash.php', {}, function(json, textStatus) {
        if (json) {
            if (json.gitHash != gitHash) {
                window.location.reload();
                window.location.href = window.location.href;
            }
        }
    });
}
;

function reloadSolar() {

    setTimeout(function() {
        reloadSolar();
    }, 10000);

    $.getJSON('solar.json', function(solar) {
        //getTemp(solar['DeltaSol BX Plus [Regler]']['Temperature sensor 1']))

        $("#solar_col_temp").html(getTemp(solar['DeltaSol BX Plus [Regler]']['Temperatur Sensor 1']));
        $("#solar_vl_temp").html(getTemp(solar['DeltaSol BX Plus [Regler]']['Temperatur Sensor 5']));
        $("#solar_rl_temp").html(getTemp(solar['DeltaSol BX Plus [Regler]']['Temperatur Sensor 6']));
        $("#solar_wwo_temp").html(getTemp(solar['DeltaSol BX Plus [Regler]']['Temperatur Sensor 7']));
        $("#solar_wwu_temp").html(getTemp(solar['DeltaSol BX Plus [Regler]']['Temperatur Sensor 2']));
        $("#solar_hz_temp").html(getTemp(solar['DeltaSol BX Plus [Regler]']['Temperatur Sensor 4']));
        $("#solar_pumpe").html(solar['DeltaSol BX Plus [Regler]']['Drehzahl Relais 1']);

        var min = getTemp(solar['DeltaSol BX Plus [Regler]']['Temperatur Sensor 2']).replace('°', '');
        var max = getTemp(solar['DeltaSol BX Plus [Regler]']['Temperatur Sensor 7']).replace('°', '');
        var hz = getTemp(solar['DeltaSol BX Plus [Regler]']['Temperatur Sensor 4']).replace('°', '');
        var col = getTemp(solar['DeltaSol BX Plus [Regler]']['Temperatur Sensor 1']).replace('°', '');

        $('#hz_puffer').removeClass('on');
        $('#ww_puffer').removeClass('on');

        if (solar['DeltaSol BX Plus [Regler]']['Drehzahl Relais 1'] != '0 %') {
            if (solar['DeltaSol BX Plus [Regler]']['Drehzahl Relais 5'] == '0 %') {
                $('#hz_puffer').addClass('on');
            } else {
                $('#ww_puffer').addClass('on');
            }
        }

        applySolarBackground(min, max, hz, col);
    });
}

function applySolarBackground(min, max, hz, col) {
    var abs_min = 30;
    var abs_max = 75;
    if (min < abs_min)
        min = abs_min;
    if (max < abs_min)
        max = abs_min;
    if (hz < abs_min)
        hz = abs_min;
    if (col < abs_min)
        col = abs_min;
    if (min > abs_max)
        min = abs_max;
    if (max > abs_max)
        max = abs_max;
    if (hz > abs_max)
        hz = abs_max;
    if (col > abs_max)
        col = abs_max;

    var min_r = Math.round(63 + (178 / (abs_max - abs_min)) * (min - abs_min), 0);
    var max_r = Math.round(63 + (178 / (abs_max - abs_min)) * (max - abs_min), 0);
    var hz_r = Math.round(63 + (178 / (abs_max - abs_min)) * (hz - abs_min), 0);
    var col_r = Math.round(63 + (178 / (abs_max - abs_min)) * (col - abs_min), 0);

    var min_g = Math.round(120 - (114 / (abs_max - abs_min)) * (min - abs_min), 0);
    var max_g = Math.round(120 - (114 / (abs_max - abs_min)) * (max - abs_min), 0);
    var hz_g = Math.round(120 - (114 / (abs_max - abs_min)) * (hz - abs_min), 0);
    var col_g = Math.round(120 - (114 / (abs_max - abs_min)) * (col - abs_min), 0);

    var min_b = Math.round(211 - (211 / (abs_max - abs_min)) * (min - abs_min), 0);
    var max_b = Math.round(211 - (211 / (abs_max - abs_min)) * (max - abs_min), 0);
    var hz_b = Math.round(211 - (211 / (abs_max - abs_min)) * (hz - abs_min), 0);
    var col_b = Math.round(211 - (211 / (abs_max - abs_min)) * (col - abs_min), 0);

    $('#ww_puffer').css({
        'background-image': "-o-linear-gradient(bottom, rgb(" + max_r + "," + max_g + "," + max_b + ") 0%, rgb(" + min_r + "," + min_g + "," + min_b + ") 100%)",
        'background-image': "-moz-linear-gradient(bottom, rgb(" + max_r + "," + max_g + "," + max_b + ") 0%, rgb(" + min_r + "," + min_g + "," + min_b + ") 100%)",
                'background-image': "-webkit-linear-gradient(bottom rgb(" + max_r + "," + max_g + "," + max_b + ") 0%, rgb(" + min_r + "," + min_g + "," + min_b + ") 100%)",
                'background-image': "-ms-linear-gradient(bottom, rgb(" + max_r + "," + max_g + "," + max_b + ") 0%, rgb(" + min_r + "," + min_g + "," + min_b + ") 100%)",
                'background-image': "linear-gradient(to bottom, rgb(" + max_r + "," + max_g + "," + max_b + ") 0%, rgb(" + min_r + "," + min_g + "," + min_b + ") 100%)",
                'background': "-webkit-gradient(linear, left top, left bottom, color-stop(0%,rgb(" + max_r + "," + max_g + "," + max_b + ")), color-stop(100%,rgb(" + min_r + "," + min_g + "," + min_b + ")))"
    });
    $('#hz_puffer').css({
        'background-color': "rgb(" + hz_r + "," + hz_g + "," + hz_b + ")"
    });
    $('#col').css({
        'background-color': "rgb(" + col_r + "," + col_g + "," + col_b + ")"
    });
}

function reloadClock() {
    
    setTimeout(function() {
        reloadClock();
    }, 2000);

    date = moment(new Date());

    $("#time").html(date.format('HH:mm'));
    $("#date").html(date.format('dddd, DD. MMMM'));

}

function addSpecialDay() {
    var text = '';
    var date = new Date();
    switch ('' + date.getDate() + date.getMonth()) {

        case '160':
            text = 'Herzlichen Glückwunsch Jan & Lia';
            break;
        case '35':
            text = 'Herzlichen Glückwunsch Tim';
            break;
        case '152':
            text = 'Herzlichen Glückwunsch Anna';
            break;
        case '2411':
        case '2511':
        case '2611':
            text = 'Frohe Weihnachten';
            break;
        case '10':
            text = 'Frohes neues Jahr!!!';
            break;
        case '3111':
            text = 'Guten Rutsch';
            break;
        case '' + OsterSonntag(date.getFullYear(), null).getDate() + OsterSonntag(date.getFullYear(), null).getMonth():
            text = 'Frohe Ostern';
            break;
        case '141':
            text = 'Happy Valentine\'s Day';
            break;
    }
    if (text != '')
        $('#messages').html($('#messages').html() + '<span class="message"><div>' + text + '</div></span>');
}


function OsterSonntag(Jahr, TagesDifferenz)
{ // Erstellt von Ralf Pfeifer (www.arstechnica.de)

    // Falls kein Datum angegeben, aktuelles Jahr verwenden.
    if ((Jahr == "") || (Jahr == null)) {
        Jahr = new Date().getYear()
    }

    // Falls ausserhalb des gültigen Datumsbereichs, kein Ergebnis zurueckgeben
    if ((Jahr < 1970) || (2099 < Jahr)) {
        return "Datum muss zwischen 1970 und 2099 liegen";
    }

    // Falls keine TagesDifferenz angegeben, TadgesDifferenz auf 0 setzen.
    if ((TagesDifferenz == "") || (TagesDifferenz == null)) {
        TagesDifferenz = 0;
    }

    var a = Jahr % 19;
    var d = (19 * a + 24) % 30;
    var Tag = d + (2 * (Jahr % 4) + 4 * (Jahr % 7) + 6 * d + 5) % 7;
    if ((Tag == 35) || ((Tag == 34) && (d == 28) && (a > 10))) {
        Tag -= 7;
    }

    var OsterDatum = new Date(Jahr, 2, 22)
    // 86400000 = 24 h * 60 min * 60 s * 1000 ms
    // Die Zahl 86400000 nicht ausklammern, sonst gibt's Probleme bei der Typumwandlung !!
    OsterDatum.setTime(OsterDatum.getTime() + 86400000 * TagesDifferenz + 86400000 * Tag)

    return OsterDatum;
}

function reloadFamilyCalendar() {
    
    setTimeout(function() {
        reloadFamilyCalendar();
    }, 300000);
    
    new ical_parser(fam_cal, function(cal) {

        events = cal.getFutureEvents();
        //do somthing with the events.
        var text = '<div id=family_calendar_fade></div>';
        var i = 0;
        events.forEach(function(event) {
            if (i < 8) {
                var diff = moment(event.DTSTART).startOf('day').diff(moment(new Date()).startOf('day'), 'days', true);
                var when = diff == 0 ? ('Heute') : (diff == 1 ? ('Morgen') : ('In ' + diff + ' Tagen'))
                text += '<div class="cal_entry"><span class="cal_summary">' + event.SUMMARY + '</span><span class="cal_diff">' + when + '</span></div>';
            }
            i++;
        })
        $("#family_calendar").html(text);
    });

}


function addGarbage() {

    var today = moment(new Date());
    var tomorrow = moment(new Date()).add(1, 'days');
    var twodays = moment(new Date()).add(2, 'days');

    $.getJSON('garbage.json', function(tonnen) {
        tonnen.forEach(function(tonne) {
            tonne.leerungen.forEach(function(leerung_date) {
                leerung = moment(leerung_date);
                var text = '';
                if (today.isSame(leerung, 'day'))
                    text += '<span class="message ' + tonne.messageClass + '"><div>' + tonne.name + ' wird heute geleert</div></span>';
                if (tomorrow.isSame(leerung, 'day'))
                    text += '<span class="message ' + tonne.messageClass + '"><div>' + tonne.name + ' wird morgen geleert</div></span>';
                if (twodays.isSame(leerung, 'day'))
                    text += '<span class="message ' + tonne.messageClass + '"><div>' + tonne.name + ' wird übermorgen geleert</div></span>';
                $('#messages').html($('#messages').html() + text);
            })
        });
    });
}

function addInfo() {
    $.getJSON(infos_url, function(infos) {
        infos.forEach(function(info) {
            var text = '';
            text += '<span class="message" style="color:' + info.color + '; background-color: ' + info.bg_color + '"><div>' + info.info + '</div></span>';
            $('#messages').html($('#messages').html() + text);
        });
    });
}

function getIconCode(code) {
    switch (code) {
        case '01d':
            return 'wi-day-sunny';
        case '01n':
            return 'wi-night-clear';
        case '02d':
            return 'wi-day-sunny-overcast';
        case '02n':
            return 'wi-night-cloudy';
        case '03d':
            return 'wi-day-cloudy';
        case '03n':
            return 'wi-night-cloudy';
        case '04d':
            return 'wi-cloudy';
        case '04n':
            return 'wi-cloudy';
        case '09d':
            return 'wi-day-showers';
        case '09n':
            return 'wi-night-showers';
        case '10d':
            return 'wi-day-rain';
        case '10n':
            return 'wi-night-rain';
        case '11d':
            return 'wi-day-thunderstorm';
        case '11n':
            return 'wi-night-thunderstorm';
        case '13d':
            return 'wi-day-snow';
        case '13n':
            return 'wi-night-snow';
        case '50d':
            return 'wi-day-fog';
        case '50n':
            return 'wi-night-fog';
        default:
            return 'gg';
    }
}
