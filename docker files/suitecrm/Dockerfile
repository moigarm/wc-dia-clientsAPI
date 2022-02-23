FROM bitnami/suitecrm:latest
LABEL maintainer "Bitnami <containers@bitnami.com>"
## Install keys
RUN openssl genrsa -out /opt/bitnami/suitecrm/Api/V8/OAuth2/private.key 2048 && \
    openssl rsa -in /opt/bitnami/suitecrm/Api/V8/OAuth2/private.key -pubout -out /opt/bitnami/suitecrm/Api/V8/OAuth2/public.key && \
    chmod 640 /opt/bitnami/suitecrm/Api/V8/OAuth2/private.key && \
    chgrp daemon /opt/bitnami/suitecrm/Api/V8/OAuth2/private.key /opt/bitnami/suitecrm/Api/V8/OAuth2/public.key