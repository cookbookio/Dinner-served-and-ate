10 april


Koden der fik vores /mywebsite/index.html til at starte var
Powershell:
'''
docker run --rm -it -p 8080:8080 -v "${PWD}/nginx.config:/etc/nginx/nginx.conf:ro" -v "${PWD}/mywebsite:/usr/share/nginx/html:ro" nginx
'''


vi oprettede også config som guiden fra https://github.com/cookbookio/EK_ITA_Agil_Cloud_Ita_2026_Spring/blob/master/20._nginx_proxy_load_balancer/06._reverse_proxies.md siger

