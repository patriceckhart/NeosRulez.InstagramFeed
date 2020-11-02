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
        if($profile) {
            $json = file_get_contents('https://www.instagram.com/' . $profile . '/?__a=1');
            $result_array = json_decode($json, true);
            $result = $result_array['graphql']['user']['edge_owner_to_timeline_media']['edges'];
        }
        if($posts) {
            $result = array_splice($result, intval($posts) + 1);
        }
        return $result;
    }

}