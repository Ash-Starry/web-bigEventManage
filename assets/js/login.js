$(function() {
    // 点击注册账号的连接
    $('#link_reg').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
      })
    
      // 点击“去登录”的链接
      $('#link_login').on('click', function() {
        $('.login-box').show()
        $('.reg-box').hide()
      })

      // 自定义校验规则
      // 从layui中获取form对象
      var form = layui.form
      var layer = layui.layer
      form.verify({
      // 通过form.verify()方法自定义校验,\S为非空字符
        pwd: [/^[\S]{6,12}$/, '密码必须6-12位,不能出现空格'],
      // 密码二次校验规则
        repwd: function(value) {
          // value为确认密码框的值,获取密码框的值进行比较
          // 不相等返回return错误提示消息
          // 通过name属性值为password拿到 value 的值,
          var pwd = $('.reg-box [name=password]').val()
          if(pwd !== value) {
            return '两次密码不一致'
          }
        }
      })

      // 监听注册表单的提交时间，监听事件
      $('#form_reg').on('submit', function(e) {
        // 阻止表单的默认提交行为
        e.preventDefault();
        var data = {username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val()}
        $.post('/api/reguser', data, function(res) {
          if(res.status !== 0) {
            return layer.msg(res.message)
          }
          layer.msg("注册成功，请登录！");
          // 模拟点击行为，注册成功后直接跳转
          $('#link_login').click()
          
        })
        
      })
      
      // 监听登录表单，登录验证
      $('#form_login').submit( function(e) {
        e.preventDefault();
        $.ajax({
          url: '/api/login',
          method: 'POST',
          data: 
            // 快速获取表单数据
            $(this).serialize(),
          success: function(res) {
            if(res.status !== 0) {
              return layer.msg('登陆失败！')
            }
            layer.msg('登陆成功！')
            console.log(res.token);
            // 将 token 的值存入本地
            localStorage.setItem('token', res.token)
            // 跳转到主页
            location.href = '/index.html'
            
          }
          
        })
      })

    })

