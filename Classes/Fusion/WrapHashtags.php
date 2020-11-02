<?php
namespace NeosRulez\InstagramFeed\Fusion;

use Neos\Flow\Annotations as Flow;
use Neos\Fusion\FusionObjects\AbstractFusionObject;

class WrapHashtags extends AbstractFusionObject
{

    /**
     * @return string
     */
    public function evaluate()
    {
        $text = $this->fusionValue('text');
        $mode = $this->fusionValue('mode');
        $result = false;
        if($text && $mode)
        {
            if($mode == 'remove')
            {
                $re = '/#\w+\s*/';
                $result = preg_replace($re, '', $text);
            }
            if($mode == 'get')
            {
                $hashtags = explode(';', $this->getHashtags($text));
                foreach ($hashtags as $hashtag)
                {
                    $result .= '<span class="hashtag">' . $hashtag . '</span>';
                }
            }
        }
        return $result;
    }

    function getHashtags($string)
    {
        $hashtags = FALSE;
        preg_match_all('/(#\w+)/u', $string, $matches);
        if ($matches)
        {
            $hashtags = implode(';', $matches[0]);
        }
        return $hashtags;
    }

}