## HTTPS

https本意是http+SSL(Secure Sockets Layer 安全套接层)

https可以<u>***加密HTTP报文***</u>,所以大家也可以理解为是安全的http

工具官网 https://certbot.eff.org/

操作流程:

- 下载工具 https://dl.eff.org/certbot-beta-installer-win_amd64.exe
- 安装工具
- 管理员运行命令certbot certonly --standalone
- 代码配置

证书更新有效期三个月