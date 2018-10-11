<?php
/**
 * Created by PhpStorm.
 * User: Chong
 * Date: 2018/10/10
 * Time: 22:16
 */
    require 'config.php';
    $_pass = sha1($_POST['login_pass']);
    $query = mysqli_query($conn,"SELECT user,pass FROM user WHERE user='{$_POST['login_user']}' AND pass='{$_pass}'");
    if (mysqli_fetch_array($query, MYSQLI_ASSOC)) {
        echo 'true';
    } else {
        echo 'false';
    }
    mysqli_close($conn);
?>