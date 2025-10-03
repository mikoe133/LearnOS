- [前言](https://www.cnblogs.com/dwlovelife/p/11321541.html#前言)
- JWT的数据结构
  - [Header](https://www.cnblogs.com/dwlovelife/p/11321541.html#header)
  - [Payload](https://www.cnblogs.com/dwlovelife/p/11321541.html#payload)
  - [Signature](https://www.cnblogs.com/dwlovelife/p/11321541.html#signature)
  - [Base64URL](https://www.cnblogs.com/dwlovelife/p/11321541.html#base64url)
- [JWT的实现](https://www.cnblogs.com/dwlovelife/p/11321541.html#jwt的实现)



前言

**定义：JSON Web Token（缩写 JWT）是目前最流行的跨域认证解决方案**

[JWT官网](https://jwt.io/)

 

由于HTTP协议是无状态的，这意味着如果我们想判定一个接口是否被认证后访问，就需要借助cookie或者session会话机制进行判定，但是由于现在的系统架构大部分都不止一台服务器，此时又要借助数据库或者全局缓存 做存储，这种方案显然受限太多。

那么我们可不可以让认证令牌的发布者自己去识别这个令牌是不是我曾经发布的令牌呢（JWT核心思想），这是JWT最大的优点也是最大的缺点，优点是简单快捷、不需要依赖任何第三方操作就能实现身份认证，缺点就是对于任何拥有用户发布令牌的请求都会认证通过。

 

JWT的数据结构

正常的JWT数据结构应该如下

[![img](https://img2018.cnblogs.com/blog/1348730/201908/1348730-20190808152555969-448488431.png)](https://img2018.cnblogs.com/blog/1348730/201908/1348730-20190808152555969-448488431.png)

它是一个很长的字符串，中间用点（`.`）分隔成三个部分

**JWT的三个部分依次：** Header - 头部 、Payload - 负载 、Signature（签名）

**即：**Header.Payload.Signature

 



Header 部分是一个 JSON 对象，描述 JWT 的元数据，通常是下面的样子。

> {
> "alg": "HS256",
> "typ": "JWT"
> }

```
alg`属性表示签名的算法（algorithm），默认是 HMAC SHA256（写成 HS256）；`typ`属性表示这个令牌（token）的类型（type），JWT 令牌统一写为`JWT
```

 

Payload

Payload 部分也是一个 JSON 对象，用来存放实际需要传递的数据。JWT 规定了7个官方字段，供选用。

> iss (issuer)：签发人
>
> exp (expiration time)：过期时间
>
> sub (subject)：主题
>
> aud (audience)：受众
>
> nbf (Not Before)：生效时间
>
> iat (Issued At)：签发时间
>
> jti (JWT ID)：编号

除了官方字段，你还可以在这个部分定义私有字段

> {
> "sub": "1234567890",
> "name": "John Doe",
> "age": "19"
> }

注意：JWT默认是明文展示，任何人都可以读取到，所以此处不要放私密信息

这个 JSON 对象也要使用 Base64URL 算法转成字符串。

 

Signature

Signature 部分是对前两部分的签名，防止数据篡改。

首先，需要指定一个密钥（secret）。这个密钥只有服务器才知道，不能泄露给用户。然后，使用 Header 里面指定的签名算法（默认是 HMAC SHA256），按照下面的公式产生签名。



```
  HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  secret)
```

算出签名以后，把 Header、Payload、Signature 三个部分拼成一个字符串，每个部分之间用"点"（`.`）分隔，就可以返回给用户。

 

Base64URL

前面提到，Header 和 Payload 串型化的算法是 Base64URL。这个算法跟 Base64 算法基本类似，但有一些小的不同。

JWT 作为一个令牌（token），有些场合可能会放到 URL（比如 api.example.com/?token=xxx）。Base64 有三个字符`+`、`/`和`=`，在 URL 里面有特殊含义，所以要被替换掉：`=`被省略、`+`替换成`-`，`/`替换成`_` 。这就是 Base64URL 算法

 

JWT的实现

**Maven依赖**



```
 <dependency>
		    <groupId>com.auth0</groupId>
		    <artifactId>java-jwt</artifactId>
		    <version>3.5.0</version>
</dependency>
```

 

**JWT签名发布和验证代码**



```
package com.chinasofti.app.utils;

import java.util.Date;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTDecodeException;
import com.auth0.jwt.interfaces.DecodedJWT;

public class JwtUtil {
	/**
     * 过期时间30分钟
     */
    public static final long EXPIRE_TIME = 30 * 60 * 1000;

    /**
     * 校验token是否正确
     * @param token  密钥
     * @param secret 用户的密码
     * @return 是否正确
     */
    public static boolean verify(String token, String username, String secret) {
        try {
            // 根据密码生成JWT效验器
            Algorithm algorithm = Algorithm.HMAC256(secret);
            JWTVerifier verifier = JWT.require(algorithm).withClaim("username", username).build();
            // 效验TOKEN
            DecodedJWT jwt = verifier.verify(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    /**
     * 获得token中的信息无需secret解密也能获得
     * @return token中包含的用户名
     */
    public static String getUsername(String token) {
        try {
            DecodedJWT jwt = JWT.decode(token);
            return jwt.getClaim("username").asString();
        } catch (JWTDecodeException e) {
            return null;
        }
    }

    /**
     * 生成签名,30min(分钟)后过期
     * @param username 用户名
     * @param secret   用户的密码
     * @return 加密的token
     */
    public static String sign(String username, String secret) {
        Date date = new Date(System.currentTimeMillis() + EXPIRE_TIME);
        Algorithm algorithm = Algorithm.HMAC256(secret);
        // 附带username信息
        return JWT.create()
                  .withClaim("username", username)
                  .withExpiresAt(date)
                  .sign(algorithm);
    }
}

```

 

**拦截器配置无需认证的请求**



```
@Configuration
public class InterceptorConfig extends WebMvcConfigurationSupport  {
   
	@Autowired
	private TokenHandler tokenHandler;
    


    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        List<String> excludePath = new ArrayList<>();
        String checkLogin = "/pushlogin/checkIsCanLogin";
        String login = "/pushlogin/login";
        String getVerifyCode = "/common/send";
        String verfifyMethod = "/common/validationCode";
        excludePath.add(checkLogin);
        excludePath.add(login);
        excludePath.add(getVerifyCode);
        excludePath.add(verfifyMethod);
        registry.addInterceptor(tokenHandler).excludePathPatterns(excludePath);
    }
}
```

 

**Token统一拦截器代码**



```
@Component
@Slf4j
public class TokenHandler implements HandlerInterceptor{
	
		@Override
	   public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)  throws Exception {
	 
	        String token = request.getHeader("Authentication");
	        if (token != null){
	            boolean result = TokenUtil.verify(token);
	            if(result){
	                log.info("通过拦截器");
	                return true;
	            }
	        }
	        log.info("认证失败");
	        
	        return false;
	   }
	
}
```

 

**用户登录时验证用户信息后，返回Token信息**



```
 	@Override
    public UserDTO selectIsExistUserInfo(String phone) {
        //TODO 伪代码 验证用户信息 
        UserDTO info = 查询用户信息
        if (info != null) {
            String token = JwtUtil.sign(info.getUsername(), info.getUserId());
            info.setToken(token);
        }
        return info;
    }
```