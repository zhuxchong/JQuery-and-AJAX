<?php
/**
 * Created by PhpStorm.
 * User: Chong
 * Date: 2018/10/10
 * Time: 19:54
 */
    require 'config.php';
    $query = "SELECT user FROM user WHERE user='{$_POST['user']}'";
    $result=mysqli_query($conn,$query);
    if (mysqli_fetch_array($result,MYSQLI_ASSOC)) {
        echo 'false';
    } else {
        echo 'true';
    }
    mysqli_close($conn);
?>