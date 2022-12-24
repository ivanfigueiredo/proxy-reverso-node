FROM nginx:latest

WORKDIR /app

COPY ./start.sh /start.sh
COPY ./app /app

RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash -
RUN apt-get install -y nodejs
RUN npm install

COPY ./nginx/default.conf /etc/nginx/conf.d/

RUN apt update && \
    apt install -y wget netcat && \
    wget -q -O /usr/bin/wait-for https://raw.githubusercontent.com/eficode/wait-for/v2.2.3/wait-for && \
    chmod +x /usr/bin/wait-for

EXPOSE 80
CMD ["/start.sh"]