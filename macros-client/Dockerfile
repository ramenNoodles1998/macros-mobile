FROM  node:18.19-alpine3.18

RUN mkdir /app
WORKDIR  /app

COPY  package*.json  ./

RUN  npm  install

COPY . ./

EXPOSE  8080

CMD  ["npm",  "run", "web"]