10 april


Koden der fik vores /mywebsite/index.html til at starte var
Powershell:
'''
docker run --rm -it -p 8080:8080 -v "${PWD}/nginx.config:/etc/nginx/nginx.conf:ro" -v "${PWD}/mywebsite:/usr/share/nginx/html:ro" nginx
'''

vi oprettede også config som guiden fra https://github.com/cookbookio/EK_ITA_Agil_Cloud_Ita_2026_Spring/blob/master/20._nginx_proxy_load_balancer/06._reverse_proxies.md siger


Kører man nu (husk at åbne docker desktop)
docker compose -f docker-compose.deploy.yml up --build

Vil der starte følgende cotainere
- frontend
- backend
- nginx

Og man kan se frontend gennem nginx på: localhost:80, mens man (for now?) stadig kan se "direkte på frontend" fra frontend containeren på localhost:3005 som normalt
