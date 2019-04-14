<?php
class Tracker {
    public function __construct()
    {
        if (isset($_GET['request'])){
            switch ($_GET['request']) {
                case 'getLocation':
                    $this->getLocation();
                    break;
            }
        }
    }
    private function getLocation() {
        // Get data from Wia API and Send it back to Location.html
        $ch = curl_init();
        $timeout = 5;
        curl_setopt($ch, CURLOPT_URL, 'http://widgets.wia.io/embed/wgt_ca2Yvooa/dev_faldy1tg');
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
        $data = curl_exec($ch);
        curl_close($ch);
        $arr = array('See our Terms and Conditions!function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on"];analytics.factory=function(t){return function(){var e=Array.prototype.slice.call(arguments);e.unshift(t);analytics.push(e);return analytics}};for(var t=0;t',
            'DeviceTrackerUpdated','Widget'
        );
        $data = strip_tags($data);
        $data = str_replace($arr, '', $data);

        $arr2 = array('~var wia = \'.*\';~','~var wiaDevice = \'.*\';~','~var wiaWidget = \'.*\';~','~var wiaEvents = \'.*\';~','~var wiaEvent = \'.*\';~','~.* .* ago~');
        $data = preg_replace($arr2, '', $data);
        $data = str_replace(array('var wiaLocation = ',';','\''),'',$data);
        echo trim($data);
    }


}
$tracker = new Tracker();