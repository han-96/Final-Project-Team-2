<?php
    $ketnoi['host'] = 'DESKTOP-H1T5EUQ\PV'; //Tên server, nếu dùng hosting free thì cần thay đổi
    $ketnoi['dbname'] = 'demo'; //Đây là tên của Database
    $ketnoi['username'] = 'root'; //Tên sử dụng Database
    $ketnoi['password'] = '25102510BbhH@';//Mật khẩu của tên sử dụng Database
    @mysql_connect(
        "{$ketnoi['host']}",
        "{$ketnoi['username']}",
        "{$ketnoi['password']}")
    or
        die("Không thể kết nối database");
    @mysql_select_db(
        "{$ketnoi['dbname']}") 
    or
        die("Không thể chọn database");
?>