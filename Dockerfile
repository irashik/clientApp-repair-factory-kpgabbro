#syntax=docker/dockerfile:1

FROM httpd:2.4
LABEL maintainer="IrashinDA"
WORKDIR /usr/local/apache2/htdocs
COPY ./build .


RUN mkdir /usr/local/apache2/conf.d
RUN cp /usr/local/apache2/conf/httpd.conf /usr/local/apache2/conf.d
RUN sed -i '/LoadModule rewrite_module/s/^#//g' /usr/local/apache2/conf/httpd.conf
RUN sed -i 's/AllowOverride None/AllowOverride All/' /usr/local/apache2/conf/httpd.conf  




EXPOSE 8080

