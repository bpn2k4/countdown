FROM nginx:1.27.0-alpine
COPY nginx.conf /etc/nginx/default.conf
COPY index.html /usr/share/nginx/html/index.html
COPY static /usr/share/nginx/html/static
COPY start.sh /opt/start.sh
RUN chmod +x /opt/start.sh
EXPOSE 80
CMD ["/opt/start.sh"]