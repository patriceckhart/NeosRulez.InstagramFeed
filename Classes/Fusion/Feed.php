<?php
namespace NeosRulez\InstagramFeed\Fusion;

use Neos\Flow\Annotations as Flow;
use Neos\Fusion\FusionObjects\AbstractFusionObject;

class Feed extends AbstractFusionObject
{

    /**
     * @return string
     */
    public function evaluate()
    {
        $profile = $this->fusionValue('profile');
        $posts = $this->fusionValue('posts');
        $result = false;
        if($profile)
        {
            $json = $this->url_get_contents('https://www.instagram.com/' . $profile . '/?__a=1');
            $result_array = json_decode($json, true);
            $result = $result_array['graphql']['user']['edge_owner_to_timeline_media']['edges'];
        }
        if($posts)
        {
            $result = array_splice($result, intval($posts) + 1);
        }
        return $result;
    }

    function url_get_contents($url)
    {
        if ( ! function_exists( 'curl_init' ) )
        {
            die( 'The cURL library is not installed.' );
        }
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        $output = curl_exec($ch);
        if(curl_errno($ch))
        {
            die ('Curl error: ' . curl_error($ch));
        }
        curl_close($ch);
        return $output;
    }

}