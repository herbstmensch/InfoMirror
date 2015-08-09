<?php

if (!filter_input(INPUT_GET, 'id')) {
    die('No id Parameter given');
}

try {
    $iniFile = 'urls.ini';
    if (($urls = parse_ini_file($iniFile, true, INI_SCANNER_RAW)) == false) {
	throw new Exception('Missing INI file: ' . $iniFile . ' use urls_example.ini as template.');
    }
} catch (Exception $e) {
    die($e->getMessage());
}

$id = filter_input(INPUT_GET, 'id');

$url = $urls['URLS'][$id];

echo file_get_contents($url);

//$ch = curl_init();
//curl_setopt($ch, CURLOPT_URL, $url);
//curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
//curl_setopt($ch, CURLOPT_HEADER, 0);
//curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
//curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);
//$output = curl_exec($ch); //crash here
//curl_close($ch);

//echo $output;
?>
