// ==UserScript==
// @name        BiliPlus-UI
// @namespace   https://www.biliplus.com/
// @version     2.0
// @description 修改BiliPlus界面
// @author      SettingDust
//
// @include     http*://www.biliplus.com/*
//
// @require     https://code.jquery.com/jquery-latest.js
// @require     https://cdn.bootcss.com/Ripple.js/1.2.1/ripple.min.js
// @require     https://cdn.bootcss.com/nprogress/0.2.0/nprogress.min.js
// @require     https://cdn.bootcss.com/jquery-cookie/1.4.1/jquery.cookie.min.js
// @require     https://cdn.bootcss.com/waterfall.js/1.1.0/waterfall.min.js
//
// @grant       GM.setValue
// @grant       GM_setValue
// @grant       GM.getValue
// @grant       GM_getValue
// ==/UserScript==
(function () {
    'use strict';
    let body = $('body');
    let head = $('head');

    let snackbars = $('<div\>');

    //搜索
    let source = {
        bilibili: 'bilibili',
        biliplus: 'biliplus'
    };
    let sort = {
        default: 'default',
        pubdate: 'pubdate',
        view: 'view',
        danmaku: 'danmaku'
    };
    let sort_cn = {
        default: '默认',
        pubdate: '上传日期',
        view: '播放量',
        danmaku: '弹幕数'
    };

    let search_data = {
        source: source.bilibili,
        word: '',
        sort: sort.default,
        number: '20'
    };

    //星期
    let day = ['日', '月', '火', '水', '木', '金', '土'];

    if ($('.userbar').length > 0) {
        let avatar = loginInfo.face;
        let name = loginInfo.uname;
        let mid = loginInfo.mid;
        let css = head.children('link[href="/style/biliplus.min.css?180127"]');
        css.remove();

        head.append('<link rel="stylesheet" type="text/css" href="https://cdn.bootcss.com/Ripple.js/1.2.1/ripple.min.css">');
        head.append('<link rel="stylesheet" type="text/css" href="https://cdn.bootcss.com/nprogress/0.2.0/nprogress.min.css">');
        head.append('<link href="https://cdn.bootcss.com/material-design-icons/3.0.1/iconfont/material-icons.min.css" rel="stylesheet">');

        head.append('<meta name="viewport" content="user-scalable=0, initial-scale=1, minimum-scale=1, width=device-width, height=device-height">');

        body.children('*').hide();

        //基础
        {
            addCss(`
            body {
              font-size: 1rem;
              text-align: left;
              line-height: 1.5;
              font-weight: 500;
              margin: 0;
              color: #fff;
              font-family: Verdana, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
              background-color: #fafafa;
            }
            *,
            *::before,
            *::after {
              box-sizing: border-box;
            }
            html {
              font-family: sans-serif;
              line-height: 1.15;
              -webkit-text-size-adjust: 100%;
              -ms-text-size-adjust: 100%;
              -ms-overflow-style: scrollbar;
              -webkit-tap-highlight-color: transparent;
            }
            sub,
            sup {
              position: relative;
              font-size: 75%;
              line-height: 0;
            }
            h1,h2,h3,h4,h5 {
              margin: 0;
              line-height: 1;
            }
            a {
              cursor: pointer;
              -webkit-appearance: none;
              outline: none;
              color: inherit;
              position: relative;
              align-items: center;
              vertical-align: middle;
              text-decoration: none;
              justify-content: center;
              user-select: none;
            }
            a:hover {
              color: inherit;
              text-shadow: 0 1.5px rgba(0,0,0,0.08);
            }
            svg {
              fill: currentColor;
              width: 24px;
              height: 24px;
              display: inline-block;
              transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
              user-select: none;
              flex-shrink: 0;
            }
            .description {
              color: rgba(0,0,0,0.54) !important;
              font-size: 85% !important;
            }
            #nprogress .bar {
                background: #d04d74;
                z-index: 1200;
            }
            #nprogress .peg {
                box-shadow: 0 0 10px #d04d74,0 0 5px #d04d74;
            }
            input {
              border: 0;
              margin: 0;
              display: block;
              background: none;
              white-space: normal;
              vertical-align: top;
              transition: 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
              font-size: 1em;
              outline: none;
              padding: 8px 12px;
              color: rgba(0,0,0,0.87);
            }
            .padding {
              padding: 6px 6px;
            }
            .padding.mid {
              padding: 12px 12px;
            }
            .padding.large {
              padding: 24px 24px;
            }
            .material-icons {
              user-select: none;
            }
            .focus {
              color: #0091F8 !important;
            }
            .ellipsis {
              text-overflow: ellipsis;
              white-space: nowrap;
              overflow: hidden;
              display: block;
            }
            button {
              color: inherit;
              cursor: pointer;
              margin: 0;
              border: 0;
              display: inline-flex;
              padding: 0;
              outline: none;
              position: relative;
              user-select: none;
              align-items: center;
              border-radius: 0;
              vertical-align: middle;
              justify-content: center;
              -moz-appearance: none;
              text-decoration: none;
              background-color: transparent;
              -webkit-appearance: none;
              -webkit-tap-highlight-color: transparent;
            }
            textarea {
              font: inherit;
              cursor: inherit;
              border: none;
              padding: 0;
              outline: none;
              box-sizing: border-box;
              background: transparent;
              line-height: inherit;
              resize: none;
              height: auto;
              white-space: pre-wrap;
            }
            hr {
              border-color: rgba(0,0,0,0.12);
              border-width: 0.5px;
            }
            p {
              margin-top: 4px;
              margin-bottom: 4px;
            }`, 'Base');
        }
        //Logo
        {
            addCss(`
                .logo {
                  font-weight: 700;
                  text-align: center;
                  user-select: none;
                }
                `, 'Logo');

            var logo = $('<a\>');
            let logo_main = $('<span\>');
            let logo_sup = $('<sup\>');

            logo.addClass('logo');
            logo.attr('href', '/');

            logo_main.text('Bili');
            logo_sup.text('+');

            logo.append(logo_main);
            logo.append(logo_sup);
        }
        //视频暂时处理
        {
            addCss(`
            #player_container {
              z-index: 1300;
              top: 0;
              position: fixed;
              width: 100%;
              height: 100%;
            }
            .black_back {
              z-index: -1;
              position: fixed;
              width: 100%;
              height: 100%;
              background-color: rgba(0,0,0,0.54);
            }`);
            $('.part_container').click(function () {
                setTimeout(function () {
                    $('#player_container').addClass('center');
                    //TODO 加入重新载入
                    $('.playerOption').hide();
                    $('#h5Srcs').hide();
                });
                $('.black_back').click(function () {
                    miniPlayer(true);
                });
            });
        }
        //页面
        {
            addCss(`
            .main {
              width: 100%;
              display: flex;
              min-height: 100vh;
              overflow-y: hidden;
              align-items: stretch;
              min-width: 380px;
            }
            `, 'Main');

            let old_user_sidebar = $('.usersidebar');
            let space = '/space/' + mid;

            if (!loginInfo.isLogin) {
                name = '点击头像登陆';
                space = '/login'
            }

            let main = $('<div\>');
            main.addClass('main');
            body.prepend(main);

            addCss(`
            .icon {
              display: flex;
              min-height: 48px;
              min-width: 48px;
              border-radius: 50%;
            }
            .icon.small {
              min-height: 24px;
              min-width: 24px;
            }
            .icon.mid {
              min-height: 36px;
              min-width: 36px;
            }`, 'Icon');

            var icon = $('<div\>');
            let icon_content = $('<span\>');
            icon.addClass('center');
            icon.addClass('icon');
            icon_content.addClass('material-icons');
            icon.append(icon_content);

            //导航栏
            {
                addCss(`
                .nav {
                  position: fixed;
                  background-color: #0091F8;
                  width: 100%;
                  height: 64px;
                  overflow: hidden;
                  z-index: 1200;
                  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
                  transition: 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
                  flex-shrink: 0;
                  flex-direction: column;
                }
                .nav-content {
                  padding-left: 16px;
                  padding-right: 16px;
                  display: flex;
                  position: relative;
                  align-items: center;
                  height: 64px;
                  line-height: 64px;
                  text-shadow: 0 2px 4px rgba(0,0,0,0.08);
                }
                @media (min-width: 600px){
                  .nav-content {
                    padding-left: 24px;
                    padding-right: 24px;
                  }
                }
                .pull-left {
                  float: left !important;
                }
                .pull-right {
                  float: right !important;
                }
                .nav-content .logo {
                  display: none;
                  font-size: 3.4rem;
                  cursor: pointer;
                  width: 202px;
                }
                @media (min-width: 1280px){
                  .nav-content .logo {
                    display: block;
                  }
                }`, 'Nav');

                let nav = $('<nav\>');
                nav.addClass('nav');
                nav.attr('data-duration', '10');
                nav.attr('data-color', '#fff');
                nav.attr('data-opacity', '0.12');
                main.append(nav);

                let nav_content = $('<div\>');
                nav_content.addClass('nav-content');
                nav.append(nav_content);

                let nav_logo = logo.clone();
                nav_content.append(nav_logo);

                //导航栏内容物
                {
                    addCss(`
                    .nav-item {
                      display: inline;
                      flex-direction: inherit;
                      margin: 0 8px;
                    }
                    .nav-item a {
                      flex: 0 0 auto;
                      width: 36px;
                      height: 36px;
                      font-size: 1.5rem;
                      border-radius: 50%;
                      border: 0;
                      padding: 0;
                      display: inline-flex;
                      background-color: transparent;
                      overflow: hidden;
                      transition: 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
                    }
                    .nav-item a * {
                      border-radius: 50%;
                    }
                    `, 'NavItem');
                    //菜单按钮
                    {
                        addCss(`
                        .nav-menu {
                          display: block;
                        }
                        @media (min-width: 1280px){
                          .nav-menu {
                            display: none;
                          }
                        }
                        `, 'NavMenu');
                        let nav_menu = $('<div\>');
                        let nav_menu_button = $('<a\>');
                        let nav_menu_icon = $('<span\>');

                        nav_menu.addClass('nav-item');
                        nav_menu.addClass('nav-menu');
                        nav_menu_icon.append('<svg focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path></svg>');
                        nav_menu_button.append(nav_menu_icon);
                        nav_menu.append(nav_menu_button);
                        nav_content.append(nav_menu);

                        nav_menu.click(function () {
                            $('.sidebar-menu').addClass('active');
                            $('.sidebar-menu-container .sidebar-mask').addClass('active');
                        });
                    }
                    //页面标题
                    {
                        addCss(`
                        .nav_title {
                          flex: 0 1 auto;
                          margin: 0;
                          margin-left: 24px;
                          font-size: 1.3rem;
                        }`, 'NavTitle');
                        var nav_title = $('<div\>');
                        nav_title.addClass('nav_title');
                        nav_title.addClass('ellipsis');
                        nav_content.append(nav_title);
                    }
                    //间隔空白
                    {
                        addCss(`
                        .flex-whitespace {
                          flex: 1 1 auto;
                        }`, 'Whitespace');

                        var whitespace = $('<div\>');
                        whitespace.addClass('flex-whitespace');
                        nav_content.append(whitespace);
                    }
                    //搜索
                    {
                        addCss(`
                        .nav-search-input {
                           width: 0;
                           position: relative;
                           border-bottom: solid #fff 1.5px;
                           color: #fff;
                           padding: 4px 0;
                           box-shadow: 0 2px rgba(0,0,0,0.08);
                        }
                        .nav-search-input:focus {
                          width: 250px;
                          padding: 4px;
                        }
                        @media (max-width: 500px){
                          .nav-search-input:focus {
                            width: 148px;
                          }
                        }
                        `, 'NavSearch');

                        let nav_search = $('<div\>');
                        let nav_search_button = $('<a\>');
                        let nav_search_icon = $('<span\>');
                        let nav_search_svg = $('<i\>');

                        nav_search.addClass('nav-item');

                        nav_search_svg.addClass('material-icons');
                        nav_search_svg.text('search');
                        nav_search_icon.append(nav_search_svg);
                        nav_search_button.append(nav_search_icon);
                        nav_search.append(nav_search_button);
                        nav_content.append(nav_search);

                        let nav_search_input = $('<input\>');
                        nav_search_input.addClass('nav-search-input');
                        nav_content.append(nav_search_input);

                        nav_search.click(function () {
                            nav_search_input.focus();
                        });
                        nav_search_input.blur(function () {
                            nav_search_input.val('');
                        });
                        nav_search_input.keypress(function (e) {
                            let ev = document.all ? window.event : e;
                            if (ev.keyCode === 13) {
                                search(nav_search_input.val());
                            }
                        });
                    }
                    //头像
                    {
                        addCss(`
                            .nav-avatar-img {
                              height: 100%;
                              width: 100%;
                            }
                            .nav-avatar {
                              line-height: 0;
                            }
                            .nav-avatar-button {
                              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
                            }
                            .nav-avatar-button.active {
                              box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);
                              transform: translateX(8px) translateY(84px);
                              width: 202px;
                              height: 202px;
                            }`, 'NavAvatar');
                        let nav_avatar = $('<div\>');
                        let nav_avatar_button = $('<a\>');
                        let nav_avatar_img = $('<img\>');

                        nav_avatar.addClass('nav-item');
                        nav_avatar.addClass('nav-avatar');
                        nav_avatar_button.addClass('nav-avatar-button');
                        nav_avatar_img.addClass('nav-avatar-img');

                        nav_avatar_img.attr('src', avatar);
                        nav_avatar_button.append(nav_avatar_img);
                        nav_avatar.append(nav_avatar_button);
                        nav_content.append(nav_avatar);

                        nav_avatar.click(function () {
                            $('.nav').css('overflow', 'visible');
                            $('.nav-avatar').css('overflow', 'visible');
                            nav_avatar_button.addClass('active');
                            $('.sidebar-user').addClass('active');
                            $('.sidebar-user').next().addClass('active');
                            setTimeout(function () {
                                body.on('click', '.nav-avatar-button.active', function () {
                                    location.href = space;
                                });
                            }, 300)
                        });
                    }
                }
            }
            //侧边栏
            {
                addCss(`
                .sidebar-container {
                  display: flex;
                  top: 0;
                  width: 100%;
                  height: 100%;
                  width: 0;
                  z-index: 1100;
                  pointer-events: none;
                  transition: 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
                }
                .sidebar {
                  width: 250px !important;
                  background-color: #fff !important;
                  height: 100vh !important;
                  transition: 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
                  color: rgba(0, 0, 0, 0.87);
                  pointer-events: all;
                  box-shadow: none;
                  overflow: visible;
                  position: fixed;
                }
                .sidebar-mask {
                  opacity: 0;
                  top: 0;
                  left: 0;
                  width: 100%;
                  height: 100%;
                  z-index: -1;
                  position: fixed;
                  will-change: opacity;
                  background-color: rgba(0, 0, 0, 0.5);
                  -webkit-tap-highlight-color: transparent;
                  pointer-events: none;
                  transition: 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
                }
                .sidebar-mask.active {
                  pointer-events: all;
                  opacity: 1;
                }
                .sidebar ul {
                  padding: 8px 0;
                  flex: 1 1 auto;
                  position: relative;
                  list-style: none;
                  margin: 0;
                }
                .sidebar ul li {
                  font-size: 1rem;
                  width: 100%;
                  display: block;
                  padding-top: 0;
                  padding-bottom: 0;
                  position: relative;
                  align-items: center;
                  justify-content: flex-start;
                  text-decoration: none;
                  line-height: 1.71429em;
                }
                .sidebar ul li a {
                  text-align: center;
                  display: inline-block;
                  padding-left: 24px;
                  padding-right: 24px;
                  border-radius: 0;
                  justify-content: flex-start;
                  width: 100%;
                  line-height: 1.4em;
                  min-width: 88px;
                  min-height: 36px;
                  transition: 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
                  color: rgba(0, 0, 0, 0.87) !important;
                  padding: 8px 16px;
                }
                .sidebar ul li a:hover {
                  background-color: rgba(0, 0, 0, 0.12) !important;
                }
                `, 'SideBar');
                //用户侧边
                {
                    addCss(`
                        .sidebar-user {
                          right: 0;
                          left: auto !important;
                          transform: translateX(100%);
                        }
                        .sidebar-user ul {
                          margin-top: 202px;
                        }
                        .sidebar-user.active {
                          float: right;
                          transform: translateX(0);
                          box-shadow: 0px 8px 10px -5px rgba(0, 0, 0, 0.2), 0px 16px 24px 2px rgba(0, 0, 0, 0.14), 0px 6px 30px 5px rgba(0, 0, 0, 0.12);
                        }
                        .sidebar-user-name {
                          position: relative;
                          text-align: center;
                          padding-bottom: 16px;
                          border-bottom: 1px solid rgba(0, 0, 0, 0.12);
                          margin-bottom: 0;
                          font-size: 700;
                          margin-top: 16px;
                        }
                        `, 'UserSideBar');
                    let sidebar_user = $('<div\>');
                    let sidebar_user_mask = $('<div\>');
                    let sidebar_user_bar = $('<div\>');
                    let sidebar_user_content = $('<ul\>');
                    let sidebar_user_content_li = $('<li\>');
                    let sidebar_user_content_li_a = $('<a\>');

                    let sidebar_user_name = $('<h2\>');

                    sidebar_user.addClass('sidebar-container');
                    sidebar_user_mask.addClass('sidebar-mask');
                    sidebar_user_bar.addClass('sidebar');
                    sidebar_user_bar.addClass('sidebar-user');
                    sidebar_user_name.addClass('sidebar-user-name');

                    //用户名
                    {
                        sidebar_user_name.text(name);
                        sidebar_user_content.append(sidebar_user_name);
                    }
                    //列表元素
                    {
                        let dynamic = old_user_sidebar.find('a:eq(1)').attr('href').replace('dynamic', 'dynamic_new');
                        let bangumi = old_user_sidebar.find('a:eq(2)').attr('href');
                        let favourite = old_user_sidebar.find('a:eq(3)').attr('href');
                        let history = old_user_sidebar.find('a:eq(4)').attr('href');
                        let attention = old_user_sidebar.find('a:eq(5)').attr('href');

                        sidebar_user_content_li.append(sidebar_user_content_li_a);
                        sidebar_user_content_li.attr('data-multi', 'false');

                        sidebar_user_content.append(sidebar_user_content_li.clone().children('a').attr('href', dynamic).text('动态').parent('li'));
                        sidebar_user_content.append(sidebar_user_content_li.clone().children('a').attr('href', bangumi).text('追番').parent('li'));
                        sidebar_user_content.append(sidebar_user_content_li.clone().children('a').attr('href', favourite).text('收藏夹').parent('li'));
                        sidebar_user_content.append(sidebar_user_content_li.clone().children('a').attr('href', history).text('历史记录').parent('li'));
                        sidebar_user_content.append(sidebar_user_content_li.clone().children('a').attr('href', attention).text('我的关注').parent(`li`));
                        sidebar_user_content.append(sidebar_user_content_li.clone().children('a').attr('href', '/login?act=logout').text('退出账户').parent(`li`));
                    }

                    sidebar_user_bar.append(sidebar_user_content);
                    sidebar_user.append(sidebar_user_bar);
                    sidebar_user.append(sidebar_user_mask);
                    main.append(sidebar_user);

                    sidebar_user_mask.click(function () {
                        avatarToSmall();
                    });
                    $('.nav-menu').click(function () {
                        avatarToSmall();
                    });
                }
                //菜单侧边
                {
                    addCss(`
                    .sidebar-menu {
                      left: 0;
                      transform: translateX(-100%);
                    }
                    .sidebar-menu.active {
                      float: left;
                      transform: translateX(0);
                      box-shadow: 0px 8px 10px -5px rgba(0, 0, 0, 0.2), 0px 16px 24px 2px rgba(0, 0, 0, 0.14), 0px 6px 30px 5px rgba(0, 0, 0, 0.12);
                    }
                    .sidebar-menu .logo {
                      display: none;
                      font-size: 3.4rem;
                      cursor: pointer;
                      width: 250px;
                      padding: 0 24px;
                      color: #0091F8;
                      flex: 0 1 auto;
                      margin: 0;
                      line-height: 64px;
                      border-bottom: 1px solid rgba(0,0,0,0.08);
                    }
                    body>.sidebar-menu-container {
                      position: fixed;
                    }
                    .sidebar-menu-container {
                      z-index: 1000;
                      width: 250px;
                    }
                    @media (min-width: 1280px) {
                      .sidebar-menu {
                        transform: translateX(0);
                        border-right: 1px solid rgba(0,0,0,0.08);
                      }
                      .sidebar-menu-container .sidebar-mask {
                        opacity: 0;
                      }
                      .sidebar-menu-container .sidebar-menu {
                        box-shadow: none;
                      }
                      .sidebar-menu ul {
                        margin-top: 80px;
                      }
                    }
                    @media (max-width: 1280px) {
                      .sidebar-menu-container {
                        z-index: 1300;
                      }
                      .sidebar-menu .logo {
                        display: block;
                      }
                    }
                    `, 'MenuSideBar');

                    let sidebar_menu = $('<div\>');
                    let sidebar_menu_bar = $('<div\>');
                    let sidebar_menu_mask = $('<div\>');
                    let sidebar_menu_content = $('<ul\>');
                    let sidebar_menu_content_li = $('<li\>');
                    let sidebar_menu_content_li_a = $('<a\>');

                    let sidebar_menu_content_logo = logo.clone();

                    sidebar_menu.addClass('sidebar-container');
                    sidebar_menu.addClass('sidebar-menu-container');
                    sidebar_menu_mask.addClass('sidebar-mask');
                    sidebar_menu_bar.addClass('sidebar');
                    sidebar_menu_bar.addClass('sidebar-menu');

                    sidebar_menu_bar.append(sidebar_menu_content_logo);
                    //列表元素
                    {
                        sidebar_menu_content_li.append(sidebar_menu_content_li_a);

                        let old_sidebar = $('#sidebar');
                        let bangumilist = old_sidebar.find('a:eq(1)').attr('href');
                        let about = old_sidebar.find('a:eq(2)').attr('href');
                        let lyb = old_sidebar.find('a:eq(3)').attr('href');
                        let tuocao = old_sidebar.find('a:eq(4)').attr('href');

                        sidebar_menu_content.append(sidebar_menu_content_li.clone().find('a').attr('href', bangumilist).text('番剧更新').parent('li'));
                        sidebar_menu_content.append(sidebar_menu_content_li.clone().find('a').attr('href', lyb).text('留言板').parent('li'));
                        sidebar_menu_content.append(sidebar_menu_content_li.clone().find('a').attr('href', tuocao).attr('target', '_blank').text('吐槽助手').parent('li'));
                        sidebar_menu_content.append(sidebar_menu_content_li.clone().find('a').attr('href', about).text('关于').parent('li'));
                    }
                    sidebar_menu_bar.append(sidebar_menu_content);
                    sidebar_menu.append(sidebar_menu_bar);
                    sidebar_menu.append(sidebar_menu_mask);

                    if ($(window).width() >= 1280) {
                        main.children('.sidebar-container').after(sidebar_menu);
                    } else {
                        sidebar_menu.appendTo(body);
                    }
                    $(window).resize(function () {
                        $('.sidebar-menu-container').remove();
                        if ($(window).width() >= 1280) {
                            main.children('.sidebar-container').after(sidebar_menu);
                        } else {
                            sidebar_menu.appendTo(body);
                        }
                    });
                    body.on('click', '.sidebar-menu-container .sidebar-mask', function () {
                        sidebar_menu_bar.removeClass('active');
                        $(this).removeClass('active');
                    });
                }
            }
            //主体内容
            {
                {
                    addCss(`
                    .content {
                      color: rgba(0,0,0,0.87);
                      margin-bottom: 100px;
                      max-width: 100%;
                      min-width: 380px;
                      margin: 0 auto !important;
                      flex: 1 1 100%;
                      position: relative;
                      z-index: 1;
                      padding: 120px 16px;
                      transition: 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
                    }
                    @media (min-width: 948px) {
                      .content {
                        padding: 120px 24px;
                        max-width: 900px;
                      }
                    }`, "Content");
                }
                var content = $('<div\>');
                content.addClass('content');
                main.append(content);

                snackbars.addClass('snackbars');
                main.append(snackbars);

                //卡片
                {
                    addCss(`
                    .card {
                      background-color: #fff;
                      border-radius: 2px;
                      box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12);
                      transition: 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
                      margin-bottom: 24px;
                      width: 100%;
                      max-width: -webkit-fill-available;
                      max-width: -moz-fill-available;
                      max-width: -moz-available;
                      max-width: fill-available;
                    }
                    .card a {
                      text-align: left;
                      vertical-align: inherit;
                    }
                    .card a:hover {
                      color: #0091F8;
                    }
                    .card .action {
                      padding: 8px;
                      display: flex;
                      min-height: 48px;
                    }
                    .card .action a {
                      padding: 7px 8px;
                      color: #0091F8;
                      transition: 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
                      text-transform: uppercase;
                      font-size: 0.8125rem;
                      border-radius: 2px;
                      height: fit-content;
                      min-height: 32px;
                    }
                    .card .action a:hover {
                      background-color: rgba(0, 146, 248, 0.12);
                    }
                    .card .action>.item {
                      display: flex;
                    }
                    .card .text {
                      display: block;
                      font-size: 1rem;
                      line-height: 1.5rem;
                    }
                    .card>.title {
                      padding-bottom: 16px;
                      min-height: 48px;
                      text-overflow: ellipsis;
                      overflow: hidden;
                      white-space: nowrap;
                      display: block;
                    }
                    .card .img {
                      color: rgba(0, 0, 0, 0.54);
                      background-size: cover;
                      background-repeat: no-repeat;
                      border-radius: 2px;
                      background-position: center;
                      opacity: 0;
                      transform: scale(0.8);
                      transition: 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
                    }
                    .card .img.bangumi {
                      height: 265px;
                      width: 252px;
                    }
                    .card .img.active {
                      opacity: 1;
                      transform: scale(1);
                    }
                    @media (min-width: 480px) {
                      .card.video {
                        margin-bottom: 48px;
                      }
                    }
                    .card>.container:first-child {
                      border-top-left-radius: 2px;
                      border-top-right-radius: 2px;
                    }
                    .card>.container:last-child {
                      border-bottom-left-radius: 2px;
                      border-bottom-right-radius: 2px;
                    }
                    .card>.container:before {
                      top: -1px;
                      left: 0;
                      right: 0;
                      height: 1px;
                      content: "";
                      opacity: 1;
                      position: absolute;
                      transition: opacity 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
                      background-color: rgba(0, 0, 0, 0.12);
                    }
                    .card>.container:first-child:before {
                      display: none;
                    }`, 'Card');
                }
                //视频卡片
                {
                    addCss(`
                    .card.video .img {
                      width: calc(100% + 12px);
                      height: 208px;
                      margin-left: -6px;
                    }
                    .card.video .img.active {
                      box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12), inset 0 32px rgba(255,255,255,0.54);
                    }
                    .card.video>.title {
                      cursor: pointer;
                    }
                    .card.video.small .img{
                      margin: 0;
                      width: calc(100% + 24px);
                      margin-top: -12px;
                      margin-left: -12px;
                    }
                    .card.video.small {
                      display: block;
                      max-height: none;
                      max-width: 340px;
                      margin-left: 8px;
                      margin-right: 8px;
                    }
                    .card.video.small .container {
                      max-width: 100%;
                    }
                    .card.video.small .card-text {
                      width: 100%;
                      word-break: break-all;
                    }
                    @media (min-width: 480px) {
                      .card.video {
                        display: flex;
                        max-height: 184px;
                      }
                      .card.video .img {
                        width: 352px;
                        height: 208px;
                        margin: 0;
                        margin-top: -12px;
                      }
                      .card.video .card-text{
                        height: calc(100% - 48px);
                        width: 100%;
                      }
                      .card.video .container {
                        max-width: calc(100% - 352px);
                      }
                    }
                    `, 'VideoCard');
                }
                //容器
                {
                    addCss(`
                    .container {
                      display: flex;
                      width: 100%;
                      transition: 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
                      position: relative;
                      min-height: 48px;
                    }
                    .container>.title {
                      font-size: 18px;
                      padding-left: 4px;
                      width: 100%;
                      border-bottom: solid 1px rgba(0,0,0,0.12);
                    }
                    .container.small {
                      min-height: 24px;
                    }
                    .container #content {
                      min-height: 48px;
                    }
                    .container.column {
                      flex-direction: column;
                    }
                    `, 'Container');
                }
                //展开
                {
                    addCss(`
                    .expand {
                      flex-grow: 1;
                    }
                    .expand>.item {
                      position: relative;
                      transition: 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
                      background-color: #fff;
                      min-height: 48px;
                      box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);
                    }
                    .expand>.item:first-child {
                      border-top-left-radius: 2px;
                      border-top-right-radius: 2px;
                    }
                    .expand>.item:last-child {
                      border-bottom-left-radius: 2px;
                      border-bottom-right-radius: 2px;
                    }
                    .expand>.item:before {
                      top: -1px;
                      left: 0;
                      right: 0;
                      height: 1px;
                      content: "";
                      opacity: 1;
                      position: absolute;
                      transition: opacity 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
                      background-color: rgba(0, 0, 0, 0.12);
                    }
                    .expand>.item:first-child:before {
                      display: none;
                    }
                    .expand>.item.focus {
                      box-shadow: 0px 1px 8px 0px rgba(0, 145, 248, 0.2), 0px 1px 8px 0px rgba(0, 145, 248, 0.14), 0px 2px 8px -1px rgba(0, 145, 248, 0.12);
                    }
                    .center {
                      vertical-align: middle;
                      justify-content: center;
                      align-items: center;
                    }`, 'Expand');

                    addCss(`
                    .expand>.item.input {
                      display: flex;
                    }`, 'Input');
                }
                //按钮
                {
                    addCss(`
                    .btn {
                      cursor: pointer;
                      color: rgba(0,0,0,0.87);
                      display: flex;
                      transition: 125ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
                    }
                    a.btn {
                      padding: 7px 8px;
                      border-radius: 2px;
                    }
                    a.btn:hover {
                      background-color: rgba(0, 146, 248, 0.12);
                    }
                    .btn:hover {
                      color: #0091F8;
                    }
                    .btn.action {
                      width: 56px;
                      height: 56px;
                      padding: 0;
                      min-width: 0;
                      font-size: 24px;
                      box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);
                      border-radius: 50%;
                      background-color: #fff;
                    }
                    .btn.disable {
                      cursor: not-allowed;
                      pointer-events: none;
                    }`, 'Btn');
                }
                //输入框
                {
                    addCss(`
                    .textbox {
                      border: 1.2px solid rgba(0,0,0,0.54);
                      border-radius: 2px;
                      display: flex;
                      width: 100%;
                      transition: 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
                      margin: 4px;
                    }
                    .textbox.focus {
                      border: 1.2px solid rgba(0, 145, 248,0.87);
                    }
                    .textbox textarea {
                      font-size: 20px;
                      width: 100%;
                      min-height: 128px;
                    }
                    .textbox.small textarea {
                      font-size: 16px;
                    }
                    .textbox input {
                      width: 100%;
                      font-size: 20px;
                    }
                    .textbox.small input {
                      font-size: 16px;
                    }
                    .textbox input:focus {
                      color: #0091F8;
                    }
                    .textbox textarea:focus {
                      color: #0091F8;
                    }`, 'TextBox');
                }
                //标题
                {
                    addCss(`
                    .title {
                      cursor: default;
                      font-size: 1.5rem;
                      line-height: 2rem;
                      align-items: center;
                    }
                    .card-text>.title {
                      cursor: pointer;
                      padding-bottom: 16px;
                      display: block;
                    }
                    `, 'Title');
                }
                //设置列表
                {
                    addCss(`
                    .option-list {
                      display: flex;
                      width: 100%;
                    }
                    .option-list:before {
                      left: 0;
                      right: 0;
                      height: 1px;
                      content: "";
                      opacity: 1;
                      position: absolute;
                      transition: opacity 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
                      background-color: rgba(0, 0, 0, 0.12);
                    }
                    .option-list>.option>.item>a {
                      color: rgba(0, 0, 0, 0.87);
                    }
                    .option-list>.option {
                      min-height: 48px;
                      border-left: 1px solid rgba(0, 0, 0, 0.12);
                      width: 100%;
                      font-size: 16px;
                    }
                    .option-list>.option>.item>.title {
                      cursor: default;
                      font-size: 16px;
                    }
                    .option-list>.option:first-child {
                      border: none;
                    }
                    .option-list>.option>.item {
                      min-height: 48px;
                      border-bottom: 1px solid rgba(0, 0, 0, 0.12);
                    }
                    .option-list>.option>.item:hover {
                      color: rgba(0, 0, 0, 0.87);
                    }
                    .option-list>.option>ul {
                      width: 120px;
                      position: absolute;
                      z-index: 1400;
                      list-style: none;
                      padding: 0;
                      margin: 0;
                      background-color: #fff;
                      box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12);
                      opacity: 0;
                      pointer-events: none;
                      transition: 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
                    }
                    .option-list>.option>ul.show {
                      opacity: 1;
                      pointer-events: all;
                    }
                    .option-list>.option>ul>li {
                      min-height: 48px;
                      border-bottom: 1px solid rgba(0, 0, 0, 0.12);
                    }
                    .option-list>.option>ul>li:hover {
                      background-color: rgba(0, 0, 0, 0.12);
                    }
                    .option-list>.option>ul>li:last-child {
                      border: none;
                    }
                    `, 'OptionList');
                }
                //番剧卡片
                {
                    addCss(`
                    .card.bangumi {
                      display: block;
                      max-width: 128px;
                      margin-left: 6px;
                      margin-right: 6px;
                      max-height: fit-content;
                    }
                    .card.bangumi:last-child {
                      margin-bottom: 0;
                    }
                    .container.bangumi {
                      flex-wrap: wrap;
                      padding: 6px;
                      position: relative;
                    }
                    .card.bangumi .container{
                      width: 100%;
                    }
                    .card.bangumi .img{
                      width: 128px;
                      height: 128px;
                      transition: 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
                      opacity: 0;
                      transform: scale(0.8);
                    }
                    .card.bangumi .img.active {
                      opacity: 1;
                      transform: scale(1);
                    }
                    .card.bangumi .title {
                      cursor: pointer;
                    }
                    .card.bangumi .card-text{
                      width: 100%;
                    }
                    .card.bangumi.large {
                      max-width: 340px;
                    }
                    .card.bangumi.large .img{
                      width: calc(100% + 12px);
                      margin-top: -6px;
                      margin-left: -6px;
                      height: 208px;
                    }
                    @media (min-width: 480px) {
                      .card.bangumi .img{
                        width: 189px;
                        height: 189px;
                      }
                      .card.bangumi {
                        display: block;
                        max-width: 189px;
                      }
                    }`, 'BangumiCard')
                }
                //选择夹
                {
                    addCss(`
                    .tabs {
                      width: min-content;
                      height: min-content;
                      position: fixed;
                      right: 4px;
                      border-radius: 2px;
                      background-color: #fff;
                      box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
                    }
                    .tab-ul {
                      border-radius: 2px;
                      list-style: none;
                      padding: 0;
                      display: flex;
                    }
                    .bangumi.tab-ul {
                      padding-right: 6px;
                    }
                    .tab-ul>.container>.container {
                      display: none;
                      transition: 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
                    }
                    .tab-ul>.container>.container.active {
                      display: flex;
                    }
                    .tab {
                      display: flex;
                      min-height: 64px;
                      max-height: 264px;
                      width: 36px;
                      user-select: none;
                      position: relative;
                      text-transform: uppercase;
                      flex-grow: 1;
                      transition: 500ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
                    }
                    .tab.active {
                      color: #0091F8;
                    }
                    @media (min-width: 960px) {
                      min-height: 160px;
                    }
                    @media (min-width: 480px) {
                      .tab {
                        min-height: 72px;
                        width: 48px;
                      }
                    }`)
                }
                //页数
                {
                    addCss(`
                    .pages {
                      padding: 0;
                      list-style: none;
                      border-radius: 2px;
                      display: flex;
                      overflow: auto;
                    }
                    .pages .item {
                      background-color: #fff;
                      border: 1px solid rgba(0,0,0,0.12);
                      min-width: 32px;
                      transition: 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
                    }
                    .pages .item a {
                      display: flex;
                      padding: 2px 3px;
                      transition: 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
                    }
                    .pages>.item>a>p {
                      margin: 0;
                    }
                    .pages .item.disable {
                      color: rgba(0,0,0,0.54);
                      pointer-events: none;
                      min-width: 56px;
                      cursor: default;
                    }
                    .pages .item:last-child {
                      border-top-right-radius: 2px;
                      border-bottom-right-radius: 2px;
                    }
                    .pages .item:first-child {
                      border-top-left-radius: 2px;
                      border-bottom-left-radius: 2px;
                    }
                    @media (min-width: 608px) {
                      .pages .item a {
                        padding: 4px 6px;
                      }
                    }
                    @media (min-width: 726px) {
                      .pages .item a {
                        padding: 6px 10px;
                      }
                    }
                    `, 'Pages')
                }
                //右下按钮
                {
                    addCss(`
                    .action.container {
                      position: fixed;
                      right: 24px;
                      bottom: 24px;
                      justify-content: flex-end;
                      z-index: 1500;
                      width: auto;
                    }
                    .action.container .btn {
                      margin-left: 6px;
                      margin-right: 6px;
                    }
                    `, 'Actions');
                }
                //放大图片
                {
                    addCss(`
                    .img.container {
                      position: fixed;
                      width: 100%;
                      height: 100%;
                      z-index: 1400;
                      background-color: rgba(0,0,0,0.54);
                    }
                    .img.container img {
                      max-width: 100%;
                      height: 100%;
                    }`, 'BigImage');
                }
                //提示
                {
                    addCss(`
                    .snackbars {
                      position: fixed;
                      z-index: 1400;
                      top: 76px;
                      right: 0;
                    }
                    .snackbar {
                      right: 0;
                      display: flex;
                      align-items: center;
                      justify-content: flex-end;
                      transition: 225ms cubic-bezier(0, 0, 0.2, 1) 0ms;
                      transform: translateX(100%);
                      margin-top: 8px;
                      margin-bottom: 8px;
                    }
                    .snackbar.active {
                      transform: translateX(0);
                    }
                    .snackbar.disable {
                      height: 0;
                    }
                    .snackbar>.content {
                      padding: 6px 16px;
                      flex-wrap: wrap;
                      box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);
                      align-items: center;
                      pointer-events: initial;
                      font-size: 0.875rem;
                      background-color: rgb(47, 54, 64);
                      min-width: 240px;
                      border-top-left-radius: 2px;
                      border-bottom-left-radius: 2px;
                    }
                    .snackbar>.content>.text {
                      padding: 8px 0;
                      color: #d04d74;
                    }
                    `, 'Snackbar');
                }
                //分情况处理
                {
                    //滑块
                    {
                        {
                            addCss(`
                            .square {
                              width: 48px;
                              height: 48px;
                              background-color: rgba(0, 145, 248, 0.2);
                              border-radius: 2px;
                              position: fixed;
                              transition: 500ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
                            }
                            .square.right {
                              right: 4px;
                            }`, 'Square');
                        }
                        var square = $('<div\>');
                        square.addClass('square');
                    }
                    var waterfall;
                    if (location.href === 'https://www.biliplus.com/'
                        || location.href === 'https://www.biliplus.com/index.php'
                        || $('#random-pic').length > 0) {
                        nav_title.text("( ゜- ゜)つロ 乾杯~");
                        //随机视频
                        {
                            let random = $('<div\>');
                            var random_img = $('<div\>');
                            let random_container = $('<div\>');
                            let random_text = $('<div\>');
                            var random_title = $('<a\>');
                            var random_up = $('<a\>');
                            var random_action = $('<div\>');
                            var random_action_reload = $('<a\>');
                            random.addClass('card');
                            random.addClass('video');
                            random_img.addClass('img');
                            random_img.addClass('padding');
                            random_container.addClass('container');
                            random_container.addClass('column');
                            random_text.addClass('card-text');
                            random_text.addClass('padding');
                            random_text.addClass('mid');
                            random_title.addClass('title');
                            random_title.addClass('ellipsis');
                            random_up.addClass('text');
                            random_up.addClass('ellipsis');
                            random_action.addClass('action');
                            random_action.addClass('padding');
                            random_action.addClass('mid');
                            random_action_reload.attr('id', "reload");
                            random_action_reload.text("Reload");
                            random_action_reload.attr('data-multi', 'false');
                            random.append(random_img);
                            random.append(random_container);
                            random_container.append(random_text);
                            random_text.append(random_title);
                            random_text.append(random_up);
                            random_container.append(random_action);
                            random_action.append(random_action_reload);
                            content.append(random);
                            random_action.hide();
                            NProgress.start();
                            getjson('/api/random?ajax', randomVideo);
                            random_action_reload.click(function () {
                                NProgress.done();
                                NProgress.start();
                                random_img.removeClass('active');
                                getjson('/api/random?ajax', randomVideo);
                            });
                        }
                        //搜索
                        {
                            let search_content = $('<div\>');

                            let search_input_area = $('<div\>');

                            let advance = $('<div\>');
                            let search_options_container = $('<div\>');

                            search_content.addClass('expand');
                            search_content.addClass('center');
                            //普通搜索
                            {
                                addCss(`
                                .item.input {
                                  border-bottom: 1.5px solid rgba(0, 0, 0, 0.54);
                                  width: 100%;
                                }
                                .item.input input {
                                  width: 100%;
                                  font-size: 20px;
                                }
                                .item.input input:focus {
                                  color: #0091F8;
                                }
                                .item.input.focus {
                                  border-bottom: 1.5px solid rgba(0, 145, 248,0.87);
                                }`, 'SearchInput');
                                let search_input_icon = $('<div\>');
                                let search_input_area_input = $('<input\>');

                                search_input_area.addClass('item');
                                search_input_area.addClass('input');
                                search_input_icon.addClass('icon');
                                search_input_icon.addClass('center');
                                search_input_icon.addClass('btn');

                                search_input_area_input.attr('type', 'text');
                                search_input_area_input.attr('autocomplete', 'on');
                                search_input_area_input.attr('autofocus', 'autofocus');
                                search_input_area_input.attr('maxlength', '32');
                                search_input_area_input.attr('placeholder', '输入你想搜索的内容、AV号、UP主MID');

                                search_content.append(search_input_area);
                                search_input_area.append(search_input_area_input);
                                search_input_area.append(search_input_icon);
                                search_input_icon.append('<i class="material-icons">search</i>');
                                content.append(search_content);

                                search_input_area_input.keypress(function (e) {
                                    let ev = document.all ? window.event : e;
                                    if (ev.keyCode === 13) {
                                        search(search_input_area_input.val());
                                    }
                                });
                                search_input_icon.click(function () {
                                    search(search_input_area_input.val());
                                });
                            }

                            //高级搜索
                            {
                                advance.addClass('item');
                                advance.addClass('shrink');

                                {
                                    let advance_search = $('<div\>');
                                    //搜索
                                    {
                                        //输入框
                                        {
                                            let advance_search_textbox = $('<div\>');
                                            let advance_search_textbox_input = $('<input\>');
                                            let advance_search_textbox_icon = $('<div\>');

                                            advance_search.addClass('container');
                                            advance_search_textbox_icon.addClass('icon');
                                            advance_search_textbox_icon.addClass('center');
                                            advance_search_textbox_icon.addClass('btn');
                                            advance_search_textbox.addClass('center');
                                            advance_search_textbox.addClass('textbox');

                                            advance_search_textbox_input.attr('type', 'text');
                                            advance_search_textbox_input.attr('autocomplete', 'on');
                                            advance_search_textbox_input.attr('autofocus', 'autofocus');
                                            advance_search_textbox_input.attr('maxlength', '32');
                                            advance_search_textbox_input.attr('placeholder', '输入你想搜索的内容');

                                            advance_search_textbox_icon.append('<i class="material-icons">search</i>');
                                            advance_search_textbox.append(advance_search_textbox_input);
                                            advance_search_textbox.append(advance_search_textbox_icon);
                                            advance_search.append(advance_search_textbox);

                                            advance_search_textbox.keypress(function (e) {
                                                let ev = document.all ? window.event : e;
                                                if (ev.keyCode === 13) {
                                                    search_data.word = advance_search_textbox_input.val();
                                                    advanceSearch(search_data);
                                                }
                                            });
                                            advance_search_textbox_icon.click(function () {
                                                search_data.word = advance_search_textbox_input.val();
                                                advanceSearch(search_data);
                                            });
                                        }
                                        //设置
                                        {
                                            let search_options = $('<div\>');
                                            let option = $('<div\>');

                                            search_options_container.addClass('container');
                                            search_options.addClass('option-list');
                                            option.addClass('option');


                                            let source_option = option.clone();
                                            let sort_option = option.clone();
                                            let number_option = option.clone();
                                            //添加项目
                                            {
                                                let option_item = $('<div\>');
                                                let option_item_a = $('<a\>');

                                                option_item.append(option_item_a);
                                                option_item.addClass('item');
                                                option_item.addClass('btn');
                                                option_item.addClass('center');
                                                option_item.addClass('ellipsis');
                                                let source_option_item = option_item.clone();
                                                let sort_option_item = option_item.clone();
                                                let number_option_item = option_item.clone();

                                                source_option.attr('id', 'source');
                                                sort_option.attr('id', 'sort');
                                                number_option.attr('id', 'number');
                                                //标题
                                                {
                                                    addCss(`
                                                    .option .title {
                                                      padding-right: 4px;
                                                    }`, 'OptionTitle');
                                                    let option_title = $('<div\>');

                                                    option_title.addClass('title');
                                                    option_title.addClass('center');

                                                    let source_option_title = option_title.clone();
                                                    let sort_option_title = option_title.clone();
                                                    let number_option_title = option_title.clone();

                                                    source_option_title.text('来源');
                                                    sort_option_title.text('排序');
                                                    number_option_title.text('数量');

                                                    source_option_item.prepend(source_option_title);
                                                    sort_option_item.prepend(sort_option_title);
                                                    number_option_item.prepend(number_option_title);
                                                }
                                                source_option.append(source_option_item);
                                                sort_option.append(sort_option_item);
                                                number_option.append(number_option_item);
                                                //选项
                                                {
                                                    let option_ul = $('<ul\>');
                                                    let option_ul_li = $('<li\>');
                                                    let option_ul_li_a = $('<a\>');

                                                    option_ul_li.addClass('padding');
                                                    option_ul_li.addClass('center');
                                                    option_ul_li.addClass('btn');
                                                    option_ul_li.attr('data-color', 'black');
                                                    option_ul_li.append(option_ul_li_a);

                                                    let source_option_ul = option_ul.clone();
                                                    let sort_option_ul = option_ul.clone();
                                                    let number_option_ul = option_ul.clone();

                                                    for (let key in source) {
                                                        source_option_ul.append(option_ul_li.clone().children('a').text(key)
                                                            .attr('data-type', 'source').attr('data-search', key).parent());
                                                    }
                                                    for (let key in sort) {
                                                        switch (key) {
                                                            case sort.default:
                                                                sort_option_ul.append(option_ul_li.clone().children('a').text(sort_cn.default)
                                                                    .attr('data-type', 'sort').attr('data-search', key).parent());
                                                                break;
                                                            case sort.danmaku:
                                                                sort_option_ul.append(option_ul_li.clone().children('a').text(sort_cn.danmaku)
                                                                    .attr('data-type', 'sort').attr('data-search', key).parent());
                                                                break;
                                                            case sort.view:
                                                                sort_option_ul.append(option_ul_li.clone().children('a').text(sort_cn.view)
                                                                    .attr('data-type', 'sort').attr('data-search', key).parent());
                                                                break;
                                                            case sort.pubdate:
                                                                sort_option_ul.append(option_ul_li.clone().children('a').text(sort_cn.pubdate)
                                                                    .attr('data-type', 'sort').attr('data-search', key).parent());
                                                                break;
                                                        }
                                                    }

                                                    number_option_ul.append(option_ul_li.clone().children('a').text('5个/页')
                                                        .attr('data-type', 'number').attr('data-search', '5').parent());
                                                    number_option_ul.append(option_ul_li.clone().children('a').text('10个/页')
                                                        .attr('data-type', 'number').attr('data-search', '10').parent());
                                                    number_option_ul.append(option_ul_li.clone().children('a').text('15个/页')
                                                        .attr('data-type', 'number').attr('data-search', '15').parent());
                                                    number_option_ul.append(option_ul_li.clone().children('a').text('20个/页')
                                                        .attr('data-type', 'number').attr('data-search', '20').parent());

                                                    source_option.append(source_option_ul);
                                                    sort_option.append(sort_option_ul);
                                                    number_option.append(number_option_ul);
                                                }
                                                source_option_item.children('a').text(search_data.source);
                                                switch (search_data.sort) {
                                                    case sort.default:
                                                        sort_option_item.children('a').text(sort_cn.default);
                                                        break;
                                                    case sort.danmaku:
                                                        sort_option_item.children('a').text(sort_cn.danmaku);
                                                        break;
                                                    case sort.view:
                                                        sort_option_item.children('a').text(sort_cn.view);
                                                        break;
                                                    case sort.pubdate:
                                                        sort_option_item.children('a').text(sort_cn.pubdate);
                                                        break;
                                                }
                                                number_option_item.children('a').text(search_data.number + '个/页');
                                            }

                                            search_options.append(source_option);
                                            search_options.append(sort_option);
                                            search_options.append(number_option);
                                            search_options_container.append(search_options);
                                        }
                                    }
                                    let extra = $('<div\>');
                                    extra.addClass('container');
                                    //杂项
                                    {
                                        //AV号
                                        {
                                            let av_container = $('<div\>');
                                            let av_textbox = $('<div\>');
                                            let av_textbox_input = $('<input\>');

                                            av_container.addClass('container');
                                            av_textbox.addClass('center');
                                            av_textbox.addClass('textbox');
                                            av_textbox_input.addClass('number');

                                            av_textbox_input.attr('type', 'text');
                                            av_textbox_input.attr('autocomplete', 'on');
                                            av_textbox_input.attr('maxlength', '8');
                                            av_textbox_input.attr('placeholder', '输入AV号');

                                            av_textbox.append(av_textbox_input);
                                            av_container.append(av_textbox);

                                            av_textbox.keypress(function (e) {
                                                let ev = document.all ? window.event : e;
                                                if (ev.keyCode === 13) {
                                                    location.href = 'https://www.biliplus.com/av' + av_textbox_input.val();
                                                }
                                            });

                                            extra.append(av_container);
                                        }
                                        //CID
                                        {
                                            let cid_container = $('<div\>');
                                            let cid_textbox = $('<div\>');
                                            let cid_textbox_input = $('<input\>');

                                            cid_container.addClass('container');
                                            cid_textbox.addClass('center');
                                            cid_textbox.addClass('textbox');
                                            cid_textbox_input.addClass('number');

                                            cid_textbox_input.attr('type', 'text');
                                            cid_textbox_input.attr('autocomplete', 'on');
                                            cid_textbox_input.attr('maxlength', '8');
                                            cid_textbox_input.attr('placeholder', '输入cid');

                                            cid_textbox.append(cid_textbox_input);
                                            cid_container.append(cid_textbox);

                                            cid_textbox.keypress(function (e) {
                                                let ev = document.all ? window.event : e;
                                                if (ev.keyCode === 13) {
                                                    location.href = 'https://www.biliplus.com/api/cidplay.php#' + cid_textbox_input.val();
                                                }
                                            });

                                            extra.append(cid_container);
                                        }
                                        //缓存列表
                                        {
                                            let all_container = $('<div\>');
                                            let all_a = $('<a\>');

                                            all_container.addClass('container');
                                            all_container.addClass('center');
                                            all_container.addClass('btn');

                                            all_a.text('查看缓存列表');

                                            all_container.append(all_a);

                                            all_container.click(function () {
                                                window.open('api/all.php');
                                            });
                                            extra.append(all_container);
                                        }
                                    }
                                    advance.append(advance_search);
                                    advance.append(search_options_container);
                                    advance.append(extra);
                                }
                            }

                            //展开按钮
                            {
                                addCss(`
                                .expand>.item>.icon.shrink {
                                  transform: rotate(180deg);
                                }
                                .expand>.item.shrink {
                                  height: 0;
                                  min-height: 0;
                                  overflow: hidden;
                                }`);
                                let search_expand_container = $('<div\>');
                                let search_expand = $('<div\>');
                                let search_expand_icon = $('<i\>');

                                search_expand_container.addClass('item');
                                search_expand_container.addClass('center');
                                search_expand_container.addClass('btn');
                                search_expand.addClass('icon');
                                search_expand.addClass('center');
                                search_expand_icon.addClass('material-icons');
                                search_expand_icon.text('expand_more');

                                search_expand.append(search_expand_icon);
                                search_expand_container.append(search_expand);
                                search_content.append(search_expand_container);

                                //展开
                                search_expand_container.click(function () {
                                    if (search_expand.hasClass('shrink')) {
                                        advance.addClass('shrink');
                                        setTimeout(function () {
                                            advance.remove();
                                            search_content.prepend(search_input_area);
                                            setTimeout(function () {
                                                search_input_area.removeClass('shrink');
                                            }, 10);
                                        }, 300);
                                        search_expand.removeClass('shrink');
                                    } else {
                                        search_input_area.addClass('shrink');
                                        search_expand.addClass('shrink');
                                        setTimeout(function () {
                                            search_input_area.remove();
                                            search_content.prepend(advance);
                                            advance.removeClass('shrink');
                                            //选项宽度
                                            $('.option-list>.option>ul').each(function () {
                                                $(this).css('width', $(this).parent('.option').width());
                                            });
                                        }, 300);
                                    }
                                });

                            }
                        }
                    }
                    //番剧列表
                    else if (location.href.indexOf('/?bangumi') !== -1) {
                        nav_title.text($('#content>.title').text());

                        let bangumi = $('<ul\>');
                        var bangumi_tabs = $('<div\>');
                        var bangumi_tabs_content = $('<div\>');

                        let square_bangumi = square.clone();
                        square_bangumi.addClass('right');

                        bangumi.addClass('tab-ul');
                        bangumi.addClass('bangumi');
                        bangumi_tabs.addClass('tabs');
                        bangumi_tabs.addClass('column');
                        bangumi_tabs.addClass('container');
                        bangumi_tabs_content.addClass('container');

                        var bangumi_content = $('<div\>');
                        bangumi_content.addClass('container');
                        bangumi_content.addClass('bangumi');

                        bangumi.append(bangumi_tabs_content);
                        bangumi.append(bangumi_tabs);
                        bangumi.append(square_bangumi);

                        //番剧卡片
                        {
                            var bangumi_card = $('<div\>');
                            bangumi_card.addClass('card');
                            bangumi_card.addClass('bangumi');

                            let bangumi_card_img = $('<div\>');
                            bangumi_card_img.addClass('img');
                            bangumi_card_img.addClass('btn');
                            bangumi_card.append(bangumi_card_img);

                            let bangumi_card_container = $('<div\>');
                            bangumi_card_container.addClass('container');
                            bangumi_card_container.addClass('column');
                            bangumi_card.append(bangumi_card_container);

                            let bangumi_card_text = $('<div\>');
                            bangumi_card_text.addClass('card-text');
                            bangumi_card_text.addClass('padding');
                            bangumi_card_text.addClass('mid');
                            bangumi_card_text.addClass('ellipsis');
                            bangumi_card_container.append(bangumi_card_text);

                            let bangumi_card_text_title = $('<div\>');
                            bangumi_card_text_title.addClass('title');
                            bangumi_card_text_title.addClass('ellipsis');
                            bangumi_card_text_title.addClass('btn');
                            bangumi_card_text.append(bangumi_card_text_title);

                            let bangumi_card_text_count = $('<div\>');
                            bangumi_card_text_count.addClass('text');
                            bangumi_card_text_count.addClass('ellipsis');
                            bangumi_card_text_count.attr('id', 'count');
                            bangumi_card_text.append(bangumi_card_text_count);

                            let bangumi_card_text_time = $('<div\>');
                            bangumi_card_text_time.addClass('text');
                            bangumi_card_text_time.attr('id', 'last');
                            bangumi_card_text_time.addClass('ellipsis');
                            bangumi_card_text.append(bangumi_card_text_time);

                            let bangumi_card_text_click = $('<div\>');
                            bangumi_card_text_click.addClass('description');
                            bangumi_card_text_click.addClass('text');
                            bangumi_card_text_click.attr('id', 'click');
                            bangumi_card_text_click.addClass('ellipsis');
                            bangumi_card_text.append(bangumi_card_text_click);

                            let bangumi_card_text_follow = $('<div\>');
                            bangumi_card_text_follow.addClass('description');
                            bangumi_card_text_follow.addClass('text');
                            bangumi_card_text_follow.addClass('ellipsis');
                            bangumi_card_text_follow.attr('id', 'follow');
                            bangumi_card_text.append(bangumi_card_text_follow);

                            body.on('click', '.bangumi>.img,.bangumi .title', function () {
                                location.href = $(this).attr('href');
                            });
                        }
                        //星期X
                        {
                            //tab
                            {
                                var bangumi_tab = $('<li\>');
                                let bangumi_tab_a = $('<a\>');

                                bangumi_tab.attr('data-duration', '0.5');
                                bangumi_tab.attr('data-color', '#0091F8');
                                bangumi_tab.addClass('tab');
                                bangumi_tab.addClass('btn');
                                bangumi_tab.addClass('center');
                                bangumi_tab.append(bangumi_tab_a);
                            }
                        }

                        let refresh_bangumi = $('<div\>');
                        let refresh_bangumi_button = $('<button\>');
                        let refresh_bangumi_text = $('<span\>');

                        refresh_bangumi.addClass('container');
                        refresh_bangumi.addClass('action');
                        refresh_bangumi_button.addClass('action');
                        refresh_bangumi_button.addClass('btn');
                        refresh_bangumi_text.addClass('material-icons');

                        refresh_bangumi_text.text('refresh');

                        refresh_bangumi_button.append(refresh_bangumi_text);
                        refresh_bangumi.append(refresh_bangumi_button);

                        refresh_bangumi_button.click(function () {
                            $.get('/task/bangumi.php', function () {
                                location.reload();
                            });
                        });

                        refreshBangumi();

                        content.append(bangumi);
                        content.append(refresh_bangumi);

                        resizeSquare();

                        //选择夹切换
                        body.on('click', '.tab-ul .tab', function () {
                            let bangumi_content = $(this).parent('.tabs').prev('.container');
                            let bangumi_content_container = bangumi_content.children('.container:eq(' + $(this).attr('day') + ')');
                            $(this).parent('.tabs').children('.tab').removeClass('active');
                            $(this).addClass('active');
                            bangumi_content.children('.container.active').removeClass('active');
                            bangumi_content_container.addClass('active');
                            resizeSquare();
                            $('html, body').animate({scrollTop: '0'}, 'slow');
                        });
                        $(window).resize(function () {
                            resizeSquare();
                            setTimeout(function () {
                                resizeSquare();
                            }, 300);
                        });
                    }
                    //关于
                    else if (location.href.indexOf('/?about') !== -1) {
                        addCss(`
                          .content a {
                            color: #0091F8;
                            vertical-align: inherit;
                          }
                        }`, 'About');
                        nav_title.text('关于 - BiliPlus');
                        content.append($('#content'));
                        $('#content').removeClass("content");
                        $('#content').show();

                        let img_container = $('<div\>');

                        img_container.addClass('container');
                        img_container.addClass('center');
                        img_container.addClass('img');

                        main.append(img_container);

                        img_container.hide();
                        $('#content img').click(function (e) {
                            e.stopPropagation();
                            img_container.children().remove();
                            img_container.append($(this).prop('outerHTML'));
                            img_container.children().removeAttr('style');
                            img_container.show();
                            img_container.one('click', function () {
                                img_container.hide();
                                $('table.white_container').parent('.container').remove();
                                body.removeAttr('style');
                            });
                        });
                    }
                    //留言板
                    else if (location.href.indexOf('/lyb') !== -1) {
                        //评论
                        {
                            addCss(`
                            .comment.card {
                              white-space: pre-wrap;
                              word-break: break-all;
                            }
                            .hoveritem {
                              display: flex;
                              flex-direction: column;
                              overflow: hidden;
                              width: max-content;
                              cursor: default;
                            }
                            .comment.card .hoveritem {
                              height: 20px;
                              margin: 4px;
                            }
                            .comment.card .hoveritem:hover {
                              justify-content: flex-end;
                            }
                            .comment .reply {
                              border: solid 1px rgba(0,0,0,0.12);
                            }
                            .comment.card a {
                              color: #0091F8;
                            }`, 'Comment');
                        }
                        nav_title.text($('.header .title').text());

                        //评论卡片
                        {
                            let comment = $('<div\>');
                            comment.addClass('card');
                            comment.addClass('comment');

                            let comment_content = $('<div\>');
                            comment_content.addClass('padding');
                            comment_content.addClass('mid');
                            comment.append(comment_content);

                            let comment_text = $('<div\>');
                            comment_text.attr('id', 'text');
                            comment_content.append(comment_text);

                            let comment_content_reply = $('<div\>');
                            comment_content_reply.addClass('padding');
                            comment_content_reply.addClass('reply');
                            comment_content.append(comment_content_reply);

                            //添加
                            {
                                $('#content>.ly').each(function () {
                                    let comment_clone = comment.clone();
                                    let hoveritem = $(this).find('.hoveritem');
                                    hoveritem.addClass('description');
                                    hoveritem.removeAttr('style');
                                    hoveritem.children('.normal').removeClass('timeago');
                                    comment_clone.find('#text').append($(this).children('div:first').children('div'));
                                    if ($(this).children('div:last').children('div').length > 0)
                                        comment_clone.find('.reply').append($(this).children('div:last').children('div'));
                                    else
                                        comment_clone.find('.reply').remove();
                                    content.append(comment_clone);
                                });
                            }
                        }
                        //页数
                        {
                            let comment_pages_container = $('<div\>');
                            let comment_pages = $('<code\>').append($('.footer_video').prop('outerHTML').replace(/&nbsp;/ig, '')).children();
                            comment_pages_container.addClass('container');
                            comment_pages_container.addClass('center');
                            //页数
                            {
                                let comment_pages_page = $('<li\>');
                                let comment_pages_page_a = $('<a\>');
                                let comment_pages_page_text = $('<p\>');
                                comment_pages_page.addClass('btn');
                                comment_pages_page.addClass('item');
                                comment_pages_page_a.addClass('center');
                                comment_pages_page.append(comment_pages_page_a);
                                comment_pages_page_a.append(comment_pages_page_text);

                                comment_pages.removeClass('footer_video');
                                comment_pages.addClass('pages');

                                comment_pages.children().each(function () {
                                    let page_clone = comment_pages_page.clone();
                                    let page_clone_a = page_clone.children('a');
                                    page_clone_a.attr('href', $(this).attr('href'));
                                    if ($(this).children('#first').length > 0) {
                                        page_clone_a.children('p').addClass('material-icons');
                                        page_clone_a.children('p').text('first_page');
                                    } else if ($(this).children('#previous').length > 0) {
                                        page_clone_a.children('p').addClass('material-icons');
                                        page_clone_a.children('p').text('chevron_left');
                                    } else if ($(this).children('#next').length > 0) {
                                        page_clone_a.children('p').addClass('material-icons');
                                        page_clone_a.children('p').text('chevron_right');
                                    } else if ($(this).children('#last').length > 0) {
                                        page_clone_a.children('p').addClass('material-icons');
                                        page_clone_a.children('p').text('last_page');
                                    } else if ($(this).hasClass('solidbox')) {
                                        page_clone.addClass('disable');
                                        page_clone_a.children('p').text($(this).text());
                                    } else {
                                        page_clone_a.children('p').text($(this).children('.solidbox').text());
                                    }
                                    comment_pages.append(page_clone);
                                    $(this).remove();
                                });
                            }
                            comment_pages_container.append(comment_pages);
                            content.append(comment_pages_container);
                        }
                        //回到顶部
                        {
                            let comment_buttom = $('<div\>');
                            let comment_buttom_button = $('<button\>');
                            let comment_buttom_text = $('<span\>');
                            let comment_buttom_top = comment_buttom_button.clone();
                            {
                                comment_buttom.addClass('container');
                                comment_buttom.addClass('action');
                                comment_buttom_button.addClass('action');
                                comment_buttom_button.addClass('btn');
                                comment_buttom_text.addClass('material-icons');
                                comment_buttom_top = comment_buttom_button.clone();

                                comment_buttom_top.append(comment_buttom_text.clone().text('arrow_upward'));
                                comment_buttom_top.hide();
                                comment_buttom.append(comment_buttom_top);
                            }

                            $(window).scroll(function () {
                                if ($(window).scrollTop() >= 120) {
                                    comment_buttom_top.show();
                                } else {
                                    comment_buttom_top.fadeOut(350);
                                }
                            });
                            comment_buttom_top.click(function () {
                                $('html, body').animate({scrollTop: '0'}, 500);
                            });
                            content.append(comment_buttom);
                        }
                        //评论界面
                        {
                            addCss(`
                            .card.add-comment {
                              margin-top: 24px;
                            }`, 'SendCommentCard');
                            let comment_container = $('<div\>');
                            comment_container.addClass('card');
                            comment_container.addClass('add-comment');
                            {
                                let comment_textbox = $('<div\>');
                                let comment_textbox_icon = icon.clone();
                                let comment_textbox_input = $('<input\>');

                                let comment_content = $('<div\>');
                                let comment_name = $('<div\>');
                                let comment_preview = $('<div\>');
                                let comment_bottom = $('<div\>');
                                let comment_code = $('<div\>');

                                let comment_data = {
                                    name: '',
                                    mail: '',
                                    code: '',
                                    msg: '',
                                    notify: ''
                                };
                                comment_textbox.addClass('textbox');
                                comment_textbox.addClass('small');

                                comment_textbox_icon.addClass('mid');

                                comment_textbox.append(comment_textbox_icon);
                                comment_textbox.append(comment_textbox_input);
                                //创建
                                {
                                    addCss(`
                                    #code {
                                      min-width: 150px;
                                      height: 50px;
                                      cursor: pointer;
                                    }`, 'Code');
                                    //用户名邮箱
                                    {
                                        let comment_name_textbox = comment_textbox.clone();
                                        comment_name.addClass('container');
                                        comment_name.addClass('small');
                                        comment_name.addClass('padding');
                                        comment_name_textbox.children('.icon').children().text('account_circle');
                                        comment_name_textbox.children('input').attr('placeholder', '请输入用户名');
                                        comment_name_textbox.children('input').val(getValue('name'));
                                        let comment_mail_textbox = comment_textbox.clone();

                                        comment_mail_textbox.addClass('item');

                                        comment_mail_textbox.children('input').attr('placeholder', '留空无邮件提示');
                                        comment_mail_textbox.children('input').val(getValue('mail'));
                                        comment_mail_textbox.children('.icon').children().text('email');

                                        comment_name.append(comment_name_textbox);
                                        comment_name.append(comment_mail_textbox);
                                        comment_container.append(comment_name);

                                        comment_data.name = comment_name_textbox.children('input').val();
                                        comment_name_textbox.children('input').change(function () {
                                            comment_data.name = comment_name_textbox.children('input').val();
                                        });
                                        comment_data.mail = comment_mail_textbox.children('input').val();
                                        comment_mail_textbox.children('input').change(function () {
                                            comment_data.mail = comment_mail_textbox.children('input').val();
                                        });
                                    }
                                    //内容
                                    {
                                        let comment_content_textbox = $('<div\>');
                                        let comment_content_textbox_area = $('<textarea\>');

                                        comment_content.addClass('container');
                                        comment_content.addClass('padding');
                                        comment_content_textbox.addClass('textbox');
                                        comment_content_textbox.addClass('padding');
                                        comment_content_textbox.addClass('small');

                                        comment_content_textbox_area.attr('id', 'comment_content');
                                        comment_content_textbox_area.attr('placeholder', '请输入评论');
                                        comment_content_textbox_area.attr('type', 'text');
                                        comment_content_textbox_area.attr('required', 'required');

                                        comment_content_textbox.append(comment_content_textbox_area);
                                        comment_content.append(comment_content_textbox);
                                        comment_container.append(comment_content);

                                        comment_content_textbox_area.change(function () {
                                            comment_data.msg = comment_content_textbox_area.val();
                                        });

                                        body.on('input', '#comment_content', function () {
                                            comment_preview.children('#content').html(markdown.toHTML($(this).val()).replace(/\<p\>|\<\/p\>/g, ''));
                                        });
                                    }
                                    //预览
                                    {
                                        let comment_preview_content = $('<div\>');
                                        let comment_preview_title = $('<div\>');
                                        let comment_preview_title_text = $('<span\>');

                                        comment_preview.addClass('container');
                                        comment_preview.addClass('column');
                                        comment_preview.addClass('padding');
                                        comment_preview_content.addClass('padding');
                                        comment_preview_title.addClass('title');

                                        comment_preview_content.attr('id', 'content');

                                        loadScript('/js/markdown.js');

                                        comment_preview_title_text.text('预览');

                                        comment_preview_title.append(comment_preview_title_text);
                                        comment_preview.append(comment_preview_title);
                                        comment_preview.append(comment_preview_content);
                                        comment_container.append(comment_preview);
                                    }
                                    //验证码
                                    {
                                        let comment_code_textbox = $('<div\>');
                                        let comment_code_textbox_input = $('<input\>');
                                        let comment_code_img = $('<img\>');

                                        comment_code_textbox.addClass('textbox');
                                        comment_code_textbox.addClass('code');
                                        comment_code_textbox.addClass('small');
                                        comment_code.addClass('item');
                                        comment_code_img.addClass('item');
                                        comment_bottom.addClass('padding');
                                        comment_code_img.addClass('padding');
                                        comment_code_textbox_input.addClass('number');

                                        comment_code_img.attr('id', 'code');
                                        comment_code_img.attr('title', '点击更换验证码');
                                        comment_code_textbox_input.attr('maxlength', '6');
                                        comment_code_textbox_input.attr('placeholder', '验证码');

                                        comment_code_textbox.append(comment_code_textbox_input);
                                        comment_code.append(comment_code_textbox);
                                        comment_code.append(comment_code_img);
                                        comment_bottom.append(comment_code);
                                        comment_container.append(comment_bottom);

                                        comment_code_img.click(function () {
                                            comment_code_img.attr('src', '/include/code.php?' + Math.random());
                                        });
                                        $(window).scroll(function () {
                                            if (comment_code_img.attr('src') === undefined
                                                && Math.ceil($(window).height() + $(window).scrollTop())
                                                >= comment_code_img.offset().top) {
                                                comment_code_img.attr('src', '/include/code.php?' + Math.random());
                                            }
                                        });
                                        comment_data.code = comment_code_textbox_input.val();
                                        comment_code_textbox_input.change(function () {
                                            comment_data.code = comment_code_textbox_input.val();
                                        });
                                    }
                                    //发送
                                    {
                                        let comment_bottom_send_container = $('<div\>');
                                        let comment_bottom_send = $('<a\>');
                                        let comment_bottom_send_icon = icon.clone();
                                        let comment_bottom_send_a = $('<span\>');
                                        comment_bottom_send_container.addClass('item');
                                        comment_bottom_send_container.addClass('padding');
                                        comment_bottom.addClass('action');
                                        comment_bottom_send.addClass('btn');
                                        comment_bottom_send.addClass('center');
                                        comment_bottom_send_icon.addClass('small');
                                        comment_bottom_send_icon.children().text('send');
                                        comment_bottom_send_a.text('send');
                                        comment_bottom.append(whitespace.clone());
                                        comment_bottom.append(comment_bottom_send_container);
                                        comment_bottom_send.append(comment_bottom_send_icon);
                                        comment_bottom_send.append(comment_bottom_send_a);
                                        comment_bottom_send_container.append(comment_bottom_send);

                                        comment_bottom_send.click(function () {
                                            if (sendComment(comment_data)) {
                                                comment_content.children('.textbox').children('textarea').val('');
                                                comment_preview.children('#content').html('');
                                            } else {
                                                comment_code.children('img').click();
                                            }
                                            comment_code.children('.textbox').children('input').val('')
                                        });
                                    }
                                }
                            }
                            content.append(comment_container);
                        }
                    }
                    //搜索
                    else if (location.href.indexOf('/api/do.php?act=search') !== -1) {
                        nav_title.text('搜索结果-' + getUrlParam('word'));
                        //搜索
                        {
                            let search_card = $('<div\>');
                            let search_options_container = $('<div\>');
                            let search_textbox_container = $('<div\>');
                            search_card.addClass('card');
                            search_options_container.addClass('container');
                            search_textbox_container.addClass('container');

                            let search_data = {
                                source: source.bilibili,
                                word: '',
                                sort: sort.default,
                                number: '20'
                            };
                            //输入框
                            {
                                let search_textbox = $('<div\>');
                                let search_textbox_input = $('<input\>');
                                let search_textbox_icon = $('<div\>');

                                search_textbox_icon.addClass('icon');
                                search_textbox_icon.addClass('center');
                                search_textbox_icon.addClass('btn');
                                search_textbox.addClass('center');
                                search_textbox.addClass('textbox');

                                search_textbox_input.attr('type', 'text');
                                search_textbox_input.attr('autocomplete', 'on');
                                search_textbox_input.attr('autofocus', 'autofocus');
                                search_textbox_input.attr('maxlength', '32');
                                search_textbox_input.attr('placeholder', '输入你想搜索的内容');

                                search_textbox_input.val(getUrlParam('word'));

                                search_textbox_icon.append('<i class="material-icons">search</i>');
                                search_textbox.append(search_textbox_input);
                                search_textbox.append(search_textbox_icon);
                                search_textbox_container.append(search_textbox);

                                search_textbox.keypress(function (e) {
                                    let ev = document.all ? window.event : e;
                                    if (ev.keyCode === 13) {
                                        search_data.word = search_textbox_input.val();
                                        advanceSearch(search_data);
                                    }
                                });
                                search_textbox_icon.click(function () {
                                    search_data.word = search_textbox_input.val();
                                    advanceSearch(search_data);
                                });
                            }
                            //设置
                            {
                                let search_options = $('<div\>');
                                let option = $('<div\>');

                                search_options.addClass('option-list');
                                option.addClass('option');


                                let source_option = option.clone();
                                let sort_option = option.clone();
                                let number_option = option.clone();

                                source_option.attr('id', 'source');
                                sort_option.attr('id', 'sort');
                                number_option.attr('id', 'number');
                                //添加项目
                                {
                                    let option_item = $('<div\>');
                                    let option_item_a = $('<a\>');

                                    option_item.append(option_item_a);
                                    option_item.addClass('item');
                                    option_item.addClass('btn');
                                    option_item.addClass('center');
                                    option_item.addClass('ellipsis');
                                    let source_option_item = option_item.clone();
                                    let sort_option_item = option_item.clone();
                                    let number_option_item = option_item.clone();
                                    //标题
                                    {
                                        addCss(`
                                    .option .title {
                                      padding-right: 4px;
                                    }`, 'OptionTitle');
                                        let option_title = $('<div\>');

                                        option_title.addClass('title');
                                        option_title.addClass('center');

                                        let source_option_title = option_title.clone();
                                        let sort_option_title = option_title.clone();
                                        let number_option_title = option_title.clone();

                                        source_option_title.text('来源');
                                        sort_option_title.text('排序');
                                        number_option_title.text('数量');

                                        source_option_item.prepend(source_option_title);
                                        sort_option_item.prepend(sort_option_title);
                                        number_option_item.prepend(number_option_title);
                                    }
                                    source_option.append(source_option_item);
                                    sort_option.append(sort_option_item);
                                    number_option.append(number_option_item);
                                    //选项
                                    {
                                        let option_ul = $('<ul\>');
                                        let option_ul_li = $('<li\>');
                                        let option_ul_li_a = $('<a\>');

                                        option_ul_li.addClass('padding');
                                        option_ul_li.addClass('center');
                                        option_ul_li.addClass('btn');
                                        option_ul_li.attr('data-color', 'black');
                                        option_ul_li.append(option_ul_li_a);

                                        let source_option_ul = option_ul.clone();
                                        let sort_option_ul = option_ul.clone();
                                        let number_option_ul = option_ul.clone();

                                        for (let key in source) {
                                            source_option_ul.append(option_ul_li.clone().children('a').text(key)
                                                .attr('data-type', 'source').attr('data-search', key).parent());
                                        }
                                        for (let key in sort) {
                                            switch (key) {
                                                case sort.default:
                                                    sort_option_ul.append(option_ul_li.clone().children('a').text(sort_cn.default)
                                                        .attr('data-type', 'sort').attr('data-search', key).parent());
                                                    break;
                                                case sort.danmaku:
                                                    sort_option_ul.append(option_ul_li.clone().children('a').text(sort_cn.danmaku)
                                                        .attr('data-type', 'sort').attr('data-search', key).parent());
                                                    break;
                                                case sort.view:
                                                    sort_option_ul.append(option_ul_li.clone().children('a').text(sort_cn.view)
                                                        .attr('data-type', 'sort').attr('data-search', key).parent());
                                                    break;
                                                case sort.pubdate:
                                                    sort_option_ul.append(option_ul_li.clone().children('a').text(sort_cn.pubdate)
                                                        .attr('data-type', 'sort').attr('data-search', key).parent());
                                                    break;
                                            }
                                        }

                                        number_option_ul.append(option_ul_li.clone().children('a').text('5个/页')
                                            .attr('data-type', 'number').attr('data-search', '5').parent());
                                        number_option_ul.append(option_ul_li.clone().children('a').text('10个/页')
                                            .attr('data-type', 'number').attr('data-search', '10').parent());
                                        number_option_ul.append(option_ul_li.clone().children('a').text('15个/页')
                                            .attr('data-type', 'number').attr('data-search', '15').parent());
                                        number_option_ul.append(option_ul_li.clone().children('a').text('20个/页')
                                            .attr('data-type', 'number').attr('data-search', '20').parent());

                                        source_option.append(source_option_ul);
                                        sort_option.append(sort_option_ul);
                                        number_option.append(number_option_ul);

                                        let showed;
                                        body.on('click', '.option-list>.option>.item', function () {
                                            $(this).next('ul').addClass('show');
                                            showed = $(this).next('ul');
                                            body.one('click', function (e) {
                                                $('.option-list>.option>ul.show').each(function () {
                                                    if ($(this).html() !== showed.html()
                                                        || $(e.target).parents('.option').length === 0) {
                                                        $(this).removeClass('show');
                                                    }
                                                });
                                            })
                                        });
                                        $.ripple('.option-list>.option>ul>li', {
                                            multi: true
                                        });
                                        body.on('click', '.option-list>.option>ul>li', function (e) {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            switch ($(this).children('a').attr('data-type')) {
                                                case 'source':
                                                    search_data.source = $(this).children('a').attr('data-search');
                                                    break;
                                                case 'sort':
                                                    search_data.sort = $(this).children('a').attr('data-search');
                                                    break;
                                                case 'number':
                                                    search_data.number = $(this).children('a').attr('data-search');
                                                    break;
                                            }
                                            if (search_data.source === source.biliplus) {
                                                number_option_ul.hide();
                                                number_option_item.children('a').text('20个/页');
                                            } else {
                                                number_option_ul.show();
                                                number_option_item.children('a').text(search_data.number + '个/页');
                                            }
                                            source_option_item.children('a').text(search_data.source);
                                            switch (search_data.sort) {
                                                case sort.default:
                                                    sort_option_item.children('a').text(sort_cn.default);
                                                    break;
                                                case sort.danmaku:
                                                    sort_option_item.children('a').text(sort_cn.danmaku);
                                                    break;
                                                case sort.view:
                                                    sort_option_item.children('a').text(sort_cn.view);
                                                    break;
                                                case sort.pubdate:
                                                    sort_option_item.children('a').text(sort_cn.pubdate);
                                                    break;
                                            }
                                        });
                                    }
                                    source_option_item.children('a').text(search_data.source);
                                    switch (search_data.sort) {
                                        case sort.default:
                                            sort_option_item.children('a').text(sort_cn.default);
                                            break;
                                        case sort.danmaku:
                                            sort_option_item.children('a').text(sort_cn.danmaku);
                                            break;
                                        case sort.view:
                                            sort_option_item.children('a').text(sort_cn.view);
                                            break;
                                        case sort.pubdate:
                                            sort_option_item.children('a').text(sort_cn.pubdate);
                                            break;
                                    }
                                    number_option_item.children('a').text(search_data.number + '个/页');
                                }
                                search_options.append(source_option);
                                search_options.append(sort_option);
                                search_options.append(number_option);
                                search_options_container.append(search_options);
                            }
                            search_card.append(search_textbox_container);
                            search_card.append(search_options_container);
                            content.append(search_card);
                        }
                        //结果
                        {
                            let search_content = $('<div\>');

                            search_content.attr('id', 'search-content');
                            //卡片
                            {
                                var result_card = $('<div\>');
                                let result_card_content = $('<div\>');
                                let result_card_img = $('<div\>');
                                let result_card_text = $('<div\>');
                                result_card_content.addClass('container');
                                result_card.addClass('card');
                                result_card_img.addClass('img');
                                result_card_text.addClass('card-text');
                                result_card_text.addClass('padding');
                                //文本
                                {
                                    let result_card_text_title = $('<a\>');
                                    let result_card_text_author = $('<span\>');
                                    let result_card_text_description = $('<span\>');
                                    let result_card_text_click = $('<span\>');
                                    let result_card_text_danmu = $('<span\>');
                                    let result_card_text_sign = $('<span\>');

                                    result_card_text_title.addClass('title');
                                    result_card_text_title.addClass('ellipsis');
                                    result_card_text_description.addClass('text');
                                    result_card_text_click.addClass('text');
                                    result_card_text_danmu.addClass('text');
                                    result_card_text_click.addClass('description');
                                    result_card_text_danmu.addClass('description');

                                    result_card_text_description.attr('id', 'description');
                                    result_card_text_click.attr('id', 'click');
                                    result_card_text_danmu.attr('id', 'danmu');
                                    result_card_text_author.attr('id', 'author');

                                    result_card_text.append(result_card_text_title);
                                    result_card_text.append(result_card_text_author);
                                    result_card_text.append(result_card_text_click);
                                    result_card_text.append(result_card_text_danmu);
                                    result_card_text.append(result_card_text_description);
                                    result_card_text.append(result_card_text_click);
                                    result_card_text.append(result_card_text_danmu);
                                    result_card_text.append(result_card_text_sign);
                                }
                                result_card_text.addClass('card-text');
                                result_card.append(result_card_img);
                                result_card_content.append(result_card_text);
                                result_card.append(result_card_content);
                            }
                            content.append(search_content);
                            //更多
                            {
                                addCss(`
                                  #more {
                                    font-size: 3rem;
                                    width: 100%;
                                  }
                                `, 'More');

                                let search_content_more = $('<div\>');
                                let search_content_more_a = $('<a\>');

                                search_content_more.addClass('center');
                                search_content_more.addClass('container');
                                search_content_more_a.attr('id', 'more');
                                search_content_more_a.addClass('btn');
                                search_content_more_a.addClass('material-icons');
                                search_content_more_a.text('more_horiz');

                                search_content_more.append(search_content_more_a);
                                content.append(search_content_more);

                                let page = 1;
                                search_content_more.click(function () {
                                    addSnackBar('加载中...');
                                    getjson('/api/search_api?source=' + getUrlParam('source')
                                        + '&o=' + getUrlParam('o')
                                        + '&n=' + getUrlParam('n')
                                        + '&word=' + getUrlParam('word')
                                        + '&p=' + (++page), addSearchResult);
                                });
                                //回到顶部
                                {
                                    let buttom = $('<div\>');
                                    let buttom_button = $('<button\>');
                                    let buttom_text = $('<span\>');
                                    let buttom_top = buttom_button.clone();
                                    {
                                        buttom.addClass('container');
                                        buttom.addClass('action');
                                        buttom_button.addClass('action');
                                        buttom_button.addClass('btn');
                                        buttom_text.addClass('material-icons');
                                        buttom_top = buttom_button.clone();

                                        buttom_top.append(buttom_text.clone().text('arrow_upward'));
                                        buttom_top.hide();
                                        buttom.append(buttom_top);
                                    }

                                    $(window).scroll(function () {
                                        if ($(window).scrollTop() >= 120) {
                                            buttom_top.show();
                                        } else {
                                            buttom_top.fadeOut(350);
                                        }
                                    });
                                    buttom_top.click(function () {
                                        $('html, body').animate({scrollTop: '0'}, 500);
                                    });
                                    content.append(buttom);
                                }
                            }
                            waterfall = unsafeWindow.$('#search-content').waterfall();

                            addSnackBar('加载中...');
                            getjson('/api/search_api?source=' + getUrlParam('source')
                                + '&o=' + getUrlParam('o')
                                + '&n=' + getUrlParam('n')
                                + '&word=' + getUrlParam('word'), addSearchResult);
                        }

                        //选项宽度
                        $('.option-list>.option>ul').each(function () {
                            $(this).css('width', $(this).parent('.option').width());
                        });

                        //搜索卡片瀑布
                        $(window).resize(function () {
                            setTimeout(function () {
                                waterfall.reflow();
                            }, 300);
                        });
                    }
                    //关注
                    else if (location.href.indexOf('/me/attention/') !== -1) {
                        nav_title.text('我的关注');
                        //TODO 内容
                    }
                    //番剧
                    else if (location.href.indexOf('/bangumi/i/') !== -1) {
                        {
                            //信息
                            {
                                addCss(`
                                #cover {
                                  width: 225px;
                                  height: 300px;
                                  min-width: 225px;
                                  border-radius: 2px;
                                }
                                #action {
                                  padding-left: 12px;
                                  padding-right: 12px;
                                }
                                #info {
                                  display: flex;
                                }
                                #info>.container:before {
                                  display: none;
                                }
                                #count {
                                  padding-top: 16px;
                                  padding-bottom: 16px; 
                                }
                                #type {
                                  margin-right: 4px;
                                }
                                .bangumi-data {
                                  font-size: 0.785em;
                                  border-radius: 12px;
                                  height: 24px;
                                  display: flex;
                                  padding: 0 16px;
                                  margin-left: 4px;
                                  margin-right: 4px;
                                  background-color: rgba(0, 145, 248, 0.87);
                                  color: #fff;
                                }
                                #favorite {
                                  color:  #d04d74;
                                }
                                #desc {
                                  font-size: 14px;
                                  max-height: 80px;
                                  line-height: 20px;
                                  overflow: hidden;
                                }
                                #title {
                                  margin-bottom: 4px;
                                  min-height: 0;
                                  align-items: baseline;
                                  display: block;
                                }
                                #title>h2 {
                                  margin-right: 4px;
                                }
                                #text {
                                  height: calc(100% - 48px);
                                }
                                #info>.container {
                                  max-width: calc(100% - 225px);
                                }
                                @media(max-width: 680px) {
                                  #info>.container {
                                    display: block;
                                    max-width: 100%;
                                  }
                                  #info {
                                    width: 100%;
                                    display: block;
                                  }
                                  #cover {
                                    width: 100%;
                                    height: auto;
                                  }
                                  #desc {
                                    max-height: none;
                                  }
                                  #count {
                                    justify-content: space-around;
                                    width: 100%;
                                  }
                                  .bangumi-data {
                                    border-right: none;
                                    font-size: 0.785em;
                                    width: auto;
                                    padding: 0 8px;
                                  }
                                  .bangumi-data:first-child {
                                    width: auto;
                                  }
                                }
                                `, 'Bangumi');
                            }
                            //季
                            {
                                addCss(`
                                #seasons {
                                  min-height: 48px;
                                  height: 36px;
                                  border-radius: 2px;
                                  background-color: rgb(255, 255, 255);
                                  margin-bottom: 48px;
                                  overflow-x: auto;
                                  
                                }
                                .season {
                                  border-bottom: 4px solid rgb(164, 176, 190);
                                  padding-left: 16px;
                                  padding-right: 16px;
                                  max-width: 200px;
                                  width: 100%;
                                  align-items: center;
                                  justify-content: center;
                                  overflow: visible;
                                }
                                .season.active {
                                  border-bottom: 4px solid rgb(0, 145, 248);
                                }
                                .season>.text {
                                  font-size: 18px;
                                  /*text-indent: 12px;*/
                                }
                                @media(max-width: 680px) {
                                  .season {
                                    
                                  }
                                }
                                /*
                                .season:after {
                                  content: '';
                                  height: 13.6px;
                                  width: 13.6px;
                                  border-radius: 50%;
                                  position: absolute;
                                  margin-top: 9px;
                                  background-color: rgb(164, 176, 190);
                                  margin-left: -22.8px;
                                }
                                .season.active:after {
                                  background-color: rgb(0, 145, 248);
                                }
                                .season:before {
                                  content: '';
                                  height: 20px;
                                  width: 20px;
                                  border-radius: 50%;
                                  position: absolute;
                                  background-color: #fff;
                                  margin-top: 12px;
                                  margin-left: -26px;
                                  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2);
                                }
                                */`, 'Season');
                            }
                            let seasons = $('<div\>');
                            seasons.addClass('container');
                            seasons.addClass('card');
                            seasons.attr('id', 'seasons');

                            let bangumi_id = location.href.match(/\d+/) + '';
                            let bangumi_data;
                            NProgress.start();
                            addSnackBar('加载中...');
                            let refreshInfo = function (data) {
                                seasons.children().remove();
                                content.children().remove();
                                if (data.code === 0 && data.result) {
                                    bangumi_data = data.result;
                                    nav_title.text(bangumi_data.title);
                                    if (bangumi_data.seasons.length > 1) {
                                        //分季
                                        {
                                            let season = $('<div\>');
                                            let season_text = $('<a\>');
                                            season.addClass('season');
                                            season.addClass('btn');
                                            season_text.addClass('ellipsis');
                                            season_text.addClass('text');
                                            season.append(season_text);
                                            let f = true;
                                            bangumi_data.seasons.forEach(function (e) {
                                                let season_clone = season.clone();
                                                season_clone.children().text(e.title);
                                                season_clone.children().attr('href', '/bangumi/i/' + e.season_id);
                                                if (f) season_clone.addClass('active');
                                                if (e.season_id === bangumi_id) {
                                                    season_clone.addClass('focus');
                                                    f = false;
                                                }
                                                seasons.append(season_clone);
                                                season_clone.click(function () {
                                                    location.href = season_clone.children().attr('href');
                                                });
                                            });
                                            content.append(seasons);
                                        }
                                    }
                                    //番剧信息
                                    {
                                        let bangumi_info = $('<div\>');
                                        let bangumi_info_content = $('<div\>');
                                        let bangumi_cover = $('<img\>');
                                        let bangumi_text = $('<div\>');

                                        let action = $('<div\>');

                                        bangumi_info.addClass('card');
                                        bangumi_info_content.addClass('container');
                                        bangumi_info_content.addClass('column');
                                        bangumi_text.addClass('padding');
                                        bangumi_text.addClass('mid');

                                        bangumi_cover.attr('id', 'cover');
                                        bangumi_text.attr('id', 'text');
                                        bangumi_info.attr('id', 'info');

                                        //文本
                                        {
                                            //标题
                                            {
                                                let bangumi_title = $('<div\>');
                                                let bangumi_title_cn = $('<h2\>');
                                                let bangumi_title_raw = $('<b\>');
                                                let bangumi_alias = $('<em\>');
                                                bangumi_alias.addClass('description');
                                                bangumi_alias.addClass('ellipsis');
                                                bangumi_title.addClass('container');
                                                bangumi_title_cn.addClass('ellipsis');
                                                bangumi_title_raw.addClass('description');
                                                bangumi_title_raw.addClass('ellipsis');
                                                bangumi_title.attr('id', 'title');

                                                bangumi_title_cn.text((bangumi_data.is_finish === '1' ? '【完结】' : '')
                                                    + bangumi_data.title);
                                                if (bangumi_data.is_finish === '1')
                                                    bangumi_title_cn.css('margin-left', '-12px');
                                                bangumi_title_raw.text(bangumi_data.jp_title);
                                                bangumi_alias.text(bangumi_data.alias);
                                                bangumi_title.append(bangumi_title_cn);
                                                bangumi_title.append(bangumi_title_raw);
                                                bangumi_text.append(bangumi_title);
                                                bangumi_text.append(bangumi_alias);
                                            }

                                            //数据
                                            let bangumi_count_container = $('<div\>');
                                            bangumi_count_container.addClass('container');
                                            bangumi_count_container.attr('id', 'count');
                                            {
                                                let bangumi_count = $('<div\>');
                                                let bangumi_count_type = $('<b\>');
                                                let bangumi_count_num = $('<span\>');
                                                bangumi_count.append(bangumi_count_type);
                                                bangumi_count_type.attr('id', 'type');
                                                bangumi_count.addClass('center');
                                                bangumi_count.append(bangumi_count_num);
                                                bangumi_count.addClass('bangumi-data');
                                                {
                                                    let bangumi_count_play = bangumi_count.clone();
                                                    bangumi_count_play.children('b').text('播放量');
                                                    bangumi_count_play.children('span').text(
                                                        bangumi_data.play_count > 1e4 - 1
                                                            ? bangumi_data.play_count > 1e8 - 1
                                                            ? Math.floor(bangumi_data.play_count / 1e8 * 10) / 10 + '亿'
                                                            : Math.floor(bangumi_data.play_count / 1e4 * 10) / 10 + '万'
                                                            : bangumi_data.play_count);
                                                    bangumi_count_container.append(bangumi_count_play);

                                                    let bangumi_count_fav = bangumi_count.clone();
                                                    bangumi_count_fav.children('b').text('追番数');
                                                    bangumi_count_fav.children('span').text(
                                                        bangumi_data.favorites > 1e4 - 1
                                                            ? bangumi_data.favorites > 1e8 - 1
                                                            ? Math.floor(bangumi_data.favorites / 1e8 * 10) / 10 + '亿'
                                                            : Math.floor(bangumi_data.favorites / 1e4 * 10) / 10 + '万'
                                                            : bangumi_data.favorites);
                                                    bangumi_count_container.append(bangumi_count_fav);

                                                    let bangumi_count_danmaku = bangumi_count.clone();
                                                    bangumi_count_danmaku.children('b').text('弹幕数');
                                                    bangumi_count_danmaku.children('span').text(
                                                        bangumi_data.danmaku_count > 1e4 - 1
                                                            ? bangumi_data.danmaku_count > 1e8 - 1
                                                            ? Math.floor(bangumi_data.danmaku_count / 1e8 * 10) / 10 + '亿'
                                                            : Math.floor(bangumi_data.danmaku_count / 1e4 * 10) / 10 + '万'
                                                            : bangumi_data.danmaku_count);
                                                    bangumi_count_container.append(bangumi_count_danmaku);
                                                }
                                            }

                                            //介绍
                                            let bangumi_desc = $('<div\>');
                                            bangumi_desc.attr('id', 'desc');
                                            {
                                                let bangumi_desc_text = $('<span\>');
                                                bangumi_desc_text.text(bangumi_data.evaluate);
                                                bangumi_desc.append(bangumi_desc_text);
                                            }

                                            bangumi_text.append(bangumi_count_container);
                                            bangumi_text.append(bangumi_desc);
                                        }
                                        //底部
                                        {
                                            let action_space = $('<div\>');
                                            action.addClass('container');
                                            action.addClass('center');
                                            action.attr('id', 'action');
                                            action_space.addClass('flex-whitespace');

                                            //标签
                                            {
                                                addCss(`
                                                .tag {
                                                  border-radius: 14px;
                                                  background-color: rgba(0, 145, 248, 0.87);
                                                  height: 28px;
                                                  cursor: default;
                                                  display: inline-block;
                                                  margin: 2px 4px;
                                                  white-space: nowrap;
                                                  -webkit-user-select: none;
                                                  -moz-user-select: none;
                                                  -ms-user-select: none;
                                                  user-select: none;
                                                  color: #fff;
                                                }
                                                .tag .text {
                                                  display: inline-block;
                                                  height: 28px;
                                                  padding-right: 12px;
                                                  padding-left: 12px;
                                                  font-size: 14px;
                                                  line-height: 28px;
                                                  vertical-align: middle;
                                                }`, 'Tag');
                                                let tag = $('<div\>');
                                                let tag_text = $('<span\>');
                                                tag.addClass('tag');
                                                tag_text.addClass('text');
                                                tag.append(tag_text);

                                                bangumi_data.tags.forEach(function (e) {
                                                    let tag_clone = tag.clone();
                                                    tag_clone.children().text(e.tag_name);
                                                    action.append(tag_clone);
                                                });
                                            }
                                            action.append(action_space);

                                            //动作
                                            {
                                                let fav = icon.clone();
                                                fav.addClass('mid');
                                                fav.attr('id', 'favorite');
                                                fav.addClass('btn');
                                                if (!loginInfo.isLogin) fav.addClass('disable');
                                                action.append(fav);
                                                $.getJSON('/me/bangumi/action/check/sid/' + bangumi_data.season_id, function (e) {
                                                    if (e.code === 0) {
                                                        if (e.result.attention === '0')
                                                            fav.children().text('favorite_border');
                                                        else if (e.result.attention === '1') {
                                                            fav.children().text('favorite');
                                                        }
                                                        console.log(fav.children());
                                                    } else {
                                                        addSnackBar(e.message + '[' + e.code + ']');
                                                    }
                                                });
                                                fav.click(function () {
                                                    $.getJSON('/me/bangumi/action/check/sid/' + bangumi_data.season_id, function (e) {
                                                        if (e.code === 0) {
                                                            if (e.result.attention === '0') {
                                                                $.getJSON('/me/bangumi/action/add/sid/' + bangumi_data.season_id, function (e) {
                                                                    if (e.code === 0) {
                                                                        fav.children().text('favorite');
                                                                        addSnackBar('追番成功');
                                                                    } else {
                                                                        addSnackBar(e.message + '[' + e.code + ']');
                                                                    }
                                                                });
                                                            } else {
                                                                $.getJSON('/me/bangumi/action/del/sid/' + bangumi_data.season_id, function (e) {
                                                                    if (e.code === 0) {
                                                                        fav.children().text('favorite_border');
                                                                        addSnackBar('弃番达成');
                                                                    } else {
                                                                        addSnackBar(e.message + '[' + e.code + ']');
                                                                    }
                                                                });
                                                            }
                                                        } else {
                                                            addSnackBar(e.message + '[' + e.code + ']');
                                                        }
                                                    });
                                                });
                                            }

                                        }

                                        bangumi_info_content.append(bangumi_text);
                                        bangumi_info_content.append(action);
                                        bangumi_info.append(bangumi_cover);
                                        bangumi_info.append(bangumi_info_content);
                                        content.append(bangumi_info);
                                        $('<img/>').attr('src', bangumi_data.cover.replace(/https?:/, 'https:')).load(function () {
                                            $(this).remove(); // prevent memory leaks as @benweet suggested
                                            bangumi_cover.attr('src', bangumi_data.cover.replace(/https?:/, 'https:'));
                                            NProgress.done();
                                        });
                                    }
                                    //番剧集数
                                    {
                                        addCss(`
                                        .videos.container {
                                          flex-wrap: wrap;
                                          margin-bottom: 24px;
                                        }
                                        .videos .card {
                                          margin: 6px;
                                          width: 272px;
                                        }
                                        .videos .card img {
                                          width: 160px;
                                          height: auto;
                                        }
                                        @media(max-width: 620px) {
                                          .videos .card {
                                            margin: 0;
                                            margin-bottom: 6px;
                                            margin-top: 6px;
                                            width: 100%;
                                          }
                                        }`, 'Videos');
                                        let container = $('<div\>');
                                        container.addClass('container');
                                        container.addClass('videos');
                                        //卡片
                                        {
                                            let card = $('<div\>');
                                            let card_content = $('<div\>');
                                            let card_img = $('<img\>');
                                            let card_text = $('<div\>');
                                            let card_title = $('<a\>');
                                            let card_desc = $('<p\>');

                                            card.addClass('card');
                                            card_content.addClass('container');
                                            card_title.addClass('ellipsis');
                                            card_text.addClass('card-text');
                                            card_text.addClass('padding');
                                            card_text.addClass('ellipsis');
                                            card_desc.addClass('description');

                                            card_text.append(card_title);
                                            card_text.append(card_desc);

                                            card_content.append(card_img);
                                            card_content.append(card_text);

                                            card.append(card_content);
                                            {
                                                bangumi_data.episodes.forEach(function (e) {
                                                    let card_clone = card.clone();
                                                    card_clone.find('a').text(e.index_title);
                                                    card_clone.find('a').attr('title', e.index_title);
                                                    card_clone.find('a').attr('href', '/av' + e.av_id);
                                                    card_clone.find('p').text('第' + e.index + '话')
                                                    $('<img/>').attr('src', (e.cover + '@w160.jpg').replace(/https?:/, 'https:')).load(function () {
                                                        $(this).remove(); // prevent memory leaks as @benweet suggested
                                                        card_clone.find('img').attr('src', (e.cover + '@w160.jpg').replace(/https?:/, 'https:'));
                                                        card_clone.find('img').addClass('active');
                                                        card_clone.find('img').addClass('btn');
                                                        card_clone.find('img').attr('href', '/av' + e.av_id);
                                                        card_clone.find('img').click(function () {
                                                            location.href = $(this).attr('href');
                                                        });
                                                    });
                                                    container.append(card_clone);
                                                });
                                            }
                                        }
                                        content.append(container);
                                    }
                                    if (bangumi_data.staff !== '' && bangumi_data.cast !== '') {
                                        //Staff&Cast
                                        {
                                            {
                                                addCss(`
                                            .card.staff .card-text {
                                              width: 50%;
                                            }`, 'Staff');
                                            }

                                            let card = $('<div\>');
                                            let card_content = $('<div\>');
                                            let card_text_staff = $('<div\>');
                                            let card_text_cast = $('<div\>');

                                            card.addClass('card');
                                            card.addClass('staff');
                                            card_content.addClass('container');
                                            card_text_staff.addClass('padding');
                                            card_text_staff.addClass('mid');
                                            card_text_staff.addClass('card-text');
                                            card_text_cast.addClass('padding');
                                            card_text_cast.addClass('mid');
                                            card_text_cast.addClass('card-text');

                                            if (bangumi_data.staff !== '') {
                                                let staff = $('<h3\>');
                                                staff.text('Staff');
                                                card_text_staff.append(staff);
                                                //staff
                                                {
                                                    bangumi_data.staff.split('\n').forEach(function (e) {
                                                        let staff_row = $('<p\>');
                                                        staff_row.text(e);
                                                        card_text_staff.append(staff_row);
                                                    });
                                                }
                                            }
                                            if (bangumi_data.cast !== '') {
                                                let cast = $('<h3\>');
                                                cast.text('Cast');
                                                card_text_cast.append(cast);
                                                //cast
                                                {
                                                    bangumi_data.actor.forEach(function (e) {
                                                        let cast_row = $('<p\>');
                                                        cast_row.text(e.role + '：' + e.actor);
                                                        card_text_cast.append(cast_row);
                                                    })
                                                }
                                            }
                                            card_content.append(card_text_staff);
                                            card_content.append(card_text_cast);
                                            card.append(card_content);
                                            content.append(card);
                                        }
                                    }
                                    //回到顶部
                                    {
                                        let buttom = $('<div\>');
                                        let buttom_button = $('<button\>');
                                        let buttom_text = $('<span\>');
                                        let buttom_top = buttom_button.clone();
                                        {
                                            buttom.addClass('container');
                                            buttom.addClass('action');
                                            buttom_button.addClass('action');
                                            buttom_button.addClass('btn');
                                            buttom_text.addClass('material-icons');
                                            buttom_top = buttom_button.clone();

                                            buttom_top.append(buttom_text.clone().text('arrow_upward'));
                                            buttom_top.hide();
                                            buttom.append(buttom_top);
                                        }

                                        $(window).scroll(function () {
                                            if ($(window).scrollTop() >= 120) {
                                                buttom_top.show();
                                            } else {
                                                buttom_top.fadeOut(350);
                                            }
                                        });
                                        buttom_top.click(function () {
                                            $('html, body').animate({scrollTop: '0'}, 500);
                                        });
                                        content.append(buttom);
                                    }
                                    addSnackBar('加载成功');
                                } else {
                                    addSnackBar(data.message + '[' + data.code + ']');
                                }
                            };
                            getjson('/api/bangumi?season=' + bangumi_id, refreshInfo);
                        }
                    }
                    //视频
                    else if (location.href.indexOf('/video/av') !== -1) {
                        {
                            addCss(`
                            #title {
                              margin-bottom: 16px;
                              min-height: 0;
                              align-items: baseline;
                              display: block;
                              cursor: default;
                            }
                            #type {
                              margin-right: 4px;
                              font-size: inherit;
                            }
                            #desc {
                              word-break: break-word;
                            }
                            #count {
                              min-height: 0;
                              width: auto;
                            }
                            #data {
                              min-height: 0;
                              align-items: baseline;
                            }
                            #data>#create {
                              margin-left: 8px;
                            }
                            .video-data {
                              font-size: 0.785em;
                              border-radius: 4px;
                              height: 24px;
                              display: flex;
                              padding: 0px 8px;
                              margin-left: 4px;
                              margin-right: 4px;
                              background-color: rgba(140, 140, 140, 0.87);
                              color: #fff;
                            }
                            .tags {
                              flex-wrap: wrap;
                              min-height: 0;
                            }
                            .tags>.tag {
                              border-radius: 12px;
                              border: solid 1px rgba(0,0,0,0.54);
                              transition: 125ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
                              line-height: 18px;
                              height: 20px;
                              margin-right: 8px;
                              margin-bottom: 2px;
                              margin-top: 2px;
                              padding: 0 12px;
                              white-space: nowrap;
                              -webkit-user-select: none;
                              -moz-user-select: none;
                              -ms-user-select: none;
                              user-select: none;
                              color: rgba(0,0,0,0.87);
                              font-size: 0.785rem;
                            }
                            .tag:first-child {
                              margin-left: 0;
                            }
                            .tags>.tag:hover {
                              border-color: rgba(0, 145, 248, 0.87);
                            }
                            @media(max-width: 800px) {
                              #data {
                                flex-direction: column;
                              }
                              #count {
                                justify-content: flex-end;
                                margin-top: 4px;
                              }
                            }
                            .action.btn#favorite.active {
                              color: rgb(243, 156, 18);
                            }
                            `, 'Video');
                        }
                        let video_data;

                        let action = $('<div\>');
                        action.attr('id', 'action');
                        action.addClass('action');
                        action.addClass('container');

                        let action_button = $('<button\>');
                        let button_text = $('<span\>');
                        action_button.append(button_text);
                        button_text.addClass('material-icons');
                        action_button.addClass('action');
                        action_button.addClass('btn');

                        let refreshVideo = function (data) {
                            content.children().remove();
                            action.children().remove();
                            NProgress.start();
                            addSnackBar('加载中...');
                            if (!data.code) {
                                video_data = data;

                                nav_title.text('[' + video_data.typename + ']' + video_data.title);

                                let video_info = $('<div\>');
                                video_info.addClass('container');
                                //视频信息
                                {
                                    let info_card = $('<div\>');
                                    let info_card_text = $('<div\>');
                                    info_card.addClass('card');
                                    info_card.attr('id', 'info');
                                    info_card_text.addClass('padding');
                                    info_card_text.addClass('mid');
                                    info_card_text.attr('id', 'text');
                                    {
                                        let info_title = $('<h2\>');
                                        info_title.attr('id', 'title');
                                        info_title.addClass('container');
                                        info_title.addClass('ellipsis');
                                        info_title.text(video_data.title);
                                        info_title.attr('title', video_data.title);

                                        let info_row = $('<div\>');
                                        info_row.attr('id', 'data');
                                        info_row.addClass('container');

                                        let info_up = $('<a\>');
                                        info_up.text('UP: ' + video_data.author);
                                        info_up.attr('href', '/space/' + video_data.mid);
                                        let info_time = $('<span\>');
                                        info_time.addClass('description');
                                        info_time.attr('id', 'create');
                                        info_time.text('投递时间：' + video_data.created_at);
                                        let info_count = $('<div\>');
                                        info_count.addClass('container');
                                        info_count.attr('id', 'count');
                                        {
                                            let video_count = $('<div\>');
                                            video_count.addClass('video-data');
                                            video_count.addClass('center');

                                            let video_count_type = $('<span\>');
                                            video_count_type.addClass('material-icons');
                                            video_count_type.attr('id', 'type');

                                            let video_count_num = $('<span\>');
                                            video_count_num.attr('id', 'number');

                                            video_count.append(video_count_type);
                                            video_count.append(video_count_num);
                                            {
                                                //播放量
                                                let video_count_play = video_count.clone();
                                                video_count_play.children('#type').text('play_arrow');
                                                video_count_play.children('#number').text(
                                                    video_data.play > 1e4 - 1
                                                        ? video_data.play > 1e8 - 1
                                                        ? Math.floor(video_data.play / 1e8 * 10) / 10 + '亿'
                                                        : Math.floor(video_data.play / 1e4 * 10) / 10 + '万'
                                                        : video_data.play);
                                                info_count.append(video_count_play);
                                                //弹幕
                                                let video_count_danmaku = video_count.clone();
                                                video_count_danmaku.children('#type').text('question_answer');
                                                video_count_danmaku.children('#number').text(
                                                    video_data.video_review > 1e4 - 1
                                                        ? video_data.video_review > 1e8 - 1
                                                        ? Math.floor(video_data.video_review / 1e8 * 10) / 10 + '亿'
                                                        : Math.floor(video_data.video_review / 1e4 * 10) / 10 + '万'
                                                        : video_data.video_review);
                                                info_count.append(video_count_danmaku);
                                                //收藏
                                                let video_count_fav = video_count.clone();
                                                video_count_fav.children('#type').text('star');
                                                video_count_fav.children('#number').text(
                                                    video_data.favorites > 1e4 - 1
                                                        ? video_data.favorites > 1e8 - 1
                                                        ? Math.floor(video_data.favorites / 1e8 * 10) / 10 + '亿'
                                                        : Math.floor(video_data.favorites / 1e4 * 10) / 10 + '万'
                                                        : video_data.favorites);
                                                info_count.append(video_count_fav);
                                                //硬币
                                                let video_count_coin = video_count.clone();
                                                video_count_coin.children('#type').text('monetization_on');
                                                video_count_coin.children('#number').text(
                                                    video_data.coins > 1e4 - 1
                                                        ? video_data.coins > 1e8 - 1
                                                        ? Math.floor(video_data.coins / 1e8 * 10) / 10 + '亿'
                                                        : Math.floor(video_data.coins / 1e4 * 10) / 10 + '万'
                                                        : video_data.coins);
                                                info_count.append(video_count_coin);
                                            }
                                        }
                                        info_card_text.append(info_title);
                                        info_row.append(info_up);
                                        info_row.append(info_time);
                                        info_row.append(whitespace.clone());
                                        info_row.append(info_count);
                                        info_card_text.append(info_row);
                                    }
                                    info_card.append(info_card_text);
                                    video_info.append(info_card);
                                }
                                content.append(video_info);
                                //视频
                                let video = $('<div\>');
                                video.attr('id','player_container');
                                //TODO 严格按照格式来一波 脑壳痛
                                {
                                    let player = $('<iframe\>');
                                    let page = video_data.list[0];
                                    player.attr('src', '/api/h5play-vupload.php?iframe' +
                                        '&tid=' + video_data.tid +
                                        '&cid=' + page.cid +
                                        '&type=' + page.type +
                                        '&vid=' + page.vid
                                    );
                                    video.append(player);
                                }
                                content.append(video);
                                //分页
                                {
                                    addCss(`
                                    .pages {
                                      flex-wrap: wrap;
                                    }
                                    .page {
                                      margin-right: 16px;
                                    }
                                    .page:last-child {
                                      margin-right: 0;
                                    }
                                    .page .container {
                                      width: auto;
                                      min-height: 0;
                                      align-items: center;
                                      padding-left: 16px;
                                      padding-right: 16px;
                                    }
                                    .page .action>.btn {
                                      margin-left: 4px;
                                      margin-right: 4px;
                                      text-transform: none;
                                      font-size: 24px;
                                      padding: 8px;
                                      border-radius: 50%;
                                    }
                                    .page .action {
                                      padding: 0;
                                      min-height: 0;
                                    }
                                    `, 'Pages');

                                    let pages = $('<div\>');
                                    pages.addClass('container');

                                    let page = $('<div\>');
                                    page.addClass('card');
                                    page.addClass('page');
                                    let page_content = $('<div\>');
                                    page_content.addClass('padding');
                                    page_content.addClass('container');
                                    page.append(page_content);
                                    let page_title = $('<span\>');
                                    page_title.addClass('ellipsis');
                                    page_content.append(page_title);
                                    page_content.append(whitespace.clone());
                                    let page_action = $('<div\>');
                                    page_action.addClass('action');
                                    page_content.append(page_action);
                                    let page_action_button = $('<button\>');
                                    page_action_button.addClass('btn');
                                    page_action_button.addClass('circle');
                                    page_action_button.addClass('material-icons');

                                    //播放
                                    let page_action_button_play = page_action_button.clone();
                                    page_action_button_play.text('play_arrow');
                                    page_action_button_play.attr('id', 'play');
                                    page_action.append(page_action_button_play);


                                    body.on('click', '#play', function () {

                                    });

                                    //下载
                                    let page_action_button_download = page_action_button.clone();
                                    page_action_button_download.text('file_download');
                                    page_action_button_download.attr('id', 'download');
                                    page_action.append(page_action_button_download);

                                    //弹幕
                                    let page_action_button_danmaku = page_action_button.clone();
                                    page_action_button_danmaku.text('question_answer');
                                    page_action_button_download.attr('id', 'danmaku');
                                    page_action.append(page_action_button_danmaku);


                                    page_content.append(page_action);

                                    video_data.list.forEach(function (e) {
                                        let page_clone = page.clone();
                                        page_clone.attr('data-page', e.page);
                                        page_clone.attr('data-type', e.type);
                                        page_clone.attr('data-cid', e.cid);
                                        page_clone.attr('data-vid', e.vid);
                                        if (e.part === '')
                                            page_clone.children('div').children('span').text(video_data.title);
                                        else
                                            page_clone.children('div').children('span').text(e.part);
                                        pages.append(page_clone);
                                    });

                                    content.append(pages);
                                }
                                let desc_card = $('<div\>');
                                //简介
                                {
                                    desc_card.addClass('card');
                                    let desc_tags = $('<div\>');
                                    desc_tags.addClass('tags');
                                    desc_tags.addClass('container');
                                    desc_tags.addClass('padding');
                                    desc_tags.addClass('mid');

                                    let desc_tag = $('<a\>');
                                    let tag_text = $('<span\>');
                                    desc_tag.addClass('tag');
                                    desc_tag.attr('target', '_blank');
                                    desc_tag.append(tag_text);

                                    video_data.tag.split(',').forEach(function (e) {
                                        let desc_tag_clone = desc_tag.clone();
                                        desc_tag_clone.children('span').text(e);
                                        desc_tag_clone.attr('href', '/api/do.php?act=search&source=bilibili&o=default&n=20&p=1&word=' + e);
                                        desc_tags.append(desc_tag_clone);
                                    });

                                    let desc_text_container = $('<div\>');
                                    let desc_text = $('<p\>');
                                    desc_text_container.addClass('container');
                                    desc_text_container.addClass('column');
                                    desc_text_container.addClass('padding');
                                    desc_text_container.addClass('mid');
                                    desc_text_container.attr('id', 'desc');

                                    video_data.description.split('\n').forEach(function (e) {
                                        let desc_text_clone = desc_text.clone();
                                        desc_text_clone.text(e);
                                        desc_text_container.append(desc_text_clone);
                                    });
                                    desc_card.append(desc_tags);
                                    desc_card.append(desc_text_container);
                                }
                                //动作
                                {
                                    //主页
                                    {
                                        let action_home = action_button.clone();
                                        action_home.children().text('home');
                                        action_home.click(function () {
                                            window.open('https://bilibili.com/av' + video_data.id);
                                        });
                                        action.append(action_home);
                                    }
                                    //手机
                                    {
                                        let action_app = action_button.clone();
                                        action_app.children().text('phone_android');
                                        action_app.click(function () {
                                            window.open('bilibili://video/' + video_data.id);
                                        });
                                        action.append(action_app);
                                    }
                                    //投币
                                    {
                                        let action_coin = action_button.clone();
                                        action_coin.children().text('monetization_on');
                                        action_coin.click(function () {
                                            $.getJSON('/me/coin/action/throw/aid/' + video_data.id, function (data) {
                                                if (data.code === 0) {
                                                    addSnackBar('投币成功！');
                                                } else if (data.code === 34005) {
                                                    addSnackBar('投币太多啦~');
                                                } else {
                                                    addSnackBar('投币失败，' + data.message + '[' + data.code + ']');
                                                }
                                            });
                                        });
                                        action.append(action_coin);
                                    }
                                    //收藏
                                    {
                                        let action_favorite = action_button.clone();
                                        action_favorite.attr('id', 'favorite');
                                        $.getJSON('/me/favourite/action/check/av/' + video_data.id, function (data) {
                                            if (data.code === 0) {
                                                if (data.data.favoured) {
                                                    action_favorite.children().text('star');
                                                    action_favorite.addClass('active');
                                                } else {
                                                    action_favorite.children().text('star_border');
                                                    action_favorite.removeClass('active');
                                                }
                                            } else {
                                                addSnackBar('获取收藏状态失败 ' + data.message + '[' + data.code + ']');
                                                action_favorite.children().text('star_border');
                                            }
                                        });
                                        action_favorite.click(function () {
                                            $.getJSON('/me/favourite/action/check/av/' + video_data.id, function (data) {
                                                if (data.code === 0) {
                                                    if (data.data.favoured) {
                                                        $.getJSON('/me/favourite/action/dislike/av/' + video_data.id, function (data) {
                                                            if (data.code === 0) {
                                                                addSnackBar('抛弃成功');
                                                                action_favorite.removeClass('active');
                                                                action_favorite.children().text('star_border');
                                                            } else {
                                                                addSnackBar('抛弃失败，' + data.message + '[' + data.code + ']');
                                                            }
                                                        });
                                                    } else {
                                                        $.getJSON('/me/favourite/action/like/av/' + video_data.id, function (data) {
                                                            if (data.code === 0) {
                                                                addSnackBar('收藏成功');
                                                                action_favorite.addClass('active');
                                                                action_favorite.children().text('star');
                                                            } else {
                                                                addSnackBar('收藏失败，' + data.message + '[' + data.code + ']');
                                                            }
                                                        })
                                                    }
                                                } else {
                                                    addSnackBar('获取收藏状态失败 ' + data.message + '[' + data.code + ']');
                                                }
                                            });
                                        });

                                        action.append(action_favorite);
                                    }
                                    //刷新
                                    {
                                        let action_refresh = action_button.clone();
                                        action_refresh.children().text('refresh');
                                        action_refresh.click(function () {
                                            getjson('/api/view?update=1&id=' + video_id, refreshVideo);
                                        });
                                        action.append(action_refresh);
                                    }
                                    content.append(action);
                                }
                                content.append(desc_card);
                                addSnackBar('加载完成');
                            } else {
                                addSnackBar(data.message + '[' + data.code + ']');
                            }
                            NProgress.done();
                        };

                        let video_id = location.href.match(/\d+/) + '';

                        getjson('/api/view?id=' + video_id, refreshVideo);
                    }
                    //其他
                    else {
                        content.append($('#content'));
                        $('#content').removeClass("content");
                        $('#content').show();
                        head.append(css);
                    }
                }
            }
        }
        //水波效果
        {
            window.rippler = $.ripple('.sidebar a:not(.logo), .card .action a, .tab, .pages>.item, .action .btn, a.btn, .season', {
                multi: true
            });
        }
        //输入框处理
        body.on('focus', 'input, textarea', function () {
            $(this).parent('.item.input').addClass('focus');
            $(this).parent('.item.input').children('.icon').addClass('focus');

            $(this).parent('.textbox').addClass('focus');
            $(this).parent('.textbox').children('.icon').addClass('focus');
        });
        body.on('blur', 'input, textarea', function () {
            $(this).parent('.item.input').removeClass('focus');
            $(this).parent('.item.input').children('.icon').removeClass('focus');

            $(this).parent('.textbox').removeClass('focus');
            $(this).parent('.textbox').children('.icon').removeClass('focus');
        });
        //设置列处理
        {
            $('.option-list>.option').each(function () {
                $(this).css('width', $(this).parent().width() / $('.option-list>.option').length + 'px')
            });
            let showed;
            body.on('click', '.option-list>.option>.item', function () {
                $(this).next('ul').addClass('show');
                showed = $(this).next('ul');
                body.one('click', function (e) {
                    $('.option-list>.option>ul.show').each(function () {
                        if ($(this).html() !== showed.html()
                            || $(e.target).parents('.option').length === 0) {
                            $(this).removeClass('show');
                        }
                    });
                })
            });
            $.ripple('.option-list>.option>ul>li', {
                multi: true
            });
            body.on('click', '.option-list>.option>ul>li', function (e) {
                e.preventDefault();
                e.stopPropagation();
                switch ($(this).children('a').attr('data-type')) {
                    case 'source':
                        search_data.source = $(this).children('a').attr('data-search');
                        break;
                    case 'sort':
                        search_data.sort = $(this).children('a').attr('data-search');
                        break;
                    case 'number':
                        search_data.number = $(this).children('a').attr('data-search');
                        break;
                }
                if (search_data.source === source.biliplus) {
                    $(this).parents('.option-list').children('#number').children('ul').hide();
                    $(this).parents('.option-list').children('#number').children('.item').children('a').text('20个/页');
                } else {
                    $(this).parents('.option-list').children('#number').children('ul').show();
                    $(this).parents('.option-list').children('#number').children('.item').children('a').text(search_data.number + '个/页');
                }
                $(this).parents('.option-list').children('#source').children('.item').children('a').text(search_data.source);
                switch (search_data.sort) {
                    case sort.default:
                        $(this).parents('.option-list').children('#sort').children('.item').children('a').text(sort_cn.default);
                        break;
                    case sort.danmaku:
                        $(this).parents('.option-list').children('#sort').children('.item').children('a').text(sort_cn.danmaku);
                        break;
                    case sort.view:
                        $(this).parents('.option-list').children('#sort').children('.item').children('a').text(sort_cn.view);
                        break;
                    case sort.pubdate:
                        $(this).parents('.option-list').children('#sort').children('.item').children('a').text(sort_cn.pubdate);
                        break;
                }
            });
        }
        //限制整数
        body.on('input', 'input.number', function () {
            $(this).val(decodeURIComponent($(this).val()).replace(/[^\d]/g, ''));
        });
        //选项宽度
        $(window).resize(function () {
            let resizeOption = function () {
                if ($(this).width() !== $(this).parent('.option').width())
                    $(this).css('width', $(this).parent('.option').width());
            };
            $('.option-list>.option>ul').each(resizeOption);
            setTimeout(function () {
                $('.option-list>.option>ul').each(resizeOption);
            }, 200);
        });
    }
    //av号跳转
    if (location.href.match(/:\/\/www\.biliplus\.com\/av\d+/))
        location.replace(location.href.replace(/:\/\/www\.biliplus\.com\/av/, '://www.biliplus.com/video/av'));

    function advanceSearch(data) {
        location.href = 'https://www.biliplus.com/api/do.php?act=search&source=' + data.source + '&o=' + data.sort + '&n=' + data.number + '&p=1&word=' + data.word;
    }

    /**
     * 添加style到head
     * @param css css内容
     * @param name style标识
     */
    function addCss(css, name) {
        let style = $('<style\>');
        style.text(css);
        style.attr('data-meta', name);
        head.append(style);
    }

    /**
     * 搜索函数
     * @param string 搜索内容
     */
    function search(string) {
        let input = string;
        let data = {
            word: input,
            source: 'bilibili',
            sort: 'default',
            number: '20',
        };
        if (input === "") {
            return false;
        } else {
            if (input.replace(/\d+/, "") === "") {
                let con = confirm("前往投稿 av" + input + " ？");
                if (con) {
                    location.href = '/video/av' + input + '/';
                    return;
                }
                con = confirm('前往MID ' + input + ' 的UP空间？');
                if (con) {
                    location.href = "/space/" + input + '/';
                } else {
                    advanceSearch(data);
                }
            } else if (input.search(/av\d+/i) !== -1) {
                let av = input.match(/av(\d+)/i)[1];
                location.href = "/video/av" + av + "/";
            } else if (input.search(/space\.bilibili\.com\/\d+/i) !== -1) {
                let mid = input.match(/space\.bilibili\.com\/(\d+)/i)[1];
                location.href = "/space/" + mid + '/';
            } else {
                advanceSearch(data);
            }
        }
    }

    function avatarToSmall() {
        $('.nav-avatar-button.active').removeClass('active');
        $('.sidebar-user.active').removeClass('active');
        $('.sidebar-user').next('.sidebar-mask.active').removeClass('active');
        body.off('click', '.nav-avatar-button.active');
    }

    /**
     * 转换json数据
     * @param json json数据
     */
    function randomVideo(json) {
        if (json.message) {
            random_title.text(json.message);
        } else {
            random_title.attr('href', '/video/av' + json.aid + '/');
            random_title.attr('title', json.title);
            random_title.text(json.title);
            if (json.title.startsWith('【')
                || json.title.startsWith('《')
                || json.title.startsWith('（'))
                random_title.css('left', '-12px');
            else
                random_title.css('left', '0');
            random_up.attr('href', '/space/' + json.mid + '/');
            random_up.text('UP: ' + json.up);
            random_img.text('AV' + json.aid);
            $('<img/>').attr('src', json.pic.replace(/https?:/, 'https:')).load(function () {
                $(this).remove(); // prevent memory leaks as @benweet suggested
                random_img.css('background-image', 'url("' + json.pic.replace(/https?:/, 'https:') + '")');
                random_img.addClass('active');
                NProgress.done();
            });
        }
        random_action.css('display', 'flex');
    }

    function refreshBangumi() {
        NProgress.start();
        let date, date_str, passed, i, j, now = new Date();
        let dateArr = function (d) {
            var a = [d.getFullYear(), check(d.getMonth() + 1), check(d.getDate()), check(d.getHours()), check(d.getMinutes()), d.getDay(), d.getDay()];
            a[6] = a[5] == 0 ? 7 : a[5];
            return a;
        };
        for (j = 0; j < 7; j++) {
            let bangumi_tab_clone = bangumi_tab.clone();
            let bangumi_content_clone = bangumi_content.clone();
            for (i = 0; i < bangumis[j].length; i++) {
                let item = bangumis[j][i];
                if (item.lastUpdate == 0) {
                    date_str = '还未开播';
                } else {
                    passed = now - item.lastUpdate * 1e3;
                    date = dateArr(new Date(now - passed));
                    if (passed < 7 * 24 * 3600e3) {
                        if (date[6] >= now[6] && passed > 24 * 3600e3) {
                            date_str = '上|周'.split('|')[0] + week[date[5]]
                        } else {
                            date_str = week[date[5]]
                        }
                    } else {
                        date_str = date[0] + '-' + date[1] + '-' + date[2]
                    }
                    date_str += ' ' + date[3] + ':' + date[4];
                }
                let card = bangumi_card.clone();

                card.find('.title').text(item.title);
                card.find('.title').attr('href', '/bangumi/' + item.link);
                card.find('.title').attr('title', item.title);
                card.find('#last').text(date_str);
                card.find('#last').attr('title', date_str);
                if (Math.round(item.count) === item.count || !(item.count.endsWith('话') && item.count.endsWith('集')))
                    card.find('#count').text('更新至第 ' + item.count + ' 话');
                else
                    card.find('#count').text('更新至第 ' + item.count);
                card.find('#click').text('点击 ' + item.click);
                card.find('#follow').text('关注 ' + item.attention);
                $('<img/>').attr('src', item.cover.replace(/https?:/, 'https:')).load(function () {
                    $(this).remove(); // prevent memory leaks as @benweet suggested
                    card.find('.img').css('background-image', 'url("' + item.cover.replace(/https?:/, 'https:') + '")');
                    card.find('.img').addClass('active');
                    card.find('.img').attr('href', '/bangumi/' + item.link);
                    NProgress.done();
                });
                bangumi_content_clone.append(card);
            }
            bangumi_tab_clone.children('a').text(day[j]);
            bangumi_tab_clone.attr('day', j);
            bangumi_tabs.append(bangumi_tab_clone);
            bangumi_tabs_content.append(bangumi_content_clone);
            if (j === now.getDay()) {
                bangumi_tab_clone.addClass('active');
                bangumi_content_clone.addClass('active');
            }
        }
        window.scrollTo(0, 0);
    }

    //滑块
    function resizeSquare() {
        $('.square').height($('.square').parent('ul').find('.tab.active').height());
        $('.square').width($('.square').parent('ul').find('.tab.active').width());
        $('.square').css('margin-top', $('.square').parent('ul').find('.tab.active').position().top);
    }

    function sendComment(data) {
        setValue('name', data.name);
        if (data.mail === '') {
            data.notify = '0';
            setValue('mail', '');
        } else {
            if (!data.mail.match(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/)) {
                addSnackBar('邮箱格式错误');
                return false;
            } else {
                data.notify = '1';
                setValue('mail', data.mail);
            }
        }
        if (data.name === '') {
            addSnackBar('请输入用户名');
            return false;
        } else if (data.msg === '') {
            addSnackBar('请输入评论');
            return false;
        } else {
            let send_data = 'code=' + data.code + '&user=' + encodeURIComponent(data.name) + '&notify=' + data.notify + '&msg=' + encodeURIComponent(data.msg);
            if (data.notify === 1)
                send_data += '&address=' + data.mail;
            $.ajax({
                type: 'post',
                timeout: 10000, // 超时时间 10 秒
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                url: '/lyb/?act=post',
                data: send_data,
                success: function (data) {
                    let json = JSON.parse(data);
                    if (json.code != 0) {
                        addSnackBar('发送失败：[' + json.code + ']' + json.message);
                        return false;
                    } else {
                        addSnackBar('发送成功');
                        setTimeout('location.href="/lyb/"', 2000);
                        return true;
                    }
                },
                error: function (err) {
                    addSnackBar('发送失败：' + err);
                    return false;
                },
                complete: function (XMLHttpRequest, status) {
                }
            });
        }
    }

    //提示
    function addSnackBar(text) {
        let snackbar = $('<div\>');
        let snackbar_content = $('<div\>');
        let snackbar_content_text = $('<div\>');
        let snackbar_content_text_span = $('<div\>');
        snackbar.addClass('snackbar');
        snackbar_content.addClass('content');
        snackbar_content_text.addClass('text');

        snackbar_content_text_span.text(text);

        snackbar_content_text.append(snackbar_content_text_span);
        snackbar_content.append(snackbar_content_text);
        snackbar.append(snackbar_content);
        snackbars.append(snackbar);
        let removeSnackbar = function () {
            if (snackbars.children('.snackbar').length > 5) {
                let current = snackbars.children('.snackbar:first');
                current.removeClass('active');
                current.addClass('disable');
                setTimeout(function () {
                    current.remove();
                    removeSnackbar();
                }, 250);
            }
        };
        removeSnackbar();
        setTimeout(function () {
            snackbar.addClass('active');
            setTimeout(function () {
                snackbar.removeClass('active');
                snackbar.addClass('disable');
                setTimeout(function () {
                    snackbar.remove();
                }, 250);
            }, 3000);
        }, 1);
    }

    //储存
    function getValue(value, defalutValue) {
        if (typeof GM_getValue === 'function') {
            let item;
            if (typeof defalutValue !== 'undefined') {
                item = GM_getValue(value, defalutValue);
            } else {
                item = GM_getValue(value);
            }
            return item;
        } else if (typeof defalutValue !== 'undefined') {
            return GM.getValue(value, defalutValue);
        } else {
            return GM.getValue(value);
        }
    }

    function setValue(name, value) {
        if (typeof GM_getValue === 'function') {
            GM_setValue(name, value);
        } else {
            GM.setValue(name, value);
        }
    }

    function getUrlParam(name) {
        let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        let r = window.location.search.substr(1).match(reg);  //匹配目标参数
        return r ? decodeURIComponent(r[2]) : null;
    }

    function addSearchResult(json) {
        let search_content = $('#search-content');
        let items = json.data.items;
        if (json.code != 0) {
            addSnackBar('加载错误，错误代码：' + json.code + '-' + (json.message === undefined ? json.msg : json.message));
        } else {
            if (json.data.page === 1 && items.season) {
                items.season.forEach(function (e) {
                    let card = result_card.clone();
                    card.addClass('bangumi');
                    card.addClass('large');
                    card.find('.title').text(e.title);
                    card.find('.title').attr('title', e.title);
                    card.find('.title').attr('href', '/bangumi/i/' + e.param);
                    card.find('#click').text(e.finish ? '完结' : '连载中');
                    card.find('#danmu').text('共' + e.total_count + '话');

                    $('<img/>').attr('src', e.cover.replace(/https?:/, 'https:')).load(function () {
                        $(this).remove(); // prevent memory leaks as @benweet suggested
                        card.find('.img').css('background-image', 'url("' + e.cover.replace(/https?:/, 'https:') + '")');
                        card.find('.img').addClass('active');
                        card.find('.img').addClass('btn');
                        card.find('.img').attr('href', '/bangumi/i/' + e.param);
                        card.find('.img').click(function () {
                            location.href = $(this).attr('href');
                        });
                        NProgress.done();
                    });
                    search_content.append(card);
                    waterfall.reflow();
                });
            }
            if (json.data.page == 1 && items.movie) {
                items.movie.forEach(function (e) {
                    let card = result_card.clone();
                    card.addClass('bangumi');
                    card.addClass('large');
                    card.find('.title').text(e.title);
                    card.find('.title').attr('title', e.title);
                    card.find('.title').attr('href', '/av' + e.param);
                    card.find('#description').text(e.desc);
                    card.find('#click').text(e.length + '分钟');
                    card.find('#danmu').text(e.screen_date);

                    $('<img/>').attr('src', e.cover.replace(/https?:/, 'https:')).load(function () {
                        $(this).remove(); // prevent memory leaks as @benweet suggested
                        card.find('.img').css('background-image', 'url("' + e.cover.replace(/https?:/, 'https:') + '")');
                        card.find('.img').addClass('active');
                        card.find('.img').addClass('btn');
                        card.find('.img').attr('href', '/av' + e.param);
                        card.find('.img').click(function () {
                            location.href = $(this).attr('href');
                        });
                        NProgress.done();
                    });
                    search_content.append(card);
                    waterfall.reflow();
                });
            }
            if (items.archive) {
                items.archive.forEach(function (e) {
                    let card = result_card.clone();
                    card.addClass('video');
                    card.addClass('small');
                    card.addClass('padding');
                    card.find('.title').text(e.title);
                    card.find('.title').attr('title', e.title);
                    card.find('.title').attr('href', '/av' + e.param);
                    card.find('#description').text(e.desc);
                    card.find('#click').text('点击 ' + e.play);
                    card.find('#danmu').text('弹幕 ' + e.danmaku);
                    card.find('#author').text('弹幕 ' + e.author);

                    $('<img/>').attr('src', e.cover.replace(/https?:/, 'https:')).load(function () {
                        $(this).remove(); // prevent memory leaks as @benweet suggested
                        card.find('.img').css('background-image', 'url("' + e.cover.replace(/https?:/, 'https:') + '")');
                        card.find('.img').addClass('active');
                        card.find('.img').addClass('btn');
                        card.find('.img').addClass('padding');
                        card.find('.img').attr('href', '/av' + e.param);
                        card.find('.img').text('AV' + e.param);
                        card.find('.img').click(function () {
                            location.href = $(this).attr('href');
                        });
                        NProgress.done();
                    });
                    search_content.append(card);
                    waterfall.reflow();
                });
            }
        }
        addSnackBar('加载完成');
    }
})();