<?php
/**
 * Created by PhpStorm.
 * User: Chong
 * Date: 2018/10/10
 * Time: 15:22
 */

    require 'config.php';
    $addSql =  "INSERT INTO user (user, pass, email, sex, birthday,date)
      VALUES ('{$_POST['user']}', sha1('{$_POST['pass']}'), '{$_POST['email']}','{$_POST['sex']}', '{$_POST['birthday']}', NOW())";
    mysqli_query($conn,$addSql);
    mysqli_close();
?>