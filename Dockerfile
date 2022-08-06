FROM gl.n-l-c.ru:5050/epcs/base-images/node:16-5-0 AS builder

COPY . /code
WORKDIR /code

RUN npm install && npm run build

ARG DEPENDENCY_PROXY
FROM nginx:1.21.4

ARG COMMIT_SHA
ARG DEV
ARG NAME
# hadolint ignore=DL3048
LABEL ru.n-l-c.Maintainer="NLC" ru.n-l-c.Name=${NAME} ru.n-l-c.Version="" ru.n-l-c.Commit=${COMMIT_SHA} ru.n-l-c.Developer=${DEV}

COPY --from=builder /code/dist/ /usr/share/nginx/html
COPY nginx.conf.template /etc/nginx/conf.d/default.conf

EXPOSE 80
