<?php

foreach ($comments as $elem) {

    $img = "";

    if ($elem['image']) {
        $img .= '<span class="imgWrap"><img class="" src="/webroot/img/';
        $img .= $elem['image'];
        $img .= '"></span>';
    }

    $authorPage = "";

    if ($elem['homepage']) {
        $authorPage .= '<a href="http://';
        $authorPage .= htmlentities($elem['homepage']);
        $authorPage .= '"><i class="material-icons homePage">link</i></a>';
    }

    $list = '<li><span class="userInfo"><p>';
    $list .= htmlentities($elem['author']);
    $list .= '</p>';
    $list .= $authorPage;
    $list .= '<p>';
    $list .= $elem['created_at'];
    $list .= '</p></span><span class="feedbackText">';
    $list .= htmlentities($elem['text']);
    $list .= '</span>';
    $list .= $img;
    $list .= '</li>';

    echo $list;
}
